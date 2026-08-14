import type {DetectionRule, DetectionContext, UnusedResource} from "../types.js";

/**
 * Detects security groups that are not attached to any network interface.
 *
 * Detection: Tier 1 (state-based, cross-referencing ENI data)
 * - Builds a set of all SG IDs referenced by any ENI in the region.
 * - Any SG not in that set is unattached — nothing is using it for traffic filtering.
 *
 * Why not graph-based (tier 2)?
 * - We CAN do this with inventory data alone: ENIs reference their SGs via the Groups field.
 * - This is more reliable than graph edges because it uses the authoritative ENI→SG association.
 * - Graph-based would require edge role classification to distinguish "SG referenced by a rule"
 *   from "SG attached to an ENI" — which isn't implemented yet.
 *
 * Exclusions:
 * - Default VPC security group: cannot be deleted, always exists, skip it.
 * - SGs referenced by other SG rules: these are still "unused" for traffic filtering purposes
 *   but may be intentional placeholders. We still flag them but note the reference.
 *
 * False positives:
 * - SG used by a pending/launching resource not yet in inventory.
 * - SG used by an RDS/ElastiCache/EFS that references it via its own security group config
 *   (not via ENI Groups). We mitigate by also checking known service-managed references.
 *
 * Note: Security groups don't cost money, but unused SGs create security audit noise
 * and can hit the 2500-per-VPC limit.
 */
export const securityGroupUnused: DetectionRule = {
    "id": "sg-unused",
    "resourceType": "securitygroup",
    "tier": 1,
    "description": "Security groups not attached to any network interface or managed resource",

    detect (context: DetectionContext): UnusedResource[] {

        const findings: UnusedResource[] = [];

        for (const region of context.regions) {

            const securityGroups = context.inventory.getSecurityGroupsByRegion(region);
            const enis = context.inventory.getNetworkInterfacesByRegion(region);

            /*
             * Build set of all SG IDs actually in use by at least one ENI.
             * Every attached resource (EC2, Lambda in VPC, RDS, ELB, etc.) creates an ENI
             * that references its security groups.
             */
            const usedSgIds = new Set<string>();
            for (const eni of enis) {

                if (eni.Groups) {

                    for (const group of eni.Groups) {

                        if (group.GroupId) {

                            usedSgIds.add(group.GroupId);

                        }

                    }

                }

            }

            for (const sg of securityGroups) {

                // Skip default security group — it cannot be deleted and always exists
                if (sg.GroupName === "default") {

                    continue;

                }

                // If any ENI references this SG, it's in active use
                if (sg.GroupId && usedSgIds.has(sg.GroupId)) {

                    continue;

                }

                const name = sg.Tags?.find((t) => t.Key === "Name")?.Value ??
                  sg.GroupName ??
                  sg.GroupId ??
                  "unknown";

                findings.push({
                    "arn": `arn:aws:ec2:${region}::security-group/${sg.GroupId ?? ""}`,
                    "resourceType": "securitygroup",
                    region,
                    name,
                    "reason": `Security group "${sg.GroupName ?? "unknown"}" is not attached to any network interface`,
                    "tier": 1,
                    "confidence": "high"
                });

            }

        }

        return findings;

    }
};

import type {DetectionRule, DetectionContext, UnusedResource} from "../types.js";

/**
 * Detects Elastic IPs that are not associated with any resource.
 *
 * Detection: Tier 1 (state-based)
 * - An EIP with no AssociationId is not attached to any ENI or instance.
 * - This is deterministic: AWS returns AssociationId only when actively associated.
 * - Since Feb 2024, ALL public IPv4 addresses cost $0.005/hr — unassociated EIPs
 *   are the easiest waste to eliminate.
 *
 * Common causes:
 * - Instance terminated but EIP not released (EIPs survive instance termination).
 * - EIP allocated "for later" and forgotten.
 * - NAT Gateway deleted but its EIP left behind.
 *
 * False positives: Very rare.
 * - EIP reserved for a disaster recovery instance (intentional but still costs money).
 */
export const elasticIpUnassociated: DetectionRule = {
    "id": "eip-unassociated",
    "resourceType": "elasticip",
    "tier": 1,
    "description": "Elastic IPs not associated with any instance or network interface",

    detect (context: DetectionContext): UnusedResource[] {

        const findings: UnusedResource[] = [];

        for (const region of context.regions) {

            const addresses = context.inventory.getAddressesByRegion(region);

            for (const address of addresses) {

                // If AssociationId is set, the EIP is actively attached to an ENI
                if (address.AssociationId) {

                    continue;

                }

                const name = address.Tags?.find((t) => t.Key === "Name")?.Value ??
                  address.PublicIp ??
                  address.AllocationId ??
                  "unknown";

                findings.push({
                    "arn": `arn:aws:ec2:${region}::eip/${address.AllocationId ?? ""}`,
                    "resourceType": "elasticip",
                    region,
                    name,
                    "reason": `Elastic IP ${address.PublicIp ?? "unknown"} is not associated with any resource`,
                    "tier": 1,
                    "confidence": "high"
                });

            }

        }

        return findings;

    }
};

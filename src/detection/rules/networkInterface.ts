import type {DetectionRule, DetectionContext, UnusedResource} from "../types.js";

/**
 * Detects Elastic Network Interfaces (ENIs) in "available" state — meaning
 * they are not attached to any instance, Lambda, or other resource.
 *
 * Detection: Tier 1 (state-based)
 * - An ENI with Status === "available" has no active attachment.
 * - This is deterministic: AWS only reports "available" for unattached ENIs.
 *
 * ENIs don't cost money directly, but they:
 * - Consume VPC IP address space (can exhaust subnet CIDR)
 * - Hold onto security group associations (confusing during audits)
 * - May have associated Elastic IPs (which DO cost money — caught by eip rule)
 *
 * Common causes:
 * - Lambda function deleted but left behind its VPC ENI (rare in modern Lambda)
 * - ECS task stopped and ENI not cleaned up (ECS bug or manual intervention)
 * - ELB deleted but left orphaned ENIs
 * - Manual creation and forgotten
 *
 * Exclusions:
 * - RequesterManaged ENIs (owned by AWS services like ELB, RDS, etc.) — these are
 *   managed by the service lifecycle and shouldn't be manually deleted.
 */
export const eniDetached: DetectionRule = {
    "id": "eni-detached",
    "resourceType": "networkinterface",
    "tier": 1,
    "description": "Network interfaces not attached to any resource (available state)",

    detect (context: DetectionContext): UnusedResource[] {

        const findings: UnusedResource[] = [];

        for (const region of context.regions) {

            const enis = context.inventory.getNetworkInterfacesByRegion(region);

            for (const eni of enis) {

                // Only flag truly unattached ENIs
                if (eni.Status !== "available") {

                    continue;

                }

                /*
                 * Skip requester-managed ENIs — these are owned by AWS services
                 * (ELB, RDS, Lambda, etc.) and will be cleaned up by the service itself.
                 */
                if (eni.RequesterManaged) {

                    continue;

                }

                const name = eni.TagSet?.find((t) => t.Key === "Name")?.Value ??
                  eni.Description ??
                  eni.NetworkInterfaceId ??
                  "unknown";

                findings.push({
                    "arn": `arn:aws:ec2:${region}::network-interface/${eni.NetworkInterfaceId ?? ""}`,
                    "resourceType": "networkinterface",
                    region,
                    name,
                    "reason": `Detached ENI in subnet ${eni.SubnetId ?? "unknown"} — no instance or service attachment`,
                    "tier": 1,
                    "confidence": "high"
                });

            }

        }

        return findings;

    }
};

import type {DetectionRule, DetectionContext, UnusedResource} from "../types.js";

/**
 * Detects customer-managed IAM policies not attached to any role, user, or group.
 *
 * Detection: Tier 1 (state-based)
 * - Uses AttachmentCount directly from the IAM policy object.
 * - AWS-managed policies (path starts with /aws/) are excluded — they're shared and
 *   managed by AWS, not a cost or security concern.
 *
 * False positives: Rare.
 * - Policy intentionally kept for future use (but this is poor practice anyway).
 */
export const iamPolicyOrphaned: DetectionRule = {
    "id": "iam-policy-orphaned",
    "resourceType": "policy",
    "tier": 1,
    "description": "Customer-managed IAM policies not attached to any role, user, or group",

    detect (context: DetectionContext): UnusedResource[] {

        const findings: UnusedResource[] = [];

        for (const policy of context.inventory.getPolicies()) {

            if (!policy.PolicyId || !policy.PolicyName) {

                continue;

            }

            // Skip AWS-managed policies
            if (policy.Path?.startsWith("/aws/") || policy.Arn?.startsWith("arn:aws:iam::aws:")) {

                continue;

            }

            // AttachmentCount is returned by ListPolicies — 0 means nothing is using it
            if ((policy.AttachmentCount ?? 0) > 0) {

                continue;

            }

            findings.push({
                "arn": policy.Arn ?? `arn:aws:iam::unknown:policy/${policy.PolicyName}`,
                "resourceType": "policy",
                "region": "global",
                "name": policy.PolicyName,
                "reason": `IAM policy "${policy.PolicyName}" is not attached to any role, user, or group`,
                "tier": 1,
                "confidence": "high"
            });

        }

        return findings;

    }
};

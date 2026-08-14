import type {DetectionRule, DetectionContext, UnusedResource} from "../types.js";

/**
 * Detects Application/Network/Gateway Load Balancers that have no target groups
 * registered, meaning they cannot route traffic to anything.
 *
 * Detection: Tier 1 (state-based, cross-referencing target group data)
 * - A load balancer's purpose is to distribute traffic to targets.
 * - If it has no target groups at all, it's structurally useless — there's nowhere
 *   for traffic to go even if requests arrive.
 *
 * Why this rule is structural (not time-based):
 * - We check whether the LB has any association to target groups, not whether traffic
 *   is flowing. An LB with zero TGs is architecturally broken regardless of age.
 *
 * Common causes:
 * - Target groups deleted but load balancer left behind.
 * - Infrastructure partially torn down (e.g., ECS service removed, ALB forgotten).
 * - Terraform/CloudFormation stack partially rolled back.
 *
 * False positives:
 * - LB just created, target groups about to be attached (transient state during deploy).
 *   This is very short-lived and unlikely to persist across scans.
 */
export const loadBalancerNoTargets: DetectionRule = {
    "id": "lb-no-targets",
    "resourceType": "loadbalancer",
    "tier": 1,
    "description": "Load balancers with no target groups (cannot route traffic)",

    detect (context: DetectionContext): UnusedResource[] {

        const findings: UnusedResource[] = [];

        for (const region of context.regions) {

            const loadBalancers = context.inventory.getLoadBalancersByRegion(region);
            const targetGroups = context.inventory.getTargetGroupsByRegion(region);

            /*
             * Build a set of LB ARNs that have at least one target group associated.
             * A target group references its load balancer(s) via LoadBalancerArns.
             */
            const lbsWithTargetGroups = new Set<string>();
            for (const tg of targetGroups) {

                if (tg.LoadBalancerArns) {

                    for (const lbArn of tg.LoadBalancerArns) {

                        lbsWithTargetGroups.add(lbArn);

                    }

                }

            }

            for (const lb of loadBalancers) {

                if (!lb.LoadBalancerArn) {

                    continue;

                }

                // If any target group references this LB, it's structurally connected
                if (lbsWithTargetGroups.has(lb.LoadBalancerArn)) {

                    continue;

                }

                const name = lb.LoadBalancerName ?? lb.LoadBalancerArn;

                findings.push({
                    "arn": lb.LoadBalancerArn,
                    "resourceType": "loadbalancer",
                    region,
                    name,
                    "reason": `Load balancer "${lb.LoadBalancerName ?? "unknown"}" (${lb.Type ?? "unknown"}) has no target groups — cannot route traffic`,
                    "tier": 1,
                    "confidence": "high"
                });

            }

        }

        return findings;

    }
};

import type {DetectionRule, DetectionContext, UnusedResource} from "../types.js";

/**
 * Detects target groups that are not associated with any load balancer.
 *
 * Detection: Tier 1 (state-based)
 * - A target group's purpose is to receive traffic from a load balancer.
 * - If LoadBalancerArns is empty, no load balancer forwards to this target group.
 * - The target group is structurally orphaned — it exists but serves no routing purpose.
 *
 * Why this is structural:
 * - We check the LB→TG association, not traffic volume. An orphaned TG is architecturally
 *   disconnected regardless of whether its targets are healthy.
 *
 * Target groups don't cost money directly, but they:
 * - Keep health checks running against targets (causes noise in target logs)
 * - Create confusion during infrastructure audits
 * - May hold onto targets (instances/IPs) that could otherwise be deregistered
 *
 * Common causes:
 * - Load balancer deleted but target groups left behind.
 * - Listener rule removed that was the only route to this TG.
 * - Infrastructure migration left orphaned TGs from the old setup.
 *
 * False positives:
 * - TG just created, listener rule about to be added (transient during deploy).
 * - TG used by API Gateway VPC link (not an ELBv2 LB — different integration path).
 *   We don't currently cross-reference API Gateway, so this is a known gap.
 */
export const targetGroupOrphaned: DetectionRule = {
    "id": "tg-orphaned",
    "resourceType": "targetgroup",
    "tier": 1,
    "description": "Target groups not associated with any load balancer",

    detect (context: DetectionContext): UnusedResource[] {

        const findings: UnusedResource[] = [];

        for (const region of context.regions) {

            const targetGroups = context.inventory.getTargetGroupsByRegion(region);

            for (const tg of targetGroups) {

                /*
                 * LoadBalancerArns contains the ARNs of all LBs routing to this TG.
                 * Empty array or undefined = no LB is forwarding traffic here.
                 */
                const hasLoadBalancer = tg.LoadBalancerArns && tg.LoadBalancerArns.length > 0;

                if (hasLoadBalancer) {

                    continue;

                }

                const name = tg.TargetGroupName ?? tg.TargetGroupArn ?? "unknown";

                findings.push({
                    "arn": tg.TargetGroupArn ?? `arn:aws:elasticloadbalancing:${region}::targetgroup/unknown`,
                    "resourceType": "targetgroup",
                    region,
                    name,
                    "reason": `Target group "${tg.TargetGroupName ?? "unknown"}" is not associated with any load balancer`,
                    "tier": 1,
                    "confidence": "high"
                });

            }

        }

        return findings;

    }
};

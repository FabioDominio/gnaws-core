import type {DetectionRule, DetectionContext, UnusedResource} from "../types.js";

/**
 * Detects CloudFront functions not associated with any distribution behavior.
 *
 * Detection: Tier 2 (graph-based)
 * - A CloudFront function node with no incoming edges from any distribution
 *   is not associated with any cache behavior.
 * - CloudFront functions are global resources — they have no region.
 *
 * False positives: Low.
 * - Function created but not yet associated (but this is still wasteful).
 */
export const cloudfrontFunctionUnused: DetectionRule = {
    "id": "cloudfront-function-unused",
    "resourceType": "cloudfrontfunction",
    "tier": 2,
    "description": "CloudFront functions not associated with any distribution",

    detect (context: DetectionContext): UnusedResource[] {

        const findings: UnusedResource[] = [];

        for (const fn of context.inventory.getCloudFrontFunctions()) {

            const arn = fn.FunctionMetadata?.FunctionARN;
            if (!arn) {

                continue;

            }

            if (!context.graph.hasNode(arn)) {

                continue;

            }

            const edges = context.graph.edges(arn);
            const nonOrphanEdges = edges.filter((e) => context.graph.getEdgeAttribute(
                e,
                "edgeType"
            ) !== "orphan");

            if (nonOrphanEdges.length > 0) {

                continue;

            }

            const name = fn.Name ?? arn.split("/").pop() ?? arn;

            findings.push({
                arn,
                "resourceType": "cloudfrontfunction",
                "region": "global",
                name,
                "reason": `CloudFront function "${name}" is not associated with any distribution behavior`,
                "tier": 2,
                "confidence": "high"
            });

        }

        return findings;

    }
};

import type {DetectionRule, DetectionContext, UnusedResource} from "../types.js";

/**
 * Detects Lambda event source mappings whose source or target no longer exists in the graph.
 *
 * Detection: Tier 2 (graph-based)
 * - An ESM node with degree 0 (only orphan edges, no connections to lambda or event source)
 *   indicates its source (SQS queue, DynamoDB stream, Kinesis stream) or target Lambda
 *   is missing from the inventory — the trigger is broken.
 *
 * False positives:
 * - ESM source/target in a different account or not yet scanned.
 *   Medium confidence to account for this.
 */
export const eventSourceMappingBroken: DetectionRule = {
    "id": "esm-broken",
    "resourceType": "eventsourcemapping",
    "tier": 2,
    "description": "Lambda event source mappings whose source or target no longer exists",

    detect (context: DetectionContext): UnusedResource[] {

        const findings: UnusedResource[] = [];

        for (const region of context.regions) {

            for (const esm of context.inventory.getEventSourceMappingsByRegion(region)) {

                const id = esm.UUID;
                if (!id) {

                    continue;

                }

                // Only flag if the ESM is disabled or its state indicates a problem
                if (esm.State === "Enabled" || esm.State === "Creating" || esm.State === "Enabling") {

                    // Still check if isolated in graph (source/target deleted)
                    if (!context.graph.hasNode(id)) {

                        continue;

                    }

                    const edges = context.graph.edges(id);
                    const nonOrphanEdges = edges.filter((e) => context.graph.getEdgeAttribute(
                        e,
                        "edgeType"
                    ) !== "orphan");

                    if (nonOrphanEdges.length > 0) {

                        continue;

                    }

                }

                const name = esm.FunctionArn
                    ? `${esm.EventSourceArn?.split(":").pop() ?? "?"} → ${esm.FunctionArn.split(":").pop() ?? "?"}`
                    : id;

                findings.push({
                    "arn": `arn:aws:lambda:${region}::event-source-mapping/${id}`,
                    "resourceType": "eventsourcemapping",
                    region,
                    name,
                    "reason": `Event source mapping "${name}" has no connected source or target in the graph — source or function may have been deleted`,
                    "tier": 2,
                    "confidence": "medium"
                });

            }

        }

        return findings;

    }
};

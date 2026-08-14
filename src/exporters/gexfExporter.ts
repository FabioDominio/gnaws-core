import {writeFileSync} from "node:fs";
import {write} from "graphology-gexf";
import type {DirectedGraph} from "graphology";
import type {Inventory} from "../inventory.js";
import type {Exporter} from "./exporter.js";
import {getResourceTypeConfig} from "../resourceTypeConfig.js";

/**
 * Exports the graph to GEXF 1.3 format optimized for Gephi.
 *
 * Uses the `formatNode` option to produce proper viz:color, viz:size,
 * and viz:position elements that Gephi natively understands.
 * Only exports meaningful attributes (resourcetype) — not internal objects like tags.
 */
export class GexfExporter implements Exporter {

    /**
     * Write graph to GEXF file with Gephi-compatible visual attributes.
     */
    export (outputPath: string, _inventory: Inventory, graph?: DirectedGraph): void {

        if (!graph) {

            throw new Error("GexfExporter requires a graph");

        }

        // Pre-compute cluster positions per resource type
        const typePositions = new Map<string, {"cx": number;
            "cy": number;}>();
        let typeIndex = 0;

        const getPosition = (resourceType: string): {"cx": number;
            "cy": number;} => {

            if (!typePositions.has(resourceType)) {

                const angle = typeIndex * 2.4;
                const radius = 200 + typeIndex * 30;
                typePositions.set(
                    resourceType,
                    {
                        "cx": Math.cos(angle) * radius,
                        "cy": Math.sin(angle) * radius
                    }
                );
                typeIndex++;

            }
            return typePositions.get(resourceType) as {"cx": number;
                "cy": number;};

        };

        const gexf = write(
            graph,
            {
                "version": "1.3",
                "formatNode": (key, attrs) => {

                    const resourceType = attrs.resourcetype as string | undefined ?? "region";
                    const config = getResourceTypeConfig(resourceType);
                    const degree = graph.degree(key);
                    const center = getPosition(resourceType);
                    const jitter = 50;

                    return {
                        "label": attrs.label as string | undefined ?? key,
                        "viz": {
                            "color": config.color,
                            "size": Math.max(
                                3,
                                Math.min(
                                    30,
                                    3 + degree * 2
                                )
                            ),
                            "x": center.cx + (Math.random() - 0.5) * jitter,
                            "y": center.cy + (Math.random() - 0.5) * jitter
                        },
                        "attributes": {
                            "resourcetype": resourceType,
                            "icon": config.icon
                        }
                    };

                }
            }
        );

        writeFileSync(
            outputPath,
            gexf
        );

    }

}

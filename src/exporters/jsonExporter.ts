import {writeFileSync} from "node:fs";
import type {DirectedGraph} from "graphology";
import type {Inventory} from "../inventory.js";
import type {Exporter} from "./exporter.js";

/**
 * Exports the graph to JSON format (graphology serialization).
 * Suitable for loading in sigma.js or any graphology-compatible viewer.
 */
export class JsonExporter implements Exporter {

    /**
     * Serialize the graph and write to a JSON file.
     */
    export (outputPath: string, _inventory: Inventory, graph?: DirectedGraph): void {

        if (!graph) {

            throw new Error("JsonExporter requires a graph");

        }

        writeFileSync(
            outputPath,
            JSON.stringify(
                graph.export(),
                null,
                2
            )
        );

    }

}

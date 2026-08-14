import type {DirectedGraph} from "graphology";
import type {Inventory} from "../inventory.js";

/**
 * Common interface for all graph/report exporters.
 */
export interface Exporter {

    /**
     * Export inventory and/or graph data to a file.
     * @param outputPath - Path to write the output file
     * @param inventory - Fully populated inventory
     * @param graph - Built directed graph (optional for inventory-only exports)
     */
    export (outputPath: string, inventory: Inventory, graph?: DirectedGraph): void;

}

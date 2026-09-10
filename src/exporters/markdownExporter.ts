import {writeFileSync} from "node:fs";
import type {DirectedGraph} from "graphology";
import type {Inventory} from "../inventory.js";
import type {Exporter} from "./exporter.js";
import type {ResourceDescriptor} from "./resourceDescriptors.js";
import {flattenTags, resourceDescriptors} from "./resourceDescriptors.js";

/**
 * Exports the inventory to a Markdown report — one table per resource type,
 * grouped into a Global section and one section per region.
 *
 * Both this exporter and {@link CsvExporter} walk the same shared
 * {@link resourceDescriptors} table, so the Markdown report covers exactly the
 * same resource set as the CSV, with the same canonical `resourceType` keys,
 * ids, names, and tags. The only difference is presentation: Markdown groups
 * one table per type (per region), CSV is a single flat sheet.
 *
 * The graph is not required — all data comes from the inventory.
 */
export class MarkdownExporter implements Exporter {

    /**
     * Escape a value for a Markdown table cell: replace pipes and collapse
     * newlines so a single cell cannot break the table layout.
     */
    static #escape (value: string): string {

        return value.
            replaceAll(
                "|",
                "\\|"
            ).
            replaceAll(
                /\r?\n/g,
                " "
            );

    }

    /**
     * Render a single resource-type table, or "" when there are no resources.
     * Extra columns declared by the descriptor are inserted between the Name
     * and Tags columns; their headers come from each column's static `label`.
     */
    static #table<T> (
        descriptor: ResourceDescriptor<T>,
        inventory: Inventory,
        resources: T[]
    ): string {

        if (resources.length === 0) {

            return "";

        }

        const extraColumns = descriptor.columns ?? [];

        let md = `#### ${descriptor.resourceType} (${String(resources.length)})\n\n`;

        const headerCells = [
            "Id",
            "Name",
            ...extraColumns.map((column) => MarkdownExporter.#escape(column.label)),
            "Tags"
        ];
        md += `|${headerCells.join("|")}|\n`;
        md += `|${headerCells.map(() => ":-").join("|")}|\n`;

        for (const resource of resources) {

            const id = descriptor.id(resource) ?? "";
            const name = descriptor.name(resource) ?? "";
            const tags = flattenTags(descriptor.tags?.(
                resource,
                inventory
            ));

            const rowCells = [
                MarkdownExporter.#escape(id),
                MarkdownExporter.#escape(name),
                ...extraColumns.map((column) => MarkdownExporter.#escape(column.value(
                    resource,
                    inventory
                ) ?? "")),
                MarkdownExporter.#escape(tags)
            ];
            md += `|${rowCells.join("|")}|\n`;

        }

        return `${md}\n`;

    }

    /**
     * Export the resources to a `.md` file.
     *
     * @param outputPath - Destination path for the `.md` file.
     * @param inventory - Fully populated inventory.
     * @param _graph - Unused; the report is derived entirely from the inventory.
     */
    export (outputPath: string, inventory: Inventory, _graph?: DirectedGraph): void {

        const md = this.#generate(inventory);
        writeFileSync(
            outputPath,
            md
        );

    }

    #generate (inventory: Inventory): string {

        const globals = resourceDescriptors.filter((descriptor) => descriptor.scope === "global");
        const regionals = resourceDescriptors.filter((descriptor) => descriptor.scope === "regional");

        const regions = inventory.getAccountRegions().
            map((region) => region.RegionName).
            filter((name): name is string => Boolean(name));

        let md = "# AWS resources\n\n";

        // ─── Global section ────────────────────────────────────────────────
        md += "## Global\n\n";
        for (const descriptor of globals) {

            md += MarkdownExporter.#table(
                descriptor,
                inventory,
                descriptor.list(
                    inventory,
                    ""
                )
            );

        }

        // ─── Per-region sections ───────────────────────────────────────────
        for (const region of regions) {

            md += `## Region ${region}\n\n`;
            for (const descriptor of regionals) {

                md += MarkdownExporter.#table(
                    descriptor,
                    inventory,
                    descriptor.list(
                        inventory,
                        region
                    )
                );

            }

        }

        return md;

    }

}

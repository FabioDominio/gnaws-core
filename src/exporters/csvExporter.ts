import {writeFileSync} from "node:fs";
import type {DirectedGraph} from "graphology";
import type {Inventory} from "../inventory.js";
import type {Exporter} from "./exporter.js";
import type {ResourceDescriptor} from "./resourceDescriptors.js";
import {flattenTags, resourceDescriptors} from "./resourceDescriptors.js";

/**
 * Exports the inventory to a single flat CSV table with one row per resource.
 *
 * Columns: `region,resource_type,id,name,tags`
 *
 * Unlike {@link MarkdownExporter} (one table per resource type), this produces
 * a single denormalised sheet with a `resource_type` column, suitable for
 * filtering, sorting, and pivoting in any spreadsheet tool. The graph is not
 * required — all data comes from the inventory.
 *
 * The set of covered resource types comes from the shared
 * {@link resourceDescriptors} table, so CSV and Markdown always export exactly
 * the same resources with identical canonical resource-type keys.
 */
export class CsvExporter implements Exporter {

    static readonly #columns = [
        "region",
        "resource_type",
        "id",
        "name",
        "tags"
    ] as const;

    /**
     * Escape a single field per RFC 4180: wrap in double quotes when the value
     * contains a comma, double-quote, CR, or LF, doubling any embedded quotes.
     */
    static #escape (value: string): string {

        if ((/[",\r\n]/).test(value)) {

            return `"${value.replaceAll(
                "\"",
                "\"\""
            )}"`;

        }

        return value;

    }

    /**
     * Export the inventory to a flat CSV file.
     *
     * @param outputPath - Destination path for the `.csv` file.
     * @param inventory - Fully populated inventory.
     * @param _graph - Unused; CSV is derived entirely from the inventory.
     */
    export (outputPath: string, inventory: Inventory, _graph?: DirectedGraph): void {

        const csv = this.#generate(inventory);
        writeFileSync(
            outputPath,
            csv
        );

    }

    #generate (inventory: Inventory): string {

        const lines: string[] = [CsvExporter.#columns.join(",")];

        const regions = inventory.getAccountRegions().
            map((region) => region.RegionName).
            filter((name): name is string => Boolean(name));

        for (const descriptor of resourceDescriptors) {

            if (descriptor.scope === "global") {

                this.#emit(
                    lines,
                    descriptor,
                    inventory,
                    descriptor.list(
                        inventory,
                        ""
                    ),
                    "global"
                );

            } else {

                for (const region of regions) {

                    this.#emit(
                        lines,
                        descriptor,
                        inventory,
                        descriptor.list(
                            inventory,
                            region
                        ),
                        region
                    );

                }

            }

        }

        // Trailing newline for POSIX-friendly output.
        return `${lines.join("\n")}\n`;

    }

    /**
     * Emit one CSV row per resource in `resources`, appending to `lines`.
     */
    #emit<T> (
        lines: string[],
        descriptor: ResourceDescriptor<T>,
        inventory: Inventory,
        resources: T[],
        defaultRegion: string
    ): void {

        for (const resource of resources) {

            const region = descriptor.regionOf?.(resource) ?? defaultRegion;
            const tags = descriptor.tags?.(
                resource,
                inventory
            );

            lines.push([
                CsvExporter.#escape(region),
                CsvExporter.#escape(descriptor.resourceType),
                CsvExporter.#escape(descriptor.id(resource) ?? ""),
                CsvExporter.#escape(descriptor.name(resource) ?? ""),
                CsvExporter.#escape(flattenTags(tags))
            ].join(","));

        }

    }

}

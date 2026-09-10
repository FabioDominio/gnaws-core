import type {Tag} from "@aws-sdk/client-ec2";
import type {Tag as IamTag} from "@aws-sdk/client-iam";
import type {Inventory} from "../../inventory.js";

/**
 * A `Key`/`Value` tag pair as returned by most AWS SDK clients.
 * EC2, IAM, RDS, Secrets Manager, etc. all share this structural shape, so a
 * single type covers every descriptor. Tag shapes that differ (record maps or
 * lowercase `{key,value}`) are normalised to this shape by {@link recordTags}
 * and {@link lowerTags}.
 */
export type TagPair = {"Key"?: string;
    "Value"?: string;};

/**
 * A single extra Markdown column: a static header `label` plus a per-row
 * `value` accessor. Kept static-label / dynamic-value so the table header is
 * stable even when some rows have a missing value.
 *
 * @typeParam T - The SDK resource object type the column reads from.
 */
export interface ExtraColumn<T> {

    /** Column header text (stable across all rows of the type). */
    "label": string;

    /** Per-row cell value. */
    "value": (resource: T, inventory: Inventory) => string | undefined;

}

/**
 * Declarative description of how to read one AWS resource type from the
 * inventory. This is the base shape shared by every inventory-driven exporter
 * (CSV, Markdown).
 *
 * Descriptors are authored in **per-service groups** (see the sibling modules
 * in this folder, e.g. `ec2.ts`, `rds.ts`), mirroring the per-service
 * structure of `graphBuilder.ts` (`#addEc2Resources`, `#addRdsResources`, …).
 * Each group is written with concrete `T` types via {@link describe}, so the
 * id/name/tags/column accessors are fully type-checked against the resource;
 * the stored value erases `T` to `unknown` only at the group boundary, exactly
 * as graphBuilder keeps concrete SDK types inside each `#addXxx` method and
 * only the graph node is generic.
 *
 * The `resourceType` values are the canonical keys used across the whole
 * library (matching `graphBuilder.ts` node types and `resourceTypeConfig.ts`),
 * so a CSV row, a Markdown table, and a graph node all refer to a type the
 * same way.
 *
 * @typeParam T - The SDK resource object type this descriptor reads from.
 */
export interface ResourceDescriptor<T> {

    /** Canonical resource-type key (e.g. "vpc", "role", "s3bucket"). */
    "resourceType": string;

    /**
     * Scope of the resource:
     * - "regional": fetched per region via `list(inventory, region)`
     * - "global": fetched once via `list(inventory)`; region is derived by
     *   `regionOf` (or treated as "global" when omitted).
     */
    "scope": "regional" | "global";

    /** Returns the resources for the given (optional) region. */
    "list": (inventory: Inventory, region: string) => T[];

    /** Extracts the stable identifier (ARN/ID). */
    "id": (resource: T) => string | undefined;

    /** Extracts a human-friendly name. */
    "name": (resource: T) => string | undefined;

    /** Extracts tags. Omit when the type carries none on the inventory. */
    "tags"?: (resource: T, inventory: Inventory) => TagPair[] | undefined;

    /**
     * For global resources that still belong to a region (e.g. S3 buckets),
     * derives the region. Omit for truly global resources (IAM), which are
     * treated as "global".
     */
    "regionOf"?: (resource: T) => string | undefined;

    /**
     * Optional extra columns rendered by table-based exporters (Markdown)
     * between the Name and Tags columns. Flat exporters (CSV) ignore this
     * field entirely — CSV stays a fixed `region,resource_type,id,name,tags`
     * sheet. Only define this where extra detail is genuinely useful; most
     * types are fine with the base `Id | Name | Tags` columns.
     */
    "columns"?: ExtraColumn<T>[];

}

/**
 * A group of descriptors owned by one AWS service. Each per-service module
 * exports one of these; {@link resourceDescriptors} concatenates them.
 */
export type DescriptorGroup = ResourceDescriptor<unknown>[];

/**
 * Identity helper that pins the generic type of a descriptor literal so the
 * accessor callbacks (id/name/tags/columns) are strongly typed against the
 * resource `T`, while the value stored in a per-service group erases to
 * `ResourceDescriptor<unknown>`.
 */
export function describe<T> (descriptor: ResourceDescriptor<T>): ResourceDescriptor<unknown> {

    return descriptor as unknown as ResourceDescriptor<unknown>;

}

/**
 * Stringify a `boolean | undefined` for a column value: `true`/`false` become
 * `"true"`/`"false"`, `undefined` stays `undefined` (renders as an empty cell).
 * Provided so column accessors avoid inline `cond ? undefined : String(x)`
 * ternaries.
 */
export function boolStr (value?: boolean): string | undefined {

    return value === undefined
        ? undefined
        : String(value);

}

/**
 * Find the value of the conventional `Name` tag, if present.
 */
export function nameTag (tags?: TagPair[]): string | undefined {

    return tags?.find((tag) => tag.Key === "Name")?.Value;

}

/**
 * Convert a `Record<string, string>` tag map (as returned by some SDKs,
 * e.g. SQS `QueueInfo.tags`) into the uniform `{Key, Value}` pair shape.
 */
export function recordTags (record?: Record<string, string>): TagPair[] | undefined {

    if (!record) {

        return undefined;

    }

    return Object.entries(record).map(([
        key,
        value
    ]) => ({"Key": key,
        "Value": value}));

}

/**
 * Convert a lowercase `{key, value}[]` tag list (as returned by some SDKs,
 * e.g. ECS/EKS) into the uniform `{Key, Value}` pair shape.
 */
export function lowerTags (tags?: {"key"?: string;
    "value"?: string;}[]): TagPair[] | undefined {

    return tags?.map((tag) => ({"Key": tag.key,
        "Value": tag.value}));

}

/**
 * Flatten tags into a single deterministic `key=value; ...` string, sorted by
 * key for stable diffs. Returns "" when there are no tags.
 */
export function flattenTags (tags?: TagPair[]): string {

    if (!tags || tags.length === 0) {

        return "";

    }

    return tags.
        filter((tag): tag is Tag & IamTag => Boolean(tag.Key)).
        map((tag) => ({"key": tag.Key ?? "",
            "value": tag.Value ?? ""})).
        sort((a, b) => a.key.localeCompare(b.key)).
        map((tag) => `${tag.key}=${tag.value}`).
        join("; ");

}

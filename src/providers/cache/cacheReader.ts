import {readFileSync, existsSync, readdirSync} from "node:fs";
import {join} from "node:path";
import type {SdkLogger} from "../../logger.js";

let moduleLogger: SdkLogger | undefined;

/**
 * Set the logger for cache read operations.
 */
export function setCacheLogger (logger?: SdkLogger): void {

    moduleLogger = logger;

}

/**
 * Reads a JSON cache file from the given cache directory.
 * Returns an empty array if the file doesn't exist.
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function readCacheFile<T extends unknown[]> (cacheDir: string, filename: string): T {

    const filePath = join(
        cacheDir,
        filename
    );
    if (!existsSync(filePath)) {

        moduleLogger?.debug(`skip (not found): ${filePath}`);
        return [] as unknown as T;

    }
    moduleLogger?.debug(`read: ${filePath}`);
    const content = readFileSync(
        filePath,
        "utf-8"
    );
    const parsed: unknown = JSON.parse(content);
    return Array.isArray(parsed)
        ? parsed as T
        : [] as unknown as T;

}

/**
 * Reads a JSON cache file that contains an object (map/dictionary).
 * Returns an empty object if the file doesn't exist.
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function readCacheObject<T extends Record<string, unknown>> (cacheDir: string, filename: string): T {

    const filePath = join(
        cacheDir,
        filename
    );
    if (!existsSync(filePath)) {

        moduleLogger?.debug(`skip (not found): ${filePath}`);
        return {} as T;

    }
    moduleLogger?.debug(`read: ${filePath}`);
    const content = readFileSync(
        filePath,
        "utf-8"
    );
    return JSON.parse(content) as T;

}

/**
 * Lists available region directories in the cache.
 */
export function listCacheRegions (cacheDir: string): string[] {

    if (!existsSync(cacheDir)) {

        return [];

    }
    return readdirSync(
        cacheDir,
        {"withFileTypes": true}
    ).
        filter((d) => d.isDirectory() && d.name !== "global").
        map((d) => d.name);

}

import type {TableBucketSummary, NamespaceSummary, TableSummary} from "@aws-sdk/client-s3tables";
import type {S3Tables} from "../../interfaces/s3tables.js";
import {readCacheFile} from "./cacheReader.js";

export class S3TablesCacheService implements S3Tables {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getTableBuckets (): Promise<TableBucketSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "s3tables_table_buckets.json"
        );

    }

    async getNamespaces (_tableBucketARN: string): Promise<NamespaceSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "s3tables_namespaces.json"
        );

    }

    async getTables (_tableBucketARN: string): Promise<TableSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "s3tables_tables.json"
        );

    }

}

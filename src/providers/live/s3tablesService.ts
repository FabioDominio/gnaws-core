import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type TableBucketSummary,
    type NamespaceSummary,
    type TableSummary,
    S3TablesClient,
    type S3TablesClientConfig,
    paginateListTableBuckets,
    paginateListNamespaces,
    paginateListTables
} from "@aws-sdk/client-s3tables";
import type {S3Tables} from "../../interfaces/s3tables.js";

export class S3TablesService implements S3Tables {

    #client: S3TablesClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: S3TablesClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new S3TablesClient(config);

    }

    async getTableBuckets (): Promise<TableBucketSummary[]> {

        const client = this.#client;
        const tableBuckets: TableBucketSummary[] = [];
        for await (const page of paginateListTableBuckets(
            {client},
            {}
        )) {

            if (page.tableBuckets !== undefined) {

                tableBuckets.push(...page.tableBuckets);

            }

        }
        return tableBuckets;

    }

    async getNamespaces (tableBucketARN: string): Promise<NamespaceSummary[]> {

        const client = this.#client;
        const namespaces: NamespaceSummary[] = [];
        for await (const page of paginateListNamespaces(
            {client},
            {tableBucketARN}
        )) {

            if (page.namespaces !== undefined) {

                namespaces.push(...page.namespaces);

            }

        }
        return namespaces;

    }

    async getTables (tableBucketARN: string): Promise<TableSummary[]> {

        const client = this.#client;
        const tables: TableSummary[] = [];
        for await (const page of paginateListTables(
            {client},
            {tableBucketARN}
        )) {

            if (page.tables !== undefined) {

                tables.push(...page.tables);

            }

        }
        return tables;

    }

}

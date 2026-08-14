import type {TableBucketSummary, NamespaceSummary, TableSummary} from "@aws-sdk/client-s3tables";

export interface S3Tables {
    getTableBuckets (): Promise<TableBucketSummary[]>;
    getNamespaces (tableBucketARN: string): Promise<NamespaceSummary[]>;
    getTables (tableBucketARN: string): Promise<TableSummary[]>;
}

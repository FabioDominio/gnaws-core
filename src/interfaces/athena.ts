import type {WorkGroup, DataCatalogSummary} from "@aws-sdk/client-athena";

export interface Athena {
    getWorkGroups (): Promise<WorkGroup[]>;
    getDataCatalogs (): Promise<DataCatalogSummary[]>;
}

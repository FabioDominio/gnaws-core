import type {CollectionSummary, VpcEndpointSummary} from "@aws-sdk/client-opensearchserverless";

export interface OpenSearchServerless {
    getCollections (): Promise<CollectionSummary[]>;
    getVpcEndpoints (): Promise<VpcEndpointSummary[]>;
}

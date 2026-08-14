import type {DomainStatus} from "@aws-sdk/client-opensearch";

export interface OpenSearch {
    getDomains (): Promise<DomainStatus[]>;
}

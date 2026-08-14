import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {type CollectionSummary, type VpcEndpointSummary, OpenSearchServerlessClient, paginateListCollections, paginateListVpcEndpoints} from "@aws-sdk/client-opensearchserverless";
import type {OpenSearchServerless} from "../../interfaces/opensearchserverless.js";

export class OpenSearchServerlessService implements OpenSearchServerless {

    #client: OpenSearchServerlessClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        this.#client = new OpenSearchServerlessClient({region,
            credentials,
            "maxAttempts": 5,
            logger});

    }

    async getCollections (): Promise<CollectionSummary[]> {

        const client = this.#client; const items: CollectionSummary[] = [];
        for await (const page of paginateListCollections(
            {client},
            {}
        )) {

            if (page.collectionSummaries) items.push(...page.collectionSummaries);

        }
        return items;

    }

    async getVpcEndpoints (): Promise<VpcEndpointSummary[]> {

        const client = this.#client; const items: VpcEndpointSummary[] = [];
        for await (const page of paginateListVpcEndpoints(
            {client},
            {}
        )) {

            if (page.vpcEndpointSummaries) items.push(...page.vpcEndpointSummaries);

        }
        return items;

    }

}

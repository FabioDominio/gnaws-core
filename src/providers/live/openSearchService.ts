import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type DomainStatus,
    OpenSearchClient,
    type OpenSearchClientConfig,
    ListDomainNamesCommand,
    DescribeDomainsCommand
} from "@aws-sdk/client-opensearch";
import type {OpenSearch} from "../../interfaces/opensearch.js";

export class OpenSearchService implements OpenSearch {

    #client: OpenSearchClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: OpenSearchClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new OpenSearchClient(config);

    }

    async getDomains (): Promise<DomainStatus[]> {

        const listResponse = await this.#client.send(new ListDomainNamesCommand({}));

        const domainNames: string[] = (listResponse.DomainNames ?? []).
            map((d) => d.DomainName).
            filter((n): n is string => n !== undefined);

        if (domainNames.length === 0) {

            return [];

        }

        const domains: DomainStatus[] = [];

        // DescribeDomainsCommand accepts max 5 domain names per call
        for (let i = 0; i < domainNames.length; i += 5) {

            const batch = domainNames.slice(
                i,
                i + 5
            );

            const response = await this.#client.send(new DescribeDomainsCommand({
                "DomainNames": batch
            }));

            if (response.DomainStatusList !== undefined) {

                domains.push(...response.DomainStatusList);

            }

        }

        return domains;

    }

}

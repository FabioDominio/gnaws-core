import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type DistributionSummary,
    type FunctionSummary,
    type OriginAccessControl,
    type KeyValueStore,
    type Tag,
    CloudFrontClient,
    type CloudFrontClientConfig,
    paginateListDistributions,
    ListFunctionsCommand,
    paginateListOriginAccessControls,
    paginateListKeyValueStores,
    ListTagsForResourceCommand
} from "@aws-sdk/client-cloudfront";
import type {CloudFront} from "../../interfaces/cloudfront.js";

export class CloudFrontService implements CloudFront {

    #client: CloudFrontClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, logger?: SdkLogger) {

        const config: CloudFrontClientConfig = {
            "region": "us-east-1",
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new CloudFrontClient(config);

    }

    async getDistributions (): Promise<DistributionSummary[]> {

        const client = this.#client;
        const distributions: DistributionSummary[] = [];
        for await (const page of paginateListDistributions(
            {client},
            {}
        )) {

            if (page.DistributionList?.Items) {

                distributions.push(...page.DistributionList.Items);

            }

        }
        return distributions;

    }

    async getFunctions (): Promise<FunctionSummary[]> {

        const client = this.#client;
        const response = await client.send(new ListFunctionsCommand({}));
        return response.FunctionList?.Items ?? [];

    }

    async getOriginAccessControls (): Promise<OriginAccessControl[]> {

        const client = this.#client;
        const oacs: OriginAccessControl[] = [];
        for await (const page of paginateListOriginAccessControls(
            {client},
            {}
        )) {

            if (page.OriginAccessControlList?.Items) {

                // ListOriginAccessControls returns summaries, map to OriginAccessControl shape
                for (const item of page.OriginAccessControlList.Items) {

                    oacs.push({
                        "Id": item.Id,
                        "OriginAccessControlConfig": {
                            "Name": item.Name,
                            "Description": item.Description,
                            "OriginAccessControlOriginType": item.OriginAccessControlOriginType,
                            "SigningProtocol": item.SigningProtocol,
                            "SigningBehavior": item.SigningBehavior
                        }
                    });

                }

            }

        }
        return oacs;

    }

    async getKeyValueStores (): Promise<KeyValueStore[]> {

        const client = this.#client;
        const stores: KeyValueStore[] = [];
        for await (const page of paginateListKeyValueStores(
            {client},
            {}
        )) {

            if (page.KeyValueStoreList?.Items) {

                stores.push(...page.KeyValueStoreList.Items);

            }

        }
        return stores;

    }

    async getTagsForDistribution (arn: string): Promise<Tag[]> {

        try {

            const response = await this.#client.send(new ListTagsForResourceCommand({"Resource": arn}));
            return response.Tags?.Items ?? [];

        } catch {

            return [];

        }

    }

}

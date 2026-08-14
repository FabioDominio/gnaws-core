import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type ClusterInfo,
    KafkaClient,
    type KafkaClientConfig,
    paginateListClusters
} from "@aws-sdk/client-kafka";
import type {Msk} from "../../interfaces/msk.js";

export class MskService implements Msk {

    #client: KafkaClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: KafkaClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new KafkaClient(config);

    }

    async getClusters (): Promise<ClusterInfo[]> {

        const client = this.#client;
        const clusters: ClusterInfo[] = [];
        for await (const page of paginateListClusters(
            {client},
            {}
        )) {

            if (page.ClusterInfoList !== undefined) {

                clusters.push(...page.ClusterInfoList);

            }

        }
        return clusters;

    }

}

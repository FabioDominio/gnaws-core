import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type StreamSummary,
    KinesisClient,
    type KinesisClientConfig,
    paginateListStreams
} from "@aws-sdk/client-kinesis";
import type {Kinesis} from "../../interfaces/kinesis.js";

export class KinesisService implements Kinesis {

    #client: KinesisClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: KinesisClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new KinesisClient(config);

    }

    async getStreams (): Promise<StreamSummary[]> {

        const client = this.#client;
        const streams: StreamSummary[] = [];

        for await (const page of paginateListStreams(
            {client},
            {}
        )) {

            if (page.StreamSummaries !== undefined) {

                streams.push(...page.StreamSummaries);

            }

        }

        return streams;

    }

}

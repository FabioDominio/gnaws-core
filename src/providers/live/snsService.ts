import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type Topic,
    type Subscription,
    type Tag,
    SNSClient,
    type SNSClientConfig,
    paginateListTopics,
    paginateListSubscriptions,
    ListTagsForResourceCommand
} from "@aws-sdk/client-sns";
import type {Sns} from "../../interfaces/sns.js";

export class SnsService implements Sns {

    #client: SNSClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: SNSClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new SNSClient(config);

    }

    async getTopics (): Promise<Topic[]> {

        const client = this.#client;
        const topics: Topic[] = [];
        for await (const page of paginateListTopics(
            {client},
            {}
        )) {

            if (page.Topics !== undefined) {

                topics.push(...page.Topics);

            }

        }
        return topics;

    }

    async getSubscriptions (): Promise<Subscription[]> {

        const client = this.#client;
        const subscriptions: Subscription[] = [];
        for await (const page of paginateListSubscriptions(
            {client},
            {}
        )) {

            if (page.Subscriptions !== undefined) {

                subscriptions.push(...page.Subscriptions);

            }

        }
        return subscriptions;

    }

    async getTagsForTopic (topicArn: string): Promise<Tag[]> {

        try {

            const response = await this.#client.send(new ListTagsForResourceCommand({"ResourceArn": topicArn}));
            return response.Tags ?? [];

        } catch {

            return [];

        }

    }

}

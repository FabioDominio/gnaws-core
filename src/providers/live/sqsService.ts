import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    SQSClient,
    type SQSClientConfig,
    paginateListQueues,
    paginateListDeadLetterSourceQueues,
    GetQueueAttributesCommand,
    ListQueueTagsCommand
} from "@aws-sdk/client-sqs";
import type {QueueInfo, Sqs} from "../../interfaces/sqs.js";

export class SqsService implements Sqs {

    #client: SQSClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: SQSClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new SQSClient(config);

    }

    async getQueues (): Promise<QueueInfo[]> {

        const client = this.#client;
        const queueUrls: string[] = [];
        for await (const page of paginateListQueues(
            {client},
            {}
        )) {

            if (page.QueueUrls !== undefined) {

                queueUrls.push(...page.QueueUrls);

            }

        }

        // Enrich each queue with attributes
        const queues: QueueInfo[] = [];
        for (const queueUrl of queueUrls) {

            try {

                const response = await client.send(new GetQueueAttributesCommand({
                    "QueueUrl": queueUrl,
                    "AttributeNames": ["QueueArn"]
                }));
                const queueArn = response.Attributes?.QueueArn;
                const queueName = queueUrl.split("/").pop();

                let tags: Record<string, string> | undefined;
                try {

                    const tagResponse = await client.send(new ListQueueTagsCommand({"QueueUrl": queueUrl}));
                    tags = tagResponse.Tags;

                } catch {

                    // May not have permission for tags
                }

                queues.push({
                    queueUrl,
                    queueArn,
                    queueName,
                    tags
                });

            } catch {

                queues.push({queueUrl});

            }

        }

        return queues;

    }

    async getDeadLetterSourceQueues (queueUrl: string): Promise<string[]> {

        const client = this.#client;
        const sourceUrls: string[] = [];

        for await (const page of paginateListDeadLetterSourceQueues(
            {client},
            {"QueueUrl": queueUrl}
        )) {

            if (page.queueUrls !== undefined) {

                sourceUrls.push(...page.queueUrls);

            }

        }

        return sourceUrls;

    }

}

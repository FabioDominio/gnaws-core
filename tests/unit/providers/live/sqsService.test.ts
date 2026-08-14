import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    SQSClient,
    ListQueuesCommand,
    ListDeadLetterSourceQueuesCommand,
    GetQueueAttributesCommand,
    ListQueueTagsCommand
} from "@aws-sdk/client-sqs";
import {SqsService} from "../../../../src/providers/live/sqsService.js";

const sqsMock = mockClient(SQSClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    sqsMock.reset();

});

describe(
    "SqsService",
    () => {

        describe(
            "getQueues",
            () => {

                it(
                    "returns enriched queue info",
                    async () => {

                        sqsMock.on(ListQueuesCommand).resolves({
                            "QueueUrls": ["https://sqs.us-east-1.amazonaws.com/123/my-queue"]
                        });
                        sqsMock.on(GetQueueAttributesCommand).resolves({
                            "Attributes": {"QueueArn": "arn:aws:sqs:us-east-1:123:my-queue"}
                        });
                        sqsMock.on(ListQueueTagsCommand).resolves({
                            "Tags": {"env": "prod"}
                        });

                        const service = new SqsService(
                            creds,
                            "us-east-1"
                        );
                        const queues = await service.getQueues();

                        expect(queues).toHaveLength(1);
                        expect(queues[0].queueUrl).toBe("https://sqs.us-east-1.amazonaws.com/123/my-queue");
                        expect(queues[0].queueArn).toBe("arn:aws:sqs:us-east-1:123:my-queue");
                        expect(queues[0].queueName).toBe("my-queue");
                        expect(queues[0].tags).toEqual({"env": "prod"});

                    }
                );

                it(
                    "handles GetQueueAttributes failure gracefully",
                    async () => {

                        sqsMock.on(ListQueuesCommand).resolves({
                            "QueueUrls": ["https://sqs.us-east-1.amazonaws.com/123/q1"]
                        });
                        sqsMock.on(GetQueueAttributesCommand).rejects(new Error("Access Denied"));

                        const service = new SqsService(
                            creds,
                            "us-east-1"
                        );
                        const queues = await service.getQueues();

                        expect(queues).toHaveLength(1);
                        expect(queues[0].queueUrl).toBe("https://sqs.us-east-1.amazonaws.com/123/q1");
                        expect(queues[0].queueArn).toBeUndefined();

                    }
                );

                it(
                    "returns empty array when no queues",
                    async () => {

                        sqsMock.on(ListQueuesCommand).resolves({});

                        const service = new SqsService(
                            creds,
                            "us-east-1"
                        );
                        const queues = await service.getQueues();

                        expect(queues).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getDeadLetterSourceQueues",
            () => {

                it(
                    "returns source queue URLs",
                    async () => {

                        sqsMock.on(ListDeadLetterSourceQueuesCommand).resolves({
                            "queueUrls": [
                                "https://sqs.us-east-1.amazonaws.com/123/source-1",
                                "https://sqs.us-east-1.amazonaws.com/123/source-2"
                            ]
                        });

                        const service = new SqsService(
                            creds,
                            "us-east-1"
                        );
                        const sources = await service.getDeadLetterSourceQueues("https://sqs.us-east-1.amazonaws.com/123/dlq");

                        expect(sources).toHaveLength(2);
                        expect(sources[0]).toContain("source-1");

                    }
                );

                it(
                    "returns empty array when no sources",
                    async () => {

                        sqsMock.on(ListDeadLetterSourceQueuesCommand).resolves({});

                        const service = new SqsService(
                            creds,
                            "us-east-1"
                        );
                        const sources = await service.getDeadLetterSourceQueues("https://sqs.us-east-1.amazonaws.com/123/dlq");

                        expect(sources).toHaveLength(0);

                    }
                );

            }
        );

    }
);

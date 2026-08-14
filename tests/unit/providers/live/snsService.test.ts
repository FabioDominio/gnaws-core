import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    SNSClient,
    ListTopicsCommand,
    ListSubscriptionsCommand,
    ListTagsForResourceCommand
} from "@aws-sdk/client-sns";
import {SnsService} from "../../../../src/providers/live/snsService.js";

const snsMock = mockClient(SNSClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    snsMock.reset();

});

describe(
    "SnsService",
    () => {

        describe(
            "getTopics",
            () => {

                it(
                    "returns topics from single page",
                    async () => {

                        snsMock.on(ListTopicsCommand).resolves({
                            "Topics": [
                                {"TopicArn": "arn:aws:sns:us-east-1:123:topic-1"},
                                {"TopicArn": "arn:aws:sns:us-east-1:123:topic-2"}
                            ]
                        });

                        const service = new SnsService(
                            creds,
                            "us-east-1"
                        );
                        const topics = await service.getTopics();

                        expect(topics).toHaveLength(2);
                        expect(topics[0].TopicArn).toBe("arn:aws:sns:us-east-1:123:topic-1");

                    }
                );

                it(
                    "aggregates topics across multiple pages",
                    async () => {

                        snsMock.on(ListTopicsCommand).
                            resolvesOnce({"Topics": [{"TopicArn": "arn:aws:sns:us-east-1:123:t1"}],
                                "NextToken": "tok"}).
                            resolvesOnce({"Topics": [{"TopicArn": "arn:aws:sns:us-east-1:123:t2"}]});

                        const service = new SnsService(
                            creds,
                            "us-east-1"
                        );
                        const topics = await service.getTopics();

                        expect(topics).toHaveLength(2);

                    }
                );

                it(
                    "returns empty array when no topics",
                    async () => {

                        snsMock.on(ListTopicsCommand).resolves({});

                        const service = new SnsService(
                            creds,
                            "us-east-1"
                        );
                        const topics = await service.getTopics();

                        expect(topics).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getSubscriptions",
            () => {

                it(
                    "returns subscriptions",
                    async () => {

                        snsMock.on(ListSubscriptionsCommand).resolves({
                            "Subscriptions": [
                                {"SubscriptionArn": "arn:aws:sns:us-east-1:123:topic-1:sub-1",
                                    "TopicArn": "arn:aws:sns:us-east-1:123:topic-1",
                                    "Protocol": "email",
                                    "Endpoint": "a@b.com"}
                            ]
                        });

                        const service = new SnsService(
                            creds,
                            "us-east-1"
                        );
                        const subs = await service.getSubscriptions();

                        expect(subs).toHaveLength(1);
                        expect(subs[0].Protocol).toBe("email");

                    }
                );

            }
        );

        describe(
            "getTagsForTopic",
            () => {

                it(
                    "returns tags for a topic",
                    async () => {

                        snsMock.on(ListTagsForResourceCommand).resolves({
                            "Tags": [
                                {"Key": "env",
                                    "Value": "prod"}
                            ]
                        });

                        const service = new SnsService(
                            creds,
                            "us-east-1"
                        );
                        const tags = await service.getTagsForTopic("arn:aws:sns:us-east-1:123:topic-1");

                        expect(tags).toHaveLength(1);
                        expect(tags[0].Key).toBe("env");

                    }
                );

                it(
                    "returns empty array on error",
                    async () => {

                        snsMock.on(ListTagsForResourceCommand).rejects(new Error("Access Denied"));

                        const service = new SnsService(
                            creds,
                            "us-east-1"
                        );
                        const tags = await service.getTagsForTopic("arn:aws:sns:us-east-1:123:topic-1");

                        expect(tags).toHaveLength(0);

                    }
                );

            }
        );

    }
);

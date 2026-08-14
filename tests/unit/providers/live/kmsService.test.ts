import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    KMSClient,
    ListKeysCommand,
    ListAliasesCommand,
    ListResourceTagsCommand
} from "@aws-sdk/client-kms";
import {KmsService} from "../../../../src/providers/live/kmsService.js";

const kmsMock = mockClient(KMSClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    kmsMock.reset();

});

describe(
    "KmsService",
    () => {

        describe(
            "getKeys",
            () => {

                it(
                    "returns keys from single page",
                    async () => {

                        kmsMock.on(ListKeysCommand).resolves({
                            "Keys": [
                                {"KeyId": "key-1",
                                    "KeyArn": "arn:aws:kms:us-east-1:123:key/key-1"},
                                {"KeyId": "key-2",
                                    "KeyArn": "arn:aws:kms:us-east-1:123:key/key-2"}
                            ]
                        });

                        const service = new KmsService(
                            creds,
                            "us-east-1"
                        );
                        const keys = await service.getKeys();

                        expect(keys).toHaveLength(2);
                        expect(keys[0].KeyId).toBe("key-1");

                    }
                );

                it(
                    "aggregates keys across pages",
                    async () => {

                        kmsMock.on(ListKeysCommand).
                            resolvesOnce({"Keys": [{"KeyId": "k1"}],
                                "NextMarker": "m1",
                                "Truncated": true}).
                            resolvesOnce({"Keys": [{"KeyId": "k2"}],
                                "Truncated": false});

                        const service = new KmsService(
                            creds,
                            "us-east-1"
                        );
                        const keys = await service.getKeys();

                        expect(keys).toHaveLength(2);

                    }
                );

            }
        );

        describe(
            "getAliases",
            () => {

                it(
                    "returns aliases",
                    async () => {

                        kmsMock.on(ListAliasesCommand).resolves({
                            "Aliases": [
                                {"AliasName": "alias/my-key",
                                    "TargetKeyId": "key-1"},
                                {"AliasName": "alias/aws/s3",
                                    "TargetKeyId": "key-2"}
                            ]
                        });

                        const service = new KmsService(
                            creds,
                            "us-east-1"
                        );
                        const aliases = await service.getAliases();

                        expect(aliases).toHaveLength(2);
                        expect(aliases[0].AliasName).toBe("alias/my-key");

                    }
                );

            }
        );

        describe(
            "getTagsForKey",
            () => {

                it(
                    "returns tags for a key",
                    async () => {

                        kmsMock.on(ListResourceTagsCommand).resolves({
                            "Tags": [
                                {"TagKey": "env",
                                    "TagValue": "prod"}
                            ]
                        });

                        const service = new KmsService(
                            creds,
                            "us-east-1"
                        );
                        const tags = await service.getTagsForKey("key-1");

                        expect(tags).toHaveLength(1);
                        expect(tags[0].TagKey).toBe("env");

                    }
                );

                it(
                    "returns empty array on error (e.g., permission denied)",
                    async () => {

                        kmsMock.on(ListResourceTagsCommand).rejects(new Error("AccessDeniedException"));

                        const service = new KmsService(
                            creds,
                            "us-east-1"
                        );
                        const tags = await service.getTagsForKey("key-1");

                        expect(tags).toHaveLength(0);

                    }
                );

            }
        );

    }
);

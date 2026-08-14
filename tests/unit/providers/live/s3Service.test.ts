import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    S3Client,
    ListBucketsCommand,
    ListDirectoryBucketsCommand,
    GetBucketLocationCommand,
    GetBucketNotificationConfigurationCommand,
    GetBucketTaggingCommand
} from "@aws-sdk/client-s3";
import {S3Service} from "../../../../src/providers/live/s3Service.js";

const s3Mock = mockClient(S3Client);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    s3Mock.reset();

});

describe(
    "S3Service",
    () => {

        describe(
            "getBuckets",
            () => {

                it(
                    "returns enriched bucket info",
                    async () => {

                        s3Mock.on(ListBucketsCommand).resolves({
                            "Buckets": [
                                {"Name": "my-bucket",
                                    "CreationDate": new Date("2024-01-01")}
                            ]
                        });
                        s3Mock.on(GetBucketLocationCommand).resolves({
                            "LocationConstraint": "eu-west-1"
                        });
                        s3Mock.on(GetBucketNotificationConfigurationCommand).resolves({
                            "LambdaFunctionConfigurations": [
                                {"LambdaFunctionArn": "arn:aws:lambda:eu-west-1:123:function:fn1",
                                    "Events": ["s3:ObjectCreated:*"]}
                            ]
                        });
                        s3Mock.on(GetBucketTaggingCommand).resolves({
                            "TagSet": [
                                {"Key": "env",
                                    "Value": "prod"}
                            ]
                        });

                        const service = new S3Service(creds);
                        const buckets = await service.getBuckets();

                        expect(buckets).toHaveLength(1);
                        expect(buckets[0].bucket.Name).toBe("my-bucket");
                        expect(buckets[0].region).toBe("eu-west-1");
                        expect(buckets[0].tags).toHaveLength(1);

                    }
                );

                it(
                    "defaults region to us-east-1 when LocationConstraint is null",
                    async () => {

                        s3Mock.on(ListBucketsCommand).resolves({
                            "Buckets": [{"Name": "us-bucket"}]
                        });
                        s3Mock.on(GetBucketLocationCommand).resolves({
                            "LocationConstraint": undefined
                        });
                        s3Mock.on(GetBucketNotificationConfigurationCommand).resolves({});
                        s3Mock.on(GetBucketTaggingCommand).rejects(new Error("NoSuchTagSet"));

                        const service = new S3Service(creds);
                        const buckets = await service.getBuckets();

                        expect(buckets).toHaveLength(1);
                        expect(buckets[0].region).toBe("us-east-1");
                        expect(buckets[0].tags).toBeUndefined();

                    }
                );

                it(
                    "skips buckets without Name",
                    async () => {

                        s3Mock.on(ListBucketsCommand).resolves({
                            "Buckets": [
                                {"Name": undefined},
                                {"Name": "valid-bucket"}
                            ]
                        });
                        s3Mock.on(GetBucketLocationCommand).resolves({"LocationConstraint": "us-west-2"});
                        s3Mock.on(GetBucketNotificationConfigurationCommand).resolves({});
                        s3Mock.on(GetBucketTaggingCommand).rejects(new Error("NoSuchTagSet"));

                        const service = new S3Service(creds);
                        const buckets = await service.getBuckets();

                        expect(buckets).toHaveLength(1);
                        expect(buckets[0].bucket.Name).toBe("valid-bucket");

                    }
                );

            }
        );

        describe(
            "getDirectoryBuckets",
            () => {

                it(
                    "returns directory buckets",
                    async () => {

                        s3Mock.on(ListDirectoryBucketsCommand).resolves({
                            "Buckets": [
                                {"Name": "dir-bucket-1",
                                    "CreationDate": new Date("2024-06-01")},
                                {"Name": "dir-bucket-2",
                                    "CreationDate": new Date("2024-06-02")}
                            ]
                        });

                        const service = new S3Service(creds);
                        const buckets = await service.getDirectoryBuckets();

                        expect(buckets).toHaveLength(2);
                        expect(buckets[0].name).toBe("dir-bucket-1");

                    }
                );

                it(
                    "returns empty when no directory buckets",
                    async () => {

                        s3Mock.on(ListDirectoryBucketsCommand).resolves({});

                        const service = new S3Service(creds);
                        const buckets = await service.getDirectoryBuckets();

                        expect(buckets).toHaveLength(0);

                    }
                );

            }
        );

    }
);

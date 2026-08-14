import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    CloudTrailClient,
    ListTrailsCommand,
    DescribeTrailsCommand
} from "@aws-sdk/client-cloudtrail";
import {CloudTrailService} from "../../../../src/providers/live/cloudTrailService.js";

const ctMock = mockClient(CloudTrailClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    ctMock.reset();

});

describe(
    "CloudTrailService",
    () => {

        describe(
            "getTrails",
            () => {

                it(
                    "returns trails with details",
                    async () => {

                        ctMock.on(ListTrailsCommand).resolves({
                            "Trails": [
                                {"TrailARN": "arn:aws:cloudtrail:us-east-1:123:trail/my-trail",
                                    "Name": "my-trail"}
                            ]
                        });
                        ctMock.on(DescribeTrailsCommand).resolves({
                            "trailList": [
                                {
                                    "Name": "my-trail",
                                    "TrailARN": "arn:aws:cloudtrail:us-east-1:123:trail/my-trail",
                                    "S3BucketName": "my-bucket",
                                    "IsMultiRegionTrail": true
                                }
                            ]
                        });

                        const service = new CloudTrailService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getTrails();

                        expect(result).toHaveLength(1);
                        expect(result[0].Name).toBe("my-trail");
                        expect(result[0].S3BucketName).toBe("my-bucket");
                        expect(result[0].IsMultiRegionTrail).toBe(true);

                    }
                );

                it(
                    "aggregates trail ARNs across pages",
                    async () => {

                        ctMock.on(ListTrailsCommand).
                            resolvesOnce({"Trails": [
                                {"TrailARN": "arn:aws:cloudtrail:us-east-1:123:trail/t1",
                                    "Name": "t1"}
                            ],
                            "NextToken": "tok"}).
                            resolvesOnce({"Trails": [
                                {"TrailARN": "arn:aws:cloudtrail:us-east-1:123:trail/t2",
                                    "Name": "t2"}
                            ]});
                        ctMock.on(DescribeTrailsCommand).resolves({
                            "trailList": [
                                {"Name": "t1",
                                    "TrailARN": "arn:aws:cloudtrail:us-east-1:123:trail/t1",
                                    "S3BucketName": "b1"},
                                {"Name": "t2",
                                    "TrailARN": "arn:aws:cloudtrail:us-east-1:123:trail/t2",
                                    "S3BucketName": "b2"}
                            ]
                        });

                        const service = new CloudTrailService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getTrails();

                        expect(result).toHaveLength(2);

                    }
                );

                it(
                    "returns empty array when no trails",
                    async () => {

                        ctMock.on(ListTrailsCommand).resolves({});

                        const service = new CloudTrailService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getTrails();

                        expect(result).toHaveLength(0);

                    }
                );

                it(
                    "returns empty array when trail list has no ARNs",
                    async () => {

                        ctMock.on(ListTrailsCommand).resolves({
                            "Trails": [{"Name": "no-arn-trail"}]
                        });

                        const service = new CloudTrailService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getTrails();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

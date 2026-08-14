import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {S3ControlClient, ListAccessPointsCommand} from "@aws-sdk/client-s3-control";
import {S3ControlService} from "../../../../src/providers/live/s3ControlService.js";

const s3ControlMock = mockClient(S3ControlClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    s3ControlMock.reset();

});

describe(
    "S3ControlService",
    () => {

        describe(
            "getAccessPoints",
            () => {

                it(
                    "returns access points",
                    async () => {

                        s3ControlMock.on(ListAccessPointsCommand).resolves({
                            "AccessPointList": [
                                {"Name": "ap-1",
                                    "Bucket": "my-bucket",
                                    "AccessPointArn": "arn:aws:s3:us-east-1:123:accesspoint/ap-1",
                                    "NetworkOrigin": "Internet"},
                                {"Name": "ap-2",
                                    "Bucket": "other-bucket",
                                    "AccessPointArn": "arn:aws:s3:us-east-1:123:accesspoint/ap-2",
                                    "NetworkOrigin": "Internet"}
                            ]
                        });

                        const service = new S3ControlService(
                            creds,
                            "us-east-1",
                            "123456789012"
                        );
                        const result = await service.getAccessPoints();

                        expect(result).toHaveLength(2);
                        expect(result[0].Name).toBe("ap-1");

                    }
                );

                it(
                    "returns empty when no access points",
                    async () => {

                        s3ControlMock.on(ListAccessPointsCommand).resolves({});

                        const service = new S3ControlService(
                            creds,
                            "us-east-1",
                            "123456789012"
                        );
                        const result = await service.getAccessPoints();

                        expect(result).toHaveLength(0);

                    }
                );

                it(
                    "returns empty when no accountId",
                    async () => {

                        const service = new S3ControlService(
                            creds,
                            "us-east-1",
                            ""
                        );
                        const result = await service.getAccessPoints();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

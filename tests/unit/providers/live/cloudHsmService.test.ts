import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {CloudHSMV2Client, DescribeClustersCommand} from "@aws-sdk/client-cloudhsm-v2";
import {CloudHsmService} from "../../../../src/providers/live/cloudHsmService.js";

const hsmMock = mockClient(CloudHSMV2Client);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    hsmMock.reset();

});

describe(
    "CloudHsmService",
    () => {

        describe(
            "getClusters",
            () => {

                it(
                    "returns clusters",
                    async () => {

                        hsmMock.on(DescribeClustersCommand).resolves({
                            "Clusters": [
                                {"ClusterId": "cluster-1",
                                    "State": "ACTIVE",
                                    "HsmType": "hsm1.medium",
                                    "VpcId": "vpc-123"},
                                {"ClusterId": "cluster-2",
                                    "State": "ACTIVE",
                                    "HsmType": "hsm1.medium",
                                    "VpcId": "vpc-456"}
                            ]
                        });

                        const service = new CloudHsmService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getClusters();

                        expect(result).toHaveLength(2);
                        expect(result[0].ClusterId).toBe("cluster-1");

                    }
                );

                it(
                    "returns empty when no clusters",
                    async () => {

                        hsmMock.on(DescribeClustersCommand).resolves({});

                        const service = new CloudHsmService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getClusters();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

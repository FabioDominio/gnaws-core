import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {OpenSearchServerlessClient, ListCollectionsCommand, ListVpcEndpointsCommand} from "@aws-sdk/client-opensearchserverless";
import {OpenSearchServerlessService} from "../../../../src/providers/live/openSearchServerlessService.js";

const ossMock = mockClient(OpenSearchServerlessClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    ossMock.reset();

});

describe(
    "OpenSearchServerlessService",
    () => {

        describe(
            "getCollections",
            () => {

                it(
                    "returns collections",
                    async () => {

                        ossMock.on(ListCollectionsCommand).resolves({
                            "collectionSummaries": [
                                {"id": "col-1",
                                    "name": "my-collection",
                                    "status": "ACTIVE",
                                    "arn": "arn:aws:aoss:us-east-1:123:collection/col-1"},
                                {"id": "col-2",
                                    "name": "other-collection",
                                    "status": "ACTIVE",
                                    "arn": "arn:aws:aoss:us-east-1:123:collection/col-2"}
                            ]
                        });

                        const service = new OpenSearchServerlessService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getCollections();

                        expect(result).toHaveLength(2);
                        expect(result[0].name).toBe("my-collection");

                    }
                );

                it(
                    "returns empty when no collections",
                    async () => {

                        ossMock.on(ListCollectionsCommand).resolves({});

                        const service = new OpenSearchServerlessService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getCollections();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getVpcEndpoints",
            () => {

                it(
                    "returns VPC endpoints",
                    async () => {

                        ossMock.on(ListVpcEndpointsCommand).resolves({
                            "vpcEndpointSummaries": [
                                {"id": "vpce-1",
                                    "name": "my-endpoint",
                                    "status": "ACTIVE"},
                                {"id": "vpce-2",
                                    "name": "other-endpoint",
                                    "status": "ACTIVE"}
                            ]
                        });

                        const service = new OpenSearchServerlessService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getVpcEndpoints();

                        expect(result).toHaveLength(2);
                        expect(result[0].name).toBe("my-endpoint");

                    }
                );

                it(
                    "returns empty when no VPC endpoints",
                    async () => {

                        ossMock.on(ListVpcEndpointsCommand).resolves({});

                        const service = new OpenSearchServerlessService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getVpcEndpoints();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

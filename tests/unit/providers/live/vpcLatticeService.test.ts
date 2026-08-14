import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {VPCLatticeClient, ListServiceNetworksCommand, ListServicesCommand, ListTargetGroupsCommand, ListServiceNetworkVpcAssociationsCommand, ListServiceNetworkServiceAssociationsCommand} from "@aws-sdk/client-vpc-lattice";
import {VpcLatticeService} from "../../../../src/providers/live/vpcLatticeService.js";

const latticeMock = mockClient(VPCLatticeClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    latticeMock.reset();

});

describe(
    "VpcLatticeService",
    () => {

        describe(
            "getServiceNetworks",
            () => {

                it(
                    "returns service networks",
                    async () => {

                        latticeMock.on(ListServiceNetworksCommand).resolves({
                            "items": [
                                {"id": "sn-1",
                                    "name": "my-network",
                                    "arn": "arn:aws:vpc-lattice:us-east-1:123:servicenetwork/sn-1"},
                                {"id": "sn-2",
                                    "name": "other-network",
                                    "arn": "arn:aws:vpc-lattice:us-east-1:123:servicenetwork/sn-2"}
                            ]
                        });

                        const service = new VpcLatticeService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getServiceNetworks();

                        expect(result).toHaveLength(2);
                        expect(result[0].name).toBe("my-network");

                    }
                );

                it(
                    "returns empty when no service networks",
                    async () => {

                        latticeMock.on(ListServiceNetworksCommand).resolves({});

                        const service = new VpcLatticeService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getServiceNetworks();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getServices",
            () => {

                it(
                    "returns services",
                    async () => {

                        latticeMock.on(ListServicesCommand).resolves({
                            "items": [
                                {"id": "svc-1",
                                    "name": "my-service",
                                    "arn": "arn:aws:vpc-lattice:us-east-1:123:service/svc-1"},
                                {"id": "svc-2",
                                    "name": "other-service",
                                    "arn": "arn:aws:vpc-lattice:us-east-1:123:service/svc-2"}
                            ]
                        });

                        const service = new VpcLatticeService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getServices();

                        expect(result).toHaveLength(2);
                        expect(result[0].name).toBe("my-service");

                    }
                );

                it(
                    "returns empty when no services",
                    async () => {

                        latticeMock.on(ListServicesCommand).resolves({});

                        const service = new VpcLatticeService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getServices();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getTargetGroups",
            () => {

                it(
                    "returns target groups",
                    async () => {

                        latticeMock.on(ListTargetGroupsCommand).resolves({
                            "items": [
                                {"id": "tg-1",
                                    "name": "my-targets",
                                    "arn": "arn:aws:vpc-lattice:us-east-1:123:targetgroup/tg-1",
                                    "type": "INSTANCE"}
                            ]
                        });

                        const service = new VpcLatticeService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getTargetGroups();

                        expect(result).toHaveLength(1);
                        expect(result[0].name).toBe("my-targets");

                    }
                );

                it(
                    "returns empty when no target groups",
                    async () => {

                        latticeMock.on(ListTargetGroupsCommand).resolves({});

                        const service = new VpcLatticeService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getTargetGroups();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getServiceNetworkVpcAssociations",
            () => {

                it(
                    "returns VPC associations for a service network",
                    async () => {

                        latticeMock.on(ListServiceNetworkVpcAssociationsCommand).resolves({
                            "items": [
                                {"id": "snva-1",
                                    "serviceNetworkId": "sn-1",
                                    "vpcId": "vpc-123",
                                    "status": "ACTIVE"},
                                {"id": "snva-2",
                                    "serviceNetworkId": "sn-1",
                                    "vpcId": "vpc-456",
                                    "status": "ACTIVE"}
                            ]
                        });

                        const service = new VpcLatticeService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getServiceNetworkVpcAssociations("sn-1");

                        expect(result).toHaveLength(2);
                        expect(result[0].vpcId).toBe("vpc-123");

                    }
                );

                it(
                    "returns empty when no VPC associations",
                    async () => {

                        latticeMock.on(ListServiceNetworkVpcAssociationsCommand).resolves({});

                        const service = new VpcLatticeService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getServiceNetworkVpcAssociations("sn-1");

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getServiceNetworkServiceAssociations",
            () => {

                it(
                    "returns service associations for a service network",
                    async () => {

                        latticeMock.on(ListServiceNetworkServiceAssociationsCommand).resolves({
                            "items": [
                                {"id": "snsa-1",
                                    "serviceNetworkId": "sn-1",
                                    "serviceId": "svc-1",
                                    "status": "ACTIVE"},
                                {"id": "snsa-2",
                                    "serviceNetworkId": "sn-1",
                                    "serviceId": "svc-2",
                                    "status": "ACTIVE"}
                            ]
                        });

                        const service = new VpcLatticeService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getServiceNetworkServiceAssociations("sn-1");

                        expect(result).toHaveLength(2);
                        expect(result[0].serviceId).toBe("svc-1");

                    }
                );

                it(
                    "returns empty when no service associations",
                    async () => {

                        latticeMock.on(ListServiceNetworkServiceAssociationsCommand).resolves({});

                        const service = new VpcLatticeService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getServiceNetworkServiceAssociations("sn-1");

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

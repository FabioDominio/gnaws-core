import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {ServiceDiscoveryClient, ListNamespacesCommand, ListServicesCommand, GetServiceCommand, ListInstancesCommand} from "@aws-sdk/client-servicediscovery";
import {ServiceDiscoveryService} from "../../../../src/providers/live/serviceDiscoveryService.js";

const sdMock = mockClient(ServiceDiscoveryClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    sdMock.reset();

});

describe(
    "ServiceDiscoveryService",
    () => {

        describe(
            "getNamespaces",
            () => {

                it(
                    "returns namespaces",
                    async () => {

                        sdMock.on(ListNamespacesCommand).resolves({
                            "Namespaces": [
                                {"Id": "ns-1",
                                    "Name": "my-namespace",
                                    "Type": "DNS_PRIVATE",
                                    "Arn": "arn:aws:servicediscovery:us-east-1:123:namespace/ns-1"},
                                {"Id": "ns-2",
                                    "Name": "public-ns",
                                    "Type": "DNS_PUBLIC",
                                    "Arn": "arn:aws:servicediscovery:us-east-1:123:namespace/ns-2"}
                            ]
                        });

                        const service = new ServiceDiscoveryService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getNamespaces();

                        expect(result).toHaveLength(2);
                        expect(result[0].Name).toBe("my-namespace");

                    }
                );

                it(
                    "returns empty when no namespaces",
                    async () => {

                        sdMock.on(ListNamespacesCommand).resolves({});

                        const service = new ServiceDiscoveryService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getNamespaces();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getServices",
            () => {

                it(
                    "returns services with GetService enrichment",
                    async () => {

                        sdMock.on(ListServicesCommand).resolves({
                            "Services": [
                                {"Id": "srv-1",
                                    "Name": "my-service"},
                                {"Id": "srv-2",
                                    "Name": "other-service"}
                            ]
                        });
                        sdMock.on(GetServiceCommand).callsFake((input: {"Id"?: string}) => ({
                            "Service": {"Id": input.Id,
                                "Name": `described-${String(input.Id)}`,
                                "NamespaceId": "ns-1",
                                "Arn": `arn:aws:servicediscovery:us-east-1:123:service/${String(input.Id)}`}
                        }));

                        const service = new ServiceDiscoveryService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getServices();

                        expect(result).toHaveLength(2);
                        expect(result[0].NamespaceId).toBe("ns-1");

                    }
                );

                it(
                    "skips services without Id",
                    async () => {

                        sdMock.on(ListServicesCommand).resolves({
                            "Services": [
                                {"Id": "srv-1",
                                    "Name": "valid"},
                                {"Name": "no-id"}
                            ]
                        });
                        sdMock.on(GetServiceCommand).resolves({
                            "Service": {"Id": "srv-1",
                                "Name": "valid",
                                "NamespaceId": "ns-1"}
                        });

                        const service = new ServiceDiscoveryService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getServices();

                        expect(result).toHaveLength(1);

                    }
                );

                it(
                    "returns empty when no services",
                    async () => {

                        sdMock.on(ListServicesCommand).resolves({});

                        const service = new ServiceDiscoveryService(
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
            "getInstances",
            () => {

                it(
                    "returns instances for a service",
                    async () => {

                        sdMock.on(ListInstancesCommand).resolves({
                            "Instances": [
                                {"Id": "inst-1",
                                    "Attributes": {"AWS_INSTANCE_IPV4": "10.0.0.1"}},
                                {"Id": "inst-2",
                                    "Attributes": {"AWS_INSTANCE_IPV4": "10.0.0.2"}}
                            ]
                        });

                        const service = new ServiceDiscoveryService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getInstances("srv-1");

                        expect(result).toHaveLength(2);
                        expect(result[0].Id).toBe("inst-1");

                    }
                );

                it(
                    "returns empty when no instances",
                    async () => {

                        sdMock.on(ListInstancesCommand).resolves({});

                        const service = new ServiceDiscoveryService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getInstances("srv-1");

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

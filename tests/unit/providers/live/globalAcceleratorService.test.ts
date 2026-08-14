import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    GlobalAcceleratorClient,
    ListAcceleratorsCommand,
    ListListenersCommand,
    ListEndpointGroupsCommand
} from "@aws-sdk/client-global-accelerator";
import {GlobalAcceleratorServiceImpl} from "../../../../src/providers/live/globalAcceleratorService.js";

const gaMock = mockClient(GlobalAcceleratorClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    gaMock.reset();

});

describe(
    "GlobalAcceleratorServiceImpl",
    () => {

        describe(
            "getAccelerators",
            () => {

                it(
                    "returns accelerators",
                    async () => {

                        gaMock.on(ListAcceleratorsCommand).resolves({
                            "Accelerators": [
                                {"AcceleratorArn": "arn:aws:globalaccelerator::123:accelerator/abc",
                                    "Name": "acc-1"},
                                {"AcceleratorArn": "arn:aws:globalaccelerator::123:accelerator/def",
                                    "Name": "acc-2"}
                            ]
                        });

                        const service = new GlobalAcceleratorServiceImpl(creds);
                        const result = await service.getAccelerators();

                        expect(result).toHaveLength(2);
                        expect(result[0].Name).toBe("acc-1");
                        expect(result[1].Name).toBe("acc-2");

                    }
                );

                it(
                    "aggregates accelerators across pages",
                    async () => {

                        gaMock.on(ListAcceleratorsCommand).
                            resolvesOnce({"Accelerators": [{"Name": "acc-1"}],
                                "NextToken": "tok"}).
                            resolvesOnce({"Accelerators": [{"Name": "acc-2"}]});

                        const service = new GlobalAcceleratorServiceImpl(creds);
                        const result = await service.getAccelerators();

                        expect(result).toHaveLength(2);

                    }
                );

                it(
                    "returns empty when no accelerators",
                    async () => {

                        gaMock.on(ListAcceleratorsCommand).resolves({});

                        const service = new GlobalAcceleratorServiceImpl(creds);
                        const result = await service.getAccelerators();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getListeners",
            () => {

                it(
                    "returns listeners for an accelerator",
                    async () => {

                        gaMock.on(ListListenersCommand).resolves({
                            "Listeners": [
                                {"ListenerArn": "arn:listener-1",
                                    "PortRanges": [
                                        {"FromPort": 80,
                                            "ToPort": 80}
                                    ]},
                                {"ListenerArn": "arn:listener-2",
                                    "PortRanges": [
                                        {"FromPort": 443,
                                            "ToPort": 443}
                                    ]}
                            ]
                        });

                        const service = new GlobalAcceleratorServiceImpl(creds);
                        const result = await service.getListeners("arn:aws:globalaccelerator::123:accelerator/abc");

                        expect(result).toHaveLength(2);
                        expect(result[0].ListenerArn).toBe("arn:listener-1");

                    }
                );

                it(
                    "passes accelerator ARN to command",
                    async () => {

                        gaMock.on(ListListenersCommand).resolves({"Listeners": []});

                        const service = new GlobalAcceleratorServiceImpl(creds);
                        await service.getListeners("arn:acc-123");

                        const calls = gaMock.commandCalls(ListListenersCommand);
                        expect(calls[0].args[0].input.AcceleratorArn).toBe("arn:acc-123");

                    }
                );

                it(
                    "aggregates listeners across pages",
                    async () => {

                        gaMock.on(ListListenersCommand).
                            resolvesOnce({"Listeners": [{"ListenerArn": "l1"}],
                                "NextToken": "tok"}).
                            resolvesOnce({"Listeners": [{"ListenerArn": "l2"}]});

                        const service = new GlobalAcceleratorServiceImpl(creds);
                        const result = await service.getListeners("arn:acc-123");

                        expect(result).toHaveLength(2);

                    }
                );

                it(
                    "returns empty when no listeners",
                    async () => {

                        gaMock.on(ListListenersCommand).resolves({});

                        const service = new GlobalAcceleratorServiceImpl(creds);
                        const result = await service.getListeners("arn:acc-123");

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getEndpointGroups",
            () => {

                it(
                    "returns endpoint groups for a listener",
                    async () => {

                        gaMock.on(ListEndpointGroupsCommand).resolves({
                            "EndpointGroups": [
                                {"EndpointGroupArn": "arn:eg-1",
                                    "EndpointGroupRegion": "us-east-1"},
                                {"EndpointGroupArn": "arn:eg-2",
                                    "EndpointGroupRegion": "eu-west-1"}
                            ]
                        });

                        const service = new GlobalAcceleratorServiceImpl(creds);
                        const result = await service.getEndpointGroups("arn:listener-1");

                        expect(result).toHaveLength(2);
                        expect(result[0].EndpointGroupRegion).toBe("us-east-1");

                    }
                );

                it(
                    "passes listener ARN to command",
                    async () => {

                        gaMock.on(ListEndpointGroupsCommand).resolves({"EndpointGroups": []});

                        const service = new GlobalAcceleratorServiceImpl(creds);
                        await service.getEndpointGroups("arn:listener-xyz");

                        const calls = gaMock.commandCalls(ListEndpointGroupsCommand);
                        expect(calls[0].args[0].input.ListenerArn).toBe("arn:listener-xyz");

                    }
                );

                it(
                    "aggregates endpoint groups across pages",
                    async () => {

                        gaMock.on(ListEndpointGroupsCommand).
                            resolvesOnce({"EndpointGroups": [{"EndpointGroupArn": "eg1"}],
                                "NextToken": "tok"}).
                            resolvesOnce({"EndpointGroups": [{"EndpointGroupArn": "eg2"}]});

                        const service = new GlobalAcceleratorServiceImpl(creds);
                        const result = await service.getEndpointGroups("arn:listener-1");

                        expect(result).toHaveLength(2);

                    }
                );

                it(
                    "returns empty when no endpoint groups",
                    async () => {

                        gaMock.on(ListEndpointGroupsCommand).resolves({});

                        const service = new GlobalAcceleratorServiceImpl(creds);
                        const result = await service.getEndpointGroups("arn:listener-1");

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

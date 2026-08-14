import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {AppRunnerClient, ListServicesCommand, DescribeServiceCommand, ListVpcConnectorsCommand} from "@aws-sdk/client-apprunner";
import {AppRunnerService} from "../../../../src/providers/live/appRunnerService.js";

const appRunnerMock = mockClient(AppRunnerClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    appRunnerMock.reset();

});

describe(
    "AppRunnerService",
    () => {

        describe(
            "getServices",
            () => {

                it(
                    "returns services with describe enrichment",
                    async () => {

                        appRunnerMock.on(ListServicesCommand).resolves({
                            "ServiceSummaryList": [
                                {"ServiceArn": "arn:aws:apprunner:us-east-1:123:service/svc-1",
                                    "ServiceName": "svc-1"},
                                {"ServiceArn": "arn:aws:apprunner:us-east-1:123:service/svc-2",
                                    "ServiceName": "svc-2"}
                            ]
                        });
                        appRunnerMock.on(DescribeServiceCommand).callsFake((input: {"ServiceArn"?: string}) => ({
                            "Service": {"ServiceArn": input.ServiceArn,
                                "ServiceName": "described-svc",
                                "Status": "RUNNING"}
                        }));

                        const service = new AppRunnerService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getServices();

                        expect(result).toHaveLength(2);
                        expect(result[0].Status).toBe("RUNNING");

                    }
                );

                it(
                    "skips services without ARN",
                    async () => {

                        appRunnerMock.on(ListServicesCommand).resolves({
                            "ServiceSummaryList": [
                                {"ServiceName": "no-arn"},
                                {"ServiceArn": "arn:aws:apprunner:us-east-1:123:service/svc-1",
                                    "ServiceName": "has-arn"}
                            ]
                        });
                        appRunnerMock.on(DescribeServiceCommand).resolves({
                            "Service": {"ServiceArn": "arn:aws:apprunner:us-east-1:123:service/svc-1",
                                "ServiceName": "has-arn",
                                "Status": "RUNNING",
                                "ServiceId": "svc-id-1",
                                "CreatedAt": new Date(),
                                "UpdatedAt": new Date(),
                                "SourceConfiguration": {},
                                "InstanceConfiguration": {},
                                "AutoScalingConfigurationSummary": {},
                                "NetworkConfiguration": {}}
                        });

                        const service = new AppRunnerService(
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

                        appRunnerMock.on(ListServicesCommand).resolves({});

                        const service = new AppRunnerService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getServices();

                        expect(result).toHaveLength(0);

                    }
                );

                it(
                    "skips deleted services gracefully",
                    async () => {

                        appRunnerMock.on(ListServicesCommand).resolves({
                            "ServiceSummaryList": [{"ServiceArn": "arn:aws:apprunner:us-east-1:123:service/svc-1"}]
                        });
                        appRunnerMock.on(DescribeServiceCommand).rejects(new Error("ResourceNotFoundException"));

                        const service = new AppRunnerService(
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
            "getVpcConnectors",
            () => {

                it(
                    "returns vpc connectors",
                    async () => {

                        appRunnerMock.on(ListVpcConnectorsCommand).resolves({
                            "VpcConnectors": [
                                {"VpcConnectorArn": "arn:aws:apprunner:us-east-1:123:vpcconnector/conn-1",
                                    "VpcConnectorName": "conn-1"}
                            ]
                        });

                        const service = new AppRunnerService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getVpcConnectors();

                        expect(result).toHaveLength(1);
                        expect(result[0].VpcConnectorName).toBe("conn-1");

                    }
                );

                it(
                    "returns empty when no vpc connectors",
                    async () => {

                        appRunnerMock.on(ListVpcConnectorsCommand).resolves({});

                        const service = new AppRunnerService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getVpcConnectors();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

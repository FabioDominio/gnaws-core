import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {ImagebuilderClient, ListInfrastructureConfigurationsCommand, GetInfrastructureConfigurationCommand} from "@aws-sdk/client-imagebuilder";
import {ImageBuilderService} from "../../../../src/providers/live/imageBuilderService.js";

const imagebuilderMock = mockClient(ImagebuilderClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    imagebuilderMock.reset();

});

describe(
    "ImageBuilderService",
    () => {

        describe(
            "getInfrastructureConfigurations",
            () => {

                it(
                    "returns infrastructure configurations with describe enrichment",
                    async () => {

                        imagebuilderMock.on(ListInfrastructureConfigurationsCommand).resolves({
                            "infrastructureConfigurationSummaryList": [
                                {"arn": "arn:aws:imagebuilder:us-east-1:123:infrastructure-configuration/config-1",
                                    "name": "config-1"},
                                {"arn": "arn:aws:imagebuilder:us-east-1:123:infrastructure-configuration/config-2",
                                    "name": "config-2"}
                            ]
                        });
                        imagebuilderMock.on(GetInfrastructureConfigurationCommand).callsFake((input: {"infrastructureConfigurationArn"?: string}) => ({
                            "infrastructureConfiguration": {"arn": input.infrastructureConfigurationArn,
                                "name": "described-config",
                                "instanceProfileName": "profile-1"}
                        }));

                        const service = new ImageBuilderService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getInfrastructureConfigurations();

                        expect(result).toHaveLength(2);
                        expect(result[0].instanceProfileName).toBe("profile-1");

                    }
                );

                it(
                    "skips items without ARN",
                    async () => {

                        imagebuilderMock.on(ListInfrastructureConfigurationsCommand).resolves({
                            "infrastructureConfigurationSummaryList": [
                                {"name": "no-arn"},
                                {"arn": "arn:aws:imagebuilder:us-east-1:123:infrastructure-configuration/config-1",
                                    "name": "has-arn"}
                            ]
                        });
                        imagebuilderMock.on(GetInfrastructureConfigurationCommand).resolves({
                            "infrastructureConfiguration": {"arn": "arn:aws:imagebuilder:us-east-1:123:infrastructure-configuration/config-1",
                                "name": "has-arn"}
                        });

                        const service = new ImageBuilderService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getInfrastructureConfigurations();

                        expect(result).toHaveLength(1);

                    }
                );

                it(
                    "returns empty when no configurations",
                    async () => {

                        imagebuilderMock.on(ListInfrastructureConfigurationsCommand).resolves({});

                        const service = new ImageBuilderService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getInfrastructureConfigurations();

                        expect(result).toHaveLength(0);

                    }
                );

                it(
                    "skips deleted configurations gracefully",
                    async () => {

                        imagebuilderMock.on(ListInfrastructureConfigurationsCommand).resolves({
                            "infrastructureConfigurationSummaryList": [
                                {"arn": "arn:aws:imagebuilder:us-east-1:123:infrastructure-configuration/config-1",
                                    "name": "config-1"}
                            ]
                        });
                        imagebuilderMock.on(GetInfrastructureConfigurationCommand).rejects(new Error("ResourceNotFoundException"));

                        const service = new ImageBuilderService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getInfrastructureConfigurations();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    SSMClient,
    DescribeParametersCommand,
    DescribeInstanceInformationCommand,
    DescribeMaintenanceWindowsCommand,
    ListDocumentsCommand,
    ListAssociationsCommand,
    DescribePatchBaselinesCommand
} from "@aws-sdk/client-ssm";
import {SsmService} from "../../../../src/providers/live/ssmService.js";

const ssmMock = mockClient(SSMClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    ssmMock.reset();

});

describe(
    "SsmService",
    () => {

        describe(
            "getParameters",
            () => {

                it(
                    "returns parameters from single page",
                    async () => {

                        ssmMock.on(DescribeParametersCommand).resolves({
                            "Parameters": [
                                {"Name": "/app/config",
                                    "Type": "String"},
                                {"Name": "/app/secret",
                                    "Type": "SecureString"}
                            ]
                        });

                        const service = new SsmService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getParameters();

                        expect(result).toHaveLength(2);
                        expect(result[0].Name).toBe("/app/config");

                    }
                );

                it(
                    "aggregates across pages",
                    async () => {

                        ssmMock.on(DescribeParametersCommand).
                            resolvesOnce({"Parameters": [
                                {"Name": "/app/p1",
                                    "Type": "String"}
                            ],
                            "NextToken": "tok"}).
                            resolvesOnce({"Parameters": [
                                {"Name": "/app/p2",
                                    "Type": "String"}
                            ]});

                        const service = new SsmService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getParameters();

                        expect(result).toHaveLength(2);

                    }
                );

                it(
                    "returns empty array when no parameters",
                    async () => {

                        ssmMock.on(DescribeParametersCommand).resolves({});

                        const service = new SsmService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getParameters();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getManagedInstances",
            () => {

                it(
                    "returns managed instances",
                    async () => {

                        ssmMock.on(DescribeInstanceInformationCommand).resolves({
                            "InstanceInformationList": [
                                {"InstanceId": "i-123",
                                    "PingStatus": "Online"}
                            ]
                        });

                        const service = new SsmService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getManagedInstances();

                        expect(result).toHaveLength(1);
                        expect(result[0].InstanceId).toBe("i-123");

                    }
                );

                it(
                    "returns empty array when no instances",
                    async () => {

                        ssmMock.on(DescribeInstanceInformationCommand).resolves({});

                        const service = new SsmService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getManagedInstances();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getMaintenanceWindows",
            () => {

                it(
                    "returns maintenance windows",
                    async () => {

                        ssmMock.on(DescribeMaintenanceWindowsCommand).resolves({
                            "WindowIdentities": [
                                {"WindowId": "mw-123",
                                    "Name": "patch-window"}
                            ]
                        });

                        const service = new SsmService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getMaintenanceWindows();

                        expect(result).toHaveLength(1);
                        expect(result[0].WindowId).toBe("mw-123");

                    }
                );

                it(
                    "returns empty array when no windows",
                    async () => {

                        ssmMock.on(DescribeMaintenanceWindowsCommand).resolves({});

                        const service = new SsmService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getMaintenanceWindows();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getDocuments",
            () => {

                it(
                    "returns documents",
                    async () => {

                        ssmMock.on(ListDocumentsCommand).resolves({
                            "DocumentIdentifiers": [
                                {"Name": "MyDoc",
                                    "Owner": "Self"}
                            ]
                        });

                        const service = new SsmService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getDocuments();

                        expect(result).toHaveLength(1);
                        expect(result[0].Name).toBe("MyDoc");

                    }
                );

                it(
                    "returns empty array when no documents",
                    async () => {

                        ssmMock.on(ListDocumentsCommand).resolves({});

                        const service = new SsmService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getDocuments();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getAssociations",
            () => {

                it(
                    "returns associations",
                    async () => {

                        ssmMock.on(ListAssociationsCommand).resolves({
                            "Associations": [
                                {"AssociationId": "assoc-1",
                                    "Name": "AWS-RunPatchBaseline"}
                            ]
                        });

                        const service = new SsmService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getAssociations();

                        expect(result).toHaveLength(1);
                        expect(result[0].AssociationId).toBe("assoc-1");

                    }
                );

                it(
                    "returns empty array when no associations",
                    async () => {

                        ssmMock.on(ListAssociationsCommand).resolves({});

                        const service = new SsmService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getAssociations();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getPatchBaselines",
            () => {

                it(
                    "returns patch baselines",
                    async () => {

                        ssmMock.on(DescribePatchBaselinesCommand).resolves({
                            "BaselineIdentities": [
                                {"BaselineId": "pb-123",
                                    "BaselineName": "my-baseline"}
                            ]
                        });

                        const service = new SsmService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getPatchBaselines();

                        expect(result).toHaveLength(1);
                        expect(result[0].BaselineId).toBe("pb-123");

                    }
                );

                it(
                    "returns empty array when no baselines",
                    async () => {

                        ssmMock.on(DescribePatchBaselinesCommand).resolves({});

                        const service = new SsmService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getPatchBaselines();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

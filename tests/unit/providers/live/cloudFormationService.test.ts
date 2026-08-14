import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    CloudFormationClient,
    ListStacksCommand,
    ListStackResourcesCommand,
    ListExportsCommand,
    ListStackSetsCommand
} from "@aws-sdk/client-cloudformation";
import {CloudFormationService} from "../../../../src/providers/live/cloudFormationService.js";

const cfnMock = mockClient(CloudFormationClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    cfnMock.reset();

});

describe(
    "CloudFormationService",
    () => {

        describe(
            "getStacks",
            () => {

                it(
                    "returns active stacks",
                    async () => {

                        cfnMock.on(ListStacksCommand).resolves({
                            "StackSummaries": [
                                {"StackName": "stack-1",
                                    "StackStatus": "CREATE_COMPLETE",
                                    "CreationTime": new Date("2024-01-01")},
                                {"StackName": "stack-2",
                                    "StackStatus": "UPDATE_COMPLETE",
                                    "CreationTime": new Date("2024-02-01")}
                            ]
                        });

                        const service = new CloudFormationService(
                            creds,
                            "us-east-1"
                        );
                        const stacks = await service.getStacks();

                        expect(stacks).toHaveLength(2);
                        expect(stacks[0].StackName).toBe("stack-1");

                    }
                );

                it(
                    "aggregates across pages",
                    async () => {

                        cfnMock.on(ListStacksCommand).
                            resolvesOnce({"StackSummaries": [
                                {"StackName": "s1",
                                    "StackStatus": "CREATE_COMPLETE",
                                    "CreationTime": new Date()}
                            ],
                            "NextToken": "tok"}).
                            resolvesOnce({"StackSummaries": [
                                {"StackName": "s2",
                                    "StackStatus": "UPDATE_COMPLETE",
                                    "CreationTime": new Date()}
                            ]});

                        const service = new CloudFormationService(
                            creds,
                            "us-east-1"
                        );
                        const stacks = await service.getStacks();

                        expect(stacks).toHaveLength(2);

                    }
                );

            }
        );

        describe(
            "getStackResources",
            () => {

                it(
                    "returns resources for multiple stacks",
                    async () => {

                        cfnMock.on(
                            ListStackResourcesCommand,
                            {"StackName": "stack-1"}
                        ).resolves({
                            "StackResourceSummaries": [
                                {"LogicalResourceId": "Vpc",
                                    "ResourceType": "AWS::EC2::VPC",
                                    "ResourceStatus": "CREATE_COMPLETE",
                                    "LastUpdatedTimestamp": new Date()},
                                {"LogicalResourceId": "Subnet",
                                    "ResourceType": "AWS::EC2::Subnet",
                                    "ResourceStatus": "CREATE_COMPLETE",
                                    "LastUpdatedTimestamp": new Date()}
                            ]
                        });
                        cfnMock.on(
                            ListStackResourcesCommand,
                            {"StackName": "stack-2"}
                        ).resolves({
                            "StackResourceSummaries": [
                                {"LogicalResourceId": "Lambda",
                                    "ResourceType": "AWS::Lambda::Function",
                                    "ResourceStatus": "CREATE_COMPLETE",
                                    "LastUpdatedTimestamp": new Date()}
                            ]
                        });

                        const service = new CloudFormationService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getStackResources([
                            "stack-1",
                            "stack-2"
                        ]);

                        expect(Object.keys(result)).toHaveLength(2);
                        expect(result["stack-1"]).toHaveLength(2);
                        expect(result["stack-2"]).toHaveLength(1);
                        expect(result["stack-1"][0].LogicalResourceId).toBe("Vpc");
                        expect(result["stack-2"][0].ResourceType).toBe("AWS::Lambda::Function");

                    }
                );

                it(
                    "returns empty resources for stack with no resources",
                    async () => {

                        cfnMock.on(ListStackResourcesCommand).resolves({});

                        const service = new CloudFormationService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getStackResources(["stack-1"]);

                        expect(Object.keys(result)).toHaveLength(1);
                        expect(result["stack-1"]).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getExports",
            () => {

                it(
                    "returns stack exports",
                    async () => {

                        cfnMock.on(ListExportsCommand).resolves({
                            "Exports": [
                                {"Name": "VpcId",
                                    "Value": "vpc-123",
                                    "ExportingStackId": "stack-1"},
                                {"Name": "SubnetId",
                                    "Value": "subnet-456",
                                    "ExportingStackId": "stack-1"}
                            ]
                        });

                        const service = new CloudFormationService(
                            creds,
                            "us-east-1"
                        );
                        const exports = await service.getExports();

                        expect(exports).toHaveLength(2);
                        expect(exports[0].Name).toBe("VpcId");

                    }
                );

                it(
                    "returns empty when no exports",
                    async () => {

                        cfnMock.on(ListExportsCommand).resolves({});

                        const service = new CloudFormationService(
                            creds,
                            "us-east-1"
                        );
                        const exports = await service.getExports();

                        expect(exports).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getStackSets",
            () => {

                it(
                    "returns active stack sets",
                    async () => {

                        cfnMock.on(ListStackSetsCommand).resolves({
                            "Summaries": [
                                {"StackSetName": "ss-1",
                                    "Status": "ACTIVE"},
                                {"StackSetName": "ss-2",
                                    "Status": "ACTIVE"}
                            ]
                        });

                        const service = new CloudFormationService(
                            creds,
                            "us-east-1"
                        );
                        const sets = await service.getStackSets();

                        expect(sets).toHaveLength(2);
                        expect(sets[0].StackSetName).toBe("ss-1");

                    }
                );

                it(
                    "returns empty when no stack sets",
                    async () => {

                        cfnMock.on(ListStackSetsCommand).resolves({});

                        const service = new CloudFormationService(
                            creds,
                            "us-east-1"
                        );
                        const sets = await service.getStackSets();

                        expect(sets).toHaveLength(0);

                    }
                );

            }
        );

    }
);

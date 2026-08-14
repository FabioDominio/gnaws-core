import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {CodeDeployClient, ListApplicationsCommand, ListDeploymentGroupsCommand, BatchGetDeploymentGroupsCommand} from "@aws-sdk/client-codedeploy";
import {CodeDeployService} from "../../../../src/providers/live/codeDeployService.js";

const codeDeployMock = mockClient(CodeDeployClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    codeDeployMock.reset();

});

describe(
    "CodeDeployService",
    () => {

        describe(
            "getDeploymentGroups",
            () => {

                it(
                    "returns deployment groups across applications",
                    async () => {

                        codeDeployMock.on(ListApplicationsCommand).resolves({
                            "applications": [
                                "app-1",
                                "app-2"
                            ]
                        });
                        codeDeployMock.on(ListDeploymentGroupsCommand).callsFake((input: {"applicationName"?: string}) => {

                            if (input.applicationName === "app-1") {

                                return {"deploymentGroups": [
                                    "dg-1a",
                                    "dg-1b"
                                ]};

                            }
                            return {"deploymentGroups": ["dg-2a"]};

                        });
                        codeDeployMock.on(BatchGetDeploymentGroupsCommand).callsFake((input: {"applicationName"?: string;
                            "deploymentGroupNames"?: string[];}) => ({
                            "deploymentGroupsInfo": (input.deploymentGroupNames ?? []).map((name: string) => ({
                                "applicationName": input.applicationName,
                                "deploymentGroupName": name,
                                "deploymentGroupId": `id-${name}`
                            }))
                        }));

                        const service = new CodeDeployService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getDeploymentGroups();

                        expect(result).toHaveLength(3);
                        expect(result[0].deploymentGroupName).toBe("dg-1a");

                    }
                );

                it(
                    "returns empty when no applications",
                    async () => {

                        codeDeployMock.on(ListApplicationsCommand).resolves({});

                        const service = new CodeDeployService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getDeploymentGroups();

                        expect(result).toHaveLength(0);

                    }
                );

                it(
                    "skips applications with no deployment groups",
                    async () => {

                        codeDeployMock.on(ListApplicationsCommand).resolves({
                            "applications": [
                                "app-1",
                                "app-2"
                            ]
                        });
                        codeDeployMock.on(ListDeploymentGroupsCommand).callsFake((input: {"applicationName"?: string}) => {

                            if (input.applicationName === "app-1") {

                                return {"deploymentGroups": ["dg-1"]};

                            }
                            return {"deploymentGroups": []};

                        });
                        codeDeployMock.on(BatchGetDeploymentGroupsCommand).resolves({
                            "deploymentGroupsInfo": [
                                {"applicationName": "app-1",
                                    "deploymentGroupName": "dg-1",
                                    "deploymentGroupId": "id-dg-1"}
                            ]
                        });

                        const service = new CodeDeployService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getDeploymentGroups();

                        expect(result).toHaveLength(1);

                    }
                );

                it(
                    "handles BatchGetDeploymentGroups error gracefully",
                    async () => {

                        codeDeployMock.on(ListApplicationsCommand).resolves({
                            "applications": ["app-1"]
                        });
                        codeDeployMock.on(ListDeploymentGroupsCommand).resolves({
                            "deploymentGroups": ["dg-1"]
                        });
                        codeDeployMock.on(BatchGetDeploymentGroupsCommand).rejects(new Error("ApplicationDoesNotExistException"));

                        const service = new CodeDeployService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getDeploymentGroups();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {WorkSpacesClient, DescribeWorkspacesCommand, DescribeWorkspaceDirectoriesCommand} from "@aws-sdk/client-workspaces";
import {WorkspacesService} from "../../../../src/providers/live/workspacesService.js";

const workspacesMock = mockClient(WorkSpacesClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    workspacesMock.reset();

});

describe(
    "WorkspacesService",
    () => {

        describe(
            "getWorkspaces",
            () => {

                it(
                    "returns workspaces",
                    async () => {

                        workspacesMock.on(DescribeWorkspacesCommand).resolves({
                            "Workspaces": [
                                {"WorkspaceId": "ws-1",
                                    "DirectoryId": "d-1",
                                    "UserName": "user1",
                                    "State": "AVAILABLE",
                                    "BundleId": "wsb-123"},
                                {"WorkspaceId": "ws-2",
                                    "DirectoryId": "d-1",
                                    "UserName": "user2",
                                    "State": "AVAILABLE",
                                    "BundleId": "wsb-456"}
                            ]
                        });

                        const service = new WorkspacesService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getWorkspaces();

                        expect(result).toHaveLength(2);
                        expect(result[0].WorkspaceId).toBe("ws-1");

                    }
                );

                it(
                    "returns empty when no workspaces",
                    async () => {

                        workspacesMock.on(DescribeWorkspacesCommand).resolves({});

                        const service = new WorkspacesService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getWorkspaces();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getDirectories",
            () => {

                it(
                    "returns directories",
                    async () => {

                        workspacesMock.on(DescribeWorkspaceDirectoriesCommand).resolves({
                            "Directories": [
                                {"DirectoryId": "d-1",
                                    "DirectoryName": "corp.example.com",
                                    "DirectoryType": "AD_CONNECTOR",
                                    "State": "REGISTERED"},
                                {"DirectoryId": "d-2",
                                    "DirectoryName": "dev.example.com",
                                    "DirectoryType": "SIMPLE_AD",
                                    "State": "REGISTERED"}
                            ]
                        });

                        const service = new WorkspacesService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getDirectories();

                        expect(result).toHaveLength(2);
                        expect(result[0].DirectoryId).toBe("d-1");

                    }
                );

                it(
                    "returns empty when no directories",
                    async () => {

                        workspacesMock.on(DescribeWorkspaceDirectoriesCommand).resolves({});

                        const service = new WorkspacesService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getDirectories();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

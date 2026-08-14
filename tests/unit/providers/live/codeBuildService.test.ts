import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    CodeBuildClient,
    ListProjectsCommand,
    BatchGetProjectsCommand
} from "@aws-sdk/client-codebuild";
import {CodeBuildService} from "../../../../src/providers/live/codeBuildService.js";

const cbMock = mockClient(CodeBuildClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    cbMock.reset();

});

describe(
    "CodeBuildService",
    () => {

        describe(
            "getProjects",
            () => {

                it(
                    "returns projects from list + batch",
                    async () => {

                        cbMock.on(ListProjectsCommand).resolves({
                            "projects": [
                                "project-1",
                                "project-2"
                            ]
                        });
                        cbMock.on(BatchGetProjectsCommand).resolves({
                            "projects": [
                                {"name": "project-1",
                                    "arn": "arn:aws:codebuild:us-east-1:123:project/project-1"},
                                {"name": "project-2",
                                    "arn": "arn:aws:codebuild:us-east-1:123:project/project-2"}
                            ]
                        });

                        const service = new CodeBuildService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getProjects();

                        expect(result).toHaveLength(2);
                        expect(result[0].name).toBe("project-1");
                        expect(result[1].name).toBe("project-2");

                    }
                );

                it(
                    "aggregates project names across pages",
                    async () => {

                        cbMock.on(ListProjectsCommand).
                            resolvesOnce({"projects": [
                                "p1",
                                "p2"
                            ],
                            "nextToken": "tok"}).
                            resolvesOnce({"projects": ["p3"]});
                        cbMock.on(BatchGetProjectsCommand).resolves({
                            "projects": [
                                {"name": "p1"},
                                {"name": "p2"},
                                {"name": "p3"}
                            ]
                        });

                        const service = new CodeBuildService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getProjects();

                        expect(result).toHaveLength(3);

                    }
                );

                it(
                    "returns empty when no projects exist",
                    async () => {

                        cbMock.on(ListProjectsCommand).resolves({});

                        const service = new CodeBuildService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getProjects();

                        expect(result).toHaveLength(0);

                    }
                );

                it(
                    "batches in groups of 100",
                    async () => {

                        const names = Array.from(
                            {"length": 150},
                            (_, i) => `project-${String(i)}`
                        );
                        cbMock.on(ListProjectsCommand).resolves({"projects": names});
                        cbMock.on(BatchGetProjectsCommand).callsFake((input: {"names"?: string[]}) => ({
                            "projects": (input.names ?? []).map((n: string) => ({"name": n}))
                        }));

                        const service = new CodeBuildService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getProjects();

                        expect(result).toHaveLength(150);
                        const calls = cbMock.commandCalls(BatchGetProjectsCommand);
                        expect(calls).toHaveLength(2);
                        expect(calls[0].args[0].input.names).toHaveLength(100);
                        expect(calls[1].args[0].input.names).toHaveLength(50);

                    }
                );

                it(
                    "handles undefined projects in batch response",
                    async () => {

                        cbMock.on(ListProjectsCommand).resolves({
                            "projects": ["project-1"]
                        });
                        cbMock.on(BatchGetProjectsCommand).resolves({});

                        const service = new CodeBuildService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getProjects();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

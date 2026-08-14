import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    CodePipelineClient,
    ListPipelinesCommand
} from "@aws-sdk/client-codepipeline";
import {CodePipelineService} from "../../../../src/providers/live/codePipelineService.js";

const cpMock = mockClient(CodePipelineClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    cpMock.reset();

});

describe(
    "CodePipelineService",
    () => {

        describe(
            "getPipelines",
            () => {

                it(
                    "returns pipelines",
                    async () => {

                        cpMock.on(ListPipelinesCommand).resolves({
                            "pipelines": [
                                {"name": "pipeline-1",
                                    "version": 1},
                                {"name": "pipeline-2",
                                    "version": 2}
                            ]
                        });

                        const service = new CodePipelineService(
                            creds,
                            "us-east-1"
                        );
                        const pipelines = await service.getPipelines();

                        expect(pipelines).toHaveLength(2);
                        expect(pipelines[0].name).toBe("pipeline-1");

                    }
                );

                it(
                    "aggregates pipelines across pages",
                    async () => {

                        cpMock.on(ListPipelinesCommand).
                            resolvesOnce({"pipelines": [{"name": "p1"}],
                                "nextToken": "tok"}).
                            resolvesOnce({"pipelines": [{"name": "p2"}]});

                        const service = new CodePipelineService(
                            creds,
                            "us-east-1"
                        );
                        const pipelines = await service.getPipelines();

                        expect(pipelines).toHaveLength(2);

                    }
                );

                it(
                    "returns empty when no pipelines",
                    async () => {

                        cpMock.on(ListPipelinesCommand).resolves({});

                        const service = new CodePipelineService(
                            creds,
                            "us-east-1"
                        );
                        const pipelines = await service.getPipelines();

                        expect(pipelines).toHaveLength(0);

                    }
                );

            }
        );

    }
);

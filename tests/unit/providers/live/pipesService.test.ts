import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {PipesClient, ListPipesCommand} from "@aws-sdk/client-pipes";
import {PipesService} from "../../../../src/providers/live/pipesService.js";

const pipesMock = mockClient(PipesClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    pipesMock.reset();

});

describe(
    "PipesService",
    () => {

        describe(
            "getPipes",
            () => {

                it(
                    "returns pipes",
                    async () => {

                        pipesMock.on(ListPipesCommand).resolves({
                            "Pipes": [
                                {"Name": "pipe-1",
                                    "Arn": "arn:aws:pipes:us-east-1:123:pipe/pipe-1",
                                    "CurrentState": "RUNNING",
                                    "Source": "arn:aws:sqs:us-east-1:123:queue1",
                                    "Target": "arn:aws:lambda:us-east-1:123:function:fn1"},
                                {"Name": "pipe-2",
                                    "Arn": "arn:aws:pipes:us-east-1:123:pipe/pipe-2",
                                    "CurrentState": "STOPPED",
                                    "Source": "arn:aws:sqs:us-east-1:123:queue2",
                                    "Target": "arn:aws:lambda:us-east-1:123:function:fn2"}
                            ]
                        });

                        const service = new PipesService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getPipes();

                        expect(result).toHaveLength(2);
                        expect(result[0].Name).toBe("pipe-1");
                        expect(result[0].CurrentState).toBe("RUNNING");

                    }
                );

                it(
                    "returns empty when no pipes",
                    async () => {

                        pipesMock.on(ListPipesCommand).resolves({});

                        const service = new PipesService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getPipes();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

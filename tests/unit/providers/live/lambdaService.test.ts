import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    LambdaClient,
    ListFunctionsCommand,
    ListEventSourceMappingsCommand,
    ListLayersCommand,
    ListAliasesCommand,
    ListFunctionUrlConfigsCommand,
    ListProvisionedConcurrencyConfigsCommand,
    ListTagsCommand
} from "@aws-sdk/client-lambda";
import {LambdaService} from "../../../../src/providers/live/lambdaService.js";

const lambdaMock = mockClient(LambdaClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    lambdaMock.reset();

});

describe(
    "LambdaService",
    () => {

        describe(
            "getLambdas",
            () => {

                it(
                    "returns functions from single page",
                    async () => {

                        lambdaMock.on(ListFunctionsCommand).resolves({
                            "Functions": [
                                {"FunctionName": "fn-1",
                                    "FunctionArn": "arn:aws:lambda:us-east-1:123:function:fn-1"},
                                {"FunctionName": "fn-2",
                                    "FunctionArn": "arn:aws:lambda:us-east-1:123:function:fn-2"}
                            ]
                        });

                        const service = new LambdaService(
                            creds,
                            "us-east-1"
                        );
                        const lambdas = await service.getLambdas();

                        expect(lambdas).toHaveLength(2);
                        expect(lambdas[0].FunctionName).toBe("fn-1");

                    }
                );

                it(
                    "aggregates across pages",
                    async () => {

                        lambdaMock.on(ListFunctionsCommand).
                            resolvesOnce({"Functions": [{"FunctionName": "fn-1"}],
                                "NextMarker": "marker1"}).
                            resolvesOnce({"Functions": [{"FunctionName": "fn-2"}]});

                        const service = new LambdaService(
                            creds,
                            "us-east-1"
                        );
                        const lambdas = await service.getLambdas();

                        expect(lambdas).toHaveLength(2);

                    }
                );

                it(
                    "returns empty array when Functions is undefined",
                    async () => {

                        lambdaMock.on(ListFunctionsCommand).resolves({});

                        const service = new LambdaService(
                            creds,
                            "us-east-1"
                        );
                        const lambdas = await service.getLambdas();

                        expect(lambdas).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getEventSourceMappings",
            () => {

                it(
                    "returns event source mappings",
                    async () => {

                        lambdaMock.on(ListEventSourceMappingsCommand).resolves({
                            "EventSourceMappings": [
                                {"UUID": "uuid-1",
                                    "EventSourceArn": "arn:aws:sqs:us-east-1:123:queue1"},
                                {"UUID": "uuid-2",
                                    "EventSourceArn": "arn:aws:kinesis:us-east-1:123:stream/s1"}
                            ]
                        });

                        const service = new LambdaService(
                            creds,
                            "us-east-1"
                        );
                        const mappings = await service.getEventSourceMappings();

                        expect(mappings).toHaveLength(2);
                        expect(mappings[0].UUID).toBe("uuid-1");

                    }
                );

                it(
                    "returns empty array when undefined",
                    async () => {

                        lambdaMock.on(ListEventSourceMappingsCommand).resolves({});

                        const service = new LambdaService(
                            creds,
                            "us-east-1"
                        );
                        const mappings = await service.getEventSourceMappings();

                        expect(mappings).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getLayers",
            () => {

                it(
                    "returns layers",
                    async () => {

                        lambdaMock.on(ListLayersCommand).resolves({
                            "Layers": [
                                {"LayerName": "layer-1",
                                    "LayerArn": "arn:aws:lambda:us-east-1:123:layer:layer-1"}
                            ]
                        });

                        const service = new LambdaService(
                            creds,
                            "us-east-1"
                        );
                        const layers = await service.getLayers();

                        expect(layers).toHaveLength(1);
                        expect(layers[0].LayerName).toBe("layer-1");

                    }
                );

                it(
                    "returns empty array when Layers is undefined",
                    async () => {

                        lambdaMock.on(ListLayersCommand).resolves({});

                        const service = new LambdaService(
                            creds,
                            "us-east-1"
                        );
                        const layers = await service.getLayers();

                        expect(layers).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getAliases",
            () => {

                it(
                    "returns aliases for a function",
                    async () => {

                        lambdaMock.on(ListAliasesCommand).resolves({
                            "Aliases": [
                                {"AliasArn": "arn:alias:live",
                                    "Name": "live",
                                    "FunctionVersion": "3"},
                                {"AliasArn": "arn:alias:staging",
                                    "Name": "staging",
                                    "FunctionVersion": "2"}
                            ]
                        });

                        const service = new LambdaService(
                            creds,
                            "us-east-1"
                        );
                        const aliases = await service.getAliases("my-function");

                        expect(aliases).toHaveLength(2);
                        expect(aliases[0].Name).toBe("live");

                    }
                );

                it(
                    "returns empty when no aliases",
                    async () => {

                        lambdaMock.on(ListAliasesCommand).resolves({});

                        const service = new LambdaService(
                            creds,
                            "us-east-1"
                        );
                        const aliases = await service.getAliases("my-function");

                        expect(aliases).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getFunctionUrlConfigs",
            () => {

                it(
                    "returns URL configs for a function",
                    async () => {

                        lambdaMock.on(ListFunctionUrlConfigsCommand).resolves({
                            "FunctionUrlConfigs": [
                                {
                                    "FunctionUrl": "https://abc.lambda-url.us-east-1.on.aws/",
                                    "AuthType": "NONE",
                                    "FunctionArn": "arn:fn",
                                    "CreationTime": "2024-01-01",
                                    "LastModifiedTime": "2024-01-01"
                                }
                            ]
                        });

                        const service = new LambdaService(
                            creds,
                            "us-east-1"
                        );
                        const configs = await service.getFunctionUrlConfigs("my-function");

                        expect(configs).toHaveLength(1);
                        expect(configs[0].FunctionUrl).toContain("lambda-url");

                    }
                );

                it(
                    "returns empty when no URL configs",
                    async () => {

                        lambdaMock.on(ListFunctionUrlConfigsCommand).resolves({});

                        const service = new LambdaService(
                            creds,
                            "us-east-1"
                        );
                        const configs = await service.getFunctionUrlConfigs("my-function");

                        expect(configs).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getProvisionedConcurrencyConfigs",
            () => {

                it(
                    "returns provisioned concurrency configs for a function",
                    async () => {

                        lambdaMock.on(ListProvisionedConcurrencyConfigsCommand).resolves({
                            "ProvisionedConcurrencyConfigs": [
                                {"FunctionArn": "arn:aws:lambda:us-east-1:123:function:fn-1",
                                    "RequestedProvisionedConcurrentExecutions": 10,
                                    "AllocatedProvisionedConcurrentExecutions": 10,
                                    "Status": "READY"},
                                {"FunctionArn": "arn:aws:lambda:us-east-1:123:function:fn-1",
                                    "RequestedProvisionedConcurrentExecutions": 5,
                                    "AllocatedProvisionedConcurrentExecutions": 5,
                                    "Status": "READY"}
                            ]
                        });

                        const service = new LambdaService(
                            creds,
                            "us-east-1"
                        );
                        const configs = await service.getProvisionedConcurrencyConfigs("fn-1");

                        expect(configs).toHaveLength(2);
                        expect(configs[0].RequestedProvisionedConcurrentExecutions).toBe(10);

                    }
                );

                it(
                    "returns empty when no provisioned concurrency configs",
                    async () => {

                        lambdaMock.on(ListProvisionedConcurrencyConfigsCommand).resolves({});

                        const service = new LambdaService(
                            creds,
                            "us-east-1"
                        );
                        const configs = await service.getProvisionedConcurrencyConfigs("fn-1");

                        expect(configs).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getTagsForFunction",
            () => {

                it(
                    "returns tags for a function",
                    async () => {

                        lambdaMock.on(ListTagsCommand).resolves({
                            "Tags": {"env": "prod",
                                "team": "infra"}
                        });

                        const service = new LambdaService(
                            creds,
                            "us-east-1"
                        );
                        const tags = await service.getTagsForFunction("arn:aws:lambda:us-east-1:123:function:fn-1");

                        expect(tags).toEqual({"env": "prod",
                            "team": "infra"});

                    }
                );

                it(
                    "returns empty object when Tags is undefined",
                    async () => {

                        lambdaMock.on(ListTagsCommand).resolves({});

                        const service = new LambdaService(
                            creds,
                            "us-east-1"
                        );
                        const tags = await service.getTagsForFunction("arn:aws:lambda:us-east-1:123:function:fn-1");

                        expect(tags).toEqual({});

                    }
                );

                it(
                    "returns empty object on error",
                    async () => {

                        lambdaMock.on(ListTagsCommand).rejects(new Error("AccessDenied"));

                        const service = new LambdaService(
                            creds,
                            "us-east-1"
                        );
                        const tags = await service.getTagsForFunction("arn:aws:lambda:us-east-1:123:function:fn-1");

                        expect(tags).toEqual({});

                    }
                );

            }
        );

    }
);

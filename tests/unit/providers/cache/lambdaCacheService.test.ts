import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {LambdaCacheService} from "../../../../src/providers/cache/lambdaCacheService.js";

describe(
    "LambdaCacheService",
    () => {

        let tmpDir: string;

        beforeEach(() => {

            tmpDir = mkdtempSync(join(
                tmpdir(),
                "gnaws-test-"
            ));

        });

        afterEach(() => {

            rmSync(
                tmpDir,
                {"recursive": true}
            );

        });

        const methods = [
            {"method": "getLambdas",
                "file": "lambda_functions.json",
                "data": [
                    {"FunctionName": "my-fn",
                        "FunctionArn": "arn:aws:lambda:us-east-1:123:function:my-fn"}
                ]},
            {"method": "getEventSourceMappings",
                "file": "lambda_event_source_mappings.json",
                "data": [
                    {"UUID": "uuid-1",
                        "EventSourceArn": "arn:aws:sqs:us-east-1:123:queue"}
                ]},
            {"method": "getLayers",
                "file": "lambda_layers.json",
                "data": [
                    {"LayerName": "my-layer",
                        "LayerArn": "arn:aws:lambda:us-east-1:123:layer:my-layer"}
                ]},
            {"method": "getAliases",
                "file": "lambda_aliases.json",
                "data": [
                    {"Name": "prod",
                        "FunctionVersion": "1"}
                ],
                "args": ["my-fn"]},
            {"method": "getFunctionUrlConfigs",
                "file": "lambda_function_url_configs.json",
                "data": [{"FunctionUrl": "https://abc.lambda-url.us-east-1.on.aws/"}],
                "args": ["my-fn"]},
            {"method": "getProvisionedConcurrencyConfigs",
                "file": "lambda_provisioned_concurrency.json",
                "data": [{"AllocatedProvisionedConcurrentExecutions": 5}],
                "args": ["my-fn"]}
        ] as const;

        for (const entry of methods) {

            const {method, file, data} = entry;
            const args = "args" in entry
                ? entry.args
                : [];

            it(
                `${method} reads ${file}`,
                async () => {

                    writeFileSync(
                        join(
                            tmpDir,
                            file
                        ),
                        JSON.stringify(data)
                    );
                    const service = new LambdaCacheService(tmpDir);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
                    const result = await (service[method] as any)(...args);
                    expect(result).toEqual(data);

                }
            );

            it(
                `${method} returns empty array for missing file`,
                async () => {

                    const service = new LambdaCacheService(tmpDir);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
                    const result = await (service[method] as any)(...args);
                    expect(result).toEqual([]);

                }
            );

        }

        it(
            "getTagsForFunction returns empty object",
            async () => {

                const service = new LambdaCacheService(tmpDir);
                const result = await service.getTagsForFunction("arn:aws:lambda:us-east-1:123:function:fn");
                expect(result).toEqual({});

            }
        );

    }
);

import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {CloudFormationCacheService} from "../../../../src/providers/cache/cloudFormationCacheService.js";

describe(
    "CloudFormationCacheService",
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

        it(
            "getStacks reads cloudformation_stacks.json",
            async () => {

                const data = [
                    {"StackName": "my-stack",
                        "StackId": "arn:aws:cloudformation:us-east-1:123:stack/my-stack/guid"}
                ];
                writeFileSync(
                    join(
                        tmpDir,
                        "cloudformation_stacks.json"
                    ),
                    JSON.stringify(data)
                );
                const service = new CloudFormationCacheService(tmpDir);
                const result = await service.getStacks();
                expect(result).toEqual(data);

            }
        );

        it(
            "getStacks returns empty array for missing file",
            async () => {

                const service = new CloudFormationCacheService(tmpDir);
                const result = await service.getStacks();
                expect(result).toEqual([]);

            }
        );

        it(
            "getStackResources reads cloudformation_stack_resources.json as object",
            async () => {

                const data = {"stack-1": [
                    {"LogicalResourceId": "MyBucket",
                        "ResourceType": "AWS::S3::Bucket"}
                ]};
                writeFileSync(
                    join(
                        tmpDir,
                        "cloudformation_stack_resources.json"
                    ),
                    JSON.stringify(data)
                );
                const service = new CloudFormationCacheService(tmpDir);
                const result = await service.getStackResources(["stack-1"]);
                expect(result).toEqual(data);

            }
        );

        it(
            "getStackResources returns empty object for missing file",
            async () => {

                const service = new CloudFormationCacheService(tmpDir);
                const result = await service.getStackResources(["stack-1"]);
                expect(result).toEqual({});

            }
        );

        it(
            "getExports reads cloudformation_exports.json",
            async () => {

                const data = [
                    {"Name": "my-export",
                        "Value": "some-value"}
                ];
                writeFileSync(
                    join(
                        tmpDir,
                        "cloudformation_exports.json"
                    ),
                    JSON.stringify(data)
                );
                const service = new CloudFormationCacheService(tmpDir);
                const result = await service.getExports();
                expect(result).toEqual(data);

            }
        );

        it(
            "getExports returns empty array for missing file",
            async () => {

                const service = new CloudFormationCacheService(tmpDir);
                const result = await service.getExports();
                expect(result).toEqual([]);

            }
        );

        it(
            "getStackSets reads cloudformation_stack_sets.json",
            async () => {

                const data = [
                    {"StackSetName": "my-stackset",
                        "StackSetId": "ss-1"}
                ];
                writeFileSync(
                    join(
                        tmpDir,
                        "cloudformation_stack_sets.json"
                    ),
                    JSON.stringify(data)
                );
                const service = new CloudFormationCacheService(tmpDir);
                const result = await service.getStackSets();
                expect(result).toEqual(data);

            }
        );

        it(
            "getStackSets returns empty array for missing file",
            async () => {

                const service = new CloudFormationCacheService(tmpDir);
                const result = await service.getStackSets();
                expect(result).toEqual([]);

            }
        );

    }
);

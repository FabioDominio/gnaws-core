import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {CodeDeployCacheService} from "../../../../src/providers/cache/codeDeployCacheService.js";

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

describe(
    "CodeDeployCacheService",
    () => {

        it(
            "getDeploymentGroups reads codedeploy_deployment_groups.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "codedeploy_deployment_groups.json"
                    ),
                    JSON.stringify([{"deploymentGroupName": "dg1"}])
                );
                const service = new CodeDeployCacheService(tmpDir);
                expect(await service.getDeploymentGroups()).toEqual([{"deploymentGroupName": "dg1"}]);

            }
        );

        it(
            "getDeploymentGroups returns empty for missing file",
            async () => {

                const service = new CodeDeployCacheService(tmpDir);
                expect(await service.getDeploymentGroups()).toEqual([]);

            }
        );

    }
);

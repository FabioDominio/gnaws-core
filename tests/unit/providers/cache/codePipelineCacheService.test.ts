import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {CodePipelineCacheService} from "../../../../src/providers/cache/codePipelineCacheService.js";

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
    "CodePipelineCacheService",
    () => {

        it(
            "getPipelines reads codepipeline_pipelines.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "codepipeline_pipelines.json"
                    ),
                    JSON.stringify([{"name": "pipeline1"}])
                );
                const service = new CodePipelineCacheService(tmpDir);
                expect(await service.getPipelines()).toEqual([{"name": "pipeline1"}]);

            }
        );

        it(
            "getPipelines returns empty for missing file",
            async () => {

                const service = new CodePipelineCacheService(tmpDir);
                expect(await service.getPipelines()).toEqual([]);

            }
        );

    }
);

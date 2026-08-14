import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {CodeBuildCacheService} from "../../../../src/providers/cache/codeBuildCacheService.js";

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
    "CodeBuildCacheService",
    () => {

        it(
            "getProjects reads codebuild_projects.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "codebuild_projects.json"
                    ),
                    JSON.stringify([{"name": "project1"}])
                );
                const service = new CodeBuildCacheService(tmpDir);
                expect(await service.getProjects()).toEqual([{"name": "project1"}]);

            }
        );

        it(
            "getProjects returns empty for missing file",
            async () => {

                const service = new CodeBuildCacheService(tmpDir);
                expect(await service.getProjects()).toEqual([]);

            }
        );

    }
);

import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {EcrCacheService} from "../../../../src/providers/cache/ecrCacheService.js";

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
    "EcrCacheService",
    () => {

        it(
            "getRepositories reads ecr_repositories.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "ecr_repositories.json"
                    ),
                    JSON.stringify([{"repositoryName": "repo1"}])
                );
                const service = new EcrCacheService(tmpDir);
                expect(await service.getRepositories()).toEqual([{"repositoryName": "repo1"}]);

            }
        );

        it(
            "getRepositories returns empty for missing file",
            async () => {

                const service = new EcrCacheService(tmpDir);
                expect(await service.getRepositories()).toEqual([]);

            }
        );

    }
);

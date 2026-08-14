import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {CodeArtifactCacheService} from "../../../../src/providers/cache/codeArtifactCacheService.js";

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
    "CodeArtifactCacheService",
    () => {

        it(
            "getDomains reads codeartifact_domains.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "codeartifact_domains.json"
                    ),
                    JSON.stringify([{"name": "domain1"}])
                );
                const service = new CodeArtifactCacheService(tmpDir);
                expect(await service.getDomains()).toEqual([{"name": "domain1"}]);

            }
        );

        it(
            "getDomains returns empty for missing file",
            async () => {

                const service = new CodeArtifactCacheService(tmpDir);
                expect(await service.getDomains()).toEqual([]);

            }
        );

        it(
            "getRepositories reads codeartifact_repositories.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "codeartifact_repositories.json"
                    ),
                    JSON.stringify([{"name": "repo1"}])
                );
                const service = new CodeArtifactCacheService(tmpDir);
                expect(await service.getRepositories()).toEqual([{"name": "repo1"}]);

            }
        );

        it(
            "getRepositories returns empty for missing file",
            async () => {

                const service = new CodeArtifactCacheService(tmpDir);
                expect(await service.getRepositories()).toEqual([]);

            }
        );

    }
);

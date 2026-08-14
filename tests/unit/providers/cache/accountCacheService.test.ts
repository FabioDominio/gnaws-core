import {mkdtempSync, mkdirSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {AccountCacheService} from "../../../../src/providers/cache/accountCacheService.js";

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
    "AccountCacheService",
    () => {

        it(
            "getRegions derives regions from subdirectories",
            async () => {

                // AccountCacheService expects cacheDir to be like <root>/global
                const root = join(
                    tmpDir,
                    "root"
                );
                mkdirSync(root);
                mkdirSync(join(
                    root,
                    "us-east-1"
                ));
                mkdirSync(join(
                    root,
                    "eu-west-1"
                ));
                mkdirSync(join(
                    root,
                    "global"
                ));
                const service = new AccountCacheService(join(
                    root,
                    "global"
                ));
                const result = await service.getRegions();
                const names = result.map((r) => r.RegionName).sort();
                expect(names).toContain("us-east-1");
                expect(names).toContain("eu-west-1");

            }
        );

        it(
            "getRegions returns empty when no region subdirectories",
            async () => {

                const root = join(
                    tmpDir,
                    "empty"
                );
                mkdirSync(root);
                mkdirSync(join(
                    root,
                    "global"
                ));
                const service = new AccountCacheService(join(
                    root,
                    "global"
                ));
                const result = await service.getRegions();
                expect(result).toEqual([]);

            }
        );

    }
);

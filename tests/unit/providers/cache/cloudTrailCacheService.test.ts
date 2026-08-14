import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {CloudTrailCacheService} from "../../../../src/providers/cache/cloudTrailCacheService.js";

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
    "CloudTrailCacheService",
    () => {

        it(
            "getTrails reads cloudtrail_trails.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "cloudtrail_trails.json"
                    ),
                    JSON.stringify([{"Name": "trail1"}])
                );
                const service = new CloudTrailCacheService(tmpDir);
                expect(await service.getTrails()).toEqual([{"Name": "trail1"}]);

            }
        );

        it(
            "getTrails returns empty for missing file",
            async () => {

                const service = new CloudTrailCacheService(tmpDir);
                expect(await service.getTrails()).toEqual([]);

            }
        );

    }
);

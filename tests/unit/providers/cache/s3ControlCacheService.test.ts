import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {S3ControlCacheService} from "../../../../src/providers/cache/s3ControlCacheService.js";

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
    "S3ControlCacheService",
    () => {

        it(
            "getAccessPoints reads s3control_access_points.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "s3control_access_points.json"
                    ),
                    JSON.stringify([{"Name": "ap1"}])
                );
                const service = new S3ControlCacheService(tmpDir);
                expect(await service.getAccessPoints()).toEqual([{"Name": "ap1"}]);

            }
        );

        it(
            "getAccessPoints returns empty for missing file",
            async () => {

                const service = new S3ControlCacheService(tmpDir);
                expect(await service.getAccessPoints()).toEqual([]);

            }
        );

    }
);

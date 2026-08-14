import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {EmrServerlessCacheService} from "../../../../src/providers/cache/emrServerlessCacheService.js";

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
    "EmrServerlessCacheService",
    () => {

        it(
            "getApplications reads emr_serverless_applications.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "emr_serverless_applications.json"
                    ),
                    JSON.stringify([{"id": "app1"}])
                );
                const service = new EmrServerlessCacheService(tmpDir);
                expect(await service.getApplications()).toEqual([{"id": "app1"}]);

            }
        );

        it(
            "getApplications returns empty for missing file",
            async () => {

                const service = new EmrServerlessCacheService(tmpDir);
                expect(await service.getApplications()).toEqual([]);

            }
        );

    }
);

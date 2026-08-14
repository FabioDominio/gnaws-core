import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {EfsCacheService} from "../../../../src/providers/cache/efsCacheService.js";

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
    "EfsCacheService",
    () => {

        it(
            "getFileSystems reads efs_file_systems.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "efs_file_systems.json"
                    ),
                    JSON.stringify([{"FileSystemId": "fs-1"}])
                );
                const service = new EfsCacheService(tmpDir);
                expect(await service.getFileSystems()).toEqual([{"FileSystemId": "fs-1"}]);

            }
        );

        it(
            "getFileSystems returns empty for missing file",
            async () => {

                const service = new EfsCacheService(tmpDir);
                expect(await service.getFileSystems()).toEqual([]);

            }
        );

        it(
            "getMountTargets always returns empty",
            async () => {

                const service = new EfsCacheService(tmpDir);
                expect(await service.getMountTargets("fs-1")).toEqual([]);

            }
        );

        it(
            "getAccessPoints reads efs_access_points.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "efs_access_points.json"
                    ),
                    JSON.stringify([{"AccessPointId": "ap-1"}])
                );
                const service = new EfsCacheService(tmpDir);
                expect(await service.getAccessPoints()).toEqual([{"AccessPointId": "ap-1"}]);

            }
        );

        it(
            "getAccessPoints returns empty for missing file",
            async () => {

                const service = new EfsCacheService(tmpDir);
                expect(await service.getAccessPoints()).toEqual([]);

            }
        );

    }
);

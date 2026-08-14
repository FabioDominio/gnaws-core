import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {FsxCacheService} from "../../../../src/providers/cache/fsxCacheService.js";

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
    "FsxCacheService",
    () => {

        it(
            "getFileSystems reads fsx_file_systems.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "fsx_file_systems.json"
                    ),
                    JSON.stringify([{"FileSystemId": "fs-1"}])
                );
                const service = new FsxCacheService(tmpDir);
                expect(await service.getFileSystems()).toEqual([{"FileSystemId": "fs-1"}]);

            }
        );

        it(
            "getFileSystems returns empty for missing file",
            async () => {

                const service = new FsxCacheService(tmpDir);
                expect(await service.getFileSystems()).toEqual([]);

            }
        );

    }
);

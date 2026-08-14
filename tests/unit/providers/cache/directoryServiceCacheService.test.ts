import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {DirectoryCacheServiceCacheService} from "../../../../src/providers/cache/directoryServiceCacheService.js";

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
    "DirectoryCacheServiceCacheService",
    () => {

        it(
            "getDirectories reads directoryservice_directories.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "directoryservice_directories.json"
                    ),
                    JSON.stringify([{"DirectoryId": "d-123"}])
                );
                const service = new DirectoryCacheServiceCacheService(tmpDir);
                expect(await service.getDirectories()).toEqual([{"DirectoryId": "d-123"}]);

            }
        );

        it(
            "getDirectories returns empty for missing file",
            async () => {

                const service = new DirectoryCacheServiceCacheService(tmpDir);
                expect(await service.getDirectories()).toEqual([]);

            }
        );

    }
);

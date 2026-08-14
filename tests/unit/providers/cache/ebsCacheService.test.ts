import {mkdtempSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {EbsCacheService} from "../../../../src/providers/cache/ebsCacheService.js";

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
    "EbsCacheService",
    () => {

        it(
            "getSnapshotBlocks always returns empty",
            async () => {

                const service = new EbsCacheService(tmpDir);
                expect(await service.getSnapshotBlocks("snap-123")).toEqual([]);

            }
        );

    }
);

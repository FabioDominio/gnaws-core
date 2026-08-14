import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {MskCacheService} from "../../../../src/providers/cache/mskCacheService.js";

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
    "MskCacheService",
    () => {

        it(
            "getClusters reads msk_clusters.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "msk_clusters.json"
                    ),
                    JSON.stringify([{"ClusterName": "kafka1"}])
                );
                const service = new MskCacheService(tmpDir);
                expect(await service.getClusters()).toEqual([{"ClusterName": "kafka1"}]);

            }
        );

        it(
            "getClusters returns empty for missing file",
            async () => {

                const service = new MskCacheService(tmpDir);
                expect(await service.getClusters()).toEqual([]);

            }
        );

    }
);

import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {CloudHsmCacheService} from "../../../../src/providers/cache/cloudHsmCacheService.js";

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
    "CloudHsmCacheService",
    () => {

        it(
            "getClusters reads cloudhsm_clusters.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "cloudhsm_clusters.json"
                    ),
                    JSON.stringify([{"ClusterId": "cluster-1"}])
                );
                const service = new CloudHsmCacheService(tmpDir);
                expect(await service.getClusters()).toEqual([{"ClusterId": "cluster-1"}]);

            }
        );

        it(
            "getClusters returns empty for missing file",
            async () => {

                const service = new CloudHsmCacheService(tmpDir);
                expect(await service.getClusters()).toEqual([]);

            }
        );

    }
);

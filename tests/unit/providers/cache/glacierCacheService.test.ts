import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {GlacierCacheService} from "../../../../src/providers/cache/glacierCacheService.js";

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
    "GlacierCacheService",
    () => {

        it(
            "getVaults reads glacier_vaults.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "glacier_vaults.json"
                    ),
                    JSON.stringify([{"VaultName": "vault1"}])
                );
                const service = new GlacierCacheService(tmpDir);
                expect(await service.getVaults()).toEqual([{"VaultName": "vault1"}]);

            }
        );

        it(
            "getVaults returns empty for missing file",
            async () => {

                const service = new GlacierCacheService(tmpDir);
                expect(await service.getVaults()).toEqual([]);

            }
        );

    }
);

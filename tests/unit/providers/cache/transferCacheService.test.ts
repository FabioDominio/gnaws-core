import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {TransferCacheService} from "../../../../src/providers/cache/transferCacheService.js";

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
    "TransferCacheService",
    () => {

        it(
            "getServers reads transfer_servers.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "transfer_servers.json"
                    ),
                    JSON.stringify([{"ServerId": "s-1"}])
                );
                const service = new TransferCacheService(tmpDir);
                expect(await service.getServers()).toEqual([{"ServerId": "s-1"}]);

            }
        );

        it(
            "getServers returns empty for missing file",
            async () => {

                const service = new TransferCacheService(tmpDir);
                expect(await service.getServers()).toEqual([]);

            }
        );

    }
);

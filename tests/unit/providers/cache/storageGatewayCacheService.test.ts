import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {StorageGatewayCacheService} from "../../../../src/providers/cache/storageGatewayCacheService.js";

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
    "StorageGatewayCacheService",
    () => {

        it(
            "getGateways reads storagegateway_gateways.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "storagegateway_gateways.json"
                    ),
                    JSON.stringify([{"GatewayId": "sgw-1"}])
                );
                const service = new StorageGatewayCacheService(tmpDir);
                expect(await service.getGateways()).toEqual([{"GatewayId": "sgw-1"}]);

            }
        );

        it(
            "getGateways returns empty for missing file",
            async () => {

                const service = new StorageGatewayCacheService(tmpDir);
                expect(await service.getGateways()).toEqual([]);

            }
        );

        it(
            "getFileShares reads storagegateway_file_shares.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "storagegateway_file_shares.json"
                    ),
                    JSON.stringify([{"FileShareId": "fs-1"}])
                );
                const service = new StorageGatewayCacheService(tmpDir);
                expect(await service.getFileShares()).toEqual([{"FileShareId": "fs-1"}]);

            }
        );

        it(
            "getFileShares returns empty for missing file",
            async () => {

                const service = new StorageGatewayCacheService(tmpDir);
                expect(await service.getFileShares()).toEqual([]);

            }
        );

        it(
            "getVolumes reads storagegateway_volumes.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "storagegateway_volumes.json"
                    ),
                    JSON.stringify([{"VolumeId": "vol-1"}])
                );
                const service = new StorageGatewayCacheService(tmpDir);
                expect(await service.getVolumes()).toEqual([{"VolumeId": "vol-1"}]);

            }
        );

        it(
            "getVolumes returns empty for missing file",
            async () => {

                const service = new StorageGatewayCacheService(tmpDir);
                expect(await service.getVolumes()).toEqual([]);

            }
        );

    }
);

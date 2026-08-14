import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {NeptuneCacheService} from "../../../../src/providers/cache/neptuneCacheService.js";

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
    "NeptuneCacheService",
    () => {

        it(
            "getDBClusters reads neptune_clusters.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "neptune_clusters.json"
                    ),
                    JSON.stringify([{"DBClusterIdentifier": "neptune1"}])
                );
                const service = new NeptuneCacheService(tmpDir);
                expect(await service.getDBClusters()).toEqual([{"DBClusterIdentifier": "neptune1"}]);

            }
        );

        it(
            "getDBClusters returns empty for missing file",
            async () => {

                const service = new NeptuneCacheService(tmpDir);
                expect(await service.getDBClusters()).toEqual([]);

            }
        );

        it(
            "getDBInstances reads neptune_instances.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "neptune_instances.json"
                    ),
                    JSON.stringify([{"DBInstanceIdentifier": "inst1"}])
                );
                const service = new NeptuneCacheService(tmpDir);
                expect(await service.getDBInstances()).toEqual([{"DBInstanceIdentifier": "inst1"}]);

            }
        );

        it(
            "getDBInstances returns empty for missing file",
            async () => {

                const service = new NeptuneCacheService(tmpDir);
                expect(await service.getDBInstances()).toEqual([]);

            }
        );

        it(
            "getDBSubnetGroups reads neptune_subnet_groups.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "neptune_subnet_groups.json"
                    ),
                    JSON.stringify([{"DBSubnetGroupName": "sg1"}])
                );
                const service = new NeptuneCacheService(tmpDir);
                expect(await service.getDBSubnetGroups()).toEqual([{"DBSubnetGroupName": "sg1"}]);

            }
        );

        it(
            "getDBSubnetGroups returns empty for missing file",
            async () => {

                const service = new NeptuneCacheService(tmpDir);
                expect(await service.getDBSubnetGroups()).toEqual([]);

            }
        );

    }
);

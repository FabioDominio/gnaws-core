import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {DocDbCacheService} from "../../../../src/providers/cache/docDbCacheService.js";

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
    "DocDbCacheService",
    () => {

        it(
            "getDBClusters reads docdb_clusters.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "docdb_clusters.json"
                    ),
                    JSON.stringify([{"DBClusterIdentifier": "cluster1"}])
                );
                const service = new DocDbCacheService(tmpDir);
                expect(await service.getDBClusters()).toEqual([{"DBClusterIdentifier": "cluster1"}]);

            }
        );

        it(
            "getDBClusters returns empty for missing file",
            async () => {

                const service = new DocDbCacheService(tmpDir);
                expect(await service.getDBClusters()).toEqual([]);

            }
        );

        it(
            "getDBInstances reads docdb_instances.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "docdb_instances.json"
                    ),
                    JSON.stringify([{"DBInstanceIdentifier": "inst1"}])
                );
                const service = new DocDbCacheService(tmpDir);
                expect(await service.getDBInstances()).toEqual([{"DBInstanceIdentifier": "inst1"}]);

            }
        );

        it(
            "getDBInstances returns empty for missing file",
            async () => {

                const service = new DocDbCacheService(tmpDir);
                expect(await service.getDBInstances()).toEqual([]);

            }
        );

        it(
            "getDBSubnetGroups reads docdb_subnet_groups.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "docdb_subnet_groups.json"
                    ),
                    JSON.stringify([{"DBSubnetGroupName": "sg1"}])
                );
                const service = new DocDbCacheService(tmpDir);
                expect(await service.getDBSubnetGroups()).toEqual([{"DBSubnetGroupName": "sg1"}]);

            }
        );

        it(
            "getDBSubnetGroups returns empty for missing file",
            async () => {

                const service = new DocDbCacheService(tmpDir);
                expect(await service.getDBSubnetGroups()).toEqual([]);

            }
        );

    }
);

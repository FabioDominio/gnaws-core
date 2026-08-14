import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {RedshiftCacheService} from "../../../../src/providers/cache/redshiftCacheService.js";

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
    "RedshiftCacheService",
    () => {

        it(
            "getClusters reads redshift_clusters.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "redshift_clusters.json"
                    ),
                    JSON.stringify([{"ClusterIdentifier": "rs1"}])
                );
                const service = new RedshiftCacheService(tmpDir);
                expect(await service.getClusters()).toEqual([{"ClusterIdentifier": "rs1"}]);

            }
        );

        it(
            "getClusters returns empty for missing file",
            async () => {

                const service = new RedshiftCacheService(tmpDir);
                expect(await service.getClusters()).toEqual([]);

            }
        );

        it(
            "getClusterSubnetGroups reads redshift_subnet_groups.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "redshift_subnet_groups.json"
                    ),
                    JSON.stringify([{"ClusterSubnetGroupName": "sg1"}])
                );
                const service = new RedshiftCacheService(tmpDir);
                expect(await service.getClusterSubnetGroups()).toEqual([{"ClusterSubnetGroupName": "sg1"}]);

            }
        );

        it(
            "getClusterSubnetGroups returns empty for missing file",
            async () => {

                const service = new RedshiftCacheService(tmpDir);
                expect(await service.getClusterSubnetGroups()).toEqual([]);

            }
        );

    }
);

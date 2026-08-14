import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {MemoryDbCacheService} from "../../../../src/providers/cache/memoryDbCacheService.js";

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
    "MemoryDbCacheService",
    () => {

        it(
            "getClusters reads memorydb_clusters.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "memorydb_clusters.json"
                    ),
                    JSON.stringify([{"Name": "cluster1"}])
                );
                const service = new MemoryDbCacheService(tmpDir);
                expect(await service.getClusters()).toEqual([{"Name": "cluster1"}]);

            }
        );

        it(
            "getClusters returns empty for missing file",
            async () => {

                const service = new MemoryDbCacheService(tmpDir);
                expect(await service.getClusters()).toEqual([]);

            }
        );

        it(
            "getSubnetGroups reads memorydb_subnet_groups.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "memorydb_subnet_groups.json"
                    ),
                    JSON.stringify([{"Name": "sg1"}])
                );
                const service = new MemoryDbCacheService(tmpDir);
                expect(await service.getSubnetGroups()).toEqual([{"Name": "sg1"}]);

            }
        );

        it(
            "getSubnetGroups returns empty for missing file",
            async () => {

                const service = new MemoryDbCacheService(tmpDir);
                expect(await service.getSubnetGroups()).toEqual([]);

            }
        );

        it(
            "getACLs reads memorydb_acls.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "memorydb_acls.json"
                    ),
                    JSON.stringify([{"Name": "acl1"}])
                );
                const service = new MemoryDbCacheService(tmpDir);
                expect(await service.getACLs()).toEqual([{"Name": "acl1"}]);

            }
        );

        it(
            "getACLs returns empty for missing file",
            async () => {

                const service = new MemoryDbCacheService(tmpDir);
                expect(await service.getACLs()).toEqual([]);

            }
        );

        it(
            "getUsers reads memorydb_users.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "memorydb_users.json"
                    ),
                    JSON.stringify([{"Name": "user1"}])
                );
                const service = new MemoryDbCacheService(tmpDir);
                expect(await service.getUsers()).toEqual([{"Name": "user1"}]);

            }
        );

        it(
            "getUsers returns empty for missing file",
            async () => {

                const service = new MemoryDbCacheService(tmpDir);
                expect(await service.getUsers()).toEqual([]);

            }
        );

    }
);

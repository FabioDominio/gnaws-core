import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {ElastiCacheCacheService} from "../../../../src/providers/cache/elastiCacheCacheService.js";

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
    "ElastiCacheCacheService",
    () => {

        it(
            "getCacheClusters reads elasticache_clusters.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "elasticache_clusters.json"
                    ),
                    JSON.stringify([{"CacheClusterId": "cc1"}])
                );
                const service = new ElastiCacheCacheService(tmpDir);
                expect(await service.getCacheClusters()).toEqual([{"CacheClusterId": "cc1"}]);

            }
        );

        it(
            "getCacheClusters returns empty for missing file",
            async () => {

                const service = new ElastiCacheCacheService(tmpDir);
                expect(await service.getCacheClusters()).toEqual([]);

            }
        );

        it(
            "getReplicationGroups reads elasticache_replication_groups.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "elasticache_replication_groups.json"
                    ),
                    JSON.stringify([{"ReplicationGroupId": "rg1"}])
                );
                const service = new ElastiCacheCacheService(tmpDir);
                expect(await service.getReplicationGroups()).toEqual([{"ReplicationGroupId": "rg1"}]);

            }
        );

        it(
            "getReplicationGroups returns empty for missing file",
            async () => {

                const service = new ElastiCacheCacheService(tmpDir);
                expect(await service.getReplicationGroups()).toEqual([]);

            }
        );

        it(
            "getCacheSubnetGroups reads elasticache_cache_subnet_groups.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "elasticache_cache_subnet_groups.json"
                    ),
                    JSON.stringify([{"CacheSubnetGroupName": "sg1"}])
                );
                const service = new ElastiCacheCacheService(tmpDir);
                expect(await service.getCacheSubnetGroups()).toEqual([{"CacheSubnetGroupName": "sg1"}]);

            }
        );

        it(
            "getCacheSubnetGroups returns empty for missing file",
            async () => {

                const service = new ElastiCacheCacheService(tmpDir);
                expect(await service.getCacheSubnetGroups()).toEqual([]);

            }
        );

        it(
            "getServerlessCaches reads elasticache_serverless_caches.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "elasticache_serverless_caches.json"
                    ),
                    JSON.stringify([{"ServerlessCacheName": "sc1"}])
                );
                const service = new ElastiCacheCacheService(tmpDir);
                expect(await service.getServerlessCaches()).toEqual([{"ServerlessCacheName": "sc1"}]);

            }
        );

        it(
            "getServerlessCaches returns empty for missing file",
            async () => {

                const service = new ElastiCacheCacheService(tmpDir);
                expect(await service.getServerlessCaches()).toEqual([]);

            }
        );

    }
);

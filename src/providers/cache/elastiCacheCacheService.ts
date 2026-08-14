import type {CacheCluster, CacheSubnetGroup, ReplicationGroup, ServerlessCache} from "@aws-sdk/client-elasticache";
import type {ElastiCache} from "../../interfaces/elasticache.js";
import {readCacheFile} from "./cacheReader.js";

export class ElastiCacheCacheService implements ElastiCache {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getCacheClusters (): Promise<CacheCluster[]> {

        return readCacheFile(
            this.#cacheDir,
            "elasticache_clusters.json"
        );

    }

    async getReplicationGroups (): Promise<ReplicationGroup[]> {

        return readCacheFile(
            this.#cacheDir,
            "elasticache_replication_groups.json"
        );

    }

    async getCacheSubnetGroups (): Promise<CacheSubnetGroup[]> {

        return readCacheFile(
            this.#cacheDir,
            "elasticache_cache_subnet_groups.json"
        );

    }

    async getServerlessCaches (): Promise<ServerlessCache[]> {

        return readCacheFile(
            this.#cacheDir,
            "elasticache_serverless_caches.json"
        );

    }

}

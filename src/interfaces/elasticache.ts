import type {CacheCluster, CacheSubnetGroup, ReplicationGroup, ServerlessCache} from "@aws-sdk/client-elasticache";

export interface ElastiCache {
    getCacheClusters (): Promise<CacheCluster[]>;
    getReplicationGroups (): Promise<ReplicationGroup[]>;
    getCacheSubnetGroups (): Promise<CacheSubnetGroup[]>;
    getServerlessCaches (): Promise<ServerlessCache[]>;
}

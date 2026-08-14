import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type CacheCluster,
    type CacheSubnetGroup,
    type ReplicationGroup,
    type ServerlessCache,
    ElastiCacheClient,
    type ElastiCacheClientConfig,
    paginateDescribeCacheClusters,
    paginateDescribeCacheSubnetGroups,
    paginateDescribeReplicationGroups,
    paginateDescribeServerlessCaches
} from "@aws-sdk/client-elasticache";
import type {ElastiCache} from "../../interfaces/elasticache.js";

export class ElastiCacheService implements ElastiCache {

    #client: ElastiCacheClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: ElastiCacheClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new ElastiCacheClient(config);

    }

    async getCacheClusters (): Promise<CacheCluster[]> {

        const client = this.#client;
        const clusters: CacheCluster[] = [];
        for await (const page of paginateDescribeCacheClusters(
            {client},
            {}
        )) {

            if (page.CacheClusters !== undefined) {

                clusters.push(...page.CacheClusters);

            }

        }
        return clusters;

    }

    async getReplicationGroups (): Promise<ReplicationGroup[]> {

        const client = this.#client;
        const groups: ReplicationGroup[] = [];
        for await (const page of paginateDescribeReplicationGroups(
            {client},
            {}
        )) {

            if (page.ReplicationGroups !== undefined) {

                groups.push(...page.ReplicationGroups);

            }

        }
        return groups;

    }

    async getCacheSubnetGroups (): Promise<CacheSubnetGroup[]> {

        const client = this.#client;
        const subnetGroups: CacheSubnetGroup[] = [];
        for await (const page of paginateDescribeCacheSubnetGroups(
            {client},
            {}
        )) {

            if (page.CacheSubnetGroups !== undefined) {

                subnetGroups.push(...page.CacheSubnetGroups);

            }

        }
        return subnetGroups;

    }

    async getServerlessCaches (): Promise<ServerlessCache[]> {

        const client = this.#client;
        const caches: ServerlessCache[] = [];
        for await (const page of paginateDescribeServerlessCaches(
            {client},
            {}
        )) {

            if (page.ServerlessCaches !== undefined) {

                caches.push(...page.ServerlessCaches);

            }

        }
        return caches;

    }

}

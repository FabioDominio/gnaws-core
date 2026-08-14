import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {ElastiCacheClient, DescribeCacheClustersCommand, DescribeReplicationGroupsCommand, DescribeCacheSubnetGroupsCommand, DescribeServerlessCachesCommand} from "@aws-sdk/client-elasticache";
import {ElastiCacheService} from "../../../../src/providers/live/elastiCacheService.js";

const elastiCacheMock = mockClient(ElastiCacheClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    elastiCacheMock.reset();

});

describe(
    "ElastiCacheService",
    () => {

        describe(
            "getCacheClusters",
            () => {

                it(
                    "returns cache clusters",
                    async () => {

                        elastiCacheMock.on(DescribeCacheClustersCommand).resolves({
                            "CacheClusters": [
                                {"CacheClusterId": "redis-1",
                                    "Engine": "redis",
                                    "CacheClusterStatus": "available"},
                                {"CacheClusterId": "memcached-1",
                                    "Engine": "memcached",
                                    "CacheClusterStatus": "available"}
                            ]
                        });

                        const service = new ElastiCacheService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getCacheClusters();

                        expect(result).toHaveLength(2);
                        expect(result[0].CacheClusterId).toBe("redis-1");

                    }
                );

                it(
                    "returns empty when no clusters",
                    async () => {

                        elastiCacheMock.on(DescribeCacheClustersCommand).resolves({});

                        const service = new ElastiCacheService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getCacheClusters();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getReplicationGroups",
            () => {

                it(
                    "returns replication groups",
                    async () => {

                        elastiCacheMock.on(DescribeReplicationGroupsCommand).resolves({
                            "ReplicationGroups": [
                                {"ReplicationGroupId": "rg-1",
                                    "Description": "My Redis cluster",
                                    "Status": "available"}
                            ]
                        });

                        const service = new ElastiCacheService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getReplicationGroups();

                        expect(result).toHaveLength(1);
                        expect(result[0].ReplicationGroupId).toBe("rg-1");

                    }
                );

                it(
                    "returns empty when no replication groups",
                    async () => {

                        elastiCacheMock.on(DescribeReplicationGroupsCommand).resolves({});

                        const service = new ElastiCacheService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getReplicationGroups();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getCacheSubnetGroups",
            () => {

                it(
                    "returns cache subnet groups",
                    async () => {

                        elastiCacheMock.on(DescribeCacheSubnetGroupsCommand).resolves({
                            "CacheSubnetGroups": [
                                {"CacheSubnetGroupName": "subnet-grp-1",
                                    "CacheSubnetGroupDescription": "Default subnet group"},
                                {"CacheSubnetGroupName": "subnet-grp-2",
                                    "CacheSubnetGroupDescription": "Custom subnet group"}
                            ]
                        });

                        const service = new ElastiCacheService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getCacheSubnetGroups();

                        expect(result).toHaveLength(2);
                        expect(result[0].CacheSubnetGroupName).toBe("subnet-grp-1");

                    }
                );

                it(
                    "returns empty when no subnet groups",
                    async () => {

                        elastiCacheMock.on(DescribeCacheSubnetGroupsCommand).resolves({});

                        const service = new ElastiCacheService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getCacheSubnetGroups();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getServerlessCaches",
            () => {

                it(
                    "returns serverless caches",
                    async () => {

                        elastiCacheMock.on(DescribeServerlessCachesCommand).resolves({
                            "ServerlessCaches": [
                                {"ServerlessCacheName": "sc-1",
                                    "Engine": "redis",
                                    "Status": "available"}
                            ]
                        });

                        const service = new ElastiCacheService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getServerlessCaches();

                        expect(result).toHaveLength(1);
                        expect(result[0].ServerlessCacheName).toBe("sc-1");

                    }
                );

                it(
                    "returns empty when no serverless caches",
                    async () => {

                        elastiCacheMock.on(DescribeServerlessCachesCommand).resolves({});

                        const service = new ElastiCacheService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getServerlessCaches();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

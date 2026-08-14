import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    RDSClient,
    DescribeDBInstancesCommand,
    DescribeDBClustersCommand,
    DescribeDBProxiesCommand,
    DescribeDBSubnetGroupsCommand,
    DescribeDBProxyTargetGroupsCommand
} from "@aws-sdk/client-rds";
import {RdsService} from "../../../../src/providers/live/rdsService.js";

const rdsMock = mockClient(RDSClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    rdsMock.reset();

});

describe(
    "RdsService",
    () => {

        describe(
            "getDBInstances",
            () => {

                it(
                    "returns DB instances from single page",
                    async () => {

                        rdsMock.on(DescribeDBInstancesCommand).resolves({
                            "DBInstances": [
                                {"DBInstanceIdentifier": "db-1",
                                    "Engine": "postgres"},
                                {"DBInstanceIdentifier": "db-2",
                                    "Engine": "mysql"}
                            ]
                        });

                        const service = new RdsService(
                            creds,
                            "us-east-1"
                        );
                        const instances = await service.getDBInstances();

                        expect(instances).toHaveLength(2);
                        expect(instances[0].DBInstanceIdentifier).toBe("db-1");
                        expect(instances[1].Engine).toBe("mysql");

                    }
                );

                it(
                    "aggregates across pages",
                    async () => {

                        rdsMock.on(DescribeDBInstancesCommand).
                            resolvesOnce({"DBInstances": [{"DBInstanceIdentifier": "db-1"}],
                                "Marker": "m"}).
                            resolvesOnce({"DBInstances": [{"DBInstanceIdentifier": "db-2"}]});

                        const service = new RdsService(
                            creds,
                            "us-east-1"
                        );
                        const instances = await service.getDBInstances();

                        expect(instances).toHaveLength(2);

                    }
                );

                it(
                    "returns empty array when DBInstances is undefined",
                    async () => {

                        rdsMock.on(DescribeDBInstancesCommand).resolves({});

                        const service = new RdsService(
                            creds,
                            "us-east-1"
                        );
                        const instances = await service.getDBInstances();

                        expect(instances).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getDBClusters",
            () => {

                it(
                    "returns DB clusters",
                    async () => {

                        rdsMock.on(DescribeDBClustersCommand).resolves({
                            "DBClusters": [
                                {"DBClusterIdentifier": "cluster-1",
                                    "Engine": "aurora-postgresql"},
                                {"DBClusterIdentifier": "cluster-2",
                                    "Engine": "aurora-mysql"}
                            ]
                        });

                        const service = new RdsService(
                            creds,
                            "us-east-1"
                        );
                        const clusters = await service.getDBClusters();

                        expect(clusters).toHaveLength(2);
                        expect(clusters[0].DBClusterIdentifier).toBe("cluster-1");

                    }
                );

                it(
                    "returns empty array when DBClusters is undefined",
                    async () => {

                        rdsMock.on(DescribeDBClustersCommand).resolves({});

                        const service = new RdsService(
                            creds,
                            "us-east-1"
                        );
                        const clusters = await service.getDBClusters();

                        expect(clusters).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getDBProxies",
            () => {

                it(
                    "returns DB proxies",
                    async () => {

                        rdsMock.on(DescribeDBProxiesCommand).resolves({
                            "DBProxies": [
                                {"DBProxyName": "proxy-1",
                                    "DBProxyArn": "arn:rds:proxy-1"},
                                {"DBProxyName": "proxy-2",
                                    "DBProxyArn": "arn:rds:proxy-2"}
                            ]
                        });

                        const service = new RdsService(
                            creds,
                            "us-east-1"
                        );
                        const proxies = await service.getDBProxies();

                        expect(proxies).toHaveLength(2);
                        expect(proxies[0].DBProxyName).toBe("proxy-1");

                    }
                );

                it(
                    "returns empty array when DBProxies is undefined",
                    async () => {

                        rdsMock.on(DescribeDBProxiesCommand).resolves({});

                        const service = new RdsService(
                            creds,
                            "us-east-1"
                        );
                        const proxies = await service.getDBProxies();

                        expect(proxies).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getDBSubnetGroups",
            () => {

                it(
                    "returns DB subnet groups",
                    async () => {

                        rdsMock.on(DescribeDBSubnetGroupsCommand).resolves({
                            "DBSubnetGroups": [
                                {"DBSubnetGroupName": "subnet-group-1",
                                    "VpcId": "vpc-111"},
                                {"DBSubnetGroupName": "subnet-group-2",
                                    "VpcId": "vpc-222"}
                            ]
                        });

                        const service = new RdsService(
                            creds,
                            "us-east-1"
                        );
                        const groups = await service.getDBSubnetGroups();

                        expect(groups).toHaveLength(2);
                        expect(groups[0].DBSubnetGroupName).toBe("subnet-group-1");

                    }
                );

                it(
                    "returns empty array when DBSubnetGroups is undefined",
                    async () => {

                        rdsMock.on(DescribeDBSubnetGroupsCommand).resolves({});

                        const service = new RdsService(
                            creds,
                            "us-east-1"
                        );
                        const groups = await service.getDBSubnetGroups();

                        expect(groups).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getDBProxyTargetGroups",
            () => {

                it(
                    "returns target groups for a proxy",
                    async () => {

                        rdsMock.on(DescribeDBProxyTargetGroupsCommand).resolves({
                            "TargetGroups": [
                                {"DBProxyName": "proxy-1",
                                    "TargetGroupName": "default",
                                    "IsDefault": true}
                            ]
                        });

                        const service = new RdsService(
                            creds,
                            "us-east-1"
                        );
                        const groups = await service.getDBProxyTargetGroups("proxy-1");

                        expect(groups).toHaveLength(1);
                        expect(groups[0].TargetGroupName).toBe("default");
                        expect(groups[0].IsDefault).toBe(true);

                    }
                );

                it(
                    "returns empty array when TargetGroups is undefined",
                    async () => {

                        rdsMock.on(DescribeDBProxyTargetGroupsCommand).resolves({});

                        const service = new RdsService(
                            creds,
                            "us-east-1"
                        );
                        const groups = await service.getDBProxyTargetGroups("proxy-1");

                        expect(groups).toEqual([]);

                    }
                );

                it(
                    "aggregates across pages",
                    async () => {

                        rdsMock.on(DescribeDBProxyTargetGroupsCommand).
                            resolvesOnce({"TargetGroups": [{"TargetGroupName": "tg-1"}],
                                "Marker": "m"}).
                            resolvesOnce({"TargetGroups": [{"TargetGroupName": "tg-2"}]});

                        const service = new RdsService(
                            creds,
                            "us-east-1"
                        );
                        const groups = await service.getDBProxyTargetGroups("proxy-1");

                        expect(groups).toHaveLength(2);

                    }
                );

            }
        );

    }
);

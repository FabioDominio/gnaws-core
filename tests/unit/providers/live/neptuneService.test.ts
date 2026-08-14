import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    NeptuneClient,
    DescribeDBClustersCommand,
    DescribeDBInstancesCommand,
    DescribeDBSubnetGroupsCommand
} from "@aws-sdk/client-neptune";
import {NeptuneService} from "../../../../src/providers/live/neptuneService.js";

const neptuneMock = mockClient(NeptuneClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    neptuneMock.reset();

});

describe(
    "NeptuneService",
    () => {

        describe(
            "getDBClusters",
            () => {

                it(
                    "returns DB clusters",
                    async () => {

                        neptuneMock.on(DescribeDBClustersCommand).resolves({
                            "DBClusters": [
                                {"DBClusterIdentifier": "cluster-1",
                                    "DBClusterArn": "arn:aws:neptune:us-east-1:123:cluster:cluster-1"},
                                {"DBClusterIdentifier": "cluster-2",
                                    "DBClusterArn": "arn:aws:neptune:us-east-1:123:cluster:cluster-2"}
                            ]
                        });

                        const service = new NeptuneService(
                            creds,
                            "us-east-1"
                        );
                        const clusters = await service.getDBClusters();

                        expect(clusters).toHaveLength(2);
                        expect(clusters[0].DBClusterIdentifier).toBe("cluster-1");

                    }
                );

                it(
                    "returns empty when no clusters",
                    async () => {

                        neptuneMock.on(DescribeDBClustersCommand).resolves({});

                        const service = new NeptuneService(
                            creds,
                            "us-east-1"
                        );
                        const clusters = await service.getDBClusters();

                        expect(clusters).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getDBInstances",
            () => {

                it(
                    "returns DB instances",
                    async () => {

                        neptuneMock.on(DescribeDBInstancesCommand).resolves({
                            "DBInstances": [
                                {"DBInstanceIdentifier": "inst-1",
                                    "DBInstanceClass": "db.r5.large",
                                    "Engine": "neptune"},
                                {"DBInstanceIdentifier": "inst-2",
                                    "DBInstanceClass": "db.r5.xlarge",
                                    "Engine": "neptune"}
                            ]
                        });

                        const service = new NeptuneService(
                            creds,
                            "us-east-1"
                        );
                        const instances = await service.getDBInstances();

                        expect(instances).toHaveLength(2);
                        expect(instances[0].DBInstanceIdentifier).toBe("inst-1");

                    }
                );

                it(
                    "returns empty when no instances",
                    async () => {

                        neptuneMock.on(DescribeDBInstancesCommand).resolves({});

                        const service = new NeptuneService(
                            creds,
                            "us-east-1"
                        );
                        const instances = await service.getDBInstances();

                        expect(instances).toHaveLength(0);

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

                        neptuneMock.on(DescribeDBSubnetGroupsCommand).resolves({
                            "DBSubnetGroups": [
                                {"DBSubnetGroupName": "sg-1",
                                    "DBSubnetGroupDescription": "Subnet group 1"},
                                {"DBSubnetGroupName": "sg-2",
                                    "DBSubnetGroupDescription": "Subnet group 2"}
                            ]
                        });

                        const service = new NeptuneService(
                            creds,
                            "us-east-1"
                        );
                        const groups = await service.getDBSubnetGroups();

                        expect(groups).toHaveLength(2);
                        expect(groups[0].DBSubnetGroupName).toBe("sg-1");

                    }
                );

                it(
                    "returns empty when no subnet groups",
                    async () => {

                        neptuneMock.on(DescribeDBSubnetGroupsCommand).resolves({});

                        const service = new NeptuneService(
                            creds,
                            "us-east-1"
                        );
                        const groups = await service.getDBSubnetGroups();

                        expect(groups).toHaveLength(0);

                    }
                );

            }
        );

    }
);

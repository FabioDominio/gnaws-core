import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    RedshiftClient,
    DescribeClustersCommand,
    DescribeClusterSubnetGroupsCommand
} from "@aws-sdk/client-redshift";
import {RedshiftService} from "../../../../src/providers/live/redshiftService.js";

const redshiftMock = mockClient(RedshiftClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    redshiftMock.reset();

});

describe(
    "RedshiftService",
    () => {

        describe(
            "getClusters",
            () => {

                it(
                    "returns clusters",
                    async () => {

                        redshiftMock.on(DescribeClustersCommand).resolves({
                            "Clusters": [
                                {"ClusterIdentifier": "cluster-1",
                                    "NodeType": "dc2.large",
                                    "ClusterStatus": "available"},
                                {"ClusterIdentifier": "cluster-2",
                                    "NodeType": "ra3.xlplus",
                                    "ClusterStatus": "available"}
                            ]
                        });

                        const service = new RedshiftService(
                            creds,
                            "us-east-1"
                        );
                        const clusters = await service.getClusters();

                        expect(clusters).toHaveLength(2);
                        expect(clusters[0].ClusterIdentifier).toBe("cluster-1");

                    }
                );

                it(
                    "returns empty when no clusters",
                    async () => {

                        redshiftMock.on(DescribeClustersCommand).resolves({});

                        const service = new RedshiftService(
                            creds,
                            "us-east-1"
                        );
                        const clusters = await service.getClusters();

                        expect(clusters).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getClusterSubnetGroups",
            () => {

                it(
                    "returns cluster subnet groups",
                    async () => {

                        redshiftMock.on(DescribeClusterSubnetGroupsCommand).resolves({
                            "ClusterSubnetGroups": [
                                {"ClusterSubnetGroupName": "sg-1",
                                    "Description": "Subnet group 1"},
                                {"ClusterSubnetGroupName": "sg-2",
                                    "Description": "Subnet group 2"}
                            ]
                        });

                        const service = new RedshiftService(
                            creds,
                            "us-east-1"
                        );
                        const groups = await service.getClusterSubnetGroups();

                        expect(groups).toHaveLength(2);
                        expect(groups[0].ClusterSubnetGroupName).toBe("sg-1");

                    }
                );

                it(
                    "returns empty when no subnet groups",
                    async () => {

                        redshiftMock.on(DescribeClusterSubnetGroupsCommand).resolves({});

                        const service = new RedshiftService(
                            creds,
                            "us-east-1"
                        );
                        const groups = await service.getClusterSubnetGroups();

                        expect(groups).toHaveLength(0);

                    }
                );

            }
        );

    }
);

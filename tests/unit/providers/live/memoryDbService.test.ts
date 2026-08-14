import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    MemoryDBClient,
    DescribeClustersCommand,
    DescribeSubnetGroupsCommand,
    DescribeACLsCommand,
    DescribeUsersCommand
} from "@aws-sdk/client-memorydb";
import {MemoryDbService} from "../../../../src/providers/live/memoryDbService.js";

const memDbMock = mockClient(MemoryDBClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    memDbMock.reset();

});

describe(
    "MemoryDbService",
    () => {

        describe(
            "getClusters",
            () => {

                it(
                    "returns clusters",
                    async () => {

                        memDbMock.on(DescribeClustersCommand).resolves({
                            "Clusters": [
                                {"Name": "cluster-1",
                                    "ARN": "arn:aws:memorydb:us-east-1:123:cluster/cluster-1",
                                    "Status": "available"},
                                {"Name": "cluster-2",
                                    "ARN": "arn:aws:memorydb:us-east-1:123:cluster/cluster-2",
                                    "Status": "available"}
                            ]
                        });

                        const service = new MemoryDbService(
                            creds,
                            "us-east-1"
                        );
                        const clusters = await service.getClusters();

                        expect(clusters).toHaveLength(2);
                        expect(clusters[0].Name).toBe("cluster-1");

                    }
                );

                it(
                    "returns empty when no clusters",
                    async () => {

                        memDbMock.on(DescribeClustersCommand).resolves({});

                        const service = new MemoryDbService(
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
            "getSubnetGroups",
            () => {

                it(
                    "returns subnet groups",
                    async () => {

                        memDbMock.on(DescribeSubnetGroupsCommand).resolves({
                            "SubnetGroups": [
                                {"Name": "sg-1",
                                    "ARN": "arn:aws:memorydb:us-east-1:123:subnetgroup/sg-1"},
                                {"Name": "sg-2",
                                    "ARN": "arn:aws:memorydb:us-east-1:123:subnetgroup/sg-2"}
                            ]
                        });

                        const service = new MemoryDbService(
                            creds,
                            "us-east-1"
                        );
                        const groups = await service.getSubnetGroups();

                        expect(groups).toHaveLength(2);
                        expect(groups[0].Name).toBe("sg-1");

                    }
                );

                it(
                    "returns empty when no subnet groups",
                    async () => {

                        memDbMock.on(DescribeSubnetGroupsCommand).resolves({});

                        const service = new MemoryDbService(
                            creds,
                            "us-east-1"
                        );
                        const groups = await service.getSubnetGroups();

                        expect(groups).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getACLs",
            () => {

                it(
                    "returns ACLs",
                    async () => {

                        memDbMock.on(DescribeACLsCommand).resolves({
                            "ACLs": [
                                {"Name": "acl-1",
                                    "ARN": "arn:aws:memorydb:us-east-1:123:acl/acl-1",
                                    "Status": "active"},
                                {"Name": "acl-2",
                                    "ARN": "arn:aws:memorydb:us-east-1:123:acl/acl-2",
                                    "Status": "active"}
                            ]
                        });

                        const service = new MemoryDbService(
                            creds,
                            "us-east-1"
                        );
                        const acls = await service.getACLs();

                        expect(acls).toHaveLength(2);
                        expect(acls[0].Name).toBe("acl-1");

                    }
                );

                it(
                    "returns empty when no ACLs",
                    async () => {

                        memDbMock.on(DescribeACLsCommand).resolves({});

                        const service = new MemoryDbService(
                            creds,
                            "us-east-1"
                        );
                        const acls = await service.getACLs();

                        expect(acls).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getUsers",
            () => {

                it(
                    "returns users",
                    async () => {

                        memDbMock.on(DescribeUsersCommand).resolves({
                            "Users": [
                                {"Name": "user-1",
                                    "ARN": "arn:aws:memorydb:us-east-1:123:user/user-1",
                                    "Status": "active"},
                                {"Name": "user-2",
                                    "ARN": "arn:aws:memorydb:us-east-1:123:user/user-2",
                                    "Status": "active"}
                            ]
                        });

                        const service = new MemoryDbService(
                            creds,
                            "us-east-1"
                        );
                        const users = await service.getUsers();

                        expect(users).toHaveLength(2);
                        expect(users[0].Name).toBe("user-1");

                    }
                );

                it(
                    "returns empty when no users",
                    async () => {

                        memDbMock.on(DescribeUsersCommand).resolves({});

                        const service = new MemoryDbService(
                            creds,
                            "us-east-1"
                        );
                        const users = await service.getUsers();

                        expect(users).toHaveLength(0);

                    }
                );

            }
        );

    }
);

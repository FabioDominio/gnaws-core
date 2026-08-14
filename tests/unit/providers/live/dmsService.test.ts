import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    DatabaseMigrationServiceClient,
    DescribeReplicationInstancesCommand,
    DescribeReplicationSubnetGroupsCommand,
    DescribeEndpointsCommand,
    DescribeReplicationTasksCommand,
    DescribeConnectionsCommand
} from "@aws-sdk/client-database-migration-service";
import {DmsService} from "../../../../src/providers/live/dmsService.js";

const dmsMock = mockClient(DatabaseMigrationServiceClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    dmsMock.reset();

});

describe(
    "DmsService",
    () => {

        describe(
            "getReplicationInstances",
            () => {

                it(
                    "returns replication instances",
                    async () => {

                        dmsMock.on(DescribeReplicationInstancesCommand).resolves({
                            "ReplicationInstances": [
                                {"ReplicationInstanceIdentifier": "ri-1",
                                    "ReplicationInstanceArn": "arn:aws:dms:us-east-1:123:rep:ri-1"},
                                {"ReplicationInstanceIdentifier": "ri-2",
                                    "ReplicationInstanceArn": "arn:aws:dms:us-east-1:123:rep:ri-2"}
                            ]
                        });

                        const service = new DmsService(
                            creds,
                            "us-east-1"
                        );
                        const instances = await service.getReplicationInstances();

                        expect(instances).toHaveLength(2);
                        expect(instances[0].ReplicationInstanceIdentifier).toBe("ri-1");

                    }
                );

                it(
                    "returns empty when no replication instances",
                    async () => {

                        dmsMock.on(DescribeReplicationInstancesCommand).resolves({});

                        const service = new DmsService(
                            creds,
                            "us-east-1"
                        );
                        const instances = await service.getReplicationInstances();

                        expect(instances).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getReplicationSubnetGroups",
            () => {

                it(
                    "returns replication subnet groups",
                    async () => {

                        dmsMock.on(DescribeReplicationSubnetGroupsCommand).resolves({
                            "ReplicationSubnetGroups": [
                                {"ReplicationSubnetGroupIdentifier": "sg-1",
                                    "ReplicationSubnetGroupDescription": "Group 1"},
                                {"ReplicationSubnetGroupIdentifier": "sg-2",
                                    "ReplicationSubnetGroupDescription": "Group 2"}
                            ]
                        });

                        const service = new DmsService(
                            creds,
                            "us-east-1"
                        );
                        const groups = await service.getReplicationSubnetGroups();

                        expect(groups).toHaveLength(2);
                        expect(groups[0].ReplicationSubnetGroupIdentifier).toBe("sg-1");

                    }
                );

                it(
                    "returns empty when no subnet groups",
                    async () => {

                        dmsMock.on(DescribeReplicationSubnetGroupsCommand).resolves({});

                        const service = new DmsService(
                            creds,
                            "us-east-1"
                        );
                        const groups = await service.getReplicationSubnetGroups();

                        expect(groups).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getEndpoints",
            () => {

                it(
                    "returns endpoints",
                    async () => {

                        dmsMock.on(DescribeEndpointsCommand).resolves({
                            "Endpoints": [
                                {"EndpointIdentifier": "ep-1",
                                    "EndpointType": "source"},
                                {"EndpointIdentifier": "ep-2",
                                    "EndpointType": "target"}
                            ]
                        });

                        const service = new DmsService(
                            creds,
                            "us-east-1"
                        );
                        const endpoints = await service.getEndpoints();

                        expect(endpoints).toHaveLength(2);
                        expect(endpoints[0].EndpointIdentifier).toBe("ep-1");

                    }
                );

                it(
                    "returns empty when no endpoints",
                    async () => {

                        dmsMock.on(DescribeEndpointsCommand).resolves({});

                        const service = new DmsService(
                            creds,
                            "us-east-1"
                        );
                        const endpoints = await service.getEndpoints();

                        expect(endpoints).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getReplicationTasks",
            () => {

                it(
                    "returns replication tasks",
                    async () => {

                        dmsMock.on(DescribeReplicationTasksCommand).resolves({
                            "ReplicationTasks": [
                                {"ReplicationTaskIdentifier": "task-1",
                                    "Status": "running"},
                                {"ReplicationTaskIdentifier": "task-2",
                                    "Status": "stopped"}
                            ]
                        });

                        const service = new DmsService(
                            creds,
                            "us-east-1"
                        );
                        const tasks = await service.getReplicationTasks();

                        expect(tasks).toHaveLength(2);
                        expect(tasks[0].ReplicationTaskIdentifier).toBe("task-1");

                    }
                );

                it(
                    "returns empty when no replication tasks",
                    async () => {

                        dmsMock.on(DescribeReplicationTasksCommand).resolves({});

                        const service = new DmsService(
                            creds,
                            "us-east-1"
                        );
                        const tasks = await service.getReplicationTasks();

                        expect(tasks).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getConnections",
            () => {

                it(
                    "returns connections",
                    async () => {

                        dmsMock.on(DescribeConnectionsCommand).resolves({
                            "Connections": [
                                {"ReplicationInstanceIdentifier": "ri-1",
                                    "EndpointIdentifier": "ep-1",
                                    "Status": "successful"},
                                {"ReplicationInstanceIdentifier": "ri-1",
                                    "EndpointIdentifier": "ep-2",
                                    "Status": "successful"}
                            ]
                        });

                        const service = new DmsService(
                            creds,
                            "us-east-1"
                        );
                        const connections = await service.getConnections();

                        expect(connections).toHaveLength(2);
                        expect(connections[0].Status).toBe("successful");

                    }
                );

                it(
                    "returns empty when no connections",
                    async () => {

                        dmsMock.on(DescribeConnectionsCommand).resolves({});

                        const service = new DmsService(
                            creds,
                            "us-east-1"
                        );
                        const connections = await service.getConnections();

                        expect(connections).toHaveLength(0);

                    }
                );

            }
        );

    }
);

import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {DataSyncClient, ListAgentsCommand, ListLocationsCommand, ListTasksCommand, DescribeTaskCommand} from "@aws-sdk/client-datasync";
import {DataSyncService} from "../../../../src/providers/live/dataSyncService.js";

const dataSyncMock = mockClient(DataSyncClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    dataSyncMock.reset();

});

describe(
    "DataSyncService",
    () => {

        describe(
            "getAgents",
            () => {

                it(
                    "returns agents",
                    async () => {

                        dataSyncMock.on(ListAgentsCommand).resolves({
                            "Agents": [
                                {"AgentArn": "arn:aws:datasync:us-east-1:123:agent/agent-1",
                                    "Name": "agent-1",
                                    "Status": "ONLINE"},
                                {"AgentArn": "arn:aws:datasync:us-east-1:123:agent/agent-2",
                                    "Name": "agent-2",
                                    "Status": "OFFLINE"}
                            ]
                        });

                        const service = new DataSyncService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getAgents();

                        expect(result).toHaveLength(2);
                        expect(result[0].Name).toBe("agent-1");

                    }
                );

                it(
                    "returns empty when no agents",
                    async () => {

                        dataSyncMock.on(ListAgentsCommand).resolves({});

                        const service = new DataSyncService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getAgents();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getLocations",
            () => {

                it(
                    "returns locations",
                    async () => {

                        dataSyncMock.on(ListLocationsCommand).resolves({
                            "Locations": [
                                {"LocationArn": "arn:aws:datasync:us-east-1:123:location/loc-1",
                                    "LocationUri": "s3://bucket-1"},
                                {"LocationArn": "arn:aws:datasync:us-east-1:123:location/loc-2",
                                    "LocationUri": "nfs://server/path"}
                            ]
                        });

                        const service = new DataSyncService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getLocations();

                        expect(result).toHaveLength(2);
                        expect(result[0].LocationUri).toBe("s3://bucket-1");

                    }
                );

                it(
                    "returns empty when no locations",
                    async () => {

                        dataSyncMock.on(ListLocationsCommand).resolves({});

                        const service = new DataSyncService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getLocations();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getTasks",
            () => {

                it(
                    "returns tasks with describe enrichment",
                    async () => {

                        dataSyncMock.on(ListTasksCommand).resolves({
                            "Tasks": [
                                {"TaskArn": "arn:aws:datasync:us-east-1:123:task/task-1",
                                    "Name": "task-1",
                                    "Status": "AVAILABLE"},
                                {"TaskArn": "arn:aws:datasync:us-east-1:123:task/task-2",
                                    "Name": "task-2",
                                    "Status": "RUNNING"}
                            ]
                        });
                        dataSyncMock.on(DescribeTaskCommand).callsFake((input: {"TaskArn"?: string}) => ({
                            "TaskArn": input.TaskArn,
                            "Name": "described-task",
                            "Status": "AVAILABLE",
                            "SourceLocationArn": "arn:aws:datasync:us-east-1:123:location/loc-1",
                            "DestinationLocationArn": "arn:aws:datasync:us-east-1:123:location/loc-2"
                        }));

                        const service = new DataSyncService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getTasks();

                        expect(result).toHaveLength(2);
                        expect(result[0].SourceLocationArn).toBe("arn:aws:datasync:us-east-1:123:location/loc-1");

                    }
                );

                it(
                    "skips tasks without ARN",
                    async () => {

                        dataSyncMock.on(ListTasksCommand).resolves({
                            "Tasks": [
                                {"Name": "no-arn"},
                                {"TaskArn": "arn:aws:datasync:us-east-1:123:task/task-1",
                                    "Name": "has-arn"}
                            ]
                        });
                        dataSyncMock.on(DescribeTaskCommand).resolves({
                            "TaskArn": "arn:aws:datasync:us-east-1:123:task/task-1",
                            "Name": "has-arn",
                            "Status": "AVAILABLE"
                        });

                        const service = new DataSyncService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getTasks();

                        expect(result).toHaveLength(1);

                    }
                );

                it(
                    "returns empty when no tasks",
                    async () => {

                        dataSyncMock.on(ListTasksCommand).resolves({});

                        const service = new DataSyncService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getTasks();

                        expect(result).toHaveLength(0);

                    }
                );

                it(
                    "skips deleted tasks gracefully",
                    async () => {

                        dataSyncMock.on(ListTasksCommand).resolves({
                            "Tasks": [{"TaskArn": "arn:aws:datasync:us-east-1:123:task/task-1"}]
                        });
                        dataSyncMock.on(DescribeTaskCommand).rejects(new Error("InvalidRequestException"));

                        const service = new DataSyncService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getTasks();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

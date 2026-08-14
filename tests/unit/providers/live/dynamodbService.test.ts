import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    DynamoDBClient,
    ListTablesCommand,
    DescribeTableCommand
} from "@aws-sdk/client-dynamodb";
import {DynamoDBService} from "../../../../src/providers/live/dynamodbService.js";

const ddbMock = mockClient(DynamoDBClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    ddbMock.reset();

});

describe(
    "DynamoDBService",
    () => {

        describe(
            "getTables",
            () => {

                it(
                    "returns enriched table descriptions",
                    async () => {

                        ddbMock.on(ListTablesCommand).resolves({
                            "TableNames": [
                                "table-1",
                                "table-2"
                            ]
                        });
                        ddbMock.on(
                            DescribeTableCommand,
                            {"TableName": "table-1"}
                        ).resolves({
                            "Table": {"TableName": "table-1",
                                "TableArn": "arn:aws:dynamodb:us-east-1:123:table/table-1",
                                "TableStatus": "ACTIVE"}
                        });
                        ddbMock.on(
                            DescribeTableCommand,
                            {"TableName": "table-2"}
                        ).resolves({
                            "Table": {"TableName": "table-2",
                                "TableArn": "arn:aws:dynamodb:us-east-1:123:table/table-2",
                                "TableStatus": "ACTIVE"}
                        });

                        const service = new DynamoDBService(
                            creds,
                            "us-east-1"
                        );
                        const tables = await service.getTables();

                        expect(tables).toHaveLength(2);
                        expect(tables[0].TableName).toBe("table-1");
                        expect(tables[1].TableName).toBe("table-2");

                    }
                );

                it(
                    "skips tables that fail DescribeTable",
                    async () => {

                        ddbMock.on(ListTablesCommand).resolves({
                            "TableNames": [
                                "table-ok",
                                "table-gone"
                            ]
                        });
                        ddbMock.on(
                            DescribeTableCommand,
                            {"TableName": "table-ok"}
                        ).resolves({
                            "Table": {"TableName": "table-ok",
                                "TableStatus": "ACTIVE"}
                        });
                        ddbMock.on(
                            DescribeTableCommand,
                            {"TableName": "table-gone"}
                        ).rejects(new Error("ResourceNotFoundException"));

                        const service = new DynamoDBService(
                            creds,
                            "us-east-1"
                        );
                        const tables = await service.getTables();

                        expect(tables).toHaveLength(1);
                        expect(tables[0].TableName).toBe("table-ok");

                    }
                );

                it(
                    "aggregates table names across pages",
                    async () => {

                        ddbMock.on(ListTablesCommand).
                            resolvesOnce({"TableNames": ["t1"],
                                "LastEvaluatedTableName": "t1"}).
                            resolvesOnce({"TableNames": ["t2"]});
                        ddbMock.on(
                            DescribeTableCommand,
                            {"TableName": "t1"}
                        ).resolves({"Table": {"TableName": "t1"}});
                        ddbMock.on(
                            DescribeTableCommand,
                            {"TableName": "t2"}
                        ).resolves({"Table": {"TableName": "t2"}});

                        const service = new DynamoDBService(
                            creds,
                            "us-east-1"
                        );
                        const tables = await service.getTables();

                        expect(tables).toHaveLength(2);

                    }
                );

                it(
                    "returns empty when no tables",
                    async () => {

                        ddbMock.on(ListTablesCommand).resolves({});

                        const service = new DynamoDBService(
                            creds,
                            "us-east-1"
                        );
                        const tables = await service.getTables();

                        expect(tables).toHaveLength(0);

                    }
                );

            }
        );

    }
);

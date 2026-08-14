import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {S3TablesClient, ListTableBucketsCommand, ListNamespacesCommand, ListTablesCommand} from "@aws-sdk/client-s3tables";
import {S3TablesService} from "../../../../src/providers/live/s3tablesService.js";

const s3TablesMock = mockClient(S3TablesClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    s3TablesMock.reset();

});

describe(
    "S3TablesService",
    () => {

        describe(
            "getTableBuckets",
            () => {

                it(
                    "returns table buckets",
                    async () => {

                        s3TablesMock.on(ListTableBucketsCommand).resolves({
                            "tableBuckets": [
                                {"name": "tb-1",
                                    "arn": "arn:aws:s3tables:us-east-1:123:bucket/tb-1",
                                    "ownerAccountId": "123456789012",
                                    "createdAt": new Date()},
                                {"name": "tb-2",
                                    "arn": "arn:aws:s3tables:us-east-1:123:bucket/tb-2",
                                    "ownerAccountId": "123456789012",
                                    "createdAt": new Date()}
                            ]
                        });

                        const service = new S3TablesService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getTableBuckets();

                        expect(result).toHaveLength(2);
                        expect(result[0].name).toBe("tb-1");

                    }
                );

                it(
                    "returns empty when no table buckets",
                    async () => {

                        s3TablesMock.on(ListTableBucketsCommand).resolves({});

                        const service = new S3TablesService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getTableBuckets();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getNamespaces",
            () => {

                it(
                    "returns namespaces for a table bucket",
                    async () => {

                        s3TablesMock.on(ListNamespacesCommand).resolves({
                            "namespaces": [
                                {"namespace": ["ns-1"],
                                    "createdAt": new Date(),
                                    "createdBy": "123456789012",
                                    "ownerAccountId": "123456789012"},
                                {"namespace": ["ns-2"],
                                    "createdAt": new Date(),
                                    "createdBy": "123456789012",
                                    "ownerAccountId": "123456789012"}
                            ]
                        });

                        const service = new S3TablesService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getNamespaces("arn:aws:s3tables:us-east-1:123:bucket/tb-1");

                        expect(result).toHaveLength(2);

                    }
                );

                it(
                    "returns empty when no namespaces",
                    async () => {

                        s3TablesMock.on(ListNamespacesCommand).resolves({});

                        const service = new S3TablesService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getNamespaces("arn:aws:s3tables:us-east-1:123:bucket/tb-1");

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getTables",
            () => {

                it(
                    "returns tables for a table bucket",
                    async () => {

                        s3TablesMock.on(ListTablesCommand).resolves({
                            "tables": [
                                {"name": "table-1",
                                    "namespace": ["ns-1"],
                                    "type": "customer",
                                    "tableARN": "arn:aws:s3tables:us-east-1:123:bucket/tb-1/table/table-1",
                                    "createdAt": new Date(),
                                    "modifiedAt": new Date()},
                                {"name": "table-2",
                                    "namespace": ["ns-1"],
                                    "type": "customer",
                                    "tableARN": "arn:aws:s3tables:us-east-1:123:bucket/tb-1/table/table-2",
                                    "createdAt": new Date(),
                                    "modifiedAt": new Date()}
                            ]
                        });

                        const service = new S3TablesService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getTables("arn:aws:s3tables:us-east-1:123:bucket/tb-1");

                        expect(result).toHaveLength(2);
                        expect(result[0].name).toBe("table-1");

                    }
                );

                it(
                    "returns empty when no tables",
                    async () => {

                        s3TablesMock.on(ListTablesCommand).resolves({});

                        const service = new S3TablesService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getTables("arn:aws:s3tables:us-east-1:123:bucket/tb-1");

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

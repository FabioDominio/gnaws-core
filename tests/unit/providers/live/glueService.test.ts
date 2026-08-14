import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    GlueClient,
    GetConnectionsCommand,
    GetCrawlersCommand,
    GetDatabasesCommand,
    GetJobsCommand,
    GetTriggersCommand,
    GetTablesCommand,
    ListRegistriesCommand,
    ListSchemasCommand,
    ListWorkflowsCommand
} from "@aws-sdk/client-glue";
import {GlueService} from "../../../../src/providers/live/glueService.js";

const glueMock = mockClient(GlueClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    glueMock.reset();

});

describe(
    "GlueService",
    () => {

        describe(
            "getConnections",
            () => {

                it(
                    "returns connections",
                    async () => {

                        glueMock.on(GetConnectionsCommand).resolves({
                            "ConnectionList": [
                                {"Name": "conn-1",
                                    "ConnectionType": "JDBC"}
                            ]
                        });

                        const service = new GlueService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getConnections();

                        expect(result).toHaveLength(1);
                        expect(result[0].Name).toBe("conn-1");

                    }
                );

                it(
                    "returns empty array when no connections",
                    async () => {

                        glueMock.on(GetConnectionsCommand).resolves({});

                        const service = new GlueService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getConnections();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getCrawlers",
            () => {

                it(
                    "returns crawlers",
                    async () => {

                        glueMock.on(GetCrawlersCommand).resolves({
                            "Crawlers": [
                                {"Name": "crawler-1",
                                    "Role": "arn:aws:iam::123:role/glue-role"}
                            ]
                        });

                        const service = new GlueService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getCrawlers();

                        expect(result).toHaveLength(1);
                        expect(result[0].Name).toBe("crawler-1");

                    }
                );

                it(
                    "returns empty array when no crawlers",
                    async () => {

                        glueMock.on(GetCrawlersCommand).resolves({});

                        const service = new GlueService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getCrawlers();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getDatabases",
            () => {

                it(
                    "returns databases",
                    async () => {

                        glueMock.on(GetDatabasesCommand).resolves({
                            "DatabaseList": [
                                {"Name": "my-db",
                                    "CreateTime": new Date()}
                            ]
                        });

                        const service = new GlueService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getDatabases();

                        expect(result).toHaveLength(1);
                        expect(result[0].Name).toBe("my-db");

                    }
                );

                it(
                    "returns empty array when no databases",
                    async () => {

                        glueMock.on(GetDatabasesCommand).resolves({});

                        const service = new GlueService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getDatabases();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getJobs",
            () => {

                it(
                    "returns jobs",
                    async () => {

                        glueMock.on(GetJobsCommand).resolves({
                            "Jobs": [
                                {"Name": "etl-job-1",
                                    "Role": "arn:aws:iam::123:role/glue-role"}
                            ]
                        });

                        const service = new GlueService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getJobs();

                        expect(result).toHaveLength(1);
                        expect(result[0].Name).toBe("etl-job-1");

                    }
                );

                it(
                    "returns empty array when no jobs",
                    async () => {

                        glueMock.on(GetJobsCommand).resolves({});

                        const service = new GlueService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getJobs();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getTriggers",
            () => {

                it(
                    "returns triggers",
                    async () => {

                        glueMock.on(GetTriggersCommand).resolves({
                            "Triggers": [
                                {"Name": "trigger-1",
                                    "Type": "SCHEDULED"}
                            ]
                        });

                        const service = new GlueService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getTriggers();

                        expect(result).toHaveLength(1);
                        expect(result[0].Name).toBe("trigger-1");

                    }
                );

                it(
                    "returns empty array when no triggers",
                    async () => {

                        glueMock.on(GetTriggersCommand).resolves({});

                        const service = new GlueService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getTriggers();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getTables",
            () => {

                it(
                    "returns tables from all databases",
                    async () => {

                        glueMock.on(GetDatabasesCommand).resolves({
                            "DatabaseList": [{"Name": "db-1"}]
                        });
                        glueMock.on(GetTablesCommand).resolves({
                            "TableList": [
                                {"Name": "table-1",
                                    "DatabaseName": "db-1"},
                                {"Name": "table-2",
                                    "DatabaseName": "db-1"}
                            ]
                        });

                        const service = new GlueService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getTables();

                        expect(result).toHaveLength(2);
                        expect(result[0].Name).toBe("table-1");

                    }
                );

                it(
                    "returns empty array when no databases",
                    async () => {

                        glueMock.on(GetDatabasesCommand).resolves({});

                        const service = new GlueService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getTables();

                        expect(result).toHaveLength(0);

                    }
                );

                it(
                    "returns empty array when databases have no tables",
                    async () => {

                        glueMock.on(GetDatabasesCommand).resolves({
                            "DatabaseList": [{"Name": "db-1"}]
                        });
                        glueMock.on(GetTablesCommand).resolves({});

                        const service = new GlueService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getTables();

                        expect(result).toHaveLength(0);

                    }
                );

                it(
                    "skips databases with no Name",
                    async () => {

                        glueMock.on(GetDatabasesCommand).resolves({
                            "DatabaseList": [
                                {"Name": ""},
                                {"Name": "db-2"}
                            ]
                        });
                        glueMock.on(GetTablesCommand).resolves({
                            "TableList": [
                                {"Name": "table-from-db2",
                                    "DatabaseName": "db-2"}
                            ]
                        });

                        const service = new GlueService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getTables();

                        expect(result).toHaveLength(1);
                        expect(result[0].Name).toBe("table-from-db2");

                    }
                );

            }
        );

        describe(
            "getRegistries",
            () => {

                it(
                    "returns registries",
                    async () => {

                        glueMock.on(ListRegistriesCommand).resolves({
                            "Registries": [
                                {"RegistryName": "registry-1",
                                    "RegistryArn": "arn:aws:glue:us-east-1:123:registry/registry-1"}
                            ]
                        });

                        const service = new GlueService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getRegistries();

                        expect(result).toHaveLength(1);
                        expect(result[0].RegistryName).toBe("registry-1");

                    }
                );

                it(
                    "returns empty array when no registries",
                    async () => {

                        glueMock.on(ListRegistriesCommand).resolves({});

                        const service = new GlueService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getRegistries();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getSchemas",
            () => {

                it(
                    "returns schemas",
                    async () => {

                        glueMock.on(ListSchemasCommand).resolves({
                            "Schemas": [
                                {"SchemaName": "schema-1",
                                    "SchemaArn": "arn:aws:glue:us-east-1:123:schema/schema-1"}
                            ]
                        });

                        const service = new GlueService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getSchemas();

                        expect(result).toHaveLength(1);
                        expect(result[0].SchemaName).toBe("schema-1");

                    }
                );

                it(
                    "returns empty array when no schemas",
                    async () => {

                        glueMock.on(ListSchemasCommand).resolves({});

                        const service = new GlueService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getSchemas();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getWorkflows",
            () => {

                it(
                    "returns workflows as objects with Name",
                    async () => {

                        glueMock.on(ListWorkflowsCommand).resolves({
                            "Workflows": [
                                "workflow-1",
                                "workflow-2"
                            ]
                        });

                        const service = new GlueService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getWorkflows();

                        expect(result).toHaveLength(2);
                        expect(result[0].Name).toBe("workflow-1");
                        expect(result[1].Name).toBe("workflow-2");

                    }
                );

                it(
                    "returns empty array when no workflows",
                    async () => {

                        glueMock.on(ListWorkflowsCommand).resolves({});

                        const service = new GlueService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getWorkflows();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

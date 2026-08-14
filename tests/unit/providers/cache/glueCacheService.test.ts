import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {GlueCacheService} from "../../../../src/providers/cache/glueCacheService.js";

let tmpDir: string;
beforeEach(() => {

    tmpDir = mkdtempSync(join(
        tmpdir(),
        "gnaws-test-"
    ));

});
afterEach(() => {

    rmSync(
        tmpDir,
        {"recursive": true}
    );

});

describe(
    "GlueCacheService",
    () => {

        it(
            "getConnections reads glue_connections.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "glue_connections.json"
                    ),
                    JSON.stringify([{"Name": "conn1"}])
                );
                const service = new GlueCacheService(tmpDir);
                expect(await service.getConnections()).toEqual([{"Name": "conn1"}]);

            }
        );

        it(
            "getConnections returns empty for missing file",
            async () => {

                const service = new GlueCacheService(tmpDir);
                expect(await service.getConnections()).toEqual([]);

            }
        );

        it(
            "getCrawlers reads glue_crawlers.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "glue_crawlers.json"
                    ),
                    JSON.stringify([{"Name": "crawler1"}])
                );
                const service = new GlueCacheService(tmpDir);
                expect(await service.getCrawlers()).toEqual([{"Name": "crawler1"}]);

            }
        );

        it(
            "getCrawlers returns empty for missing file",
            async () => {

                const service = new GlueCacheService(tmpDir);
                expect(await service.getCrawlers()).toEqual([]);

            }
        );

        it(
            "getDatabases reads glue_databases.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "glue_databases.json"
                    ),
                    JSON.stringify([{"Name": "db1"}])
                );
                const service = new GlueCacheService(tmpDir);
                expect(await service.getDatabases()).toEqual([{"Name": "db1"}]);

            }
        );

        it(
            "getDatabases returns empty for missing file",
            async () => {

                const service = new GlueCacheService(tmpDir);
                expect(await service.getDatabases()).toEqual([]);

            }
        );

        it(
            "getJobs reads glue_jobs.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "glue_jobs.json"
                    ),
                    JSON.stringify([{"Name": "job1"}])
                );
                const service = new GlueCacheService(tmpDir);
                expect(await service.getJobs()).toEqual([{"Name": "job1"}]);

            }
        );

        it(
            "getJobs returns empty for missing file",
            async () => {

                const service = new GlueCacheService(tmpDir);
                expect(await service.getJobs()).toEqual([]);

            }
        );

        it(
            "getTriggers reads glue_triggers.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "glue_triggers.json"
                    ),
                    JSON.stringify([{"Name": "trigger1"}])
                );
                const service = new GlueCacheService(tmpDir);
                expect(await service.getTriggers()).toEqual([{"Name": "trigger1"}]);

            }
        );

        it(
            "getTriggers returns empty for missing file",
            async () => {

                const service = new GlueCacheService(tmpDir);
                expect(await service.getTriggers()).toEqual([]);

            }
        );

        it(
            "getTables reads glue_tables.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "glue_tables.json"
                    ),
                    JSON.stringify([{"Name": "table1"}])
                );
                const service = new GlueCacheService(tmpDir);
                expect(await service.getTables()).toEqual([{"Name": "table1"}]);

            }
        );

        it(
            "getTables returns empty for missing file",
            async () => {

                const service = new GlueCacheService(tmpDir);
                expect(await service.getTables()).toEqual([]);

            }
        );

        it(
            "getRegistries reads glue_registries.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "glue_registries.json"
                    ),
                    JSON.stringify([{"RegistryName": "reg1"}])
                );
                const service = new GlueCacheService(tmpDir);
                expect(await service.getRegistries()).toEqual([{"RegistryName": "reg1"}]);

            }
        );

        it(
            "getRegistries returns empty for missing file",
            async () => {

                const service = new GlueCacheService(tmpDir);
                expect(await service.getRegistries()).toEqual([]);

            }
        );

        it(
            "getSchemas reads glue_schemas.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "glue_schemas.json"
                    ),
                    JSON.stringify([{"SchemaName": "schema1"}])
                );
                const service = new GlueCacheService(tmpDir);
                expect(await service.getSchemas()).toEqual([{"SchemaName": "schema1"}]);

            }
        );

        it(
            "getSchemas returns empty for missing file",
            async () => {

                const service = new GlueCacheService(tmpDir);
                expect(await service.getSchemas()).toEqual([]);

            }
        );

        it(
            "getWorkflows reads glue_workflows.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "glue_workflows.json"
                    ),
                    JSON.stringify([{"Name": "wf1"}])
                );
                const service = new GlueCacheService(tmpDir);
                expect(await service.getWorkflows()).toEqual([{"Name": "wf1"}]);

            }
        );

        it(
            "getWorkflows returns empty for missing file",
            async () => {

                const service = new GlueCacheService(tmpDir);
                expect(await service.getWorkflows()).toEqual([]);

            }
        );

    }
);

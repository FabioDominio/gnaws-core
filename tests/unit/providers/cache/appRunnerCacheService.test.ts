import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {AppRunnerCacheService} from "../../../../src/providers/cache/appRunnerCacheService.js";

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
    "AppRunnerCacheService",
    () => {

        it(
            "getServices reads apprunner_services.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "apprunner_services.json"
                    ),
                    JSON.stringify([{"ServiceName": "svc1"}])
                );
                const service = new AppRunnerCacheService(tmpDir);
                expect(await service.getServices()).toEqual([{"ServiceName": "svc1"}]);

            }
        );

        it(
            "getServices returns empty for missing file",
            async () => {

                const service = new AppRunnerCacheService(tmpDir);
                expect(await service.getServices()).toEqual([]);

            }
        );

        it(
            "getVpcConnectors reads apprunner_vpc_connectors.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "apprunner_vpc_connectors.json"
                    ),
                    JSON.stringify([{"VpcConnectorName": "conn1"}])
                );
                const service = new AppRunnerCacheService(tmpDir);
                expect(await service.getVpcConnectors()).toEqual([{"VpcConnectorName": "conn1"}]);

            }
        );

        it(
            "getVpcConnectors returns empty for missing file",
            async () => {

                const service = new AppRunnerCacheService(tmpDir);
                expect(await service.getVpcConnectors()).toEqual([]);

            }
        );

    }
);

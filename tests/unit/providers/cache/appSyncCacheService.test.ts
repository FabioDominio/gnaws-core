import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {AppSyncCacheService} from "../../../../src/providers/cache/appSyncCacheService.js";

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
    "AppSyncCacheService",
    () => {

        it(
            "getGraphqlApis reads appsync_apis.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "appsync_apis.json"
                    ),
                    JSON.stringify([{"apiId": "api1"}])
                );
                const service = new AppSyncCacheService(tmpDir);
                expect(await service.getGraphqlApis()).toEqual([{"apiId": "api1"}]);

            }
        );

        it(
            "getGraphqlApis returns empty for missing file",
            async () => {

                const service = new AppSyncCacheService(tmpDir);
                expect(await service.getGraphqlApis()).toEqual([]);

            }
        );

        it(
            "getDataSources reads appsync_data_sources.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "appsync_data_sources.json"
                    ),
                    JSON.stringify([{"name": "ds1"}])
                );
                const service = new AppSyncCacheService(tmpDir);
                expect(await service.getDataSources("api1")).toEqual([{"name": "ds1"}]);

            }
        );

        it(
            "getDataSources returns empty for missing file",
            async () => {

                const service = new AppSyncCacheService(tmpDir);
                expect(await service.getDataSources("api1")).toEqual([]);

            }
        );

    }
);

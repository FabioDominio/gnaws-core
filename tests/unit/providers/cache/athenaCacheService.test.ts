import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {AthenaCacheService} from "../../../../src/providers/cache/athenaCacheService.js";

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
    "AthenaCacheService",
    () => {

        it(
            "getWorkGroups reads athena_workgroups.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "athena_workgroups.json"
                    ),
                    JSON.stringify([{"Name": "primary"}])
                );
                const service = new AthenaCacheService(tmpDir);
                expect(await service.getWorkGroups()).toEqual([{"Name": "primary"}]);

            }
        );

        it(
            "getWorkGroups returns empty for missing file",
            async () => {

                const service = new AthenaCacheService(tmpDir);
                expect(await service.getWorkGroups()).toEqual([]);

            }
        );

        it(
            "getDataCatalogs reads athena_data_catalogs.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "athena_data_catalogs.json"
                    ),
                    JSON.stringify([{"CatalogName": "default"}])
                );
                const service = new AthenaCacheService(tmpDir);
                expect(await service.getDataCatalogs()).toEqual([{"CatalogName": "default"}]);

            }
        );

        it(
            "getDataCatalogs returns empty for missing file",
            async () => {

                const service = new AthenaCacheService(tmpDir);
                expect(await service.getDataCatalogs()).toEqual([]);

            }
        );

    }
);

import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {MwaaCacheService} from "../../../../src/providers/cache/mwaaCacheService.js";

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
    "MwaaCacheService",
    () => {

        it(
            "getEnvironments reads mwaa_environments.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "mwaa_environments.json"
                    ),
                    JSON.stringify([{"Name": "airflow1"}])
                );
                const service = new MwaaCacheService(tmpDir);
                expect(await service.getEnvironments()).toEqual([{"Name": "airflow1"}]);

            }
        );

        it(
            "getEnvironments returns empty for missing file",
            async () => {

                const service = new MwaaCacheService(tmpDir);
                expect(await service.getEnvironments()).toEqual([]);

            }
        );

    }
);

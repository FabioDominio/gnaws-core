import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {SfnCacheService} from "../../../../src/providers/cache/sfnCacheService.js";

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
    "SfnCacheService",
    () => {

        it(
            "getStateMachines reads sfn_state_machines.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "sfn_state_machines.json"
                    ),
                    JSON.stringify([{"name": "sm1"}])
                );
                const service = new SfnCacheService(tmpDir);
                expect(await service.getStateMachines()).toEqual([{"name": "sm1"}]);

            }
        );

        it(
            "getStateMachines returns empty for missing file",
            async () => {

                const service = new SfnCacheService(tmpDir);
                expect(await service.getStateMachines()).toEqual([]);

            }
        );

    }
);

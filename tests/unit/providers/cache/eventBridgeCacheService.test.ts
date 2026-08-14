import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {EventBridgeCacheService} from "../../../../src/providers/cache/eventBridgeCacheService.js";

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
    "EventBridgeCacheService",
    () => {

        it(
            "getEventBuses reads eventbridge_buses.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "eventbridge_buses.json"
                    ),
                    JSON.stringify([{"Name": "default"}])
                );
                const service = new EventBridgeCacheService(tmpDir);
                expect(await service.getEventBuses()).toEqual([{"Name": "default"}]);

            }
        );

        it(
            "getEventBuses returns empty for missing file",
            async () => {

                const service = new EventBridgeCacheService(tmpDir);
                expect(await service.getEventBuses()).toEqual([]);

            }
        );

        it(
            "getRulesWithTargets always returns empty",
            async () => {

                const service = new EventBridgeCacheService(tmpDir);
                expect(await service.getRulesWithTargets("default")).toEqual([]);

            }
        );

    }
);

import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {DataSyncCacheService} from "../../../../src/providers/cache/dataSyncCacheService.js";

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
    "DataSyncCacheService",
    () => {

        it(
            "getAgents reads datasync_agents.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "datasync_agents.json"
                    ),
                    JSON.stringify([{"AgentArn": "arn:1"}])
                );
                const service = new DataSyncCacheService(tmpDir);
                expect(await service.getAgents()).toEqual([{"AgentArn": "arn:1"}]);

            }
        );

        it(
            "getAgents returns empty for missing file",
            async () => {

                const service = new DataSyncCacheService(tmpDir);
                expect(await service.getAgents()).toEqual([]);

            }
        );

        it(
            "getLocations reads datasync_locations.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "datasync_locations.json"
                    ),
                    JSON.stringify([{"LocationArn": "arn:2"}])
                );
                const service = new DataSyncCacheService(tmpDir);
                expect(await service.getLocations()).toEqual([{"LocationArn": "arn:2"}]);

            }
        );

        it(
            "getLocations returns empty for missing file",
            async () => {

                const service = new DataSyncCacheService(tmpDir);
                expect(await service.getLocations()).toEqual([]);

            }
        );

        it(
            "getTasks reads datasync_tasks.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "datasync_tasks.json"
                    ),
                    JSON.stringify([{"TaskArn": "arn:3"}])
                );
                const service = new DataSyncCacheService(tmpDir);
                expect(await service.getTasks()).toEqual([{"TaskArn": "arn:3"}]);

            }
        );

        it(
            "getTasks returns empty for missing file",
            async () => {

                const service = new DataSyncCacheService(tmpDir);
                expect(await service.getTasks()).toEqual([]);

            }
        );

    }
);

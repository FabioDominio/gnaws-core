import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {MediaConnectCacheService} from "../../../../src/providers/cache/mediaConnectCacheService.js";

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
    "MediaConnectCacheService",
    () => {

        it(
            "getFlows reads mediaconnect_flows.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "mediaconnect_flows.json"
                    ),
                    JSON.stringify([{"FlowArn": "arn:flow:1"}])
                );
                const service = new MediaConnectCacheService(tmpDir);
                expect(await service.getFlows()).toEqual([{"FlowArn": "arn:flow:1"}]);

            }
        );

        it(
            "getFlows returns empty for missing file",
            async () => {

                const service = new MediaConnectCacheService(tmpDir);
                expect(await service.getFlows()).toEqual([]);

            }
        );

    }
);

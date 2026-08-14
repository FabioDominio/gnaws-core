import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {KinesisCacheService} from "../../../../src/providers/cache/kinesisCacheService.js";

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
    "KinesisCacheService",
    () => {

        it(
            "getStreams reads kinesis_streams.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "kinesis_streams.json"
                    ),
                    JSON.stringify([{"StreamName": "stream1"}])
                );
                const service = new KinesisCacheService(tmpDir);
                expect(await service.getStreams()).toEqual([{"StreamName": "stream1"}]);

            }
        );

        it(
            "getStreams returns empty for missing file",
            async () => {

                const service = new KinesisCacheService(tmpDir);
                expect(await service.getStreams()).toEqual([]);

            }
        );

    }
);

import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {PipesCacheService} from "../../../../src/providers/cache/pipesCacheService.js";

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
    "PipesCacheService",
    () => {

        it(
            "getPipes reads pipes_pipes.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "pipes_pipes.json"
                    ),
                    JSON.stringify([{"Name": "pipe1"}])
                );
                const service = new PipesCacheService(tmpDir);
                expect(await service.getPipes()).toEqual([{"Name": "pipe1"}]);

            }
        );

        it(
            "getPipes returns empty for missing file",
            async () => {

                const service = new PipesCacheService(tmpDir);
                expect(await service.getPipes()).toEqual([]);

            }
        );

    }
);

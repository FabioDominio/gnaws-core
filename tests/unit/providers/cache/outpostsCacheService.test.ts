import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {OutpostsCacheService} from "../../../../src/providers/cache/outpostsCacheService.js";

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
    "OutpostsCacheService",
    () => {

        it(
            "getOutposts reads outposts_outposts.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "outposts_outposts.json"
                    ),
                    JSON.stringify([{"OutpostId": "op-1"}])
                );
                const service = new OutpostsCacheService(tmpDir);
                expect(await service.getOutposts()).toEqual([{"OutpostId": "op-1"}]);

            }
        );

        it(
            "getOutposts returns empty for missing file",
            async () => {

                const service = new OutpostsCacheService(tmpDir);
                expect(await service.getOutposts()).toEqual([]);

            }
        );

        it(
            "getSites reads outposts_sites.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "outposts_sites.json"
                    ),
                    JSON.stringify([{"SiteId": "site1"}])
                );
                const service = new OutpostsCacheService(tmpDir);
                expect(await service.getSites()).toEqual([{"SiteId": "site1"}]);

            }
        );

        it(
            "getSites returns empty for missing file",
            async () => {

                const service = new OutpostsCacheService(tmpDir);
                expect(await service.getSites()).toEqual([]);

            }
        );

    }
);

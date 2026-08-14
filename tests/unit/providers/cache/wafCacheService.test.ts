import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {WafCacheService} from "../../../../src/providers/cache/wafCacheService.js";

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
    "WafCacheService",
    () => {

        it(
            "getWebAcls reads waf_web_acls.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "waf_web_acls.json"
                    ),
                    JSON.stringify([{"Name": "acl1"}])
                );
                const service = new WafCacheService(tmpDir);
                expect(await service.getWebAcls()).toEqual([{"Name": "acl1"}]);

            }
        );

        it(
            "getWebAcls returns empty for missing file",
            async () => {

                const service = new WafCacheService(tmpDir);
                expect(await service.getWebAcls()).toEqual([]);

            }
        );

        it(
            "getResourceAssociations always returns empty",
            async () => {

                const service = new WafCacheService(tmpDir);
                expect(await service.getResourceAssociations("arn:waf:1")).toEqual([]);

            }
        );

    }
);

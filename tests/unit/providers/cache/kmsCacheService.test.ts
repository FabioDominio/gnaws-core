import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {KmsCacheService} from "../../../../src/providers/cache/kmsCacheService.js";

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
    "KmsCacheService",
    () => {

        it(
            "getKeys reads kms_keys.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "kms_keys.json"
                    ),
                    JSON.stringify([{"KeyId": "key-1"}])
                );
                const service = new KmsCacheService(tmpDir);
                expect(await service.getKeys()).toEqual([{"KeyId": "key-1"}]);

            }
        );

        it(
            "getKeys returns empty for missing file",
            async () => {

                const service = new KmsCacheService(tmpDir);
                expect(await service.getKeys()).toEqual([]);

            }
        );

        it(
            "getAliases reads kms_aliases.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "kms_aliases.json"
                    ),
                    JSON.stringify([{"AliasName": "alias/my-key"}])
                );
                const service = new KmsCacheService(tmpDir);
                expect(await service.getAliases()).toEqual([{"AliasName": "alias/my-key"}]);

            }
        );

        it(
            "getAliases returns empty for missing file",
            async () => {

                const service = new KmsCacheService(tmpDir);
                expect(await service.getAliases()).toEqual([]);

            }
        );

        it(
            "getTagsForKey always returns empty",
            async () => {

                const service = new KmsCacheService(tmpDir);
                expect(await service.getTagsForKey("key-1")).toEqual([]);

            }
        );

    }
);

import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {OpenSearchCacheService} from "../../../../src/providers/cache/openSearchCacheService.js";

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
    "OpenSearchCacheService",
    () => {

        it(
            "getDomains reads opensearch_domains.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "opensearch_domains.json"
                    ),
                    JSON.stringify([{"DomainName": "domain1"}])
                );
                const service = new OpenSearchCacheService(tmpDir);
                expect(await service.getDomains()).toEqual([{"DomainName": "domain1"}]);

            }
        );

        it(
            "getDomains returns empty for missing file",
            async () => {

                const service = new OpenSearchCacheService(tmpDir);
                expect(await service.getDomains()).toEqual([]);

            }
        );

    }
);

import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {OpenSearchServerlessCacheService} from "../../../../src/providers/cache/openSearchServerlessCacheService.js";

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
    "OpenSearchServerlessCacheService",
    () => {

        it(
            "getCollections reads opensearchserverless_collections.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "opensearchserverless_collections.json"
                    ),
                    JSON.stringify([{"name": "col1"}])
                );
                const service = new OpenSearchServerlessCacheService(tmpDir);
                expect(await service.getCollections()).toEqual([{"name": "col1"}]);

            }
        );

        it(
            "getCollections returns empty for missing file",
            async () => {

                const service = new OpenSearchServerlessCacheService(tmpDir);
                expect(await service.getCollections()).toEqual([]);

            }
        );

        it(
            "getVpcEndpoints reads opensearchserverless_vpc_endpoints.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "opensearchserverless_vpc_endpoints.json"
                    ),
                    JSON.stringify([{"id": "vpce1"}])
                );
                const service = new OpenSearchServerlessCacheService(tmpDir);
                expect(await service.getVpcEndpoints()).toEqual([{"id": "vpce1"}]);

            }
        );

        it(
            "getVpcEndpoints returns empty for missing file",
            async () => {

                const service = new OpenSearchServerlessCacheService(tmpDir);
                expect(await service.getVpcEndpoints()).toEqual([]);

            }
        );

    }
);

import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {RedshiftServerlessCacheService} from "../../../../src/providers/cache/redshiftServerlessCacheService.js";

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
    "RedshiftServerlessCacheService",
    () => {

        it(
            "getNamespaces reads redshiftserverless_namespaces.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "redshiftserverless_namespaces.json"
                    ),
                    JSON.stringify([{"namespaceName": "ns1"}])
                );
                const service = new RedshiftServerlessCacheService(tmpDir);
                expect(await service.getNamespaces()).toEqual([{"namespaceName": "ns1"}]);

            }
        );

        it(
            "getNamespaces returns empty for missing file",
            async () => {

                const service = new RedshiftServerlessCacheService(tmpDir);
                expect(await service.getNamespaces()).toEqual([]);

            }
        );

        it(
            "getWorkgroups reads redshiftserverless_workgroups.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "redshiftserverless_workgroups.json"
                    ),
                    JSON.stringify([{"workgroupName": "wg1"}])
                );
                const service = new RedshiftServerlessCacheService(tmpDir);
                expect(await service.getWorkgroups()).toEqual([{"workgroupName": "wg1"}]);

            }
        );

        it(
            "getWorkgroups returns empty for missing file",
            async () => {

                const service = new RedshiftServerlessCacheService(tmpDir);
                expect(await service.getWorkgroups()).toEqual([]);

            }
        );

    }
);

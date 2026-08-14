import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {OrganizationsCacheService} from "../../../../src/providers/cache/organizationsCacheService.js";

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
    "OrganizationsCacheService",
    () => {

        it(
            "getRoots reads organizations_roots.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "organizations_roots.json"
                    ),
                    JSON.stringify([{"Id": "r-1234"}])
                );
                const service = new OrganizationsCacheService(tmpDir);
                expect(await service.getRoots()).toEqual([{"Id": "r-1234"}]);

            }
        );

        it(
            "getRoots returns empty for missing file",
            async () => {

                const service = new OrganizationsCacheService(tmpDir);
                expect(await service.getRoots()).toEqual([]);

            }
        );

        it(
            "getOrganizationalUnits always returns empty",
            async () => {

                const service = new OrganizationsCacheService(tmpDir);
                expect(await service.getOrganizationalUnits("r-1234")).toEqual([]);

            }
        );

        it(
            "getAccounts reads organizations_accounts.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "organizations_accounts.json"
                    ),
                    JSON.stringify([{"Id": "123456789012"}])
                );
                const service = new OrganizationsCacheService(tmpDir);
                expect(await service.getAccounts()).toEqual([{"Id": "123456789012"}]);

            }
        );

        it(
            "getAccounts returns empty for missing file",
            async () => {

                const service = new OrganizationsCacheService(tmpDir);
                expect(await service.getAccounts()).toEqual([]);

            }
        );

        it(
            "getPolicies reads organizations_policies.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "organizations_policies.json"
                    ),
                    JSON.stringify([{"Id": "p-1"}])
                );
                const service = new OrganizationsCacheService(tmpDir);
                expect(await service.getPolicies()).toEqual([{"Id": "p-1"}]);

            }
        );

        it(
            "getPolicies returns empty for missing file",
            async () => {

                const service = new OrganizationsCacheService(tmpDir);
                expect(await service.getPolicies()).toEqual([]);

            }
        );

    }
);

import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {BackupCacheService} from "../../../../src/providers/cache/backupCacheService.js";

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
    "BackupCacheService",
    () => {

        it(
            "getBackupVaults reads backup_vaults.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "backup_vaults.json"
                    ),
                    JSON.stringify([{"BackupVaultName": "vault1"}])
                );
                const service = new BackupCacheService(tmpDir);
                expect(await service.getBackupVaults()).toEqual([{"BackupVaultName": "vault1"}]);

            }
        );

        it(
            "getBackupVaults returns empty for missing file",
            async () => {

                const service = new BackupCacheService(tmpDir);
                expect(await service.getBackupVaults()).toEqual([]);

            }
        );

        it(
            "getProtectedResources reads backup_protected_resources.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "backup_protected_resources.json"
                    ),
                    JSON.stringify([{"ResourceArn": "arn:1"}])
                );
                const service = new BackupCacheService(tmpDir);
                expect(await service.getProtectedResources()).toEqual([{"ResourceArn": "arn:1"}]);

            }
        );

        it(
            "getProtectedResources returns empty for missing file",
            async () => {

                const service = new BackupCacheService(tmpDir);
                expect(await service.getProtectedResources()).toEqual([]);

            }
        );

        it(
            "getBackupPlans reads backup_plans.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "backup_plans.json"
                    ),
                    JSON.stringify([{"BackupPlanId": "plan1"}])
                );
                const service = new BackupCacheService(tmpDir);
                expect(await service.getBackupPlans()).toEqual([{"BackupPlanId": "plan1"}]);

            }
        );

        it(
            "getBackupPlans returns empty for missing file",
            async () => {

                const service = new BackupCacheService(tmpDir);
                expect(await service.getBackupPlans()).toEqual([]);

            }
        );

        it(
            "getBackupSelections reads backup_selections.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "backup_selections.json"
                    ),
                    JSON.stringify([{"SelectionId": "sel1"}])
                );
                const service = new BackupCacheService(tmpDir);
                expect(await service.getBackupSelections("plan1")).toEqual([{"SelectionId": "sel1"}]);

            }
        );

        it(
            "getBackupSelections returns empty for missing file",
            async () => {

                const service = new BackupCacheService(tmpDir);
                expect(await service.getBackupSelections("plan1")).toEqual([]);

            }
        );

    }
);

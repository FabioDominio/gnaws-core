import type {BackupVaultListMember, ProtectedResource, BackupPlansListMember, BackupSelectionsListMember} from "@aws-sdk/client-backup";
import type {Backup} from "../../interfaces/backup.js";
import {readCacheFile} from "./cacheReader.js";

export class BackupCacheService implements Backup {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getBackupVaults (): Promise<BackupVaultListMember[]> {

        return readCacheFile(
            this.#cacheDir,
            "backup_vaults.json"
        );

    }

    async getProtectedResources (): Promise<ProtectedResource[]> {

        return readCacheFile(
            this.#cacheDir,
            "backup_protected_resources.json"
        );

    }

    async getBackupPlans (): Promise<BackupPlansListMember[]> {

        return readCacheFile(
            this.#cacheDir,
            "backup_plans.json"
        );

    }

    async getBackupSelections (_backupPlanId: string): Promise<BackupSelectionsListMember[]> {

        return readCacheFile(
            this.#cacheDir,
            "backup_selections.json"
        );

    }

}

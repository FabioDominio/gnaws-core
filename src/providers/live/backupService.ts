import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type BackupVaultListMember,
    type ProtectedResource,
    type BackupPlansListMember,
    type BackupSelectionsListMember,
    BackupClient,
    type BackupClientConfig,
    paginateListBackupVaults,
    paginateListProtectedResources,
    paginateListBackupPlans,
    paginateListBackupSelections
} from "@aws-sdk/client-backup";
import type {Backup} from "../../interfaces/backup.js";

export class BackupService implements Backup {

    #client: BackupClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: BackupClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new BackupClient(config);

    }

    async getBackupVaults (): Promise<BackupVaultListMember[]> {

        const client = this.#client;
        const vaults: BackupVaultListMember[] = [];

        for await (const page of paginateListBackupVaults(
            {client},
            {}
        )) {

            if (page.BackupVaultList !== undefined) {

                vaults.push(...page.BackupVaultList);

            }

        }

        return vaults;

    }

    async getProtectedResources (): Promise<ProtectedResource[]> {

        const client = this.#client;
        const resources: ProtectedResource[] = [];

        for await (const page of paginateListProtectedResources(
            {client},
            {}
        )) {

            if (page.Results !== undefined) {

                resources.push(...page.Results);

            }

        }

        return resources;

    }

    async getBackupPlans (): Promise<BackupPlansListMember[]> {

        const client = this.#client;
        const results: BackupPlansListMember[] = [];

        for await (const page of paginateListBackupPlans(
            {client},
            {}
        )) {

            if (page.BackupPlansList !== undefined) {

                results.push(...page.BackupPlansList);

            }

        }

        return results;

    }

    async getBackupSelections (backupPlanId: string): Promise<BackupSelectionsListMember[]> {

        const client = this.#client;
        const results: BackupSelectionsListMember[] = [];

        for await (const page of paginateListBackupSelections(
            {client},
            {"BackupPlanId": backupPlanId}
        )) {

            if (page.BackupSelectionsList !== undefined) {

                results.push(...page.BackupSelectionsList);

            }

        }

        return results;

    }

}

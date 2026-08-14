import type {BackupVaultListMember, ProtectedResource, BackupPlansListMember, BackupSelectionsListMember} from "@aws-sdk/client-backup";

export interface Backup {
    getBackupVaults (): Promise<BackupVaultListMember[]>;
    getProtectedResources (): Promise<ProtectedResource[]>;
    getBackupPlans (): Promise<BackupPlansListMember[]>;
    getBackupSelections (backupPlanId: string): Promise<BackupSelectionsListMember[]>;
}

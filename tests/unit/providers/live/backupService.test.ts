import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    BackupClient,
    ListBackupVaultsCommand,
    ListProtectedResourcesCommand,
    ListBackupPlansCommand,
    ListBackupSelectionsCommand
} from "@aws-sdk/client-backup";
import {BackupService} from "../../../../src/providers/live/backupService.js";

const backupMock = mockClient(BackupClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    backupMock.reset();

});

describe(
    "BackupService",
    () => {

        describe(
            "getBackupVaults",
            () => {

                it(
                    "returns backup vaults",
                    async () => {

                        backupMock.on(ListBackupVaultsCommand).resolves({
                            "BackupVaultList": [
                                {"BackupVaultName": "vault-1",
                                    "BackupVaultArn": "arn:aws:backup:us-east-1:123:vault:vault-1"},
                                {"BackupVaultName": "vault-2",
                                    "BackupVaultArn": "arn:aws:backup:us-east-1:123:vault:vault-2"}
                            ]
                        });

                        const service = new BackupService(
                            creds,
                            "us-east-1"
                        );
                        const vaults = await service.getBackupVaults();

                        expect(vaults).toHaveLength(2);
                        expect(vaults[0].BackupVaultName).toBe("vault-1");

                    }
                );

                it(
                    "returns empty when no vaults",
                    async () => {

                        backupMock.on(ListBackupVaultsCommand).resolves({});

                        const service = new BackupService(
                            creds,
                            "us-east-1"
                        );
                        const vaults = await service.getBackupVaults();

                        expect(vaults).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getProtectedResources",
            () => {

                it(
                    "returns protected resources",
                    async () => {

                        backupMock.on(ListProtectedResourcesCommand).resolves({
                            "Results": [
                                {"ResourceArn": "arn:aws:ec2:us-east-1:123:volume/vol-1",
                                    "ResourceType": "EBS"},
                                {"ResourceArn": "arn:aws:rds:us-east-1:123:db:mydb",
                                    "ResourceType": "RDS"}
                            ]
                        });

                        const service = new BackupService(
                            creds,
                            "us-east-1"
                        );
                        const resources = await service.getProtectedResources();

                        expect(resources).toHaveLength(2);
                        expect(resources[0].ResourceType).toBe("EBS");

                    }
                );

                it(
                    "returns empty when no protected resources",
                    async () => {

                        backupMock.on(ListProtectedResourcesCommand).resolves({});

                        const service = new BackupService(
                            creds,
                            "us-east-1"
                        );
                        const resources = await service.getProtectedResources();

                        expect(resources).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getBackupPlans",
            () => {

                it(
                    "returns backup plans",
                    async () => {

                        backupMock.on(ListBackupPlansCommand).resolves({
                            "BackupPlansList": [
                                {"BackupPlanId": "plan-1",
                                    "BackupPlanName": "Daily"},
                                {"BackupPlanId": "plan-2",
                                    "BackupPlanName": "Weekly"}
                            ]
                        });

                        const service = new BackupService(
                            creds,
                            "us-east-1"
                        );
                        const plans = await service.getBackupPlans();

                        expect(plans).toHaveLength(2);
                        expect(plans[0].BackupPlanId).toBe("plan-1");

                    }
                );

                it(
                    "returns empty when no backup plans",
                    async () => {

                        backupMock.on(ListBackupPlansCommand).resolves({});

                        const service = new BackupService(
                            creds,
                            "us-east-1"
                        );
                        const plans = await service.getBackupPlans();

                        expect(plans).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getBackupSelections",
            () => {

                it(
                    "returns backup selections for a plan",
                    async () => {

                        backupMock.on(ListBackupSelectionsCommand).resolves({
                            "BackupSelectionsList": [
                                {"SelectionId": "sel-1",
                                    "SelectionName": "AllEC2",
                                    "BackupPlanId": "plan-1"},
                                {"SelectionId": "sel-2",
                                    "SelectionName": "AllRDS",
                                    "BackupPlanId": "plan-1"}
                            ]
                        });

                        const service = new BackupService(
                            creds,
                            "us-east-1"
                        );
                        const selections = await service.getBackupSelections("plan-1");

                        expect(selections).toHaveLength(2);
                        expect(selections[0].SelectionId).toBe("sel-1");

                    }
                );

                it(
                    "returns empty when no selections",
                    async () => {

                        backupMock.on(ListBackupSelectionsCommand).resolves({});

                        const service = new BackupService(
                            creds,
                            "us-east-1"
                        );
                        const selections = await service.getBackupSelections("plan-1");

                        expect(selections).toHaveLength(0);

                    }
                );

            }
        );

    }
);

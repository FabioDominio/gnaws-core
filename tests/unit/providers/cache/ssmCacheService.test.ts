import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {SsmCacheService} from "../../../../src/providers/cache/ssmCacheService.js";

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
    "SsmCacheService",
    () => {

        it(
            "getParameters reads ssm_parameters.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "ssm_parameters.json"
                    ),
                    JSON.stringify([{"Name": "/my/param"}])
                );
                const service = new SsmCacheService(tmpDir);
                expect(await service.getParameters()).toEqual([{"Name": "/my/param"}]);

            }
        );

        it(
            "getParameters returns empty for missing file",
            async () => {

                const service = new SsmCacheService(tmpDir);
                expect(await service.getParameters()).toEqual([]);

            }
        );

        it(
            "getManagedInstances reads ssm_managed_instances.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "ssm_managed_instances.json"
                    ),
                    JSON.stringify([{"InstanceId": "i-123"}])
                );
                const service = new SsmCacheService(tmpDir);
                expect(await service.getManagedInstances()).toEqual([{"InstanceId": "i-123"}]);

            }
        );

        it(
            "getManagedInstances returns empty for missing file",
            async () => {

                const service = new SsmCacheService(tmpDir);
                expect(await service.getManagedInstances()).toEqual([]);

            }
        );

        it(
            "getMaintenanceWindows reads ssm_maintenance_windows.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "ssm_maintenance_windows.json"
                    ),
                    JSON.stringify([{"WindowId": "mw-1"}])
                );
                const service = new SsmCacheService(tmpDir);
                expect(await service.getMaintenanceWindows()).toEqual([{"WindowId": "mw-1"}]);

            }
        );

        it(
            "getMaintenanceWindows returns empty for missing file",
            async () => {

                const service = new SsmCacheService(tmpDir);
                expect(await service.getMaintenanceWindows()).toEqual([]);

            }
        );

        it(
            "getDocuments reads ssm_documents.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "ssm_documents.json"
                    ),
                    JSON.stringify([{"Name": "doc1"}])
                );
                const service = new SsmCacheService(tmpDir);
                expect(await service.getDocuments()).toEqual([{"Name": "doc1"}]);

            }
        );

        it(
            "getDocuments returns empty for missing file",
            async () => {

                const service = new SsmCacheService(tmpDir);
                expect(await service.getDocuments()).toEqual([]);

            }
        );

        it(
            "getAssociations reads ssm_associations.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "ssm_associations.json"
                    ),
                    JSON.stringify([{"AssociationId": "assoc-1"}])
                );
                const service = new SsmCacheService(tmpDir);
                expect(await service.getAssociations()).toEqual([{"AssociationId": "assoc-1"}]);

            }
        );

        it(
            "getAssociations returns empty for missing file",
            async () => {

                const service = new SsmCacheService(tmpDir);
                expect(await service.getAssociations()).toEqual([]);

            }
        );

        it(
            "getPatchBaselines reads ssm_patch_baselines.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "ssm_patch_baselines.json"
                    ),
                    JSON.stringify([{"BaselineId": "pb-1"}])
                );
                const service = new SsmCacheService(tmpDir);
                expect(await service.getPatchBaselines()).toEqual([{"BaselineId": "pb-1"}]);

            }
        );

        it(
            "getPatchBaselines returns empty for missing file",
            async () => {

                const service = new SsmCacheService(tmpDir);
                expect(await service.getPatchBaselines()).toEqual([]);

            }
        );

    }
);

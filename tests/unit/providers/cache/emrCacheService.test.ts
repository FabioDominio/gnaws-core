import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {EmrCacheService} from "../../../../src/providers/cache/emrCacheService.js";

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
    "EmrCacheService",
    () => {

        it(
            "getClusters reads emr_clusters.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "emr_clusters.json"
                    ),
                    JSON.stringify([{"Id": "j-123"}])
                );
                const service = new EmrCacheService(tmpDir);
                expect(await service.getClusters()).toEqual([{"Id": "j-123"}]);

            }
        );

        it(
            "getClusters returns empty for missing file",
            async () => {

                const service = new EmrCacheService(tmpDir);
                expect(await service.getClusters()).toEqual([]);

            }
        );

        it(
            "getInstanceFleets reads emr_instance_fleets.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "emr_instance_fleets.json"
                    ),
                    JSON.stringify([{"Id": "if-1"}])
                );
                const service = new EmrCacheService(tmpDir);
                expect(await service.getInstanceFleets("j-123")).toEqual([{"Id": "if-1"}]);

            }
        );

        it(
            "getInstanceFleets returns empty for missing file",
            async () => {

                const service = new EmrCacheService(tmpDir);
                expect(await service.getInstanceFleets("j-123")).toEqual([]);

            }
        );

        it(
            "getInstanceGroups reads emr_instance_groups.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "emr_instance_groups.json"
                    ),
                    JSON.stringify([{"Id": "ig-1"}])
                );
                const service = new EmrCacheService(tmpDir);
                expect(await service.getInstanceGroups("j-123")).toEqual([{"Id": "ig-1"}]);

            }
        );

        it(
            "getInstanceGroups returns empty for missing file",
            async () => {

                const service = new EmrCacheService(tmpDir);
                expect(await service.getInstanceGroups("j-123")).toEqual([]);

            }
        );

        it(
            "getSecurityConfigurations reads emr_security_configurations.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "emr_security_configurations.json"
                    ),
                    JSON.stringify([{"Name": "sec1"}])
                );
                const service = new EmrCacheService(tmpDir);
                expect(await service.getSecurityConfigurations()).toEqual([{"Name": "sec1"}]);

            }
        );

        it(
            "getSecurityConfigurations returns empty for missing file",
            async () => {

                const service = new EmrCacheService(tmpDir);
                expect(await service.getSecurityConfigurations()).toEqual([]);

            }
        );

    }
);

import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {VpcLatticeCacheService} from "../../../../src/providers/cache/vpcLatticeCacheService.js";

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
    "VpcLatticeCacheService",
    () => {

        it(
            "getServiceNetworks reads vpclattice_service_networks.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "vpclattice_service_networks.json"
                    ),
                    JSON.stringify([{"id": "sn-1"}])
                );
                const service = new VpcLatticeCacheService(tmpDir);
                expect(await service.getServiceNetworks()).toEqual([{"id": "sn-1"}]);

            }
        );

        it(
            "getServiceNetworks returns empty for missing file",
            async () => {

                const service = new VpcLatticeCacheService(tmpDir);
                expect(await service.getServiceNetworks()).toEqual([]);

            }
        );

        it(
            "getServices reads vpclattice_services.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "vpclattice_services.json"
                    ),
                    JSON.stringify([{"id": "svc-1"}])
                );
                const service = new VpcLatticeCacheService(tmpDir);
                expect(await service.getServices()).toEqual([{"id": "svc-1"}]);

            }
        );

        it(
            "getServices returns empty for missing file",
            async () => {

                const service = new VpcLatticeCacheService(tmpDir);
                expect(await service.getServices()).toEqual([]);

            }
        );

        it(
            "getTargetGroups reads vpclattice_target_groups.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "vpclattice_target_groups.json"
                    ),
                    JSON.stringify([{"id": "tg-1"}])
                );
                const service = new VpcLatticeCacheService(tmpDir);
                expect(await service.getTargetGroups()).toEqual([{"id": "tg-1"}]);

            }
        );

        it(
            "getTargetGroups returns empty for missing file",
            async () => {

                const service = new VpcLatticeCacheService(tmpDir);
                expect(await service.getTargetGroups()).toEqual([]);

            }
        );

        it(
            "getServiceNetworkVpcAssociations reads vpclattice_vpc_associations.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "vpclattice_vpc_associations.json"
                    ),
                    JSON.stringify([{"id": "snva-1"}])
                );
                const service = new VpcLatticeCacheService(tmpDir);
                expect(await service.getServiceNetworkVpcAssociations("sn-1")).toEqual([{"id": "snva-1"}]);

            }
        );

        it(
            "getServiceNetworkVpcAssociations returns empty for missing file",
            async () => {

                const service = new VpcLatticeCacheService(tmpDir);
                expect(await service.getServiceNetworkVpcAssociations("sn-1")).toEqual([]);

            }
        );

        it(
            "getServiceNetworkServiceAssociations reads vpclattice_service_associations.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "vpclattice_service_associations.json"
                    ),
                    JSON.stringify([{"id": "snsa-1"}])
                );
                const service = new VpcLatticeCacheService(tmpDir);
                expect(await service.getServiceNetworkServiceAssociations("sn-1")).toEqual([{"id": "snsa-1"}]);

            }
        );

        it(
            "getServiceNetworkServiceAssociations returns empty for missing file",
            async () => {

                const service = new VpcLatticeCacheService(tmpDir);
                expect(await service.getServiceNetworkServiceAssociations("sn-1")).toEqual([]);

            }
        );

    }
);

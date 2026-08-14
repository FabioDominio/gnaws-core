import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {AppMeshCacheService} from "../../../../src/providers/cache/appMeshCacheService.js";

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
    "AppMeshCacheService",
    () => {

        it(
            "getMeshes reads appmesh_meshes.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "appmesh_meshes.json"
                    ),
                    JSON.stringify([{"meshName": "mesh1"}])
                );
                const service = new AppMeshCacheService(tmpDir);
                expect(await service.getMeshes()).toEqual([{"meshName": "mesh1"}]);

            }
        );

        it(
            "getMeshes returns empty for missing file",
            async () => {

                const service = new AppMeshCacheService(tmpDir);
                expect(await service.getMeshes()).toEqual([]);

            }
        );

        it(
            "getVirtualNodes reads appmesh_virtual_nodes.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "appmesh_virtual_nodes.json"
                    ),
                    JSON.stringify([{"virtualNodeName": "node1"}])
                );
                const service = new AppMeshCacheService(tmpDir);
                expect(await service.getVirtualNodes("mesh1")).toEqual([{"virtualNodeName": "node1"}]);

            }
        );

        it(
            "getVirtualNodes returns empty for missing file",
            async () => {

                const service = new AppMeshCacheService(tmpDir);
                expect(await service.getVirtualNodes("mesh1")).toEqual([]);

            }
        );

        it(
            "getVirtualServices reads appmesh_virtual_services.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "appmesh_virtual_services.json"
                    ),
                    JSON.stringify([{"virtualServiceName": "svc1"}])
                );
                const service = new AppMeshCacheService(tmpDir);
                expect(await service.getVirtualServices("mesh1")).toEqual([{"virtualServiceName": "svc1"}]);

            }
        );

        it(
            "getVirtualServices returns empty for missing file",
            async () => {

                const service = new AppMeshCacheService(tmpDir);
                expect(await service.getVirtualServices("mesh1")).toEqual([]);

            }
        );

    }
);

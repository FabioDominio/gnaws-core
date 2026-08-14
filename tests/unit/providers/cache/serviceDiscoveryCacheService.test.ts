import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {CacheServiceDiscoveryCacheService} from "../../../../src/providers/cache/serviceDiscoveryCacheService.js";

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
    "CacheServiceDiscoveryCacheService",
    () => {

        it(
            "getNamespaces reads servicediscovery_namespaces.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "servicediscovery_namespaces.json"
                    ),
                    JSON.stringify([{"Id": "ns-1"}])
                );
                const service = new CacheServiceDiscoveryCacheService(tmpDir);
                expect(await service.getNamespaces()).toEqual([{"Id": "ns-1"}]);

            }
        );

        it(
            "getNamespaces returns empty for missing file",
            async () => {

                const service = new CacheServiceDiscoveryCacheService(tmpDir);
                expect(await service.getNamespaces()).toEqual([]);

            }
        );

        it(
            "getServices reads servicediscovery_services.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "servicediscovery_services.json"
                    ),
                    JSON.stringify([{"Id": "srv-1"}])
                );
                const service = new CacheServiceDiscoveryCacheService(tmpDir);
                expect(await service.getServices()).toEqual([{"Id": "srv-1"}]);

            }
        );

        it(
            "getServices returns empty for missing file",
            async () => {

                const service = new CacheServiceDiscoveryCacheService(tmpDir);
                expect(await service.getServices()).toEqual([]);

            }
        );

        it(
            "getInstances reads servicediscovery_instances.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "servicediscovery_instances.json"
                    ),
                    JSON.stringify([{"Id": "inst-1"}])
                );
                const service = new CacheServiceDiscoveryCacheService(tmpDir);
                expect(await service.getInstances("srv-1")).toEqual([{"Id": "inst-1"}]);

            }
        );

        it(
            "getInstances returns empty for missing file",
            async () => {

                const service = new CacheServiceDiscoveryCacheService(tmpDir);
                expect(await service.getInstances("srv-1")).toEqual([]);

            }
        );

    }
);

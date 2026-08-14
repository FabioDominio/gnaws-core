import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {GlobalAcceleratorCacheService} from "../../../../src/providers/cache/globalAcceleratorCacheService.js";

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
    "GlobalAcceleratorCacheService",
    () => {

        it(
            "getAccelerators reads global_accelerator_accelerators.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "global_accelerator_accelerators.json"
                    ),
                    JSON.stringify([{"AcceleratorArn": "arn:1"}])
                );
                const service = new GlobalAcceleratorCacheService(tmpDir);
                expect(await service.getAccelerators()).toEqual([{"AcceleratorArn": "arn:1"}]);

            }
        );

        it(
            "getAccelerators returns empty for missing file",
            async () => {

                const service = new GlobalAcceleratorCacheService(tmpDir);
                expect(await service.getAccelerators()).toEqual([]);

            }
        );

        it(
            "getListeners reads global_accelerator_listeners.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "global_accelerator_listeners.json"
                    ),
                    JSON.stringify([{"ListenerArn": "arn:l1"}])
                );
                const service = new GlobalAcceleratorCacheService(tmpDir);
                expect(await service.getListeners("arn:1")).toEqual([{"ListenerArn": "arn:l1"}]);

            }
        );

        it(
            "getListeners returns empty for missing file",
            async () => {

                const service = new GlobalAcceleratorCacheService(tmpDir);
                expect(await service.getListeners("arn:1")).toEqual([]);

            }
        );

        it(
            "getEndpointGroups reads global_accelerator_endpoint_groups.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "global_accelerator_endpoint_groups.json"
                    ),
                    JSON.stringify([{"EndpointGroupArn": "arn:eg1"}])
                );
                const service = new GlobalAcceleratorCacheService(tmpDir);
                expect(await service.getEndpointGroups("arn:l1")).toEqual([{"EndpointGroupArn": "arn:eg1"}]);

            }
        );

        it(
            "getEndpointGroups returns empty for missing file",
            async () => {

                const service = new GlobalAcceleratorCacheService(tmpDir);
                expect(await service.getEndpointGroups("arn:l1")).toEqual([]);

            }
        );

    }
);

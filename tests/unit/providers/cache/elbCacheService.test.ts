import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {ElbCacheService} from "../../../../src/providers/cache/elbCacheService.js";

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
    "ElbCacheService",
    () => {

        it(
            "getLoadBalancers reads elb_load_balancers.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "elb_load_balancers.json"
                    ),
                    JSON.stringify([{"LoadBalancerName": "lb1"}])
                );
                const service = new ElbCacheService(tmpDir);
                expect(await service.getLoadBalancers()).toEqual([{"LoadBalancerName": "lb1"}]);

            }
        );

        it(
            "getLoadBalancers returns empty for missing file",
            async () => {

                const service = new ElbCacheService(tmpDir);
                expect(await service.getLoadBalancers()).toEqual([]);

            }
        );

    }
);

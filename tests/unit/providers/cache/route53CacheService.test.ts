import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {Route53CacheService} from "../../../../src/providers/cache/route53CacheService.js";

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
    "Route53CacheService",
    () => {

        it(
            "getHostedZones reads route53_hosted_zones.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "route53_hosted_zones.json"
                    ),
                    JSON.stringify([{"Id": "/hostedzone/Z123"}])
                );
                const service = new Route53CacheService(tmpDir);
                expect(await service.getHostedZones()).toEqual([{"Id": "/hostedzone/Z123"}]);

            }
        );

        it(
            "getHostedZones returns empty for missing file",
            async () => {

                const service = new Route53CacheService(tmpDir);
                expect(await service.getHostedZones()).toEqual([]);

            }
        );

        it(
            "getRecordSets reads route53_record_sets.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "route53_record_sets.json"
                    ),
                    JSON.stringify([
                        {"Name": "example.com.",
                            "Type": "A"}
                    ])
                );
                const service = new Route53CacheService(tmpDir);
                expect(await service.getRecordSets("Z123")).toEqual([
                    {"Name": "example.com.",
                        "Type": "A"}
                ]);

            }
        );

        it(
            "getRecordSets returns empty for missing file",
            async () => {

                const service = new Route53CacheService(tmpDir);
                expect(await service.getRecordSets("Z123")).toEqual([]);

            }
        );

        it(
            "getHealthChecks reads route53_health_checks.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "route53_health_checks.json"
                    ),
                    JSON.stringify([{"Id": "hc-1"}])
                );
                const service = new Route53CacheService(tmpDir);
                expect(await service.getHealthChecks()).toEqual([{"Id": "hc-1"}]);

            }
        );

        it(
            "getHealthChecks returns empty for missing file",
            async () => {

                const service = new Route53CacheService(tmpDir);
                expect(await service.getHealthChecks()).toEqual([]);

            }
        );

    }
);

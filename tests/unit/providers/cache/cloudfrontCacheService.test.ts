import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {CloudFrontCacheService} from "../../../../src/providers/cache/cloudfrontCacheService.js";

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
    "CloudFrontCacheService",
    () => {

        it(
            "getDistributions reads cloudfront_distributions.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "cloudfront_distributions.json"
                    ),
                    JSON.stringify([{"Id": "dist1"}])
                );
                const service = new CloudFrontCacheService(tmpDir);
                expect(await service.getDistributions()).toEqual([{"Id": "dist1"}]);

            }
        );

        it(
            "getDistributions returns empty for missing file",
            async () => {

                const service = new CloudFrontCacheService(tmpDir);
                expect(await service.getDistributions()).toEqual([]);

            }
        );

        it(
            "getFunctions reads cloudfront_functions.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "cloudfront_functions.json"
                    ),
                    JSON.stringify([{"Name": "fn1"}])
                );
                const service = new CloudFrontCacheService(tmpDir);
                expect(await service.getFunctions()).toEqual([{"Name": "fn1"}]);

            }
        );

        it(
            "getFunctions returns empty for missing file",
            async () => {

                const service = new CloudFrontCacheService(tmpDir);
                expect(await service.getFunctions()).toEqual([]);

            }
        );

        it(
            "getOriginAccessControls reads cloudfront_origin_access_controls.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "cloudfront_origin_access_controls.json"
                    ),
                    JSON.stringify([{"Id": "oac1"}])
                );
                const service = new CloudFrontCacheService(tmpDir);
                expect(await service.getOriginAccessControls()).toEqual([{"Id": "oac1"}]);

            }
        );

        it(
            "getOriginAccessControls returns empty for missing file",
            async () => {

                const service = new CloudFrontCacheService(tmpDir);
                expect(await service.getOriginAccessControls()).toEqual([]);

            }
        );

        it(
            "getKeyValueStores reads cloudfront_key_value_stores.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "cloudfront_key_value_stores.json"
                    ),
                    JSON.stringify([{"Name": "kvs1"}])
                );
                const service = new CloudFrontCacheService(tmpDir);
                expect(await service.getKeyValueStores()).toEqual([{"Name": "kvs1"}]);

            }
        );

        it(
            "getKeyValueStores returns empty for missing file",
            async () => {

                const service = new CloudFrontCacheService(tmpDir);
                expect(await service.getKeyValueStores()).toEqual([]);

            }
        );

        it(
            "getTagsForDistribution always returns empty",
            async () => {

                const service = new CloudFrontCacheService(tmpDir);
                expect(await service.getTagsForDistribution("arn:1")).toEqual([]);

            }
        );

    }
);

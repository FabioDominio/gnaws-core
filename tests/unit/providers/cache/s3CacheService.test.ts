import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {S3CacheService} from "../../../../src/providers/cache/s3CacheService.js";

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
    "S3CacheService",
    () => {

        it(
            "getBuckets always returns empty",
            async () => {

                const service = new S3CacheService(tmpDir);
                expect(await service.getBuckets()).toEqual([]);

            }
        );

        it(
            "getDirectoryBuckets reads s3_directory_buckets.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "s3_directory_buckets.json"
                    ),
                    JSON.stringify([{"BucketName": "bucket--usw2-az1--x-s3"}])
                );
                const service = new S3CacheService(tmpDir);
                expect(await service.getDirectoryBuckets()).toEqual([{"BucketName": "bucket--usw2-az1--x-s3"}]);

            }
        );

        it(
            "getDirectoryBuckets returns empty for missing file",
            async () => {

                const service = new S3CacheService(tmpDir);
                expect(await service.getDirectoryBuckets()).toEqual([]);

            }
        );

    }
);

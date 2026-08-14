import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {S3TablesCacheService} from "../../../../src/providers/cache/s3TablesCacheService.js";

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
    "S3TablesCacheService",
    () => {

        it(
            "getTableBuckets reads s3tables_table_buckets.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "s3tables_table_buckets.json"
                    ),
                    JSON.stringify([{"name": "tb1"}])
                );
                const service = new S3TablesCacheService(tmpDir);
                expect(await service.getTableBuckets()).toEqual([{"name": "tb1"}]);

            }
        );

        it(
            "getTableBuckets returns empty for missing file",
            async () => {

                const service = new S3TablesCacheService(tmpDir);
                expect(await service.getTableBuckets()).toEqual([]);

            }
        );

        it(
            "getNamespaces reads s3tables_namespaces.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "s3tables_namespaces.json"
                    ),
                    JSON.stringify([{"namespace": ["ns1"]}])
                );
                const service = new S3TablesCacheService(tmpDir);
                expect(await service.getNamespaces("arn:tb:1")).toEqual([{"namespace": ["ns1"]}]);

            }
        );

        it(
            "getNamespaces returns empty for missing file",
            async () => {

                const service = new S3TablesCacheService(tmpDir);
                expect(await service.getNamespaces("arn:tb:1")).toEqual([]);

            }
        );

        it(
            "getTables reads s3tables_tables.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "s3tables_tables.json"
                    ),
                    JSON.stringify([{"name": "tbl1"}])
                );
                const service = new S3TablesCacheService(tmpDir);
                expect(await service.getTables("arn:tb:1")).toEqual([{"name": "tbl1"}]);

            }
        );

        it(
            "getTables returns empty for missing file",
            async () => {

                const service = new S3TablesCacheService(tmpDir);
                expect(await service.getTables("arn:tb:1")).toEqual([]);

            }
        );

    }
);

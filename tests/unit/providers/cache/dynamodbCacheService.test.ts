import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {DynamoDBCacheService} from "../../../../src/providers/cache/dynamodbCacheService.js";

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
    "DynamoDBCacheService",
    () => {

        it(
            "getTables reads dynamodb_tables.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "dynamodb_tables.json"
                    ),
                    JSON.stringify([{"TableName": "table1"}])
                );
                const service = new DynamoDBCacheService(tmpDir);
                expect(await service.getTables()).toEqual([{"TableName": "table1"}]);

            }
        );

        it(
            "getTables returns empty for missing file",
            async () => {

                const service = new DynamoDBCacheService(tmpDir);
                expect(await service.getTables()).toEqual([]);

            }
        );

    }
);

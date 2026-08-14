import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {SecretsManagerCacheService} from "../../../../src/providers/cache/secretsManagerCacheService.js";

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
    "SecretsManagerCacheService",
    () => {

        it(
            "getSecrets reads secretsmanager_secrets.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "secretsmanager_secrets.json"
                    ),
                    JSON.stringify([{"Name": "my-secret"}])
                );
                const service = new SecretsManagerCacheService(tmpDir);
                expect(await service.getSecrets()).toEqual([{"Name": "my-secret"}]);

            }
        );

        it(
            "getSecrets returns empty for missing file",
            async () => {

                const service = new SecretsManagerCacheService(tmpDir);
                expect(await service.getSecrets()).toEqual([]);

            }
        );

    }
);

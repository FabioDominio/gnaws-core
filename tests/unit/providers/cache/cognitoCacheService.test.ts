import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {CognitoCacheService} from "../../../../src/providers/cache/cognitoCacheService.js";

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
    "CognitoCacheService",
    () => {

        it(
            "getUserPools reads cognito_user_pools.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "cognito_user_pools.json"
                    ),
                    JSON.stringify([{"Id": "pool1"}])
                );
                const service = new CognitoCacheService(tmpDir);
                expect(await service.getUserPools()).toEqual([{"Id": "pool1"}]);

            }
        );

        it(
            "getUserPools returns empty for missing file",
            async () => {

                const service = new CognitoCacheService(tmpDir);
                expect(await service.getUserPools()).toEqual([]);

            }
        );

        it(
            "getIdentityProviders reads cognito_identity_providers.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "cognito_identity_providers.json"
                    ),
                    JSON.stringify([{"ProviderName": "Google"}])
                );
                const service = new CognitoCacheService(tmpDir);
                expect(await service.getIdentityProviders("pool1")).toEqual([{"ProviderName": "Google"}]);

            }
        );

        it(
            "getIdentityProviders returns empty for missing file",
            async () => {

                const service = new CognitoCacheService(tmpDir);
                expect(await service.getIdentityProviders("pool1")).toEqual([]);

            }
        );

        it(
            "getUserPoolClients reads cognito_user_pool_clients.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "cognito_user_pool_clients.json"
                    ),
                    JSON.stringify([{"ClientName": "client1"}])
                );
                const service = new CognitoCacheService(tmpDir);
                expect(await service.getUserPoolClients("pool1")).toEqual([{"ClientName": "client1"}]);

            }
        );

        it(
            "getUserPoolClients returns empty for missing file",
            async () => {

                const service = new CognitoCacheService(tmpDir);
                expect(await service.getUserPoolClients("pool1")).toEqual([]);

            }
        );

    }
);

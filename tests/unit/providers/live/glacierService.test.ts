import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    GlacierClient,
    ListVaultsCommand
} from "@aws-sdk/client-glacier";
import {GlacierService} from "../../../../src/providers/live/glacierService.js";

const glacierMock = mockClient(GlacierClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    glacierMock.reset();

});

describe(
    "GlacierService",
    () => {

        describe(
            "getVaults",
            () => {

                it(
                    "returns vaults",
                    async () => {

                        glacierMock.on(ListVaultsCommand).resolves({
                            "VaultList": [
                                {"VaultName": "vault-1",
                                    "VaultARN": "arn:aws:glacier:us-east-1:123:vaults/vault-1",
                                    "NumberOfArchives": 10},
                                {"VaultName": "vault-2",
                                    "VaultARN": "arn:aws:glacier:us-east-1:123:vaults/vault-2",
                                    "NumberOfArchives": 5}
                            ]
                        });

                        const service = new GlacierService(
                            creds,
                            "us-east-1"
                        );
                        const vaults = await service.getVaults();

                        expect(vaults).toHaveLength(2);
                        expect(vaults[0].VaultName).toBe("vault-1");

                    }
                );

                it(
                    "aggregates vaults across pages",
                    async () => {

                        glacierMock.on(ListVaultsCommand).
                            resolvesOnce({"VaultList": [{"VaultName": "v1"}],
                                "Marker": "tok"}).
                            resolvesOnce({"VaultList": [{"VaultName": "v2"}]});

                        const service = new GlacierService(
                            creds,
                            "us-east-1"
                        );
                        const vaults = await service.getVaults();

                        expect(vaults).toHaveLength(2);

                    }
                );

                it(
                    "returns empty when no vaults",
                    async () => {

                        glacierMock.on(ListVaultsCommand).resolves({});

                        const service = new GlacierService(
                            creds,
                            "us-east-1"
                        );
                        const vaults = await service.getVaults();

                        expect(vaults).toHaveLength(0);

                    }
                );

            }
        );

    }
);

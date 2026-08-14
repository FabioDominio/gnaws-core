import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    SecretsManagerClient,
    ListSecretsCommand
} from "@aws-sdk/client-secrets-manager";
import {SecretsManagerService} from "../../../../src/providers/live/secretsManagerService.js";

const smMock = mockClient(SecretsManagerClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    smMock.reset();

});

describe(
    "SecretsManagerService",
    () => {

        describe(
            "getSecrets",
            () => {

                it(
                    "returns secrets from single page",
                    async () => {

                        smMock.on(ListSecretsCommand).resolves({
                            "SecretList": [
                                {"Name": "secret-1",
                                    "ARN": "arn:aws:secretsmanager:us-east-1:123:secret:secret-1"},
                                {"Name": "secret-2",
                                    "ARN": "arn:aws:secretsmanager:us-east-1:123:secret:secret-2"}
                            ]
                        });

                        const service = new SecretsManagerService(
                            creds,
                            "us-east-1"
                        );
                        const secrets = await service.getSecrets();

                        expect(secrets).toHaveLength(2);
                        expect(secrets[0].Name).toBe("secret-1");

                    }
                );

                it(
                    "aggregates secrets across multiple pages",
                    async () => {

                        smMock.on(ListSecretsCommand).
                            resolvesOnce({"SecretList": [{"Name": "s1"}],
                                "NextToken": "tok"}).
                            resolvesOnce({"SecretList": [{"Name": "s2"}]});

                        const service = new SecretsManagerService(
                            creds,
                            "us-east-1"
                        );
                        const secrets = await service.getSecrets();

                        expect(secrets).toHaveLength(2);

                    }
                );

                it(
                    "returns empty array when no secrets",
                    async () => {

                        smMock.on(ListSecretsCommand).resolves({});

                        const service = new SecretsManagerService(
                            creds,
                            "us-east-1"
                        );
                        const secrets = await service.getSecrets();

                        expect(secrets).toHaveLength(0);

                    }
                );

            }
        );

    }
);

import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type SecretListEntry,
    SecretsManagerClient,
    type SecretsManagerClientConfig,
    paginateListSecrets
} from "@aws-sdk/client-secrets-manager";
import type {SecretsManager} from "../../interfaces/secretsmanager.js";

export class SecretsManagerService implements SecretsManager {

    #client: SecretsManagerClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: SecretsManagerClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new SecretsManagerClient(config);

    }

    async getSecrets (): Promise<SecretListEntry[]> {

        const client = this.#client;
        const secrets: SecretListEntry[] = [];
        for await (const page of paginateListSecrets(
            {client},
            {}
        )) {

            if (page.SecretList !== undefined) {

                secrets.push(...page.SecretList);

            }

        }
        return secrets;

    }

}

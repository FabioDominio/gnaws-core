import type {SecretListEntry} from "@aws-sdk/client-secrets-manager";

export interface SecretsManager {
    getSecrets (): Promise<SecretListEntry[]>;
}

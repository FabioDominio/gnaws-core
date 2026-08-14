import type {SecretListEntry} from "@aws-sdk/client-secrets-manager";
import type {SecretsManager} from "../../interfaces/secretsmanager.js";
import {readCacheFile} from "./cacheReader.js";

export class SecretsManagerCacheService implements SecretsManager {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getSecrets (): Promise<SecretListEntry[]> {

        return readCacheFile(
            this.#cacheDir,
            "secretsmanager_secrets.json"
        );

    }

}

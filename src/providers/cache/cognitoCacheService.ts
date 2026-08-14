import type {ProviderDescription, UserPoolClientDescription} from "@aws-sdk/client-cognito-identity-provider";
import type {Cognito, CognitoUserPoolInfo} from "../../interfaces/cognito.js";
import {readCacheFile} from "./cacheReader.js";

export class CognitoCacheService implements Cognito {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getUserPools (): Promise<CognitoUserPoolInfo[]> {

        return readCacheFile(
            this.#cacheDir,
            "cognito_user_pools.json"
        );

    }

    async getIdentityProviders (_userPoolId: string): Promise<ProviderDescription[]> {

        return readCacheFile(
            this.#cacheDir,
            "cognito_identity_providers.json"
        );

    }

    async getUserPoolClients (_userPoolId: string): Promise<UserPoolClientDescription[]> {

        return readCacheFile(
            this.#cacheDir,
            "cognito_user_pool_clients.json"
        );

    }

}

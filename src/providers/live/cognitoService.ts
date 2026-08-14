import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type UserPoolDescriptionType,
    type ProviderDescription,
    type UserPoolClientDescription,
    CognitoIdentityProviderClient,
    type CognitoIdentityProviderClientConfig,
    paginateListUserPools,
    paginateListIdentityProviders,
    paginateListUserPoolClients,
    DescribeUserPoolCommand
} from "@aws-sdk/client-cognito-identity-provider";
import type {Cognito, CognitoUserPoolInfo} from "../../interfaces/cognito.js";

export class CognitoService implements Cognito {

    #client: CognitoIdentityProviderClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: CognitoIdentityProviderClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new CognitoIdentityProviderClient(config);

    }

    async getUserPools (): Promise<CognitoUserPoolInfo[]> {

        const client = this.#client;
        const poolSummaries: UserPoolDescriptionType[] = [];

        for await (const page of paginateListUserPools(
            {client},
            {"MaxResults": 60}
        )) {

            if (page.UserPools !== undefined) {

                poolSummaries.push(...page.UserPools);

            }

        }

        const results: CognitoUserPoolInfo[] = [];

        for (const pool of poolSummaries) {

            if (!pool.Id || !pool.Name) {

                continue;

            }

            const describeResponse = await this.#client.send(new DescribeUserPoolCommand({
                "UserPoolId": pool.Id
            }));

            const userPool = describeResponse.UserPool;

            const lambdaConfig: Record<string, string> = {};

            if (userPool?.LambdaConfig) {

                for (const [
                    key,
                    value
                ] of Object.entries(userPool.LambdaConfig)) {

                    if (typeof value === "string" && value) {

                        lambdaConfig[key] = value;

                    }

                }

            }

            results.push({
                "Id": pool.Id,
                "Name": pool.Name,
                "Arn": userPool?.Arn,
                "LambdaConfig": lambdaConfig
            });

        }

        return results;

    }

    async getIdentityProviders (userPoolId: string): Promise<ProviderDescription[]> {

        const client = this.#client;
        const results: ProviderDescription[] = [];

        for await (const page of paginateListIdentityProviders(
            {client},
            {"UserPoolId": userPoolId}
        )) {

            if (page.Providers !== undefined) {

                results.push(...page.Providers);

            }

        }

        return results;

    }

    async getUserPoolClients (userPoolId: string): Promise<UserPoolClientDescription[]> {

        const client = this.#client;
        const results: UserPoolClientDescription[] = [];

        for await (const page of paginateListUserPoolClients(
            {client},
            {"UserPoolId": userPoolId}
        )) {

            if (page.UserPoolClients !== undefined) {

                results.push(...page.UserPoolClients);

            }

        }

        return results;

    }

}

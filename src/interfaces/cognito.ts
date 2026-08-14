import type {ProviderDescription, UserPoolClientDescription} from "@aws-sdk/client-cognito-identity-provider";

export interface CognitoUserPoolInfo {
    "Id": string;
    "Name": string;
    "Arn"?: string;
    "LambdaConfig"?: Record<string, string>;
}

export interface Cognito {
    getUserPools (): Promise<CognitoUserPoolInfo[]>;
    getIdentityProviders (userPoolId: string): Promise<ProviderDescription[]>;
    getUserPoolClients (userPoolId: string): Promise<UserPoolClientDescription[]>;
}

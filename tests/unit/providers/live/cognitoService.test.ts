import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    CognitoIdentityProviderClient,
    ListUserPoolsCommand,
    DescribeUserPoolCommand,
    ListIdentityProvidersCommand,
    ListUserPoolClientsCommand
} from "@aws-sdk/client-cognito-identity-provider";
import {CognitoService} from "../../../../src/providers/live/cognitoService.js";

const cognitoMock = mockClient(CognitoIdentityProviderClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    cognitoMock.reset();

});

describe(
    "CognitoService",
    () => {

        describe(
            "getUserPools",
            () => {

                it(
                    "returns user pools with details",
                    async () => {

                        cognitoMock.on(ListUserPoolsCommand).resolves({
                            "UserPools": [
                                {"Id": "us-east-1_abc",
                                    "Name": "my-pool"}
                            ]
                        });
                        cognitoMock.on(DescribeUserPoolCommand).resolves({
                            "UserPool": {
                                "Id": "us-east-1_abc",
                                "Name": "my-pool",
                                "Arn": "arn:aws:cognito-idp:us-east-1:123:userpool/us-east-1_abc",
                                "LambdaConfig": {
                                    "PreSignUp": "arn:aws:lambda:us-east-1:123:function:pre-signup"
                                }
                            }
                        });

                        const service = new CognitoService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getUserPools();

                        expect(result).toHaveLength(1);
                        expect(result[0].Name).toBe("my-pool");
                        expect(result[0].Arn).toContain("cognito-idp");
                        expect(result[0].LambdaConfig).toHaveProperty("PreSignUp");

                    }
                );

                it(
                    "returns empty array when no pools",
                    async () => {

                        cognitoMock.on(ListUserPoolsCommand).resolves({});

                        const service = new CognitoService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getUserPools();

                        expect(result).toHaveLength(0);

                    }
                );

                it(
                    "skips pools missing Id or Name",
                    async () => {

                        cognitoMock.on(ListUserPoolsCommand).resolves({
                            "UserPools": [
                                {"Id": "us-east-1_abc",
                                    "Name": "valid-pool"},
                                {"Name": "no-id"},
                                {"Id": "us-east-1_xyz"}
                            ]
                        });
                        cognitoMock.on(DescribeUserPoolCommand).resolves({
                            "UserPool": {
                                "Id": "us-east-1_abc",
                                "Name": "valid-pool",
                                "Arn": "arn:aws:cognito-idp:us-east-1:123:userpool/us-east-1_abc",
                                "LambdaConfig": {}
                            }
                        });

                        const service = new CognitoService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getUserPools();

                        expect(result).toHaveLength(1);
                        expect(result[0].Name).toBe("valid-pool");

                    }
                );

            }
        );

        describe(
            "getIdentityProviders",
            () => {

                it(
                    "returns identity providers for pool",
                    async () => {

                        cognitoMock.on(ListIdentityProvidersCommand).resolves({
                            "Providers": [
                                {"ProviderName": "Google",
                                    "ProviderType": "Google"}
                            ]
                        });

                        const service = new CognitoService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getIdentityProviders("us-east-1_abc");

                        expect(result).toHaveLength(1);
                        expect(result[0].ProviderName).toBe("Google");

                    }
                );

                it(
                    "aggregates across pages",
                    async () => {

                        cognitoMock.on(ListIdentityProvidersCommand).
                            resolvesOnce({"Providers": [
                                {"ProviderName": "Google",
                                    "ProviderType": "Google"}
                            ],
                            "NextToken": "tok"}).
                            resolvesOnce({"Providers": [
                                {"ProviderName": "Facebook",
                                    "ProviderType": "Facebook"}
                            ]});

                        const service = new CognitoService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getIdentityProviders("us-east-1_abc");

                        expect(result).toHaveLength(2);

                    }
                );

                it(
                    "returns empty array when no providers",
                    async () => {

                        cognitoMock.on(ListIdentityProvidersCommand).resolves({});

                        const service = new CognitoService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getIdentityProviders("us-east-1_abc");

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getUserPoolClients",
            () => {

                it(
                    "returns user pool clients",
                    async () => {

                        cognitoMock.on(ListUserPoolClientsCommand).resolves({
                            "UserPoolClients": [
                                {"ClientId": "client-1",
                                    "ClientName": "web-app",
                                    "UserPoolId": "us-east-1_abc"}
                            ]
                        });

                        const service = new CognitoService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getUserPoolClients("us-east-1_abc");

                        expect(result).toHaveLength(1);
                        expect(result[0].ClientName).toBe("web-app");

                    }
                );

                it(
                    "aggregates across pages",
                    async () => {

                        cognitoMock.on(ListUserPoolClientsCommand).
                            resolvesOnce({"UserPoolClients": [
                                {"ClientId": "c1",
                                    "ClientName": "app1"}
                            ],
                            "NextToken": "tok"}).
                            resolvesOnce({"UserPoolClients": [
                                {"ClientId": "c2",
                                    "ClientName": "app2"}
                            ]});

                        const service = new CognitoService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getUserPoolClients("us-east-1_abc");

                        expect(result).toHaveLength(2);

                    }
                );

                it(
                    "returns empty array when no clients",
                    async () => {

                        cognitoMock.on(ListUserPoolClientsCommand).resolves({});

                        const service = new CognitoService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getUserPoolClients("us-east-1_abc");

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

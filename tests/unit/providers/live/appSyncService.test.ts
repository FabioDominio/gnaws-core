import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {AppSyncClient, ListGraphqlApisCommand, ListDataSourcesCommand} from "@aws-sdk/client-appsync";
import {AppSyncService} from "../../../../src/providers/live/appSyncService.js";

const appSyncMock = mockClient(AppSyncClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    appSyncMock.reset();

});

describe(
    "AppSyncService",
    () => {

        describe(
            "getGraphqlApis",
            () => {

                it(
                    "returns graphql APIs",
                    async () => {

                        appSyncMock.on(ListGraphqlApisCommand).resolves({
                            "graphqlApis": [
                                {"apiId": "api-1",
                                    "name": "MyApi"},
                                {"apiId": "api-2",
                                    "name": "OtherApi"}
                            ]
                        });

                        const service = new AppSyncService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getGraphqlApis();

                        expect(result).toHaveLength(2);
                        expect(result[0].name).toBe("MyApi");

                    }
                );

                it(
                    "returns empty when no APIs",
                    async () => {

                        appSyncMock.on(ListGraphqlApisCommand).resolves({});

                        const service = new AppSyncService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getGraphqlApis();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getDataSources",
            () => {

                it(
                    "returns data sources for an API",
                    async () => {

                        appSyncMock.on(ListDataSourcesCommand).resolves({
                            "dataSources": [
                                {"dataSourceArn": "arn:aws:appsync:us-east-1:123:apis/api-1/datasources/ds-1",
                                    "name": "ds-1",
                                    "type": "AMAZON_DYNAMODB"},
                                {"dataSourceArn": "arn:aws:appsync:us-east-1:123:apis/api-1/datasources/ds-2",
                                    "name": "ds-2",
                                    "type": "AWS_LAMBDA"}
                            ]
                        });

                        const service = new AppSyncService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getDataSources("api-1");

                        expect(result).toHaveLength(2);
                        expect(result[0].name).toBe("ds-1");
                        expect(result[0].type).toBe("AMAZON_DYNAMODB");

                    }
                );

                it(
                    "returns empty when no data sources",
                    async () => {

                        appSyncMock.on(ListDataSourcesCommand).resolves({});

                        const service = new AppSyncService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getDataSources("api-1");

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

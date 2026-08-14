import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type GraphqlApi,
    type DataSource,
    AppSyncClient,
    type AppSyncClientConfig,
    paginateListGraphqlApis,
    paginateListDataSources
} from "@aws-sdk/client-appsync";
import type {AppSync} from "../../interfaces/appsync.js";

export class AppSyncService implements AppSync {

    #client: AppSyncClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: AppSyncClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new AppSyncClient(config);

    }

    async getGraphqlApis (): Promise<GraphqlApi[]> {

        const client = this.#client;
        const items: GraphqlApi[] = [];
        for await (const page of paginateListGraphqlApis(
            {client},
            {}
        )) {

            if (page.graphqlApis !== undefined) {

                items.push(...page.graphqlApis);

            }

        }
        return items;

    }

    async getDataSources (apiId: string): Promise<DataSource[]> {

        const client = this.#client;
        const items: DataSource[] = [];
        for await (const page of paginateListDataSources(
            {client},
            {"apiId": apiId}
        )) {

            if (page.dataSources !== undefined) {

                items.push(...page.dataSources);

            }

        }
        return items;

    }

}

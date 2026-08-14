import type {GraphqlApi, DataSource} from "@aws-sdk/client-appsync";

export interface AppSync {
    getGraphqlApis (): Promise<GraphqlApi[]>;
    getDataSources (apiId: string): Promise<DataSource[]>;
}

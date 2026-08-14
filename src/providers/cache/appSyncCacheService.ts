import type {GraphqlApi, DataSource} from "@aws-sdk/client-appsync";
import type {AppSync} from "../../interfaces/appsync.js";
import {readCacheFile} from "./cacheReader.js";

export class AppSyncCacheService implements AppSync {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getGraphqlApis (): Promise<GraphqlApi[]> {

        return readCacheFile(
            this.#cacheDir,
            "appsync_apis.json"
        );

    }

    async getDataSources (_apiId: string): Promise<DataSource[]> {

        return readCacheFile(
            this.#cacheDir,
            "appsync_data_sources.json"
        );

    }

}

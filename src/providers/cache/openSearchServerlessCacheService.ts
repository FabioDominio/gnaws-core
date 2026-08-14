import type {CollectionSummary, VpcEndpointSummary} from "@aws-sdk/client-opensearchserverless";
import type {OpenSearchServerless} from "../../interfaces/opensearchserverless.js";
import {readCacheFile} from "./cacheReader.js";

export class OpenSearchServerlessCacheService implements OpenSearchServerless {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getCollections (): Promise<CollectionSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "opensearchserverless_collections.json"
        );

    }

    async getVpcEndpoints (): Promise<VpcEndpointSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "opensearchserverless_vpc_endpoints.json"
        );

    }

}

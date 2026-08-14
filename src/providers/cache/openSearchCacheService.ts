import type {DomainStatus} from "@aws-sdk/client-opensearch";
import type {OpenSearch} from "../../interfaces/opensearch.js";
import {readCacheFile} from "./cacheReader.js";

export class OpenSearchCacheService implements OpenSearch {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getDomains (): Promise<DomainStatus[]> {

        return readCacheFile(
            this.#cacheDir,
            "opensearch_domains.json"
        );

    }

}

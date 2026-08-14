import type {WorkGroup, DataCatalogSummary} from "@aws-sdk/client-athena";
import type {Athena} from "../../interfaces/athena.js";
import {readCacheFile} from "./cacheReader.js";

export class AthenaCacheService implements Athena {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getWorkGroups (): Promise<WorkGroup[]> {

        return readCacheFile(
            this.#cacheDir,
            "athena_workgroups.json"
        );

    }

    async getDataCatalogs (): Promise<DataCatalogSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "athena_data_catalogs.json"
        );

    }

}

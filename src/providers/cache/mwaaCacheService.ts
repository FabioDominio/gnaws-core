import type {Environment} from "@aws-sdk/client-mwaa";
import type {Mwaa} from "../../interfaces/mwaa.js";
import {readCacheFile} from "./cacheReader.js";

export class MwaaCacheService implements Mwaa {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getEnvironments (): Promise<Environment[]> {

        return readCacheFile(
            this.#cacheDir,
            "mwaa_environments.json"
        );

    }

}

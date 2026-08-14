import type {Repository} from "@aws-sdk/client-ecr";
import type {Ecr} from "../../interfaces/ecr.js";
import {readCacheFile} from "./cacheReader.js";

export class EcrCacheService implements Ecr {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getRepositories (): Promise<Repository[]> {

        return readCacheFile(
            this.#cacheDir,
            "ecr_repositories.json"
        );

    }

}

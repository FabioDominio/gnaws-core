import type {Pipe} from "@aws-sdk/client-pipes";
import type {Pipes} from "../../interfaces/pipes.js";
import {readCacheFile} from "./cacheReader.js";

export class PipesCacheService implements Pipes {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getPipes (): Promise<Pipe[]> {

        return readCacheFile(
            this.#cacheDir,
            "pipes_pipes.json"
        );

    }

}

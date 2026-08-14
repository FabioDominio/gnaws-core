import type {Outpost, Site} from "@aws-sdk/client-outposts";
import type {Outposts} from "../../interfaces/outposts.js";
import {readCacheFile} from "./cacheReader.js";

export class OutpostsCacheService implements Outposts {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getOutposts (): Promise<Outpost[]> {

        return readCacheFile(
            this.#cacheDir,
            "outposts_outposts.json"
        );

    }

    async getSites (): Promise<Site[]> {

        return readCacheFile(
            this.#cacheDir,
            "outposts_sites.json"
        );

    }

}

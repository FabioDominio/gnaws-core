import type {Region} from "@aws-sdk/client-account";
import type {Account} from "../../interfaces/account.js";
import {listCacheRegions} from "./cacheReader.js";

export class AccountCacheService implements Account {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getRegions (): Promise<Region[]> {

        /*
         * Derive available regions from subdirectories in the cache root
         * (one level up from "global/" since this service gets the global path)
         */
        const rootDir = this.#cacheDir.replace(
            /\/global$/,
            ""
        );
        const regionNames = listCacheRegions(rootDir);

        return regionNames.map((name) => ({
            "RegionName": name,
            "RegionOptStatus": "ENABLED" as const
        }));

    }

}

import type {DescribeVaultOutput} from "@aws-sdk/client-glacier";
import type {Glacier} from "../../interfaces/glacier.js";
import {readCacheFile} from "./cacheReader.js";

export class GlacierCacheService implements Glacier {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getVaults (): Promise<DescribeVaultOutput[]> {

        return readCacheFile(
            this.#cacheDir,
            "glacier_vaults.json"
        );

    }

}

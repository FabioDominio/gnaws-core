import type {ClusterInfo} from "@aws-sdk/client-kafka";
import type {Msk} from "../../interfaces/msk.js";
import {readCacheFile} from "./cacheReader.js";

export class MskCacheService implements Msk {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getClusters (): Promise<ClusterInfo[]> {

        return readCacheFile(
            this.#cacheDir,
            "msk_clusters.json"
        );

    }

}

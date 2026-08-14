import type {Cluster} from "@aws-sdk/client-cloudhsm-v2";
import type {CloudHsm} from "../../interfaces/cloudhsm.js";
import {readCacheFile} from "./cacheReader.js";

export class CloudHsmCacheService implements CloudHsm {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getClusters (): Promise<Cluster[]> {

        return readCacheFile(
            this.#cacheDir,
            "cloudhsm_clusters.json"
        );

    }

}

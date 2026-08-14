import type {CloudTrail, CloudTrailTrailInfo} from "../../interfaces/cloudtrail.js";
import {readCacheFile} from "./cacheReader.js";

export class CloudTrailCacheService implements CloudTrail {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getTrails (): Promise<CloudTrailTrailInfo[]> {

        return readCacheFile(
            this.#cacheDir,
            "cloudtrail_trails.json"
        );

    }

}

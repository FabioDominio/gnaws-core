import type {AccessPoint} from "@aws-sdk/client-s3-control";
import type {S3Control} from "../../interfaces/s3control.js";
import {readCacheFile} from "./cacheReader.js";

export class S3ControlCacheService implements S3Control {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getAccessPoints (): Promise<AccessPoint[]> {

        return readCacheFile(
            this.#cacheDir,
            "s3control_access_points.json"
        );

    }

}

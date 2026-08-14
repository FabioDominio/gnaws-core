import type {ApplicationSummary} from "@aws-sdk/client-emr-serverless";
import type {EmrServerless} from "../../interfaces/emrserverless.js";
import {readCacheFile} from "./cacheReader.js";

export class EmrServerlessCacheService implements EmrServerless {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getApplications (): Promise<ApplicationSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "emr_serverless_applications.json"
        );

    }

}

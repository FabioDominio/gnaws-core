import type {Flow} from "@aws-sdk/client-mediaconnect";
import type {MediaConnect} from "../../interfaces/mediaconnect.js";
import {readCacheFile} from "./cacheReader.js";

export class MediaConnectCacheService implements MediaConnect {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getFlows (): Promise<Flow[]> {

        return readCacheFile(
            this.#cacheDir,
            "mediaconnect_flows.json"
        );

    }

}

import type {StreamSummary} from "@aws-sdk/client-kinesis";
import type {Kinesis} from "../../interfaces/kinesis.js";
import {readCacheFile} from "./cacheReader.js";

export class KinesisCacheService implements Kinesis {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getStreams (): Promise<StreamSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "kinesis_streams.json"
        );

    }

}

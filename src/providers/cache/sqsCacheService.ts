import type {QueueInfo, Sqs} from "../../interfaces/sqs.js";
import {readCacheFile} from "./cacheReader.js";

export class SqsCacheService implements Sqs {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getQueues (): Promise<QueueInfo[]> {

        return readCacheFile(
            this.#cacheDir,
            "sqs_queues.json"
        );

    }

    async getDeadLetterSourceQueues (_queueUrl: string): Promise<string[]> {

        return readCacheFile(
            this.#cacheDir,
            "sqs_dlq_sources.json"
        );

    }

}

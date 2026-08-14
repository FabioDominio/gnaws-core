import type {BrokerSummary, Configuration} from "@aws-sdk/client-mq";
import type {Mq} from "../../interfaces/mq.js";
import {readCacheFile} from "./cacheReader.js";

export class MqCacheService implements Mq {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getBrokers (): Promise<BrokerSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "mq_brokers.json"
        );

    }

    async getConfigurations (): Promise<Configuration[]> {

        return readCacheFile(
            this.#cacheDir,
            "mq_configurations.json"
        );

    }

}

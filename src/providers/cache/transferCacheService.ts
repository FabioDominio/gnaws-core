import type {DescribedServer} from "@aws-sdk/client-transfer";
import type {Transfer} from "../../interfaces/transfer.js";
import {readCacheFile} from "./cacheReader.js";

export class TransferCacheService implements Transfer {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getServers (): Promise<DescribedServer[]> {

        return readCacheFile(
            this.#cacheDir,
            "transfer_servers.json"
        );

    }

}

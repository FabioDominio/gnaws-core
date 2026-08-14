import type {Sfn, StateMachineInfo} from "../../interfaces/sfn.js";
import {readCacheFile} from "./cacheReader.js";

export class SfnCacheService implements Sfn {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getStateMachines (): Promise<StateMachineInfo[]> {

        return readCacheFile(
            this.#cacheDir,
            "sfn_state_machines.json"
        );

    }

}

import type {EventBus} from "@aws-sdk/client-eventbridge";
import type {EventBridge, RuleWithTargets} from "../../interfaces/eventbridge.js";
import {readCacheFile} from "./cacheReader.js";

export class EventBridgeCacheService implements EventBridge {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getEventBuses (): Promise<EventBus[]> {

        return readCacheFile(
            this.#cacheDir,
            "eventbridge_buses.json"
        );

    }

    async getRulesWithTargets (_eventBusName: string): Promise<RuleWithTargets[]> {

        return [];

    }

}

import type {AgentListEntry, LocationListEntry, DescribeTaskResponse} from "@aws-sdk/client-datasync";
import type {DataSync} from "../../interfaces/datasync.js";
import {readCacheFile} from "./cacheReader.js";

export class DataSyncCacheService implements DataSync {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getAgents (): Promise<AgentListEntry[]> {

        return readCacheFile(
            this.#cacheDir,
            "datasync_agents.json"
        );

    }

    async getLocations (): Promise<LocationListEntry[]> {

        return readCacheFile(
            this.#cacheDir,
            "datasync_locations.json"
        );

    }

    async getTasks (): Promise<DescribeTaskResponse[]> {

        return readCacheFile(
            this.#cacheDir,
            "datasync_tasks.json"
        );

    }

}

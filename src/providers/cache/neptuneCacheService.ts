import type {DBCluster, DBInstance, DBSubnetGroup} from "@aws-sdk/client-neptune";
import type {Neptune} from "../../interfaces/neptune.js";
import {readCacheFile} from "./cacheReader.js";

export class NeptuneCacheService implements Neptune {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getDBClusters (): Promise<DBCluster[]> {

        return readCacheFile(
            this.#cacheDir,
            "neptune_clusters.json"
        );

    }

    async getDBInstances (): Promise<DBInstance[]> {

        return readCacheFile(
            this.#cacheDir,
            "neptune_instances.json"
        );

    }

    async getDBSubnetGroups (): Promise<DBSubnetGroup[]> {

        return readCacheFile(
            this.#cacheDir,
            "neptune_subnet_groups.json"
        );

    }

}

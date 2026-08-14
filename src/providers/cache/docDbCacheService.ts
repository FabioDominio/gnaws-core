import type {DBCluster, DBInstance, DBSubnetGroup} from "@aws-sdk/client-docdb";
import type {DocDb} from "../../interfaces/docdb.js";
import {readCacheFile} from "./cacheReader.js";

export class DocDbCacheService implements DocDb {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getDBClusters (): Promise<DBCluster[]> {

        return readCacheFile(
            this.#cacheDir,
            "docdb_clusters.json"
        );

    }

    async getDBInstances (): Promise<DBInstance[]> {

        return readCacheFile(
            this.#cacheDir,
            "docdb_instances.json"
        );

    }

    async getDBSubnetGroups (): Promise<DBSubnetGroup[]> {

        return readCacheFile(
            this.#cacheDir,
            "docdb_subnet_groups.json"
        );

    }

}

import type {Cluster, SubnetGroup, ACL, User} from "@aws-sdk/client-memorydb";
import type {MemoryDb} from "../../interfaces/memorydb.js";
import {readCacheFile} from "./cacheReader.js";

export class MemoryDbCacheService implements MemoryDb {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getClusters (): Promise<Cluster[]> {

        return readCacheFile(
            this.#cacheDir,
            "memorydb_clusters.json"
        );

    }

    async getSubnetGroups (): Promise<SubnetGroup[]> {

        return readCacheFile(
            this.#cacheDir,
            "memorydb_subnet_groups.json"
        );

    }

    async getACLs (): Promise<ACL[]> {

        return readCacheFile(
            this.#cacheDir,
            "memorydb_acls.json"
        );

    }

    async getUsers (): Promise<User[]> {

        return readCacheFile(
            this.#cacheDir,
            "memorydb_users.json"
        );

    }

}

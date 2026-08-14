import type {ReplicationInstance, ReplicationSubnetGroup, Endpoint, ReplicationTask, Connection} from "@aws-sdk/client-database-migration-service";
import type {Dms} from "../../interfaces/dms.js";
import {readCacheFile} from "./cacheReader.js";

export class DmsCacheService implements Dms {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getReplicationInstances (): Promise<ReplicationInstance[]> {

        return readCacheFile(
            this.#cacheDir,
            "dms_replication_instances.json"
        );

    }

    async getReplicationSubnetGroups (): Promise<ReplicationSubnetGroup[]> {

        return readCacheFile(
            this.#cacheDir,
            "dms_replication_subnet_groups.json"
        );

    }

    async getEndpoints (): Promise<Endpoint[]> {

        return readCacheFile(
            this.#cacheDir,
            "dms_endpoints.json"
        );

    }

    async getReplicationTasks (): Promise<ReplicationTask[]> {

        return readCacheFile(
            this.#cacheDir,
            "dms_replication_tasks.json"
        );

    }

    async getConnections (): Promise<Connection[]> {

        return readCacheFile(
            this.#cacheDir,
            "dms_connections.json"
        );

    }

}

import type {DBInstance, DBCluster, DBProxy, DBSubnetGroup, DBProxyTargetGroup} from "@aws-sdk/client-rds";
import type {Rds} from "../../interfaces/rds.js";
import {readCacheFile} from "./cacheReader.js";

export class RdsCacheService implements Rds {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getDBInstances (): Promise<DBInstance[]> {

        return readCacheFile(
            this.#cacheDir,
            "rds_instances.json"
        );

    }

    async getDBClusters (): Promise<DBCluster[]> {

        return readCacheFile(
            this.#cacheDir,
            "rds_clusters.json"
        );

    }

    async getDBProxies (): Promise<DBProxy[]> {

        return readCacheFile(
            this.#cacheDir,
            "rds_proxies.json"
        );

    }

    async getDBSubnetGroups (): Promise<DBSubnetGroup[]> {

        return readCacheFile(
            this.#cacheDir,
            "rds_subnet_groups.json"
        );

    }

    async getDBProxyTargetGroups (_dbProxyName: string): Promise<DBProxyTargetGroup[]> {

        return readCacheFile(
            this.#cacheDir,
            "rds_proxy_target_groups.json"
        );

    }

}

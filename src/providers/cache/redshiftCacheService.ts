import type {Cluster, ClusterSubnetGroup} from "@aws-sdk/client-redshift";
import type {Redshift} from "../../interfaces/redshift.js";
import {readCacheFile} from "./cacheReader.js";

export class RedshiftCacheService implements Redshift {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getClusters (): Promise<Cluster[]> {

        return readCacheFile(
            this.#cacheDir,
            "redshift_clusters.json"
        );

    }

    async getClusterSubnetGroups (): Promise<ClusterSubnetGroup[]> {

        return readCacheFile(
            this.#cacheDir,
            "redshift_subnet_groups.json"
        );

    }

}

import type {ClusterSummary, InstanceFleet, InstanceGroup, SecurityConfigurationSummary} from "@aws-sdk/client-emr";
import type {Emr} from "../../interfaces/emr.js";
import {readCacheFile} from "./cacheReader.js";

export class EmrCacheService implements Emr {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getClusters (): Promise<ClusterSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "emr_clusters.json"
        );

    }

    async getInstanceFleets (_clusterId: string): Promise<InstanceFleet[]> {

        return readCacheFile(
            this.#cacheDir,
            "emr_instance_fleets.json"
        );

    }

    async getInstanceGroups (_clusterId: string): Promise<InstanceGroup[]> {

        return readCacheFile(
            this.#cacheDir,
            "emr_instance_groups.json"
        );

    }

    async getSecurityConfigurations (): Promise<SecurityConfigurationSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "emr_security_configurations.json"
        );

    }

}

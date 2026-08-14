import type {Cluster, Nodegroup, FargateProfile, Addon, AccessEntry, AssociatedAccessPolicy} from "@aws-sdk/client-eks";
import type {Eks, PodIdentityInfo} from "../../interfaces/eks.js";
import {readCacheFile} from "./cacheReader.js";

export class EksCacheService implements Eks {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getClusters (): Promise<Cluster[]> {

        return readCacheFile(
            this.#cacheDir,
            "eks_clusters.json"
        );

    }

    async getNodegroups (_clusterName: string): Promise<Nodegroup[]> {

        return readCacheFile(
            this.#cacheDir,
            "eks_nodegroups.json"
        );

    }

    async getFargateProfiles (_clusterName: string): Promise<FargateProfile[]> {

        return readCacheFile(
            this.#cacheDir,
            "eks_fargate_profiles.json"
        );

    }

    async getPodIdentityAssociations (_clusterName: string): Promise<PodIdentityInfo[]> {

        return readCacheFile(
            this.#cacheDir,
            "eks_pod_identity_associations.json"
        );

    }

    async getAddons (_clusterName: string): Promise<Addon[]> {

        return readCacheFile(
            this.#cacheDir,
            "eks_addons.json"
        );

    }

    async getAccessEntries (_clusterName: string): Promise<AccessEntry[]> {

        return readCacheFile(
            this.#cacheDir,
            "eks_access_entries.json"
        );

    }

    async getAssociatedAccessPolicies (_clusterName: string, _principalArn: string): Promise<AssociatedAccessPolicy[]> {

        return [];

    }

}

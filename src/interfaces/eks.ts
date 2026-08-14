import type {Cluster, Nodegroup, FargateProfile, Addon, AccessEntry, AssociatedAccessPolicy} from "@aws-sdk/client-eks";

export interface PodIdentityInfo {
    "associationArn": string;
    "clusterName": string;
    "namespace": string;
    "serviceAccount": string;
    "roleArn"?: string;
}

export interface Eks {
    getClusters (): Promise<Cluster[]>;
    getNodegroups (clusterName: string): Promise<Nodegroup[]>;
    getFargateProfiles (clusterName: string): Promise<FargateProfile[]>;
    getPodIdentityAssociations (clusterName: string): Promise<PodIdentityInfo[]>;
    getAddons (clusterName: string): Promise<Addon[]>;
    getAccessEntries (clusterName: string): Promise<AccessEntry[]>;
    getAssociatedAccessPolicies (clusterName: string, principalArn: string): Promise<AssociatedAccessPolicy[]>;
}

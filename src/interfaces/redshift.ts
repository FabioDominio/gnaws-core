import type {Cluster, ClusterSubnetGroup} from "@aws-sdk/client-redshift";

export interface Redshift {
    getClusters (): Promise<Cluster[]>;
    getClusterSubnetGroups (): Promise<ClusterSubnetGroup[]>;
}

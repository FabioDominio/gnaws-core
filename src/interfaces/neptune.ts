import type {DBCluster, DBInstance, DBSubnetGroup} from "@aws-sdk/client-neptune";

export interface Neptune {
    getDBClusters (): Promise<DBCluster[]>;
    getDBInstances (): Promise<DBInstance[]>;
    getDBSubnetGroups (): Promise<DBSubnetGroup[]>;
}

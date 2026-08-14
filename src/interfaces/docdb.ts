import type {DBCluster, DBInstance, DBSubnetGroup} from "@aws-sdk/client-docdb";

export interface DocDb {
    getDBClusters (): Promise<DBCluster[]>;
    getDBInstances (): Promise<DBInstance[]>;
    getDBSubnetGroups (): Promise<DBSubnetGroup[]>;
}

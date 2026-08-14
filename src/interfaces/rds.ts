import type {DBInstance, DBCluster, DBProxy, DBSubnetGroup, DBProxyTargetGroup} from "@aws-sdk/client-rds";

export interface Rds {
    getDBInstances (): Promise<DBInstance[]>;
    getDBClusters (): Promise<DBCluster[]>;
    getDBProxies (): Promise<DBProxy[]>;
    getDBSubnetGroups (): Promise<DBSubnetGroup[]>;
    getDBProxyTargetGroups (dbProxyName: string): Promise<DBProxyTargetGroup[]>;
}

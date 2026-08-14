import type {ReplicationInstance, ReplicationSubnetGroup, Endpoint, ReplicationTask, Connection as DmsConnection} from "@aws-sdk/client-database-migration-service";

export interface Dms {
    getReplicationInstances (): Promise<ReplicationInstance[]>;
    getReplicationSubnetGroups (): Promise<ReplicationSubnetGroup[]>;
    getEndpoints (): Promise<Endpoint[]>;
    getReplicationTasks (): Promise<ReplicationTask[]>;
    getConnections (): Promise<DmsConnection[]>;
}

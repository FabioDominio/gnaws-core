import type {Cluster, SubnetGroup, ACL, User} from "@aws-sdk/client-memorydb";

export interface MemoryDb {
    getClusters (): Promise<Cluster[]>;
    getSubnetGroups (): Promise<SubnetGroup[]>;
    getACLs (): Promise<ACL[]>;
    getUsers (): Promise<User[]>;
}

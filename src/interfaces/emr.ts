import type {ClusterSummary, InstanceFleet, InstanceGroup, SecurityConfigurationSummary} from "@aws-sdk/client-emr";

export interface Emr {
    getClusters (): Promise<ClusterSummary[]>;
    getInstanceFleets (clusterId: string): Promise<InstanceFleet[]>;
    getInstanceGroups (clusterId: string): Promise<InstanceGroup[]>;
    getSecurityConfigurations (): Promise<SecurityConfigurationSummary[]>;
}

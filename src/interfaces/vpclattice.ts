import type {ServiceNetworkSummary, ServiceSummary, TargetGroupSummary, ServiceNetworkVpcAssociationSummary, ServiceNetworkServiceAssociationSummary} from "@aws-sdk/client-vpc-lattice";

export interface VpcLattice {
    getServiceNetworks (): Promise<ServiceNetworkSummary[]>;
    getServices (): Promise<ServiceSummary[]>;
    getTargetGroups (): Promise<TargetGroupSummary[]>;
    getServiceNetworkVpcAssociations (serviceNetworkIdentifier: string): Promise<ServiceNetworkVpcAssociationSummary[]>;
    getServiceNetworkServiceAssociations (serviceNetworkIdentifier: string): Promise<ServiceNetworkServiceAssociationSummary[]>;
}

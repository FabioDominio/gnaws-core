import type {Region, Vpc, Subnet, SecurityGroup, InternetGateway, NatGateway, EgressOnlyInternetGateway, NetworkInterface, RouteTable, Volume, Instance, VpcEndpoint, Address, Image, Snapshot, KeyPairInfo, NetworkAcl, FlowLog, DhcpOptions, ManagedPrefixList, VpcPeeringConnection, LaunchTemplate, TransitGateway, TransitGatewayAttachment, TransitGatewayConnect, TransitGatewayConnectPeer, TransitGatewayPeeringAttachment, TransitGatewayRouteTable, TransitGatewayVpcAttachment, SecurityGroupRule, LocalGateway, LocalGatewayRouteTable, LocalGatewayRouteTableVpcAssociation, LocalGatewayVirtualInterface, LocalGatewayVirtualInterfaceGroup, StaleSecurityGroup, Ec2InstanceConnectEndpoint, ImageRecycleBinInfo, SnapshotRecycleBinInfo, FleetData, TrafficMirrorSession, TrafficMirrorTarget, TrafficMirrorFilter, ClientVpnEndpoint, VerifiedAccessInstance, VerifiedAccessGroup, VerifiedAccessEndpoint, VerifiedAccessTrustProvider, ServiceConfiguration} from "@aws-sdk/client-ec2";
import type {Ec2} from "../../interfaces/ec2.js";
import {readCacheFile} from "./cacheReader.js";

export class Ec2CacheService implements Ec2 {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getEnabledRegions (): Promise<Region[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_regions.json"
        );

    }

    async getVpcs (): Promise<Vpc[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_vpcs.json"
        );

    }

    async getSubnets (): Promise<Subnet[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_subnets.json"
        );

    }

    async getSecurityGroups (): Promise<SecurityGroup[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_security_groups.json"
        );

    }

    async getInternetGateways (): Promise<InternetGateway[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_internet_gateways.json"
        );

    }

    async getNatGateways (): Promise<NatGateway[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_nat_gateways.json"
        );

    }

    async getEgressOnlyInternetGateways (): Promise<EgressOnlyInternetGateway[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_egress_only_internet_gateways.json"
        );

    }

    async getNetworkInterfaces (): Promise<NetworkInterface[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_network_interfaces.json"
        );

    }

    async getRouteTables (): Promise<RouteTable[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_route_tables.json"
        );

    }

    async getVolumes (): Promise<Volume[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_volumes.json"
        );

    }

    async getInstances (): Promise<Instance[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_instances.json"
        );

    }

    async getVpcEndpoints (): Promise<VpcEndpoint[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_vpc_endpoints.json"
        );

    }

    async getAddresses (): Promise<Address[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_addresses.json"
        );

    }

    async getImages (): Promise<Image[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_images.json"
        );

    }

    async getSnapshots (): Promise<Snapshot[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_snapshots.json"
        );

    }

    async getKeyPairs (): Promise<KeyPairInfo[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_key_pairs.json"
        );

    }

    async getNetworkAcls (): Promise<NetworkAcl[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_network_acls.json"
        );

    }

    async getFlowLogs (): Promise<FlowLog[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_flow_logs.json"
        );

    }

    async getDhcpOptions (): Promise<DhcpOptions[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_dhcp_options.json"
        );

    }

    async getManagedPrefixLists (): Promise<ManagedPrefixList[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_managed_prefix_lists.json"
        );

    }

    async getVpcPeeringConnections (): Promise<VpcPeeringConnection[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_vpc_peering_connections.json"
        );

    }

    async getLaunchTemplates (): Promise<LaunchTemplate[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_launch_templates.json"
        );

    }

    async getTransitGateways (): Promise<TransitGateway[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_transit_gateways.json"
        );

    }

    async getTransitGatewayAttachments (): Promise<TransitGatewayAttachment[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_transit_gateway_attachments.json"
        );

    }

    async getTransitGatewayRouteTables (): Promise<TransitGatewayRouteTable[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_transit_gateway_route_tables.json"
        );

    }

    async getSecurityGroupRules (): Promise<SecurityGroupRule[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_security_group_rules.json"
        );

    }

    async getLocalGateways (): Promise<LocalGateway[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_local_gateways.json"
        );

    }

    async getLocalGatewayRouteTables (): Promise<LocalGatewayRouteTable[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_local_gateway_route_tables.json"
        );

    }

    async getLocalGatewayRouteTableVpcAssociations (): Promise<LocalGatewayRouteTableVpcAssociation[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_local_gateway_route_table_vpc_associations.json"
        );

    }

    async getLocalGatewayVirtualInterfaces (): Promise<LocalGatewayVirtualInterface[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_local_gateway_virtual_interfaces.json"
        );

    }

    async getLocalGatewayVirtualInterfaceGroups (): Promise<LocalGatewayVirtualInterfaceGroup[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_local_gateway_virtual_interface_groups.json"
        );

    }

    async getStaleSecurityGroups (): Promise<StaleSecurityGroup[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_stale_security_groups.json"
        );

    }

    async getInstanceConnectEndpoints (): Promise<Ec2InstanceConnectEndpoint[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_instance_connect_endpoints.json"
        );

    }

    async getImagesInRecycleBin (): Promise<ImageRecycleBinInfo[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_images_recycle_bin.json"
        );

    }

    async getSnapshotsInRecycleBin (): Promise<SnapshotRecycleBinInfo[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_snapshots_recycle_bin.json"
        );

    }

    async getFleets (): Promise<FleetData[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_fleets.json"
        );

    }

    async getTrafficMirrorSessions (): Promise<TrafficMirrorSession[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_traffic_mirror_sessions.json"
        );

    }

    async getTrafficMirrorTargets (): Promise<TrafficMirrorTarget[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_traffic_mirror_targets.json"
        );

    }

    async getTrafficMirrorFilters (): Promise<TrafficMirrorFilter[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_traffic_mirror_filters.json"
        );

    }

    async getClientVpnEndpoints (): Promise<ClientVpnEndpoint[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_client_vpn_endpoints.json"
        );

    }

    async getTransitGatewayVpcAttachments (): Promise<TransitGatewayVpcAttachment[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_transit_gateway_vpc_attachments.json"
        );

    }

    async getTransitGatewayPeeringAttachments (): Promise<TransitGatewayPeeringAttachment[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_transit_gateway_peering_attachments.json"
        );

    }

    async getTransitGatewayConnects (): Promise<TransitGatewayConnect[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_transit_gateway_connects.json"
        );

    }

    async getTransitGatewayConnectPeers (): Promise<TransitGatewayConnectPeer[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_transit_gateway_connect_peers.json"
        );

    }

    async getVerifiedAccessInstances (): Promise<VerifiedAccessInstance[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_verified_access_instances.json"
        );

    }

    async getVerifiedAccessGroups (): Promise<VerifiedAccessGroup[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_verified_access_groups.json"
        );

    }

    async getVerifiedAccessEndpoints (): Promise<VerifiedAccessEndpoint[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_verified_access_endpoints.json"
        );

    }

    async getVerifiedAccessTrustProviders (): Promise<VerifiedAccessTrustProvider[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_verified_access_trust_providers.json"
        );

    }

    async getVpcEndpointServiceConfigurations (): Promise<ServiceConfiguration[]> {

        return readCacheFile(
            this.#cacheDir,
            "ec2_vpc_endpoint_service_configurations.json"
        );

    }

}

import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    EC2Client,
    type EC2ClientConfig,
    type Vpc,
    type Subnet,
    type InternetGateway,
    type NatGateway,
    DescribeRegionsCommand,
    type Region,
    type SecurityGroup,
    type NetworkInterface,
    type EgressOnlyInternetGateway,
    type RouteTable,
    type Volume,
    type Instance,
    type VpcEndpoint,
    type Address,
    type Image,
    type Snapshot,
    type KeyPairInfo,
    type NetworkAcl,
    type FlowLog,
    type DhcpOptions,
    type ManagedPrefixList,
    type VpcPeeringConnection,
    type LaunchTemplate,
    type TransitGateway,
    type TransitGatewayAttachment,
    type TransitGatewayRouteTable,
    type TransitGatewayVpcAttachment,
    type TransitGatewayPeeringAttachment,
    type TransitGatewayConnect,
    type TransitGatewayConnectPeer,
    type VerifiedAccessInstance,
    type VerifiedAccessGroup,
    type VerifiedAccessEndpoint,
    type VerifiedAccessTrustProvider,
    type ServiceConfiguration,
    type SecurityGroupRule,
    type LocalGateway,
    type LocalGatewayRouteTable,
    type LocalGatewayRouteTableVpcAssociation,
    type LocalGatewayVirtualInterface,
    type LocalGatewayVirtualInterfaceGroup,
    type StaleSecurityGroup,
    type Ec2InstanceConnectEndpoint,
    type ImageRecycleBinInfo,
    type SnapshotRecycleBinInfo,
    type FleetData,
    type TrafficMirrorSession,
    type TrafficMirrorTarget,
    type TrafficMirrorFilter,
    type ClientVpnEndpoint,
    DescribeAddressesCommand,
    DescribeKeyPairsCommand,
    paginateDescribeVpcs,
    paginateDescribeSubnets,
    paginateDescribeSecurityGroups,
    paginateDescribeInternetGateways,
    paginateDescribeNatGateways,
    paginateDescribeEgressOnlyInternetGateways,
    paginateDescribeNetworkInterfaces,
    paginateDescribeRouteTables,
    paginateDescribeVolumes,
    paginateDescribeInstances,
    paginateDescribeVpcEndpoints,
    paginateDescribeImages,
    paginateDescribeSnapshots,
    paginateDescribeNetworkAcls,
    paginateDescribeFlowLogs,
    paginateDescribeDhcpOptions,
    paginateDescribeManagedPrefixLists,
    paginateDescribeVpcPeeringConnections,
    paginateDescribeLaunchTemplates,
    paginateDescribeTransitGateways,
    paginateDescribeTransitGatewayAttachments,
    paginateDescribeTransitGatewayRouteTables,
    paginateDescribeTransitGatewayVpcAttachments,
    paginateDescribeTransitGatewayPeeringAttachments,
    paginateDescribeTransitGatewayConnects,
    paginateDescribeTransitGatewayConnectPeers,
    paginateDescribeVerifiedAccessInstances,
    paginateDescribeVerifiedAccessGroups,
    paginateDescribeVerifiedAccessEndpoints,
    paginateDescribeVerifiedAccessTrustProviders,
    paginateDescribeVpcEndpointServiceConfigurations,
    paginateDescribeSecurityGroupRules,
    paginateDescribeLocalGateways,
    paginateDescribeLocalGatewayRouteTables,
    paginateDescribeLocalGatewayRouteTableVpcAssociations,
    paginateDescribeLocalGatewayVirtualInterfaces,
    paginateDescribeLocalGatewayVirtualInterfaceGroups,
    paginateDescribeStaleSecurityGroups,
    paginateDescribeInstanceConnectEndpoints,
    paginateListImagesInRecycleBin,
    paginateListSnapshotsInRecycleBin,
    paginateDescribeFleets,
    paginateDescribeTrafficMirrorSessions,
    paginateDescribeTrafficMirrorTargets,
    paginateDescribeTrafficMirrorFilters,
    paginateDescribeClientVpnEndpoints
} from "@aws-sdk/client-ec2";

/*
 *  Available but not yet implemented:
 *  paginateDescribeAddressTransfers,
 *  paginateDescribeAddressesAttribute,
 *  paginateDescribeAwsNetworkPerformanceMetricSubscriptions,
 *  paginateDescribeByoipCidrs,
 *  paginateDescribeCapacityBlockExtensionHistory,
 *  paginateDescribeCapacityBlockExtensionOfferings,
 *  paginateDescribeCapacityBlockOfferings,
 *  paginateDescribeCapacityBlockStatus,
 *  paginateDescribeCapacityBlocks,
 *  paginateDescribeCapacityManagerDataExports,
 *  paginateDescribeCapacityReservationBillingRequests,
 *  paginateDescribeCapacityReservationFleets,
 *  paginateDescribeCapacityReservations,
 *  paginateDescribeCarrierGateways,
 *  paginateDescribeClassicLinkInstances,
 *  paginateDescribeClientVpnAuthorizationRules,
 *  paginateDescribeClientVpnConnections,
 *  paginateDescribeClientVpnRoutes,
 *  paginateDescribeClientVpnTargetNetworks,
 *  paginateDescribeCoipPools,
 *  paginateDescribeExportImageTasks,
 *  paginateDescribeFastLaunchImages,
 *  paginateDescribeFastSnapshotRestores,
 *  paginateDescribeFpgaImages,
 *  paginateDescribeHostReservationOfferings,
 *  paginateDescribeHostReservations,
 *  paginateDescribeHosts,
 *  paginateDescribeIamInstanceProfileAssociations,
 *  paginateDescribeImageReferences,
 *  paginateDescribeImageUsageReportEntries,
 *  paginateDescribeImageUsageReports,
 *  paginateDescribeImportImageTasks,
 *  paginateDescribeImportSnapshotTasks,
 *  paginateDescribeInstanceCreditSpecifications,
 *  paginateDescribeInstanceEventWindows,
 *  paginateDescribeInstanceImageMetadata,
 *  paginateDescribeInstanceStatus,
 *  paginateDescribeInstanceTopology,
 *  paginateDescribeInstanceTypeOfferings,
 *  paginateDescribeInstanceTypes,
 *  paginateDescribeIpamPoolAllocations,
 *  paginateDescribeIpamPools,
 *  paginateDescribeIpamPrefixListResolverTargets,
 *  paginateDescribeIpamPrefixListResolvers,
 *  paginateDescribeIpamResourceDiscoveries,
 *  paginateDescribeIpamResourceDiscoveryAssociations,
 *  paginateDescribeIpamScopes,
 *  paginateDescribeIpams,
 *  paginateDescribeIpv6Pools,
 *  paginateDescribeLaunchTemplateVersions,
 *  paginateDescribeMacHosts,
 *  paginateDescribeMacModificationTasks,
 *  paginateDescribeMovingAddresses,
 *  paginateDescribeNetworkInsightsAccessScopeAnalyses,
 *  paginateDescribeNetworkInsightsAccessScopes,
 *  paginateDescribeNetworkInsightsAnalyses,
 *  paginateDescribeNetworkInsightsPaths,
 *  paginateDescribeNetworkInterfacePermissions,
 *  paginateDescribePrefixLists,
 *  paginateDescribePrincipalIdFormat,
 *  paginateDescribePublicIpv4Pools,
 *  paginateDescribeReplaceRootVolumeTasks,
 *  paginateDescribeReservedInstancesModifications,
 *  paginateDescribeReservedInstancesOfferings,
 *  paginateDescribeRouteServerEndpoints,
 *  paginateDescribeRouteServerPeers,
 *  paginateDescribeRouteServers,
 *  paginateDescribeScheduledInstanceAvailability,
 *  paginateDescribeScheduledInstances,
 *  paginateDescribeSecondaryInterfaces,
 *  paginateDescribeSecondaryNetworks,
 *  paginateDescribeSecondarySubnets,
 *  paginateDescribeSecurityGroupVpcAssociations,
 *  paginateDescribeSnapshotTierStatus,
 *  paginateDescribeSpotFleetRequests,
 *  paginateDescribeSpotInstanceRequests,
 *  paginateDescribeSpotPriceHistory,
 *  paginateDescribeStoreImageTasks,
 *  paginateDescribeTags,
 *  paginateDescribeTransitGatewayMulticastDomains,
 *  paginateDescribeTransitGatewayPolicyTables,
 *  paginateDescribeTransitGatewayRouteTableAnnouncements,
 *  paginateDescribeTrunkInterfaceAssociations,
 *  paginateDescribeVerifiedAccessEndpoints,
 *  paginateDescribeVerifiedAccessGroups,
 *  paginateDescribeVerifiedAccessInstanceLoggingConfigurations,
 *  paginateDescribeVerifiedAccessInstances,
 *  paginateDescribeVerifiedAccessTrustProviders,
 *  paginateDescribeVolumeStatus,
 *  paginateDescribeVolumesModifications,
 *  paginateDescribeVpcClassicLinkDnsSupport,
 *  paginateDescribeVpcEndpointConnectionNotifications,
 *  paginateDescribeVpcEndpointConnections,
 *  paginateDescribeVpcEndpointServiceConfigurations,
 *  paginateDescribeVpcEndpointServicePermissions,
 *  paginateDescribeVpnConcentrators,
 *  paginateGetAssociatedIpv6PoolCidrs,
 *  paginateGetAwsNetworkPerformanceData,
 *  paginateGetCapacityManagerMetricData,
 *  paginateGetCapacityManagerMetricDimensions,
 *  paginateGetCapacityManagerMonitoredTagKeys,
 *  paginateGetGroupsForCapacityReservation,
 *  paginateGetInstanceTypesFromInstanceRequirements,
 *  paginateGetIpamAddressHistory,
 *  paginateGetIpamDiscoveredAccounts,
 *  paginateGetIpamDiscoveredResourceCidrs,
 *  paginateGetIpamPoolAllocations,
 *  paginateGetIpamPoolCidrs,
 *  paginateGetIpamPrefixListResolverRules,
 *  paginateGetIpamPrefixListResolverVersionEntries,
 *  paginateGetIpamPrefixListResolverVersions,
 *  paginateGetIpamResourceCidrs,
 *  paginateGetManagedPrefixListAssociations,
 *  paginateGetManagedPrefixListEntries,
 *  paginateGetNetworkInsightsAccessScopeAnalysisFindings,
 *  paginateGetSecurityGroupsForVpc,
 *  paginateGetSpotPlacementScores,
 *  paginateGetTransitGatewayAttachmentPropagations,
 *  paginateGetTransitGatewayMulticastDomainAssociations,
 *  paginateGetTransitGatewayPolicyTableAssociations,
 *  paginateGetTransitGatewayPrefixListReferences,
 *  paginateGetTransitGatewayRouteTableAssociations,
 *  paginateGetTransitGatewayRouteTablePropagations,
 *  paginateGetVpnConnectionDeviceTypes,
 *  paginateSearchTransitGatewayMulticastGroups,
 *  paginateSearchTransitGatewayRoutes,
 */
import type {Ec2} from "../../interfaces/ec2.js";

export class Ec2Service implements Ec2 {

    #ec2Client: EC2Client;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const ec2ClientConfig: EC2ClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#ec2Client = new EC2Client(ec2ClientConfig);

    }

    async getEnabledRegions (): Promise<Region[]> {

        const response = this.#ec2Client.send(new DescribeRegionsCommand({
            "DryRun": false,
            "AllRegions": true, // false, true
            "RegionNames": undefined,
            "Filters": undefined
        }));
        return (await response).Regions ?? [];

    }

    async getVpcs (): Promise<Vpc[]> {

        const client = this.#ec2Client;
        const vpcs = [];
        for await (const page of paginateDescribeVpcs(
            {client},
            {}
        )) {

            // page contains a single paginated output.
            if (page.Vpcs !== undefined) {

                vpcs.push(...page.Vpcs);

            }

        }
        return vpcs;

    }

    async getSubnets (): Promise<Subnet[]> {

        const client = this.#ec2Client;
        const subnets = [];
        for await (const page of paginateDescribeSubnets(
            {client},
            {}
        )) {

            // page contains a single paginated output.
            if (page.Subnets !== undefined) {

                subnets.push(...page.Subnets);

            }

        }
        return subnets;

    }

    async getSecurityGroups (): Promise<SecurityGroup[]> {

        const client = this.#ec2Client;
        const securityGroups = [];
        for await (const page of paginateDescribeSecurityGroups(
            {client},
            {}
        )) {

            // page contains a single paginated output.
            if (page.SecurityGroups !== undefined) {

                securityGroups.push(...page.SecurityGroups);

            }

        }
        return securityGroups;

    }

    async getInternetGateways (): Promise<InternetGateway[]> {

        const client = this.#ec2Client;
        const internetGateways = [];
        for await (const page of paginateDescribeInternetGateways(
            {client},
            {}
        )) {

            // page contains a single paginated output.
            if (page.InternetGateways !== undefined) {

                internetGateways.push(...page.InternetGateways);

            }

        }
        return internetGateways;

    }

    async getNatGateways (): Promise<NatGateway[]> {

        const client = this.#ec2Client;
        const natGateways = [];
        for await (const page of paginateDescribeNatGateways(
            {client},
            {}
        )) {

            // page contains a single paginated output.
            if (page.NatGateways !== undefined) {

                natGateways.push(...page.NatGateways);

            }

        }
        return natGateways;

    }

    async getEgressOnlyInternetGateways (): Promise<EgressOnlyInternetGateway[]> {

        const client = this.#ec2Client;
        const egressOnlyinternetGateways = [];
        for await (const page of paginateDescribeEgressOnlyInternetGateways(
            {client},
            {}
        )) {

            // page contains a single paginated output.
            if (page.EgressOnlyInternetGateways !== undefined) {

                egressOnlyinternetGateways.push(...page.EgressOnlyInternetGateways);

            }

        }
        return egressOnlyinternetGateways;

    }

    async getNetworkInterfaces (): Promise<NetworkInterface[]> {

        const client = this.#ec2Client;
        const networkInterfaces = [];
        for await (const page of paginateDescribeNetworkInterfaces(
            {client},
            {}
        )) {

            // page contains a single paginated output.
            if (page.NetworkInterfaces !== undefined) {

                networkInterfaces.push(...page.NetworkInterfaces);

            }

        }
        return networkInterfaces;

    }

    async getRouteTables (): Promise<RouteTable[]> {

        const client = this.#ec2Client;
        const routeTables = [];
        for await (const page of paginateDescribeRouteTables(
            {client},
            {}
        )) {

            if (page.RouteTables !== undefined) {

                routeTables.push(...page.RouteTables);

            }

        }
        return routeTables;

    }

    async getVolumes (): Promise<Volume[]> {

        const client = this.#ec2Client;
        const volumes = [];
        for await (const page of paginateDescribeVolumes(
            {client},
            {}
        )) {

            if (page.Volumes !== undefined) {

                volumes.push(...page.Volumes);

            }

        }
        return volumes;

    }

    async getInstances (): Promise<Instance[]> {

        const client = this.#ec2Client;
        const instances = [];
        for await (const page of paginateDescribeInstances(
            {client},
            {}
        )) {

            for (const reservation of page.Reservations ?? []) {

                if (reservation.Instances !== undefined) {

                    instances.push(...reservation.Instances);

                }

            }

        }
        return instances;

    }

    async getVpcEndpoints (): Promise<VpcEndpoint[]> {

        const client = this.#ec2Client;
        const vpcEndpoints = [];
        for await (const page of paginateDescribeVpcEndpoints(
            {client},
            {}
        )) {

            if (page.VpcEndpoints !== undefined) {

                vpcEndpoints.push(...page.VpcEndpoints);

            }

        }
        return vpcEndpoints;

    }

    async getAddresses (): Promise<Address[]> {

        const response = await this.#ec2Client.send(new DescribeAddressesCommand({}));
        return response.Addresses ?? [];

    }

    async getImages (): Promise<Image[]> {

        const client = this.#ec2Client;
        const images = [];
        for await (const page of paginateDescribeImages(
            {client},
            {"Owners": ["self"]}
        )) {

            if (page.Images !== undefined) {

                images.push(...page.Images);

            }

        }
        return images;

    }

    async getSnapshots (): Promise<Snapshot[]> {

        const client = this.#ec2Client;
        const snapshots = [];
        for await (const page of paginateDescribeSnapshots(
            {client},
            {"OwnerIds": ["self"]}
        )) {

            if (page.Snapshots !== undefined) {

                snapshots.push(...page.Snapshots);

            }

        }
        return snapshots;

    }

    async getKeyPairs (): Promise<KeyPairInfo[]> {

        const response = await this.#ec2Client.send(new DescribeKeyPairsCommand({}));
        return response.KeyPairs ?? [];

    }

    async getNetworkAcls (): Promise<NetworkAcl[]> {

        const client = this.#ec2Client;
        const acls = [];
        for await (const page of paginateDescribeNetworkAcls(
            {client},
            {}
        )) {

            if (page.NetworkAcls !== undefined) {

                acls.push(...page.NetworkAcls);

            }

        }
        return acls;

    }

    async getFlowLogs (): Promise<FlowLog[]> {

        const client = this.#ec2Client;
        const flowLogs = [];
        for await (const page of paginateDescribeFlowLogs(
            {client},
            {}
        )) {

            if (page.FlowLogs !== undefined) {

                flowLogs.push(...page.FlowLogs);

            }

        }
        return flowLogs;

    }

    async getDhcpOptions (): Promise<DhcpOptions[]> {

        const client = this.#ec2Client;
        const options = [];
        for await (const page of paginateDescribeDhcpOptions(
            {client},
            {}
        )) {

            if (page.DhcpOptions !== undefined) {

                options.push(...page.DhcpOptions);

            }

        }
        return options;

    }

    async getManagedPrefixLists (): Promise<ManagedPrefixList[]> {

        const client = this.#ec2Client;
        const lists = [];
        for await (const page of paginateDescribeManagedPrefixLists(
            {client},
            {}
        )) {

            if (page.PrefixLists !== undefined) {

                lists.push(...page.PrefixLists);

            }

        }
        return lists;

    }

    async getVpcPeeringConnections (): Promise<VpcPeeringConnection[]> {

        const client = this.#ec2Client;
        const connections = [];
        for await (const page of paginateDescribeVpcPeeringConnections(
            {client},
            {}
        )) {

            if (page.VpcPeeringConnections !== undefined) {

                connections.push(...page.VpcPeeringConnections);

            }

        }
        return connections;

    }

    async getLaunchTemplates (): Promise<LaunchTemplate[]> {

        const client = this.#ec2Client;
        const templates = [];
        for await (const page of paginateDescribeLaunchTemplates(
            {client},
            {}
        )) {

            if (page.LaunchTemplates !== undefined) {

                templates.push(...page.LaunchTemplates);

            }

        }
        return templates;

    }

    async getTransitGateways (): Promise<TransitGateway[]> {

        const client = this.#ec2Client;
        const gateways = [];
        for await (const page of paginateDescribeTransitGateways(
            {client},
            {}
        )) {

            if (page.TransitGateways !== undefined) {

                gateways.push(...page.TransitGateways);

            }

        }
        return gateways;

    }

    async getTransitGatewayAttachments (): Promise<TransitGatewayAttachment[]> {

        const client = this.#ec2Client;
        const attachments = [];
        for await (const page of paginateDescribeTransitGatewayAttachments(
            {client},
            {}
        )) {

            if (page.TransitGatewayAttachments !== undefined) {

                attachments.push(...page.TransitGatewayAttachments);

            }

        }
        return attachments;

    }

    async getTransitGatewayRouteTables (): Promise<TransitGatewayRouteTable[]> {

        const client = this.#ec2Client;
        const tables = [];
        for await (const page of paginateDescribeTransitGatewayRouteTables(
            {client},
            {}
        )) {

            if (page.TransitGatewayRouteTables !== undefined) {

                tables.push(...page.TransitGatewayRouteTables);

            }

        }
        return tables;

    }

    async getSecurityGroupRules (): Promise<SecurityGroupRule[]> {

        const client = this.#ec2Client;
        const rules = [];
        for await (const page of paginateDescribeSecurityGroupRules(
            {client},
            {}
        )) {

            if (page.SecurityGroupRules !== undefined) {

                rules.push(...page.SecurityGroupRules);

            }

        }
        return rules;

    }

    async getLocalGateways (): Promise<LocalGateway[]> {

        const client = this.#ec2Client;
        const gateways = [];
        for await (const page of paginateDescribeLocalGateways(
            {client},
            {}
        )) {

            if (page.LocalGateways !== undefined) {

                gateways.push(...page.LocalGateways);

            }

        }
        return gateways;

    }

    async getLocalGatewayRouteTables (): Promise<LocalGatewayRouteTable[]> {

        const client = this.#ec2Client;
        const tables = [];
        for await (const page of paginateDescribeLocalGatewayRouteTables(
            {client},
            {}
        )) {

            if (page.LocalGatewayRouteTables !== undefined) {

                tables.push(...page.LocalGatewayRouteTables);

            }

        }
        return tables;

    }

    async getLocalGatewayRouteTableVpcAssociations (): Promise<LocalGatewayRouteTableVpcAssociation[]> {

        const client = this.#ec2Client;
        const associations = [];
        for await (const page of paginateDescribeLocalGatewayRouteTableVpcAssociations(
            {client},
            {}
        )) {

            if (page.LocalGatewayRouteTableVpcAssociations !== undefined) {

                associations.push(...page.LocalGatewayRouteTableVpcAssociations);

            }

        }
        return associations;

    }

    async getLocalGatewayVirtualInterfaces (): Promise<LocalGatewayVirtualInterface[]> {

        const client = this.#ec2Client;
        const interfaces = [];
        for await (const page of paginateDescribeLocalGatewayVirtualInterfaces(
            {client},
            {}
        )) {

            if (page.LocalGatewayVirtualInterfaces !== undefined) {

                interfaces.push(...page.LocalGatewayVirtualInterfaces);

            }

        }
        return interfaces;

    }

    async getLocalGatewayVirtualInterfaceGroups (): Promise<LocalGatewayVirtualInterfaceGroup[]> {

        const client = this.#ec2Client;
        const groups = [];
        for await (const page of paginateDescribeLocalGatewayVirtualInterfaceGroups(
            {client},
            {}
        )) {

            if (page.LocalGatewayVirtualInterfaceGroups !== undefined) {

                groups.push(...page.LocalGatewayVirtualInterfaceGroups);

            }

        }
        return groups;

    }

    async getStaleSecurityGroups (vpcId: string): Promise<StaleSecurityGroup[]> {

        const client = this.#ec2Client;
        const staleGroups = [];
        for await (const page of paginateDescribeStaleSecurityGroups(
            {client},
            {"VpcId": vpcId}
        )) {

            if (page.StaleSecurityGroupSet !== undefined) {

                staleGroups.push(...page.StaleSecurityGroupSet);

            }

        }
        return staleGroups;

    }

    async getInstanceConnectEndpoints (): Promise<Ec2InstanceConnectEndpoint[]> {

        const client = this.#ec2Client;
        const endpoints = [];
        for await (const page of paginateDescribeInstanceConnectEndpoints(
            {client},
            {}
        )) {

            if (page.InstanceConnectEndpoints !== undefined) {

                endpoints.push(...page.InstanceConnectEndpoints);

            }

        }
        return endpoints;

    }

    async getImagesInRecycleBin (): Promise<ImageRecycleBinInfo[]> {

        const client = this.#ec2Client;
        const images = [];
        for await (const page of paginateListImagesInRecycleBin(
            {client},
            {}
        )) {

            if (page.Images !== undefined) {

                images.push(...page.Images);

            }

        }
        return images;

    }

    async getSnapshotsInRecycleBin (): Promise<SnapshotRecycleBinInfo[]> {

        const client = this.#ec2Client;
        const snapshots = [];
        for await (const page of paginateListSnapshotsInRecycleBin(
            {client},
            {}
        )) {

            if (page.Snapshots !== undefined) {

                snapshots.push(...page.Snapshots);

            }

        }
        return snapshots;

    }

    async getFleets (): Promise<FleetData[]> {

        const client = this.#ec2Client;
        const fleets: FleetData[] = [];
        for await (const page of paginateDescribeFleets(
            {client},
            {}
        )) {

            if (page.Fleets !== undefined) {

                fleets.push(...page.Fleets);

            }

        }
        return fleets;

    }

    async getTrafficMirrorSessions (): Promise<TrafficMirrorSession[]> {

        const client = this.#ec2Client;
        const sessions: TrafficMirrorSession[] = [];
        for await (const page of paginateDescribeTrafficMirrorSessions(
            {client},
            {}
        )) {

            if (page.TrafficMirrorSessions !== undefined) {

                sessions.push(...page.TrafficMirrorSessions);

            }

        }
        return sessions;

    }

    async getTrafficMirrorTargets (): Promise<TrafficMirrorTarget[]> {

        const client = this.#ec2Client;
        const targets: TrafficMirrorTarget[] = [];
        for await (const page of paginateDescribeTrafficMirrorTargets(
            {client},
            {}
        )) {

            if (page.TrafficMirrorTargets !== undefined) {

                targets.push(...page.TrafficMirrorTargets);

            }

        }
        return targets;

    }

    async getTrafficMirrorFilters (): Promise<TrafficMirrorFilter[]> {

        const client = this.#ec2Client;
        const filters: TrafficMirrorFilter[] = [];
        for await (const page of paginateDescribeTrafficMirrorFilters(
            {client},
            {}
        )) {

            if (page.TrafficMirrorFilters !== undefined) {

                filters.push(...page.TrafficMirrorFilters);

            }

        }
        return filters;

    }

    async getClientVpnEndpoints (): Promise<ClientVpnEndpoint[]> {

        const client = this.#ec2Client;
        const endpoints: ClientVpnEndpoint[] = [];
        for await (const page of paginateDescribeClientVpnEndpoints(
            {client},
            {}
        )) {

            if (page.ClientVpnEndpoints !== undefined) {

                endpoints.push(...page.ClientVpnEndpoints);

            }

        }
        return endpoints;

    }

    async getTransitGatewayVpcAttachments (): Promise<TransitGatewayVpcAttachment[]> {

        const client = this.#ec2Client;
        const attachments: TransitGatewayVpcAttachment[] = [];
        for await (const page of paginateDescribeTransitGatewayVpcAttachments(
            {client},
            {}
        )) {

            if (page.TransitGatewayVpcAttachments !== undefined) {

                attachments.push(...page.TransitGatewayVpcAttachments);

            }

        }
        return attachments;

    }

    async getTransitGatewayPeeringAttachments (): Promise<TransitGatewayPeeringAttachment[]> {

        const client = this.#ec2Client;
        const attachments: TransitGatewayPeeringAttachment[] = [];
        for await (const page of paginateDescribeTransitGatewayPeeringAttachments(
            {client},
            {}
        )) {

            if (page.TransitGatewayPeeringAttachments !== undefined) {

                attachments.push(...page.TransitGatewayPeeringAttachments);

            }

        }
        return attachments;

    }

    async getTransitGatewayConnects (): Promise<TransitGatewayConnect[]> {

        const client = this.#ec2Client;
        const connects: TransitGatewayConnect[] = [];
        for await (const page of paginateDescribeTransitGatewayConnects(
            {client},
            {}
        )) {

            if (page.TransitGatewayConnects !== undefined) {

                connects.push(...page.TransitGatewayConnects);

            }

        }
        return connects;

    }

    async getTransitGatewayConnectPeers (): Promise<TransitGatewayConnectPeer[]> {

        const client = this.#ec2Client;
        const peers: TransitGatewayConnectPeer[] = [];
        for await (const page of paginateDescribeTransitGatewayConnectPeers(
            {client},
            {}
        )) {

            if (page.TransitGatewayConnectPeers !== undefined) {

                peers.push(...page.TransitGatewayConnectPeers);

            }

        }
        return peers;

    }

    async getVerifiedAccessInstances (): Promise<VerifiedAccessInstance[]> {

        const client = this.#ec2Client;
        const instances: VerifiedAccessInstance[] = [];
        try {

            for await (const page of paginateDescribeVerifiedAccessInstances(
                {client},
                {}
            )) {

                if (page.VerifiedAccessInstances !== undefined) {

                    instances.push(...page.VerifiedAccessInstances);

                }

            }

        } catch { /* unsupported in some regions */ }
        return instances;

    }

    async getVerifiedAccessGroups (): Promise<VerifiedAccessGroup[]> {

        const client = this.#ec2Client;
        const groups: VerifiedAccessGroup[] = [];
        try {

            for await (const page of paginateDescribeVerifiedAccessGroups(
                {client},
                {}
            )) {

                if (page.VerifiedAccessGroups !== undefined) {

                    groups.push(...page.VerifiedAccessGroups);

                }

            }

        } catch { /* unsupported in some regions */ }
        return groups;

    }

    async getVerifiedAccessEndpoints (): Promise<VerifiedAccessEndpoint[]> {

        const client = this.#ec2Client;
        const endpoints: VerifiedAccessEndpoint[] = [];
        try {

            for await (const page of paginateDescribeVerifiedAccessEndpoints(
                {client},
                {}
            )) {

                if (page.VerifiedAccessEndpoints !== undefined) {

                    endpoints.push(...page.VerifiedAccessEndpoints);

                }

            }

        } catch { /* unsupported in some regions */ }
        return endpoints;

    }

    async getVerifiedAccessTrustProviders (): Promise<VerifiedAccessTrustProvider[]> {

        const client = this.#ec2Client;
        const providers: VerifiedAccessTrustProvider[] = [];
        try {

            for await (const page of paginateDescribeVerifiedAccessTrustProviders(
                {client},
                {}
            )) {

                if (page.VerifiedAccessTrustProviders !== undefined) {

                    providers.push(...page.VerifiedAccessTrustProviders);

                }

            }

        } catch { /* unsupported in some regions */ }
        return providers;

    }

    async getVpcEndpointServiceConfigurations (): Promise<ServiceConfiguration[]> {

        const client = this.#ec2Client;
        const configs: ServiceConfiguration[] = [];
        for await (const page of paginateDescribeVpcEndpointServiceConfigurations(
            {client},
            {}
        )) {

            if (page.ServiceConfigurations !== undefined) {

                configs.push(...page.ServiceConfigurations);

            }

        }
        return configs;

    }

    /*
     * // / ////////////////////
     *async getRecycledAmis (): Promise<ImageRecycleBinInfo[] | undefined> {
     *
     *    const response = await this.ec2Client.send(new ListImagesInRecycleBinCommand({
     *        "DryRun": false,
     *        "MaxResults": undefined,
     *        "NextToken": undefined
     *    }));
     *    return response.Images;
     *
     *}
     *
     *async getRecycledSnapshots (): Promise<SnapshotRecycleBinInfo[] | undefined> {
     *
     *    const response = await this.ec2Client.send(new ListSnapshotsInRecycleBinCommand({
     *        "DryRun": false,
     *        "MaxResults": undefined,
     *        "NextToken": undefined
     *    }));
     *    return response.Snapshots;
     *
     *}
     *
     *async getAmis (): Promise<Image[] | undefined> {
     *
     *    const response = await this.ec2Client.send(new DescribeImagesCommand({
     *        "DryRun": false,
     *        "MaxResults": undefined,
     *        "NextToken": undefined,
     *        "ExecutableUsers": undefined,
     *        "Filters": undefined,
     *        "ImageIds": undefined,
     *        "IncludeDeprecated": true,
     *        "Owners": ["self"]
     *    }));
     *    return response.Images;
     *
     *}
     *
     *async getReservations (): Promise<Reservation[] | undefined> {
     *
     *    const response = await this.ec2Client.send(new DescribeInstancesCommand({
     *        "DryRun": false,
     *        "MaxResults": undefined,
     *        "NextToken": undefined,
     *        "InstanceIds": undefined,
     *        "Filters": undefined
     *    }));
     *    return response.Reservations;
     *
     *}
     *
     *async getKeyPairs (): Promise<KeyPair[] | undefined> {
     *
     *    const response = await this.ec2Client.send(new DescribeKeyPairsCommand({
     *        "DryRun": false,
     *        "Filters": undefined,
     *        "IncludePublicKey": false,
     *        "KeyNames": undefined,
     *        "KeyPairIds": undefined
     *    }));
     *    return response.KeyPairs;
     *
     *}
     *
     *async getVpcEndpoints (): Promise<VpcEndpoint[] | undefined> {
     *
     *    const response = await this.ec2Client.send(new DescribeVpcEndpointsCommand({
     *        "DryRun": false,
     *        "Filters": undefined,
     *        "VpcEndpointIds": undefined,
     *        "MaxResults": undefined,
     *        "NextToken": undefined
     *    }));
     *    return response.VpcEndpoints;
     *
     *}
     *
     *async getVolumes (): Promise<Volume[] | undefined> {
     *
     *    const response = await this.ec2Client.send(new DescribeVolumesCommand({
     *        "DryRun": false,
     *        "Filters": undefined,
     *        "VolumeIds": undefined,
     *        "MaxResults": undefined,
     *        "NextToken": undefined
     *    }));
     *    return response.Volumes;
     *
     *}
     *
     *async getTags (): Promise<Tag[] | undefined> {
     *
     *    const response = await this.ec2Client.send(new DescribeTagsCommand({
     *        "DryRun": false,
     *        "Filters": undefined,
     *        "MaxResults": undefined,
     *        "NextToken": undefined
     *    }));
     *    return response.Tags;
     *
     *}
     *
     *async getElasticIps (): Promise<Address[] | undefined> {
     *
     *    const response = await this.ec2Client.send(new DescribeAddressesCommand({
     *        "DryRun": false,
     *        "Filters": undefined,
     *        "AllocationIds": undefined,
     *        "PublicIps": undefined
     *    }));
     *    return response.Addresses;
     *
     *}
     *
     *async getElasticGpus (): Promise<ElasticGpus[] | undefined> {
     *
     *    const response = await this.ec2Client.send(new DescribeElasticGpusCommand({
     *        "DryRun": false,
     *        "Filters": undefined,
     *        "ElasticGpuIds": undefined,
     *        "NextToken": undefined
     *    }));
     *    return response.ElasticGpuSet;
     *
     *}
     *
     *async getRouteTables (): Promise<RouteTable[] | undefined> {
     *
     *    const response = await this.ec2Client.send(new DescribeRouteTablesCommand({
     *        "DryRun": false,
     *        "Filters": undefined,
     *        "RouteTableIds": undefined,
     *        "NextToken": undefined
     *    }));
     *    return response.RouteTables;
     *
     *}
     *
     *async getCapacityReservationFleets (): Promise<CapacityReservationFleet[] | undefined> {
     *
     *    const response = await this.ec2Client.send(new DescribeCapacityReservationFleetsCommand({
     *        "DryRun": false,
     *        "Filters": undefined,
     *        "CapacityReservationFleetIds": undefined,
     *        "NextToken": undefined
     *    }));
     *    return response.CapacityReservationFleets;
     *
     *}
     */

}

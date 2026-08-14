import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {Ec2CacheService} from "../../../../src/providers/cache/ec2CacheService.js";

describe(
    "Ec2CacheService",
    () => {

        let tmpDir: string;

        beforeEach(() => {

            tmpDir = mkdtempSync(join(
                tmpdir(),
                "gnaws-test-"
            ));

        });

        afterEach(() => {

            rmSync(
                tmpDir,
                {"recursive": true}
            );

        });

        const methods = [
            {"method": "getEnabledRegions",
                "file": "ec2_regions.json",
                "data": [{"RegionName": "us-east-1"}]},
            {"method": "getVpcs",
                "file": "ec2_vpcs.json",
                "data": [{"VpcId": "vpc-1"}]},
            {"method": "getSubnets",
                "file": "ec2_subnets.json",
                "data": [{"SubnetId": "subnet-1"}]},
            {"method": "getSecurityGroups",
                "file": "ec2_security_groups.json",
                "data": [{"GroupId": "sg-1"}]},
            {"method": "getInternetGateways",
                "file": "ec2_internet_gateways.json",
                "data": [{"InternetGatewayId": "igw-1"}]},
            {"method": "getNatGateways",
                "file": "ec2_nat_gateways.json",
                "data": [{"NatGatewayId": "nat-1"}]},
            {"method": "getEgressOnlyInternetGateways",
                "file": "ec2_egress_only_internet_gateways.json",
                "data": [{"EgressOnlyInternetGatewayId": "eigw-1"}]},
            {"method": "getNetworkInterfaces",
                "file": "ec2_network_interfaces.json",
                "data": [{"NetworkInterfaceId": "eni-1"}]},
            {"method": "getRouteTables",
                "file": "ec2_route_tables.json",
                "data": [{"RouteTableId": "rtb-1"}]},
            {"method": "getVolumes",
                "file": "ec2_volumes.json",
                "data": [{"VolumeId": "vol-1"}]},
            {"method": "getInstances",
                "file": "ec2_instances.json",
                "data": [{"InstanceId": "i-1"}]},
            {"method": "getVpcEndpoints",
                "file": "ec2_vpc_endpoints.json",
                "data": [{"VpcEndpointId": "vpce-1"}]},
            {"method": "getAddresses",
                "file": "ec2_addresses.json",
                "data": [{"AllocationId": "eipalloc-1"}]},
            {"method": "getImages",
                "file": "ec2_images.json",
                "data": [{"ImageId": "ami-1"}]},
            {"method": "getSnapshots",
                "file": "ec2_snapshots.json",
                "data": [{"SnapshotId": "snap-1"}]},
            {"method": "getKeyPairs",
                "file": "ec2_key_pairs.json",
                "data": [{"KeyPairId": "key-1"}]},
            {"method": "getNetworkAcls",
                "file": "ec2_network_acls.json",
                "data": [{"NetworkAclId": "acl-1"}]},
            {"method": "getFlowLogs",
                "file": "ec2_flow_logs.json",
                "data": [{"FlowLogId": "fl-1"}]},
            {"method": "getDhcpOptions",
                "file": "ec2_dhcp_options.json",
                "data": [{"DhcpOptionsId": "dopt-1"}]},
            {"method": "getManagedPrefixLists",
                "file": "ec2_managed_prefix_lists.json",
                "data": [{"PrefixListId": "pl-1"}]},
            {"method": "getVpcPeeringConnections",
                "file": "ec2_vpc_peering_connections.json",
                "data": [{"VpcPeeringConnectionId": "pcx-1"}]},
            {"method": "getLaunchTemplates",
                "file": "ec2_launch_templates.json",
                "data": [{"LaunchTemplateId": "lt-1"}]},
            {"method": "getTransitGateways",
                "file": "ec2_transit_gateways.json",
                "data": [{"TransitGatewayId": "tgw-1"}]},
            {"method": "getTransitGatewayAttachments",
                "file": "ec2_transit_gateway_attachments.json",
                "data": [{"TransitGatewayAttachmentId": "tgw-attach-1"}]},
            {"method": "getTransitGatewayRouteTables",
                "file": "ec2_transit_gateway_route_tables.json",
                "data": [{"TransitGatewayRouteTableId": "tgw-rtb-1"}]},
            {"method": "getSecurityGroupRules",
                "file": "ec2_security_group_rules.json",
                "data": [{"SecurityGroupRuleId": "sgr-1"}]},
            {"method": "getLocalGateways",
                "file": "ec2_local_gateways.json",
                "data": [{"LocalGatewayId": "lgw-1"}]},
            {"method": "getLocalGatewayRouteTables",
                "file": "ec2_local_gateway_route_tables.json",
                "data": [{"LocalGatewayRouteTableId": "lgw-rtb-1"}]},
            {"method": "getLocalGatewayRouteTableVpcAssociations",
                "file": "ec2_local_gateway_route_table_vpc_associations.json",
                "data": [{"LocalGatewayRouteTableVpcAssociationId": "lgw-vpc-1"}]},
            {"method": "getLocalGatewayVirtualInterfaces",
                "file": "ec2_local_gateway_virtual_interfaces.json",
                "data": [{"LocalGatewayVirtualInterfaceId": "lgw-vif-1"}]},
            {"method": "getLocalGatewayVirtualInterfaceGroups",
                "file": "ec2_local_gateway_virtual_interface_groups.json",
                "data": [{"LocalGatewayVirtualInterfaceGroupId": "lgw-vifg-1"}]},
            {"method": "getStaleSecurityGroups",
                "file": "ec2_stale_security_groups.json",
                "data": [{"GroupId": "sg-stale-1"}]},
            {"method": "getInstanceConnectEndpoints",
                "file": "ec2_instance_connect_endpoints.json",
                "data": [{"InstanceConnectEndpointId": "ice-1"}]},
            {"method": "getImagesInRecycleBin",
                "file": "ec2_images_recycle_bin.json",
                "data": [{"ImageId": "ami-rb-1"}]},
            {"method": "getSnapshotsInRecycleBin",
                "file": "ec2_snapshots_recycle_bin.json",
                "data": [{"SnapshotId": "snap-rb-1"}]},
            {"method": "getFleets",
                "file": "ec2_fleets.json",
                "data": [{"FleetId": "fleet-1"}]},
            {"method": "getTrafficMirrorSessions",
                "file": "ec2_traffic_mirror_sessions.json",
                "data": [{"TrafficMirrorSessionId": "tms-1"}]},
            {"method": "getTrafficMirrorTargets",
                "file": "ec2_traffic_mirror_targets.json",
                "data": [{"TrafficMirrorTargetId": "tmt-1"}]},
            {"method": "getTrafficMirrorFilters",
                "file": "ec2_traffic_mirror_filters.json",
                "data": [{"TrafficMirrorFilterId": "tmf-1"}]},
            {"method": "getClientVpnEndpoints",
                "file": "ec2_client_vpn_endpoints.json",
                "data": [{"ClientVpnEndpointId": "cvpn-1"}]},
            {"method": "getTransitGatewayVpcAttachments",
                "file": "ec2_transit_gateway_vpc_attachments.json",
                "data": [{"TransitGatewayAttachmentId": "tgw-vpc-1"}]},
            {"method": "getTransitGatewayPeeringAttachments",
                "file": "ec2_transit_gateway_peering_attachments.json",
                "data": [{"TransitGatewayAttachmentId": "tgw-peer-1"}]},
            {"method": "getTransitGatewayConnects",
                "file": "ec2_transit_gateway_connects.json",
                "data": [{"TransitGatewayAttachmentId": "tgw-conn-1"}]},
            {"method": "getTransitGatewayConnectPeers",
                "file": "ec2_transit_gateway_connect_peers.json",
                "data": [{"TransitGatewayConnectPeerId": "tgw-cp-1"}]},
            {"method": "getVerifiedAccessInstances",
                "file": "ec2_verified_access_instances.json",
                "data": [{"VerifiedAccessInstanceId": "vai-1"}]},
            {"method": "getVerifiedAccessGroups",
                "file": "ec2_verified_access_groups.json",
                "data": [{"VerifiedAccessGroupId": "vag-1"}]},
            {"method": "getVerifiedAccessEndpoints",
                "file": "ec2_verified_access_endpoints.json",
                "data": [{"VerifiedAccessEndpointId": "vae-1"}]},
            {"method": "getVerifiedAccessTrustProviders",
                "file": "ec2_verified_access_trust_providers.json",
                "data": [{"VerifiedAccessTrustProviderId": "vatp-1"}]},
            {"method": "getVpcEndpointServiceConfigurations",
                "file": "ec2_vpc_endpoint_service_configurations.json",
                "data": [{"ServiceId": "vpce-svc-1"}]}
        ] as const;

        for (const {method, file, data} of methods) {

            it(
                `${method} reads ${file}`,
                async () => {

                    writeFileSync(
                        join(
                            tmpDir,
                            file
                        ),
                        JSON.stringify(data)
                    );
                    const service = new Ec2CacheService(tmpDir);
                    const result = await (service[method] as () => Promise<unknown[]>)();
                    expect(result).toEqual(data);

                }
            );

            it(
                `${method} returns empty array for missing file`,
                async () => {

                    const service = new Ec2CacheService(tmpDir);
                    const result = await (service[method] as () => Promise<unknown[]>)();
                    expect(result).toEqual([]);

                }
            );

        }

    }
);

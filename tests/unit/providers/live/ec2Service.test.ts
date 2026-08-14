import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    EC2Client,
    DescribeVpcsCommand,
    DescribeSubnetsCommand,
    DescribeInstancesCommand,
    DescribeVolumesCommand,
    DescribeSecurityGroupsCommand,
    DescribeVerifiedAccessInstancesCommand,
    DescribeAddressesCommand,
    DescribeClientVpnEndpointsCommand,
    DescribeDhcpOptionsCommand,
    DescribeEgressOnlyInternetGatewaysCommand,
    DescribeRegionsCommand,
    DescribeFleetsCommand,
    DescribeFlowLogsCommand,
    DescribeImagesCommand,
    ListImagesInRecycleBinCommand,
    DescribeInstanceConnectEndpointsCommand,
    DescribeInternetGatewaysCommand,
    DescribeKeyPairsCommand,
    DescribeLaunchTemplatesCommand,
    DescribeLocalGatewaysCommand,
    DescribeLocalGatewayRouteTablesCommand,
    DescribeLocalGatewayRouteTableVpcAssociationsCommand,
    DescribeLocalGatewayVirtualInterfacesCommand,
    DescribeLocalGatewayVirtualInterfaceGroupsCommand,
    DescribeManagedPrefixListsCommand,
    DescribeNatGatewaysCommand,
    DescribeNetworkAclsCommand,
    DescribeNetworkInterfacesCommand,
    DescribeRouteTablesCommand,
    DescribeSecurityGroupRulesCommand,
    DescribeSnapshotsCommand,
    ListSnapshotsInRecycleBinCommand,
    DescribeStaleSecurityGroupsCommand,
    DescribeTrafficMirrorFiltersCommand,
    DescribeTrafficMirrorSessionsCommand,
    DescribeTrafficMirrorTargetsCommand,
    DescribeTransitGatewaysCommand,
    DescribeTransitGatewayAttachmentsCommand,
    DescribeTransitGatewayConnectsCommand,
    DescribeTransitGatewayConnectPeersCommand,
    DescribeTransitGatewayPeeringAttachmentsCommand,
    DescribeTransitGatewayRouteTablesCommand,
    DescribeTransitGatewayVpcAttachmentsCommand,
    DescribeVerifiedAccessEndpointsCommand,
    DescribeVerifiedAccessGroupsCommand,
    DescribeVerifiedAccessTrustProvidersCommand,
    DescribeVpcEndpointsCommand,
    DescribeVpcEndpointServiceConfigurationsCommand,
    DescribeVpcPeeringConnectionsCommand
} from "@aws-sdk/client-ec2";
import {Ec2Service} from "../../../../src/providers/live/ec2Service.js";

const ec2Mock = mockClient(EC2Client);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    ec2Mock.reset();

});

describe(
    "Ec2Service",
    () => {

        describe(
            "getVpcs",
            () => {

                it(
                    "returns VPCs from single page",
                    async () => {

                        ec2Mock.on(DescribeVpcsCommand).resolves({
                            "Vpcs": [
                                {"VpcId": "vpc-111"},
                                {"VpcId": "vpc-222"}
                            ]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const vpcs = await service.getVpcs();

                        expect(vpcs).toHaveLength(2);
                        expect(vpcs[0].VpcId).toBe("vpc-111");
                        expect(vpcs[1].VpcId).toBe("vpc-222");

                    }
                );

                it(
                    "aggregates VPCs across multiple pages",
                    async () => {

                        ec2Mock.on(DescribeVpcsCommand).
                            resolvesOnce({"Vpcs": [{"VpcId": "vpc-1"}],
                                "NextToken": "token1"}).
                            resolvesOnce({"Vpcs": [{"VpcId": "vpc-2"}]});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const vpcs = await service.getVpcs();

                        expect(vpcs).toHaveLength(2);
                        expect(vpcs[0].VpcId).toBe("vpc-1");
                        expect(vpcs[1].VpcId).toBe("vpc-2");

                    }
                );

                it(
                    "returns empty array when no VPCs",
                    async () => {

                        ec2Mock.on(DescribeVpcsCommand).resolves({"Vpcs": undefined});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const vpcs = await service.getVpcs();

                        expect(vpcs).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getSubnets",
            () => {

                it(
                    "returns subnets from paginated response",
                    async () => {

                        ec2Mock.on(DescribeSubnetsCommand).resolves({
                            "Subnets": [
                                {"SubnetId": "subnet-aaa",
                                    "VpcId": "vpc-111"},
                                {"SubnetId": "subnet-bbb",
                                    "VpcId": "vpc-111"}
                            ]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const subnets = await service.getSubnets();

                        expect(subnets).toHaveLength(2);
                        expect(subnets[0].SubnetId).toBe("subnet-aaa");

                    }
                );

                it(
                    "returns empty array when Subnets is undefined",
                    async () => {

                        ec2Mock.on(DescribeSubnetsCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const subnets = await service.getSubnets();

                        expect(subnets).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getInstances",
            () => {

                it(
                    "flattens instances from reservations",
                    async () => {

                        ec2Mock.on(DescribeInstancesCommand).resolves({
                            "Reservations": [
                                {"Instances": [
                                    {"InstanceId": "i-111"},
                                    {"InstanceId": "i-222"}
                                ]},
                                {"Instances": [{"InstanceId": "i-333"}]}
                            ]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const instances = await service.getInstances();

                        expect(instances).toHaveLength(3);
                        expect(instances.map((i) => i.InstanceId)).toEqual([
                            "i-111",
                            "i-222",
                            "i-333"
                        ]);

                    }
                );

                it(
                    "handles empty reservations",
                    async () => {

                        ec2Mock.on(DescribeInstancesCommand).resolves({"Reservations": []});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const instances = await service.getInstances();

                        expect(instances).toEqual([]);

                    }
                );

                it(
                    "handles undefined Reservations",
                    async () => {

                        ec2Mock.on(DescribeInstancesCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const instances = await service.getInstances();

                        expect(instances).toEqual([]);

                    }
                );

                it(
                    "handles reservations with undefined Instances",
                    async () => {

                        ec2Mock.on(DescribeInstancesCommand).resolves({
                            "Reservations": [{"Instances": undefined}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const instances = await service.getInstances();

                        expect(instances).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getVolumes",
            () => {

                it(
                    "returns volumes from paginated response",
                    async () => {

                        ec2Mock.on(DescribeVolumesCommand).resolves({
                            "Volumes": [
                                {"VolumeId": "vol-111",
                                    "State": "available"},
                                {"VolumeId": "vol-222",
                                    "State": "in-use"}
                            ]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const volumes = await service.getVolumes();

                        expect(volumes).toHaveLength(2);
                        expect(volumes[0].VolumeId).toBe("vol-111");

                    }
                );

                it(
                    "returns empty array when Volumes is undefined",
                    async () => {

                        ec2Mock.on(DescribeVolumesCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const volumes = await service.getVolumes();

                        expect(volumes).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getSecurityGroups",
            () => {

                it(
                    "returns security groups",
                    async () => {

                        ec2Mock.on(DescribeSecurityGroupsCommand).resolves({
                            "SecurityGroups": [
                                {"GroupId": "sg-111",
                                    "GroupName": "default"}
                            ]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const sgs = await service.getSecurityGroups();

                        expect(sgs).toHaveLength(1);
                        expect(sgs[0].GroupId).toBe("sg-111");

                    }
                );

                it(
                    "aggregates across pages",
                    async () => {

                        ec2Mock.on(DescribeSecurityGroupsCommand).
                            resolvesOnce({"SecurityGroups": [{"GroupId": "sg-1"}],
                                "NextToken": "t"}).
                            resolvesOnce({"SecurityGroups": [{"GroupId": "sg-2"}]});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const sgs = await service.getSecurityGroups();

                        expect(sgs).toHaveLength(2);

                    }
                );

            }
        );

        describe(
            "getVerifiedAccessInstances",
            () => {

                it(
                    "returns instances on success",
                    async () => {

                        ec2Mock.on(DescribeVerifiedAccessInstancesCommand).resolves({
                            "VerifiedAccessInstances": [{"VerifiedAccessInstanceId": "vai-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const instances = await service.getVerifiedAccessInstances();

                        expect(instances).toHaveLength(1);
                        expect(instances[0].VerifiedAccessInstanceId).toBe("vai-111");

                    }
                );

                it(
                    "returns empty array on error (unsupported region)",
                    async () => {

                        ec2Mock.on(DescribeVerifiedAccessInstancesCommand).rejects(new Error("UnsupportedOperation"));

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const instances = await service.getVerifiedAccessInstances();

                        expect(instances).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getAddresses",
            () => {

                it(
                    "returns addresses from response",
                    async () => {

                        ec2Mock.on(DescribeAddressesCommand).resolves({
                            "Addresses": [
                                {"AllocationId": "eipalloc-111",
                                    "PublicIp": "1.2.3.4"}
                            ]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const addresses = await service.getAddresses();

                        expect(addresses).toHaveLength(1);
                        expect(addresses[0].AllocationId).toBe("eipalloc-111");

                    }
                );

                it(
                    "returns empty array when Addresses is undefined",
                    async () => {

                        ec2Mock.on(DescribeAddressesCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const addresses = await service.getAddresses();

                        expect(addresses).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getClientVpnEndpoints",
            () => {

                it(
                    "returns client VPN endpoints from response",
                    async () => {

                        ec2Mock.on(DescribeClientVpnEndpointsCommand).resolves({
                            "ClientVpnEndpoints": [{"ClientVpnEndpointId": "cvpn-endpoint-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const endpoints = await service.getClientVpnEndpoints();

                        expect(endpoints).toHaveLength(1);
                        expect(endpoints[0].ClientVpnEndpointId).toBe("cvpn-endpoint-111");

                    }
                );

                it(
                    "returns empty array when ClientVpnEndpoints is undefined",
                    async () => {

                        ec2Mock.on(DescribeClientVpnEndpointsCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const endpoints = await service.getClientVpnEndpoints();

                        expect(endpoints).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getDhcpOptions",
            () => {

                it(
                    "returns DHCP options from response",
                    async () => {

                        ec2Mock.on(DescribeDhcpOptionsCommand).resolves({
                            "DhcpOptions": [{"DhcpOptionsId": "dopt-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const options = await service.getDhcpOptions();

                        expect(options).toHaveLength(1);
                        expect(options[0].DhcpOptionsId).toBe("dopt-111");

                    }
                );

                it(
                    "returns empty array when DhcpOptions is undefined",
                    async () => {

                        ec2Mock.on(DescribeDhcpOptionsCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const options = await service.getDhcpOptions();

                        expect(options).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getEgressOnlyInternetGateways",
            () => {

                it(
                    "returns egress-only internet gateways from response",
                    async () => {

                        ec2Mock.on(DescribeEgressOnlyInternetGatewaysCommand).resolves({
                            "EgressOnlyInternetGateways": [{"EgressOnlyInternetGatewayId": "eigw-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const gateways = await service.getEgressOnlyInternetGateways();

                        expect(gateways).toHaveLength(1);
                        expect(gateways[0].EgressOnlyInternetGatewayId).toBe("eigw-111");

                    }
                );

                it(
                    "returns empty array when EgressOnlyInternetGateways is undefined",
                    async () => {

                        ec2Mock.on(DescribeEgressOnlyInternetGatewaysCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const gateways = await service.getEgressOnlyInternetGateways();

                        expect(gateways).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getEnabledRegions",
            () => {

                it(
                    "returns regions from response",
                    async () => {

                        ec2Mock.on(DescribeRegionsCommand).resolves({
                            "Regions": [
                                {"RegionName": "us-east-1"},
                                {"RegionName": "eu-west-1"}
                            ]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const regions = await service.getEnabledRegions();

                        expect(regions).toHaveLength(2);
                        expect(regions[0].RegionName).toBe("us-east-1");

                    }
                );

                it(
                    "returns empty array when Regions is undefined",
                    async () => {

                        ec2Mock.on(DescribeRegionsCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const regions = await service.getEnabledRegions();

                        expect(regions).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getFleets",
            () => {

                it(
                    "returns fleets from response",
                    async () => {

                        ec2Mock.on(DescribeFleetsCommand).resolves({
                            "Fleets": [{"FleetId": "fleet-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const fleets = await service.getFleets();

                        expect(fleets).toHaveLength(1);
                        expect(fleets[0].FleetId).toBe("fleet-111");

                    }
                );

                it(
                    "returns empty array when Fleets is undefined",
                    async () => {

                        ec2Mock.on(DescribeFleetsCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const fleets = await service.getFleets();

                        expect(fleets).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getFlowLogs",
            () => {

                it(
                    "returns flow logs from response",
                    async () => {

                        ec2Mock.on(DescribeFlowLogsCommand).resolves({
                            "FlowLogs": [{"FlowLogId": "fl-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const logs = await service.getFlowLogs();

                        expect(logs).toHaveLength(1);
                        expect(logs[0].FlowLogId).toBe("fl-111");

                    }
                );

                it(
                    "returns empty array when FlowLogs is undefined",
                    async () => {

                        ec2Mock.on(DescribeFlowLogsCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const logs = await service.getFlowLogs();

                        expect(logs).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getImages",
            () => {

                it(
                    "returns images from response",
                    async () => {

                        ec2Mock.on(DescribeImagesCommand).resolves({
                            "Images": [{"ImageId": "ami-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const images = await service.getImages();

                        expect(images).toHaveLength(1);
                        expect(images[0].ImageId).toBe("ami-111");

                    }
                );

                it(
                    "returns empty array when Images is undefined",
                    async () => {

                        ec2Mock.on(DescribeImagesCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const images = await service.getImages();

                        expect(images).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getImagesInRecycleBin",
            () => {

                it(
                    "returns images from response",
                    async () => {

                        ec2Mock.on(ListImagesInRecycleBinCommand).resolves({
                            "Images": [{"ImageId": "ami-recycled-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const images = await service.getImagesInRecycleBin();

                        expect(images).toHaveLength(1);
                        expect(images[0].ImageId).toBe("ami-recycled-111");

                    }
                );

                it(
                    "returns empty array when Images is undefined",
                    async () => {

                        ec2Mock.on(ListImagesInRecycleBinCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const images = await service.getImagesInRecycleBin();

                        expect(images).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getInstanceConnectEndpoints",
            () => {

                it(
                    "returns instance connect endpoints from response",
                    async () => {

                        ec2Mock.on(DescribeInstanceConnectEndpointsCommand).resolves({
                            "InstanceConnectEndpoints": [{"InstanceConnectEndpointId": "ice-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const endpoints = await service.getInstanceConnectEndpoints();

                        expect(endpoints).toHaveLength(1);
                        expect(endpoints[0].InstanceConnectEndpointId).toBe("ice-111");

                    }
                );

                it(
                    "returns empty array when InstanceConnectEndpoints is undefined",
                    async () => {

                        ec2Mock.on(DescribeInstanceConnectEndpointsCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const endpoints = await service.getInstanceConnectEndpoints();

                        expect(endpoints).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getInternetGateways",
            () => {

                it(
                    "returns internet gateways from response",
                    async () => {

                        ec2Mock.on(DescribeInternetGatewaysCommand).resolves({
                            "InternetGateways": [{"InternetGatewayId": "igw-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const gateways = await service.getInternetGateways();

                        expect(gateways).toHaveLength(1);
                        expect(gateways[0].InternetGatewayId).toBe("igw-111");

                    }
                );

                it(
                    "returns empty array when InternetGateways is undefined",
                    async () => {

                        ec2Mock.on(DescribeInternetGatewaysCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const gateways = await service.getInternetGateways();

                        expect(gateways).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getKeyPairs",
            () => {

                it(
                    "returns key pairs from response",
                    async () => {

                        ec2Mock.on(DescribeKeyPairsCommand).resolves({
                            "KeyPairs": [
                                {"KeyPairId": "key-111",
                                    "KeyName": "my-key"}
                            ]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const keyPairs = await service.getKeyPairs();

                        expect(keyPairs).toHaveLength(1);
                        expect(keyPairs[0].KeyPairId).toBe("key-111");

                    }
                );

                it(
                    "returns empty array when KeyPairs is undefined",
                    async () => {

                        ec2Mock.on(DescribeKeyPairsCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const keyPairs = await service.getKeyPairs();

                        expect(keyPairs).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getLaunchTemplates",
            () => {

                it(
                    "returns launch templates from response",
                    async () => {

                        ec2Mock.on(DescribeLaunchTemplatesCommand).resolves({
                            "LaunchTemplates": [{"LaunchTemplateId": "lt-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const templates = await service.getLaunchTemplates();

                        expect(templates).toHaveLength(1);
                        expect(templates[0].LaunchTemplateId).toBe("lt-111");

                    }
                );

                it(
                    "returns empty array when LaunchTemplates is undefined",
                    async () => {

                        ec2Mock.on(DescribeLaunchTemplatesCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const templates = await service.getLaunchTemplates();

                        expect(templates).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getLocalGateways",
            () => {

                it(
                    "returns local gateways from response",
                    async () => {

                        ec2Mock.on(DescribeLocalGatewaysCommand).resolves({
                            "LocalGateways": [{"LocalGatewayId": "lgw-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const gateways = await service.getLocalGateways();

                        expect(gateways).toHaveLength(1);
                        expect(gateways[0].LocalGatewayId).toBe("lgw-111");

                    }
                );

                it(
                    "returns empty array when LocalGateways is undefined",
                    async () => {

                        ec2Mock.on(DescribeLocalGatewaysCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const gateways = await service.getLocalGateways();

                        expect(gateways).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getLocalGatewayRouteTables",
            () => {

                it(
                    "returns local gateway route tables from response",
                    async () => {

                        ec2Mock.on(DescribeLocalGatewayRouteTablesCommand).resolves({
                            "LocalGatewayRouteTables": [{"LocalGatewayRouteTableId": "lgw-rtb-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const tables = await service.getLocalGatewayRouteTables();

                        expect(tables).toHaveLength(1);
                        expect(tables[0].LocalGatewayRouteTableId).toBe("lgw-rtb-111");

                    }
                );

                it(
                    "returns empty array when LocalGatewayRouteTables is undefined",
                    async () => {

                        ec2Mock.on(DescribeLocalGatewayRouteTablesCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const tables = await service.getLocalGatewayRouteTables();

                        expect(tables).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getLocalGatewayRouteTableVpcAssociations",
            () => {

                it(
                    "returns associations from response",
                    async () => {

                        ec2Mock.on(DescribeLocalGatewayRouteTableVpcAssociationsCommand).resolves({
                            "LocalGatewayRouteTableVpcAssociations": [{"LocalGatewayRouteTableVpcAssociationId": "lgw-vpc-assoc-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const associations = await service.getLocalGatewayRouteTableVpcAssociations();

                        expect(associations).toHaveLength(1);
                        expect(associations[0].LocalGatewayRouteTableVpcAssociationId).toBe("lgw-vpc-assoc-111");

                    }
                );

                it(
                    "returns empty array when LocalGatewayRouteTableVpcAssociations is undefined",
                    async () => {

                        ec2Mock.on(DescribeLocalGatewayRouteTableVpcAssociationsCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const associations = await service.getLocalGatewayRouteTableVpcAssociations();

                        expect(associations).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getLocalGatewayVirtualInterfaces",
            () => {

                it(
                    "returns virtual interfaces from response",
                    async () => {

                        ec2Mock.on(DescribeLocalGatewayVirtualInterfacesCommand).resolves({
                            "LocalGatewayVirtualInterfaces": [{"LocalGatewayVirtualInterfaceId": "lgw-vif-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const interfaces = await service.getLocalGatewayVirtualInterfaces();

                        expect(interfaces).toHaveLength(1);
                        expect(interfaces[0].LocalGatewayVirtualInterfaceId).toBe("lgw-vif-111");

                    }
                );

                it(
                    "returns empty array when LocalGatewayVirtualInterfaces is undefined",
                    async () => {

                        ec2Mock.on(DescribeLocalGatewayVirtualInterfacesCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const interfaces = await service.getLocalGatewayVirtualInterfaces();

                        expect(interfaces).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getLocalGatewayVirtualInterfaceGroups",
            () => {

                it(
                    "returns virtual interface groups from response",
                    async () => {

                        ec2Mock.on(DescribeLocalGatewayVirtualInterfaceGroupsCommand).resolves({
                            "LocalGatewayVirtualInterfaceGroups": [{"LocalGatewayVirtualInterfaceGroupId": "lgw-vif-grp-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const groups = await service.getLocalGatewayVirtualInterfaceGroups();

                        expect(groups).toHaveLength(1);
                        expect(groups[0].LocalGatewayVirtualInterfaceGroupId).toBe("lgw-vif-grp-111");

                    }
                );

                it(
                    "returns empty array when LocalGatewayVirtualInterfaceGroups is undefined",
                    async () => {

                        ec2Mock.on(DescribeLocalGatewayVirtualInterfaceGroupsCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const groups = await service.getLocalGatewayVirtualInterfaceGroups();

                        expect(groups).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getManagedPrefixLists",
            () => {

                it(
                    "returns prefix lists from response",
                    async () => {

                        ec2Mock.on(DescribeManagedPrefixListsCommand).resolves({
                            "PrefixLists": [{"PrefixListId": "pl-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const lists = await service.getManagedPrefixLists();

                        expect(lists).toHaveLength(1);
                        expect(lists[0].PrefixListId).toBe("pl-111");

                    }
                );

                it(
                    "returns empty array when PrefixLists is undefined",
                    async () => {

                        ec2Mock.on(DescribeManagedPrefixListsCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const lists = await service.getManagedPrefixLists();

                        expect(lists).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getNatGateways",
            () => {

                it(
                    "returns NAT gateways from response",
                    async () => {

                        ec2Mock.on(DescribeNatGatewaysCommand).resolves({
                            "NatGateways": [{"NatGatewayId": "nat-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const gateways = await service.getNatGateways();

                        expect(gateways).toHaveLength(1);
                        expect(gateways[0].NatGatewayId).toBe("nat-111");

                    }
                );

                it(
                    "returns empty array when NatGateways is undefined",
                    async () => {

                        ec2Mock.on(DescribeNatGatewaysCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const gateways = await service.getNatGateways();

                        expect(gateways).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getNetworkAcls",
            () => {

                it(
                    "returns network ACLs from response",
                    async () => {

                        ec2Mock.on(DescribeNetworkAclsCommand).resolves({
                            "NetworkAcls": [{"NetworkAclId": "acl-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const acls = await service.getNetworkAcls();

                        expect(acls).toHaveLength(1);
                        expect(acls[0].NetworkAclId).toBe("acl-111");

                    }
                );

                it(
                    "returns empty array when NetworkAcls is undefined",
                    async () => {

                        ec2Mock.on(DescribeNetworkAclsCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const acls = await service.getNetworkAcls();

                        expect(acls).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getNetworkInterfaces",
            () => {

                it(
                    "returns network interfaces from response",
                    async () => {

                        ec2Mock.on(DescribeNetworkInterfacesCommand).resolves({
                            "NetworkInterfaces": [{"NetworkInterfaceId": "eni-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const interfaces = await service.getNetworkInterfaces();

                        expect(interfaces).toHaveLength(1);
                        expect(interfaces[0].NetworkInterfaceId).toBe("eni-111");

                    }
                );

                it(
                    "returns empty array when NetworkInterfaces is undefined",
                    async () => {

                        ec2Mock.on(DescribeNetworkInterfacesCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const interfaces = await service.getNetworkInterfaces();

                        expect(interfaces).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getRouteTables",
            () => {

                it(
                    "returns route tables from response",
                    async () => {

                        ec2Mock.on(DescribeRouteTablesCommand).resolves({
                            "RouteTables": [{"RouteTableId": "rtb-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const tables = await service.getRouteTables();

                        expect(tables).toHaveLength(1);
                        expect(tables[0].RouteTableId).toBe("rtb-111");

                    }
                );

                it(
                    "returns empty array when RouteTables is undefined",
                    async () => {

                        ec2Mock.on(DescribeRouteTablesCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const tables = await service.getRouteTables();

                        expect(tables).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getSecurityGroupRules",
            () => {

                it(
                    "returns security group rules from response",
                    async () => {

                        ec2Mock.on(DescribeSecurityGroupRulesCommand).resolves({
                            "SecurityGroupRules": [{"SecurityGroupRuleId": "sgr-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const rules = await service.getSecurityGroupRules();

                        expect(rules).toHaveLength(1);
                        expect(rules[0].SecurityGroupRuleId).toBe("sgr-111");

                    }
                );

                it(
                    "returns empty array when SecurityGroupRules is undefined",
                    async () => {

                        ec2Mock.on(DescribeSecurityGroupRulesCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const rules = await service.getSecurityGroupRules();

                        expect(rules).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getSnapshots",
            () => {

                it(
                    "returns snapshots from response",
                    async () => {

                        ec2Mock.on(DescribeSnapshotsCommand).resolves({
                            "Snapshots": [{"SnapshotId": "snap-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const snapshots = await service.getSnapshots();

                        expect(snapshots).toHaveLength(1);
                        expect(snapshots[0].SnapshotId).toBe("snap-111");

                    }
                );

                it(
                    "returns empty array when Snapshots is undefined",
                    async () => {

                        ec2Mock.on(DescribeSnapshotsCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const snapshots = await service.getSnapshots();

                        expect(snapshots).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getSnapshotsInRecycleBin",
            () => {

                it(
                    "returns snapshots from response",
                    async () => {

                        ec2Mock.on(ListSnapshotsInRecycleBinCommand).resolves({
                            "Snapshots": [{"SnapshotId": "snap-recycled-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const snapshots = await service.getSnapshotsInRecycleBin();

                        expect(snapshots).toHaveLength(1);
                        expect(snapshots[0].SnapshotId).toBe("snap-recycled-111");

                    }
                );

                it(
                    "returns empty array when Snapshots is undefined",
                    async () => {

                        ec2Mock.on(ListSnapshotsInRecycleBinCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const snapshots = await service.getSnapshotsInRecycleBin();

                        expect(snapshots).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getStaleSecurityGroups",
            () => {

                it(
                    "returns stale security groups from response",
                    async () => {

                        ec2Mock.on(DescribeStaleSecurityGroupsCommand).resolves({
                            "StaleSecurityGroupSet": [{"GroupId": "sg-stale-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const staleGroups = await service.getStaleSecurityGroups("vpc-111");

                        expect(staleGroups).toHaveLength(1);
                        expect(staleGroups[0].GroupId).toBe("sg-stale-111");

                    }
                );

                it(
                    "returns empty array when StaleSecurityGroupSet is undefined",
                    async () => {

                        ec2Mock.on(DescribeStaleSecurityGroupsCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const staleGroups = await service.getStaleSecurityGroups("vpc-111");

                        expect(staleGroups).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getTrafficMirrorFilters",
            () => {

                it(
                    "returns traffic mirror filters from response",
                    async () => {

                        ec2Mock.on(DescribeTrafficMirrorFiltersCommand).resolves({
                            "TrafficMirrorFilters": [{"TrafficMirrorFilterId": "tmf-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const filters = await service.getTrafficMirrorFilters();

                        expect(filters).toHaveLength(1);
                        expect(filters[0].TrafficMirrorFilterId).toBe("tmf-111");

                    }
                );

                it(
                    "returns empty array when TrafficMirrorFilters is undefined",
                    async () => {

                        ec2Mock.on(DescribeTrafficMirrorFiltersCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const filters = await service.getTrafficMirrorFilters();

                        expect(filters).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getTrafficMirrorSessions",
            () => {

                it(
                    "returns traffic mirror sessions from response",
                    async () => {

                        ec2Mock.on(DescribeTrafficMirrorSessionsCommand).resolves({
                            "TrafficMirrorSessions": [{"TrafficMirrorSessionId": "tms-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const sessions = await service.getTrafficMirrorSessions();

                        expect(sessions).toHaveLength(1);
                        expect(sessions[0].TrafficMirrorSessionId).toBe("tms-111");

                    }
                );

                it(
                    "returns empty array when TrafficMirrorSessions is undefined",
                    async () => {

                        ec2Mock.on(DescribeTrafficMirrorSessionsCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const sessions = await service.getTrafficMirrorSessions();

                        expect(sessions).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getTrafficMirrorTargets",
            () => {

                it(
                    "returns traffic mirror targets from response",
                    async () => {

                        ec2Mock.on(DescribeTrafficMirrorTargetsCommand).resolves({
                            "TrafficMirrorTargets": [{"TrafficMirrorTargetId": "tmt-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const targets = await service.getTrafficMirrorTargets();

                        expect(targets).toHaveLength(1);
                        expect(targets[0].TrafficMirrorTargetId).toBe("tmt-111");

                    }
                );

                it(
                    "returns empty array when TrafficMirrorTargets is undefined",
                    async () => {

                        ec2Mock.on(DescribeTrafficMirrorTargetsCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const targets = await service.getTrafficMirrorTargets();

                        expect(targets).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getTransitGateways",
            () => {

                it(
                    "returns transit gateways from response",
                    async () => {

                        ec2Mock.on(DescribeTransitGatewaysCommand).resolves({
                            "TransitGateways": [{"TransitGatewayId": "tgw-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const gateways = await service.getTransitGateways();

                        expect(gateways).toHaveLength(1);
                        expect(gateways[0].TransitGatewayId).toBe("tgw-111");

                    }
                );

                it(
                    "returns empty array when TransitGateways is undefined",
                    async () => {

                        ec2Mock.on(DescribeTransitGatewaysCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const gateways = await service.getTransitGateways();

                        expect(gateways).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getTransitGatewayAttachments",
            () => {

                it(
                    "returns transit gateway attachments from response",
                    async () => {

                        ec2Mock.on(DescribeTransitGatewayAttachmentsCommand).resolves({
                            "TransitGatewayAttachments": [{"TransitGatewayAttachmentId": "tgw-attach-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const attachments = await service.getTransitGatewayAttachments();

                        expect(attachments).toHaveLength(1);
                        expect(attachments[0].TransitGatewayAttachmentId).toBe("tgw-attach-111");

                    }
                );

                it(
                    "returns empty array when TransitGatewayAttachments is undefined",
                    async () => {

                        ec2Mock.on(DescribeTransitGatewayAttachmentsCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const attachments = await service.getTransitGatewayAttachments();

                        expect(attachments).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getTransitGatewayConnects",
            () => {

                it(
                    "returns transit gateway connects from response",
                    async () => {

                        ec2Mock.on(DescribeTransitGatewayConnectsCommand).resolves({
                            "TransitGatewayConnects": [{"TransitGatewayAttachmentId": "tgw-connect-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const connects = await service.getTransitGatewayConnects();

                        expect(connects).toHaveLength(1);
                        expect(connects[0].TransitGatewayAttachmentId).toBe("tgw-connect-111");

                    }
                );

                it(
                    "returns empty array when TransitGatewayConnects is undefined",
                    async () => {

                        ec2Mock.on(DescribeTransitGatewayConnectsCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const connects = await service.getTransitGatewayConnects();

                        expect(connects).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getTransitGatewayConnectPeers",
            () => {

                it(
                    "returns transit gateway connect peers from response",
                    async () => {

                        ec2Mock.on(DescribeTransitGatewayConnectPeersCommand).resolves({
                            "TransitGatewayConnectPeers": [{"TransitGatewayConnectPeerId": "tgw-peer-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const peers = await service.getTransitGatewayConnectPeers();

                        expect(peers).toHaveLength(1);
                        expect(peers[0].TransitGatewayConnectPeerId).toBe("tgw-peer-111");

                    }
                );

                it(
                    "returns empty array when TransitGatewayConnectPeers is undefined",
                    async () => {

                        ec2Mock.on(DescribeTransitGatewayConnectPeersCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const peers = await service.getTransitGatewayConnectPeers();

                        expect(peers).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getTransitGatewayPeeringAttachments",
            () => {

                it(
                    "returns transit gateway peering attachments from response",
                    async () => {

                        ec2Mock.on(DescribeTransitGatewayPeeringAttachmentsCommand).resolves({
                            "TransitGatewayPeeringAttachments": [{"TransitGatewayAttachmentId": "tgw-peering-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const attachments = await service.getTransitGatewayPeeringAttachments();

                        expect(attachments).toHaveLength(1);
                        expect(attachments[0].TransitGatewayAttachmentId).toBe("tgw-peering-111");

                    }
                );

                it(
                    "returns empty array when TransitGatewayPeeringAttachments is undefined",
                    async () => {

                        ec2Mock.on(DescribeTransitGatewayPeeringAttachmentsCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const attachments = await service.getTransitGatewayPeeringAttachments();

                        expect(attachments).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getTransitGatewayRouteTables",
            () => {

                it(
                    "returns transit gateway route tables from response",
                    async () => {

                        ec2Mock.on(DescribeTransitGatewayRouteTablesCommand).resolves({
                            "TransitGatewayRouteTables": [{"TransitGatewayRouteTableId": "tgw-rtb-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const tables = await service.getTransitGatewayRouteTables();

                        expect(tables).toHaveLength(1);
                        expect(tables[0].TransitGatewayRouteTableId).toBe("tgw-rtb-111");

                    }
                );

                it(
                    "returns empty array when TransitGatewayRouteTables is undefined",
                    async () => {

                        ec2Mock.on(DescribeTransitGatewayRouteTablesCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const tables = await service.getTransitGatewayRouteTables();

                        expect(tables).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getTransitGatewayVpcAttachments",
            () => {

                it(
                    "returns transit gateway VPC attachments from response",
                    async () => {

                        ec2Mock.on(DescribeTransitGatewayVpcAttachmentsCommand).resolves({
                            "TransitGatewayVpcAttachments": [{"TransitGatewayAttachmentId": "tgw-vpc-attach-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const attachments = await service.getTransitGatewayVpcAttachments();

                        expect(attachments).toHaveLength(1);
                        expect(attachments[0].TransitGatewayAttachmentId).toBe("tgw-vpc-attach-111");

                    }
                );

                it(
                    "returns empty array when TransitGatewayVpcAttachments is undefined",
                    async () => {

                        ec2Mock.on(DescribeTransitGatewayVpcAttachmentsCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const attachments = await service.getTransitGatewayVpcAttachments();

                        expect(attachments).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getVerifiedAccessEndpoints",
            () => {

                it(
                    "returns endpoints on success",
                    async () => {

                        ec2Mock.on(DescribeVerifiedAccessEndpointsCommand).resolves({
                            "VerifiedAccessEndpoints": [{"VerifiedAccessEndpointId": "vae-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const endpoints = await service.getVerifiedAccessEndpoints();

                        expect(endpoints).toHaveLength(1);
                        expect(endpoints[0].VerifiedAccessEndpointId).toBe("vae-111");

                    }
                );

                it(
                    "returns empty array on error (unsupported region)",
                    async () => {

                        ec2Mock.on(DescribeVerifiedAccessEndpointsCommand).rejects(new Error("UnsupportedOperation"));

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const endpoints = await service.getVerifiedAccessEndpoints();

                        expect(endpoints).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getVerifiedAccessGroups",
            () => {

                it(
                    "returns groups on success",
                    async () => {

                        ec2Mock.on(DescribeVerifiedAccessGroupsCommand).resolves({
                            "VerifiedAccessGroups": [{"VerifiedAccessGroupId": "vag-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const groups = await service.getVerifiedAccessGroups();

                        expect(groups).toHaveLength(1);
                        expect(groups[0].VerifiedAccessGroupId).toBe("vag-111");

                    }
                );

                it(
                    "returns empty array on error (unsupported region)",
                    async () => {

                        ec2Mock.on(DescribeVerifiedAccessGroupsCommand).rejects(new Error("UnsupportedOperation"));

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const groups = await service.getVerifiedAccessGroups();

                        expect(groups).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getVerifiedAccessTrustProviders",
            () => {

                it(
                    "returns trust providers on success",
                    async () => {

                        ec2Mock.on(DescribeVerifiedAccessTrustProvidersCommand).resolves({
                            "VerifiedAccessTrustProviders": [{"VerifiedAccessTrustProviderId": "vatp-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const providers = await service.getVerifiedAccessTrustProviders();

                        expect(providers).toHaveLength(1);
                        expect(providers[0].VerifiedAccessTrustProviderId).toBe("vatp-111");

                    }
                );

                it(
                    "returns empty array on error (unsupported region)",
                    async () => {

                        ec2Mock.on(DescribeVerifiedAccessTrustProvidersCommand).rejects(new Error("UnsupportedOperation"));

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const providers = await service.getVerifiedAccessTrustProviders();

                        expect(providers).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getVpcEndpoints",
            () => {

                it(
                    "returns VPC endpoints from response",
                    async () => {

                        ec2Mock.on(DescribeVpcEndpointsCommand).resolves({
                            "VpcEndpoints": [{"VpcEndpointId": "vpce-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const endpoints = await service.getVpcEndpoints();

                        expect(endpoints).toHaveLength(1);
                        expect(endpoints[0].VpcEndpointId).toBe("vpce-111");

                    }
                );

                it(
                    "returns empty array when VpcEndpoints is undefined",
                    async () => {

                        ec2Mock.on(DescribeVpcEndpointsCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const endpoints = await service.getVpcEndpoints();

                        expect(endpoints).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getVpcEndpointServiceConfigurations",
            () => {

                it(
                    "returns service configurations from response",
                    async () => {

                        ec2Mock.on(DescribeVpcEndpointServiceConfigurationsCommand).resolves({
                            "ServiceConfigurations": [{"ServiceId": "vpce-svc-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const configs = await service.getVpcEndpointServiceConfigurations();

                        expect(configs).toHaveLength(1);
                        expect(configs[0].ServiceId).toBe("vpce-svc-111");

                    }
                );

                it(
                    "returns empty array when ServiceConfigurations is undefined",
                    async () => {

                        ec2Mock.on(DescribeVpcEndpointServiceConfigurationsCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const configs = await service.getVpcEndpointServiceConfigurations();

                        expect(configs).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getVpcPeeringConnections",
            () => {

                it(
                    "returns VPC peering connections from response",
                    async () => {

                        ec2Mock.on(DescribeVpcPeeringConnectionsCommand).resolves({
                            "VpcPeeringConnections": [{"VpcPeeringConnectionId": "pcx-111"}]
                        });

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const connections = await service.getVpcPeeringConnections();

                        expect(connections).toHaveLength(1);
                        expect(connections[0].VpcPeeringConnectionId).toBe("pcx-111");

                    }
                );

                it(
                    "returns empty array when VpcPeeringConnections is undefined",
                    async () => {

                        ec2Mock.on(DescribeVpcPeeringConnectionsCommand).resolves({});

                        const service = new Ec2Service(
                            creds,
                            "us-east-1"
                        );
                        const connections = await service.getVpcPeeringConnections();

                        expect(connections).toEqual([]);

                    }
                );

            }
        );

    }
);

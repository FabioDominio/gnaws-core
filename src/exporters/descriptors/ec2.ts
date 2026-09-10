import {describe, nameTag, boolStr} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const ec2Descriptors: DescriptorGroup = [

    describe({
        "resourceType": "vpc",
        "scope": "regional",
        "list": (inv, region) => inv.getVpcsByRegion(region),
        "id": (v) => v.VpcId,
        "name": (v) => nameTag(v.Tags),
        "tags": (v) => v.Tags,
        "columns": [
            {"label": "CIDR",
                "value": (v) => v.CidrBlock}
        ]
    }),
    describe({
        "resourceType": "subnet",
        "scope": "regional",
        "list": (inv, region) => inv.getSubnetsByRegion(region),
        "id": (s) => s.SubnetId,
        "name": (s) => nameTag(s.Tags),
        "tags": (s) => s.Tags,
        "columns": [
            {"label": "VPC ID",
                "value": (s) => s.VpcId},
            {"label": "AZ",
                "value": (s) => s.AvailabilityZone},
            {"label": "CIDR",
                "value": (s) => s.CidrBlock}
        ]
    }),
    describe({
        "resourceType": "securitygroup",
        "scope": "regional",
        "list": (inv, region) => inv.getSecurityGroupsByRegion(region),
        "id": (sg) => sg.GroupId,
        "name": (sg) => sg.GroupName,
        "tags": (sg) => sg.Tags,
        "columns": [
            {"label": "VPC ID",
                "value": (sg) => sg.VpcId},
            {"label": "Description",
                "value": (sg) => sg.Description}
        ]
    }),
    describe({
        "resourceType": "networkinterface",
        "scope": "regional",
        "list": (inv, region) => inv.getNetworkInterfacesByRegion(region),
        "id": (eni) => eni.NetworkInterfaceId,
        "name": (eni) => nameTag(eni.TagSet),
        "tags": (eni) => eni.TagSet,
        "columns": [
            {"label": "Subnet ID",
                "value": (eni) => eni.SubnetId},
            {"label": "VPC ID",
                "value": (eni) => eni.VpcId},
            {"label": "Type",
                "value": (eni) => eni.InterfaceType},
            {"label": "Instance ID",
                "value": (eni) => eni.Attachment?.InstanceId},
            {"label": "Private IP",
                "value": (eni) => eni.PrivateIpAddress}
        ]
    }),
    describe({
        "resourceType": "internetgateway",
        "scope": "regional",
        "list": (inv, region) => inv.getInternetGatewaysByRegion(region),
        "id": (igw) => igw.InternetGatewayId,
        "name": (igw) => nameTag(igw.Tags),
        "tags": (igw) => igw.Tags,
        "columns": [
            {"label": "Owner ID",
                "value": (igw) => igw.OwnerId},
            {"label": "Attached VPC",
                "value": (igw) => igw.Attachments?.[0]?.VpcId},
            {"label": "State",
                "value": (igw) => igw.Attachments?.[0]?.State}
        ]
    }),
    describe({
        "resourceType": "egressonlyinternetgateway",
        "scope": "regional",
        "list": (inv, region) => inv.getEgressOnlyInternetGatewaysByRegion(region),
        "id": (igw) => igw.EgressOnlyInternetGatewayId,
        "name": (igw) => nameTag(igw.Tags),
        "tags": (igw) => igw.Tags,
        "columns": [
            {"label": "Attached VPC",
                "value": (igw) => igw.Attachments?.[0]?.VpcId},
            {"label": "State",
                "value": (igw) => igw.Attachments?.[0]?.State}
        ]
    }),
    describe({
        "resourceType": "natgateway",
        "scope": "regional",
        "list": (inv, region) => inv.getNatGatewaysByRegion(region),
        "id": (nat) => nat.NatGatewayId,
        "name": (nat) => nameTag(nat.Tags),
        "tags": (nat) => nat.Tags,
        "columns": [
            {"label": "Type",
                "value": (nat) => nat.ConnectivityType},
            {"label": "Subnet ID",
                "value": (nat) => nat.SubnetId},
            {"label": "VPC ID",
                "value": (nat) => nat.VpcId}
        ]
    }),
    describe({
        "resourceType": "routetable",
        "scope": "regional",
        "list": (inv, region) => inv.getRouteTablesByRegion(region),
        "id": (rt) => rt.RouteTableId,
        "name": (rt) => nameTag(rt.Tags) ?? rt.RouteTableId,
        "tags": (rt) => rt.Tags,
        "columns": [
            {"label": "VPC ID",
                "value": (rt) => rt.VpcId},
            {"label": "Owner ID",
                "value": (rt) => rt.OwnerId},
            {"label": "Associations",
                "value": (rt) => rt.Associations?.length.toString()},
            {"label": "Routes",
                "value": (rt) => rt.Routes?.length.toString()}
        ]
    }),
    describe({
        "resourceType": "volume",
        "scope": "regional",
        "list": (inv, region) => inv.getVolumesByRegion(region),
        "id": (vol) => vol.VolumeId,
        "name": (vol) => nameTag(vol.Tags),
        "tags": (vol) => vol.Tags,
        "columns": [
            {"label": "Size (GB)",
                "value": (vol) => vol.Size?.toString()},
            {"label": "Type",
                "value": (vol) => vol.VolumeType},
            {"label": "State",
                "value": (vol) => vol.State}
        ]
    }),
    describe({
        "resourceType": "instance",
        "scope": "regional",
        "list": (inv, region) => inv.getInstancesByRegion(region),
        "id": (i) => i.InstanceId,
        "name": (i) => nameTag(i.Tags),
        "tags": (i) => i.Tags,
        "columns": [
            {"label": "Type",
                "value": (i) => i.InstanceType},
            {"label": "State",
                "value": (i) => i.State?.Name},
            {"label": "Private IP",
                "value": (i) => i.PrivateIpAddress},
            {"label": "Subnet ID",
                "value": (i) => i.SubnetId}
        ]
    }),
    describe({
        "resourceType": "vpcendpoint",
        "scope": "regional",
        "list": (inv, region) => inv.getVpcEndpointsByRegion(region),
        "id": (e) => e.VpcEndpointId,
        "name": (e) => nameTag(e.Tags) ?? e.ServiceName ?? e.VpcEndpointId,
        "tags": (e) => e.Tags,
        "columns": [
            {"label": "Type",
                "value": (e) => e.VpcEndpointType},
            {"label": "Service",
                "value": (e) => e.ServiceName},
            {"label": "VPC ID",
                "value": (e) => e.VpcId},
            {"label": "State",
                "value": (e) => e.State}
        ]
    }),
    describe({
        "resourceType": "elasticip",
        "scope": "regional",
        "list": (inv, region) => inv.getAddressesByRegion(region),
        "id": (a) => a.AllocationId ?? a.PublicIp,
        "name": (a) => nameTag(a.Tags) ?? a.PublicIp,
        "tags": (a) => a.Tags,
        "columns": [
            {"label": "Public IP",
                "value": (a) => a.PublicIp},
            {"label": "Private IP",
                "value": (a) => a.PrivateIpAddress},
            {"label": "Instance ID",
                "value": (a) => a.InstanceId},
            {"label": "ENI ID",
                "value": (a) => a.NetworkInterfaceId}
        ]
    }),
    describe({
        "resourceType": "flowlog",
        "scope": "regional",
        "list": (inv, region) => inv.getFlowLogsByRegion(region),
        "id": (fl) => fl.FlowLogId,
        "name": (fl) => nameTag(fl.Tags) ?? fl.FlowLogId,
        "tags": (fl) => fl.Tags,
        "columns": [
            {"label": "Resource ID",
                "value": (fl) => fl.ResourceId},
            {"label": "Traffic Type",
                "value": (fl) => fl.TrafficType},
            {"label": "Destination Type",
                "value": (fl) => fl.LogDestinationType},
            {"label": "Status",
                "value": (fl) => fl.FlowLogStatus}
        ]
    }),
    describe({
        "resourceType": "dhcpoptions",
        "scope": "regional",
        "list": (inv, region) => inv.getDhcpOptionsByRegion(region),
        "id": (dhcp) => dhcp.DhcpOptionsId,
        "name": (dhcp) => nameTag(dhcp.Tags) ?? dhcp.DhcpOptionsId,
        "tags": (dhcp) => dhcp.Tags,
        "columns": [
            {"label": "Owner ID",
                "value": (dhcp) => dhcp.OwnerId},
            {"label": "Configurations",
                "value": (dhcp) => dhcp.DhcpConfigurations?.length.toString()}
        ]
    }),
    describe({
        "resourceType": "prefixlist",
        "scope": "regional",
        "list": (inv, region) => inv.getManagedPrefixListsByRegion(region),
        "id": (p) => p.PrefixListId,
        "name": (p) => p.PrefixListName ?? p.PrefixListId,
        "columns": [
            {"label": "Address Family",
                "value": (p) => p.AddressFamily},
            {"label": "State",
                "value": (p) => p.State},
            {"label": "Max Entries",
                "value": (p) => p.MaxEntries?.toString()}
        ]
    }),
    describe({
        "resourceType": "vpcpeering",
        "scope": "regional",
        "list": (inv, region) => inv.getVpcPeeringConnectionsByRegion(region),
        "id": (p) => p.VpcPeeringConnectionId,
        "name": (p) => nameTag(p.Tags) ?? p.VpcPeeringConnectionId,
        "tags": (p) => p.Tags,
        "columns": [
            {"label": "Status",
                "value": (p) => p.Status?.Code},
            {"label": "Requester VPC",
                "value": (p) => p.RequesterVpcInfo?.VpcId},
            {"label": "Accepter VPC",
                "value": (p) => p.AccepterVpcInfo?.VpcId}
        ]
    }),
    describe({
        "resourceType": "launchtemplate",
        "scope": "regional",
        "list": (inv, region) => inv.getLaunchTemplatesByRegion(region),
        "id": (t) => t.LaunchTemplateId,
        "name": (t) => t.LaunchTemplateName ?? t.LaunchTemplateId,
        "columns": [
            {"label": "Default Version",
                "value": (t) => t.DefaultVersionNumber?.toString()},
            {"label": "Latest Version",
                "value": (t) => t.LatestVersionNumber?.toString()},
            {"label": "Created By",
                "value": (t) => t.CreatedBy}
        ]
    }),
    describe({
        "resourceType": "transitgateway",
        "scope": "regional",
        "list": (inv, region) => inv.getTransitGatewaysByRegion(region),
        "id": (t) => t.TransitGatewayId,
        "name": (t) => nameTag(t.Tags) ?? t.TransitGatewayId,
        "tags": (t) => t.Tags,
        "columns": [
            {"label": "State",
                "value": (t) => t.State},
            {"label": "Owner ID",
                "value": (t) => t.OwnerId},
            {"label": "Description",
                "value": (t) => t.Description}
        ]
    }),
    describe({
        "resourceType": "networkacl",
        "scope": "regional",
        "list": (inv, region) => inv.getNetworkAclsByRegion(region),
        "id": (n) => n.NetworkAclId,
        "name": (n) => nameTag(n.Tags) ?? n.NetworkAclId,
        "tags": (n) => n.Tags,
        "columns": [
            {"label": "VPC ID",
                "value": (n) => n.VpcId},
            {"label": "Default",
                "value": (n) => boolStr(n.IsDefault)},
            {"label": "Associations",
                "value": (n) => n.Associations?.length.toString()}
        ]
    }),
    describe({
        "resourceType": "ami",
        "scope": "regional",
        "list": (inv, region) => inv.getImagesByRegion(region),
        "id": (i) => i.ImageId,
        "name": (i) => nameTag(i.Tags) ?? i.Name ?? i.ImageId,
        "tags": (i) => i.Tags,
        "columns": [
            {"label": "State",
                "value": (i) => i.State},
            {"label": "Architecture",
                "value": (i) => i.Architecture},
            {"label": "Type",
                "value": (i) => i.ImageType},
            {"label": "Created",
                "value": (i) => i.CreationDate}
        ]
    }),
    describe({
        "resourceType": "snapshot",
        "scope": "regional",
        "list": (inv, region) => inv.getSnapshotsByRegion(region),
        "id": (s) => s.SnapshotId,
        "name": (s) => nameTag(s.Tags) ?? s.SnapshotId,
        "tags": (s) => s.Tags,
        "columns": [
            {"label": "Volume ID",
                "value": (s) => s.VolumeId},
            {"label": "Size (GB)",
                "value": (s) => s.VolumeSize?.toString()},
            {"label": "State",
                "value": (s) => s.State},
            {"label": "Encrypted",
                "value": (s) => boolStr(s.Encrypted)}
        ]
    }),
    describe({
        "resourceType": "keypair",
        "scope": "regional",
        "list": (inv, region) => inv.getKeyPairsByRegion(region),
        "id": (k) => k.KeyPairId,
        "name": (k) => k.KeyName ?? k.KeyPairId,
        "tags": (k) => k.Tags,
        "columns": [
            {"label": "Type",
                "value": (k) => k.KeyType},
            {"label": "Fingerprint",
                "value": (k) => k.KeyFingerprint}
        ]
    })

];

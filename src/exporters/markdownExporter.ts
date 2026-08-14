import {writeFileSync} from "node:fs";
import type {Inventory} from "../inventory.js";
import type {Tag, GroupIdentifier, InternetGatewayAttachment} from "@aws-sdk/client-ec2";
import type {Tag as IamTag} from "@aws-sdk/client-iam";
import type {DirectedGraph} from "graphology";
import type {Exporter} from "./exporter.js";

export class MarkdownExporter implements Exporter {

    /**
     * Export the resources to a .md file
     */
    export (outputPath: string, inventory: Inventory, _graph?: DirectedGraph): void {

        const md = this.#generate(inventory);
        writeFileSync(
            outputPath,
            md
        );

    }

    #generate (inventory: Inventory): string {

        // Generate markdown
        let md = "# AWS resources\n\n## Regions\n\n### Global\n\n";
        md += "#### IAM\n\n";
        md += "##### User groups\n\n";
        md += "Id|Name|Creation date|\n";
        md += "|:-|:-|:-|\n";
        for (const group of inventory.getUserGroups()) {

            md += `|${group.GroupId ?? ""}|${group.GroupName ?? ""}|${
                String(group.CreateDate ?? "")}|\n`;

        }
        md += "\n##### Users\n\n";
        md += "Id|Name|Creation date|Password last used date|Tags|\n";
        md += "|:-|:-|:-|:-|:-|\n";
        for (const user of inventory.getUsers()) {

            md += `|${user.UserId ?? ""}|${user.UserName ?? ""}|${
                String(user.CreateDate ?? "")}|${
                String(user.PasswordLastUsed ?? "")}|${
                user.Tags?.map((tag: IamTag) => `${tag.Key ?? ""}: ${tag.Value ?? ""}`).join("; ") ?? ""}|\n`;

        }
        md += "\n##### Roles\n\n";
        md += "|Id|Name|Creation date|Last used date|Tags|\n";
        md += "|:-|:-|:-|:-|:-|\n";
        for (const role of inventory.getRoles()) {

            md += `|${role.RoleId ?? ""}|${role.RoleName ?? ""}|${
                String(role.CreateDate ?? "")}|${
                String(role.RoleLastUsed?.LastUsedDate ?? "")}|${
                role.Tags?.map((tag: IamTag) => `${tag.Key ?? ""}: ${tag.Value ?? ""}`).join("; ") ?? ""}|\n`;

        }
        md += "\n##### Policies\n\n";
        md += "|Id|Name|Description|Last update|Attachment #|Tags|\n";
        md += "|:-|:-|:-|:-|:-|:-|\n";
        for (const policy of inventory.getPolicies()) {

            md += `|${policy.PolicyId ?? ""}|${policy.PolicyName ?? ""}|${
                policy.Description ?? ""}|${
                String(policy.UpdateDate ?? "")}|${
                policy.AttachmentCount?.toString() ?? ""}|${
                policy.Tags?.map((tag: IamTag) => `${tag.Key ?? ""}: ${tag.Value ?? ""}`).join("; ") ?? ""}|\n`;

        }
        for (const region of inventory.getAccountRegions()) {

            if (!region.RegionName) {

                continue;

            }

            md += `\n### Region ${region.RegionName}\n\n`;
            md += "#### EC2\n\n";
            md += "##### Vpcs\n\n";
            md += "|Id|Name|Cidr|Tags|\n";
            md += "|:-|:-|:-|:-|\n";
            for (const vpc of inventory.getVpcsByRegion(region.RegionName)) {

                md += `|${vpc.VpcId ?? ""}|${vpc.Tags?.find((tag: Tag) => tag.Key == "Name")?.Value ?? ""
                }|${vpc.CidrBlock ?? ""}|${
                    vpc.Tags?.map((tag: Tag) => `${tag.Key ?? ""}: ${tag.Value ?? ""}`).join("; ") ?? ""}|\n`;

            }
            md += "\n##### Subnets\n\n";
            md += "|Id|Name|Vpc ID|Availability zone ID|Cidr|Tags|\n";
            md += "|:-|:-|:-|:-|:-|:-|\n";
            for (const subnet of inventory.getSubnetsByRegion(region.RegionName)) {

                md += `|${subnet.SubnetId ?? ""}|${subnet.Tags?.find((tag: Tag) => tag.Key == "Name")?.Value ?? ""
                }|${subnet.VpcId ?? ""}|${
                    subnet.AvailabilityZone ?? ""}|${subnet.CidrBlock ?? ""}|${
                    subnet.Tags?.map((tag: Tag) => `${tag.Key ?? ""}: ${tag.Value ?? ""}`).join("; ") ?? ""}|\n`;

            }
            md += "\n##### Security groups\n\n";
            md += "|Id|Name|Description|Vpc ID|Tags|\n";
            md += "|:-|:-|:-|:-|:-|\n";
            for (const securityGroup of inventory.getSecurityGroupsByRegion(region.RegionName)) {

                md += `|${securityGroup.GroupId ?? ""}|${securityGroup.GroupName ?? ""}|${
                    securityGroup.Description ?? ""}|${securityGroup.VpcId ?? ""}|${
                    securityGroup.Tags?.map((tag: Tag) => `${tag.Key ?? ""}: ${
                        tag.Value ?? ""}`).join("; ") ?? ""}|\n`;

            }
            md += "\n##### Network interfaces\n\n";
            md += "|Id|Subnet ID|Vpc ID|Avaliability zone|Security groups|Type|Description|EC2 instance ID|Status|Public ip| Private Ip|Tags|\n";
            md += "|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|\n";
            for (const networkInterface of inventory.getNetworkInterfacesByRegion(region.RegionName)) {

                md += `|${networkInterface.NetworkInterfaceId ?? ""}|${
                    networkInterface.SubnetId ?? ""}|${
                    networkInterface.VpcId ?? ""}|${
                    networkInterface.AvailabilityZone ?? ""}|${
                    networkInterface.Groups?.map((group: GroupIdentifier) => group.GroupName).join(", ") ?? ""}|${
                    networkInterface.InterfaceType ?? ""}|${
                    networkInterface.Description ?? ""}|${
                    networkInterface.Attachment?.InstanceId ?? ""}|${
                    networkInterface.Status ?? ""}|${
                    networkInterface.Association?.PublicIp ?? ""}|${
                    networkInterface.PrivateIpAddress ?? ""
                }|${
                    networkInterface.TagSet?.map((tag: Tag) => `${tag.Key ?? ""}: ${
                        tag.Value ?? ""}`).join("; ") ?? ""}|\n`;

            }
            md += "\n##### Internet gateways\n\n";
            md += "|Id|Vpc IDs|Tags|\n";
            md += "|:-|:-|:-|\n";
            for (const gateway of inventory.getInternetGatewaysByRegion(region.RegionName)) {

                md += `|${gateway.InternetGatewayId ?? ""}|${
                    gateway.Attachments?.map((attachment: InternetGatewayAttachment) => attachment.VpcId).
                        join(", ") ?? ""}|${
                    gateway.Tags?.map((tag: Tag) => `${tag.Key ?? ""}: ${
                        tag.Value ?? ""}`).join("; ") ?? ""}|\n`;

            }
            md += "\n##### Egress only Internet gateways\n\n";
            md += "|Id|Vpc IDs|Tags|\n";
            md += "|:-|:-|:-|\n";
            for (const gateway of inventory.getEgressOnlyInternetGatewaysByRegion(region.RegionName)) {

                md += `|${gateway.EgressOnlyInternetGatewayId ?? ""}|${
                    gateway.Attachments?.map((attachment: InternetGatewayAttachment) => attachment.VpcId).
                        join(", ") ?? ""}|${
                    gateway.Tags?.map((tag: Tag) => `${tag.Key ?? ""}: ${
                        tag.Value ?? ""}`).join("; ") ?? ""}|\n`;

            }
            md += "\n##### Nat gateways\n\n";
            md += "|Id|Type|Subnet ID|Vpc ID|Private ip|Public ip|Network interface ID|Creation time|Tags|\n";
            md += "|:-|:-|:-|:-|:-|:-|:-|:-|:-|\n";
            for (const gateway of inventory.getNatGatewaysByRegion(region.RegionName)) {

                md += `|${gateway.NatGatewayId ?? ""}|${
                    gateway.ConnectivityType ?? ""}|${gateway.SubnetId ?? ""}|${
                    gateway.VpcId ?? ""}|${
                    gateway.NatGatewayAddresses?.map((address) => address.PrivateIp).join(", ") ?? ""}|${gateway.
                    NatGatewayAddresses?.map((address) => address.PublicIp).
                    join(", ") ?? ""}|${gateway.
                    NatGatewayAddresses?.map((address) => address.
                        NetworkInterfaceId).join(", ") ?? ""}|${
                    String(gateway.CreateTime ?? "")}|${
                    gateway.Tags?.map((tag: Tag) => `${tag.Key ?? ""}: ${
                        tag.Value ?? ""}`).join("; ") ?? ""}|\n`;

            }

            /*
             *
             *  const natGateways = [];
             *  const lambdas = [];
             */

        }
        return md;

    }

}

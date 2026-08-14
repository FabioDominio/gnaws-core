import type {FirewallPolicyMetadata, RuleGroupMetadata} from "@aws-sdk/client-network-firewall";

export interface NetworkFirewallInfo {
    "firewallArn": string;
    "firewallName": string;
    "vpcId"?: string;
    "subnetMappings"?: string[];
}

export interface NetworkFirewall {
    getFirewalls (): Promise<NetworkFirewallInfo[]>;
    getFirewallPolicies (): Promise<FirewallPolicyMetadata[]>;
    getRuleGroups (): Promise<RuleGroupMetadata[]>;
}

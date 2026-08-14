import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type FirewallMetadata,
    type FirewallPolicyMetadata,
    type RuleGroupMetadata,
    NetworkFirewallClient,
    type NetworkFirewallClientConfig,
    paginateListFirewalls,
    paginateListFirewallPolicies,
    paginateListRuleGroups,
    DescribeFirewallCommand
} from "@aws-sdk/client-network-firewall";
import type {NetworkFirewall, NetworkFirewallInfo} from "../../interfaces/networkfirewall.js";

export class NetworkFirewallService implements NetworkFirewall {

    #client: NetworkFirewallClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: NetworkFirewallClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new NetworkFirewallClient(config);

    }

    async getFirewalls (): Promise<NetworkFirewallInfo[]> {

        const client = this.#client;
        const metadataList: FirewallMetadata[] = [];
        for await (const page of paginateListFirewalls(
            {client},
            {}
        )) {

            if (page.Firewalls !== undefined) {

                metadataList.push(...page.Firewalls);

            }

        }

        const firewalls: NetworkFirewallInfo[] = [];
        for (const meta of metadataList) {

            if (!meta.FirewallArn) {

                continue;

            }

            const response = await client.send(new DescribeFirewallCommand({
                "FirewallArn": meta.FirewallArn
            }));

            const fw = response.Firewall;
            firewalls.push({
                "firewallArn": meta.FirewallArn,
                "firewallName": fw?.FirewallName ?? meta.FirewallName ?? meta.FirewallArn,
                "vpcId": fw?.VpcId,
                "subnetMappings": fw?.SubnetMappings?.map((s) => s.SubnetId).filter((id): id is string => id !== undefined)
            });

        }

        return firewalls;

    }

    async getFirewallPolicies (): Promise<FirewallPolicyMetadata[]> {

        const client = this.#client;
        const policies: FirewallPolicyMetadata[] = [];
        for await (const page of paginateListFirewallPolicies(
            {client},
            {}
        )) {

            if (page.FirewallPolicies !== undefined) {

                policies.push(...page.FirewallPolicies);

            }

        }
        return policies;

    }

    async getRuleGroups (): Promise<RuleGroupMetadata[]> {

        const client = this.#client;
        const groups: RuleGroupMetadata[] = [];
        for await (const page of paginateListRuleGroups(
            {client},
            {}
        )) {

            if (page.RuleGroups !== undefined) {

                groups.push(...page.RuleGroups);

            }

        }
        return groups;

    }

}

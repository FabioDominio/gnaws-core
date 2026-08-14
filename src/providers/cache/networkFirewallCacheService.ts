import type {FirewallPolicyMetadata, RuleGroupMetadata} from "@aws-sdk/client-network-firewall";
import type {NetworkFirewall, NetworkFirewallInfo} from "../../interfaces/networkfirewall.js";
import {readCacheFile} from "./cacheReader.js";

export class NetworkFirewallCacheService implements NetworkFirewall {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getFirewalls (): Promise<NetworkFirewallInfo[]> {

        return readCacheFile(
            this.#cacheDir,
            "network_firewall_firewalls.json"
        );

    }

    async getFirewallPolicies (): Promise<FirewallPolicyMetadata[]> {

        return readCacheFile(
            this.#cacheDir,
            "network_firewall_policies.json"
        );

    }

    async getRuleGroups (): Promise<RuleGroupMetadata[]> {

        return readCacheFile(
            this.#cacheDir,
            "network_firewall_rule_groups.json"
        );

    }

}

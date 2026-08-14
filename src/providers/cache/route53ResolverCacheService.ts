import type {ResolverEndpoint, ResolverRule, ResolverRuleAssociation, FirewallRuleGroupMetadata, FirewallRuleGroupAssociation} from "@aws-sdk/client-route53resolver";
import type {Route53Resolver} from "../../interfaces/route53resolver.js";
import {readCacheFile} from "./cacheReader.js";

export class Route53ResolverCacheService implements Route53Resolver {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getResolverEndpoints (): Promise<ResolverEndpoint[]> {

        return readCacheFile(
            this.#cacheDir,
            "route53resolver_endpoints.json"
        );

    }

    async getResolverRules (): Promise<ResolverRule[]> {

        return readCacheFile(
            this.#cacheDir,
            "route53resolver_rules.json"
        );

    }

    async getResolverRuleAssociations (): Promise<ResolverRuleAssociation[]> {

        return readCacheFile(
            this.#cacheDir,
            "route53resolver_rule_associations.json"
        );

    }

    async getFirewallRuleGroups (): Promise<FirewallRuleGroupMetadata[]> {

        return readCacheFile(
            this.#cacheDir,
            "route53resolver_firewall_rule_groups.json"
        );

    }

    async getFirewallRuleGroupAssociations (): Promise<FirewallRuleGroupAssociation[]> {

        return readCacheFile(
            this.#cacheDir,
            "route53resolver_firewall_rule_group_associations.json"
        );

    }

}

import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type ResolverEndpoint,
    type ResolverRule,
    type ResolverRuleAssociation,
    type FirewallRuleGroupMetadata,
    type FirewallRuleGroupAssociation,
    Route53ResolverClient,
    type Route53ResolverClientConfig,
    paginateListResolverEndpoints,
    paginateListResolverRules,
    paginateListResolverRuleAssociations,
    paginateListFirewallRuleGroups,
    paginateListFirewallRuleGroupAssociations
} from "@aws-sdk/client-route53resolver";
import type {Route53Resolver} from "../../interfaces/route53resolver.js";

export class Route53ResolverService implements Route53Resolver {

    #client: Route53ResolverClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: Route53ResolverClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new Route53ResolverClient(config);

    }

    async getResolverEndpoints (): Promise<ResolverEndpoint[]> {

        const client = this.#client;
        const items: ResolverEndpoint[] = [];
        for await (const page of paginateListResolverEndpoints(
            {client},
            {}
        )) {

            if (page.ResolverEndpoints !== undefined) {

                items.push(...page.ResolverEndpoints);

            }

        }
        return items;

    }

    async getResolverRules (): Promise<ResolverRule[]> {

        const client = this.#client;
        const items: ResolverRule[] = [];
        for await (const page of paginateListResolverRules(
            {client},
            {}
        )) {

            if (page.ResolverRules !== undefined) {

                items.push(...page.ResolverRules);

            }

        }
        return items;

    }

    async getResolverRuleAssociations (): Promise<ResolverRuleAssociation[]> {

        const client = this.#client;
        const items: ResolverRuleAssociation[] = [];
        for await (const page of paginateListResolverRuleAssociations(
            {client},
            {}
        )) {

            if (page.ResolverRuleAssociations !== undefined) {

                items.push(...page.ResolverRuleAssociations);

            }

        }
        return items;

    }

    async getFirewallRuleGroups (): Promise<FirewallRuleGroupMetadata[]> {

        const client = this.#client;
        const items: FirewallRuleGroupMetadata[] = [];
        for await (const page of paginateListFirewallRuleGroups(
            {client},
            {}
        )) {

            if (page.FirewallRuleGroups !== undefined) {

                items.push(...page.FirewallRuleGroups);

            }

        }
        return items;

    }

    async getFirewallRuleGroupAssociations (): Promise<FirewallRuleGroupAssociation[]> {

        const client = this.#client;
        const items: FirewallRuleGroupAssociation[] = [];
        for await (const page of paginateListFirewallRuleGroupAssociations(
            {client},
            {}
        )) {

            if (page.FirewallRuleGroupAssociations !== undefined) {

                items.push(...page.FirewallRuleGroupAssociations);

            }

        }
        return items;

    }

}

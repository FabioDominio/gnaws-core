import type {ResolverEndpoint, ResolverRule, ResolverRuleAssociation, FirewallRuleGroupMetadata, FirewallRuleGroupAssociation} from "@aws-sdk/client-route53resolver";

export interface Route53Resolver {
    getResolverEndpoints (): Promise<ResolverEndpoint[]>;
    getResolverRules (): Promise<ResolverRule[]>;
    getResolverRuleAssociations (): Promise<ResolverRuleAssociation[]>;
    getFirewallRuleGroups (): Promise<FirewallRuleGroupMetadata[]>;
    getFirewallRuleGroupAssociations (): Promise<FirewallRuleGroupAssociation[]>;
}

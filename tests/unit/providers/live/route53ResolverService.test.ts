import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {Route53ResolverClient, ListResolverEndpointsCommand, ListResolverRulesCommand, ListResolverRuleAssociationsCommand, ListFirewallRuleGroupsCommand, ListFirewallRuleGroupAssociationsCommand} from "@aws-sdk/client-route53resolver";
import {Route53ResolverService} from "../../../../src/providers/live/route53ResolverService.js";

const resolverMock = mockClient(Route53ResolverClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    resolverMock.reset();

});

describe(
    "Route53ResolverService",
    () => {

        describe(
            "getResolverEndpoints",
            () => {

                it(
                    "returns resolver endpoints",
                    async () => {

                        resolverMock.on(ListResolverEndpointsCommand).resolves({
                            "ResolverEndpoints": [
                                {"Id": "rslvr-in-1",
                                    "Name": "inbound-1",
                                    "Direction": "INBOUND",
                                    "Status": "OPERATIONAL"},
                                {"Id": "rslvr-out-1",
                                    "Name": "outbound-1",
                                    "Direction": "OUTBOUND",
                                    "Status": "OPERATIONAL"}
                            ]
                        });

                        const service = new Route53ResolverService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getResolverEndpoints();

                        expect(result).toHaveLength(2);
                        expect(result[0].Direction).toBe("INBOUND");

                    }
                );

                it(
                    "returns empty when no endpoints",
                    async () => {

                        resolverMock.on(ListResolverEndpointsCommand).resolves({});

                        const service = new Route53ResolverService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getResolverEndpoints();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getResolverRules",
            () => {

                it(
                    "returns resolver rules",
                    async () => {

                        resolverMock.on(ListResolverRulesCommand).resolves({
                            "ResolverRules": [
                                {"Id": "rslvr-rr-1",
                                    "Name": "rule-1",
                                    "DomainName": "example.com",
                                    "RuleType": "FORWARD"},
                                {"Id": "rslvr-rr-2",
                                    "Name": "rule-2",
                                    "DomainName": "internal.local",
                                    "RuleType": "FORWARD"}
                            ]
                        });

                        const service = new Route53ResolverService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getResolverRules();

                        expect(result).toHaveLength(2);
                        expect(result[0].DomainName).toBe("example.com");

                    }
                );

                it(
                    "returns empty when no rules",
                    async () => {

                        resolverMock.on(ListResolverRulesCommand).resolves({});

                        const service = new Route53ResolverService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getResolverRules();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getResolverRuleAssociations",
            () => {

                it(
                    "returns rule associations",
                    async () => {

                        resolverMock.on(ListResolverRuleAssociationsCommand).resolves({
                            "ResolverRuleAssociations": [
                                {"Id": "rslvr-rrassoc-1",
                                    "ResolverRuleId": "rslvr-rr-1",
                                    "VPCId": "vpc-123",
                                    "Status": "COMPLETE"}
                            ]
                        });

                        const service = new Route53ResolverService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getResolverRuleAssociations();

                        expect(result).toHaveLength(1);
                        expect(result[0].VPCId).toBe("vpc-123");

                    }
                );

                it(
                    "returns empty when no associations",
                    async () => {

                        resolverMock.on(ListResolverRuleAssociationsCommand).resolves({});

                        const service = new Route53ResolverService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getResolverRuleAssociations();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getFirewallRuleGroups",
            () => {

                it(
                    "returns firewall rule groups",
                    async () => {

                        resolverMock.on(ListFirewallRuleGroupsCommand).resolves({
                            "FirewallRuleGroups": [
                                {"Id": "rslvr-frg-1",
                                    "Name": "block-malicious",
                                    "Arn": "arn:aws:route53resolver:us-east-1:123:firewall-rule-group/rslvr-frg-1"}
                            ]
                        });

                        const service = new Route53ResolverService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getFirewallRuleGroups();

                        expect(result).toHaveLength(1);
                        expect(result[0].Name).toBe("block-malicious");

                    }
                );

                it(
                    "returns empty when no firewall rule groups",
                    async () => {

                        resolverMock.on(ListFirewallRuleGroupsCommand).resolves({});

                        const service = new Route53ResolverService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getFirewallRuleGroups();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getFirewallRuleGroupAssociations",
            () => {

                it(
                    "returns firewall rule group associations",
                    async () => {

                        resolverMock.on(ListFirewallRuleGroupAssociationsCommand).resolves({
                            "FirewallRuleGroupAssociations": [
                                {"Id": "rslvr-frgassoc-1",
                                    "FirewallRuleGroupId": "rslvr-frg-1",
                                    "VpcId": "vpc-123",
                                    "Status": "COMPLETE",
                                    "Name": "assoc-1"}
                            ]
                        });

                        const service = new Route53ResolverService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getFirewallRuleGroupAssociations();

                        expect(result).toHaveLength(1);
                        expect(result[0].VpcId).toBe("vpc-123");

                    }
                );

                it(
                    "returns empty when no associations",
                    async () => {

                        resolverMock.on(ListFirewallRuleGroupAssociationsCommand).resolves({});

                        const service = new Route53ResolverService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getFirewallRuleGroupAssociations();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

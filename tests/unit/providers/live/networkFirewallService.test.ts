import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    NetworkFirewallClient,
    ListFirewallsCommand,
    ListFirewallPoliciesCommand,
    ListRuleGroupsCommand,
    DescribeFirewallCommand
} from "@aws-sdk/client-network-firewall";
import {NetworkFirewallService} from "../../../../src/providers/live/networkFirewallService.js";

const nfwMock = mockClient(NetworkFirewallClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    nfwMock.reset();

});

describe(
    "NetworkFirewallService",
    () => {

        describe(
            "getFirewalls",
            () => {

                it(
                    "returns firewalls with details",
                    async () => {

                        nfwMock.on(ListFirewallsCommand).resolves({
                            "Firewalls": [
                                {"FirewallArn": "arn:aws:network-firewall:us-east-1:123:firewall/fw-1",
                                    "FirewallName": "fw-1"},
                                {"FirewallArn": "arn:aws:network-firewall:us-east-1:123:firewall/fw-2",
                                    "FirewallName": "fw-2"}
                            ]
                        });
                        nfwMock.on(
                            DescribeFirewallCommand,
                            {"FirewallArn": "arn:aws:network-firewall:us-east-1:123:firewall/fw-1"}
                        ).resolves({
                            "Firewall": {"FirewallName": "fw-1",
                                "VpcId": "vpc-1",
                                "SubnetMappings": [{"SubnetId": "subnet-1"}],
                                "FirewallPolicyArn": "arn:aws:network-firewall:us-east-1:123:firewall-policy/default",
                                "FirewallId": "fw-id-1"}
                        });
                        nfwMock.on(
                            DescribeFirewallCommand,
                            {"FirewallArn": "arn:aws:network-firewall:us-east-1:123:firewall/fw-2"}
                        ).resolves({
                            "Firewall": {"FirewallName": "fw-2",
                                "VpcId": "vpc-2",
                                "SubnetMappings": [
                                    {"SubnetId": "subnet-2"},
                                    {"SubnetId": "subnet-3"}
                                ],
                                "FirewallPolicyArn": "arn:aws:network-firewall:us-east-1:123:firewall-policy/default",
                                "FirewallId": "fw-id-2"}
                        });

                        const service = new NetworkFirewallService(
                            creds,
                            "us-east-1"
                        );
                        const firewalls = await service.getFirewalls();

                        expect(firewalls).toHaveLength(2);
                        expect(firewalls[0].firewallName).toBe("fw-1");
                        expect(firewalls[0].vpcId).toBe("vpc-1");
                        expect(firewalls[0].subnetMappings).toEqual(["subnet-1"]);
                        expect(firewalls[1].subnetMappings).toEqual([
                            "subnet-2",
                            "subnet-3"
                        ]);

                    }
                );

                it(
                    "returns empty when no firewalls",
                    async () => {

                        nfwMock.on(ListFirewallsCommand).resolves({});

                        const service = new NetworkFirewallService(
                            creds,
                            "us-east-1"
                        );
                        const firewalls = await service.getFirewalls();

                        expect(firewalls).toHaveLength(0);

                    }
                );

                it(
                    "skips metadata entries with no FirewallArn",
                    async () => {

                        nfwMock.on(ListFirewallsCommand).resolves({
                            "Firewalls": [
                                {"FirewallName": "ghost-fw"},
                                {"FirewallArn": "arn:aws:network-firewall:us-east-1:123:firewall/fw-ok",
                                    "FirewallName": "fw-ok"}
                            ]
                        });
                        nfwMock.on(DescribeFirewallCommand).resolves({
                            "Firewall": {"FirewallName": "fw-ok",
                                "VpcId": "vpc-1",
                                "SubnetMappings": [{"SubnetId": "subnet-1"}],
                                "FirewallPolicyArn": "arn:aws:network-firewall:us-east-1:123:firewall-policy/default",
                                "FirewallId": "fw-id-ok"}
                        });

                        const service = new NetworkFirewallService(
                            creds,
                            "us-east-1"
                        );
                        const firewalls = await service.getFirewalls();

                        expect(firewalls).toHaveLength(1);
                        expect(firewalls[0].firewallName).toBe("fw-ok");

                    }
                );

            }
        );

        describe(
            "getFirewallPolicies",
            () => {

                it(
                    "returns firewall policies",
                    async () => {

                        nfwMock.on(ListFirewallPoliciesCommand).resolves({
                            "FirewallPolicies": [
                                {"Name": "policy-1",
                                    "Arn": "arn:aws:network-firewall:us-east-1:123:firewall-policy/policy-1"},
                                {"Name": "policy-2",
                                    "Arn": "arn:aws:network-firewall:us-east-1:123:firewall-policy/policy-2"}
                            ]
                        });

                        const service = new NetworkFirewallService(
                            creds,
                            "us-east-1"
                        );
                        const policies = await service.getFirewallPolicies();

                        expect(policies).toHaveLength(2);
                        expect(policies[0].Name).toBe("policy-1");

                    }
                );

                it(
                    "returns empty when no policies",
                    async () => {

                        nfwMock.on(ListFirewallPoliciesCommand).resolves({});

                        const service = new NetworkFirewallService(
                            creds,
                            "us-east-1"
                        );
                        const policies = await service.getFirewallPolicies();

                        expect(policies).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getRuleGroups",
            () => {

                it(
                    "returns rule groups",
                    async () => {

                        nfwMock.on(ListRuleGroupsCommand).resolves({
                            "RuleGroups": [
                                {"Name": "rg-1",
                                    "Arn": "arn:aws:network-firewall:us-east-1:123:stateful-rulegroup/rg-1"},
                                {"Name": "rg-2",
                                    "Arn": "arn:aws:network-firewall:us-east-1:123:stateless-rulegroup/rg-2"}
                            ]
                        });

                        const service = new NetworkFirewallService(
                            creds,
                            "us-east-1"
                        );
                        const groups = await service.getRuleGroups();

                        expect(groups).toHaveLength(2);
                        expect(groups[0].Name).toBe("rg-1");

                    }
                );

                it(
                    "returns empty when no rule groups",
                    async () => {

                        nfwMock.on(ListRuleGroupsCommand).resolves({});

                        const service = new NetworkFirewallService(
                            creds,
                            "us-east-1"
                        );
                        const groups = await service.getRuleGroups();

                        expect(groups).toHaveLength(0);

                    }
                );

            }
        );

    }
);

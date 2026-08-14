import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    ElasticLoadBalancingV2Client,
    DescribeLoadBalancersCommand,
    DescribeTargetGroupsCommand,
    DescribeListenersCommand,
    DescribeRulesCommand,
    DescribeTagsCommand,
    DescribeListenerCertificatesCommand,
    DescribeTrustStoresCommand,
    DescribeTrustStoreAssociationsCommand
} from "@aws-sdk/client-elastic-load-balancing-v2";
import {Elbv2Service} from "../../../../src/providers/live/elbv2Service.js";

const elbv2Mock = mockClient(ElasticLoadBalancingV2Client);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    elbv2Mock.reset();

});

describe(
    "Elbv2Service",
    () => {

        describe(
            "getLoadBalancers",
            () => {

                it(
                    "returns load balancers from single page",
                    async () => {

                        elbv2Mock.on(DescribeLoadBalancersCommand).resolves({
                            "LoadBalancers": [
                                {"LoadBalancerArn": "arn:lb:1",
                                    "LoadBalancerName": "lb-1"},
                                {"LoadBalancerArn": "arn:lb:2",
                                    "LoadBalancerName": "lb-2"}
                            ]
                        });

                        const service = new Elbv2Service(
                            creds,
                            "us-east-1"
                        );
                        const lbs = await service.getLoadBalancers();

                        expect(lbs).toHaveLength(2);
                        expect(lbs[0].LoadBalancerName).toBe("lb-1");

                    }
                );

                it(
                    "aggregates across pages",
                    async () => {

                        elbv2Mock.on(DescribeLoadBalancersCommand).
                            resolvesOnce({"LoadBalancers": [{"LoadBalancerArn": "arn:lb:1"}],
                                "NextMarker": "m"}).
                            resolvesOnce({"LoadBalancers": [{"LoadBalancerArn": "arn:lb:2"}]});

                        const service = new Elbv2Service(
                            creds,
                            "us-east-1"
                        );
                        const lbs = await service.getLoadBalancers();

                        expect(lbs).toHaveLength(2);

                    }
                );

                it(
                    "returns empty array when LoadBalancers is undefined",
                    async () => {

                        elbv2Mock.on(DescribeLoadBalancersCommand).resolves({});

                        const service = new Elbv2Service(
                            creds,
                            "us-east-1"
                        );
                        const lbs = await service.getLoadBalancers();

                        expect(lbs).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getTargetGroups",
            () => {

                it(
                    "returns target groups",
                    async () => {

                        elbv2Mock.on(DescribeTargetGroupsCommand).resolves({
                            "TargetGroups": [
                                {"TargetGroupArn": "arn:tg:1",
                                    "TargetGroupName": "tg-1"},
                                {"TargetGroupArn": "arn:tg:2",
                                    "TargetGroupName": "tg-2"}
                            ]
                        });

                        const service = new Elbv2Service(
                            creds,
                            "us-east-1"
                        );
                        const tgs = await service.getTargetGroups();

                        expect(tgs).toHaveLength(2);
                        expect(tgs[0].TargetGroupName).toBe("tg-1");

                    }
                );

                it(
                    "returns empty array when undefined",
                    async () => {

                        elbv2Mock.on(DescribeTargetGroupsCommand).resolves({});

                        const service = new Elbv2Service(
                            creds,
                            "us-east-1"
                        );
                        const tgs = await service.getTargetGroups();

                        expect(tgs).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getListeners",
            () => {

                it(
                    "returns listeners for a load balancer",
                    async () => {

                        elbv2Mock.on(DescribeListenersCommand).resolves({
                            "Listeners": [
                                {"ListenerArn": "arn:listener:1",
                                    "Port": 443,
                                    "Protocol": "HTTPS"},
                                {"ListenerArn": "arn:listener:2",
                                    "Port": 80,
                                    "Protocol": "HTTP"}
                            ]
                        });

                        const service = new Elbv2Service(
                            creds,
                            "us-east-1"
                        );
                        const listeners = await service.getListeners("arn:lb:1");

                        expect(listeners).toHaveLength(2);
                        expect(listeners[0].Port).toBe(443);

                    }
                );

                it(
                    "returns empty array when no listeners",
                    async () => {

                        elbv2Mock.on(DescribeListenersCommand).resolves({});

                        const service = new Elbv2Service(
                            creds,
                            "us-east-1"
                        );
                        const listeners = await service.getListeners("arn:lb:1");

                        expect(listeners).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getRules",
            () => {

                it(
                    "returns rules for a listener",
                    async () => {

                        elbv2Mock.on(DescribeRulesCommand).resolves({
                            "Rules": [
                                {"RuleArn": "arn:rule:1",
                                    "Priority": "1",
                                    "IsDefault": false},
                                {"RuleArn": "arn:rule:default",
                                    "Priority": "default",
                                    "IsDefault": true}
                            ]
                        });

                        const service = new Elbv2Service(
                            creds,
                            "us-east-1"
                        );
                        const rules = await service.getRules("arn:listener:1");

                        expect(rules).toHaveLength(2);
                        expect(rules[1].IsDefault).toBe(true);

                    }
                );

                it(
                    "returns empty array when no rules",
                    async () => {

                        elbv2Mock.on(DescribeRulesCommand).resolves({});

                        const service = new Elbv2Service(
                            creds,
                            "us-east-1"
                        );
                        const rules = await service.getRules("arn:listener:1");

                        expect(rules).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getListenerCertificates",
            () => {

                it(
                    "returns certificates for a listener",
                    async () => {

                        elbv2Mock.on(DescribeListenerCertificatesCommand).resolves({
                            "Certificates": [
                                {"CertificateArn": "arn:aws:acm:us-east-1:123:certificate/cert-1",
                                    "IsDefault": true},
                                {"CertificateArn": "arn:aws:acm:us-east-1:123:certificate/cert-2",
                                    "IsDefault": false}
                            ]
                        });

                        const service = new Elbv2Service(
                            creds,
                            "us-east-1"
                        );
                        const certs = await service.getListenerCertificates("arn:listener:1");

                        expect(certs).toHaveLength(2);
                        expect(certs[0].CertificateArn).toContain("cert-1");
                        expect(certs[0].IsDefault).toBe(true);

                    }
                );

                it(
                    "returns empty array when no certificates",
                    async () => {

                        elbv2Mock.on(DescribeListenerCertificatesCommand).resolves({});

                        const service = new Elbv2Service(
                            creds,
                            "us-east-1"
                        );
                        const certs = await service.getListenerCertificates("arn:listener:1");

                        expect(certs).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getTrustStores",
            () => {

                it(
                    "returns trust stores",
                    async () => {

                        elbv2Mock.on(DescribeTrustStoresCommand).resolves({
                            "TrustStores": [
                                {"TrustStoreArn": "arn:aws:elasticloadbalancing:us-east-1:123:truststore/ts-1",
                                    "Name": "ts-1"},
                                {"TrustStoreArn": "arn:aws:elasticloadbalancing:us-east-1:123:truststore/ts-2",
                                    "Name": "ts-2"}
                            ]
                        });

                        const service = new Elbv2Service(
                            creds,
                            "us-east-1"
                        );
                        const stores = await service.getTrustStores();

                        expect(stores).toHaveLength(2);
                        expect(stores[0].Name).toBe("ts-1");

                    }
                );

                it(
                    "returns empty array when no trust stores",
                    async () => {

                        elbv2Mock.on(DescribeTrustStoresCommand).resolves({});

                        const service = new Elbv2Service(
                            creds,
                            "us-east-1"
                        );
                        const stores = await service.getTrustStores();

                        expect(stores).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getTrustStoreAssociations",
            () => {

                it(
                    "returns trust store associations",
                    async () => {

                        elbv2Mock.on(DescribeTrustStoreAssociationsCommand).resolves({
                            "TrustStoreAssociations": [
                                {"ResourceArn": "arn:aws:elasticloadbalancing:us-east-1:123:listener/app/lb-1/abc/listener-1"},
                                {"ResourceArn": "arn:aws:elasticloadbalancing:us-east-1:123:listener/app/lb-2/def/listener-2"}
                            ]
                        });

                        const service = new Elbv2Service(
                            creds,
                            "us-east-1"
                        );
                        const associations = await service.getTrustStoreAssociations("arn:aws:elasticloadbalancing:us-east-1:123:truststore/ts-1");

                        expect(associations).toHaveLength(2);
                        expect(associations[0].ResourceArn).toContain("listener-1");

                    }
                );

                it(
                    "returns empty array when no associations",
                    async () => {

                        elbv2Mock.on(DescribeTrustStoreAssociationsCommand).resolves({});

                        const service = new Elbv2Service(
                            creds,
                            "us-east-1"
                        );
                        const associations = await service.getTrustStoreAssociations("arn:aws:elasticloadbalancing:us-east-1:123:truststore/ts-1");

                        expect(associations).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getTagsForResources",
            () => {

                it(
                    "returns tags for a batch of ARNs",
                    async () => {

                        elbv2Mock.on(DescribeTagsCommand).resolves({
                            "TagDescriptions": [
                                {"ResourceArn": "arn:lb:1",
                                    "Tags": [
                                        {"Key": "env",
                                            "Value": "prod"}
                                    ]},
                                {"ResourceArn": "arn:lb:2",
                                    "Tags": [
                                        {"Key": "env",
                                            "Value": "staging"}
                                    ]}
                            ]
                        });

                        const service = new Elbv2Service(
                            creds,
                            "us-east-1"
                        );
                        const tags = await service.getTagsForResources([
                            "arn:lb:1",
                            "arn:lb:2"
                        ]);

                        expect(tags).toHaveLength(2);
                        expect(tags[0].ResourceArn).toBe("arn:lb:1");

                    }
                );

                it(
                    "batches ARNs in groups of 20",
                    async () => {

                        const arns = Array.from(
                            {"length": 25},
                            (_, i) => `arn:lb:${String(i)}`
                        );

                        elbv2Mock.on(DescribeTagsCommand).
                            resolvesOnce({
                                "TagDescriptions": arns.slice(
                                    0,
                                    20
                                ).map((arn) => ({"ResourceArn": arn,
                                    "Tags": []}))
                            }).
                            resolvesOnce({
                                "TagDescriptions": arns.slice(20).map((arn) => ({"ResourceArn": arn,
                                    "Tags": []}))
                            });

                        const service = new Elbv2Service(
                            creds,
                            "us-east-1"
                        );
                        const tags = await service.getTagsForResources(arns);

                        expect(tags).toHaveLength(25);
                        const calls = elbv2Mock.commandCalls(DescribeTagsCommand);
                        expect(calls).toHaveLength(2);
                        expect(calls[0].args[0].input.ResourceArns).toHaveLength(20);
                        expect(calls[1].args[0].input.ResourceArns).toHaveLength(5);

                    }
                );

                it(
                    "skips batch on error and continues",
                    async () => {

                        const arns = Array.from(
                            {"length": 25},
                            (_, i) => `arn:lb:${String(i)}`
                        );

                        elbv2Mock.on(DescribeTagsCommand).
                            resolvesOnce({
                                "TagDescriptions": arns.slice(
                                    0,
                                    20
                                ).map((arn) => ({"ResourceArn": arn,
                                    "Tags": []}))
                            }).
                            rejectsOnce(new Error("AccessDenied"));

                        const service = new Elbv2Service(
                            creds,
                            "us-east-1"
                        );
                        const tags = await service.getTagsForResources(arns);

                        expect(tags).toHaveLength(20);

                    }
                );

                it(
                    "returns empty array when all batches fail",
                    async () => {

                        elbv2Mock.on(DescribeTagsCommand).rejects(new Error("AccessDenied"));

                        const service = new Elbv2Service(
                            creds,
                            "us-east-1"
                        );
                        const tags = await service.getTagsForResources([
                            "arn:lb:1",
                            "arn:lb:2"
                        ]);

                        expect(tags).toEqual([]);

                    }
                );

                it(
                    "returns empty array for empty ARN list",
                    async () => {

                        const service = new Elbv2Service(
                            creds,
                            "us-east-1"
                        );
                        const tags = await service.getTagsForResources([]);

                        expect(tags).toEqual([]);
                        expect(elbv2Mock.commandCalls(DescribeTagsCommand)).toHaveLength(0);

                    }
                );

            }
        );

    }
);

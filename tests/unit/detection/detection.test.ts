import {describe, it, expect} from "vitest";
import {mockInventory, mockGraph} from "../helpers.js";
import {
    ebsDetachedVolume,
    elasticIpUnassociated,
    eniDetached,
    securityGroupUnused,
    loadBalancerNoTargets,
    targetGroupOrphaned,
    acmCertificateUnused
} from "../../../src/detection/rules/index.js";
import {UnusedDetector} from "../../../src/detection/detector.js";
import type {DetectionContext} from "../../../src/detection/types.js";

function ctx (inv: ReturnType<typeof mockInventory>, regions = ["eu-west-1"]): DetectionContext {

    return {"inventory": inv,
        "graph": mockGraph(),
        regions};

}

describe(
    "ebsDetachedVolume",
    () => {

        it(
            "detects volumes in available state",
            () => {

                const inv = mockInventory({
                    "volumesByRegion": {
                        "eu-west-1": [
                            {"VolumeId": "vol-111",
                                "State": "available",
                                "Size": 100,
                                "VolumeType": "gp3"},
                            {"VolumeId": "vol-222",
                                "State": "in-use",
                                "Size": 50,
                                "VolumeType": "gp2"}
                        ]
                    }
                });
                const findings = ebsDetachedVolume.detect(ctx(inv));
                expect(findings).toHaveLength(1);
                expect(findings[0].arn).toContain("vol-111");
                expect(findings[0].confidence).toBe("high");
                expect(findings[0].reason).toContain("100 GB");

            }
        );

        it(
            "returns empty when no volumes are available",
            () => {

                const inv = mockInventory({
                    "volumesByRegion": {
                        "eu-west-1": [
                            {"VolumeId": "vol-333",
                                "State": "in-use",
                                "Size": 20,
                                "VolumeType": "gp3"}
                        ]
                    }
                });
                const findings = ebsDetachedVolume.detect(ctx(inv));
                expect(findings).toHaveLength(0);

            }
        );

        it(
            "uses Name tag when available",
            () => {

                const inv = mockInventory({
                    "volumesByRegion": {
                        "eu-west-1": [
                            {"VolumeId": "vol-444",
                                "State": "available",
                                "Size": 10,
                                "VolumeType": "gp3",
                                "Tags": [
                                    {"Key": "Name",
                                        "Value": "my-data-vol"}
                                ]}
                        ]
                    }
                });
                const findings = ebsDetachedVolume.detect(ctx(inv));
                expect(findings[0].name).toBe("my-data-vol");

            }
        );

    }
);

describe(
    "elasticIpUnassociated",
    () => {

        it(
            "detects EIPs without association",
            () => {

                const inv = mockInventory({
                    "addressesByRegion": {
                        "eu-west-1": [
                            {"AllocationId": "eipalloc-111",
                                "PublicIp": "1.2.3.4"},
                            {"AllocationId": "eipalloc-222",
                                "PublicIp": "5.6.7.8",
                                "AssociationId": "eipassoc-abc"}
                        ]
                    }
                });
                const findings = elasticIpUnassociated.detect(ctx(inv));
                expect(findings).toHaveLength(1);
                expect(findings[0].name).toContain("1.2.3.4");

            }
        );

        it(
            "returns empty when all EIPs are associated",
            () => {

                const inv = mockInventory({
                    "addressesByRegion": {
                        "eu-west-1": [
                            {"AllocationId": "eipalloc-333",
                                "PublicIp": "10.0.0.1",
                                "AssociationId": "eipassoc-xyz"}
                        ]
                    }
                });
                const findings = elasticIpUnassociated.detect(ctx(inv));
                expect(findings).toHaveLength(0);

            }
        );

    }
);

describe(
    "eniDetached",
    () => {

        it(
            "detects ENIs in available status",
            () => {

                const inv = mockInventory({
                    "networkInterfacesByRegion": {
                        "eu-west-1": [
                            {"NetworkInterfaceId": "eni-111",
                                "Status": "available",
                                "InterfaceType": "interface"},
                            {"NetworkInterfaceId": "eni-222",
                                "Status": "in-use",
                                "InterfaceType": "interface"}
                        ]
                    }
                });
                const findings = eniDetached.detect(ctx(inv));
                expect(findings).toHaveLength(1);
                expect(findings[0].arn).toContain("eni-111");

            }
        );

        it(
            "skips requester-managed ENIs",
            () => {

                const inv = mockInventory({
                    "networkInterfacesByRegion": {
                        "eu-west-1": [
                            {"NetworkInterfaceId": "eni-333",
                                "Status": "available",
                                "RequesterManaged": true},
                            {"NetworkInterfaceId": "eni-444",
                                "Status": "available",
                                "RequesterManaged": false}
                        ]
                    }
                });
                const findings = eniDetached.detect(ctx(inv));
                expect(findings).toHaveLength(1);
                expect(findings[0].arn).toContain("eni-444");

            }
        );

    }
);

describe(
    "securityGroupUnused",
    () => {

        it(
            "detects SGs not referenced by any ENI",
            () => {

                const inv = mockInventory({
                    "securityGroupsByRegion": {
                        "eu-west-1": [
                            {"GroupId": "sg-111",
                                "GroupName": "unused-sg"},
                            {"GroupId": "sg-222",
                                "GroupName": "used-sg"}
                        ]
                    },
                    "networkInterfacesByRegion": {
                        "eu-west-1": [
                            {"NetworkInterfaceId": "eni-aaa",
                                "Groups": [{"GroupId": "sg-222"}]}
                        ]
                    }
                });
                const findings = securityGroupUnused.detect(ctx(inv));
                expect(findings).toHaveLength(1);
                expect(findings[0].name).toBe("unused-sg");

            }
        );

        it(
            "skips the default security group",
            () => {

                const inv = mockInventory({
                    "securityGroupsByRegion": {
                        "eu-west-1": [
                            {"GroupId": "sg-000",
                                "GroupName": "default"}
                        ]
                    },
                    "networkInterfacesByRegion": {"eu-west-1": []}
                });
                const findings = securityGroupUnused.detect(ctx(inv));
                expect(findings).toHaveLength(0);

            }
        );

        it(
            "returns empty when all SGs are in use",
            () => {

                const inv = mockInventory({
                    "securityGroupsByRegion": {
                        "eu-west-1": [
                            {"GroupId": "sg-111",
                                "GroupName": "my-sg"}
                        ]
                    },
                    "networkInterfacesByRegion": {
                        "eu-west-1": [
                            {"NetworkInterfaceId": "eni-aaa",
                                "Groups": [{"GroupId": "sg-111"}]}
                        ]
                    }
                });
                const findings = securityGroupUnused.detect(ctx(inv));
                expect(findings).toHaveLength(0);

            }
        );

    }
);

describe(
    "loadBalancerNoTargets",
    () => {

        it(
            "detects LBs with zero target groups",
            () => {

                const inv = mockInventory({
                    "loadBalancersByRegion": {
                        "eu-west-1": [
                            {"LoadBalancerArn": "arn:aws:elasticloadbalancing:eu-west-1:123:loadbalancer/app/my-lb/abc",
                                "LoadBalancerName": "my-lb"}
                        ]
                    },
                    "targetGroupsByRegion": {
                        "eu-west-1": [
                            {"TargetGroupArn": "arn:tg-1",
                                "LoadBalancerArns": ["arn:aws:elasticloadbalancing:eu-west-1:123:loadbalancer/app/other-lb/xyz"]}
                        ]
                    }
                });
                const findings = loadBalancerNoTargets.detect(ctx(inv));
                expect(findings).toHaveLength(1);
                expect(findings[0].name).toBe("my-lb");

            }
        );

        it(
            "skips LBs that have target groups",
            () => {

                const lbArn = "arn:aws:elasticloadbalancing:eu-west-1:123:loadbalancer/app/my-lb/abc";
                const inv = mockInventory({
                    "loadBalancersByRegion": {
                        "eu-west-1": [
                            {"LoadBalancerArn": lbArn,
                                "LoadBalancerName": "my-lb"}
                        ]
                    },
                    "targetGroupsByRegion": {
                        "eu-west-1": [
                            {"TargetGroupArn": "arn:tg-1",
                                "LoadBalancerArns": [lbArn]}
                        ]
                    }
                });
                const findings = loadBalancerNoTargets.detect(ctx(inv));
                expect(findings).toHaveLength(0);

            }
        );

    }
);

describe(
    "targetGroupOrphaned",
    () => {

        it(
            "detects target groups with no LB association",
            () => {

                const inv = mockInventory({
                    "targetGroupsByRegion": {
                        "eu-west-1": [
                            {"TargetGroupArn": "arn:tg-orphan",
                                "TargetGroupName": "orphan-tg",
                                "LoadBalancerArns": []},
                            {"TargetGroupArn": "arn:tg-attached",
                                "TargetGroupName": "attached-tg",
                                "LoadBalancerArns": ["arn:lb-1"]}
                        ]
                    }
                });
                const findings = targetGroupOrphaned.detect(ctx(inv));
                expect(findings).toHaveLength(1);
                expect(findings[0].name).toBe("orphan-tg");

            }
        );

    }
);

describe(
    "acmCertificateUnused",
    () => {

        it(
            "detects certificates not in use",
            () => {

                const inv = mockInventory({
                    "certificatesByRegion": {
                        "eu-west-1": [
                            {"CertificateArn": "arn:cert-1",
                                "DomainName": "unused.example.com",
                                "InUse": false},
                            {"CertificateArn": "arn:cert-2",
                                "DomainName": "used.example.com",
                                "InUse": true}
                        ]
                    }
                });
                const findings = acmCertificateUnused.detect(ctx(inv));
                expect(findings).toHaveLength(1);
                expect(findings[0].name).toBe("unused.example.com");

            }
        );

        it(
            "returns empty when all certs are in use",
            () => {

                const inv = mockInventory({
                    "certificatesByRegion": {
                        "eu-west-1": [
                            {"CertificateArn": "arn:cert-3",
                                "DomainName": "active.example.com",
                                "InUse": true}
                        ]
                    }
                });
                const findings = acmCertificateUnused.detect(ctx(inv));
                expect(findings).toHaveLength(0);

            }
        );

    }
);

describe(
    "UnusedDetector",
    () => {

        it(
            "detect() with ruleIds filter for nonexistent rule returns empty",
            () => {

                const inv = mockInventory({
                    "volumesByRegion": {
                        "eu-west-1": [
                            {"VolumeId": "vol-111",
                                "State": "available",
                                "Size": 100,
                                "VolumeType": "gp3"}
                        ]
                    }
                });
                const graph = mockGraph();
                const detector = new UnusedDetector();
                const findings = detector.detect(
                    inv,
                    graph,
                    {"ruleIds": ["nonexistent-rule"]}
                );
                expect(findings).toHaveLength(0);

            }
        );

        it(
            "getRules() returns rule metadata array",
            () => {

                const detector = new UnusedDetector();
                const rules = detector.getRules();
                expect(rules.length).toBeGreaterThan(0);
                for (const rule of rules) {

                    expect(rule).toHaveProperty("id");
                    expect(rule).toHaveProperty("resourceType");
                    expect(rule).toHaveProperty("tier");
                    expect(rule).toHaveProperty("description");

                }

            }
        );

    }
);

describe(
    "loadBalancerNoTargets — null guards",
    () => {

        it(
            "skips LB with no LoadBalancerArn",
            () => {

                const inv = mockInventory({
                    "loadBalancersByRegion": {
                        "eu-west-1": [{"LoadBalancerName": "ghost-lb"}]
                    },
                    "targetGroupsByRegion": {
                        "eu-west-1": []
                    }
                });
                const findings = loadBalancerNoTargets.detect(ctx(inv));
                expect(findings).toHaveLength(0);

            }
        );

    }
);

describe(
    "acmCertificateUnused — null guards",
    () => {

        it(
            "skips certificate with no CertificateArn (uses fallback arn)",
            () => {

                const inv = mockInventory({
                    "certificatesByRegion": {
                        "eu-west-1": [
                            {"DomainName": "no-arn.example.com",
                                "InUse": false}
                        ]
                    }
                });
                const findings = acmCertificateUnused.detect(ctx(inv));
                // The rule still produces a finding with a fallback ARN
                expect(findings).toHaveLength(1);
                expect(findings[0].arn).toContain("unknown");

            }
        );

        it(
            "skips certificate when InUse is undefined",
            () => {

                const inv = mockInventory({
                    "certificatesByRegion": {
                        "eu-west-1": [
                            {"CertificateArn": "arn:cert-x",
                                "DomainName": "ambiguous.example.com"}
                        ]
                    }
                });
                const findings = acmCertificateUnused.detect(ctx(inv));
                expect(findings).toHaveLength(0);

            }
        );

    }
);

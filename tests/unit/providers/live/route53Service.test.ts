import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    Route53Client,
    ListHostedZonesCommand,
    ListResourceRecordSetsCommand,
    ListHealthChecksCommand
} from "@aws-sdk/client-route-53";
import {Route53Service} from "../../../../src/providers/live/route53Service.js";

const r53Mock = mockClient(Route53Client);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    r53Mock.reset();

});

describe(
    "Route53Service",
    () => {

        describe(
            "getHostedZones",
            () => {

                it(
                    "returns hosted zones",
                    async () => {

                        r53Mock.on(ListHostedZonesCommand).resolves({
                            "HostedZones": [
                                {"Id": "/hostedzone/Z1",
                                    "Name": "example.com.",
                                    "CallerReference": "ref1"},
                                {"Id": "/hostedzone/Z2",
                                    "Name": "test.org.",
                                    "CallerReference": "ref2"}
                            ]
                        });

                        const service = new Route53Service(creds);
                        const zones = await service.getHostedZones();

                        expect(zones).toHaveLength(2);
                        expect(zones[0].Name).toBe("example.com.");

                    }
                );

                it(
                    "aggregates across pages",
                    async () => {

                        r53Mock.on(ListHostedZonesCommand).
                            resolvesOnce({"HostedZones": [
                                {"Id": "Z1",
                                    "Name": "a.com.",
                                    "CallerReference": "r1"}
                            ],
                            "NextMarker": "m1",
                            "IsTruncated": true}).
                            resolvesOnce({"HostedZones": [
                                {"Id": "Z2",
                                    "Name": "b.com.",
                                    "CallerReference": "r2"}
                            ],
                            "IsTruncated": false});

                        const service = new Route53Service(creds);
                        const zones = await service.getHostedZones();

                        expect(zones).toHaveLength(2);

                    }
                );

            }
        );

        describe(
            "getRecordSets",
            () => {

                it(
                    "returns record sets for a zone",
                    async () => {

                        r53Mock.on(ListResourceRecordSetsCommand).resolves({
                            "ResourceRecordSets": [
                                {"Name": "example.com.",
                                    "Type": "A",
                                    "TTL": 300,
                                    "ResourceRecords": [{"Value": "1.2.3.4"}]},
                                {"Name": "www.example.com.",
                                    "Type": "CNAME",
                                    "TTL": 300,
                                    "ResourceRecords": [{"Value": "example.com"}]}
                            ],
                            "IsTruncated": false
                        });

                        const service = new Route53Service(creds);
                        const records = await service.getRecordSets("Z1");

                        expect(records).toHaveLength(2);
                        expect(records[0].Type).toBe("A");

                    }
                );

                it(
                    "handles pagination via IsTruncated",
                    async () => {

                        r53Mock.on(ListResourceRecordSetsCommand).
                            resolvesOnce({
                                "ResourceRecordSets": [
                                    {"Name": "a.com.",
                                        "Type": "A"}
                                ],
                                "IsTruncated": true,
                                "NextRecordName": "b.com.",
                                "NextRecordType": "CNAME"
                            }).
                            resolvesOnce({
                                "ResourceRecordSets": [
                                    {"Name": "b.com.",
                                        "Type": "CNAME"}
                                ],
                                "IsTruncated": false
                            });

                        const service = new Route53Service(creds);
                        const records = await service.getRecordSets("Z1");

                        expect(records).toHaveLength(2);

                    }
                );

            }
        );

        describe(
            "getHealthChecks",
            () => {

                it(
                    "returns health checks",
                    async () => {

                        r53Mock.on(ListHealthChecksCommand).resolves({
                            "HealthChecks": [
                                {"Id": "hc-1",
                                    "CallerReference": "ref1",
                                    "HealthCheckConfig": {"Type": "HTTP",
                                        "FullyQualifiedDomainName": "example.com"},
                                    "HealthCheckVersion": 1},
                                {"Id": "hc-2",
                                    "CallerReference": "ref2",
                                    "HealthCheckConfig": {"Type": "HTTPS",
                                        "FullyQualifiedDomainName": "test.com"},
                                    "HealthCheckVersion": 1}
                            ]
                        });

                        const service = new Route53Service(creds);
                        const checks = await service.getHealthChecks();

                        expect(checks).toHaveLength(2);
                        expect(checks[0].Id).toBe("hc-1");

                    }
                );

                it(
                    "returns empty when no health checks",
                    async () => {

                        r53Mock.on(ListHealthChecksCommand).resolves({});

                        const service = new Route53Service(creds);
                        const checks = await service.getHealthChecks();

                        expect(checks).toHaveLength(0);

                    }
                );

            }
        );

    }
);

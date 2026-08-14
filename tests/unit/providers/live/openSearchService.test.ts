import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    OpenSearchClient,
    ListDomainNamesCommand,
    DescribeDomainsCommand
} from "@aws-sdk/client-opensearch";
import {OpenSearchService} from "../../../../src/providers/live/openSearchService.js";

const osMock = mockClient(OpenSearchClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    osMock.reset();

});

describe(
    "OpenSearchService",
    () => {

        describe(
            "getDomains",
            () => {

                it(
                    "returns domains with full details",
                    async () => {

                        osMock.on(ListDomainNamesCommand).resolves({
                            "DomainNames": [
                                {"DomainName": "domain-1"},
                                {"DomainName": "domain-2"}
                            ]
                        });
                        osMock.on(DescribeDomainsCommand).resolves({
                            "DomainStatusList": [
                                {"DomainName": "domain-1",
                                    "ARN": "arn:aws:es:us-east-1:123:domain/domain-1",
                                    "DomainId": "123/domain-1",
                                    "ClusterConfig": {}},
                                {"DomainName": "domain-2",
                                    "ARN": "arn:aws:es:us-east-1:123:domain/domain-2",
                                    "DomainId": "123/domain-2",
                                    "ClusterConfig": {}}
                            ]
                        });

                        const service = new OpenSearchService(
                            creds,
                            "us-east-1"
                        );
                        const domains = await service.getDomains();

                        expect(domains).toHaveLength(2);
                        expect(domains[0].DomainName).toBe("domain-1");

                    }
                );

                it(
                    "batches describe calls for more than 5 domains",
                    async () => {

                        osMock.on(ListDomainNamesCommand).resolves({
                            "DomainNames": [
                                {"DomainName": "d1"},
                                {"DomainName": "d2"},
                                {"DomainName": "d3"},
                                {"DomainName": "d4"},
                                {"DomainName": "d5"},
                                {"DomainName": "d6"}
                            ]
                        });
                        osMock.on(DescribeDomainsCommand).
                            resolvesOnce({"DomainStatusList": [
                                {"DomainName": "d1",
                                    "DomainId": "1",
                                    "ARN": "arn:aws:es:us-east-1:123:domain/d1",
                                    "ClusterConfig": {}},
                                {"DomainName": "d2",
                                    "DomainId": "2",
                                    "ARN": "arn:aws:es:us-east-1:123:domain/d2",
                                    "ClusterConfig": {}},
                                {"DomainName": "d3",
                                    "DomainId": "3",
                                    "ARN": "arn:aws:es:us-east-1:123:domain/d3",
                                    "ClusterConfig": {}},
                                {"DomainName": "d4",
                                    "DomainId": "4",
                                    "ARN": "arn:aws:es:us-east-1:123:domain/d4",
                                    "ClusterConfig": {}},
                                {"DomainName": "d5",
                                    "DomainId": "5",
                                    "ARN": "arn:aws:es:us-east-1:123:domain/d5",
                                    "ClusterConfig": {}}
                            ]}).
                            resolvesOnce({"DomainStatusList": [
                                {"DomainName": "d6",
                                    "DomainId": "6",
                                    "ARN": "arn:aws:es:us-east-1:123:domain/d6",
                                    "ClusterConfig": {}}
                            ]});

                        const service = new OpenSearchService(
                            creds,
                            "us-east-1"
                        );
                        const domains = await service.getDomains();

                        expect(domains).toHaveLength(6);

                    }
                );

                it(
                    "returns empty when no domains listed",
                    async () => {

                        osMock.on(ListDomainNamesCommand).resolves({});

                        const service = new OpenSearchService(
                            creds,
                            "us-east-1"
                        );
                        const domains = await service.getDomains();

                        expect(domains).toHaveLength(0);

                    }
                );

                it(
                    "returns empty when domain names list is empty",
                    async () => {

                        osMock.on(ListDomainNamesCommand).resolves({"DomainNames": []});

                        const service = new OpenSearchService(
                            creds,
                            "us-east-1"
                        );
                        const domains = await service.getDomains();

                        expect(domains).toHaveLength(0);

                    }
                );

            }
        );

    }
);

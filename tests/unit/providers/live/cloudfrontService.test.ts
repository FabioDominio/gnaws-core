import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {CloudFrontClient, ListDistributionsCommand, ListFunctionsCommand, ListOriginAccessControlsCommand, ListKeyValueStoresCommand} from "@aws-sdk/client-cloudfront";
import {CloudFrontService} from "../../../../src/providers/live/cloudfrontService.js";

const cfMock = mockClient(CloudFrontClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    cfMock.reset();

});

describe(
    "CloudFrontService",
    () => {

        describe(
            "getDistributions",
            () => {

                it(
                    "returns distributions",
                    async () => {

                        cfMock.on(ListDistributionsCommand).resolves({
                            "DistributionList": {
                                "Items": [
                                    {"Id": "dist-1",
                                        "DomainName": "d1.cloudfront.net",
                                        "ARN": "arn:aws:cloudfront::123:distribution/dist-1",
                                        "Status": "Deployed",
                                        "LastModifiedTime": new Date(),
                                        "Origins": {"Quantity": 1,
                                            "Items": [
                                                {"Id": "origin-1",
                                                    "DomainName": "example.com"}
                                            ]},
                                        "DefaultCacheBehavior": {"TargetOriginId": "origin-1",
                                            "ViewerProtocolPolicy": "redirect-to-https"},
                                        "CacheBehaviors": {"Quantity": 0},
                                        "Restrictions": {"GeoRestriction": {"RestrictionType": "none",
                                            "Quantity": 0}},
                                        "WebACLId": "",
                                        "Comment": "",
                                        "PriceClass": "PriceClass_All",
                                        "Enabled": true,
                                        "HttpVersion": "http2",
                                        "IsIPV6Enabled": true,
                                        "ViewerCertificate": {},
                                        "Aliases": {"Quantity": 0},
                                        "CustomErrorResponses": {"Quantity": 0},
                                        "Staging": false},
                                    {"Id": "dist-2",
                                        "DomainName": "d2.cloudfront.net",
                                        "ARN": "arn:aws:cloudfront::123:distribution/dist-2",
                                        "Status": "Deployed",
                                        "LastModifiedTime": new Date(),
                                        "Origins": {"Quantity": 1,
                                            "Items": [
                                                {"Id": "origin-1",
                                                    "DomainName": "example2.com"}
                                            ]},
                                        "DefaultCacheBehavior": {"TargetOriginId": "origin-1",
                                            "ViewerProtocolPolicy": "redirect-to-https"},
                                        "CacheBehaviors": {"Quantity": 0},
                                        "Restrictions": {"GeoRestriction": {"RestrictionType": "none",
                                            "Quantity": 0}},
                                        "WebACLId": "",
                                        "Comment": "",
                                        "PriceClass": "PriceClass_All",
                                        "Enabled": true,
                                        "HttpVersion": "http2",
                                        "IsIPV6Enabled": true,
                                        "ViewerCertificate": {},
                                        "Aliases": {"Quantity": 0},
                                        "CustomErrorResponses": {"Quantity": 0},
                                        "Staging": false}
                                ],
                                "Quantity": 2,
                                "MaxItems": 100,
                                "IsTruncated": false,
                                "Marker": ""
                            }
                        });

                        const service = new CloudFrontService(creds);
                        const result = await service.getDistributions();

                        expect(result).toHaveLength(2);
                        expect(result[0].Id).toBe("dist-1");

                    }
                );

                it(
                    "returns empty when no distributions",
                    async () => {

                        cfMock.on(ListDistributionsCommand).resolves({
                            "DistributionList": {"Quantity": 0,
                                "MaxItems": 100,
                                "IsTruncated": false,
                                "Marker": ""}
                        });

                        const service = new CloudFrontService(creds);
                        const result = await service.getDistributions();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getFunctions",
            () => {

                it(
                    "returns functions",
                    async () => {

                        cfMock.on(ListFunctionsCommand).resolves({
                            "FunctionList": {
                                "Items": [
                                    {"Name": "fn-1",
                                        "FunctionConfig": {"Comment": "test",
                                            "Runtime": "cloudfront-js-2.0"},
                                        "FunctionMetadata": {"FunctionARN": "arn:aws:cloudfront::123:function/fn-1",
                                            "Stage": "LIVE",
                                            "CreatedTime": new Date(),
                                            "LastModifiedTime": new Date()}},
                                    {"Name": "fn-2",
                                        "FunctionConfig": {"Comment": "test2",
                                            "Runtime": "cloudfront-js-2.0"},
                                        "FunctionMetadata": {"FunctionARN": "arn:aws:cloudfront::123:function/fn-2",
                                            "Stage": "LIVE",
                                            "CreatedTime": new Date(),
                                            "LastModifiedTime": new Date()}}
                                ],
                                "Quantity": 2,
                                "MaxItems": 100
                            }
                        });

                        const service = new CloudFrontService(creds);
                        const result = await service.getFunctions();

                        expect(result).toHaveLength(2);
                        expect(result[0].Name).toBe("fn-1");

                    }
                );

                it(
                    "returns empty when no functions",
                    async () => {

                        cfMock.on(ListFunctionsCommand).resolves({});

                        const service = new CloudFrontService(creds);
                        const result = await service.getFunctions();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getOriginAccessControls",
            () => {

                it(
                    "returns origin access controls",
                    async () => {

                        cfMock.on(ListOriginAccessControlsCommand).resolves({
                            "OriginAccessControlList": {
                                "Items": [
                                    {"Id": "oac-1",
                                        "Name": "OAC1",
                                        "Description": "desc",
                                        "OriginAccessControlOriginType": "s3",
                                        "SigningProtocol": "sigv4",
                                        "SigningBehavior": "always"}
                                ],
                                "Quantity": 1,
                                "MaxItems": 100,
                                "IsTruncated": false,
                                "Marker": ""
                            }
                        });

                        const service = new CloudFrontService(creds);
                        const result = await service.getOriginAccessControls();

                        expect(result).toHaveLength(1);
                        expect(result[0].Id).toBe("oac-1");
                        expect(result[0].OriginAccessControlConfig?.Name).toBe("OAC1");

                    }
                );

                it(
                    "returns empty when no OACs",
                    async () => {

                        cfMock.on(ListOriginAccessControlsCommand).resolves({
                            "OriginAccessControlList": {"Quantity": 0,
                                "MaxItems": 100,
                                "IsTruncated": false,
                                "Marker": ""}
                        });

                        const service = new CloudFrontService(creds);
                        const result = await service.getOriginAccessControls();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getKeyValueStores",
            () => {

                it(
                    "returns key value stores",
                    async () => {

                        cfMock.on(ListKeyValueStoresCommand).resolves({
                            "KeyValueStoreList": {
                                "Items": [
                                    {"Name": "kvs-1",
                                        "Id": "kvs-id-1",
                                        "ARN": "arn:aws:cloudfront::123:key-value-store/kvs-1",
                                        "Comment": "test",
                                        "Status": "READY",
                                        "LastModifiedTime": new Date()}
                                ],
                                "Quantity": 1,
                                "MaxItems": 100
                            }
                        });

                        const service = new CloudFrontService(creds);
                        const result = await service.getKeyValueStores();

                        expect(result).toHaveLength(1);
                        expect(result[0].Name).toBe("kvs-1");

                    }
                );

                it(
                    "returns empty when no key value stores",
                    async () => {

                        cfMock.on(ListKeyValueStoresCommand).resolves({
                            "KeyValueStoreList": {"Quantity": 0,
                                "MaxItems": 100}
                        });

                        const service = new CloudFrontService(creds);
                        const result = await service.getKeyValueStores();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

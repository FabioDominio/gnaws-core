import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    APIGatewayClient,
    GetRestApisCommand,
    GetVpcLinksCommand as RestGetVpcLinksCommand,
    GetDomainNamesCommand,
    GetUsagePlansCommand
} from "@aws-sdk/client-api-gateway";
import {
    ApiGatewayV2Client,
    GetApisCommand,
    GetVpcLinksCommand as HttpGetVpcLinksCommand
} from "@aws-sdk/client-apigatewayv2";
import {ApiGatewayService} from "../../../../src/providers/live/apiGatewayService.js";

const restMock = mockClient(APIGatewayClient);
const httpMock = mockClient(ApiGatewayV2Client);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    restMock.reset();
    httpMock.reset();

});

describe(
    "ApiGatewayService",
    () => {

        describe(
            "getRestApis",
            () => {

                it(
                    "returns REST APIs",
                    async () => {

                        restMock.on(GetRestApisCommand).resolves({
                            "items": [
                                {"id": "api-1",
                                    "name": "My REST API"},
                                {"id": "api-2",
                                    "name": "Another API"}
                            ]
                        });

                        const service = new ApiGatewayService(
                            creds,
                            "us-east-1"
                        );
                        const apis = await service.getRestApis();

                        expect(apis).toHaveLength(2);
                        expect(apis[0].name).toBe("My REST API");

                    }
                );

                it(
                    "aggregates across pages",
                    async () => {

                        restMock.on(GetRestApisCommand).
                            resolvesOnce({"items": [
                                {"id": "api-1",
                                    "name": "a"}
                            ],
                            "position": "tok"}).
                            resolvesOnce({"items": [
                                {"id": "api-2",
                                    "name": "b"}
                            ]});

                        const service = new ApiGatewayService(
                            creds,
                            "us-east-1"
                        );
                        const apis = await service.getRestApis();

                        expect(apis).toHaveLength(2);

                    }
                );

                it(
                    "returns empty when no REST APIs",
                    async () => {

                        restMock.on(GetRestApisCommand).resolves({});

                        const service = new ApiGatewayService(
                            creds,
                            "us-east-1"
                        );
                        const apis = await service.getRestApis();

                        expect(apis).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getHttpApis",
            () => {

                it(
                    "returns HTTP APIs",
                    async () => {

                        httpMock.on(GetApisCommand).resolves({
                            "Items": [
                                {"ApiId": "http-1",
                                    "Name": "HTTP API 1",
                                    "ProtocolType": "HTTP",
                                    "RouteSelectionExpression": "$request.body.action"},
                                {"ApiId": "http-2",
                                    "Name": "HTTP API 2",
                                    "ProtocolType": "WEBSOCKET",
                                    "RouteSelectionExpression": "$request.body.action"}
                            ]
                        });

                        const service = new ApiGatewayService(
                            creds,
                            "us-east-1"
                        );
                        const apis = await service.getHttpApis();

                        expect(apis).toHaveLength(2);
                        expect(apis[0].Name).toBe("HTTP API 1");

                    }
                );

                it(
                    "handles pagination via NextToken",
                    async () => {

                        httpMock.on(GetApisCommand).
                            resolvesOnce({"Items": [
                                {"ApiId": "h1",
                                    "Name": "a",
                                    "ProtocolType": "HTTP",
                                    "RouteSelectionExpression": "$request.body.action"}
                            ],
                            "NextToken": "tok"}).
                            resolvesOnce({"Items": [
                                {"ApiId": "h2",
                                    "Name": "b",
                                    "ProtocolType": "HTTP",
                                    "RouteSelectionExpression": "$request.body.action"}
                            ]});

                        const service = new ApiGatewayService(
                            creds,
                            "us-east-1"
                        );
                        const apis = await service.getHttpApis();

                        expect(apis).toHaveLength(2);

                    }
                );

                it(
                    "returns empty when no HTTP APIs",
                    async () => {

                        httpMock.on(GetApisCommand).resolves({});

                        const service = new ApiGatewayService(
                            creds,
                            "us-east-1"
                        );
                        const apis = await service.getHttpApis();

                        expect(apis).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getVpcLinks",
            () => {

                it(
                    "returns REST API VPC links",
                    async () => {

                        restMock.on(RestGetVpcLinksCommand).resolves({
                            "items": [
                                {"id": "vl-1",
                                    "name": "VPC Link 1",
                                    "targetArns": ["arn:aws:elasticloadbalancing:us-east-1:123:targetgroup/tg1/abc"]}
                            ]
                        });

                        const service = new ApiGatewayService(
                            creds,
                            "us-east-1"
                        );
                        const links = await service.getVpcLinks();

                        expect(links).toHaveLength(1);
                        expect(links[0].name).toBe("VPC Link 1");

                    }
                );

                it(
                    "returns empty when no VPC links",
                    async () => {

                        restMock.on(RestGetVpcLinksCommand).resolves({});

                        const service = new ApiGatewayService(
                            creds,
                            "us-east-1"
                        );
                        const links = await service.getVpcLinks();

                        expect(links).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getHttpVpcLinks",
            () => {

                it(
                    "returns HTTP API VPC links",
                    async () => {

                        httpMock.on(HttpGetVpcLinksCommand).resolves({
                            "Items": [
                                {"VpcLinkId": "hvl-1",
                                    "Name": "HTTP VPC Link 1",
                                    "SecurityGroupIds": ["sg-1"],
                                    "SubnetIds": ["subnet-1"]},
                                {"VpcLinkId": "hvl-2",
                                    "Name": "HTTP VPC Link 2",
                                    "SecurityGroupIds": ["sg-2"],
                                    "SubnetIds": ["subnet-2"]}
                            ]
                        });

                        const service = new ApiGatewayService(
                            creds,
                            "us-east-1"
                        );
                        const links = await service.getHttpVpcLinks();

                        expect(links).toHaveLength(2);
                        expect(links[0].Name).toBe("HTTP VPC Link 1");

                    }
                );

                it(
                    "returns empty when no HTTP VPC links",
                    async () => {

                        httpMock.on(HttpGetVpcLinksCommand).resolves({});

                        const service = new ApiGatewayService(
                            creds,
                            "us-east-1"
                        );
                        const links = await service.getHttpVpcLinks();

                        expect(links).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getDomainNames",
            () => {

                it(
                    "returns domain names",
                    async () => {

                        restMock.on(GetDomainNamesCommand).resolves({
                            "items": [
                                {"domainName": "api.example.com",
                                    "certificateArn": "arn:aws:acm:us-east-1:123:certificate/cert-1"},
                                {"domainName": "api2.example.com",
                                    "certificateArn": "arn:aws:acm:us-east-1:123:certificate/cert-2"}
                            ]
                        });

                        const service = new ApiGatewayService(
                            creds,
                            "us-east-1"
                        );
                        const domains = await service.getDomainNames();

                        expect(domains).toHaveLength(2);
                        expect(domains[0].domainName).toBe("api.example.com");

                    }
                );

                it(
                    "returns empty when no domain names",
                    async () => {

                        restMock.on(GetDomainNamesCommand).resolves({});

                        const service = new ApiGatewayService(
                            creds,
                            "us-east-1"
                        );
                        const domains = await service.getDomainNames();

                        expect(domains).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getUsagePlans",
            () => {

                it(
                    "returns usage plans",
                    async () => {

                        restMock.on(GetUsagePlansCommand).resolves({
                            "items": [
                                {"id": "up-1",
                                    "name": "Basic Plan",
                                    "throttle": {"burstLimit": 100,
                                        "rateLimit": 50}},
                                {"id": "up-2",
                                    "name": "Premium Plan",
                                    "throttle": {"burstLimit": 1000,
                                        "rateLimit": 500}}
                            ]
                        });

                        const service = new ApiGatewayService(
                            creds,
                            "us-east-1"
                        );
                        const plans = await service.getUsagePlans();

                        expect(plans).toHaveLength(2);
                        expect(plans[0].name).toBe("Basic Plan");

                    }
                );

                it(
                    "returns empty when no usage plans",
                    async () => {

                        restMock.on(GetUsagePlansCommand).resolves({});

                        const service = new ApiGatewayService(
                            creds,
                            "us-east-1"
                        );
                        const plans = await service.getUsagePlans();

                        expect(plans).toHaveLength(0);

                    }
                );

            }
        );

    }
);

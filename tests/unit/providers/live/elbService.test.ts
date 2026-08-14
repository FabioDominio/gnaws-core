import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {ElasticLoadBalancingClient, DescribeLoadBalancersCommand} from "@aws-sdk/client-elastic-load-balancing";
import {ElbService} from "../../../../src/providers/live/elbService.js";

const elbMock = mockClient(ElasticLoadBalancingClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    elbMock.reset();

});

describe(
    "ElbService",
    () => {

        describe(
            "getLoadBalancers",
            () => {

                it(
                    "returns classic load balancers",
                    async () => {

                        elbMock.on(DescribeLoadBalancersCommand).resolves({
                            "LoadBalancerDescriptions": [
                                {"LoadBalancerName": "my-classic-lb",
                                    "DNSName": "my-classic-lb-123.us-east-1.elb.amazonaws.com",
                                    "VPCId": "vpc-123"},
                                {"LoadBalancerName": "other-lb",
                                    "DNSName": "other-lb-456.us-east-1.elb.amazonaws.com",
                                    "VPCId": "vpc-456"}
                            ]
                        });

                        const service = new ElbService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getLoadBalancers();

                        expect(result).toHaveLength(2);
                        expect(result[0].LoadBalancerName).toBe("my-classic-lb");

                    }
                );

                it(
                    "returns empty when no load balancers",
                    async () => {

                        elbMock.on(DescribeLoadBalancersCommand).resolves({});

                        const service = new ElbService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getLoadBalancers();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    WAFV2Client,
    ListWebACLsCommand,
    ListResourcesForWebACLCommand
} from "@aws-sdk/client-wafv2";
import {WafService} from "../../../../src/providers/live/wafService.js";

const wafMock = mockClient(WAFV2Client);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    wafMock.reset();

});

describe(
    "WafService",
    () => {

        describe(
            "getWebAcls",
            () => {

                it(
                    "returns web ACLs",
                    async () => {

                        wafMock.on(ListWebACLsCommand).resolves({
                            "WebACLs": [
                                {"Name": "acl-1",
                                    "Id": "id-1",
                                    "ARN": "arn:aws:wafv2:us-east-1:123:regional/webacl/acl-1/id-1"},
                                {"Name": "acl-2",
                                    "Id": "id-2",
                                    "ARN": "arn:aws:wafv2:us-east-1:123:regional/webacl/acl-2/id-2"}
                            ]
                        });

                        const service = new WafService(
                            creds,
                            "us-east-1"
                        );
                        const acls = await service.getWebAcls();

                        expect(acls).toHaveLength(2);
                        expect(acls[0].Name).toBe("acl-1");

                    }
                );

                it(
                    "returns empty when no web ACLs",
                    async () => {

                        wafMock.on(ListWebACLsCommand).resolves({});

                        const service = new WafService(
                            creds,
                            "us-east-1"
                        );
                        const acls = await service.getWebAcls();

                        expect(acls).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getResourceAssociations",
            () => {

                it(
                    "returns resource ARNs for a web ACL",
                    async () => {

                        wafMock.on(ListResourcesForWebACLCommand).resolves({
                            "ResourceArns": [
                                "arn:aws:elasticloadbalancing:us-east-1:123:loadbalancer/app/alb-1/abc123",
                                "arn:aws:apigateway:us-east-1::/restapis/api-1/stages/prod"
                            ]
                        });

                        const service = new WafService(
                            creds,
                            "us-east-1"
                        );
                        const resources = await service.getResourceAssociations("arn:aws:wafv2:us-east-1:123:regional/webacl/acl-1/id-1");

                        expect(resources).toHaveLength(2);
                        expect(resources[0]).toContain("alb-1");

                    }
                );

                it(
                    "returns empty when no associated resources",
                    async () => {

                        wafMock.on(ListResourcesForWebACLCommand).resolves({});

                        const service = new WafService(
                            creds,
                            "us-east-1"
                        );
                        const resources = await service.getResourceAssociations("arn:aws:wafv2:us-east-1:123:regional/webacl/acl-1/id-1");

                        expect(resources).toHaveLength(0);

                    }
                );

            }
        );

    }
);

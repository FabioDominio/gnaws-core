import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    IoTClient,
    ListThingsCommand,
    ListThingTypesCommand,
    ListThingGroupsCommand,
    ListCertificatesCommand,
    ListTopicRulesCommand,
    ListTopicRuleDestinationsCommand,
    ListBillingGroupsCommand,
    ListPoliciesCommand,
    ListAuthorizersCommand,
    ListDomainConfigurationsCommand,
    ListRoleAliasesCommand,
    ListStreamsCommand,
    ListProvisioningTemplatesCommand
} from "@aws-sdk/client-iot";
import {IotService} from "../../../../src/providers/live/iotService.js";

const iotMock = mockClient(IoTClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    iotMock.reset();

});

describe(
    "IotService",
    () => {

        describe(
            "getThings",
            () => {

                it(
                    "returns things",
                    async () => {

                        iotMock.on(ListThingsCommand).resolves({
                            "things": [
                                {"thingName": "sensor-1",
                                    "thingArn": "arn:aws:iot:us-east-1:123:thing/sensor-1"}
                            ]
                        });

                        const service = new IotService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getThings();

                        expect(result).toHaveLength(1);
                        expect(result[0].thingName).toBe("sensor-1");

                    }
                );

                it(
                    "aggregates across pages",
                    async () => {

                        iotMock.on(ListThingsCommand).
                            resolvesOnce({"things": [{"thingName": "s1"}],
                                "nextToken": "tok"}).
                            resolvesOnce({"things": [{"thingName": "s2"}]});

                        const service = new IotService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getThings();

                        expect(result).toHaveLength(2);

                    }
                );

                it(
                    "returns empty array when no things",
                    async () => {

                        iotMock.on(ListThingsCommand).resolves({});

                        const service = new IotService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getThings();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getThingTypes",
            () => {

                it(
                    "returns thing types",
                    async () => {

                        iotMock.on(ListThingTypesCommand).resolves({
                            "thingTypes": [
                                {"thingTypeName": "temperature-sensor",
                                    "thingTypeArn": "arn:aws:iot:us-east-1:123:thingtype/temperature-sensor"}
                            ]
                        });

                        const service = new IotService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getThingTypes();

                        expect(result).toHaveLength(1);
                        expect(result[0].thingTypeName).toBe("temperature-sensor");

                    }
                );

                it(
                    "returns empty array when no thing types",
                    async () => {

                        iotMock.on(ListThingTypesCommand).resolves({});

                        const service = new IotService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getThingTypes();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getThingGroups",
            () => {

                it(
                    "returns thing groups",
                    async () => {

                        iotMock.on(ListThingGroupsCommand).resolves({
                            "thingGroups": [
                                {"groupName": "fleet-1",
                                    "groupArn": "arn:aws:iot:us-east-1:123:thinggroup/fleet-1"}
                            ]
                        });

                        const service = new IotService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getThingGroups();

                        expect(result).toHaveLength(1);
                        expect(result[0].groupName).toBe("fleet-1");

                    }
                );

                it(
                    "returns empty array when no thing groups",
                    async () => {

                        iotMock.on(ListThingGroupsCommand).resolves({});

                        const service = new IotService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getThingGroups();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getCertificates",
            () => {

                it(
                    "returns certificates",
                    async () => {

                        iotMock.on(ListCertificatesCommand).resolves({
                            "certificates": [
                                {"certificateId": "cert-123",
                                    "certificateArn": "arn:aws:iot:us-east-1:123:cert/cert-123",
                                    "status": "ACTIVE"}
                            ]
                        });

                        const service = new IotService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getCertificates();

                        expect(result).toHaveLength(1);
                        expect(result[0].certificateId).toBe("cert-123");

                    }
                );

                it(
                    "returns empty array when no certificates",
                    async () => {

                        iotMock.on(ListCertificatesCommand).resolves({});

                        const service = new IotService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getCertificates();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getTopicRules",
            () => {

                it(
                    "returns topic rules",
                    async () => {

                        iotMock.on(ListTopicRulesCommand).resolves({
                            "rules": [
                                {"ruleName": "rule-1",
                                    "ruleArn": "arn:aws:iot:us-east-1:123:rule/rule-1"}
                            ]
                        });

                        const service = new IotService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getTopicRules();

                        expect(result).toHaveLength(1);
                        expect(result[0].ruleName).toBe("rule-1");

                    }
                );

                it(
                    "returns empty array when no topic rules",
                    async () => {

                        iotMock.on(ListTopicRulesCommand).resolves({});

                        const service = new IotService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getTopicRules();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getTopicRuleDestinations",
            () => {

                it(
                    "returns topic rule destinations",
                    async () => {

                        iotMock.on(ListTopicRuleDestinationsCommand).resolves({
                            "destinationSummaries": [
                                {"arn": "arn:aws:iot:us-east-1:123:ruledestination/http/dest-1",
                                    "status": "ENABLED"}
                            ]
                        });

                        const service = new IotService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getTopicRuleDestinations();

                        expect(result).toHaveLength(1);
                        expect(result[0].arn).toBe("arn:aws:iot:us-east-1:123:ruledestination/http/dest-1");

                    }
                );

                it(
                    "returns empty array when no destinations",
                    async () => {

                        iotMock.on(ListTopicRuleDestinationsCommand).resolves({});

                        const service = new IotService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getTopicRuleDestinations();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getBillingGroups",
            () => {

                it(
                    "returns billing groups",
                    async () => {

                        iotMock.on(ListBillingGroupsCommand).resolves({
                            "billingGroups": [
                                {"groupName": "billing-1",
                                    "groupArn": "arn:aws:iot:us-east-1:123:billinggroup/billing-1"},
                                {"groupName": "billing-2",
                                    "groupArn": "arn:aws:iot:us-east-1:123:billinggroup/billing-2"}
                            ]
                        });

                        const service = new IotService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getBillingGroups();

                        expect(result).toHaveLength(2);
                        expect(result[0].groupName).toBe("billing-1");

                    }
                );

                it(
                    "returns empty array when no billing groups",
                    async () => {

                        iotMock.on(ListBillingGroupsCommand).resolves({});

                        const service = new IotService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getBillingGroups();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getPolicies",
            () => {

                it(
                    "returns policies",
                    async () => {

                        iotMock.on(ListPoliciesCommand).resolves({
                            "policies": [
                                {"policyName": "policy-1",
                                    "policyArn": "arn:aws:iot:us-east-1:123:policy/policy-1"},
                                {"policyName": "policy-2",
                                    "policyArn": "arn:aws:iot:us-east-1:123:policy/policy-2"}
                            ]
                        });

                        const service = new IotService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getPolicies();

                        expect(result).toHaveLength(2);
                        expect(result[0].policyName).toBe("policy-1");

                    }
                );

                it(
                    "returns empty array when no policies",
                    async () => {

                        iotMock.on(ListPoliciesCommand).resolves({});

                        const service = new IotService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getPolicies();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getAuthorizers",
            () => {

                it(
                    "returns authorizers",
                    async () => {

                        iotMock.on(ListAuthorizersCommand).resolves({
                            "authorizers": [
                                {"authorizerName": "auth-1",
                                    "authorizerArn": "arn:aws:iot:us-east-1:123:authorizer/auth-1"},
                                {"authorizerName": "auth-2",
                                    "authorizerArn": "arn:aws:iot:us-east-1:123:authorizer/auth-2"}
                            ]
                        });

                        const service = new IotService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getAuthorizers();

                        expect(result).toHaveLength(2);
                        expect(result[0].authorizerName).toBe("auth-1");

                    }
                );

                it(
                    "returns empty array when no authorizers",
                    async () => {

                        iotMock.on(ListAuthorizersCommand).resolves({});

                        const service = new IotService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getAuthorizers();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getDomainConfigurations",
            () => {

                it(
                    "returns domain configurations",
                    async () => {

                        iotMock.on(ListDomainConfigurationsCommand).resolves({
                            "domainConfigurations": [
                                {"domainConfigurationName": "dc-1",
                                    "domainConfigurationArn": "arn:aws:iot:us-east-1:123:domainconfiguration/dc-1"},
                                {"domainConfigurationName": "dc-2",
                                    "domainConfigurationArn": "arn:aws:iot:us-east-1:123:domainconfiguration/dc-2"}
                            ]
                        });

                        const service = new IotService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getDomainConfigurations();

                        expect(result).toHaveLength(2);
                        expect(result[0].domainConfigurationName).toBe("dc-1");

                    }
                );

                it(
                    "returns empty array when no domain configurations",
                    async () => {

                        iotMock.on(ListDomainConfigurationsCommand).resolves({});

                        const service = new IotService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getDomainConfigurations();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getRoleAliases",
            () => {

                it(
                    "returns role aliases",
                    async () => {

                        iotMock.on(ListRoleAliasesCommand).resolves({
                            "roleAliases": [
                                "alias-1",
                                "alias-2",
                                "alias-3"
                            ]
                        });

                        const service = new IotService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getRoleAliases();

                        expect(result).toHaveLength(3);
                        expect(result[0]).toBe("alias-1");

                    }
                );

                it(
                    "returns empty array when no role aliases",
                    async () => {

                        iotMock.on(ListRoleAliasesCommand).resolves({});

                        const service = new IotService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getRoleAliases();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getStreams",
            () => {

                it(
                    "returns streams",
                    async () => {

                        iotMock.on(ListStreamsCommand).resolves({
                            "streams": [
                                {"streamId": "stream-1",
                                    "streamArn": "arn:aws:iot:us-east-1:123:stream/stream-1"},
                                {"streamId": "stream-2",
                                    "streamArn": "arn:aws:iot:us-east-1:123:stream/stream-2"}
                            ]
                        });

                        const service = new IotService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getStreams();

                        expect(result).toHaveLength(2);
                        expect(result[0].streamId).toBe("stream-1");

                    }
                );

                it(
                    "returns empty array when no streams",
                    async () => {

                        iotMock.on(ListStreamsCommand).resolves({});

                        const service = new IotService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getStreams();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getProvisioningTemplates",
            () => {

                it(
                    "returns provisioning templates",
                    async () => {

                        iotMock.on(ListProvisioningTemplatesCommand).resolves({
                            "templates": [
                                {"templateName": "tpl-1",
                                    "templateArn": "arn:aws:iot:us-east-1:123:provisioningtemplate/tpl-1"},
                                {"templateName": "tpl-2",
                                    "templateArn": "arn:aws:iot:us-east-1:123:provisioningtemplate/tpl-2"}
                            ]
                        });

                        const service = new IotService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getProvisioningTemplates();

                        expect(result).toHaveLength(2);
                        expect(result[0].templateName).toBe("tpl-1");

                    }
                );

                it(
                    "returns empty array when no provisioning templates",
                    async () => {

                        iotMock.on(ListProvisioningTemplatesCommand).resolves({});

                        const service = new IotService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getProvisioningTemplates();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

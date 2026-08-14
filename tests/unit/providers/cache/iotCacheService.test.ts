import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {IotCacheService} from "../../../../src/providers/cache/iotCacheService.js";

let tmpDir: string;
beforeEach(() => {

    tmpDir = mkdtempSync(join(
        tmpdir(),
        "gnaws-test-"
    ));

});
afterEach(() => {

    rmSync(
        tmpDir,
        {"recursive": true}
    );

});

describe(
    "IotCacheService",
    () => {

        it(
            "getThings reads iot_things.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "iot_things.json"
                    ),
                    JSON.stringify([{"thingName": "thing1"}])
                );
                const service = new IotCacheService(tmpDir);
                expect(await service.getThings()).toEqual([{"thingName": "thing1"}]);

            }
        );

        it(
            "getThings returns empty for missing file",
            async () => {

                const service = new IotCacheService(tmpDir);
                expect(await service.getThings()).toEqual([]);

            }
        );

        it(
            "getThingTypes reads iot_thing_types.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "iot_thing_types.json"
                    ),
                    JSON.stringify([{"thingTypeName": "type1"}])
                );
                const service = new IotCacheService(tmpDir);
                expect(await service.getThingTypes()).toEqual([{"thingTypeName": "type1"}]);

            }
        );

        it(
            "getThingTypes returns empty for missing file",
            async () => {

                const service = new IotCacheService(tmpDir);
                expect(await service.getThingTypes()).toEqual([]);

            }
        );

        it(
            "getThingGroups reads iot_thing_groups.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "iot_thing_groups.json"
                    ),
                    JSON.stringify([{"groupName": "grp1"}])
                );
                const service = new IotCacheService(tmpDir);
                expect(await service.getThingGroups()).toEqual([{"groupName": "grp1"}]);

            }
        );

        it(
            "getThingGroups returns empty for missing file",
            async () => {

                const service = new IotCacheService(tmpDir);
                expect(await service.getThingGroups()).toEqual([]);

            }
        );

        it(
            "getBillingGroups reads iot_billing_groups.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "iot_billing_groups.json"
                    ),
                    JSON.stringify([{"groupName": "billing1"}])
                );
                const service = new IotCacheService(tmpDir);
                expect(await service.getBillingGroups()).toEqual([{"groupName": "billing1"}]);

            }
        );

        it(
            "getBillingGroups returns empty for missing file",
            async () => {

                const service = new IotCacheService(tmpDir);
                expect(await service.getBillingGroups()).toEqual([]);

            }
        );

        it(
            "getPolicies always returns empty",
            async () => {

                const service = new IotCacheService(tmpDir);
                expect(await service.getPolicies()).toEqual([]);

            }
        );

        it(
            "getCertificates reads iot_certificates.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "iot_certificates.json"
                    ),
                    JSON.stringify([{"certificateId": "cert1"}])
                );
                const service = new IotCacheService(tmpDir);
                expect(await service.getCertificates()).toEqual([{"certificateId": "cert1"}]);

            }
        );

        it(
            "getCertificates returns empty for missing file",
            async () => {

                const service = new IotCacheService(tmpDir);
                expect(await service.getCertificates()).toEqual([]);

            }
        );

        it(
            "getAuthorizers reads iot_authorizers.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "iot_authorizers.json"
                    ),
                    JSON.stringify([{"authorizerName": "auth1"}])
                );
                const service = new IotCacheService(tmpDir);
                expect(await service.getAuthorizers()).toEqual([{"authorizerName": "auth1"}]);

            }
        );

        it(
            "getAuthorizers returns empty for missing file",
            async () => {

                const service = new IotCacheService(tmpDir);
                expect(await service.getAuthorizers()).toEqual([]);

            }
        );

        it(
            "getDomainConfigurations reads iot_domain_configurations.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "iot_domain_configurations.json"
                    ),
                    JSON.stringify([{"domainConfigurationName": "dc1"}])
                );
                const service = new IotCacheService(tmpDir);
                expect(await service.getDomainConfigurations()).toEqual([{"domainConfigurationName": "dc1"}]);

            }
        );

        it(
            "getDomainConfigurations returns empty for missing file",
            async () => {

                const service = new IotCacheService(tmpDir);
                expect(await service.getDomainConfigurations()).toEqual([]);

            }
        );

        it(
            "getTopicRules reads iot_topic_rules.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "iot_topic_rules.json"
                    ),
                    JSON.stringify([{"ruleName": "rule1"}])
                );
                const service = new IotCacheService(tmpDir);
                expect(await service.getTopicRules()).toEqual([{"ruleName": "rule1"}]);

            }
        );

        it(
            "getTopicRules returns empty for missing file",
            async () => {

                const service = new IotCacheService(tmpDir);
                expect(await service.getTopicRules()).toEqual([]);

            }
        );

        it(
            "getTopicRuleDestinations reads iot_topic_rule_destinations.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "iot_topic_rule_destinations.json"
                    ),
                    JSON.stringify([{"arn": "arn:dest1"}])
                );
                const service = new IotCacheService(tmpDir);
                expect(await service.getTopicRuleDestinations()).toEqual([{"arn": "arn:dest1"}]);

            }
        );

        it(
            "getTopicRuleDestinations returns empty for missing file",
            async () => {

                const service = new IotCacheService(tmpDir);
                expect(await service.getTopicRuleDestinations()).toEqual([]);

            }
        );

        it(
            "getRoleAliases always returns empty",
            async () => {

                const service = new IotCacheService(tmpDir);
                expect(await service.getRoleAliases()).toEqual([]);

            }
        );

        it(
            "getStreams reads iot_streams.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "iot_streams.json"
                    ),
                    JSON.stringify([{"streamId": "stream1"}])
                );
                const service = new IotCacheService(tmpDir);
                expect(await service.getStreams()).toEqual([{"streamId": "stream1"}]);

            }
        );

        it(
            "getStreams returns empty for missing file",
            async () => {

                const service = new IotCacheService(tmpDir);
                expect(await service.getStreams()).toEqual([]);

            }
        );

        it(
            "getProvisioningTemplates reads iot_provisioning_templates.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "iot_provisioning_templates.json"
                    ),
                    JSON.stringify([{"templateName": "tpl1"}])
                );
                const service = new IotCacheService(tmpDir);
                expect(await service.getProvisioningTemplates()).toEqual([{"templateName": "tpl1"}]);

            }
        );

        it(
            "getProvisioningTemplates returns empty for missing file",
            async () => {

                const service = new IotCacheService(tmpDir);
                expect(await service.getProvisioningTemplates()).toEqual([]);

            }
        );

    }
);

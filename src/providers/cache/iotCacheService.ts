import type {ThingAttribute, ThingTypeDefinition, GroupNameAndArn, Certificate as IotCertificate, AuthorizerSummary, DomainConfigurationSummary, TopicRuleListItem, TopicRuleDestinationSummary, StreamSummary, ProvisioningTemplateSummary} from "@aws-sdk/client-iot";
import type {Iot} from "../../interfaces/iot.js";
import {readCacheFile} from "./cacheReader.js";

export class IotCacheService implements Iot {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getThings (): Promise<ThingAttribute[]> {

        return readCacheFile(
            this.#cacheDir,
            "iot_things.json"
        );

    }

    async getThingTypes (): Promise<ThingTypeDefinition[]> {

        return readCacheFile(
            this.#cacheDir,
            "iot_thing_types.json"
        );

    }

    async getThingGroups (): Promise<GroupNameAndArn[]> {

        return readCacheFile(
            this.#cacheDir,
            "iot_thing_groups.json"
        );

    }

    async getBillingGroups (): Promise<GroupNameAndArn[]> {

        return readCacheFile(
            this.#cacheDir,
            "iot_billing_groups.json"
        );

    }

    async getPolicies (): Promise<{"policyName"?: string;
        "policyArn"?: string;}[]> {

        return [];

    }

    async getCertificates (): Promise<IotCertificate[]> {

        return readCacheFile(
            this.#cacheDir,
            "iot_certificates.json"
        );

    }

    async getAuthorizers (): Promise<AuthorizerSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "iot_authorizers.json"
        );

    }

    async getDomainConfigurations (): Promise<DomainConfigurationSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "iot_domain_configurations.json"
        );

    }

    async getTopicRules (): Promise<TopicRuleListItem[]> {

        return readCacheFile(
            this.#cacheDir,
            "iot_topic_rules.json"
        );

    }

    async getTopicRuleDestinations (): Promise<TopicRuleDestinationSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "iot_topic_rule_destinations.json"
        );

    }

    async getRoleAliases (): Promise<string[]> {

        return [];

    }

    async getStreams (): Promise<StreamSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "iot_streams.json"
        );

    }

    async getProvisioningTemplates (): Promise<ProvisioningTemplateSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "iot_provisioning_templates.json"
        );

    }

}

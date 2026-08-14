import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type ThingAttribute,
    type ThingTypeDefinition,
    type GroupNameAndArn,
    type Certificate as IotCertificate,
    type AuthorizerSummary,
    type DomainConfigurationSummary,
    type TopicRuleListItem,
    type TopicRuleDestinationSummary,
    type StreamSummary,
    type ProvisioningTemplateSummary,
    IoTClient,
    type IoTClientConfig,
    paginateListThings,
    paginateListThingTypes,
    paginateListThingGroups,
    paginateListBillingGroups,
    paginateListPolicies,
    paginateListCertificates,
    paginateListAuthorizers,
    paginateListDomainConfigurations,
    paginateListTopicRules,
    paginateListTopicRuleDestinations,
    paginateListRoleAliases,
    paginateListStreams,
    paginateListProvisioningTemplates
} from "@aws-sdk/client-iot";
import type {Iot} from "../../interfaces/iot.js";

export class IotService implements Iot {

    #client: IoTClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: IoTClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new IoTClient(config);

    }

    async getThings (): Promise<ThingAttribute[]> {

        const client = this.#client;
        const items: ThingAttribute[] = [];
        for await (const page of paginateListThings(
            {client},
            {}
        )) {

            if (page.things !== undefined) {

                items.push(...page.things);

            }

        }
        return items;

    }

    async getThingTypes (): Promise<ThingTypeDefinition[]> {

        const client = this.#client;
        const items: ThingTypeDefinition[] = [];
        for await (const page of paginateListThingTypes(
            {client},
            {}
        )) {

            if (page.thingTypes !== undefined) {

                items.push(...page.thingTypes);

            }

        }
        return items;

    }

    async getThingGroups (): Promise<GroupNameAndArn[]> {

        const client = this.#client;
        const items: GroupNameAndArn[] = [];
        for await (const page of paginateListThingGroups(
            {client},
            {}
        )) {

            if (page.thingGroups !== undefined) {

                items.push(...page.thingGroups);

            }

        }
        return items;

    }

    async getBillingGroups (): Promise<GroupNameAndArn[]> {

        const client = this.#client;
        const items: GroupNameAndArn[] = [];
        for await (const page of paginateListBillingGroups(
            {client},
            {}
        )) {

            if (page.billingGroups !== undefined) {

                items.push(...page.billingGroups);

            }

        }
        return items;

    }

    async getPolicies (): Promise<{"policyName"?: string;
        "policyArn"?: string;}[]> {

        const client = this.#client;
        const items: {"policyName"?: string;
            "policyArn"?: string;}[] = [];
        for await (const page of paginateListPolicies(
            {client},
            {}
        )) {

            if (page.policies !== undefined) {

                items.push(...page.policies);

            }

        }
        return items;

    }

    async getCertificates (): Promise<IotCertificate[]> {

        const client = this.#client;
        const items: IotCertificate[] = [];
        for await (const page of paginateListCertificates(
            {client},
            {}
        )) {

            if (page.certificates !== undefined) {

                items.push(...page.certificates);

            }

        }
        return items;

    }

    async getAuthorizers (): Promise<AuthorizerSummary[]> {

        const client = this.#client;
        const items: AuthorizerSummary[] = [];
        for await (const page of paginateListAuthorizers(
            {client},
            {}
        )) {

            if (page.authorizers !== undefined) {

                items.push(...page.authorizers);

            }

        }
        return items;

    }

    async getDomainConfigurations (): Promise<DomainConfigurationSummary[]> {

        const client = this.#client;
        const items: DomainConfigurationSummary[] = [];
        for await (const page of paginateListDomainConfigurations(
            {client},
            {}
        )) {

            if (page.domainConfigurations !== undefined) {

                items.push(...page.domainConfigurations);

            }

        }
        return items;

    }

    async getTopicRules (): Promise<TopicRuleListItem[]> {

        const client = this.#client;
        const items: TopicRuleListItem[] = [];
        for await (const page of paginateListTopicRules(
            {client},
            {}
        )) {

            if (page.rules !== undefined) {

                items.push(...page.rules);

            }

        }
        return items;

    }

    async getTopicRuleDestinations (): Promise<TopicRuleDestinationSummary[]> {

        const client = this.#client;
        const items: TopicRuleDestinationSummary[] = [];
        for await (const page of paginateListTopicRuleDestinations(
            {client},
            {}
        )) {

            if (page.destinationSummaries !== undefined) {

                items.push(...page.destinationSummaries);

            }

        }
        return items;

    }

    async getRoleAliases (): Promise<string[]> {

        const client = this.#client;
        const items: string[] = [];
        for await (const page of paginateListRoleAliases(
            {client},
            {}
        )) {

            if (page.roleAliases !== undefined) {

                items.push(...page.roleAliases);

            }

        }
        return items;

    }

    async getStreams (): Promise<StreamSummary[]> {

        const client = this.#client;
        const items: StreamSummary[] = [];
        for await (const page of paginateListStreams(
            {client},
            {}
        )) {

            if (page.streams !== undefined) {

                items.push(...page.streams);

            }

        }
        return items;

    }

    async getProvisioningTemplates (): Promise<ProvisioningTemplateSummary[]> {

        const client = this.#client;
        const items: ProvisioningTemplateSummary[] = [];
        for await (const page of paginateListProvisioningTemplates(
            {client},
            {}
        )) {

            if (page.templates !== undefined) {

                items.push(...page.templates);

            }

        }
        return items;

    }

}

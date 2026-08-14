import type {ThingAttribute, ThingTypeDefinition, GroupNameAndArn, Certificate as IotCertificate, AuthorizerSummary, DomainConfigurationSummary, TopicRuleListItem, TopicRuleDestinationSummary, StreamSummary, ProvisioningTemplateSummary} from "@aws-sdk/client-iot";

export interface Iot {
    getThings (): Promise<ThingAttribute[]>;
    getThingTypes (): Promise<ThingTypeDefinition[]>;
    getThingGroups (): Promise<GroupNameAndArn[]>;
    getBillingGroups (): Promise<GroupNameAndArn[]>;
    getPolicies (): Promise<{"policyName"?: string;
        "policyArn"?: string;}[]>;
    getCertificates (): Promise<IotCertificate[]>;
    getAuthorizers (): Promise<AuthorizerSummary[]>;
    getDomainConfigurations (): Promise<DomainConfigurationSummary[]>;
    getTopicRules (): Promise<TopicRuleListItem[]>;
    getTopicRuleDestinations (): Promise<TopicRuleDestinationSummary[]>;
    getRoleAliases (): Promise<string[]>;
    getStreams (): Promise<StreamSummary[]>;
    getProvisioningTemplates (): Promise<ProvisioningTemplateSummary[]>;
}

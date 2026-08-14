import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type LoadBalancer,
    type TargetGroup,
    type Listener,
    type Rule,
    type Certificate,
    type TrustStore,
    type TrustStoreAssociation,
    type TagDescription,
    ElasticLoadBalancingV2Client,
    type ElasticLoadBalancingV2ClientConfig,
    paginateDescribeLoadBalancers,
    paginateDescribeTargetGroups,
    paginateDescribeListeners,
    paginateDescribeRules,
    paginateDescribeListenerCertificates,
    paginateDescribeTrustStores,
    paginateDescribeTrustStoreAssociations,
    DescribeTagsCommand
} from "@aws-sdk/client-elastic-load-balancing-v2";
import type {Elbv2} from "../../interfaces/elbv2.js";

export class Elbv2Service implements Elbv2 {

    #client: ElasticLoadBalancingV2Client;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: ElasticLoadBalancingV2ClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new ElasticLoadBalancingV2Client(config);

    }

    async getLoadBalancers (): Promise<LoadBalancer[]> {

        const client = this.#client;
        const loadBalancers: LoadBalancer[] = [];
        for await (const page of paginateDescribeLoadBalancers(
            {client},
            {}
        )) {

            if (page.LoadBalancers !== undefined) {

                loadBalancers.push(...page.LoadBalancers);

            }

        }
        return loadBalancers;

    }

    async getTargetGroups (): Promise<TargetGroup[]> {

        const client = this.#client;
        const targetGroups: TargetGroup[] = [];
        for await (const page of paginateDescribeTargetGroups(
            {client},
            {}
        )) {

            if (page.TargetGroups !== undefined) {

                targetGroups.push(...page.TargetGroups);

            }

        }
        return targetGroups;

    }

    async getListeners (loadBalancerArn: string): Promise<Listener[]> {

        const client = this.#client;
        const listeners: Listener[] = [];
        for await (const page of paginateDescribeListeners(
            {client},
            {"LoadBalancerArn": loadBalancerArn}
        )) {

            if (page.Listeners !== undefined) {

                listeners.push(...page.Listeners);

            }

        }
        return listeners;

    }

    async getRules (listenerArn: string): Promise<Rule[]> {

        const client = this.#client;
        const rules: Rule[] = [];
        for await (const page of paginateDescribeRules(
            {client},
            {"ListenerArn": listenerArn}
        )) {

            if (page.Rules !== undefined) {

                rules.push(...page.Rules);

            }

        }
        return rules;

    }

    async getListenerCertificates (listenerArn: string): Promise<Certificate[]> {

        const client = this.#client;
        const certificates: Certificate[] = [];
        for await (const page of paginateDescribeListenerCertificates(
            {client},
            {"ListenerArn": listenerArn}
        )) {

            if (page.Certificates !== undefined) {

                certificates.push(...page.Certificates);

            }

        }
        return certificates;

    }

    async getTrustStores (): Promise<TrustStore[]> {

        const client = this.#client;
        const stores: TrustStore[] = [];
        for await (const page of paginateDescribeTrustStores(
            {client},
            {}
        )) {

            if (page.TrustStores !== undefined) {

                stores.push(...page.TrustStores);

            }

        }
        return stores;

    }

    async getTrustStoreAssociations (trustStoreArn: string): Promise<TrustStoreAssociation[]> {

        const client = this.#client;
        const associations: TrustStoreAssociation[] = [];
        for await (const page of paginateDescribeTrustStoreAssociations(
            {client},
            {"TrustStoreArn": trustStoreArn}
        )) {

            if (page.TrustStoreAssociations !== undefined) {

                associations.push(...page.TrustStoreAssociations);

            }

        }
        return associations;

    }

    async getTagsForResources (arns: string[]): Promise<TagDescription[]> {

        const client = this.#client;
        const results: TagDescription[] = [];

        // ELBv2 DescribeTags accepts up to 20 ARNs per call
        for (let i = 0; i < arns.length; i += 20) {

            const batch = arns.slice(
                i,
                i + 20
            );
            try {

                const response = await client.send(new DescribeTagsCommand({"ResourceArns": batch}));
                if (response.TagDescriptions) {

                    results.push(...response.TagDescriptions);

                }

            } catch {

                // Skip batch on permission error
            }

        }

        return results;

    }

}

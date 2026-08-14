import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type Cluster,
    type Nodegroup,
    type FargateProfile,
    type Addon,
    type AccessEntry,
    type AssociatedAccessPolicy,
    EKSClient,
    type EKSClientConfig,
    paginateListClusters,
    paginateListNodegroups,
    paginateListFargateProfiles,
    paginateListPodIdentityAssociations,
    paginateListAddons,
    paginateListAccessEntries,
    paginateListAssociatedAccessPolicies,
    DescribeClusterCommand,
    DescribeNodegroupCommand,
    DescribeFargateProfileCommand,
    DescribePodIdentityAssociationCommand,
    DescribeAddonCommand,
    DescribeAccessEntryCommand
} from "@aws-sdk/client-eks";
import type {Eks, PodIdentityInfo} from "../../interfaces/eks.js";

export class EksService implements Eks {

    #client: EKSClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: EKSClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new EKSClient(config);

    }

    async getClusters (): Promise<Cluster[]> {

        const client = this.#client;
        const clusterNames: string[] = [];
        for await (const page of paginateListClusters(
            {client},
            {}
        )) {

            if (page.clusters !== undefined) {

                clusterNames.push(...page.clusters);

            }

        }

        const clusters: Cluster[] = [];
        for (const name of clusterNames) {

            try {

                const response = await client.send(new DescribeClusterCommand({"name": name}));
                if (response.cluster) {

                    clusters.push(response.cluster);

                }

            } catch {

                // Cluster may have been deleted
            }

        }
        return clusters;

    }

    async getNodegroups (clusterName: string): Promise<Nodegroup[]> {

        const client = this.#client;
        const nodegroupNames: string[] = [];
        for await (const page of paginateListNodegroups(
            {client},
            {"clusterName": clusterName}
        )) {

            if (page.nodegroups !== undefined) {

                nodegroupNames.push(...page.nodegroups);

            }

        }

        const nodegroups: Nodegroup[] = [];
        for (const name of nodegroupNames) {

            try {

                const response = await client.send(new DescribeNodegroupCommand({
                    "clusterName": clusterName,
                    "nodegroupName": name
                }));
                if (response.nodegroup) {

                    nodegroups.push(response.nodegroup);

                }

            } catch {

                // Nodegroup may have been deleted
            }

        }
        return nodegroups;

    }

    async getFargateProfiles (clusterName: string): Promise<FargateProfile[]> {

        const client = this.#client;
        const profileNames: string[] = [];
        for await (const page of paginateListFargateProfiles(
            {client},
            {"clusterName": clusterName}
        )) {

            if (page.fargateProfileNames !== undefined) {

                profileNames.push(...page.fargateProfileNames);

            }

        }

        const profiles: FargateProfile[] = [];
        for (const name of profileNames) {

            try {

                const response = await client.send(new DescribeFargateProfileCommand({
                    "clusterName": clusterName,
                    "fargateProfileName": name
                }));
                if (response.fargateProfile) {

                    profiles.push(response.fargateProfile);

                }

            } catch {

                // Fargate profile may have been deleted
            }

        }
        return profiles;

    }

    async getPodIdentityAssociations (clusterName: string): Promise<PodIdentityInfo[]> {

        const client = this.#client;
        const associationIds: string[] = [];
        for await (const page of paginateListPodIdentityAssociations(
            {client},
            {"clusterName": clusterName}
        )) {

            if (page.associations !== undefined) {

                for (const assoc of page.associations) {

                    if (assoc.associationId) {

                        associationIds.push(assoc.associationId);

                    }

                }

            }

        }

        const results: PodIdentityInfo[] = [];
        for (const associationId of associationIds) {

            try {

                const response = await client.send(new DescribePodIdentityAssociationCommand({
                    "clusterName": clusterName,
                    "associationId": associationId
                }));
                const assoc = response.association;
                if (assoc?.associationArn) {

                    results.push({
                        "associationArn": assoc.associationArn,
                        "clusterName": assoc.clusterName ?? clusterName,
                        "namespace": assoc.namespace ?? "",
                        "serviceAccount": assoc.serviceAccount ?? "",
                        "roleArn": assoc.roleArn
                    });

                }

            } catch {

                // Association may have been deleted
            }

        }
        return results;

    }

    async getAddons (clusterName: string): Promise<Addon[]> {

        const client = this.#client;
        const addonNames: string[] = [];
        for await (const page of paginateListAddons(
            {client},
            {"clusterName": clusterName}
        )) {

            if (page.addons !== undefined) {

                addonNames.push(...page.addons);

            }

        }

        const addons: Addon[] = [];
        for (const addonName of addonNames) {

            try {

                const response = await client.send(new DescribeAddonCommand({
                    "clusterName": clusterName,
                    "addonName": addonName
                }));
                if (response.addon) {

                    addons.push(response.addon);

                }

            } catch {

                // Addon may have been deleted
            }

        }
        return addons;

    }

    async getAccessEntries (clusterName: string): Promise<AccessEntry[]> {

        const client = this.#client;
        const principalArns: string[] = [];
        for await (const page of paginateListAccessEntries(
            {client},
            {"clusterName": clusterName}
        )) {

            if (page.accessEntries !== undefined) {

                principalArns.push(...page.accessEntries);

            }

        }

        const entries: AccessEntry[] = [];
        for (const principalArn of principalArns) {

            try {

                const response = await client.send(new DescribeAccessEntryCommand({
                    "clusterName": clusterName,
                    "principalArn": principalArn
                }));
                if (response.accessEntry) {

                    entries.push(response.accessEntry);

                }

            } catch {

                // Access entry may have been deleted
            }

        }
        return entries;

    }

    async getAssociatedAccessPolicies (clusterName: string, principalArn: string): Promise<AssociatedAccessPolicy[]> {

        const client = this.#client;
        const policies: AssociatedAccessPolicy[] = [];
        for await (const page of paginateListAssociatedAccessPolicies(
            {client},
            {"clusterName": clusterName,
                "principalArn": principalArn}
        )) {

            if (page.associatedAccessPolicies !== undefined) {

                policies.push(...page.associatedAccessPolicies);

            }

        }
        return policies;

    }

}

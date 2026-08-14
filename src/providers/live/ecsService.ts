import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type Cluster,
    type Service as EcsService,
    type ContainerInstance,
    ECSClient,
    type ECSClientConfig,
    paginateListClusters,
    paginateListServices,
    paginateListTaskDefinitions,
    paginateListContainerInstances,
    DescribeClustersCommand,
    DescribeServicesCommand,
    DescribeContainerInstancesCommand
} from "@aws-sdk/client-ecs";
import type {Ecs} from "../../interfaces/ecs.js";

export class EcsServiceImpl implements Ecs {

    #client: ECSClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: ECSClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new ECSClient(config);

    }

    async getClusters (): Promise<Cluster[]> {

        const client = this.#client;
        const clusterArns: string[] = [];
        for await (const page of paginateListClusters(
            {client},
            {}
        )) {

            if (page.clusterArns !== undefined) {

                clusterArns.push(...page.clusterArns);

            }

        }

        if (clusterArns.length === 0) {

            return [];

        }

        // DescribeClusters accepts up to 100 ARNs
        const clusters: Cluster[] = [];
        for (let i = 0; i < clusterArns.length; i += 100) {

            const batch = clusterArns.slice(
                i,
                i + 100
            );
            const response = await client.send(new DescribeClustersCommand({"clusters": batch,
                "include": ["TAGS"]}));
            if (response.clusters) {

                clusters.push(...response.clusters);

            }

        }
        return clusters;

    }

    async getServices (clusterArn: string): Promise<EcsService[]> {

        const client = this.#client;
        const serviceArns: string[] = [];
        for await (const page of paginateListServices(
            {client},
            {"cluster": clusterArn}
        )) {

            if (page.serviceArns !== undefined) {

                serviceArns.push(...page.serviceArns);

            }

        }

        if (serviceArns.length === 0) {

            return [];

        }

        // DescribeServices accepts up to 10 ARNs
        const services: EcsService[] = [];
        for (let i = 0; i < serviceArns.length; i += 10) {

            const batch = serviceArns.slice(
                i,
                i + 10
            );
            const response = await client.send(new DescribeServicesCommand({
                "cluster": clusterArn,
                "services": batch
            }));
            if (response.services) {

                services.push(...response.services);

            }

        }
        return services;

    }

    async getTaskDefinitionArns (): Promise<string[]> {

        const client = this.#client;
        const arns: string[] = [];

        for await (const page of paginateListTaskDefinitions(
            {client},
            {}
        )) {

            if (page.taskDefinitionArns !== undefined) {

                arns.push(...page.taskDefinitionArns);

            }

        }

        return arns;

    }

    async getContainerInstances (clusterArn: string): Promise<ContainerInstance[]> {

        const client = this.#client;
        const containerInstanceArns: string[] = [];

        for await (const page of paginateListContainerInstances(
            {client},
            {"cluster": clusterArn}
        )) {

            if (page.containerInstanceArns !== undefined) {

                containerInstanceArns.push(...page.containerInstanceArns);

            }

        }

        if (containerInstanceArns.length === 0) {

            return [];

        }

        // DescribeContainerInstances accepts up to 100 ARNs
        const containerInstances: ContainerInstance[] = [];
        for (let i = 0; i < containerInstanceArns.length; i += 100) {

            const batch = containerInstanceArns.slice(
                i,
                i + 100
            );
            const response = await client.send(new DescribeContainerInstancesCommand({
                "cluster": clusterArn,
                "containerInstances": batch
            }));
            if (response.containerInstances) {

                containerInstances.push(...response.containerInstances);

            }

        }

        return containerInstances;

    }

}

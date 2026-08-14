import type {Cluster, Service as EcsService, ContainerInstance} from "@aws-sdk/client-ecs";

export interface ContainerInstanceInfo {
    "containerInstance": ContainerInstance;
    "clusterArn": string;
}

export interface Ecs {
    getClusters (): Promise<Cluster[]>;
    getServices (clusterArn: string): Promise<EcsService[]>;
    getTaskDefinitionArns (): Promise<string[]>;
    getContainerInstances (clusterArn: string): Promise<ContainerInstance[]>;
}

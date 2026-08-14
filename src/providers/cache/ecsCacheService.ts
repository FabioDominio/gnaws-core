import type {Cluster, Service as EcsService, ContainerInstance} from "@aws-sdk/client-ecs";
import type {Ecs} from "../../interfaces/ecs.js";
import {readCacheFile} from "./cacheReader.js";

export class EcsCacheService implements Ecs {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getClusters (): Promise<Cluster[]> {

        return readCacheFile(
            this.#cacheDir,
            "ecs_clusters.json"
        );

    }

    async getServices (_clusterArn: string): Promise<EcsService[]> {

        return readCacheFile(
            this.#cacheDir,
            "ecs_services.json"
        );

    }

    async getTaskDefinitionArns (): Promise<string[]> {

        return readCacheFile(
            this.#cacheDir,
            "ecs_task_definition_arns.json"
        );

    }

    async getContainerInstances (_clusterArn: string): Promise<ContainerInstance[]> {

        return readCacheFile(
            this.#cacheDir,
            "ecs_container_instances.json"
        );

    }

}

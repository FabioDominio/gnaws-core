import type {NamespaceSummary, Service, InstanceSummary} from "@aws-sdk/client-servicediscovery";
import type {ServiceDiscovery} from "../../interfaces/servicediscovery.js";
import {readCacheFile} from "./cacheReader.js";

export class CacheServiceDiscoveryCacheService implements ServiceDiscovery {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getNamespaces (): Promise<NamespaceSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "servicediscovery_namespaces.json"
        );

    }

    async getServices (): Promise<Service[]> {

        return readCacheFile(
            this.#cacheDir,
            "servicediscovery_services.json"
        );

    }

    async getInstances (_serviceId: string): Promise<InstanceSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "servicediscovery_instances.json"
        );

    }

}

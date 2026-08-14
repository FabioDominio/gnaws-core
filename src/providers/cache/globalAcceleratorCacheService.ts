import type {Accelerator, Listener, EndpointGroup} from "@aws-sdk/client-global-accelerator";
import type {GlobalAcceleratorService} from "../../interfaces/globalaccelerator.js";
import {readCacheFile} from "./cacheReader.js";

export class GlobalAcceleratorCacheService implements GlobalAcceleratorService {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getAccelerators (): Promise<Accelerator[]> {

        return readCacheFile(
            this.#cacheDir,
            "global_accelerator_accelerators.json"
        );

    }

    async getListeners (_acceleratorArn: string): Promise<Listener[]> {

        return readCacheFile(
            this.#cacheDir,
            "global_accelerator_listeners.json"
        );

    }

    async getEndpointGroups (_listenerArn: string): Promise<EndpointGroup[]> {

        return readCacheFile(
            this.#cacheDir,
            "global_accelerator_endpoint_groups.json"
        );

    }

}

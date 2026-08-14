import type {InfrastructureConfiguration} from "@aws-sdk/client-imagebuilder";
import type {ImageBuilder} from "../../interfaces/imagebuilder.js";
import {readCacheFile} from "./cacheReader.js";

export class ImageBuilderCacheService implements ImageBuilder {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getInfrastructureConfigurations (): Promise<InfrastructureConfiguration[]> {

        return readCacheFile(
            this.#cacheDir,
            "imagebuilder_infra_configs.json"
        );

    }

}

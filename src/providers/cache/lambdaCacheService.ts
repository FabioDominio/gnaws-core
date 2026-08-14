import type {FunctionConfiguration, EventSourceMappingConfiguration, LayersListItem, AliasConfiguration, FunctionUrlConfig, ProvisionedConcurrencyConfigListItem} from "@aws-sdk/client-lambda";
import type {Lambda} from "../../interfaces/lambda.js";
import {readCacheFile} from "./cacheReader.js";

export class LambdaCacheService implements Lambda {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getLambdas (): Promise<FunctionConfiguration[]> {

        return readCacheFile(
            this.#cacheDir,
            "lambda_functions.json"
        );

    }

    async getEventSourceMappings (): Promise<EventSourceMappingConfiguration[]> {

        return readCacheFile(
            this.#cacheDir,
            "lambda_event_source_mappings.json"
        );

    }

    async getLayers (): Promise<LayersListItem[]> {

        return readCacheFile(
            this.#cacheDir,
            "lambda_layers.json"
        );

    }

    async getAliases (_functionName: string): Promise<AliasConfiguration[]> {

        return readCacheFile(
            this.#cacheDir,
            "lambda_aliases.json"
        );

    }

    async getFunctionUrlConfigs (_functionName: string): Promise<FunctionUrlConfig[]> {

        return readCacheFile(
            this.#cacheDir,
            "lambda_function_url_configs.json"
        );

    }

    async getProvisionedConcurrencyConfigs (_functionName: string): Promise<ProvisionedConcurrencyConfigListItem[]> {

        return readCacheFile(
            this.#cacheDir,
            "lambda_provisioned_concurrency.json"
        );

    }

    async getTagsForFunction (_functionArn: string): Promise<Record<string, string>> {

        return {};

    }

}

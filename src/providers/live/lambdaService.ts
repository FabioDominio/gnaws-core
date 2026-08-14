import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type FunctionConfiguration,
    type EventSourceMappingConfiguration,
    type LayersListItem,
    type AliasConfiguration,
    type FunctionUrlConfig,
    type ProvisionedConcurrencyConfigListItem,
    LambdaClient,
    type LambdaClientConfig,
    paginateListFunctions,
    paginateListEventSourceMappings,
    paginateListLayers,
    paginateListAliases,
    paginateListFunctionUrlConfigs,
    paginateListProvisionedConcurrencyConfigs,
    ListTagsCommand
} from "@aws-sdk/client-lambda";

/*
 *  Available but not yet implemented:
 *  paginateGetDurableExecutionHistory,
 *  paginateGetDurableExecutionState,
 *  paginateListCapacityProviders,
 *  paginateListCodeSigningConfigs,
 *  paginateListDurableExecutionsByFunction,
 *  paginateListFunctionEventInvokeConfigs,
 *  paginateListFunctionVersionsByCapacityProvider,
 *  paginateListFunctionsByCodeSigningConfig,
 *  paginateListLayerVersions,
 *  paginateListVersionsByFunction,
 */
import type {Lambda} from "../../interfaces/lambda.js";

export class LambdaService implements Lambda {

    #lambdaClient: LambdaClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const lambdaClientConfig: LambdaClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#lambdaClient = new LambdaClient(lambdaClientConfig);

    }

    async getLambdas (): Promise<FunctionConfiguration[]> {

        const client = this.#lambdaClient;
        const lambdas = [];
        for await (const page of paginateListFunctions(
            {client},
            {}
        )) {

            if (page.Functions !== undefined) {

                lambdas.push(...page.Functions);

            }

        }
        return lambdas;

    }

    async getEventSourceMappings (): Promise<EventSourceMappingConfiguration[]> {

        const client = this.#lambdaClient;
        const mappings = [];
        for await (const page of paginateListEventSourceMappings(
            {client},
            {}
        )) {

            if (page.EventSourceMappings !== undefined) {

                mappings.push(...page.EventSourceMappings);

            }

        }
        return mappings;

    }

    async getLayers (): Promise<LayersListItem[]> {

        const client = this.#lambdaClient;
        const layers = [];
        for await (const page of paginateListLayers(
            {client},
            {}
        )) {

            if (page.Layers !== undefined) {

                layers.push(...page.Layers);

            }

        }
        return layers;

    }

    async getAliases (functionName: string): Promise<AliasConfiguration[]> {

        const client = this.#lambdaClient;
        const aliases = [];
        for await (const page of paginateListAliases(
            {client},
            {"FunctionName": functionName}
        )) {

            if (page.Aliases !== undefined) {

                aliases.push(...page.Aliases);

            }

        }
        return aliases;

    }

    async getFunctionUrlConfigs (functionName: string): Promise<FunctionUrlConfig[]> {

        const client = this.#lambdaClient;
        const urls = [];
        for await (const page of paginateListFunctionUrlConfigs(
            {client},
            {"FunctionName": functionName}
        )) {

            if (page.FunctionUrlConfigs !== undefined) {

                urls.push(...page.FunctionUrlConfigs);

            }

        }
        return urls;

    }

    async getProvisionedConcurrencyConfigs (functionName: string): Promise<ProvisionedConcurrencyConfigListItem[]> {

        const client = this.#lambdaClient;
        const configs = [];
        for await (const page of paginateListProvisionedConcurrencyConfigs(
            {client},
            {"FunctionName": functionName}
        )) {

            if (page.ProvisionedConcurrencyConfigs !== undefined) {

                configs.push(...page.ProvisionedConcurrencyConfigs);

            }

        }
        return configs;

    }

    async getTagsForFunction (functionArn: string): Promise<Record<string, string>> {

        try {

            const response = await this.#lambdaClient.send(new ListTagsCommand({"Resource": functionArn}));
            return response.Tags ?? {};

        } catch {

            return {};

        }

    }

}

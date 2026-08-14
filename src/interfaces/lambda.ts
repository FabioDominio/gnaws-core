import type {AliasConfiguration, EventSourceMappingConfiguration, FunctionConfiguration, FunctionUrlConfig, LayersListItem, ProvisionedConcurrencyConfigListItem} from "@aws-sdk/client-lambda";

export interface Lambda {
    getLambdas (): Promise<FunctionConfiguration[]>;
    getEventSourceMappings (): Promise<EventSourceMappingConfiguration[]>;
    getLayers (): Promise<LayersListItem[]>;
    getAliases (functionName: string): Promise<AliasConfiguration[]>;
    getFunctionUrlConfigs (functionName: string): Promise<FunctionUrlConfig[]>;
    getProvisionedConcurrencyConfigs (functionName: string): Promise<ProvisionedConcurrencyConfigListItem[]>;
    getTagsForFunction (functionArn: string): Promise<Record<string, string>>;
}

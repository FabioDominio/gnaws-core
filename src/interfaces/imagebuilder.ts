import type {InfrastructureConfiguration} from "@aws-sdk/client-imagebuilder";
export interface ImageBuilder {
    getInfrastructureConfigurations (): Promise<InfrastructureConfiguration[]>;
}

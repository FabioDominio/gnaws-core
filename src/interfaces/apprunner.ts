import type {Service, VpcConnector} from "@aws-sdk/client-apprunner";

export interface AppRunner {
    getServices (): Promise<Service[]>;
    getVpcConnectors (): Promise<VpcConnector[]>;
}

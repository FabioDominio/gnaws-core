import type {BrokerSummary, Configuration} from "@aws-sdk/client-mq";

export interface Mq {
    getBrokers (): Promise<BrokerSummary[]>;
    getConfigurations (): Promise<Configuration[]>;
}

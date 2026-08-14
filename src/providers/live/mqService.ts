import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type BrokerSummary,
    type Configuration,
    MqClient,
    type MqClientConfig,
    paginateListBrokers,
    ListConfigurationsCommand
} from "@aws-sdk/client-mq";
import type {Mq} from "../../interfaces/mq.js";

export class MqService implements Mq {

    #client: MqClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: MqClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new MqClient(config);

    }

    async getBrokers (): Promise<BrokerSummary[]> {

        const client = this.#client;
        const brokers: BrokerSummary[] = [];
        for await (const page of paginateListBrokers(
            {client},
            {}
        )) {

            if (page.BrokerSummaries !== undefined) {

                brokers.push(...page.BrokerSummaries);

            }

        }
        return brokers;

    }

    async getConfigurations (): Promise<Configuration[]> {

        const response = await this.#client.send(new ListConfigurationsCommand({}));
        return response.Configurations ?? [];

    }

}

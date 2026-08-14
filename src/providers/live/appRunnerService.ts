import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type Service,
    type VpcConnector,
    AppRunnerClient,
    type AppRunnerClientConfig,
    paginateListServices,
    paginateListVpcConnectors,
    DescribeServiceCommand
} from "@aws-sdk/client-apprunner";
import type {AppRunner} from "../../interfaces/apprunner.js";

export class AppRunnerService implements AppRunner {

    #client: AppRunnerClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: AppRunnerClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new AppRunnerClient(config);

    }

    async getServices (): Promise<Service[]> {

        const client = this.#client;
        const arns: string[] = [];
        for await (const page of paginateListServices(
            {client},
            {}
        )) {

            for (const svc of page.ServiceSummaryList ?? []) {

                if (svc.ServiceArn) {

                    arns.push(svc.ServiceArn);

                }

            }

        }

        const services: Service[] = [];
        for (const arn of arns) {

            try {

                const response = await client.send(new DescribeServiceCommand({"ServiceArn": arn}));
                if (response.Service) {

                    services.push(response.Service);

                }

            } catch {

                // Service may have been deleted
            }

        }
        return services;

    }

    async getVpcConnectors (): Promise<VpcConnector[]> {

        const client = this.#client;
        const connectors: VpcConnector[] = [];
        for await (const page of paginateListVpcConnectors(
            {client},
            {}
        )) {

            if (page.VpcConnectors !== undefined) {

                connectors.push(...page.VpcConnectors);

            }

        }
        return connectors;

    }

}

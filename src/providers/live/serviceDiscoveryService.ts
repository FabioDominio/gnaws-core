import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type NamespaceSummary,
    type Service,
    type InstanceSummary,
    ServiceDiscoveryClient,
    type ServiceDiscoveryClientConfig,
    paginateListNamespaces,
    paginateListServices,
    paginateListInstances,
    GetServiceCommand
} from "@aws-sdk/client-servicediscovery";
import type {ServiceDiscovery} from "../../interfaces/servicediscovery.js";

export class ServiceDiscoveryService implements ServiceDiscovery {

    #client: ServiceDiscoveryClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: ServiceDiscoveryClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new ServiceDiscoveryClient(config);

    }

    async getNamespaces (): Promise<NamespaceSummary[]> {

        const client = this.#client;
        const namespaces: NamespaceSummary[] = [];

        for await (const page of paginateListNamespaces(
            {client},
            {}
        )) {

            if (page.Namespaces !== undefined) {

                namespaces.push(...page.Namespaces);

            }

        }

        return namespaces;

    }

    async getServices (): Promise<Service[]> {

        const client = this.#client;
        const serviceIds: string[] = [];

        for await (const page of paginateListServices(
            {client},
            {}
        )) {

            if (page.Services !== undefined) {

                for (const svc of page.Services) {

                    if (svc.Id) {

                        serviceIds.push(svc.Id);

                    }

                }

            }

        }

        const services: Service[] = [];

        for (const serviceId of serviceIds) {

            const response = await this.#client.send(new GetServiceCommand({
                "Id": serviceId
            }));

            if (response.Service) {

                services.push(response.Service);

            }

        }

        return services;

    }

    async getInstances (serviceId: string): Promise<InstanceSummary[]> {

        const client = this.#client;
        const results: InstanceSummary[] = [];

        for await (const page of paginateListInstances(
            {client},
            {"ServiceId": serviceId}
        )) {

            if (page.Instances !== undefined) {

                results.push(...page.Instances);

            }

        }

        return results;

    }

}

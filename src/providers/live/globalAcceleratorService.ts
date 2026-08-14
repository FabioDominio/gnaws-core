import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type Accelerator,
    type Listener,
    type EndpointGroup,
    GlobalAcceleratorClient,
    type GlobalAcceleratorClientConfig,
    paginateListAccelerators,
    paginateListListeners,
    paginateListEndpointGroups
} from "@aws-sdk/client-global-accelerator";
import type {GlobalAcceleratorService} from "../../interfaces/globalaccelerator.js";

export class GlobalAcceleratorServiceImpl implements GlobalAcceleratorService {

    #client: GlobalAcceleratorClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, logger?: SdkLogger) {

        const config: GlobalAcceleratorClientConfig = {
            "region": "us-west-2",
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new GlobalAcceleratorClient(config);

    }

    async getAccelerators (): Promise<Accelerator[]> {

        const client = this.#client;
        const accelerators: Accelerator[] = [];

        for await (const page of paginateListAccelerators(
            {client},
            {}
        )) {

            if (page.Accelerators !== undefined) {

                accelerators.push(...page.Accelerators);

            }

        }

        return accelerators;

    }

    async getListeners (acceleratorArn: string): Promise<Listener[]> {

        const client = this.#client;
        const results: Listener[] = [];

        for await (const page of paginateListListeners(
            {client},
            {"AcceleratorArn": acceleratorArn}
        )) {

            if (page.Listeners !== undefined) {

                results.push(...page.Listeners);

            }

        }

        return results;

    }

    async getEndpointGroups (listenerArn: string): Promise<EndpointGroup[]> {

        const client = this.#client;
        const results: EndpointGroup[] = [];

        for await (const page of paginateListEndpointGroups(
            {client},
            {"ListenerArn": listenerArn}
        )) {

            if (page.EndpointGroups !== undefined) {

                results.push(...page.EndpointGroups);

            }

        }

        return results;

    }

}

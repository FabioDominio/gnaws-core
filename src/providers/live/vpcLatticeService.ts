import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type ServiceNetworkSummary,
    type ServiceSummary,
    type TargetGroupSummary,
    type ServiceNetworkVpcAssociationSummary,
    type ServiceNetworkServiceAssociationSummary,
    VPCLatticeClient,
    type VPCLatticeClientConfig,
    paginateListServiceNetworks,
    paginateListServices,
    paginateListTargetGroups,
    paginateListServiceNetworkVpcAssociations,
    paginateListServiceNetworkServiceAssociations
} from "@aws-sdk/client-vpc-lattice";
import type {VpcLattice} from "../../interfaces/vpclattice.js";

export class VpcLatticeService implements VpcLattice {

    #client: VPCLatticeClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: VPCLatticeClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new VPCLatticeClient(config);

    }

    async getServiceNetworks (): Promise<ServiceNetworkSummary[]> {

        const client = this.#client;
        const items: ServiceNetworkSummary[] = [];
        for await (const page of paginateListServiceNetworks(
            {client},
            {}
        )) {

            if (page.items !== undefined) {

                items.push(...page.items);

            }

        }
        return items;

    }

    async getServices (): Promise<ServiceSummary[]> {

        const client = this.#client;
        const items: ServiceSummary[] = [];
        for await (const page of paginateListServices(
            {client},
            {}
        )) {

            if (page.items !== undefined) {

                items.push(...page.items);

            }

        }
        return items;

    }

    async getTargetGroups (): Promise<TargetGroupSummary[]> {

        const client = this.#client;
        const items: TargetGroupSummary[] = [];
        for await (const page of paginateListTargetGroups(
            {client},
            {}
        )) {

            if (page.items !== undefined) {

                items.push(...page.items);

            }

        }
        return items;

    }

    async getServiceNetworkVpcAssociations (serviceNetworkIdentifier: string): Promise<ServiceNetworkVpcAssociationSummary[]> {

        const client = this.#client;
        const items: ServiceNetworkVpcAssociationSummary[] = [];
        for await (const page of paginateListServiceNetworkVpcAssociations(
            {client},
            {"serviceNetworkIdentifier": serviceNetworkIdentifier}
        )) {

            if (page.items !== undefined) {

                items.push(...page.items);

            }

        }
        return items;

    }

    async getServiceNetworkServiceAssociations (serviceNetworkIdentifier: string): Promise<ServiceNetworkServiceAssociationSummary[]> {

        const client = this.#client;
        const items: ServiceNetworkServiceAssociationSummary[] = [];
        for await (const page of paginateListServiceNetworkServiceAssociations(
            {client},
            {"serviceNetworkIdentifier": serviceNetworkIdentifier}
        )) {

            if (page.items !== undefined) {

                items.push(...page.items);

            }

        }
        return items;

    }

}

import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type GlobalNetwork,
    type Site,
    type Device,
    type Link,
    type Connection,
    type CoreNetworkSummary,
    type Attachment,
    type TransitGatewayRegistration,
    type ConnectPeerAssociation,
    type CustomerGatewayAssociation,
    type LinkAssociation,
    NetworkManagerClient,
    type NetworkManagerClientConfig,
    paginateDescribeGlobalNetworks,
    paginateGetSites,
    paginateGetDevices,
    paginateGetLinks,
    paginateGetConnections,
    paginateListCoreNetworks,
    paginateListAttachments,
    paginateGetTransitGatewayRegistrations,
    paginateGetConnectPeerAssociations,
    paginateGetCustomerGatewayAssociations,
    paginateGetLinkAssociations
} from "@aws-sdk/client-networkmanager";
import type {NetworkManager} from "../../interfaces/networkmanager.js";

export class NetworkManagerService implements NetworkManager {

    #client: NetworkManagerClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: NetworkManagerClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new NetworkManagerClient(config);

    }

    async getGlobalNetworks (): Promise<GlobalNetwork[]> {

        const client = this.#client;
        const items: GlobalNetwork[] = [];
        for await (const page of paginateDescribeGlobalNetworks(
            {client},
            {}
        )) {

            if (page.GlobalNetworks !== undefined) {

                items.push(...page.GlobalNetworks);

            }

        }
        return items;

    }

    async getSites (globalNetworkId: string): Promise<Site[]> {

        const client = this.#client;
        const items: Site[] = [];
        for await (const page of paginateGetSites(
            {client},
            {"GlobalNetworkId": globalNetworkId}
        )) {

            if (page.Sites !== undefined) {

                items.push(...page.Sites);

            }

        }
        return items;

    }

    async getDevices (globalNetworkId: string): Promise<Device[]> {

        const client = this.#client;
        const items: Device[] = [];
        for await (const page of paginateGetDevices(
            {client},
            {"GlobalNetworkId": globalNetworkId}
        )) {

            if (page.Devices !== undefined) {

                items.push(...page.Devices);

            }

        }
        return items;

    }

    async getLinks (globalNetworkId: string): Promise<Link[]> {

        const client = this.#client;
        const items: Link[] = [];
        for await (const page of paginateGetLinks(
            {client},
            {"GlobalNetworkId": globalNetworkId}
        )) {

            if (page.Links !== undefined) {

                items.push(...page.Links);

            }

        }
        return items;

    }

    async getConnections (globalNetworkId: string): Promise<Connection[]> {

        const client = this.#client;
        const items: Connection[] = [];
        for await (const page of paginateGetConnections(
            {client},
            {"GlobalNetworkId": globalNetworkId}
        )) {

            if (page.Connections !== undefined) {

                items.push(...page.Connections);

            }

        }
        return items;

    }

    async getCoreNetworks (): Promise<CoreNetworkSummary[]> {

        const client = this.#client;
        const items: CoreNetworkSummary[] = [];
        for await (const page of paginateListCoreNetworks(
            {client},
            {}
        )) {

            if (page.CoreNetworks !== undefined) {

                items.push(...page.CoreNetworks);

            }

        }
        return items;

    }

    async getAttachments (): Promise<Attachment[]> {

        const client = this.#client;
        const items: Attachment[] = [];
        for await (const page of paginateListAttachments(
            {client},
            {}
        )) {

            if (page.Attachments !== undefined) {

                items.push(...page.Attachments);

            }

        }
        return items;

    }

    async getTransitGatewayRegistrations (globalNetworkId: string): Promise<TransitGatewayRegistration[]> {

        const client = this.#client;
        const items: TransitGatewayRegistration[] = [];
        for await (const page of paginateGetTransitGatewayRegistrations(
            {client},
            {"GlobalNetworkId": globalNetworkId}
        )) {

            if (page.TransitGatewayRegistrations !== undefined) {

                items.push(...page.TransitGatewayRegistrations);

            }

        }
        return items;

    }

    async getConnectPeerAssociations (globalNetworkId: string): Promise<ConnectPeerAssociation[]> {

        const client = this.#client;
        const items: ConnectPeerAssociation[] = [];
        for await (const page of paginateGetConnectPeerAssociations(
            {client},
            {"GlobalNetworkId": globalNetworkId}
        )) {

            if (page.ConnectPeerAssociations !== undefined) {

                items.push(...page.ConnectPeerAssociations);

            }

        }
        return items;

    }

    async getCustomerGatewayAssociations (globalNetworkId: string): Promise<CustomerGatewayAssociation[]> {

        const client = this.#client;
        const items: CustomerGatewayAssociation[] = [];
        for await (const page of paginateGetCustomerGatewayAssociations(
            {client},
            {"GlobalNetworkId": globalNetworkId}
        )) {

            if (page.CustomerGatewayAssociations !== undefined) {

                items.push(...page.CustomerGatewayAssociations);

            }

        }
        return items;

    }

    async getLinkAssociations (globalNetworkId: string): Promise<LinkAssociation[]> {

        const client = this.#client;
        const items: LinkAssociation[] = [];
        for await (const page of paginateGetLinkAssociations(
            {client},
            {"GlobalNetworkId": globalNetworkId}
        )) {

            if (page.LinkAssociations !== undefined) {

                items.push(...page.LinkAssociations);

            }

        }
        return items;

    }

}

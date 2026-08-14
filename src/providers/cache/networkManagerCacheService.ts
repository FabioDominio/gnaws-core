import type {GlobalNetwork, Site, Device, Link, Connection, CoreNetworkSummary, Attachment, TransitGatewayRegistration, ConnectPeerAssociation, CustomerGatewayAssociation, LinkAssociation} from "@aws-sdk/client-networkmanager";
import type {NetworkManager} from "../../interfaces/networkmanager.js";
import {readCacheFile} from "./cacheReader.js";

export class NetworkManagerCacheService implements NetworkManager {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getGlobalNetworks (): Promise<GlobalNetwork[]> {

        return readCacheFile(
            this.#cacheDir,
            "networkmanager_global_networks.json"
        );

    }

    async getSites (_globalNetworkId: string): Promise<Site[]> {

        return readCacheFile(
            this.#cacheDir,
            "networkmanager_sites.json"
        );

    }

    async getDevices (_globalNetworkId: string): Promise<Device[]> {

        return readCacheFile(
            this.#cacheDir,
            "networkmanager_devices.json"
        );

    }

    async getLinks (_globalNetworkId: string): Promise<Link[]> {

        return readCacheFile(
            this.#cacheDir,
            "networkmanager_links.json"
        );

    }

    async getConnections (_globalNetworkId: string): Promise<Connection[]> {

        return readCacheFile(
            this.#cacheDir,
            "networkmanager_connections.json"
        );

    }

    async getCoreNetworks (): Promise<CoreNetworkSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "networkmanager_core_networks.json"
        );

    }

    async getAttachments (): Promise<Attachment[]> {

        return readCacheFile(
            this.#cacheDir,
            "networkmanager_attachments.json"
        );

    }

    async getTransitGatewayRegistrations (_globalNetworkId: string): Promise<TransitGatewayRegistration[]> {

        return readCacheFile(
            this.#cacheDir,
            "networkmanager_transit_gateway_registrations.json"
        );

    }

    async getConnectPeerAssociations (_globalNetworkId: string): Promise<ConnectPeerAssociation[]> {

        return readCacheFile(
            this.#cacheDir,
            "networkmanager_connect_peer_associations.json"
        );

    }

    async getCustomerGatewayAssociations (_globalNetworkId: string): Promise<CustomerGatewayAssociation[]> {

        return readCacheFile(
            this.#cacheDir,
            "networkmanager_customer_gateway_associations.json"
        );

    }

    async getLinkAssociations (_globalNetworkId: string): Promise<LinkAssociation[]> {

        return readCacheFile(
            this.#cacheDir,
            "networkmanager_link_associations.json"
        );

    }

}

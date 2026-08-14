import type {GlobalNetwork, Site, Device, Link, Connection, CoreNetworkSummary, Attachment, TransitGatewayRegistration, ConnectPeerAssociation, CustomerGatewayAssociation, LinkAssociation} from "@aws-sdk/client-networkmanager";

export interface NetworkManager {
    getGlobalNetworks (): Promise<GlobalNetwork[]>;
    getSites (globalNetworkId: string): Promise<Site[]>;
    getDevices (globalNetworkId: string): Promise<Device[]>;
    getLinks (globalNetworkId: string): Promise<Link[]>;
    getConnections (globalNetworkId: string): Promise<Connection[]>;
    getCoreNetworks (): Promise<CoreNetworkSummary[]>;
    getAttachments (): Promise<Attachment[]>;
    getTransitGatewayRegistrations (globalNetworkId: string): Promise<TransitGatewayRegistration[]>;
    getConnectPeerAssociations (globalNetworkId: string): Promise<ConnectPeerAssociation[]>;
    getCustomerGatewayAssociations (globalNetworkId: string): Promise<CustomerGatewayAssociation[]>;
    getLinkAssociations (globalNetworkId: string): Promise<LinkAssociation[]>;
}

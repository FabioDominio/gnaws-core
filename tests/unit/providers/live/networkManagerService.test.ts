import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    NetworkManagerClient,
    DescribeGlobalNetworksCommand,
    GetSitesCommand,
    GetDevicesCommand,
    GetLinksCommand,
    GetConnectionsCommand,
    ListCoreNetworksCommand,
    ListAttachmentsCommand,
    GetTransitGatewayRegistrationsCommand,
    GetConnectPeerAssociationsCommand,
    GetCustomerGatewayAssociationsCommand,
    GetLinkAssociationsCommand
} from "@aws-sdk/client-networkmanager";
import {NetworkManagerService} from "../../../../src/providers/live/networkManagerService.js";

const nmMock = mockClient(NetworkManagerClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    nmMock.reset();

});

describe(
    "NetworkManagerService",
    () => {

        describe(
            "getGlobalNetworks",
            () => {

                it(
                    "returns global networks",
                    async () => {

                        nmMock.on(DescribeGlobalNetworksCommand).resolves({
                            "GlobalNetworks": [
                                {"GlobalNetworkId": "gn-1",
                                    "GlobalNetworkArn": "arn:aws:networkmanager::123:global-network/gn-1"},
                                {"GlobalNetworkId": "gn-2",
                                    "GlobalNetworkArn": "arn:aws:networkmanager::123:global-network/gn-2"}
                            ]
                        });

                        const service = new NetworkManagerService(
                            creds,
                            "us-east-1"
                        );
                        const networks = await service.getGlobalNetworks();

                        expect(networks).toHaveLength(2);
                        expect(networks[0].GlobalNetworkId).toBe("gn-1");

                    }
                );

                it(
                    "returns empty when no global networks",
                    async () => {

                        nmMock.on(DescribeGlobalNetworksCommand).resolves({});

                        const service = new NetworkManagerService(
                            creds,
                            "us-east-1"
                        );
                        const networks = await service.getGlobalNetworks();

                        expect(networks).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getCoreNetworks",
            () => {

                it(
                    "returns core networks",
                    async () => {

                        nmMock.on(ListCoreNetworksCommand).resolves({
                            "CoreNetworks": [
                                {"CoreNetworkId": "cn-1",
                                    "CoreNetworkArn": "arn:aws:networkmanager::123:core-network/cn-1"},
                                {"CoreNetworkId": "cn-2",
                                    "CoreNetworkArn": "arn:aws:networkmanager::123:core-network/cn-2"}
                            ]
                        });

                        const service = new NetworkManagerService(
                            creds,
                            "us-east-1"
                        );
                        const networks = await service.getCoreNetworks();

                        expect(networks).toHaveLength(2);
                        expect(networks[0].CoreNetworkId).toBe("cn-1");

                    }
                );

                it(
                    "returns empty when no core networks",
                    async () => {

                        nmMock.on(ListCoreNetworksCommand).resolves({});

                        const service = new NetworkManagerService(
                            creds,
                            "us-east-1"
                        );
                        const networks = await service.getCoreNetworks();

                        expect(networks).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getAttachments",
            () => {

                it(
                    "returns attachments",
                    async () => {

                        nmMock.on(ListAttachmentsCommand).resolves({
                            "Attachments": [
                                {"AttachmentId": "att-1",
                                    "AttachmentType": "VPC",
                                    "CoreNetworkId": "cn-1"},
                                {"AttachmentId": "att-2",
                                    "AttachmentType": "SITE_TO_SITE_VPN",
                                    "CoreNetworkId": "cn-1"}
                            ]
                        });

                        const service = new NetworkManagerService(
                            creds,
                            "us-east-1"
                        );
                        const attachments = await service.getAttachments();

                        expect(attachments).toHaveLength(2);
                        expect(attachments[0].AttachmentId).toBe("att-1");

                    }
                );

                it(
                    "returns empty when no attachments",
                    async () => {

                        nmMock.on(ListAttachmentsCommand).resolves({});

                        const service = new NetworkManagerService(
                            creds,
                            "us-east-1"
                        );
                        const attachments = await service.getAttachments();

                        expect(attachments).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getSites",
            () => {

                it(
                    "returns sites for a global network",
                    async () => {

                        nmMock.on(GetSitesCommand).resolves({
                            "Sites": [
                                {"SiteId": "site-1",
                                    "GlobalNetworkId": "gn-1"},
                                {"SiteId": "site-2",
                                    "GlobalNetworkId": "gn-1"}
                            ]
                        });

                        const service = new NetworkManagerService(
                            creds,
                            "us-east-1"
                        );
                        const sites = await service.getSites("gn-1");

                        expect(sites).toHaveLength(2);
                        expect(sites[0].SiteId).toBe("site-1");

                    }
                );

                it(
                    "returns empty when no sites",
                    async () => {

                        nmMock.on(GetSitesCommand).resolves({});

                        const service = new NetworkManagerService(
                            creds,
                            "us-east-1"
                        );
                        const sites = await service.getSites("gn-1");

                        expect(sites).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getDevices",
            () => {

                it(
                    "returns devices for a global network",
                    async () => {

                        nmMock.on(GetDevicesCommand).resolves({
                            "Devices": [
                                {"DeviceId": "dev-1",
                                    "GlobalNetworkId": "gn-1",
                                    "SiteId": "site-1"},
                                {"DeviceId": "dev-2",
                                    "GlobalNetworkId": "gn-1",
                                    "SiteId": "site-2"}
                            ]
                        });

                        const service = new NetworkManagerService(
                            creds,
                            "us-east-1"
                        );
                        const devices = await service.getDevices("gn-1");

                        expect(devices).toHaveLength(2);
                        expect(devices[0].DeviceId).toBe("dev-1");

                    }
                );

                it(
                    "returns empty when no devices",
                    async () => {

                        nmMock.on(GetDevicesCommand).resolves({});

                        const service = new NetworkManagerService(
                            creds,
                            "us-east-1"
                        );
                        const devices = await service.getDevices("gn-1");

                        expect(devices).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getLinks",
            () => {

                it(
                    "returns links for a global network",
                    async () => {

                        nmMock.on(GetLinksCommand).resolves({
                            "Links": [
                                {"LinkId": "link-1",
                                    "GlobalNetworkId": "gn-1",
                                    "SiteId": "site-1"},
                                {"LinkId": "link-2",
                                    "GlobalNetworkId": "gn-1",
                                    "SiteId": "site-2"}
                            ]
                        });

                        const service = new NetworkManagerService(
                            creds,
                            "us-east-1"
                        );
                        const links = await service.getLinks("gn-1");

                        expect(links).toHaveLength(2);
                        expect(links[0].LinkId).toBe("link-1");

                    }
                );

                it(
                    "returns empty when no links",
                    async () => {

                        nmMock.on(GetLinksCommand).resolves({});

                        const service = new NetworkManagerService(
                            creds,
                            "us-east-1"
                        );
                        const links = await service.getLinks("gn-1");

                        expect(links).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getConnections",
            () => {

                it(
                    "returns connections for a global network",
                    async () => {

                        nmMock.on(GetConnectionsCommand).resolves({
                            "Connections": [
                                {"ConnectionId": "conn-1",
                                    "GlobalNetworkId": "gn-1",
                                    "DeviceId": "dev-1"},
                                {"ConnectionId": "conn-2",
                                    "GlobalNetworkId": "gn-1",
                                    "DeviceId": "dev-2"}
                            ]
                        });

                        const service = new NetworkManagerService(
                            creds,
                            "us-east-1"
                        );
                        const connections = await service.getConnections("gn-1");

                        expect(connections).toHaveLength(2);
                        expect(connections[0].ConnectionId).toBe("conn-1");

                    }
                );

                it(
                    "returns empty when no connections",
                    async () => {

                        nmMock.on(GetConnectionsCommand).resolves({});

                        const service = new NetworkManagerService(
                            creds,
                            "us-east-1"
                        );
                        const connections = await service.getConnections("gn-1");

                        expect(connections).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getTransitGatewayRegistrations",
            () => {

                it(
                    "returns transit gateway registrations",
                    async () => {

                        nmMock.on(GetTransitGatewayRegistrationsCommand).resolves({
                            "TransitGatewayRegistrations": [
                                {"GlobalNetworkId": "gn-1",
                                    "TransitGatewayArn": "arn:aws:ec2:us-east-1:123:transit-gateway/tgw-1"},
                                {"GlobalNetworkId": "gn-1",
                                    "TransitGatewayArn": "arn:aws:ec2:us-east-1:123:transit-gateway/tgw-2"}
                            ]
                        });

                        const service = new NetworkManagerService(
                            creds,
                            "us-east-1"
                        );
                        const registrations = await service.getTransitGatewayRegistrations("gn-1");

                        expect(registrations).toHaveLength(2);
                        expect(registrations[0].TransitGatewayArn).toContain("tgw-1");

                    }
                );

                it(
                    "returns empty when no registrations",
                    async () => {

                        nmMock.on(GetTransitGatewayRegistrationsCommand).resolves({});

                        const service = new NetworkManagerService(
                            creds,
                            "us-east-1"
                        );
                        const registrations = await service.getTransitGatewayRegistrations("gn-1");

                        expect(registrations).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getConnectPeerAssociations",
            () => {

                it(
                    "returns connect peer associations",
                    async () => {

                        nmMock.on(GetConnectPeerAssociationsCommand).resolves({
                            "ConnectPeerAssociations": [
                                {"ConnectPeerId": "cp-1",
                                    "GlobalNetworkId": "gn-1",
                                    "DeviceId": "dev-1"},
                                {"ConnectPeerId": "cp-2",
                                    "GlobalNetworkId": "gn-1",
                                    "DeviceId": "dev-2"}
                            ]
                        });

                        const service = new NetworkManagerService(
                            creds,
                            "us-east-1"
                        );
                        const associations = await service.getConnectPeerAssociations("gn-1");

                        expect(associations).toHaveLength(2);
                        expect(associations[0].ConnectPeerId).toBe("cp-1");

                    }
                );

                it(
                    "returns empty when no connect peer associations",
                    async () => {

                        nmMock.on(GetConnectPeerAssociationsCommand).resolves({});

                        const service = new NetworkManagerService(
                            creds,
                            "us-east-1"
                        );
                        const associations = await service.getConnectPeerAssociations("gn-1");

                        expect(associations).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getCustomerGatewayAssociations",
            () => {

                it(
                    "returns customer gateway associations",
                    async () => {

                        nmMock.on(GetCustomerGatewayAssociationsCommand).resolves({
                            "CustomerGatewayAssociations": [
                                {"CustomerGatewayArn": "arn:aws:ec2:us-east-1:123:customer-gateway/cgw-1",
                                    "GlobalNetworkId": "gn-1",
                                    "DeviceId": "dev-1"},
                                {"CustomerGatewayArn": "arn:aws:ec2:us-east-1:123:customer-gateway/cgw-2",
                                    "GlobalNetworkId": "gn-1",
                                    "DeviceId": "dev-2"}
                            ]
                        });

                        const service = new NetworkManagerService(
                            creds,
                            "us-east-1"
                        );
                        const associations = await service.getCustomerGatewayAssociations("gn-1");

                        expect(associations).toHaveLength(2);
                        expect(associations[0].CustomerGatewayArn).toContain("cgw-1");

                    }
                );

                it(
                    "returns empty when no customer gateway associations",
                    async () => {

                        nmMock.on(GetCustomerGatewayAssociationsCommand).resolves({});

                        const service = new NetworkManagerService(
                            creds,
                            "us-east-1"
                        );
                        const associations = await service.getCustomerGatewayAssociations("gn-1");

                        expect(associations).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getLinkAssociations",
            () => {

                it(
                    "returns link associations",
                    async () => {

                        nmMock.on(GetLinkAssociationsCommand).resolves({
                            "LinkAssociations": [
                                {"GlobalNetworkId": "gn-1",
                                    "DeviceId": "dev-1",
                                    "LinkId": "link-1"},
                                {"GlobalNetworkId": "gn-1",
                                    "DeviceId": "dev-2",
                                    "LinkId": "link-2"}
                            ]
                        });

                        const service = new NetworkManagerService(
                            creds,
                            "us-east-1"
                        );
                        const associations = await service.getLinkAssociations("gn-1");

                        expect(associations).toHaveLength(2);
                        expect(associations[0].LinkId).toBe("link-1");

                    }
                );

                it(
                    "returns empty when no link associations",
                    async () => {

                        nmMock.on(GetLinkAssociationsCommand).resolves({});

                        const service = new NetworkManagerService(
                            creds,
                            "us-east-1"
                        );
                        const associations = await service.getLinkAssociations("gn-1");

                        expect(associations).toHaveLength(0);

                    }
                );

            }
        );

    }
);

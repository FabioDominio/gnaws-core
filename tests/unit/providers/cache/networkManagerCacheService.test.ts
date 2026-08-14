import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {NetworkManagerCacheService} from "../../../../src/providers/cache/networkManagerCacheService.js";

let tmpDir: string;
beforeEach(() => {

    tmpDir = mkdtempSync(join(
        tmpdir(),
        "gnaws-test-"
    ));

});
afterEach(() => {

    rmSync(
        tmpDir,
        {"recursive": true}
    );

});

describe(
    "NetworkManagerCacheService",
    () => {

        it(
            "getGlobalNetworks reads networkmanager_global_networks.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "networkmanager_global_networks.json"
                    ),
                    JSON.stringify([{"GlobalNetworkId": "gn1"}])
                );
                const service = new NetworkManagerCacheService(tmpDir);
                expect(await service.getGlobalNetworks()).toEqual([{"GlobalNetworkId": "gn1"}]);

            }
        );

        it(
            "getGlobalNetworks returns empty for missing file",
            async () => {

                const service = new NetworkManagerCacheService(tmpDir);
                expect(await service.getGlobalNetworks()).toEqual([]);

            }
        );

        it(
            "getSites reads networkmanager_sites.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "networkmanager_sites.json"
                    ),
                    JSON.stringify([{"SiteId": "site1"}])
                );
                const service = new NetworkManagerCacheService(tmpDir);
                expect(await service.getSites("gn1")).toEqual([{"SiteId": "site1"}]);

            }
        );

        it(
            "getSites returns empty for missing file",
            async () => {

                const service = new NetworkManagerCacheService(tmpDir);
                expect(await service.getSites("gn1")).toEqual([]);

            }
        );

        it(
            "getDevices reads networkmanager_devices.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "networkmanager_devices.json"
                    ),
                    JSON.stringify([{"DeviceId": "dev1"}])
                );
                const service = new NetworkManagerCacheService(tmpDir);
                expect(await service.getDevices("gn1")).toEqual([{"DeviceId": "dev1"}]);

            }
        );

        it(
            "getDevices returns empty for missing file",
            async () => {

                const service = new NetworkManagerCacheService(tmpDir);
                expect(await service.getDevices("gn1")).toEqual([]);

            }
        );

        it(
            "getLinks reads networkmanager_links.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "networkmanager_links.json"
                    ),
                    JSON.stringify([{"LinkId": "link1"}])
                );
                const service = new NetworkManagerCacheService(tmpDir);
                expect(await service.getLinks("gn1")).toEqual([{"LinkId": "link1"}]);

            }
        );

        it(
            "getLinks returns empty for missing file",
            async () => {

                const service = new NetworkManagerCacheService(tmpDir);
                expect(await service.getLinks("gn1")).toEqual([]);

            }
        );

        it(
            "getConnections reads networkmanager_connections.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "networkmanager_connections.json"
                    ),
                    JSON.stringify([{"ConnectionId": "conn1"}])
                );
                const service = new NetworkManagerCacheService(tmpDir);
                expect(await service.getConnections("gn1")).toEqual([{"ConnectionId": "conn1"}]);

            }
        );

        it(
            "getConnections returns empty for missing file",
            async () => {

                const service = new NetworkManagerCacheService(tmpDir);
                expect(await service.getConnections("gn1")).toEqual([]);

            }
        );

        it(
            "getCoreNetworks reads networkmanager_core_networks.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "networkmanager_core_networks.json"
                    ),
                    JSON.stringify([{"CoreNetworkId": "cn1"}])
                );
                const service = new NetworkManagerCacheService(tmpDir);
                expect(await service.getCoreNetworks()).toEqual([{"CoreNetworkId": "cn1"}]);

            }
        );

        it(
            "getCoreNetworks returns empty for missing file",
            async () => {

                const service = new NetworkManagerCacheService(tmpDir);
                expect(await service.getCoreNetworks()).toEqual([]);

            }
        );

        it(
            "getAttachments reads networkmanager_attachments.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "networkmanager_attachments.json"
                    ),
                    JSON.stringify([{"AttachmentId": "att1"}])
                );
                const service = new NetworkManagerCacheService(tmpDir);
                expect(await service.getAttachments()).toEqual([{"AttachmentId": "att1"}]);

            }
        );

        it(
            "getAttachments returns empty for missing file",
            async () => {

                const service = new NetworkManagerCacheService(tmpDir);
                expect(await service.getAttachments()).toEqual([]);

            }
        );

        it(
            "getTransitGatewayRegistrations reads networkmanager_transit_gateway_registrations.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "networkmanager_transit_gateway_registrations.json"
                    ),
                    JSON.stringify([{"TransitGatewayArn": "arn:tgw:1"}])
                );
                const service = new NetworkManagerCacheService(tmpDir);
                expect(await service.getTransitGatewayRegistrations("gn1")).toEqual([{"TransitGatewayArn": "arn:tgw:1"}]);

            }
        );

        it(
            "getTransitGatewayRegistrations returns empty for missing file",
            async () => {

                const service = new NetworkManagerCacheService(tmpDir);
                expect(await service.getTransitGatewayRegistrations("gn1")).toEqual([]);

            }
        );

        it(
            "getConnectPeerAssociations reads networkmanager_connect_peer_associations.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "networkmanager_connect_peer_associations.json"
                    ),
                    JSON.stringify([{"ConnectPeerId": "cp1"}])
                );
                const service = new NetworkManagerCacheService(tmpDir);
                expect(await service.getConnectPeerAssociations("gn1")).toEqual([{"ConnectPeerId": "cp1"}]);

            }
        );

        it(
            "getConnectPeerAssociations returns empty for missing file",
            async () => {

                const service = new NetworkManagerCacheService(tmpDir);
                expect(await service.getConnectPeerAssociations("gn1")).toEqual([]);

            }
        );

        it(
            "getCustomerGatewayAssociations reads networkmanager_customer_gateway_associations.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "networkmanager_customer_gateway_associations.json"
                    ),
                    JSON.stringify([{"CustomerGatewayArn": "arn:cgw:1"}])
                );
                const service = new NetworkManagerCacheService(tmpDir);
                expect(await service.getCustomerGatewayAssociations("gn1")).toEqual([{"CustomerGatewayArn": "arn:cgw:1"}]);

            }
        );

        it(
            "getCustomerGatewayAssociations returns empty for missing file",
            async () => {

                const service = new NetworkManagerCacheService(tmpDir);
                expect(await service.getCustomerGatewayAssociations("gn1")).toEqual([]);

            }
        );

        it(
            "getLinkAssociations reads networkmanager_link_associations.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "networkmanager_link_associations.json"
                    ),
                    JSON.stringify([{"LinkId": "link1"}])
                );
                const service = new NetworkManagerCacheService(tmpDir);
                expect(await service.getLinkAssociations("gn1")).toEqual([{"LinkId": "link1"}]);

            }
        );

        it(
            "getLinkAssociations returns empty for missing file",
            async () => {

                const service = new NetworkManagerCacheService(tmpDir);
                expect(await service.getLinkAssociations("gn1")).toEqual([]);

            }
        );

    }
);

import {DirectedGraph} from "graphology";
import type {Inventory} from "../../src/inventory.js";

/**
 * Creates a minimal mock Inventory that returns the provided data.
 * Only the getters used by detection rules need to be implemented.
 */
export function mockInventory (data: Partial<MockInventoryData> = {}): Inventory {

    const d: MockInventoryData = {
        "regions": ["eu-west-1"],
        "volumesByRegion": {},
        "addressesByRegion": {},
        "networkInterfacesByRegion": {},
        "securityGroupsByRegion": {},
        "loadBalancersByRegion": {},
        "targetGroupsByRegion": {},
        "certificatesByRegion": {},
        ...data
    };

    return {
        "getAccountRegions": () => d.regions.map((r) => ({"RegionName": r,
            "RegionOptStatus": "ENABLED_BY_DEFAULT"})),
        "getVolumesByRegion": (region: string) => d.volumesByRegion[region] ?? [],
        "getAddressesByRegion": (region: string) => d.addressesByRegion[region] ?? [],
        "getNetworkInterfacesByRegion": (region: string) => d.networkInterfacesByRegion[region] ?? [],
        "getSecurityGroupsByRegion": (region: string) => d.securityGroupsByRegion[region] ?? [],
        "getLoadBalancersByRegion": (region: string) => d.loadBalancersByRegion[region] ?? [],
        "getTargetGroupsByRegion": (region: string) => d.targetGroupsByRegion[region] ?? [],
        "getCertificatesByRegion": (region: string) => d.certificatesByRegion[region] ?? []
    } as unknown as Inventory;

}

/**
 * Creates an empty DirectedGraph (detection rules only use the graph for tier 2).
 */
export function mockGraph (): DirectedGraph {

    return new DirectedGraph();

}

interface MockInventoryData {
    "regions": string[];
    "volumesByRegion": Record<string, unknown[]>;
    "addressesByRegion": Record<string, unknown[]>;
    "networkInterfacesByRegion": Record<string, unknown[]>;
    "securityGroupsByRegion": Record<string, unknown[]>;
    "loadBalancersByRegion": Record<string, unknown[]>;
    "targetGroupsByRegion": Record<string, unknown[]>;
    "certificatesByRegion": Record<string, unknown[]>;
}

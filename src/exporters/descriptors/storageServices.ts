import {describe, nameTag} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const storageServicesDescriptors: DescriptorGroup = [

    // ─── FSx (regional) ────────────────────────────────────────────────────
    describe({
        "resourceType": "fsxfilesystem",
        "scope": "regional",
        "list": (inv, region) => inv.getFsxFileSystemsByRegion(region),
        "id": (fs) => fs.ResourceARN ?? fs.FileSystemId,
        "name": (fs) => nameTag(fs.Tags) ?? fs.FileSystemId,
        "tags": (fs) => fs.Tags,
        "columns": [
            {"label": "Type",
                "value": (fs) => fs.FileSystemType},
            {"label": "State",
                "value": (fs) => fs.Lifecycle},
            {"label": "Capacity (GB)",
                "value": (fs) => fs.StorageCapacity?.toString()},
            {"label": "VPC ID",
                "value": (fs) => fs.VpcId}
        ]
    }),

    // ─── Storage Gateway / Outposts (regional) ─────────────────────────────
    describe({
        "resourceType": "storagegateway",
        "scope": "regional",
        "list": (inv, region) => inv.getGatewaysByRegion(region),
        "id": (g) => g.GatewayARN,
        "name": (g) => g.GatewayName ?? g.GatewayId ?? g.GatewayARN,
        "columns": [
            {"label": "Type",
                "value": (g) => g.GatewayType},
            {"label": "State",
                "value": (g) => g.GatewayOperationalState}
        ]
    }),
    describe({
        "resourceType": "outpost",
        "scope": "regional",
        "list": (inv, region) => inv.getOutpostsByRegion(region),
        "id": (o) => o.OutpostArn ?? o.OutpostId,
        "name": (o) => o.Name ?? o.OutpostId,
        "columns": [
            {"label": "Status",
                "value": (o) => o.LifeCycleStatus},
            {"label": "AZ",
                "value": (o) => o.AvailabilityZone},
            {"label": "Site ID",
                "value": (o) => o.SiteId}
        ]
    })

];

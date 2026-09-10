import {describe, boolStr} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const cloudfrontDescriptors: DescriptorGroup = [

    describe({
        "resourceType": "distribution",
        "scope": "global",
        "list": (inv) => inv.getDistributions(),
        "id": (dist) => dist.ARN ?? dist.Id,
        "name": (dist) => dist.DomainName ?? dist.Id,
        "columns": [
            {"label": "Status",
                "value": (dist) => dist.Status},
            {"label": "Enabled",
                "value": (dist) => boolStr(dist.Enabled)},
            {"label": "Comment",
                "value": (dist) => dist.Comment}
        ]
    }),
    describe({
        "resourceType": "cloudfrontfunction",
        "scope": "global",
        "list": (inv) => inv.getCloudFrontFunctions(),
        "id": (f) => f.FunctionMetadata?.FunctionARN,
        "name": (f) => f.Name ?? f.FunctionMetadata?.FunctionARN,
        "columns": [
            {"label": "Status",
                "value": (f) => f.Status},
            {"label": "Runtime",
                "value": (f) => f.FunctionConfig?.Runtime},
            {"label": "Comment",
                "value": (f) => f.FunctionConfig?.Comment}
        ]
    }),
    describe({
        "resourceType": "originaccesscontrol",
        "scope": "global",
        "list": (inv) => inv.getOriginAccessControls(),
        "id": (o) => o.Id,
        "name": (o) => o.OriginAccessControlConfig?.Name ?? o.Id,
        "columns": [
            {"label": "Signing Protocol",
                "value": (o) => o.OriginAccessControlConfig?.SigningProtocol},
            {"label": "Origin Type",
                "value": (o) => o.OriginAccessControlConfig?.OriginAccessControlOriginType},
            {"label": "Description",
                "value": (o) => o.OriginAccessControlConfig?.Description}
        ]
    }),
    describe({
        "resourceType": "keyvaluestore",
        "scope": "global",
        "list": (inv) => inv.getKeyValueStores(),
        "id": (k) => k.ARN,
        "name": (k) => k.Name ?? k.ARN,
        "columns": [
            {"label": "Status",
                "value": (k) => k.Status},
            {"label": "Comment",
                "value": (k) => k.Comment},
            {"label": "Last Modified",
                "value": (k) => k.LastModifiedTime?.toISOString()}
        ]
    })

];

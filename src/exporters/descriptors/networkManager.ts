import {describe, nameTag} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const networkManagerDescriptors: DescriptorGroup = [

    describe({
        "resourceType": "globalnetwork",
        "scope": "global",
        "list": (inv) => inv.getGlobalNetworks(),
        "id": (n) => n.GlobalNetworkId,
        "name": (n) => nameTag(n.Tags) ?? n.GlobalNetworkId,
        "tags": (n) => n.Tags,
        "columns": [
            {"label": "State",
                "value": (n) => n.State},
            {"label": "Description",
                "value": (n) => n.Description},
            {"label": "Created",
                "value": (n) => n.CreatedAt?.toISOString()}
        ]
    }),
    describe({
        "resourceType": "corenetwork",
        "scope": "global",
        "list": (inv) => inv.getCoreNetworks(),
        "id": (c) => c.CoreNetworkArn,
        "name": (c) => nameTag(c.Tags) ?? c.CoreNetworkId ?? c.CoreNetworkArn,
        "tags": (c) => c.Tags,
        "columns": [
            {"label": "State",
                "value": (c) => c.State},
            {"label": "Global Network ID",
                "value": (c) => c.GlobalNetworkId},
            {"label": "Description",
                "value": (c) => c.Description}
        ]
    })

];

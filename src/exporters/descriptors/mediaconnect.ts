import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const mediaconnectDescriptors: DescriptorGroup = [

    // ─── MediaConnect (regional) ───────────────────────────────────────────
    describe({
        "resourceType": "mediaconnectflow",
        "scope": "regional",
        "list": (inv, region) => inv.getMediaConnectFlowsByRegion(region),
        "id": (f) => f.FlowArn,
        "name": (f) => f.Name ?? f.FlowArn,
        "columns": [
            {"label": "Status",
                "value": (f) => f.Status},
            {"label": "AZ",
                "value": (f) => f.AvailabilityZone},
            {"label": "Egress IP",
                "value": (f) => f.EgressIp}
        ]
    })

];

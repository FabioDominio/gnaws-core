import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const wafDescriptors: DescriptorGroup = [

    // ─── WAF (regional) ────────────────────────────────────────────────────
    describe({
        "resourceType": "webacl",
        "scope": "regional",
        "list": (inv, region) => inv.getWebAclsByRegion(region),
        "id": (a) => a.ARN,
        "name": (a) => a.Name ?? a.ARN,
        "columns": [
            {"label": "ID",
                "value": (a) => a.Id},
            {"label": "Description",
                "value": (a) => a.Description}
        ]
    })

];

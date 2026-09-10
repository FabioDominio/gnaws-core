import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const appMeshDescriptors: DescriptorGroup = [

    // ─── App Mesh (regional) ───────────────────────────────────────────────
    describe({
        "resourceType": "appmesh",
        "scope": "regional",
        "list": (inv, region) => inv.getMeshesByRegion(region),
        "id": (m) => m.arn ?? m.meshName,
        "name": (m) => m.meshName ?? m.arn,
        "columns": [
            {"label": "Mesh Owner",
                "value": (m) => m.meshOwner},
            {"label": "Resource Owner",
                "value": (m) => m.resourceOwner},
            {"label": "Version",
                "value": (m) => m.version?.toString()}
        ]
    })

];

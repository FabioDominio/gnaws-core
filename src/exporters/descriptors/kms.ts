import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const kmsDescriptors: DescriptorGroup = [

    // ─── KMS (regional) ────────────────────────────────────────────────────
    describe({
        "resourceType": "kmskey",
        "scope": "regional",
        "list": (inv, region) => inv.getKeysByRegion(region),
        "id": (k) => k.KeyArn ?? k.KeyId,
        "name": (k) => k.KeyId,
        "columns": [
            {"label": "Key ID",
                "value": (k) => k.KeyId},
            {"label": "Key ARN",
                "value": (k) => k.KeyArn}
        ]
    })

];

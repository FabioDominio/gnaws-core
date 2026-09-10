import {describe, boolStr} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const secretsManagerDescriptors: DescriptorGroup = [

    // ─── Secrets Manager (regional) ────────────────────────────────────────
    describe({
        "resourceType": "secret",
        "scope": "regional",
        "list": (inv, region) => inv.getSecretsByRegion(region),
        "id": (s) => s.ARN,
        "name": (s) => s.Name ?? s.ARN,
        "tags": (s) => s.Tags,
        "columns": [
            {"label": "Rotation Enabled",
                "value": (s) => boolStr(s.RotationEnabled)},
            {"label": "KMS Key ID",
                "value": (s) => s.KmsKeyId},
            {"label": "Last Changed",
                "value": (s) => s.LastChangedDate?.toISOString()},
            {"label": "Created",
                "value": (s) => s.CreatedDate?.toISOString()}
        ]
    })

];

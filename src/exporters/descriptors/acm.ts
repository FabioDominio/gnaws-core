import {describe, boolStr} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const acmDescriptors: DescriptorGroup = [

    // ─── ACM (regional) ────────────────────────────────────────────────────
    describe({
        "resourceType": "certificate",
        "scope": "regional",
        "list": (inv, region) => inv.getCertificatesByRegion(region),
        "id": (c) => c.CertificateArn,
        "name": (c) => c.DomainName ?? c.CertificateArn,
        "columns": [
            {"label": "Status",
                "value": (c) => c.Status},
            {"label": "Type",
                "value": (c) => c.Type},
            {"label": "In Use",
                "value": (c) => boolStr(c.InUse)},
            {"label": "Not After",
                "value": (c) => c.NotAfter?.toISOString()}
        ]
    })

];

import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const codebuildDescriptors: DescriptorGroup = [

    // ─── CodeBuild (regional) ──────────────────────────────────────────────
    describe({
        "resourceType": "codebuildproject",
        "scope": "regional",
        "list": (inv, region) => inv.getCodeBuildProjectsByRegion(region),
        "id": (p) => p.arn ?? p.name,
        "name": (p) => p.name ?? p.arn,
        "columns": [
            {"label": "Source Type",
                "value": (p) => p.source?.type},
            {"label": "Environment Type",
                "value": (p) => p.environment?.type},
            {"label": "Visibility",
                "value": (p) => p.projectVisibility},
            {"label": "Last Modified",
                "value": (p) => p.lastModified?.toISOString()}
        ]
    })

];

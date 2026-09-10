import {describe, boolStr} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const cicdDescriptors: DescriptorGroup = [

    // ─── CodePipeline / CloudTrail (regional) ──────────────────────────────
    describe({
        "resourceType": "pipeline",
        "scope": "regional",
        "list": (inv, region) => inv.getCodePipelinesByRegion(region),
        "id": (p) => p.name,
        "name": (p) => p.name,
        "columns": [
            {"label": "Type",
                "value": (p) => p.pipelineType},
            {"label": "Execution Mode",
                "value": (p) => p.executionMode},
            {"label": "Updated",
                "value": (p) => p.updated?.toISOString()}
        ]
    }),
    describe({
        "resourceType": "trail",
        "scope": "regional",
        "list": (inv, region) => inv.getCloudTrailsByRegion(region),
        "id": (t) => t.TrailARN ?? t.Name,
        "name": (t) => t.Name ?? t.TrailARN,
        "columns": [
            {"label": "S3 Bucket",
                "value": (t) => t.S3BucketName},
            {"label": "Multi-Region",
                "value": (t) => boolStr(t.IsMultiRegionTrail)}
        ]
    })

];

import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const cloudFormationDescriptors: DescriptorGroup = [

    // ─── CloudFormation (regional) ─────────────────────────────────────────
    describe({
        "resourceType": "cfnstack",
        "scope": "regional",
        "list": (inv, region) => inv.getCfnStacksByRegion(region),
        "id": (s) => s.StackId,
        "name": (s) => s.StackName ?? s.StackId,
        "columns": [
            {"label": "Status",
                "value": (s) => s.StackStatus},
            {"label": "Parent ID",
                "value": (s) => s.ParentId},
            {"label": "Created",
                "value": (s) => s.CreationTime?.toISOString()}
        ]
    }),
    describe({
        "resourceType": "cfnstackset",
        "scope": "regional",
        "list": (inv, region) => inv.getCfnStackSetsByRegion(region),
        "id": (s) => s.StackSetId,
        "name": (s) => s.StackSetName ?? s.StackSetId,
        "columns": [
            {"label": "Status",
                "value": (s) => s.Status},
            {"label": "Permission Model",
                "value": (s) => s.PermissionModel},
            {"label": "Drift Status",
                "value": (s) => s.DriftStatus}
        ]
    })

];

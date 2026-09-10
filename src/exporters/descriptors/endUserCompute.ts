import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const endUserComputeDescriptors: DescriptorGroup = [

    // ─── Directory Service / WorkSpaces / CloudHSM (regional) ──────────────
    describe({
        "resourceType": "directory",
        "scope": "regional",
        "list": (inv, region) => inv.getDirectoriesByRegion(region),
        "id": (dir) => dir.DirectoryId,
        "name": (dir) => dir.Name ?? dir.DirectoryId,
        "columns": [
            {"label": "Type",
                "value": (dir) => dir.Type},
            {"label": "Size",
                "value": (dir) => dir.Size},
            {"label": "Stage",
                "value": (dir) => dir.Stage}
        ]
    }),
    describe({
        "resourceType": "workspace",
        "scope": "regional",
        "list": (inv, region) => inv.getWorkspacesByRegion(region),
        "id": (w) => w.WorkspaceId,
        "name": (w) => w.WorkspaceId,
        "columns": [
            {"label": "State",
                "value": (w) => w.State},
            {"label": "Directory ID",
                "value": (w) => w.DirectoryId},
            {"label": "Bundle ID",
                "value": (w) => w.BundleId}
        ]
    }),
    describe({
        "resourceType": "hsmcluster",
        "scope": "regional",
        "list": (inv, region) => inv.getHsmClustersByRegion(region),
        "id": (c) => c.ClusterId,
        "name": (c) => c.ClusterId,
        "columns": [
            {"label": "State",
                "value": (c) => c.State},
            {"label": "HSM Type",
                "value": (c) => c.HsmType},
            {"label": "VPC ID",
                "value": (c) => c.VpcId}
        ]
    })

];

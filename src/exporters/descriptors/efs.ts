import {describe, boolStr} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const efsDescriptors: DescriptorGroup = [

    // ─── EFS (regional) ────────────────────────────────────────────────────
    describe({
        "resourceType": "filesystem",
        "scope": "regional",
        "list": (inv, region) => inv.getFileSystemsByRegion(region),
        "id": (fs) => fs.FileSystemArn ?? fs.FileSystemId,
        "name": (fs) => fs.Name ?? fs.FileSystemId,
        "columns": [
            {"label": "State",
                "value": (fs) => fs.LifeCycleState},
            {"label": "Performance Mode",
                "value": (fs) => fs.PerformanceMode},
            {"label": "Encrypted",
                "value": (fs) => boolStr(fs.Encrypted)},
            {"label": "Mount Targets",
                "value": (fs) => fs.NumberOfMountTargets?.toString()}
        ]
    }),
    describe({
        "resourceType": "efsaccesspoint",
        "scope": "regional",
        "list": (inv, region) => inv.getAccessPointsByRegion(region),
        "id": (ap) => ap.AccessPointArn ?? ap.AccessPointId,
        "name": (ap) => ap.Name ?? ap.AccessPointId,
        "columns": [
            {"label": "State",
                "value": (ap) => ap.LifeCycleState},
            {"label": "File System ID",
                "value": (ap) => ap.FileSystemId}
        ]
    })

];

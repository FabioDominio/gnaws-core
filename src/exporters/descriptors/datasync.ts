import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const datasyncDescriptors: DescriptorGroup = [

    // ─── DataSync (regional) ───────────────────────────────────────────────
    describe({
        "resourceType": "datasynctask",
        "scope": "regional",
        "list": (inv, region) => inv.getDataSyncTasksByRegion(region),
        "id": (t) => t.TaskArn,
        "name": (t) => t.Name ?? t.TaskArn,
        "columns": [
            {"label": "Status",
                "value": (t) => t.Status},
            {"label": "Mode",
                "value": (t) => t.TaskMode}
        ]
    })

];

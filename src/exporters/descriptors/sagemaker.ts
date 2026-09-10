import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const sagemakerDescriptors: DescriptorGroup = [

    // ─── SageMaker (regional) ──────────────────────────────────────────────
    describe({
        "resourceType": "notebookinstance",
        "scope": "regional",
        "list": (inv, region) => inv.getNotebookInstancesByRegion(region),
        "id": (n) => n.NotebookInstanceArn,
        "name": (n) => n.NotebookInstanceName ?? n.NotebookInstanceArn,
        "columns": [
            {"label": "Status",
                "value": (n) => n.NotebookInstanceStatus},
            {"label": "Instance Type",
                "value": (n) => n.InstanceType}
        ]
    })

];

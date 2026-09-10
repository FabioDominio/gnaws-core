import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const memorydbDescriptors: DescriptorGroup = [

    // ─── MemoryDB (regional) ───────────────────────────────────────────────
    describe({
        "resourceType": "memorydbcluster",
        "scope": "regional",
        "list": (inv, region) => inv.getMemoryDbClustersByRegion(region),
        "id": (c) => c.ARN ?? c.Name,
        "name": (c) => c.Name ?? c.ARN,
        "columns": [
            {"label": "Status",
                "value": (c) => c.Status},
            {"label": "Node Type",
                "value": (c) => c.NodeType},
            {"label": "Engine",
                "value": (c) => c.Engine},
            {"label": "Shards",
                "value": (c) => c.NumberOfShards?.toString()}
        ]
    })

];

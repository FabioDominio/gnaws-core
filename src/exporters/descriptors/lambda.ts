import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const lambdaDescriptors: DescriptorGroup = [

    // ─── Lambda (regional) ─────────────────────────────────────────────────
    describe({
        "resourceType": "lambdafunction",
        "scope": "regional",
        "list": (inv, region) => inv.getLambdasByRegion(region),
        "id": (fn) => fn.FunctionArn,
        "name": (fn) => fn.FunctionName ?? fn.FunctionArn,
        "columns": [
            {"label": "Runtime",
                "value": (fn) => fn.Runtime},
            {"label": "Memory (MB)",
                "value": (fn) => fn.MemorySize?.toString()},
            {"label": "Timeout (s)",
                "value": (fn) => fn.Timeout?.toString()},
            {"label": "State",
                "value": (fn) => fn.State}
        ]
    }),
    describe({
        "resourceType": "lambdalayer",
        "scope": "regional",
        "list": (inv, region) => inv.getLayersByRegion(region),
        "id": (l) => l.LayerArn,
        "name": (l) => l.LayerName ?? l.LayerArn,
        "columns": [
            {"label": "Latest Version",
                "value": (l) => l.LatestMatchingVersion?.Version?.toString()},
            {"label": "Runtimes",
                "value": (l) => l.LatestMatchingVersion?.CompatibleRuntimes?.join(", ")}
        ]
    })

];

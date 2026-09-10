import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const batchDescriptors: DescriptorGroup = [

    // ─── Batch (regional) ──────────────────────────────────────────────────
    describe({
        "resourceType": "batchcomputeenvironment",
        "scope": "regional",
        "list": (inv, region) => inv.getBatchComputeEnvironmentsByRegion(region),
        "id": (e) => e.computeEnvironmentArn ?? e.computeEnvironmentName,
        "name": (e) => e.computeEnvironmentName ?? e.computeEnvironmentArn,
        "columns": [
            {"label": "Type",
                "value": (e) => e.type},
            {"label": "State",
                "value": (e) => e.state},
            {"label": "Status",
                "value": (e) => e.status}
        ]
    }),
    describe({
        "resourceType": "batchjobqueue",
        "scope": "regional",
        "list": (inv, region) => inv.getBatchJobQueuesByRegion(region),
        "id": (q) => q.jobQueueArn ?? q.jobQueueName,
        "name": (q) => q.jobQueueName ?? q.jobQueueArn,
        "columns": [
            {"label": "State",
                "value": (q) => q.state},
            {"label": "Status",
                "value": (q) => q.status},
            {"label": "Priority",
                "value": (q) => q.priority?.toString()}
        ]
    })

];

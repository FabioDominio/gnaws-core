import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const searchDescriptors: DescriptorGroup = [

    // ─── OpenSearch (regional) ─────────────────────────────────────────────
    describe({
        "resourceType": "opensearchdomain",
        "scope": "regional",
        "list": (inv, region) => inv.getOpenSearchDomainsByRegion(region),
        "id": (dom) => dom.ARN ?? dom.DomainName,
        "name": (dom) => dom.DomainName ?? dom.ARN,
        "columns": [
            {"label": "Engine Version",
                "value": (dom) => dom.EngineVersion},
            {"label": "Instance Type",
                "value": (dom) => dom.ClusterConfig?.InstanceType},
            {"label": "Instances",
                "value": (dom) => dom.ClusterConfig?.InstanceCount?.toString()}
        ]
    }),

    // ─── OpenSearch Serverless (regional) ──────────────────────────────────
    describe({
        "resourceType": "osscollection",
        "scope": "regional",
        "list": (inv, region) => inv.getOssCollectionsByRegion(region),
        "id": (c) => c.id,
        "name": (c) => c.name ?? c.id,
        "columns": [
            {"label": "Status",
                "value": (c) => c.status}
        ]
    })

];

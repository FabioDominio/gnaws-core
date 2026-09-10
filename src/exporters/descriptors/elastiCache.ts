import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const elastiCacheDescriptors: DescriptorGroup = [

    // ─── ElastiCache (regional) ────────────────────────────────────────────
    describe({
        "resourceType": "cachecluster",
        "scope": "regional",
        "list": (inv, region) => inv.getCacheClustersByRegion(region),
        "id": (c) => c.ARN ?? c.CacheClusterId,
        "name": (c) => c.CacheClusterId ?? c.ARN,
        "columns": [
            {"label": "Engine",
                "value": (c) => c.Engine},
            {"label": "Node Type",
                "value": (c) => c.CacheNodeType},
            {"label": "Status",
                "value": (c) => c.CacheClusterStatus},
            {"label": "Nodes",
                "value": (c) => c.NumCacheNodes?.toString()}
        ]
    }),
    describe({
        "resourceType": "replicationgroup",
        "scope": "regional",
        "list": (inv, region) => inv.getReplicationGroupsByRegion(region),
        "id": (g) => g.ARN ?? g.ReplicationGroupId,
        "name": (g) => g.ReplicationGroupId ?? g.ARN,
        "columns": [
            {"label": "Status",
                "value": (g) => g.Status},
            {"label": "Node Type",
                "value": (g) => g.CacheNodeType},
            {"label": "Engine",
                "value": (g) => g.Engine},
            {"label": "Description",
                "value": (g) => g.Description}
        ]
    }),
    describe({
        "resourceType": "serverlesscache",
        "scope": "regional",
        "list": (inv, region) => inv.getServerlessCachesByRegion(region),
        "id": (c) => c.ARN ?? c.ServerlessCacheName,
        "name": (c) => c.ServerlessCacheName ?? c.ARN,
        "columns": [
            {"label": "Engine",
                "value": (c) => c.Engine},
            {"label": "Engine Version",
                "value": (c) => c.MajorEngineVersion},
            {"label": "Status",
                "value": (c) => c.Status}
        ]
    })

];

import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const dmsDescriptors: DescriptorGroup = [

    // ─── DMS (regional) ────────────────────────────────────────────────────
    describe({
        "resourceType": "dmsreplicationinstance",
        "scope": "regional",
        "list": (inv, region) => inv.getDmsReplicationInstancesByRegion(region),
        "id": (i) => i.ReplicationInstanceArn ?? i.ReplicationInstanceIdentifier,
        "name": (i) => i.ReplicationInstanceIdentifier ?? i.ReplicationInstanceArn,
        "columns": [
            {"label": "Class",
                "value": (i) => i.ReplicationInstanceClass},
            {"label": "Status",
                "value": (i) => i.ReplicationInstanceStatus},
            {"label": "Engine Version",
                "value": (i) => i.EngineVersion}
        ]
    }),
    describe({
        "resourceType": "dmsendpoint",
        "scope": "regional",
        "list": (inv, region) => inv.getDmsEndpointsByRegion(region),
        "id": (e) => e.EndpointArn ?? e.EndpointIdentifier,
        "name": (e) => e.EndpointIdentifier ?? e.EndpointArn,
        "columns": [
            {"label": "Type",
                "value": (e) => e.EndpointType},
            {"label": "Engine",
                "value": (e) => e.EngineName},
            {"label": "Status",
                "value": (e) => e.Status}
        ]
    }),
    describe({
        "resourceType": "dmsreplicationtask",
        "scope": "regional",
        "list": (inv, region) => inv.getDmsReplicationTasksByRegion(region),
        "id": (t) => t.ReplicationTaskArn ?? t.ReplicationTaskIdentifier,
        "name": (t) => t.ReplicationTaskIdentifier ?? t.ReplicationTaskArn,
        "columns": [
            {"label": "Migration Type",
                "value": (t) => t.MigrationType},
            {"label": "Status",
                "value": (t) => t.Status}
        ]
    })

];

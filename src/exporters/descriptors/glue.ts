import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const glueDescriptors: DescriptorGroup = [

    // ─── Glue (regional) ───────────────────────────────────────────────────
    describe({
        "resourceType": "glueconnection",
        "scope": "regional",
        "list": (inv, region) => inv.getGlueConnectionsByRegion(region),
        "id": (c) => c.Name,
        "name": (c) => c.Name,
        "columns": [
            {"label": "Type",
                "value": (c) => c.ConnectionType},
            {"label": "Status",
                "value": (c) => c.Status},
            {"label": "Description",
                "value": (c) => c.Description}
        ]
    }),
    describe({
        "resourceType": "gluecrawler",
        "scope": "regional",
        "list": (inv, region) => inv.getGlueCrawlersByRegion(region),
        "id": (c) => c.Name,
        "name": (c) => c.Name,
        "columns": [
            {"label": "State",
                "value": (c) => c.State},
            {"label": "Database",
                "value": (c) => c.DatabaseName},
            {"label": "Role ARN",
                "value": (c) => c.Role}
        ]
    }),
    describe({
        "resourceType": "gluedatabase",
        "scope": "regional",
        "list": (inv, region) => inv.getGlueDatabasesByRegion(region),
        "id": (db) => db.Name,
        "name": (db) => db.Name,
        "columns": [
            {"label": "Location URI",
                "value": (db) => db.LocationUri},
            {"label": "Catalog ID",
                "value": (db) => db.CatalogId},
            {"label": "Description",
                "value": (db) => db.Description}
        ]
    }),
    describe({
        "resourceType": "gluejob",
        "scope": "regional",
        "list": (inv, region) => inv.getGlueJobsByRegion(region),
        "id": (j) => j.Name,
        "name": (j) => j.Name,
        "columns": [
            {"label": "Glue Version",
                "value": (j) => j.GlueVersion},
            {"label": "Worker Type",
                "value": (j) => j.WorkerType},
            {"label": "Role ARN",
                "value": (j) => j.Role}
        ]
    })

];

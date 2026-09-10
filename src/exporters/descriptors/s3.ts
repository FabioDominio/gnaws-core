import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const s3Descriptors: DescriptorGroup = [

    describe({
        "resourceType": "s3bucket",
        "scope": "global",
        "list": (inv) => inv.getBuckets(),
        "id": (b) => b.bucket.Name,
        "name": (b) => b.bucket.Name,
        "tags": (b) => b.tags,
        "regionOf": (b) => b.region,
        "columns": [
            {"label": "Region",
                "value": (b) => b.region},
            {"label": "Created",
                "value": (b) => b.bucket.CreationDate?.toISOString()}
        ]
    }),
    describe({
        "resourceType": "directorybucket",
        "scope": "global",
        "list": (inv) => inv.getDirectoryBuckets(),
        "id": (b) => b.name,
        "name": (b) => b.name,
        "columns": [
            {"label": "Created",
                "value": (b) => b.creationDate?.toISOString()}
        ]
    }),
    describe({
        "resourceType": "s3tablebucket",
        "scope": "regional",
        "list": (inv, region) => inv.getTableBucketsByRegion(region),
        "id": (b) => b.arn,
        "name": (b) => b.name ?? b.arn,
        "columns": [
            {"label": "Type",
                "value": (b) => b.type},
            {"label": "Owner Account",
                "value": (b) => b.ownerAccountId},
            {"label": "Created",
                "value": (b) => b.createdAt?.toISOString()}
        ]
    }),
    describe({
        "resourceType": "s3table",
        "scope": "regional",
        "list": (inv, region) => inv.getTablesByRegion(region),
        "id": (t) => t.tableARN,
        "name": (t) => t.name ?? t.tableARN,
        "columns": [
            {"label": "Namespace",
                "value": (t) => t.namespace?.join(".")},
            {"label": "Table Bucket ID",
                "value": (t) => t.tableBucketId},
            {"label": "Created",
                "value": (t) => t.createdAt?.toISOString()}
        ]
    })

];

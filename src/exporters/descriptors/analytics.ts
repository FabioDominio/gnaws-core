import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const analyticsDescriptors: DescriptorGroup = [

    // ─── Redshift / Neptune / DocDB (regional) ─────────────────────────────
    describe({
        "resourceType": "redshiftcluster",
        "scope": "regional",
        "list": (inv, region) => inv.getRedshiftClustersByRegion(region),
        "id": (c) => c.ClusterNamespaceArn ?? c.ClusterIdentifier,
        "name": (c) => c.ClusterIdentifier ?? c.ClusterNamespaceArn,
        "columns": [
            {"label": "Node Type",
                "value": (c) => c.NodeType},
            {"label": "Status",
                "value": (c) => c.ClusterStatus},
            {"label": "Nodes",
                "value": (c) => c.NumberOfNodes?.toString()},
            {"label": "VPC ID",
                "value": (c) => c.VpcId}
        ]
    }),
    describe({
        "resourceType": "neptunecluster",
        "scope": "regional",
        "list": (inv, region) => inv.getNeptuneClustersByRegion(region),
        "id": (c) => c.DBClusterArn ?? c.DBClusterIdentifier,
        "name": (c) => c.DBClusterIdentifier ?? c.DBClusterArn,
        "columns": [
            {"label": "Engine",
                "value": (c) => c.Engine},
            {"label": "Engine Version",
                "value": (c) => c.EngineVersion},
            {"label": "Status",
                "value": (c) => c.Status}
        ]
    }),
    describe({
        "resourceType": "neptuneinstance",
        "scope": "regional",
        "list": (inv, region) => inv.getNeptuneInstancesByRegion(region),
        "id": (i) => i.DBInstanceArn ?? i.DBInstanceIdentifier,
        "name": (i) => i.DBInstanceIdentifier ?? i.DBInstanceArn,
        "columns": [
            {"label": "Class",
                "value": (i) => i.DBInstanceClass},
            {"label": "Status",
                "value": (i) => i.DBInstanceStatus},
            {"label": "Cluster ID",
                "value": (i) => i.DBClusterIdentifier}
        ]
    }),
    describe({
        "resourceType": "docdbcluster",
        "scope": "regional",
        "list": (inv, region) => inv.getDocDbClustersByRegion(region),
        "id": (c) => c.DBClusterArn ?? c.DBClusterIdentifier,
        "name": (c) => c.DBClusterIdentifier ?? c.DBClusterArn,
        "columns": [
            {"label": "Engine",
                "value": (c) => c.Engine},
            {"label": "Engine Version",
                "value": (c) => c.EngineVersion},
            {"label": "Status",
                "value": (c) => c.Status}
        ]
    }),
    describe({
        "resourceType": "docdbinstance",
        "scope": "regional",
        "list": (inv, region) => inv.getDocDbInstancesByRegion(region),
        "id": (i) => i.DBInstanceArn ?? i.DBInstanceIdentifier,
        "name": (i) => i.DBInstanceIdentifier ?? i.DBInstanceArn,
        "columns": [
            {"label": "Class",
                "value": (i) => i.DBInstanceClass},
            {"label": "Status",
                "value": (i) => i.DBInstanceStatus},
            {"label": "Cluster ID",
                "value": (i) => i.DBClusterIdentifier}
        ]
    }),

    // ─── Redshift Serverless (regional) ────────────────────────────────────
    describe({
        "resourceType": "rsnamespace",
        "scope": "regional",
        "list": (inv, region) => inv.getRsNamespacesByRegion(region),
        "id": (n) => n.namespaceArn ?? n.namespaceName,
        "name": (n) => n.namespaceName ?? n.namespaceArn,
        "columns": [
            {"label": "Status",
                "value": (n) => n.status},
            {"label": "DB Name",
                "value": (n) => n.dbName},
            {"label": "Admin User",
                "value": (n) => n.adminUsername}
        ]
    }),
    describe({
        "resourceType": "rsworkgroup",
        "scope": "regional",
        "list": (inv, region) => inv.getRsWorkgroupsByRegion(region),
        "id": (w) => w.workgroupArn ?? w.workgroupName,
        "name": (w) => w.workgroupName ?? w.workgroupArn,
        "columns": [
            {"label": "Status",
                "value": (w) => w.status},
            {"label": "Namespace",
                "value": (w) => w.namespaceName},
            {"label": "Base Capacity",
                "value": (w) => w.baseCapacity?.toString()}
        ]
    }),

    // ─── EMR (regional) ────────────────────────────────────────────────────
    describe({
        "resourceType": "emrcluster",
        "scope": "regional",
        "list": (inv, region) => inv.getEmrClustersByRegion(region),
        "id": (c) => c.ClusterArn ?? c.Id,
        "name": (c) => c.Name ?? c.Id,
        "columns": [
            {"label": "State",
                "value": (c) => c.Status?.State},
            {"label": "Normalized Instance Hours",
                "value": (c) => c.NormalizedInstanceHours?.toString()}
        ]
    }),
    describe({
        "resourceType": "emrserverlessapplication",
        "scope": "regional",
        "list": (inv, region) => inv.getEmrServerlessAppsByRegion(region),
        "id": (a) => a.arn ?? a.id,
        "name": (a) => a.name ?? a.id,
        "columns": [
            {"label": "Type",
                "value": (a) => a.type},
            {"label": "State",
                "value": (a) => a.state},
            {"label": "Release Label",
                "value": (a) => a.releaseLabel}
        ]
    }),

    // ─── Athena (regional) ─────────────────────────────────────────────────
    describe({
        "resourceType": "athenaworkgroup",
        "scope": "regional",
        "list": (inv, region) => inv.getAthenaWorkGroupsByRegion(region),
        "id": (w) => w.Name,
        "name": (w) => w.Name,
        "columns": [
            {"label": "State",
                "value": (w) => w.State},
            {"label": "Description",
                "value": (w) => w.Description}
        ]
    }),

    // ─── AppSync (regional) ────────────────────────────────────────────────
    describe({
        "resourceType": "graphqlapi",
        "scope": "regional",
        "list": (inv, region) => inv.getGraphqlApisByRegion(region),
        "id": (a) => a.arn ?? a.apiId,
        "name": (a) => a.name ?? a.apiId,
        "columns": [
            {"label": "Auth Type",
                "value": (a) => a.authenticationType},
            {"label": "API Type",
                "value": (a) => a.apiType},
            {"label": "Visibility",
                "value": (a) => a.visibility}
        ]
    })

];

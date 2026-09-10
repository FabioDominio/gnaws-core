import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const rdsDescriptors: DescriptorGroup = [

    // ─── RDS (regional) ────────────────────────────────────────────────────
    describe({
        "resourceType": "dbcluster",
        "scope": "regional",
        "list": (inv, region) => inv.getDBClustersByRegion(region),
        "id": (c) => c.DBClusterArn ?? c.DBClusterIdentifier,
        "name": (c) => c.DBClusterIdentifier ?? c.DBClusterArn,
        "tags": (c) => c.TagList,
        "columns": [
            {"label": "Engine",
                "value": (c) => c.Engine},
            {"label": "Status",
                "value": (c) => c.Status}
        ]
    }),
    describe({
        "resourceType": "dbinstance",
        "scope": "regional",
        "list": (inv, region) => inv.getDBInstancesByRegion(region),
        "id": (db) => db.DBInstanceArn ?? db.DBInstanceIdentifier,
        "name": (db) => db.DBInstanceIdentifier ?? db.DBInstanceArn,
        "tags": (db) => db.TagList,
        "columns": [
            {"label": "Engine",
                "value": (db) => db.Engine},
            {"label": "Class",
                "value": (db) => db.DBInstanceClass},
            {"label": "Status",
                "value": (db) => db.DBInstanceStatus}
        ]
    }),
    describe({
        "resourceType": "dbproxy",
        "scope": "regional",
        "list": (inv, region) => inv.getDBProxiesByRegion(region),
        "id": (p) => p.DBProxyArn ?? p.DBProxyName,
        "name": (p) => p.DBProxyName ?? p.DBProxyArn,
        "columns": [
            {"label": "Engine Family",
                "value": (p) => p.EngineFamily},
            {"label": "Status",
                "value": (p) => p.Status},
            {"label": "VPC ID",
                "value": (p) => p.VpcId}
        ]
    }),
    describe({
        "resourceType": "dbsubnetgroup",
        "scope": "regional",
        "list": (inv, region) => inv.getDBSubnetGroupsByRegion(region),
        "id": (g) => g.DBSubnetGroupArn ?? g.DBSubnetGroupName,
        "name": (g) => g.DBSubnetGroupName ?? g.DBSubnetGroupArn,
        "columns": [
            {"label": "VPC ID",
                "value": (g) => g.VpcId},
            {"label": "Status",
                "value": (g) => g.SubnetGroupStatus},
            {"label": "Description",
                "value": (g) => g.DBSubnetGroupDescription}
        ]
    })

];

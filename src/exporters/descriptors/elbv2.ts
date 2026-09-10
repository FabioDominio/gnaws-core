import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const elbv2Descriptors: DescriptorGroup = [

    // ─── ELBv2 (regional; tags fetched separately) ─────────────────────────
    describe({
        "resourceType": "loadbalancer",
        "scope": "regional",
        "list": (inv, region) => inv.getLoadBalancersByRegion(region),
        "id": (lb) => lb.LoadBalancerArn,
        "name": (lb) => lb.LoadBalancerName ?? lb.LoadBalancerArn,
        "tags": (lb, inv) => inv.getElbv2TagsByArn(lb.LoadBalancerArn ?? ""),
        "columns": [
            {"label": "Type",
                "value": (lb) => lb.Type},
            {"label": "Scheme",
                "value": (lb) => lb.Scheme},
            {"label": "VPC ID",
                "value": (lb) => lb.VpcId}
        ]
    }),
    describe({
        "resourceType": "targetgroup",
        "scope": "regional",
        "list": (inv, region) => inv.getTargetGroupsByRegion(region),
        "id": (tg) => tg.TargetGroupArn,
        "name": (tg) => tg.TargetGroupName ?? tg.TargetGroupArn,
        "tags": (tg, inv) => inv.getElbv2TagsByArn(tg.TargetGroupArn ?? ""),
        "columns": [
            {"label": "Protocol",
                "value": (tg) => tg.Protocol},
            {"label": "Port",
                "value": (tg) => tg.Port?.toString()},
            {"label": "Target Type",
                "value": (tg) => tg.TargetType},
            {"label": "VPC ID",
                "value": (tg) => tg.VpcId}
        ]
    }),
    describe({
        "resourceType": "truststore",
        "scope": "regional",
        "list": (inv, region) => inv.getTrustStoresByRegion(region),
        "id": (ts) => ts.TrustStoreArn,
        "name": (ts) => ts.Name ?? ts.TrustStoreArn,
        "columns": [
            {"label": "Status",
                "value": (ts) => ts.Status},
            {"label": "CA Certificates",
                "value": (ts) => ts.NumberOfCaCertificates?.toString()},
            {"label": "Revoked Entries",
                "value": (ts) => ts.TotalRevokedEntries?.toString()}
        ]
    })

];

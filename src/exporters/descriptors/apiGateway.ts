import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const apiGatewayDescriptors: DescriptorGroup = [

    // ─── API Gateway (regional) ────────────────────────────────────────────
    describe({
        "resourceType": "restapi",
        "scope": "regional",
        "list": (inv, region) => inv.getRestApisByRegion(region),
        "id": (a) => a.id,
        "name": (a) => a.name ?? a.id,
        "columns": [
            {"label": "Status",
                "value": (a) => a.apiStatus},
            {"label": "Version",
                "value": (a) => a.version},
            {"label": "Created",
                "value": (a) => a.createdDate?.toISOString()}
        ]
    }),
    describe({
        "resourceType": "httpapi",
        "scope": "regional",
        "list": (inv, region) => inv.getHttpApisByRegion(region),
        "id": (a) => a.ApiId,
        "name": (a) => a.Name ?? a.ApiId,
        "columns": [
            {"label": "Protocol",
                "value": (a) => a.ProtocolType},
            {"label": "Endpoint",
                "value": (a) => a.ApiEndpoint},
            {"label": "Created",
                "value": (a) => a.CreatedDate?.toISOString()}
        ]
    }),
    describe({
        "resourceType": "vpclink",
        "scope": "regional",
        "list": (inv, region) => inv.getVpcLinksByRegion(region),
        "id": (l) => l.id,
        "name": (l) => l.name ?? l.id,
        "columns": [
            {"label": "Status",
                "value": (l) => l.status},
            {"label": "Targets",
                "value": (l) => l.targetArns?.join(", ")}
        ]
    }),
    describe({
        "resourceType": "httpvpclink",
        "scope": "regional",
        "list": (inv, region) => inv.getHttpVpcLinksByRegion(region),
        "id": (l) => l.VpcLinkId,
        "name": (l) => l.Name ?? l.VpcLinkId,
        "columns": [
            {"label": "Status",
                "value": (l) => l.VpcLinkStatus},
            {"label": "Subnets",
                "value": (l) => l.SubnetIds?.join(", ")}
        ]
    }),
    describe({
        "resourceType": "usageplan",
        "scope": "regional",
        "list": (inv, region) => inv.getUsagePlansByRegion(region),
        "id": (p) => p.id,
        "name": (p) => p.name ?? p.id,
        "columns": [
            {"label": "Description",
                "value": (p) => p.description},
            {"label": "Product Code",
                "value": (p) => p.productCode}
        ]
    })

];

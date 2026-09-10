import {describe, boolStr} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const route53Descriptors: DescriptorGroup = [

    describe({
        "resourceType": "hostedzone",
        "scope": "global",
        "list": (inv) => inv.getHostedZones(),
        "id": (z) => z.Id,
        "name": (z) => z.Name ?? z.Id,
        "columns": [
            {"label": "Private",
                "value": (z) => boolStr(z.Config?.PrivateZone)},
            {"label": "Record Sets",
                "value": (z) => z.ResourceRecordSetCount?.toString()},
            {"label": "Comment",
                "value": (z) => z.Config?.Comment}
        ]
    }),
    describe({
        "resourceType": "route53healthcheck",
        "scope": "global",
        "list": (inv) => inv.getRoute53HealthChecks(),
        "id": (h) => h.Id,
        "name": (h) => h.Id,
        "columns": [
            {"label": "Type",
                "value": (h) => h.HealthCheckConfig?.Type},
            {"label": "Endpoint",
                "value": (h) => h.HealthCheckConfig?.FullyQualifiedDomainName ?? h.HealthCheckConfig?.IPAddress},
            {"label": "Port",
                "value": (h) => h.HealthCheckConfig?.Port?.toString()}
        ]
    })

];

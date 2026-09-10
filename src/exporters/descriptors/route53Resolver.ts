import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const route53ResolverDescriptors: DescriptorGroup = [

    // ─── Route53 Resolver (regional) ───────────────────────────────────────
    describe({
        "resourceType": "resolverendpoint",
        "scope": "regional",
        "list": (inv, region) => inv.getResolverEndpointsByRegion(region),
        "id": (e) => e.Arn ?? e.Id,
        "name": (e) => e.Name ?? e.Id,
        "columns": [
            {"label": "Direction",
                "value": (e) => e.Direction},
            {"label": "Status",
                "value": (e) => e.Status},
            {"label": "IP Count",
                "value": (e) => e.IpAddressCount?.toString()}
        ]
    }),
    describe({
        "resourceType": "resolverrule",
        "scope": "regional",
        "list": (inv, region) => inv.getResolverRulesByRegion(region),
        "id": (r) => r.Arn ?? r.Id,
        "name": (r) => r.Name ?? r.Id,
        "columns": [
            {"label": "Domain",
                "value": (r) => r.DomainName},
            {"label": "Rule Type",
                "value": (r) => r.RuleType},
            {"label": "Status",
                "value": (r) => r.Status}
        ]
    })

];

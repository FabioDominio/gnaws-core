import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const networkFirewallDescriptors: DescriptorGroup = [

    // ─── Network Firewall (regional) ───────────────────────────────────────
    describe({
        "resourceType": "networkfirewall",
        "scope": "regional",
        "list": (inv, region) => inv.getNetworkFirewallsByRegion(region),
        "id": (f) => f.firewallArn,
        "name": (f) => f.firewallName,
        "columns": [
            {"label": "VPC ID",
                "value": (f) => f.vpcId},
            {"label": "Subnets",
                "value": (f) => f.subnetMappings?.join(", ")}
        ]
    }),
    describe({
        "resourceType": "firewallpolicy",
        "scope": "regional",
        "list": (inv, region) => inv.getFirewallPoliciesByRegion(region),
        "id": (p) => p.Arn ?? p.Name,
        "name": (p) => p.Name ?? p.Arn,
        "columns": [
            {"label": "ARN",
                "value": (p) => p.Arn}
        ]
    })

];

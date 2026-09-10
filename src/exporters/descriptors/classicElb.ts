import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const classicElbDescriptors: DescriptorGroup = [

    // ─── Classic ELB (regional) ────────────────────────────────────────────
    describe({
        "resourceType": "classicelb",
        "scope": "regional",
        "list": (inv, region) => inv.getClassicLoadBalancersByRegion(region),
        "id": (lb) => lb.LoadBalancerName,
        "name": (lb) => lb.LoadBalancerName,
        "columns": [
            {"label": "Scheme",
                "value": (lb) => lb.Scheme},
            {"label": "VPC ID",
                "value": (lb) => lb.VPCId},
            {"label": "DNS Name",
                "value": (lb) => lb.DNSName},
            {"label": "Instances",
                "value": (lb) => lb.Instances?.length.toString()}
        ]
    })

];

import {describe, boolStr} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const globalAcceleratorDescriptors: DescriptorGroup = [

    describe({
        "resourceType": "accelerator",
        "scope": "global",
        "list": (inv) => inv.getAccelerators(),
        "id": (a) => a.AcceleratorArn,
        "name": (a) => a.Name ?? a.AcceleratorArn,
        "columns": [
            {"label": "Status",
                "value": (a) => a.Status},
            {"label": "Enabled",
                "value": (a) => boolStr(a.Enabled)},
            {"label": "DNS Name",
                "value": (a) => a.DnsName},
            {"label": "Created",
                "value": (a) => a.CreatedTime?.toISOString()}
        ]
    }),
    describe({
        "resourceType": "acceleratorendpointgroup",
        "scope": "global",
        "list": (inv) => inv.getAcceleratorEndpointGroups(),
        "id": (g) => g.EndpointGroupArn,
        "name": (g) => g.EndpointGroupRegion ?? g.EndpointGroupArn,
        "columns": [
            {"label": "Region",
                "value": (g) => g.EndpointGroupRegion},
            {"label": "Traffic Dial %",
                "value": (g) => g.TrafficDialPercentage?.toString()},
            {"label": "Health Check Protocol",
                "value": (g) => g.HealthCheckProtocol}
        ]
    })

];

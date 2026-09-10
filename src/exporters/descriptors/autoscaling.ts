import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const autoScalingDescriptors: DescriptorGroup = [

    // ─── Auto Scaling (regional) ───────────────────────────────────────────
    describe({
        "resourceType": "autoscalinggroup",
        "scope": "regional",
        "list": (inv, region) => inv.getAutoScalingGroupsByRegion(region),
        "id": (g) => g.AutoScalingGroupARN,
        "name": (g) => g.AutoScalingGroupName ?? g.AutoScalingGroupARN,
        "tags": (g) => g.Tags?.map((t) => ({"Key": t.Key,
            "Value": t.Value})),
        "columns": [
            {"label": "Desired",
                "value": (g) => g.DesiredCapacity?.toString()},
            {"label": "Min",
                "value": (g) => g.MinSize?.toString()},
            {"label": "Max",
                "value": (g) => g.MaxSize?.toString()},
            {"label": "Health Check",
                "value": (g) => g.HealthCheckType}
        ]
    }),
    describe({
        "resourceType": "launchconfiguration",
        "scope": "regional",
        "list": (inv, region) => inv.getLaunchConfigsByRegion(region),
        "id": (lc) => lc.LaunchConfigurationARN,
        "name": (lc) => lc.LaunchConfigurationName ?? lc.LaunchConfigurationARN,
        "columns": [
            {"label": "Instance Type",
                "value": (lc) => lc.InstanceType},
            {"label": "Image ID",
                "value": (lc) => lc.ImageId},
            {"label": "Key Name",
                "value": (lc) => lc.KeyName}
        ]
    }),
    describe({
        "resourceType": "scalingpolicy",
        "scope": "regional",
        "list": (inv, region) => inv.getScalingPoliciesByRegion(region),
        "id": (p) => p.PolicyARN,
        "name": (p) => p.PolicyName ?? p.PolicyARN,
        "columns": [
            {"label": "Type",
                "value": (p) => p.PolicyType},
            {"label": "ASG Name",
                "value": (p) => p.AutoScalingGroupName},
            {"label": "Adjustment Type",
                "value": (p) => p.AdjustmentType}
        ]
    })

];

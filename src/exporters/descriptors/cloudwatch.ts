import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const cloudwatchDescriptors: DescriptorGroup = [

    // ─── CloudWatch (regional) ─────────────────────────────────────────────
    describe({
        "resourceType": "loggroup",
        "scope": "regional",
        "list": (inv, region) => inv.getLogGroupsByRegion(region),
        "id": (g) => g.arn ?? g.logGroupName,
        "name": (g) => g.logGroupName ?? g.arn,
        "columns": [
            {"label": "Retention (days)",
                "value": (g) => g.retentionInDays?.toString()},
            {"label": "Class",
                "value": (g) => g.logGroupClass},
            {"label": "Stored (bytes)",
                "value": (g) => g.storedBytes?.toString()}
        ]
    }),
    describe({
        "resourceType": "metricalarm",
        "scope": "regional",
        "list": (inv, region) => inv.getMetricAlarmsByRegion(region),
        "id": (a) => a.AlarmArn ?? a.AlarmName,
        "name": (a) => a.AlarmName ?? a.AlarmArn,
        "columns": [
            {"label": "State",
                "value": (a) => a.StateValue},
            {"label": "Namespace",
                "value": (a) => a.Namespace},
            {"label": "Metric",
                "value": (a) => a.MetricName}
        ]
    }),
    describe({
        "resourceType": "compositealarm",
        "scope": "regional",
        "list": (inv, region) => inv.getCompositeAlarmsByRegion(region),
        "id": (a) => a.AlarmArn ?? a.AlarmName,
        "name": (a) => a.AlarmName ?? a.AlarmArn,
        "columns": [
            {"label": "State",
                "value": (a) => a.StateValue},
            {"label": "Rule",
                "value": (a) => a.AlarmRule}
        ]
    })

];

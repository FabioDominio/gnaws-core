import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const beanstalkDescriptors: DescriptorGroup = [

    // ─── Beanstalk (regional) ──────────────────────────────────────────────
    describe({
        "resourceType": "beanstalkapplication",
        "scope": "regional",
        "list": (inv, region) => inv.getBeanstalkAppsByRegion(region),
        "id": (a) => a.ApplicationArn ?? a.ApplicationName,
        "name": (a) => a.ApplicationName ?? a.ApplicationArn,
        "columns": [
            {"label": "Description",
                "value": (a) => a.Description},
            {"label": "Versions",
                "value": (a) => a.Versions?.length.toString()}
        ]
    }),
    describe({
        "resourceType": "beanstalkenvironment",
        "scope": "regional",
        "list": (inv, region) => inv.getBeanstalkEnvsByRegion(region),
        "id": (e) => e.EnvironmentArn ?? e.EnvironmentId,
        "name": (e) => e.EnvironmentName ?? e.EnvironmentId,
        "columns": [
            {"label": "Application",
                "value": (e) => e.ApplicationName},
            {"label": "Status",
                "value": (e) => e.Status},
            {"label": "Health",
                "value": (e) => e.Health},
            {"label": "Platform",
                "value": (e) => e.SolutionStackName}
        ]
    })

];

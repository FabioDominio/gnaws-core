import {describe, recordTags, lowerTags, boolStr} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const containersDescriptors: DescriptorGroup = [

    // ─── ECR / ECS (regional) ──────────────────────────────────────────────
    describe({
        "resourceType": "ecrrepository",
        "scope": "regional",
        "list": (inv, region) => inv.getEcrRepositoriesByRegion(region),
        "id": (r) => r.repositoryArn ?? r.repositoryName,
        "name": (r) => r.repositoryName ?? r.repositoryArn,
        "columns": [
            {"label": "URI",
                "value": (r) => r.repositoryUri},
            {"label": "Tag Mutability",
                "value": (r) => r.imageTagMutability},
            {"label": "Scan On Push",
                "value": (r) => boolStr(r.imageScanningConfiguration?.scanOnPush)}
        ]
    }),
    describe({
        "resourceType": "ecscluster",
        "scope": "regional",
        "list": (inv, region) => inv.getEcsClustersByRegion(region),
        "id": (c) => c.clusterArn ?? c.clusterName,
        "name": (c) => c.clusterName ?? c.clusterArn,
        "tags": (c) => lowerTags(c.tags),
        "columns": [
            {"label": "Status",
                "value": (c) => c.status},
            {"label": "Active Services",
                "value": (c) => c.activeServicesCount?.toString()},
            {"label": "Running Tasks",
                "value": (c) => c.runningTasksCount?.toString()},
            {"label": "Container Instances",
                "value": (c) => c.registeredContainerInstancesCount?.toString()}
        ]
    }),
    describe({
        "resourceType": "ecsservice",
        "scope": "regional",
        "list": (inv, region) => inv.getEcsServicesByRegion(region),
        "id": (s) => s.serviceArn ?? s.serviceName,
        "name": (s) => s.serviceName ?? s.serviceArn,
        "tags": (s) => lowerTags(s.tags),
        "columns": [
            {"label": "Status",
                "value": (s) => s.status},
            {"label": "Desired",
                "value": (s) => s.desiredCount?.toString()},
            {"label": "Running",
                "value": (s) => s.runningCount?.toString()},
            {"label": "Launch Type",
                "value": (s) => s.launchType}
        ]
    }),

    // ─── EKS (regional) ────────────────────────────────────────────────────
    describe({
        "resourceType": "ekscluster",
        "scope": "regional",
        "list": (inv, region) => inv.getEksClustersByRegion(region),
        "id": (c) => c.arn,
        "name": (c) => c.name ?? c.arn,
        "tags": (c) => recordTags(c.tags),
        "columns": [
            {"label": "Version",
                "value": (c) => c.version},
            {"label": "Status",
                "value": (c) => c.status},
            {"label": "Platform",
                "value": (c) => c.platformVersion}
        ]
    }),
    describe({
        "resourceType": "eksnodegroup",
        "scope": "regional",
        "list": (inv, region) => inv.getEksNodegroupsByRegion(region),
        "id": (ng) => ng.nodegroupArn,
        "name": (ng) => ng.nodegroupName ?? ng.nodegroupArn,
        "columns": [
            {"label": "Status",
                "value": (ng) => ng.status},
            {"label": "Cluster",
                "value": (ng) => ng.clusterName},
            {"label": "Capacity Type",
                "value": (ng) => ng.capacityType},
            {"label": "AMI Type",
                "value": (ng) => ng.amiType}
        ]
    }),
    describe({
        "resourceType": "fargateprofile",
        "scope": "regional",
        "list": (inv, region) => inv.getFargateProfilesByRegion(region),
        "id": (fp) => fp.fargateProfileArn,
        "name": (fp) => fp.fargateProfileName ?? fp.fargateProfileArn,
        "columns": [
            {"label": "Status",
                "value": (fp) => fp.status},
            {"label": "Cluster",
                "value": (fp) => fp.clusterName},
            {"label": "Selectors",
                "value": (fp) => fp.selectors?.length.toString()}
        ]
    }),
    describe({
        "resourceType": "eksaddon",
        "scope": "regional",
        "list": (inv, region) => inv.getEksAddonsByRegion(region),
        "id": (a) => a.addonArn,
        "name": (a) => a.addonName ?? a.addonArn,
        "columns": [
            {"label": "Status",
                "value": (a) => a.status},
            {"label": "Version",
                "value": (a) => a.addonVersion},
            {"label": "Cluster",
                "value": (a) => a.clusterName}
        ]
    })

];

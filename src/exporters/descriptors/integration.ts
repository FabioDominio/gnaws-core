import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const integrationDescriptors: DescriptorGroup = [

    // ─── MQ / MWAA / App Runner / Transfer (regional) ──────────────────────
    describe({
        "resourceType": "mqbroker",
        "scope": "regional",
        "list": (inv, region) => inv.getMqBrokersByRegion(region),
        "id": (b) => b.BrokerArn ?? b.BrokerId,
        "name": (b) => b.BrokerName ?? b.BrokerArn,
        "columns": [
            {"label": "Engine",
                "value": (b) => b.EngineType},
            {"label": "State",
                "value": (b) => b.BrokerState},
            {"label": "Deployment",
                "value": (b) => b.DeploymentMode}
        ]
    }),
    describe({
        "resourceType": "mwaaenvironment",
        "scope": "regional",
        "list": (inv, region) => inv.getMwaaEnvironmentsByRegion(region),
        "id": (e) => e.Arn ?? e.Name,
        "name": (e) => e.Name ?? e.Arn,
        "columns": [
            {"label": "Status",
                "value": (e) => e.Status},
            {"label": "Airflow Version",
                "value": (e) => e.AirflowVersion},
            {"label": "Class",
                "value": (e) => e.EnvironmentClass}
        ]
    }),
    describe({
        "resourceType": "apprunnerservice",
        "scope": "regional",
        "list": (inv, region) => inv.getAppRunnerServicesByRegion(region),
        "id": (s) => s.ServiceArn,
        "name": (s) => s.ServiceName ?? s.ServiceArn,
        "columns": [
            {"label": "Status",
                "value": (s) => s.Status},
            {"label": "URL",
                "value": (s) => s.ServiceUrl}
        ]
    }),
    describe({
        "resourceType": "transferserver",
        "scope": "regional",
        "list": (inv, region) => inv.getTransferServersByRegion(region),
        "id": (s) => s.Arn ?? s.ServerId,
        "name": (s) => s.ServerId ?? s.Arn,
        "columns": [
            {"label": "State",
                "value": (s) => s.State},
            {"label": "Endpoint Type",
                "value": (s) => s.EndpointType},
            {"label": "Protocols",
                "value": (s) => s.Protocols?.join(", ")}
        ]
    }),

    // ─── VPC Lattice (regional) ────────────────────────────────────────────
    describe({
        "resourceType": "latticeservicenetwork",
        "scope": "regional",
        "list": (inv, region) => inv.getLatticeServiceNetworksByRegion(region),
        "id": (n) => n.arn,
        "name": (n) => n.name ?? n.arn,
        "columns": [
            {"label": "Associated VPCs",
                "value": (n) => n.numberOfAssociatedVPCs?.toString()},
            {"label": "Associated Services",
                "value": (n) => n.numberOfAssociatedServices?.toString()}
        ]
    }),
    describe({
        "resourceType": "latticeservice",
        "scope": "regional",
        "list": (inv, region) => inv.getLatticeServicesByRegion(region),
        "id": (s) => s.arn,
        "name": (s) => s.name ?? s.arn,
        "columns": [
            {"label": "Status",
                "value": (s) => s.status},
            {"label": "Custom Domain",
                "value": (s) => s.customDomainName}
        ]
    }),
    describe({
        "resourceType": "latticetargetgroup",
        "scope": "regional",
        "list": (inv, region) => inv.getLatticeTargetGroupsByRegion(region),
        "id": (tg) => tg.arn,
        "name": (tg) => tg.name ?? tg.arn,
        "columns": [
            {"label": "Type",
                "value": (tg) => tg.type},
            {"label": "Status",
                "value": (tg) => tg.status},
            {"label": "Port",
                "value": (tg) => tg.port?.toString()}
        ]
    })

];

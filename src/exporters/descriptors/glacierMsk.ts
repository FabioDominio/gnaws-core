import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const glacierMskDescriptors: DescriptorGroup = [

    // ─── Glacier / MSK (regional) ──────────────────────────────────────────
    describe({
        "resourceType": "glaciervault",
        "scope": "regional",
        "list": (inv, region) => inv.getGlacierVaultsByRegion(region),
        "id": (v) => v.VaultARN ?? v.VaultName,
        "name": (v) => v.VaultName ?? v.VaultARN,
        "columns": [
            {"label": "Archives",
                "value": (v) => v.NumberOfArchives?.toString()},
            {"label": "Size (bytes)",
                "value": (v) => v.SizeInBytes?.toString()}
        ]
    }),
    describe({
        "resourceType": "mskcluster",
        "scope": "regional",
        "list": (inv, region) => inv.getMskClustersByRegion(region),
        "id": (c) => c.ClusterArn ?? c.ClusterName,
        "name": (c) => c.ClusterName ?? c.ClusterArn,
        "columns": [
            {"label": "State",
                "value": (c) => c.State},
            {"label": "Broker Nodes",
                "value": (c) => c.NumberOfBrokerNodes?.toString()},
            {"label": "Kafka Version",
                "value": (c) => c.CurrentBrokerSoftwareInfo?.KafkaVersion}
        ]
    })

];

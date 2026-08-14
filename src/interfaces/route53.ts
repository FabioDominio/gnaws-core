import type {HostedZone, ResourceRecordSet, HealthCheck} from "@aws-sdk/client-route-53";

export interface Route53 {
    getHostedZones (): Promise<HostedZone[]>;
    getRecordSets (hostedZoneId: string): Promise<ResourceRecordSet[]>;
    getHealthChecks (): Promise<HealthCheck[]>;
}

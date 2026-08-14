import type {HostedZone, ResourceRecordSet, HealthCheck} from "@aws-sdk/client-route-53";
import type {Route53} from "../../interfaces/route53.js";
import {readCacheFile} from "./cacheReader.js";

export class Route53CacheService implements Route53 {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getHostedZones (): Promise<HostedZone[]> {

        return readCacheFile(
            this.#cacheDir,
            "route53_hosted_zones.json"
        );

    }

    async getRecordSets (_hostedZoneId: string): Promise<ResourceRecordSet[]> {

        return readCacheFile(
            this.#cacheDir,
            "route53_record_sets.json"
        );

    }

    async getHealthChecks (): Promise<HealthCheck[]> {

        return readCacheFile(
            this.#cacheDir,
            "route53_health_checks.json"
        );

    }

}

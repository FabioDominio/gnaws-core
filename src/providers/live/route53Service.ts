import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type HostedZone,
    type ResourceRecordSet,
    type HealthCheck,
    type RRType,
    Route53Client,
    type Route53ClientConfig,
    paginateListHostedZones,
    paginateListHealthChecks,
    ListResourceRecordSetsCommand
} from "@aws-sdk/client-route-53";
import type {Route53} from "../../interfaces/route53.js";

export class Route53Service implements Route53 {

    #client: Route53Client;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, logger?: SdkLogger) {

        const config: Route53ClientConfig = {
            "region": "us-east-1",
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new Route53Client(config);

    }

    async getHostedZones (): Promise<HostedZone[]> {

        const client = this.#client;
        const hostedZones: HostedZone[] = [];
        for await (const page of paginateListHostedZones(
            {client},
            {}
        )) {

            if (page.HostedZones !== undefined) {

                hostedZones.push(...page.HostedZones);

            }

        }
        return hostedZones;

    }

    async getRecordSets (hostedZoneId: string): Promise<ResourceRecordSet[]> {

        const client = this.#client;
        const records: ResourceRecordSet[] = [];
        let startRecordName: string | undefined;
        let startRecordType: RRType | undefined;
        let isTruncated = true;

        while (isTruncated) {

            const response = await client.send(new ListResourceRecordSetsCommand({
                "HostedZoneId": hostedZoneId,
                "StartRecordName": startRecordName,
                "StartRecordType": startRecordType
            }));
            if (response.ResourceRecordSets) {

                records.push(...response.ResourceRecordSets);

            }
            isTruncated = response.IsTruncated ?? false;
            startRecordName = response.NextRecordName;
            startRecordType = response.NextRecordType;

        }
        return records;

    }

    async getHealthChecks (): Promise<HealthCheck[]> {

        const client = this.#client;
        const healthChecks: HealthCheck[] = [];

        for await (const page of paginateListHealthChecks(
            {client},
            {}
        )) {

            if (page.HealthChecks !== undefined) {

                healthChecks.push(...page.HealthChecks);

            }

        }

        return healthChecks;

    }

}

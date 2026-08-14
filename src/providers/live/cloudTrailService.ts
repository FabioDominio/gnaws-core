import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    CloudTrailClient,
    type CloudTrailClientConfig,
    DescribeTrailsCommand,
    paginateListTrails
} from "@aws-sdk/client-cloudtrail";
import type {CloudTrail, CloudTrailTrailInfo} from "../../interfaces/cloudtrail.js";

export class CloudTrailService implements CloudTrail {

    #client: CloudTrailClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: CloudTrailClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new CloudTrailClient(config);

    }

    async getTrails (): Promise<CloudTrailTrailInfo[]> {

        const client = this.#client;
        const trailArns: string[] = [];

        for await (const page of paginateListTrails(
            {client},
            {}
        )) {

            if (page.Trails !== undefined) {

                for (const trail of page.Trails) {

                    if (trail.TrailARN) {

                        trailArns.push(trail.TrailARN);

                    }

                }

            }

        }

        if (trailArns.length === 0) {

            return [];

        }

        const response = await client.send(new DescribeTrailsCommand({
            "trailNameList": trailArns
        }));

        const trails: CloudTrailTrailInfo[] = (response.trailList ?? []).map((trail) => ({
            "Name": trail.Name,
            "TrailARN": trail.TrailARN,
            "S3BucketName": trail.S3BucketName,
            "CloudWatchLogsLogGroupArn": trail.CloudWatchLogsLogGroupArn,
            "KmsKeyId": trail.KmsKeyId,
            "IsMultiRegionTrail": trail.IsMultiRegionTrail
        }));

        return trails;

    }

}

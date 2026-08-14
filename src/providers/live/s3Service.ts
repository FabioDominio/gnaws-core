import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    S3Client,
    type S3ClientConfig,
    type Bucket,
    paginateListBuckets,
    paginateListDirectoryBuckets,
    GetBucketLocationCommand,
    GetBucketNotificationConfigurationCommand,
    GetBucketTaggingCommand
} from "@aws-sdk/client-s3";

/*
 *  Available but not yet implemented:
 *  paginateListObjectsV2,
 *  paginateListObjectAnnotations,
 *  paginateListParts,
 */
import type {S3, BucketInfo, DirectoryBucketInfo} from "../../interfaces/s3.js";

export class S3Service implements S3 {

    #s3Client: S3Client;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, logger?: SdkLogger) {

        const s3ClientConfig: S3ClientConfig = {
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#s3Client = new S3Client(s3ClientConfig);

    }

    async getBuckets (): Promise<BucketInfo[]> {

        const client = this.#s3Client;
        const buckets: Bucket[] = [];
        for await (const page of paginateListBuckets(
            {client},
            {}
        )) {

            if (page.Buckets !== undefined) {

                buckets.push(...page.Buckets);

            }

        }

        // Enrich each bucket with region and notification config
        const bucketInfos: BucketInfo[] = [];
        for (const bucket of buckets) {

            if (!bucket.Name) {

                continue;

            }

            let region = "us-east-1";
            try {

                const locationResponse = await this.#s3Client.send(new GetBucketLocationCommand({"Bucket": bucket.Name}));
                region = locationResponse.LocationConstraint ?? "us-east-1";

            } catch {

                // Bucket may not be accessible
            }

            let notificationConfiguration;
            try {

                notificationConfiguration = await this.#s3Client.send(new GetBucketNotificationConfigurationCommand({"Bucket": bucket.Name}));

            } catch {

                // May not have permission
            }

            let tags;
            try {

                const taggingResponse = await this.#s3Client.send(new GetBucketTaggingCommand({"Bucket": bucket.Name}));
                tags = taggingResponse.TagSet;

            } catch {

                // Bucket may not have tags or no permission
            }

            bucketInfos.push({
                bucket,
                region,
                notificationConfiguration,
                tags
            });

        }

        return bucketInfos;

    }

    async getDirectoryBuckets (): Promise<DirectoryBucketInfo[]> {

        const client = this.#s3Client;
        const results: DirectoryBucketInfo[] = [];

        for await (const page of paginateListDirectoryBuckets(
            {client},
            {}
        )) {

            if (page.Buckets !== undefined) {

                for (const bucket of page.Buckets) {

                    if (bucket.Name) {

                        results.push({
                            "name": bucket.Name,
                            "creationDate": bucket.CreationDate
                        });

                    }

                }

            }

        }

        return results;

    }

}

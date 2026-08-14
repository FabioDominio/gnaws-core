import type {Bucket, NotificationConfiguration, Tag} from "@aws-sdk/client-s3";

export interface BucketInfo {
    "bucket": Bucket;
    "region": string;
    "notificationConfiguration"?: NotificationConfiguration;
    "tags"?: Tag[];
}

export interface DirectoryBucketInfo {
    "name": string;
    "creationDate"?: Date;
}

export interface S3 {
    getBuckets (): Promise<BucketInfo[]>;
    getDirectoryBuckets (): Promise<DirectoryBucketInfo[]>;
}

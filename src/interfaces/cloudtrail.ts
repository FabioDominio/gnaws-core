export interface CloudTrailTrailInfo {
    "Name"?: string;
    "TrailARN"?: string;
    "S3BucketName"?: string;
    "CloudWatchLogsLogGroupArn"?: string;
    "KmsKeyId"?: string;
    "IsMultiRegionTrail"?: boolean;
}

export interface CloudTrail {
    getTrails (): Promise<CloudTrailTrailInfo[]>;
}

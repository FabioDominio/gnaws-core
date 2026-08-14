import type {AccessPoint} from "@aws-sdk/client-s3-control";

export interface S3Control {
    getAccessPoints (): Promise<AccessPoint[]>;
}

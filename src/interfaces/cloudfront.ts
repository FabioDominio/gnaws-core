import type {DistributionSummary, FunctionSummary, OriginAccessControl, KeyValueStore, Tag} from "@aws-sdk/client-cloudfront";

export interface CloudFront {
    getDistributions (): Promise<DistributionSummary[]>;
    getFunctions (): Promise<FunctionSummary[]>;
    getOriginAccessControls (): Promise<OriginAccessControl[]>;
    getKeyValueStores (): Promise<KeyValueStore[]>;
    getTagsForDistribution (arn: string): Promise<Tag[]>;
}

import type {DistributionSummary, FunctionSummary, OriginAccessControl, KeyValueStore, Tag} from "@aws-sdk/client-cloudfront";
import type {CloudFront} from "../../interfaces/cloudfront.js";
import {readCacheFile} from "./cacheReader.js";

export class CloudFrontCacheService implements CloudFront {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getDistributions (): Promise<DistributionSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "cloudfront_distributions.json"
        );

    }

    async getFunctions (): Promise<FunctionSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "cloudfront_functions.json"
        );

    }

    async getOriginAccessControls (): Promise<OriginAccessControl[]> {

        return readCacheFile(
            this.#cacheDir,
            "cloudfront_origin_access_controls.json"
        );

    }

    async getKeyValueStores (): Promise<KeyValueStore[]> {

        return readCacheFile(
            this.#cacheDir,
            "cloudfront_key_value_stores.json"
        );

    }

    async getTagsForDistribution (_arn: string): Promise<Tag[]> {

        return [];

    }

}

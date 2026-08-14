import type {S3, BucketInfo, DirectoryBucketInfo} from "../../interfaces/s3.js";
import {readCacheFile} from "./cacheReader.js";

export class S3CacheService implements S3 {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getBuckets (): Promise<BucketInfo[]> {

        return [];

    }

    async getDirectoryBuckets (): Promise<DirectoryBucketInfo[]> {

        return readCacheFile(
            this.#cacheDir,
            "s3_directory_buckets.json"
        );

    }

}

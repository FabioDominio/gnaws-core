import type {ComputeEnvironmentDetail, JobQueueDetail, SchedulingPolicyListingDetail} from "@aws-sdk/client-batch";
import type {Batch} from "../../interfaces/batch.js";
import {readCacheFile} from "./cacheReader.js";

export class BatchCacheService implements Batch {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getComputeEnvironments (): Promise<ComputeEnvironmentDetail[]> {

        return readCacheFile(
            this.#cacheDir,
            "batch_compute_environments.json"
        );

    }

    async getJobQueues (): Promise<JobQueueDetail[]> {

        return readCacheFile(
            this.#cacheDir,
            "batch_job_queues.json"
        );

    }

    async getSchedulingPolicies (): Promise<SchedulingPolicyListingDetail[]> {

        return readCacheFile(
            this.#cacheDir,
            "batch_scheduling_policies.json"
        );

    }

}

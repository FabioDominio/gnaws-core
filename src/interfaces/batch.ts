import type {ComputeEnvironmentDetail, JobQueueDetail, SchedulingPolicyListingDetail} from "@aws-sdk/client-batch";

export interface Batch {
    getComputeEnvironments (): Promise<ComputeEnvironmentDetail[]>;
    getJobQueues (): Promise<JobQueueDetail[]>;
    getSchedulingPolicies (): Promise<SchedulingPolicyListingDetail[]>;
}

import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type ComputeEnvironmentDetail,
    type JobQueueDetail,
    type SchedulingPolicyListingDetail,
    BatchClient,
    type BatchClientConfig,
    paginateDescribeComputeEnvironments,
    paginateDescribeJobQueues,
    paginateListSchedulingPolicies
} from "@aws-sdk/client-batch";
import type {Batch} from "../../interfaces/batch.js";

export class BatchService implements Batch {

    #client: BatchClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: BatchClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new BatchClient(config);

    }

    async getComputeEnvironments (): Promise<ComputeEnvironmentDetail[]> {

        const client = this.#client;
        const environments: ComputeEnvironmentDetail[] = [];
        for await (const page of paginateDescribeComputeEnvironments(
            {client},
            {}
        )) {

            if (page.computeEnvironments !== undefined) {

                environments.push(...page.computeEnvironments);

            }

        }
        return environments;

    }

    async getJobQueues (): Promise<JobQueueDetail[]> {

        const client = this.#client;
        const queues: JobQueueDetail[] = [];
        for await (const page of paginateDescribeJobQueues(
            {client},
            {}
        )) {

            if (page.jobQueues !== undefined) {

                queues.push(...page.jobQueues);

            }

        }
        return queues;

    }

    async getSchedulingPolicies (): Promise<SchedulingPolicyListingDetail[]> {

        const client = this.#client;
        const policies: SchedulingPolicyListingDetail[] = [];
        for await (const page of paginateListSchedulingPolicies(
            {client},
            {}
        )) {

            if (page.schedulingPolicies !== undefined) {

                policies.push(...page.schedulingPolicies);

            }

        }
        return policies;

    }

}

import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    BatchClient,
    DescribeComputeEnvironmentsCommand,
    DescribeJobQueuesCommand,
    ListSchedulingPoliciesCommand
} from "@aws-sdk/client-batch";
import {BatchService} from "../../../../src/providers/live/batchService.js";

const batchMock = mockClient(BatchClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    batchMock.reset();

});

describe(
    "BatchService",
    () => {

        describe(
            "getComputeEnvironments",
            () => {

                it(
                    "returns compute environments",
                    async () => {

                        batchMock.on(DescribeComputeEnvironmentsCommand).resolves({
                            "computeEnvironments": [
                                {"computeEnvironmentName": "env-1",
                                    "computeEnvironmentArn": "arn:aws:batch:us-east-1:123:compute-environment/env-1"},
                                {"computeEnvironmentName": "env-2",
                                    "computeEnvironmentArn": "arn:aws:batch:us-east-1:123:compute-environment/env-2"}
                            ]
                        });

                        const service = new BatchService(
                            creds,
                            "us-east-1"
                        );
                        const envs = await service.getComputeEnvironments();

                        expect(envs).toHaveLength(2);
                        expect(envs[0].computeEnvironmentName).toBe("env-1");

                    }
                );

                it(
                    "returns empty when no compute environments",
                    async () => {

                        batchMock.on(DescribeComputeEnvironmentsCommand).resolves({});

                        const service = new BatchService(
                            creds,
                            "us-east-1"
                        );
                        const envs = await service.getComputeEnvironments();

                        expect(envs).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getJobQueues",
            () => {

                it(
                    "returns job queues",
                    async () => {

                        batchMock.on(DescribeJobQueuesCommand).resolves({
                            "jobQueues": [
                                {"jobQueueName": "queue-1",
                                    "jobQueueArn": "arn:aws:batch:us-east-1:123:job-queue/queue-1",
                                    "state": "ENABLED",
                                    "priority": 1,
                                    "computeEnvironmentOrder": []},
                                {"jobQueueName": "queue-2",
                                    "jobQueueArn": "arn:aws:batch:us-east-1:123:job-queue/queue-2",
                                    "state": "ENABLED",
                                    "priority": 1,
                                    "computeEnvironmentOrder": []}
                            ]
                        });

                        const service = new BatchService(
                            creds,
                            "us-east-1"
                        );
                        const queues = await service.getJobQueues();

                        expect(queues).toHaveLength(2);
                        expect(queues[0].jobQueueName).toBe("queue-1");

                    }
                );

                it(
                    "returns empty when no job queues",
                    async () => {

                        batchMock.on(DescribeJobQueuesCommand).resolves({});

                        const service = new BatchService(
                            creds,
                            "us-east-1"
                        );
                        const queues = await service.getJobQueues();

                        expect(queues).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getSchedulingPolicies",
            () => {

                it(
                    "returns scheduling policies",
                    async () => {

                        batchMock.on(ListSchedulingPoliciesCommand).resolves({
                            "schedulingPolicies": [
                                {"arn": "arn:aws:batch:us-east-1:123:scheduling-policy/policy-1"},
                                {"arn": "arn:aws:batch:us-east-1:123:scheduling-policy/policy-2"}
                            ]
                        });

                        const service = new BatchService(
                            creds,
                            "us-east-1"
                        );
                        const policies = await service.getSchedulingPolicies();

                        expect(policies).toHaveLength(2);
                        expect(policies[0].arn).toBe("arn:aws:batch:us-east-1:123:scheduling-policy/policy-1");

                    }
                );

                it(
                    "returns empty when no scheduling policies",
                    async () => {

                        batchMock.on(ListSchedulingPoliciesCommand).resolves({});

                        const service = new BatchService(
                            creds,
                            "us-east-1"
                        );
                        const policies = await service.getSchedulingPolicies();

                        expect(policies).toHaveLength(0);

                    }
                );

            }
        );

    }
);

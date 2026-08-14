import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {BatchCacheService} from "../../../../src/providers/cache/batchCacheService.js";

let tmpDir: string;
beforeEach(() => {

    tmpDir = mkdtempSync(join(
        tmpdir(),
        "gnaws-test-"
    ));

});
afterEach(() => {

    rmSync(
        tmpDir,
        {"recursive": true}
    );

});

describe(
    "BatchCacheService",
    () => {

        it(
            "getComputeEnvironments reads batch_compute_environments.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "batch_compute_environments.json"
                    ),
                    JSON.stringify([{"computeEnvironmentName": "env1"}])
                );
                const service = new BatchCacheService(tmpDir);
                expect(await service.getComputeEnvironments()).toEqual([{"computeEnvironmentName": "env1"}]);

            }
        );

        it(
            "getComputeEnvironments returns empty for missing file",
            async () => {

                const service = new BatchCacheService(tmpDir);
                expect(await service.getComputeEnvironments()).toEqual([]);

            }
        );

        it(
            "getJobQueues reads batch_job_queues.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "batch_job_queues.json"
                    ),
                    JSON.stringify([{"jobQueueName": "queue1"}])
                );
                const service = new BatchCacheService(tmpDir);
                expect(await service.getJobQueues()).toEqual([{"jobQueueName": "queue1"}]);

            }
        );

        it(
            "getJobQueues returns empty for missing file",
            async () => {

                const service = new BatchCacheService(tmpDir);
                expect(await service.getJobQueues()).toEqual([]);

            }
        );

        it(
            "getSchedulingPolicies reads batch_scheduling_policies.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "batch_scheduling_policies.json"
                    ),
                    JSON.stringify([{"arn": "arn:1"}])
                );
                const service = new BatchCacheService(tmpDir);
                expect(await service.getSchedulingPolicies()).toEqual([{"arn": "arn:1"}]);

            }
        );

        it(
            "getSchedulingPolicies returns empty for missing file",
            async () => {

                const service = new BatchCacheService(tmpDir);
                expect(await service.getSchedulingPolicies()).toEqual([]);

            }
        );

    }
);

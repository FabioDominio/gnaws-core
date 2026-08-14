import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {AutoScalingCacheService} from "../../../../src/providers/cache/autoScalingCacheService.js";

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
    "AutoScalingCacheService",
    () => {

        it(
            "getAutoScalingGroups reads autoscaling_groups.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "autoscaling_groups.json"
                    ),
                    JSON.stringify([{"AutoScalingGroupName": "asg1"}])
                );
                const service = new AutoScalingCacheService(tmpDir);
                expect(await service.getAutoScalingGroups()).toEqual([{"AutoScalingGroupName": "asg1"}]);

            }
        );

        it(
            "getAutoScalingGroups returns empty for missing file",
            async () => {

                const service = new AutoScalingCacheService(tmpDir);
                expect(await service.getAutoScalingGroups()).toEqual([]);

            }
        );

        it(
            "getLaunchConfigurations reads autoscaling_launch_configurations.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "autoscaling_launch_configurations.json"
                    ),
                    JSON.stringify([{"LaunchConfigurationName": "lc1"}])
                );
                const service = new AutoScalingCacheService(tmpDir);
                expect(await service.getLaunchConfigurations()).toEqual([{"LaunchConfigurationName": "lc1"}]);

            }
        );

        it(
            "getLaunchConfigurations returns empty for missing file",
            async () => {

                const service = new AutoScalingCacheService(tmpDir);
                expect(await service.getLaunchConfigurations()).toEqual([]);

            }
        );

        it(
            "getScalingPolicies reads autoscaling_scaling_policies.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "autoscaling_scaling_policies.json"
                    ),
                    JSON.stringify([{"PolicyName": "policy1"}])
                );
                const service = new AutoScalingCacheService(tmpDir);
                expect(await service.getScalingPolicies()).toEqual([{"PolicyName": "policy1"}]);

            }
        );

        it(
            "getScalingPolicies returns empty for missing file",
            async () => {

                const service = new AutoScalingCacheService(tmpDir);
                expect(await service.getScalingPolicies()).toEqual([]);

            }
        );

        it(
            "getLifecycleHooks always returns empty",
            async () => {

                const service = new AutoScalingCacheService(tmpDir);
                expect(await service.getLifecycleHooks("asg1")).toEqual([]);

            }
        );

    }
);

import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    AutoScalingClient,
    DescribeAutoScalingGroupsCommand,
    DescribeLaunchConfigurationsCommand,
    DescribeLifecycleHooksCommand,
    DescribePoliciesCommand
} from "@aws-sdk/client-auto-scaling";
import {AutoScalingService} from "../../../../src/providers/live/autoScalingService.js";

const asMock = mockClient(AutoScalingClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    asMock.reset();

});

describe(
    "AutoScalingService",
    () => {

        describe(
            "getAutoScalingGroups",
            () => {

                it(
                    "returns ASGs from single page",
                    async () => {

                        asMock.on(DescribeAutoScalingGroupsCommand).resolves({
                            "AutoScalingGroups": [
                                {"AutoScalingGroupName": "asg-1",
                                    "MinSize": 1,
                                    "MaxSize": 3,
                                    "DesiredCapacity": 2,
                                    "DefaultCooldown": 300,
                                    "AvailabilityZones": ["us-east-1a"],
                                    "HealthCheckType": "EC2",
                                    "CreatedTime": new Date()},
                                {"AutoScalingGroupName": "asg-2",
                                    "MinSize": 0,
                                    "MaxSize": 5,
                                    "DesiredCapacity": 0,
                                    "DefaultCooldown": 300,
                                    "AvailabilityZones": ["us-east-1a"],
                                    "HealthCheckType": "EC2",
                                    "CreatedTime": new Date()}
                            ]
                        });

                        const service = new AutoScalingService(
                            creds,
                            "us-east-1"
                        );
                        const groups = await service.getAutoScalingGroups();

                        expect(groups).toHaveLength(2);
                        expect(groups[0].AutoScalingGroupName).toBe("asg-1");

                    }
                );

                it(
                    "aggregates across pages",
                    async () => {

                        asMock.on(DescribeAutoScalingGroupsCommand).
                            resolvesOnce({"AutoScalingGroups": [
                                {"AutoScalingGroupName": "asg-1",
                                    "MinSize": 0,
                                    "MaxSize": 1,
                                    "DesiredCapacity": 0,
                                    "DefaultCooldown": 300,
                                    "AvailabilityZones": ["us-east-1a"],
                                    "HealthCheckType": "EC2",
                                    "CreatedTime": new Date()}
                            ],
                            "NextToken": "tok"}).
                            resolvesOnce({"AutoScalingGroups": [
                                {"AutoScalingGroupName": "asg-2",
                                    "MinSize": 0,
                                    "MaxSize": 1,
                                    "DesiredCapacity": 0,
                                    "DefaultCooldown": 300,
                                    "AvailabilityZones": ["us-east-1a"],
                                    "HealthCheckType": "EC2",
                                    "CreatedTime": new Date()}
                            ]});

                        const service = new AutoScalingService(
                            creds,
                            "us-east-1"
                        );
                        const groups = await service.getAutoScalingGroups();

                        expect(groups).toHaveLength(2);

                    }
                );

            }
        );

        describe(
            "getLaunchConfigurations",
            () => {

                it(
                    "returns launch configurations",
                    async () => {

                        asMock.on(DescribeLaunchConfigurationsCommand).resolves({
                            "LaunchConfigurations": [
                                {"LaunchConfigurationName": "lc-1",
                                    "ImageId": "ami-123",
                                    "InstanceType": "t2.micro",
                                    "CreatedTime": new Date()}
                            ]
                        });

                        const service = new AutoScalingService(
                            creds,
                            "us-east-1"
                        );
                        const configs = await service.getLaunchConfigurations();

                        expect(configs).toHaveLength(1);
                        expect(configs[0].LaunchConfigurationName).toBe("lc-1");

                    }
                );

            }
        );

        describe(
            "getScalingPolicies",
            () => {

                it(
                    "returns scaling policies",
                    async () => {

                        asMock.on(DescribePoliciesCommand).resolves({
                            "ScalingPolicies": [
                                {"PolicyName": "scale-up",
                                    "PolicyType": "SimpleScaling",
                                    "AutoScalingGroupName": "asg-1"},
                                {"PolicyName": "scale-down",
                                    "PolicyType": "TargetTrackingScaling",
                                    "AutoScalingGroupName": "asg-1"}
                            ]
                        });

                        const service = new AutoScalingService(
                            creds,
                            "us-east-1"
                        );
                        const policies = await service.getScalingPolicies();

                        expect(policies).toHaveLength(2);
                        expect(policies[0].PolicyName).toBe("scale-up");

                    }
                );

                it(
                    "aggregates across pages",
                    async () => {

                        asMock.on(DescribePoliciesCommand).
                            resolvesOnce({"ScalingPolicies": [{"PolicyName": "p1"}],
                                "NextToken": "tok"}).
                            resolvesOnce({"ScalingPolicies": [{"PolicyName": "p2"}]});

                        const service = new AutoScalingService(
                            creds,
                            "us-east-1"
                        );
                        const policies = await service.getScalingPolicies();

                        expect(policies).toHaveLength(2);

                    }
                );

                it(
                    "returns empty when no scaling policies",
                    async () => {

                        asMock.on(DescribePoliciesCommand).resolves({});

                        const service = new AutoScalingService(
                            creds,
                            "us-east-1"
                        );
                        const policies = await service.getScalingPolicies();

                        expect(policies).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getLifecycleHooks",
            () => {

                it(
                    "returns lifecycle hooks for an ASG",
                    async () => {

                        asMock.on(DescribeLifecycleHooksCommand).resolves({
                            "LifecycleHooks": [
                                {"LifecycleHookName": "hook-1",
                                    "LifecycleTransition": "autoscaling:EC2_INSTANCE_LAUNCHING"},
                                {"LifecycleHookName": "hook-2",
                                    "LifecycleTransition": "autoscaling:EC2_INSTANCE_TERMINATING"}
                            ]
                        });

                        const service = new AutoScalingService(
                            creds,
                            "us-east-1"
                        );
                        const hooks = await service.getLifecycleHooks("asg-1");

                        expect(hooks).toHaveLength(2);
                        expect(hooks[0].LifecycleHookName).toBe("hook-1");

                    }
                );

                it(
                    "returns empty array when no hooks",
                    async () => {

                        asMock.on(DescribeLifecycleHooksCommand).resolves({});

                        const service = new AutoScalingService(
                            creds,
                            "us-east-1"
                        );
                        const hooks = await service.getLifecycleHooks("asg-1");

                        expect(hooks).toHaveLength(0);

                    }
                );

            }
        );

    }
);

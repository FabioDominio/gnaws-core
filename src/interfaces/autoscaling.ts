import type {AutoScalingGroup, LaunchConfiguration, ScalingPolicy, LifecycleHook} from "@aws-sdk/client-auto-scaling";

export interface AutoScaling {
    getAutoScalingGroups (): Promise<AutoScalingGroup[]>;
    getLaunchConfigurations (): Promise<LaunchConfiguration[]>;
    getScalingPolicies (): Promise<ScalingPolicy[]>;
    getLifecycleHooks (autoScalingGroupName: string): Promise<LifecycleHook[]>;
}

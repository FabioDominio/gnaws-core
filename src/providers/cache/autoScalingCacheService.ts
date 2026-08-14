import type {AutoScalingGroup, LaunchConfiguration, ScalingPolicy, LifecycleHook} from "@aws-sdk/client-auto-scaling";
import type {AutoScaling} from "../../interfaces/autoscaling.js";
import {readCacheFile} from "./cacheReader.js";

export class AutoScalingCacheService implements AutoScaling {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getAutoScalingGroups (): Promise<AutoScalingGroup[]> {

        return readCacheFile(
            this.#cacheDir,
            "autoscaling_groups.json"
        );

    }

    async getLaunchConfigurations (): Promise<LaunchConfiguration[]> {

        return readCacheFile(
            this.#cacheDir,
            "autoscaling_launch_configurations.json"
        );

    }

    async getScalingPolicies (): Promise<ScalingPolicy[]> {

        return readCacheFile(
            this.#cacheDir,
            "autoscaling_scaling_policies.json"
        );

    }

    async getLifecycleHooks (_autoScalingGroupName: string): Promise<LifecycleHook[]> {

        return [];

    }

}

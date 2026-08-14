import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type AutoScalingGroup,
    type LaunchConfiguration,
    type ScalingPolicy,
    type LifecycleHook,
    AutoScalingClient,
    type AutoScalingClientConfig,
    paginateDescribeAutoScalingGroups,
    paginateDescribeLaunchConfigurations,
    paginateDescribePolicies,
    DescribeLifecycleHooksCommand
} from "@aws-sdk/client-auto-scaling";

/*
 *  Available but not yet implemented:
 *  paginateDescribeAutoScalingInstances,
 *  paginateDescribeNotificationConfigurations,
 *  paginateDescribeScalingActivities,
 *  paginateDescribeScheduledActions,
 *  paginateDescribeTags,
 */
import type {AutoScaling} from "../../interfaces/autoscaling.js";

export class AutoScalingService implements AutoScaling {

    #client: AutoScalingClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: AutoScalingClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new AutoScalingClient(config);

    }

    async getAutoScalingGroups (): Promise<AutoScalingGroup[]> {

        const client = this.#client;
        const groups: AutoScalingGroup[] = [];
        for await (const page of paginateDescribeAutoScalingGroups(
            {client},
            {}
        )) {

            if (page.AutoScalingGroups !== undefined) {

                groups.push(...page.AutoScalingGroups);

            }

        }
        return groups;

    }

    async getLaunchConfigurations (): Promise<LaunchConfiguration[]> {

        const client = this.#client;
        const configs: LaunchConfiguration[] = [];
        for await (const page of paginateDescribeLaunchConfigurations(
            {client},
            {}
        )) {

            if (page.LaunchConfigurations !== undefined) {

                configs.push(...page.LaunchConfigurations);

            }

        }
        return configs;

    }

    async getScalingPolicies (): Promise<ScalingPolicy[]> {

        const client = this.#client;
        const policies: ScalingPolicy[] = [];
        for await (const page of paginateDescribePolicies(
            {client},
            {}
        )) {

            if (page.ScalingPolicies !== undefined) {

                policies.push(...page.ScalingPolicies);

            }

        }
        return policies;

    }

    async getLifecycleHooks (autoScalingGroupName: string): Promise<LifecycleHook[]> {

        const response = await this.#client.send(new DescribeLifecycleHooksCommand({
            "AutoScalingGroupName": autoScalingGroupName
        }));
        return response.LifecycleHooks ?? [];

    }

}

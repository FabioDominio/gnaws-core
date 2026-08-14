import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type ClusterSummary,
    type InstanceFleet,
    type InstanceGroup,
    type SecurityConfigurationSummary,
    EMRClient,
    type EMRClientConfig,
    paginateListClusters,
    paginateListInstanceFleets,
    paginateListInstanceGroups,
    paginateListSecurityConfigurations
} from "@aws-sdk/client-emr";
import type {Emr} from "../../interfaces/emr.js";

export class EmrService implements Emr {

    #client: EMRClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: EMRClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new EMRClient(config);

    }

    async getClusters (): Promise<ClusterSummary[]> {

        const client = this.#client;
        const clusters: ClusterSummary[] = [];
        for await (const page of paginateListClusters(
            {client},
            {"ClusterStates": [
                "RUNNING",
                "WAITING",
                "STARTING",
                "BOOTSTRAPPING"
            ]}
        )) {

            if (page.Clusters !== undefined) {

                clusters.push(...page.Clusters);

            }

        }
        return clusters;

    }

    async getInstanceFleets (clusterId: string): Promise<InstanceFleet[]> {

        const client = this.#client;
        const fleets: InstanceFleet[] = [];
        for await (const page of paginateListInstanceFleets(
            {client},
            {"ClusterId": clusterId}
        )) {

            if (page.InstanceFleets !== undefined) {

                fleets.push(...page.InstanceFleets);

            }

        }
        return fleets;

    }

    async getInstanceGroups (clusterId: string): Promise<InstanceGroup[]> {

        const client = this.#client;
        const groups: InstanceGroup[] = [];
        for await (const page of paginateListInstanceGroups(
            {client},
            {"ClusterId": clusterId}
        )) {

            if (page.InstanceGroups !== undefined) {

                groups.push(...page.InstanceGroups);

            }

        }
        return groups;

    }

    async getSecurityConfigurations (): Promise<SecurityConfigurationSummary[]> {

        const client = this.#client;
        const configs: SecurityConfigurationSummary[] = [];
        for await (const page of paginateListSecurityConfigurations(
            {client},
            {}
        )) {

            if (page.SecurityConfigurations !== undefined) {

                configs.push(...page.SecurityConfigurations);

            }

        }
        return configs;

    }

}

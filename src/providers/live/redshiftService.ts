import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type Cluster,
    type ClusterSubnetGroup,
    RedshiftClient,
    type RedshiftClientConfig,
    paginateDescribeClusters,
    paginateDescribeClusterSubnetGroups
} from "@aws-sdk/client-redshift";
import type {Redshift} from "../../interfaces/redshift.js";

export class RedshiftService implements Redshift {

    #client: RedshiftClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: RedshiftClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new RedshiftClient(config);

    }

    async getClusters (): Promise<Cluster[]> {

        const client = this.#client;
        const clusters: Cluster[] = [];
        for await (const page of paginateDescribeClusters(
            {client},
            {}
        )) {

            if (page.Clusters !== undefined) {

                clusters.push(...page.Clusters);

            }

        }
        return clusters;

    }

    async getClusterSubnetGroups (): Promise<ClusterSubnetGroup[]> {

        const client = this.#client;
        const subnetGroups: ClusterSubnetGroup[] = [];
        for await (const page of paginateDescribeClusterSubnetGroups(
            {client},
            {}
        )) {

            if (page.ClusterSubnetGroups !== undefined) {

                subnetGroups.push(...page.ClusterSubnetGroups);

            }

        }
        return subnetGroups;

    }

}

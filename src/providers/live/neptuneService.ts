import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type DBCluster,
    type DBInstance,
    type DBSubnetGroup,
    NeptuneClient,
    type NeptuneClientConfig,
    paginateDescribeDBClusters,
    paginateDescribeDBInstances,
    paginateDescribeDBSubnetGroups
} from "@aws-sdk/client-neptune";
import type {Neptune} from "../../interfaces/neptune.js";

export class NeptuneService implements Neptune {

    #client: NeptuneClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: NeptuneClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new NeptuneClient(config);

    }

    async getDBClusters (): Promise<DBCluster[]> {

        const client = this.#client;
        const clusters: DBCluster[] = [];
        for await (const page of paginateDescribeDBClusters(
            {client},
            {}
        )) {

            if (page.DBClusters !== undefined) {

                clusters.push(...page.DBClusters);

            }

        }
        return clusters;

    }

    async getDBInstances (): Promise<DBInstance[]> {

        const client = this.#client;
        const instances: DBInstance[] = [];
        for await (const page of paginateDescribeDBInstances(
            {client},
            {}
        )) {

            if (page.DBInstances !== undefined) {

                instances.push(...page.DBInstances);

            }

        }
        return instances;

    }

    async getDBSubnetGroups (): Promise<DBSubnetGroup[]> {

        const client = this.#client;
        const subnetGroups: DBSubnetGroup[] = [];
        for await (const page of paginateDescribeDBSubnetGroups(
            {client},
            {}
        )) {

            if (page.DBSubnetGroups !== undefined) {

                subnetGroups.push(...page.DBSubnetGroups);

            }

        }
        return subnetGroups;

    }

}

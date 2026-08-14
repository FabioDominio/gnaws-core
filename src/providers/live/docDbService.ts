import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type DBCluster,
    type DBInstance,
    type DBSubnetGroup,
    DocDBClient,
    type DocDBClientConfig,
    paginateDescribeDBClusters,
    paginateDescribeDBInstances,
    paginateDescribeDBSubnetGroups
} from "@aws-sdk/client-docdb";
import type {DocDb} from "../../interfaces/docdb.js";

export class DocDbService implements DocDb {

    #client: DocDBClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: DocDBClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new DocDBClient(config);

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

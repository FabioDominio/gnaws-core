import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type DBInstance,
    type DBCluster,
    type DBProxy,
    type DBSubnetGroup,
    type DBProxyTargetGroup,
    RDSClient,
    type RDSClientConfig,
    paginateDescribeDBInstances,
    paginateDescribeDBClusters,
    paginateDescribeDBProxies,
    paginateDescribeDBSubnetGroups,
    paginateDescribeDBProxyTargetGroups
} from "@aws-sdk/client-rds";

/*
 *  Available but not yet implemented:
 *  paginateDescribeDBClusterEndpoints,
 *  paginateDescribeDBClusterParameterGroups,
 *  paginateDescribeDBClusterSnapshots,
 *  paginateDescribeDBInstanceAutomatedBackups,
 *  paginateDescribeDBParameterGroups,
 *  paginateDescribeDBSnapshots,
 *  paginateDescribeEventSubscriptions,
 *  paginateDescribeGlobalClusters,
 *  paginateDescribeOptionGroups,
 *  paginateDescribeReservedDBInstances,
 */
import type {Rds} from "../../interfaces/rds.js";

export class RdsService implements Rds {

    #client: RDSClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: RDSClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new RDSClient(config);

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

    async getDBProxies (): Promise<DBProxy[]> {

        const client = this.#client;
        const proxies: DBProxy[] = [];
        for await (const page of paginateDescribeDBProxies(
            {client},
            {}
        )) {

            if (page.DBProxies !== undefined) {

                proxies.push(...page.DBProxies);

            }

        }
        return proxies;

    }

    async getDBSubnetGroups (): Promise<DBSubnetGroup[]> {

        const client = this.#client;
        const groups: DBSubnetGroup[] = [];
        for await (const page of paginateDescribeDBSubnetGroups(
            {client},
            {}
        )) {

            if (page.DBSubnetGroups !== undefined) {

                groups.push(...page.DBSubnetGroups);

            }

        }
        return groups;

    }

    async getDBProxyTargetGroups (dbProxyName: string): Promise<DBProxyTargetGroup[]> {

        const client = this.#client;
        const groups: DBProxyTargetGroup[] = [];
        for await (const page of paginateDescribeDBProxyTargetGroups(
            {client},
            {"DBProxyName": dbProxyName}
        )) {

            if (page.TargetGroups !== undefined) {

                groups.push(...page.TargetGroups);

            }

        }
        return groups;

    }

}

import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type ReplicationInstance,
    type ReplicationSubnetGroup,
    type Endpoint,
    type ReplicationTask,
    type Connection,
    DatabaseMigrationServiceClient,
    type DatabaseMigrationServiceClientConfig,
    paginateDescribeReplicationInstances,
    paginateDescribeReplicationSubnetGroups,
    paginateDescribeEndpoints,
    paginateDescribeReplicationTasks,
    paginateDescribeConnections
} from "@aws-sdk/client-database-migration-service";
import type {Dms} from "../../interfaces/dms.js";

export class DmsService implements Dms {

    #client: DatabaseMigrationServiceClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: DatabaseMigrationServiceClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new DatabaseMigrationServiceClient(config);

    }

    async getReplicationInstances (): Promise<ReplicationInstance[]> {

        const client = this.#client;
        const items: ReplicationInstance[] = [];
        for await (const page of paginateDescribeReplicationInstances(
            {client},
            {}
        )) {

            if (page.ReplicationInstances !== undefined) {

                items.push(...page.ReplicationInstances);

            }

        }
        return items;

    }

    async getReplicationSubnetGroups (): Promise<ReplicationSubnetGroup[]> {

        const client = this.#client;
        const items: ReplicationSubnetGroup[] = [];
        for await (const page of paginateDescribeReplicationSubnetGroups(
            {client},
            {}
        )) {

            if (page.ReplicationSubnetGroups !== undefined) {

                items.push(...page.ReplicationSubnetGroups);

            }

        }
        return items;

    }

    async getEndpoints (): Promise<Endpoint[]> {

        const client = this.#client;
        const items: Endpoint[] = [];
        for await (const page of paginateDescribeEndpoints(
            {client},
            {}
        )) {

            if (page.Endpoints !== undefined) {

                items.push(...page.Endpoints);

            }

        }
        return items;

    }

    async getReplicationTasks (): Promise<ReplicationTask[]> {

        const client = this.#client;
        const items: ReplicationTask[] = [];
        for await (const page of paginateDescribeReplicationTasks(
            {client},
            {}
        )) {

            if (page.ReplicationTasks !== undefined) {

                items.push(...page.ReplicationTasks);

            }

        }
        return items;

    }

    async getConnections (): Promise<Connection[]> {

        const client = this.#client;
        const items: Connection[] = [];
        for await (const page of paginateDescribeConnections(
            {client},
            {}
        )) {

            if (page.Connections !== undefined) {

                items.push(...page.Connections);

            }

        }
        return items;

    }

}

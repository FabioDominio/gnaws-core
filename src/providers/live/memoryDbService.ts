import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type Cluster,
    type SubnetGroup,
    type ACL,
    type User,
    MemoryDBClient,
    type MemoryDBClientConfig,
    paginateDescribeClusters,
    paginateDescribeSubnetGroups,
    paginateDescribeACLs,
    paginateDescribeUsers
} from "@aws-sdk/client-memorydb";
import type {MemoryDb} from "../../interfaces/memorydb.js";

export class MemoryDbService implements MemoryDb {

    #client: MemoryDBClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: MemoryDBClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new MemoryDBClient(config);

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

    async getSubnetGroups (): Promise<SubnetGroup[]> {

        const client = this.#client;
        const subnetGroups: SubnetGroup[] = [];
        for await (const page of paginateDescribeSubnetGroups(
            {client},
            {}
        )) {

            if (page.SubnetGroups !== undefined) {

                subnetGroups.push(...page.SubnetGroups);

            }

        }
        return subnetGroups;

    }

    async getACLs (): Promise<ACL[]> {

        const client = this.#client;
        const acls: ACL[] = [];
        for await (const page of paginateDescribeACLs(
            {client},
            {}
        )) {

            if (page.ACLs !== undefined) {

                acls.push(...page.ACLs);

            }

        }
        return acls;

    }

    async getUsers (): Promise<User[]> {

        const client = this.#client;
        const users: User[] = [];
        for await (const page of paginateDescribeUsers(
            {client},
            {}
        )) {

            if (page.Users !== undefined) {

                users.push(...page.Users);

            }

        }
        return users;

    }

}

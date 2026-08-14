import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type AgentListEntry,
    type LocationListEntry,
    type DescribeTaskResponse,
    DataSyncClient,
    type DataSyncClientConfig,
    paginateListAgents,
    paginateListLocations,
    paginateListTasks,
    DescribeTaskCommand
} from "@aws-sdk/client-datasync";
import type {DataSync} from "../../interfaces/datasync.js";

export class DataSyncService implements DataSync {

    #client: DataSyncClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: DataSyncClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new DataSyncClient(config);

    }

    async getAgents (): Promise<AgentListEntry[]> {

        const client = this.#client;
        const items: AgentListEntry[] = [];
        for await (const page of paginateListAgents(
            {client},
            {}
        )) {

            if (page.Agents !== undefined) {

                items.push(...page.Agents);

            }

        }
        return items;

    }

    async getLocations (): Promise<LocationListEntry[]> {

        const client = this.#client;
        const items: LocationListEntry[] = [];
        for await (const page of paginateListLocations(
            {client},
            {}
        )) {

            if (page.Locations !== undefined) {

                items.push(...page.Locations);

            }

        }
        return items;

    }

    async getTasks (): Promise<DescribeTaskResponse[]> {

        const client = this.#client;
        const taskArns: string[] = [];
        for await (const page of paginateListTasks(
            {client},
            {}
        )) {

            for (const task of page.Tasks ?? []) {

                if (task.TaskArn) {

                    taskArns.push(task.TaskArn);

                }

            }

        }

        const tasks: DescribeTaskResponse[] = [];
        for (const arn of taskArns) {

            try {

                const response = await client.send(new DescribeTaskCommand({"TaskArn": arn}));
                tasks.push(response);

            } catch {

                // Task may have been deleted
            }

        }
        return tasks;

    }

}

import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type Connection,
    type Crawler,
    type Database,
    type Job,
    type Trigger,
    type Table,
    type RegistryListItem,
    type SchemaListItem,
    type Workflow,
    GlueClient,
    type GlueClientConfig,
    paginateGetConnections,
    paginateGetCrawlers,
    paginateGetDatabases,
    paginateGetJobs,
    paginateGetTriggers,
    paginateGetTables,
    paginateListRegistries,
    paginateListSchemas,
    paginateListWorkflows
} from "@aws-sdk/client-glue";
import type {Glue} from "../../interfaces/glue.js";

export class GlueService implements Glue {

    #client: GlueClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: GlueClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new GlueClient(config);

    }

    async getConnections (): Promise<Connection[]> {

        const client = this.#client;
        const items: Connection[] = [];
        for await (const page of paginateGetConnections(
            {client},
            {}
        )) {

            if (page.ConnectionList !== undefined) {

                items.push(...page.ConnectionList);

            }

        }
        return items;

    }

    async getCrawlers (): Promise<Crawler[]> {

        const client = this.#client;
        const items: Crawler[] = [];
        for await (const page of paginateGetCrawlers(
            {client},
            {}
        )) {

            if (page.Crawlers !== undefined) {

                items.push(...page.Crawlers);

            }

        }
        return items;

    }

    async getDatabases (): Promise<Database[]> {

        const client = this.#client;
        const items: Database[] = [];
        for await (const page of paginateGetDatabases(
            {client},
            {}
        )) {

            if (page.DatabaseList !== undefined) {

                items.push(...page.DatabaseList);

            }

        }
        return items;

    }

    async getJobs (): Promise<Job[]> {

        const client = this.#client;
        const items: Job[] = [];
        for await (const page of paginateGetJobs(
            {client},
            {}
        )) {

            if (page.Jobs !== undefined) {

                items.push(...page.Jobs);

            }

        }
        return items;

    }

    async getTriggers (): Promise<Trigger[]> {

        const client = this.#client;
        const items: Trigger[] = [];
        for await (const page of paginateGetTriggers(
            {client},
            {}
        )) {

            if (page.Triggers !== undefined) {

                items.push(...page.Triggers);

            }

        }
        return items;

    }

    async getTables (): Promise<Table[]> {

        const databases = await this.getDatabases();
        const client = this.#client;
        const items: Table[] = [];
        for (const db of databases) {

            if (!db.Name) {

                continue;

            }

            for await (const page of paginateGetTables(
                {client},
                {"DatabaseName": db.Name}
            )) {

                if (page.TableList !== undefined) {

                    items.push(...page.TableList);

                }

            }

        }
        return items;

    }

    async getRegistries (): Promise<RegistryListItem[]> {

        const client = this.#client;
        const items: RegistryListItem[] = [];
        for await (const page of paginateListRegistries(
            {client},
            {}
        )) {

            if (page.Registries !== undefined) {

                items.push(...page.Registries);

            }

        }
        return items;

    }

    async getSchemas (): Promise<SchemaListItem[]> {

        const client = this.#client;
        const items: SchemaListItem[] = [];
        for await (const page of paginateListSchemas(
            {client},
            {}
        )) {

            if (page.Schemas !== undefined) {

                items.push(...page.Schemas);

            }

        }
        return items;

    }

    async getWorkflows (): Promise<Workflow[]> {

        const client = this.#client;
        const names: string[] = [];
        for await (const page of paginateListWorkflows(
            {client},
            {}
        )) {

            if (page.Workflows !== undefined) {

                names.push(...page.Workflows);

            }

        }
        return names.map((name) => ({"Name": name}));

    }

}

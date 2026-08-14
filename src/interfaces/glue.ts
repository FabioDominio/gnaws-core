import type {Connection, Crawler, Database, Job, Trigger, Table, RegistryListItem, SchemaListItem, Workflow} from "@aws-sdk/client-glue";

export interface Glue {
    getConnections (): Promise<Connection[]>;
    getCrawlers (): Promise<Crawler[]>;
    getDatabases (): Promise<Database[]>;
    getJobs (): Promise<Job[]>;
    getTriggers (): Promise<Trigger[]>;
    getTables (): Promise<Table[]>;
    getRegistries (): Promise<RegistryListItem[]>;
    getSchemas (): Promise<SchemaListItem[]>;
    getWorkflows (): Promise<Workflow[]>;
}

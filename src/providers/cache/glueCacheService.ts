import type {Connection, Crawler, Database, Job, Trigger, Table, RegistryListItem, SchemaListItem, Workflow} from "@aws-sdk/client-glue";
import type {Glue} from "../../interfaces/glue.js";
import {readCacheFile} from "./cacheReader.js";

export class GlueCacheService implements Glue {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getConnections (): Promise<Connection[]> {

        return readCacheFile(
            this.#cacheDir,
            "glue_connections.json"
        );

    }

    async getCrawlers (): Promise<Crawler[]> {

        return readCacheFile(
            this.#cacheDir,
            "glue_crawlers.json"
        );

    }

    async getDatabases (): Promise<Database[]> {

        return readCacheFile(
            this.#cacheDir,
            "glue_databases.json"
        );

    }

    async getJobs (): Promise<Job[]> {

        return readCacheFile(
            this.#cacheDir,
            "glue_jobs.json"
        );

    }

    async getTriggers (): Promise<Trigger[]> {

        return readCacheFile(
            this.#cacheDir,
            "glue_triggers.json"
        );

    }

    async getTables (): Promise<Table[]> {

        return readCacheFile(
            this.#cacheDir,
            "glue_tables.json"
        );

    }

    async getRegistries (): Promise<RegistryListItem[]> {

        return readCacheFile(
            this.#cacheDir,
            "glue_registries.json"
        );

    }

    async getSchemas (): Promise<SchemaListItem[]> {

        return readCacheFile(
            this.#cacheDir,
            "glue_schemas.json"
        );

    }

    async getWorkflows (): Promise<Workflow[]> {

        return readCacheFile(
            this.#cacheDir,
            "glue_workflows.json"
        );

    }

}

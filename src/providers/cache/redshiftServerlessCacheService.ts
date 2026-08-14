import type {Namespace, Workgroup} from "@aws-sdk/client-redshift-serverless";
import type {RedshiftServerless} from "../../interfaces/redshiftserverless.js";
import {readCacheFile} from "./cacheReader.js";

export class RedshiftServerlessCacheService implements RedshiftServerless {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getNamespaces (): Promise<Namespace[]> {

        return readCacheFile(
            this.#cacheDir,
            "redshiftserverless_namespaces.json"
        );

    }

    async getWorkgroups (): Promise<Workgroup[]> {

        return readCacheFile(
            this.#cacheDir,
            "redshiftserverless_workgroups.json"
        );

    }

}

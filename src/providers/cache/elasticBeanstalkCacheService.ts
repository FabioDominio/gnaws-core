import type {ApplicationDescription, EnvironmentDescription} from "@aws-sdk/client-elastic-beanstalk";
import type {ElasticBeanstalk} from "../../interfaces/elasticbeanstalk.js";
import {readCacheFile} from "./cacheReader.js";

export class ElasticBeanstalkCacheService implements ElasticBeanstalk {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getApplications (): Promise<ApplicationDescription[]> {

        return readCacheFile(
            this.#cacheDir,
            "elasticbeanstalk_applications.json"
        );

    }

    async getEnvironments (): Promise<EnvironmentDescription[]> {

        return readCacheFile(
            this.#cacheDir,
            "elasticbeanstalk_environments.json"
        );

    }

}

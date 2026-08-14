import type {Service, VpcConnector} from "@aws-sdk/client-apprunner";
import type {AppRunner} from "../../interfaces/apprunner.js";
import {readCacheFile} from "./cacheReader.js";

export class AppRunnerCacheService implements AppRunner {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getServices (): Promise<Service[]> {

        return readCacheFile(
            this.#cacheDir,
            "apprunner_services.json"
        );

    }

    async getVpcConnectors (): Promise<VpcConnector[]> {

        return readCacheFile(
            this.#cacheDir,
            "apprunner_vpc_connectors.json"
        );

    }

}

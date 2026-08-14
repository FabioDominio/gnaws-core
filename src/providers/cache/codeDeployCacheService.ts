import type {DeploymentGroupInfo} from "@aws-sdk/client-codedeploy";
import type {CodeDeploy} from "../../interfaces/codedeploy.js";
import {readCacheFile} from "./cacheReader.js";

export class CodeDeployCacheService implements CodeDeploy {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getDeploymentGroups (): Promise<DeploymentGroupInfo[]> {

        return readCacheFile(
            this.#cacheDir,
            "codedeploy_deployment_groups.json"
        );

    }

}

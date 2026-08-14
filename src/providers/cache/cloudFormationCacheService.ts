import type {StackSummary, Export, StackSetSummary} from "@aws-sdk/client-cloudformation";
import type {CloudFormation, StackResourcesMap} from "../../interfaces/cloudformation.js";
import {readCacheFile, readCacheObject} from "./cacheReader.js";

export class CloudFormationCacheService implements CloudFormation {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getStacks (): Promise<StackSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "cloudformation_stacks.json"
        );

    }

    async getStackResources (_stackIds: string[]): Promise<StackResourcesMap> {

        return readCacheObject(
            this.#cacheDir,
            "cloudformation_stack_resources.json"
        );

    }

    async getExports (): Promise<Export[]> {

        return readCacheFile(
            this.#cacheDir,
            "cloudformation_exports.json"
        );

    }

    async getStackSets (): Promise<StackSetSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "cloudformation_stack_sets.json"
        );

    }

}

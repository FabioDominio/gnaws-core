import type {PipelineSummary} from "@aws-sdk/client-codepipeline";
import type {CodePipeline} from "../../interfaces/codepipeline.js";
import {readCacheFile} from "./cacheReader.js";

export class CodePipelineCacheService implements CodePipeline {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getPipelines (): Promise<PipelineSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "codepipeline_pipelines.json"
        );

    }

}

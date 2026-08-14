import type {Project} from "@aws-sdk/client-codebuild";
import type {CodeBuild} from "../../interfaces/codebuild.js";
import {readCacheFile} from "./cacheReader.js";

export class CodeBuildCacheService implements CodeBuild {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getProjects (): Promise<Project[]> {

        return readCacheFile(
            this.#cacheDir,
            "codebuild_projects.json"
        );

    }

}

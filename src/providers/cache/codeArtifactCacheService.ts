import type {DomainSummary, RepositorySummary} from "@aws-sdk/client-codeartifact";
import type {CodeArtifact} from "../../interfaces/codeartifact.js";
import {readCacheFile} from "./cacheReader.js";

export class CodeArtifactCacheService implements CodeArtifact {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getDomains (): Promise<DomainSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "codeartifact_domains.json"
        );

    }

    async getRepositories (): Promise<RepositorySummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "codeartifact_repositories.json"
        );

    }

}

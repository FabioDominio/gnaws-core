import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type DomainSummary,
    type RepositorySummary,
    CodeartifactClient,
    type CodeartifactClientConfig,
    paginateListDomains,
    paginateListRepositories
} from "@aws-sdk/client-codeartifact";
import type {CodeArtifact} from "../../interfaces/codeartifact.js";

export class CodeArtifactService implements CodeArtifact {

    #client: CodeartifactClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: CodeartifactClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new CodeartifactClient(config);

    }

    async getDomains (): Promise<DomainSummary[]> {

        const client = this.#client;
        const domains: DomainSummary[] = [];

        for await (const page of paginateListDomains(
            {client},
            {}
        )) {

            if (page.domains !== undefined) {

                domains.push(...page.domains);

            }

        }

        return domains;

    }

    async getRepositories (): Promise<RepositorySummary[]> {

        const client = this.#client;
        const repositories: RepositorySummary[] = [];

        for await (const page of paginateListRepositories(
            {client},
            {}
        )) {

            if (page.repositories !== undefined) {

                repositories.push(...page.repositories);

            }

        }

        return repositories;

    }

}

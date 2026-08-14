import type {DomainSummary, RepositorySummary} from "@aws-sdk/client-codeartifact";

export interface CodeArtifact {
    getDomains (): Promise<DomainSummary[]>;
    getRepositories (): Promise<RepositorySummary[]>;
}

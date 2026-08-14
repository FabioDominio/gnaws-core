import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    CodeartifactClient,
    ListDomainsCommand,
    ListRepositoriesCommand
} from "@aws-sdk/client-codeartifact";
import {CodeArtifactService} from "../../../../src/providers/live/codeArtifactService.js";

const caMock = mockClient(CodeartifactClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    caMock.reset();

});

describe(
    "CodeArtifactService",
    () => {

        describe(
            "getDomains",
            () => {

                it(
                    "returns domains",
                    async () => {

                        caMock.on(ListDomainsCommand).resolves({
                            "domains": [
                                {"name": "domain-1",
                                    "arn": "arn:aws:codeartifact:us-east-1:123:domain/domain-1"},
                                {"name": "domain-2",
                                    "arn": "arn:aws:codeartifact:us-east-1:123:domain/domain-2"}
                            ]
                        });

                        const service = new CodeArtifactService(
                            creds,
                            "us-east-1"
                        );
                        const domains = await service.getDomains();

                        expect(domains).toHaveLength(2);
                        expect(domains[0].name).toBe("domain-1");

                    }
                );

                it(
                    "returns empty when no domains",
                    async () => {

                        caMock.on(ListDomainsCommand).resolves({});

                        const service = new CodeArtifactService(
                            creds,
                            "us-east-1"
                        );
                        const domains = await service.getDomains();

                        expect(domains).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getRepositories",
            () => {

                it(
                    "returns repositories",
                    async () => {

                        caMock.on(ListRepositoriesCommand).resolves({
                            "repositories": [
                                {"name": "repo-1",
                                    "domainName": "domain-1",
                                    "arn": "arn:aws:codeartifact:us-east-1:123:repository/domain-1/repo-1"},
                                {"name": "repo-2",
                                    "domainName": "domain-1",
                                    "arn": "arn:aws:codeartifact:us-east-1:123:repository/domain-1/repo-2"}
                            ]
                        });

                        const service = new CodeArtifactService(
                            creds,
                            "us-east-1"
                        );
                        const repos = await service.getRepositories();

                        expect(repos).toHaveLength(2);
                        expect(repos[0].name).toBe("repo-1");

                    }
                );

                it(
                    "returns empty when no repositories",
                    async () => {

                        caMock.on(ListRepositoriesCommand).resolves({});

                        const service = new CodeArtifactService(
                            creds,
                            "us-east-1"
                        );
                        const repos = await service.getRepositories();

                        expect(repos).toHaveLength(0);

                    }
                );

            }
        );

    }
);

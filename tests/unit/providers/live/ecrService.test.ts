import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    ECRClient,
    DescribeRepositoriesCommand
} from "@aws-sdk/client-ecr";
import {EcrService} from "../../../../src/providers/live/ecrService.js";

const ecrMock = mockClient(ECRClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    ecrMock.reset();

});

describe(
    "EcrService",
    () => {

        describe(
            "getRepositories",
            () => {

                it(
                    "returns repositories",
                    async () => {

                        ecrMock.on(DescribeRepositoriesCommand).resolves({
                            "repositories": [
                                {"repositoryName": "repo-1",
                                    "repositoryArn": "arn:aws:ecr:us-east-1:123:repository/repo-1",
                                    "repositoryUri": "123.dkr.ecr.us-east-1.amazonaws.com/repo-1"},
                                {"repositoryName": "repo-2",
                                    "repositoryArn": "arn:aws:ecr:us-east-1:123:repository/repo-2",
                                    "repositoryUri": "123.dkr.ecr.us-east-1.amazonaws.com/repo-2"}
                            ]
                        });

                        const service = new EcrService(
                            creds,
                            "us-east-1"
                        );
                        const repos = await service.getRepositories();

                        expect(repos).toHaveLength(2);
                        expect(repos[0].repositoryName).toBe("repo-1");

                    }
                );

                it(
                    "aggregates across pages",
                    async () => {

                        ecrMock.on(DescribeRepositoriesCommand).
                            resolvesOnce({"repositories": [{"repositoryName": "r1"}],
                                "nextToken": "tok"}).
                            resolvesOnce({"repositories": [{"repositoryName": "r2"}]});

                        const service = new EcrService(
                            creds,
                            "us-east-1"
                        );
                        const repos = await service.getRepositories();

                        expect(repos).toHaveLength(2);

                    }
                );

                it(
                    "returns empty when no repositories",
                    async () => {

                        ecrMock.on(DescribeRepositoriesCommand).resolves({});

                        const service = new EcrService(
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

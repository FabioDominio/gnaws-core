import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type Project,
    CodeBuildClient,
    type CodeBuildClientConfig,
    paginateListProjects,
    BatchGetProjectsCommand
} from "@aws-sdk/client-codebuild";
import type {CodeBuild} from "../../interfaces/codebuild.js";

export class CodeBuildService implements CodeBuild {

    #client: CodeBuildClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: CodeBuildClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new CodeBuildClient(config);

    }

    async getProjects (): Promise<Project[]> {

        const client = this.#client;
        const projectNames: string[] = [];

        for await (const page of paginateListProjects(
            {client},
            {}
        )) {

            if (page.projects !== undefined) {

                projectNames.push(...page.projects);

            }

        }

        if (projectNames.length === 0) {

            return [];

        }

        const projects: Project[] = [];

        // BatchGetProjectsCommand accepts max 100 names per call
        for (let i = 0; i < projectNames.length; i += 100) {

            const batch = projectNames.slice(
                i,
                i + 100
            );

            const response = await this.#client.send(new BatchGetProjectsCommand({
                "names": batch
            }));

            if (response.projects !== undefined) {

                projects.push(...response.projects);

            }

        }

        return projects;

    }

}

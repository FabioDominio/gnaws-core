import type {Project} from "@aws-sdk/client-codebuild";

export interface CodeBuild {
    getProjects (): Promise<Project[]>;
}

import type {PipelineSummary} from "@aws-sdk/client-codepipeline";

export interface CodePipeline {
    getPipelines (): Promise<PipelineSummary[]>;
}

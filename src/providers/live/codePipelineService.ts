import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type PipelineSummary,
    CodePipelineClient,
    type CodePipelineClientConfig,
    paginateListPipelines
} from "@aws-sdk/client-codepipeline";
import type {CodePipeline} from "../../interfaces/codepipeline.js";

export class CodePipelineService implements CodePipeline {

    #client: CodePipelineClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: CodePipelineClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new CodePipelineClient(config);

    }

    async getPipelines (): Promise<PipelineSummary[]> {

        const client = this.#client;
        const pipelines: PipelineSummary[] = [];

        for await (const page of paginateListPipelines(
            {client},
            {}
        )) {

            if (page.pipelines !== undefined) {

                pipelines.push(...page.pipelines);

            }

        }

        return pipelines;

    }

}

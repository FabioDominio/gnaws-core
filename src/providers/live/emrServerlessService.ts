import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type ApplicationSummary,
    EMRServerlessClient,
    type EMRServerlessClientConfig,
    paginateListApplications
} from "@aws-sdk/client-emr-serverless";
import type {EmrServerless} from "../../interfaces/emrserverless.js";

export class EmrServerlessService implements EmrServerless {

    #client: EMRServerlessClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: EMRServerlessClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new EMRServerlessClient(config);

    }

    async getApplications (): Promise<ApplicationSummary[]> {

        const client = this.#client;
        const applications: ApplicationSummary[] = [];
        for await (const page of paginateListApplications(
            {client},
            {}
        )) {

            if (page.applications !== undefined) {

                applications.push(...page.applications);

            }

        }
        return applications;

    }

}

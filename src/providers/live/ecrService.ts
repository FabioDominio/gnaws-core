import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type Repository,
    ECRClient,
    type ECRClientConfig,
    paginateDescribeRepositories
} from "@aws-sdk/client-ecr";
import type {Ecr} from "../../interfaces/ecr.js";

export class EcrService implements Ecr {

    #client: ECRClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: ECRClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new ECRClient(config);

    }

    async getRepositories (): Promise<Repository[]> {

        const client = this.#client;
        const repositories: Repository[] = [];
        for await (const page of paginateDescribeRepositories(
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

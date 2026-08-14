import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type Environment,
    MWAAClient,
    type MWAAClientConfig,
    paginateListEnvironments,
    GetEnvironmentCommand
} from "@aws-sdk/client-mwaa";
import type {Mwaa} from "../../interfaces/mwaa.js";

export class MwaaService implements Mwaa {

    #client: MWAAClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: MWAAClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new MWAAClient(config);

    }

    async getEnvironments (): Promise<Environment[]> {

        const client = this.#client;
        const names: string[] = [];
        for await (const page of paginateListEnvironments(
            {client},
            {}
        )) {

            if (page.Environments !== undefined) {

                names.push(...page.Environments);

            }

        }

        const environments: Environment[] = [];
        for (const name of names) {

            try {

                const response = await client.send(new GetEnvironmentCommand({"Name": name}));
                if (response.Environment) {

                    environments.push(response.Environment);

                }

            } catch {

                // Environment may have been deleted
            }

        }
        return environments;

    }

}

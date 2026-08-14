import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {type Pipe, PipesClient, paginateListPipes} from "@aws-sdk/client-pipes";
import type {Pipes} from "../../interfaces/pipes.js";

export class PipesService implements Pipes {

    #client: PipesClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        this.#client = new PipesClient({region,
            credentials,
            "maxAttempts": 5,
            logger});

    }

    async getPipes (): Promise<Pipe[]> {

        const client = this.#client;
        const items: Pipe[] = [];
        for await (const page of paginateListPipes(
            {client},
            {}
        )) {

            if (page.Pipes !== undefined) {

                items.push(...page.Pipes);

            }

        }
        return items;

    }

}

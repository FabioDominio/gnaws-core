import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {type DescribeNotebookInstanceOutput, SageMakerClient, paginateListNotebookInstances, DescribeNotebookInstanceCommand} from "@aws-sdk/client-sagemaker";
import type {SageMaker} from "../../interfaces/sagemaker.js";
export class SageMakerService implements SageMaker {

    #client: SageMakerClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        this.#client = new SageMakerClient({region,
            credentials,
            "maxAttempts": 5,
            logger});

    }

    async getNotebookInstances (): Promise<DescribeNotebookInstanceOutput[]> {

        const client = this.#client;
        const names: string[] = [];
        for await (const page of paginateListNotebookInstances(
            {client},
            {}
        )) {

            for (const nb of page.NotebookInstances ?? []) {

                if (nb.NotebookInstanceName) names.push(nb.NotebookInstanceName);

            }

        }
        const items: DescribeNotebookInstanceOutput[] = [];
        for (const name of names) {

            try {

                const r = await client.send(new DescribeNotebookInstanceCommand({"NotebookInstanceName": name}));
                items.push(r);

            } catch { /* deleted */ }

        }
        return items;

    }

}

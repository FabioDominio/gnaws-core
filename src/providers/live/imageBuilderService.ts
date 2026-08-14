import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {type InfrastructureConfiguration, ImagebuilderClient, paginateListInfrastructureConfigurations, GetInfrastructureConfigurationCommand} from "@aws-sdk/client-imagebuilder";
import type {ImageBuilder} from "../../interfaces/imagebuilder.js";
export class ImageBuilderService implements ImageBuilder {

    #client: ImagebuilderClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        this.#client = new ImagebuilderClient({region,
            credentials,
            "maxAttempts": 5,
            logger});

    }

    async getInfrastructureConfigurations (): Promise<InfrastructureConfiguration[]> {

        const client = this.#client;
        const arns: string[] = [];
        for await (const page of paginateListInfrastructureConfigurations(
            {client},
            {}
        )) {

            for (const s of page.infrastructureConfigurationSummaryList ?? []) {

                if (s.arn) arns.push(s.arn);

            }

        }
        const items: InfrastructureConfiguration[] = [];
        for (const arn of arns) {

            try {

                const r = await client.send(new GetInfrastructureConfigurationCommand({"infrastructureConfigurationArn": arn}));
                if (r.infrastructureConfiguration) items.push(r.infrastructureConfiguration);

            } catch { /* deleted */ }

        }
        return items;

    }

}

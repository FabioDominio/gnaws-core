import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type DescribeVaultOutput,
    GlacierClient,
    type GlacierClientConfig,
    paginateListVaults
} from "@aws-sdk/client-glacier";
import type {Glacier} from "../../interfaces/glacier.js";

export class GlacierService implements Glacier {

    #client: GlacierClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: GlacierClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new GlacierClient(config);

    }

    async getVaults (): Promise<DescribeVaultOutput[]> {

        const client = this.#client;
        const vaults: DescribeVaultOutput[] = [];

        for await (const page of paginateListVaults(
            {client},
            {"accountId": "-"}
        )) {

            if (page.VaultList !== undefined) {

                vaults.push(...page.VaultList);

            }

        }

        return vaults;

    }

}

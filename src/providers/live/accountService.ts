import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {AccountClient, type AccountClientConfig, type Region, paginateListRegions}
    from "@aws-sdk/client-account";
import type {Account} from "../../interfaces/account.js";

/**
 * Account
 */
export class AccountService implements Account {

    #accountClient: AccountClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, logger?: SdkLogger) {

        const accountClientConfig: AccountClientConfig = {
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#accountClient = new AccountClient(accountClientConfig);

    }

    /**
     * Get the list of regions
     * @return {Region[]} the list of regions
     */
    async getRegions (): Promise<Region[]> {

        const client = this.#accountClient;
        const regions = [];
        for await (const page of paginateListRegions(
            {client},
            {}
        )) {

            if (page.Regions !== undefined) {

                regions.push(...page.Regions);

            }

        }
        return regions;

    }

}

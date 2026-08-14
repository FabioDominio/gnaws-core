import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type WorkGroup,
    type DataCatalogSummary,
    AthenaClient,
    type AthenaClientConfig,
    paginateListWorkGroups,
    paginateListDataCatalogs,
    GetWorkGroupCommand
} from "@aws-sdk/client-athena";
import type {Athena} from "../../interfaces/athena.js";

export class AthenaService implements Athena {

    #client: AthenaClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: AthenaClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new AthenaClient(config);

    }

    async getWorkGroups (): Promise<WorkGroup[]> {

        const client = this.#client;
        const names: string[] = [];
        for await (const page of paginateListWorkGroups(
            {client},
            {}
        )) {

            for (const wg of page.WorkGroups ?? []) {

                if (wg.Name) {

                    names.push(wg.Name);

                }

            }

        }

        const workGroups: WorkGroup[] = [];
        for (const name of names) {

            const response = await client.send(new GetWorkGroupCommand({"WorkGroup": name}));

            if (response.WorkGroup) {

                workGroups.push(response.WorkGroup);

            }

        }
        return workGroups;

    }

    async getDataCatalogs (): Promise<DataCatalogSummary[]> {

        const client = this.#client;
        const catalogs: DataCatalogSummary[] = [];
        for await (const page of paginateListDataCatalogs(
            {client},
            {}
        )) {

            if (page.DataCatalogsSummary !== undefined) {

                catalogs.push(...page.DataCatalogsSummary);

            }

        }
        return catalogs;

    }

}

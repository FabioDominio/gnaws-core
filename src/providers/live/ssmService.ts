import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type ParameterMetadata,
    type InstanceInformation,
    type MaintenanceWindowIdentity,
    type DocumentIdentifier,
    type Association,
    type PatchBaselineIdentity,
    SSMClient,
    type SSMClientConfig,
    paginateDescribeParameters,
    paginateDescribeInstanceInformation,
    paginateDescribeMaintenanceWindows,
    paginateListDocuments,
    paginateListAssociations,
    paginateDescribePatchBaselines
} from "@aws-sdk/client-ssm";
import type {Ssm} from "../../interfaces/ssm.js";

export class SsmService implements Ssm {

    #client: SSMClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: SSMClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new SSMClient(config);

    }

    async getParameters (): Promise<ParameterMetadata[]> {

        const client = this.#client;
        const results: ParameterMetadata[] = [];

        for await (const page of paginateDescribeParameters(
            {client},
            {}
        )) {

            if (page.Parameters !== undefined) {

                results.push(...page.Parameters);

            }

        }

        return results;

    }

    async getManagedInstances (): Promise<InstanceInformation[]> {

        const client = this.#client;
        const results: InstanceInformation[] = [];

        for await (const page of paginateDescribeInstanceInformation(
            {client},
            {}
        )) {

            if (page.InstanceInformationList !== undefined) {

                results.push(...page.InstanceInformationList);

            }

        }

        return results;

    }

    async getMaintenanceWindows (): Promise<MaintenanceWindowIdentity[]> {

        const client = this.#client;
        const results: MaintenanceWindowIdentity[] = [];

        for await (const page of paginateDescribeMaintenanceWindows(
            {client},
            {}
        )) {

            if (page.WindowIdentities !== undefined) {

                results.push(...page.WindowIdentities);

            }

        }

        return results;

    }

    async getDocuments (): Promise<DocumentIdentifier[]> {

        const client = this.#client;
        const results: DocumentIdentifier[] = [];

        for await (const page of paginateListDocuments(
            {client},
            {"Filters": [
                {"Key": "Owner",
                    "Values": ["Self"]}
            ]}
        )) {

            if (page.DocumentIdentifiers !== undefined) {

                results.push(...page.DocumentIdentifiers);

            }

        }

        return results;

    }

    async getAssociations (): Promise<Association[]> {

        const client = this.#client;
        const results: Association[] = [];

        for await (const page of paginateListAssociations(
            {client},
            {}
        )) {

            if (page.Associations !== undefined) {

                results.push(...page.Associations);

            }

        }

        return results;

    }

    async getPatchBaselines (): Promise<PatchBaselineIdentity[]> {

        const client = this.#client;
        const results: PatchBaselineIdentity[] = [];

        for await (const page of paginateDescribePatchBaselines(
            {client},
            {"Filters": [
                {"Key": "OWNER",
                    "Values": ["Self"]}
            ]}
        )) {

            if (page.BaselineIdentities !== undefined) {

                results.push(...page.BaselineIdentities);

            }

        }

        return results;

    }

}

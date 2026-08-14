import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type StackSummary,
    type StackResourceSummary,
    type Export,
    type StackSetSummary,
    CloudFormationClient,
    type CloudFormationClientConfig,
    paginateListStacks,
    paginateListStackResources,
    paginateListExports,
    paginateListStackSets,
    StackStatus
} from "@aws-sdk/client-cloudformation";
import type {CloudFormation, StackResourcesMap} from "../../interfaces/cloudformation.js";

const ACTIVE_STATUSES: StackStatus[] = [
    StackStatus.CREATE_COMPLETE,
    StackStatus.UPDATE_COMPLETE,
    StackStatus.UPDATE_ROLLBACK_COMPLETE,
    StackStatus.IMPORT_COMPLETE,
    StackStatus.ROLLBACK_COMPLETE
];

export class CloudFormationService implements CloudFormation {

    #client: CloudFormationClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: CloudFormationClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new CloudFormationClient(config);

    }

    async getStacks (): Promise<StackSummary[]> {

        const client = this.#client;
        const results: StackSummary[] = [];

        for await (const page of paginateListStacks(
            {client},
            {"StackStatusFilter": ACTIVE_STATUSES}
        )) {

            if (page.StackSummaries !== undefined) {

                results.push(...page.StackSummaries);

            }

        }

        return results;

    }

    async getStackResources (stackIds: string[]): Promise<StackResourcesMap> {

        const client = this.#client;
        const result: StackResourcesMap = {};

        for (const stackId of stackIds) {

            const resources: StackResourceSummary[] = [];

            for await (const page of paginateListStackResources(
                {client},
                {"StackName": stackId}
            )) {

                if (page.StackResourceSummaries !== undefined) {

                    resources.push(...page.StackResourceSummaries);

                }

            }

            result[stackId] = resources;

        }

        return result;

    }

    async getExports (): Promise<Export[]> {

        const client = this.#client;
        const results: Export[] = [];

        for await (const page of paginateListExports(
            {client},
            {}
        )) {

            if (page.Exports !== undefined) {

                results.push(...page.Exports);

            }

        }

        return results;

    }

    async getStackSets (): Promise<StackSetSummary[]> {

        const client = this.#client;
        const results: StackSetSummary[] = [];

        for await (const page of paginateListStackSets(
            {client},
            {"Status": "ACTIVE"}
        )) {

            if (page.Summaries !== undefined) {

                results.push(...page.Summaries);

            }

        }

        return results;

    }

}

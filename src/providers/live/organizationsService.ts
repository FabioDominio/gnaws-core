import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type Account,
    type OrganizationalUnit,
    type PolicySummary,
    type PolicyType,
    OrganizationsClient,
    type OrganizationsClientConfig,
    type Root,
    paginateListRoots,
    paginateListOrganizationalUnitsForParent,
    paginateListAccounts,
    paginateListPolicies
} from "@aws-sdk/client-organizations";
import type {Organizations} from "../../interfaces/organizations.js";

const POLICY_TYPES: PolicyType[] = [
    "SERVICE_CONTROL_POLICY",
    "TAG_POLICY",
    "BACKUP_POLICY",
    "RESOURCE_CONTROL_POLICY"
];

export class OrganizationsService implements Organizations {

    #client: OrganizationsClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, logger?: SdkLogger) {

        const config: OrganizationsClientConfig = {
            "region": "us-east-1",
            credentials,
            "maxAttempts": 5,
            logger
        };

        this.#client = new OrganizationsClient(config);

    }

    async getRoots (): Promise<Root[]> {

        const client = this.#client;
        const roots: Root[] = [];

        for await (const page of paginateListRoots(
            {client},
            {}
        )) {

            if (page.Roots !== undefined) {

                roots.push(...page.Roots);

            }

        }

        return roots;

    }

    async getOrganizationalUnits (parentId: string): Promise<OrganizationalUnit[]> {

        const client = this.#client;
        const ous: OrganizationalUnit[] = [];

        for await (const page of paginateListOrganizationalUnitsForParent(
            {client},
            {"ParentId": parentId}
        )) {

            if (page.OrganizationalUnits !== undefined) {

                ous.push(...page.OrganizationalUnits);

            }

        }

        return ous;

    }

    async getAccounts (): Promise<Account[]> {

        const client = this.#client;
        const accounts: Account[] = [];

        for await (const page of paginateListAccounts(
            {client},
            {}
        )) {

            if (page.Accounts !== undefined) {

                accounts.push(...page.Accounts);

            }

        }

        return accounts;

    }

    async getPolicies (): Promise<PolicySummary[]> {

        const client = this.#client;
        const policies: PolicySummary[] = [];

        for (const policyType of POLICY_TYPES) {

            try {

                for await (const page of paginateListPolicies(
                    {client},
                    {"Filter": policyType}
                )) {

                    if (page.Policies !== undefined) {

                        policies.push(...page.Policies);

                    }

                }

            } catch {

                // Policy type may not be enabled in this organization — skip silently

            }

        }

        return policies;

    }

}

import type {Account, OrganizationalUnit, PolicySummary, Root} from "@aws-sdk/client-organizations";

export interface Organizations {
    getRoots (): Promise<Root[]>;
    getOrganizationalUnits (parentId: string): Promise<OrganizationalUnit[]>;
    getAccounts (): Promise<Account[]>;
    getPolicies (): Promise<PolicySummary[]>;
}

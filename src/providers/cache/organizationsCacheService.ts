import type {Account, OrganizationalUnit, PolicySummary, Root} from "@aws-sdk/client-organizations";
import type {Organizations} from "../../interfaces/organizations.js";
import {readCacheFile} from "./cacheReader.js";

export class OrganizationsCacheService implements Organizations {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getRoots (): Promise<Root[]> {

        return readCacheFile(
            this.#cacheDir,
            "organizations_roots.json"
        );

    }

    async getOrganizationalUnits (_parentId: string): Promise<OrganizationalUnit[]> {

        return []; // Cannot recurse in cache mode
        /*
         * return readCacheFile(
         * this.#cacheDir,
         * "organizations_ous.json"
         * );
         */

    }

    async getAccounts (): Promise<Account[]> {

        return readCacheFile(
            this.#cacheDir,
            "organizations_accounts.json"
        );

    }

    async getPolicies (): Promise<PolicySummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "organizations_policies.json"
        );

    }

}

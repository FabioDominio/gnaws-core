import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {type Namespace, type Workgroup, RedshiftServerlessClient, paginateListNamespaces, paginateListWorkgroups} from "@aws-sdk/client-redshift-serverless";
import type {RedshiftServerless} from "../../interfaces/redshiftserverless.js";

export class RedshiftServerlessService implements RedshiftServerless {

    #client: RedshiftServerlessClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        this.#client = new RedshiftServerlessClient({region,
            credentials,
            "maxAttempts": 5,
            logger});

    }

    async getNamespaces (): Promise<Namespace[]> {

        const client = this.#client; const items: Namespace[] = [];
        for await (const page of paginateListNamespaces(
            {client},
            {}
        )) {

            if (page.namespaces) items.push(...page.namespaces);

        }
        return items;

    }

    async getWorkgroups (): Promise<Workgroup[]> {

        const client = this.#client; const items: Workgroup[] = [];
        for await (const page of paginateListWorkgroups(
            {client},
            {}
        )) {

            if (page.workgroups) items.push(...page.workgroups);

        }
        return items;

    }

}

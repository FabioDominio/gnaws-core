import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {type Outpost, type Site, OutpostsClient, paginateListOutposts, paginateListSites} from "@aws-sdk/client-outposts";
import type {Outposts} from "../../interfaces/outposts.js";
export class OutpostsService implements Outposts {

    #client: OutpostsClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        this.#client = new OutpostsClient({region,
            credentials,
            "maxAttempts": 5,
            logger});

    }

    async getOutposts (): Promise<Outpost[]> {

        const client = this.#client; const items: Outpost[] = [];
        for await (const page of paginateListOutposts(
            {client},
            {}
        )) {

            if (page.Outposts) items.push(...page.Outposts);

        }
        return items;

    }

    async getSites (): Promise<Site[]> {

        const client = this.#client; const items: Site[] = [];
        for await (const page of paginateListSites(
            {client},
            {}
        )) {

            if (page.Sites) items.push(...page.Sites);

        }
        return items;

    }

}

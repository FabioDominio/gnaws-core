import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type KeyListEntry,
    type AliasListEntry,
    type Tag,
    KMSClient,
    type KMSClientConfig,
    paginateListKeys,
    paginateListAliases,
    paginateListResourceTags
} from "@aws-sdk/client-kms";

/*
 *  Available but not yet implemented:
 *  paginateDescribeCustomKeyStores,
 *  paginateListGrants,
 *  paginateListKeyPolicies,
 *  paginateListKeyRotations,
 *  paginateListRetirableGrants,
 */
import type {Kms} from "../../interfaces/kms.js";

export class KmsService implements Kms {

    #client: KMSClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: KMSClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new KMSClient(config);

    }

    async getKeys (): Promise<KeyListEntry[]> {

        const client = this.#client;
        const keys: KeyListEntry[] = [];
        for await (const page of paginateListKeys(
            {client},
            {}
        )) {

            if (page.Keys !== undefined) {

                keys.push(...page.Keys);

            }

        }
        return keys;

    }

    async getAliases (): Promise<AliasListEntry[]> {

        const client = this.#client;
        const aliases: AliasListEntry[] = [];
        for await (const page of paginateListAliases(
            {client},
            {}
        )) {

            if (page.Aliases !== undefined) {

                aliases.push(...page.Aliases);

            }

        }
        return aliases;

    }

    async getTagsForKey (keyId: string): Promise<Tag[]> {

        const client = this.#client;
        const tags: Tag[] = [];
        try {

            for await (const page of paginateListResourceTags(
                {client},
                {"KeyId": keyId}
            )) {

                if (page.Tags !== undefined) {

                    tags.push(...page.Tags);

                }

            }

        } catch {

            // Key may not be accessible or permission denied
        }
        return tags;

    }

}

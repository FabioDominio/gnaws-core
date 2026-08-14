import type {KeyListEntry, AliasListEntry, Tag} from "@aws-sdk/client-kms";

export interface Kms {
    getKeys (): Promise<KeyListEntry[]>;
    getAliases (): Promise<AliasListEntry[]>;
    getTagsForKey (keyId: string): Promise<Tag[]>;
}

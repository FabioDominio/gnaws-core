import type {KeyListEntry, AliasListEntry, Tag} from "@aws-sdk/client-kms";
import type {Kms} from "../../interfaces/kms.js";
import {readCacheFile} from "./cacheReader.js";

export class KmsCacheService implements Kms {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getKeys (): Promise<KeyListEntry[]> {

        return readCacheFile(
            this.#cacheDir,
            "kms_keys.json"
        );

    }

    async getAliases (): Promise<AliasListEntry[]> {

        return readCacheFile(
            this.#cacheDir,
            "kms_aliases.json"
        );

    }

    async getTagsForKey (_keyId: string): Promise<Tag[]> {

        return [];

    }

}

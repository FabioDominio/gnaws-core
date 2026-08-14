import type {WebACLSummary} from "@aws-sdk/client-wafv2";
import type {Waf} from "../../interfaces/waf.js";
import {readCacheFile} from "./cacheReader.js";

export class WafCacheService implements Waf {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getWebAcls (): Promise<WebACLSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "waf_web_acls.json"
        );

    }

    async getResourceAssociations (_webAclArn: string): Promise<string[]> {

        return [];

    }

}

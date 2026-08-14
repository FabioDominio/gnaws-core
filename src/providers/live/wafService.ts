import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type WebACLSummary,
    WAFV2Client,
    type WAFV2ClientConfig,
    ListWebACLsCommand,
    ListResourcesForWebACLCommand
} from "@aws-sdk/client-wafv2";
import type {Waf} from "../../interfaces/waf.js";

export class WafService implements Waf {

    #client: WAFV2Client;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: WAFV2ClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new WAFV2Client(config);

    }

    async getWebAcls (): Promise<WebACLSummary[]> {

        const webAcls: WebACLSummary[] = [];

        const response = await this.#client.send(new ListWebACLsCommand({"Scope": "REGIONAL"}));

        if (response.WebACLs !== undefined) {

            webAcls.push(...response.WebACLs);

        }

        return webAcls;

    }

    async getResourceAssociations (webAclArn: string): Promise<string[]> {

        const response = await this.#client.send(new ListResourcesForWebACLCommand({"WebACLArn": webAclArn}));

        return response.ResourceArns ?? [];

    }

}

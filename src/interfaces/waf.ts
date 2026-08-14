import type {WebACLSummary} from "@aws-sdk/client-wafv2";

export interface WafResourceAssociation {
    "webAclArn": string;
    "resourceArn": string;
}

export interface Waf {
    getWebAcls (): Promise<WebACLSummary[]>;
    getResourceAssociations (webAclArn: string): Promise<string[]>;
}

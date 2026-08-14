import type {Flow} from "@aws-sdk/client-mediaconnect";
export interface MediaConnect {
    getFlows (): Promise<Flow[]>;
}

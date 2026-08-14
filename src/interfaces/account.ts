import type {Region} from "@aws-sdk/client-account";

export interface Account {
    getRegions(): Promise<Region[]>;
}

import type {Environment} from "@aws-sdk/client-mwaa";

export interface Mwaa {
    getEnvironments (): Promise<Environment[]>;
}

import type {Pipe} from "@aws-sdk/client-pipes";

export interface Pipes {
    getPipes (): Promise<Pipe[]>;
}

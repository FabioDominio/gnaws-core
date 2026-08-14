import type {StreamSummary} from "@aws-sdk/client-kinesis";

export interface Kinesis {
    getStreams (): Promise<StreamSummary[]>;
}

import type {Block} from "@aws-sdk/client-ebs";

export interface SnapshotBlocks {
    "snapshotId": string;
    "blocks": Block[];
}

export interface Ebs {
    getSnapshotBlocks (snapshotId: string): Promise<Block[]>;
}

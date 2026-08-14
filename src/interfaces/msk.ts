import type {ClusterInfo} from "@aws-sdk/client-kafka";

export interface Msk {
    getClusters (): Promise<ClusterInfo[]>;
}

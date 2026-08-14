import type {Cluster as HsmCluster} from "@aws-sdk/client-cloudhsm-v2";

export interface CloudHsm {
    getClusters (): Promise<HsmCluster[]>;
}

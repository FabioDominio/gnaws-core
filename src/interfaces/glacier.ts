import type {DescribeVaultOutput} from "@aws-sdk/client-glacier";

export interface Glacier {
    getVaults (): Promise<DescribeVaultOutput[]>;
}

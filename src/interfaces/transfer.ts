import type {DescribedServer} from "@aws-sdk/client-transfer";

export interface Transfer {
    getServers (): Promise<DescribedServer[]>;
}

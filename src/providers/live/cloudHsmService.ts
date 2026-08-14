import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {type Cluster, CloudHSMV2Client, paginateDescribeClusters} from "@aws-sdk/client-cloudhsm-v2";
import type {CloudHsm} from "../../interfaces/cloudhsm.js";

export class CloudHsmService implements CloudHsm {

    #client: CloudHSMV2Client;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        this.#client = new CloudHSMV2Client({region,
            credentials,
            "maxAttempts": 5,
            logger});

    }

    async getClusters (): Promise<Cluster[]> {

        const client = this.#client; const items: Cluster[] = [];
        for await (const page of paginateDescribeClusters(
            {client},
            {}
        )) {

            if (page.Clusters) items.push(...page.Clusters);

        }
        return items;

    }

}

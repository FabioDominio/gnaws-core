import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type Block,
    EBSClient,
    type EBSClientConfig,
    paginateListSnapshotBlocks
} from "@aws-sdk/client-ebs";
import type {Ebs} from "../../interfaces/ebs.js";

export class EbsService implements Ebs {

    #client: EBSClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: EBSClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new EBSClient(config);

    }

    async getSnapshotBlocks (snapshotId: string): Promise<Block[]> {

        const client = this.#client;
        const blocks: Block[] = [];
        for await (const page of paginateListSnapshotBlocks(
            {client},
            {"SnapshotId": snapshotId}
        )) {

            if (page.Blocks !== undefined) {

                blocks.push(...page.Blocks);

            }

        }
        return blocks;

    }

}

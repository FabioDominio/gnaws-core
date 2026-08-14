import type {Block} from "@aws-sdk/client-ebs";
import type {Ebs} from "../../interfaces/ebs.js";

export class EbsCacheService implements Ebs {

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor (_cacheDir: string) {

    }

    async getSnapshotBlocks (_snapshotId: string): Promise<Block[]> {

        return [];

    }

}

import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type FileSystem,
    FSxClient,
    type FSxClientConfig,
    paginateDescribeFileSystems
} from "@aws-sdk/client-fsx";
import type {Fsx} from "../../interfaces/fsx.js";

export class FsxService implements Fsx {

    #client: FSxClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: FSxClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new FSxClient(config);

    }

    async getFileSystems (): Promise<FileSystem[]> {

        const client = this.#client;
        const fileSystems: FileSystem[] = [];
        for await (const page of paginateDescribeFileSystems(
            {client},
            {}
        )) {

            if (page.FileSystems !== undefined) {

                fileSystems.push(...page.FileSystems);

            }

        }
        return fileSystems;

    }

}

import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {type DirectoryDescription, DirectoryServiceClient, paginateDescribeDirectories} from "@aws-sdk/client-directory-service";
import type {DirectoryService} from "../../interfaces/directoryservice.js";

export class DirectoryServiceService implements DirectoryService {

    #client: DirectoryServiceClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        this.#client = new DirectoryServiceClient({region,
            credentials,
            "maxAttempts": 5,
            logger});

    }

    async getDirectories (): Promise<DirectoryDescription[]> {

        const client = this.#client; const items: DirectoryDescription[] = [];
        for await (const page of paginateDescribeDirectories(
            {client},
            {}
        )) {

            if (page.DirectoryDescriptions) items.push(...page.DirectoryDescriptions);

        }
        return items;

    }

}

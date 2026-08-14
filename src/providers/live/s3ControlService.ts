import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {type AccessPoint, S3ControlClient, paginateListAccessPoints} from "@aws-sdk/client-s3-control";
import type {S3Control} from "../../interfaces/s3control.js";

export class S3ControlService implements S3Control {

    #client: S3ControlClient;

    #accountId: string;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, accountId: string, logger?: SdkLogger) {

        this.#client = new S3ControlClient({region,
            credentials,
            "maxAttempts": 5,
            logger});
        this.#accountId = accountId;

    }

    async getAccessPoints (): Promise<AccessPoint[]> {

        if (!this.#accountId) {

            return [];

        }
        const client = this.#client;
        const items: AccessPoint[] = [];
        for await (const page of paginateListAccessPoints(
            {client},
            {"AccountId": this.#accountId}
        )) {

            if (page.AccessPointList) {

                items.push(...page.AccessPointList);

            }

        }
        return items;

    }

}

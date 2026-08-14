import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type StateMachineListItem,
    SFNClient,
    type SFNClientConfig,
    DescribeStateMachineCommand,
    paginateListStateMachines
} from "@aws-sdk/client-sfn";
import type {Sfn, StateMachineInfo} from "../../interfaces/sfn.js";

export class SfnService implements Sfn {

    #client: SFNClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: SFNClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new SFNClient(config);

    }

    async getStateMachines (): Promise<StateMachineInfo[]> {

        const client = this.#client;
        const items: StateMachineListItem[] = [];

        for await (const page of paginateListStateMachines(
            {client},
            {}
        )) {

            if (page.stateMachines !== undefined) {

                items.push(...page.stateMachines);

            }

        }

        const stateMachines: StateMachineInfo[] = [];

        for (const item of items) {

            if (!item.stateMachineArn || !item.name || !item.type) {

                continue;

            }

            const response = await client.send(new DescribeStateMachineCommand({
                "stateMachineArn": item.stateMachineArn
            }));

            stateMachines.push({
                "stateMachineArn": item.stateMachineArn,
                "name": item.name,
                "type": item.type,
                "roleArn": response.roleArn
            });

        }

        return stateMachines;

    }

}

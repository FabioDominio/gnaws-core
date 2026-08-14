import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {type Flow, MediaConnectClient, paginateListFlows, DescribeFlowCommand} from "@aws-sdk/client-mediaconnect";
import type {MediaConnect} from "../../interfaces/mediaconnect.js";
export class MediaConnectService implements MediaConnect {

    #client: MediaConnectClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        this.#client = new MediaConnectClient({region,
            credentials,
            "maxAttempts": 5,
            logger});

    }

    async getFlows (): Promise<Flow[]> {

        const client = this.#client;
        const arns: string[] = [];
        for await (const page of paginateListFlows(
            {client},
            {}
        )) {

            for (const f of page.Flows ?? []) {

                if (f.FlowArn) arns.push(f.FlowArn);

            }

        }
        const flows: Flow[] = [];
        for (const arn of arns) {

            try {

                const r = await client.send(new DescribeFlowCommand({"FlowArn": arn}));
                if (r.Flow) flows.push(r.Flow);

            } catch { /* deleted */ }

        }
        return flows;

    }

}

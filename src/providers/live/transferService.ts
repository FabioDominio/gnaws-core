import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type DescribedServer,
    TransferClient,
    type TransferClientConfig,
    paginateListServers,
    DescribeServerCommand
} from "@aws-sdk/client-transfer";
import type {Transfer} from "../../interfaces/transfer.js";

export class TransferService implements Transfer {

    #client: TransferClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: TransferClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new TransferClient(config);

    }

    async getServers (): Promise<DescribedServer[]> {

        const client = this.#client;
        const serverIds: string[] = [];
        for await (const page of paginateListServers(
            {client},
            {}
        )) {

            for (const server of page.Servers ?? []) {

                if (server.ServerId) {

                    serverIds.push(server.ServerId);

                }

            }

        }

        const servers: DescribedServer[] = [];
        for (const serverId of serverIds) {

            try {

                const response = await client.send(new DescribeServerCommand({"ServerId": serverId}));
                if (response.Server) {

                    servers.push(response.Server);

                }

            } catch {

                // Server may have been deleted
            }

        }
        return servers;

    }

}

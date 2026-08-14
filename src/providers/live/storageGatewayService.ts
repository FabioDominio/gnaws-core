import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {type GatewayInfo, type FileShareInfo, type VolumeInfo, StorageGatewayClient, paginateListGateways, paginateListFileShares, paginateListVolumes} from "@aws-sdk/client-storage-gateway";
import type {StorageGateway} from "../../interfaces/storagegateway.js";

export class StorageGatewayService implements StorageGateway {

    #client: StorageGatewayClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        this.#client = new StorageGatewayClient({region,
            credentials,
            "maxAttempts": 5,
            logger});

    }

    async getGateways (): Promise<GatewayInfo[]> {

        const client = this.#client;
        const items: GatewayInfo[] = [];
        for await (const page of paginateListGateways(
            {client},
            {}
        )) {

            if (page.Gateways !== undefined) {

                items.push(...page.Gateways);

            }

        }
        return items;

    }

    async getFileShares (): Promise<FileShareInfo[]> {

        const client = this.#client;
        const items: FileShareInfo[] = [];
        for await (const page of paginateListFileShares(
            {client},
            {}
        )) {

            if (page.FileShareInfoList !== undefined) {

                items.push(...page.FileShareInfoList);

            }

        }
        return items;

    }

    async getVolumes (): Promise<VolumeInfo[]> {

        const client = this.#client;
        const items: VolumeInfo[] = [];
        for await (const page of paginateListVolumes(
            {client},
            {}
        )) {

            if (page.VolumeInfos !== undefined) {

                items.push(...page.VolumeInfos);

            }

        }
        return items;

    }

}

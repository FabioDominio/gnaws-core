import type {GatewayInfo, FileShareInfo, VolumeInfo} from "@aws-sdk/client-storage-gateway";
import type {StorageGateway} from "../../interfaces/storagegateway.js";
import {readCacheFile} from "./cacheReader.js";

export class StorageGatewayCacheService implements StorageGateway {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getGateways (): Promise<GatewayInfo[]> {

        return readCacheFile(
            this.#cacheDir,
            "storagegateway_gateways.json"
        );

    }

    async getFileShares (): Promise<FileShareInfo[]> {

        return readCacheFile(
            this.#cacheDir,
            "storagegateway_file_shares.json"
        );

    }

    async getVolumes (): Promise<VolumeInfo[]> {

        return readCacheFile(
            this.#cacheDir,
            "storagegateway_volumes.json"
        );

    }

}

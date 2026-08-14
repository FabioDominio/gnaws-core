import type {GatewayInfo, FileShareInfo, VolumeInfo} from "@aws-sdk/client-storage-gateway";

export interface StorageGateway {
    getGateways (): Promise<GatewayInfo[]>;
    getFileShares (): Promise<FileShareInfo[]>;
    getVolumes (): Promise<VolumeInfo[]>;
}

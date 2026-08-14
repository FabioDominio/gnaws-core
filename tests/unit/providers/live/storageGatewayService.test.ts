import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {StorageGatewayClient, ListGatewaysCommand, ListFileSharesCommand, ListVolumesCommand} from "@aws-sdk/client-storage-gateway";
import {StorageGatewayService} from "../../../../src/providers/live/storageGatewayService.js";

const sgwMock = mockClient(StorageGatewayClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    sgwMock.reset();

});

describe(
    "StorageGatewayService",
    () => {

        describe(
            "getGateways",
            () => {

                it(
                    "returns gateways",
                    async () => {

                        sgwMock.on(ListGatewaysCommand).resolves({
                            "Gateways": [
                                {"GatewayId": "sgw-1",
                                    "GatewayName": "gateway-1",
                                    "GatewayType": "FILE_S3",
                                    "GatewayARN": "arn:aws:storagegateway:us-east-1:123:gateway/sgw-1"},
                                {"GatewayId": "sgw-2",
                                    "GatewayName": "gateway-2",
                                    "GatewayType": "CACHED",
                                    "GatewayARN": "arn:aws:storagegateway:us-east-1:123:gateway/sgw-2"}
                            ]
                        });

                        const service = new StorageGatewayService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getGateways();

                        expect(result).toHaveLength(2);
                        expect(result[0].GatewayName).toBe("gateway-1");

                    }
                );

                it(
                    "returns empty when no gateways",
                    async () => {

                        sgwMock.on(ListGatewaysCommand).resolves({});

                        const service = new StorageGatewayService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getGateways();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getFileShares",
            () => {

                it(
                    "returns file shares",
                    async () => {

                        sgwMock.on(ListFileSharesCommand).resolves({
                            "FileShareInfoList": [
                                {"FileShareId": "share-1",
                                    "FileShareARN": "arn:aws:storagegateway:us-east-1:123:share/share-1",
                                    "FileShareType": "NFS",
                                    "FileShareStatus": "AVAILABLE"},
                                {"FileShareId": "share-2",
                                    "FileShareARN": "arn:aws:storagegateway:us-east-1:123:share/share-2",
                                    "FileShareType": "SMB",
                                    "FileShareStatus": "AVAILABLE"}
                            ]
                        });

                        const service = new StorageGatewayService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getFileShares();

                        expect(result).toHaveLength(2);
                        expect(result[0].FileShareType).toBe("NFS");

                    }
                );

                it(
                    "returns empty when no file shares",
                    async () => {

                        sgwMock.on(ListFileSharesCommand).resolves({});

                        const service = new StorageGatewayService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getFileShares();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getVolumes",
            () => {

                it(
                    "returns volumes",
                    async () => {

                        sgwMock.on(ListVolumesCommand).resolves({
                            "VolumeInfos": [
                                {"VolumeId": "vol-1",
                                    "VolumeARN": "arn:aws:storagegateway:us-east-1:123:gateway/sgw-1/volume/vol-1",
                                    "VolumeType": "CACHED iSCSI"},
                                {"VolumeId": "vol-2",
                                    "VolumeARN": "arn:aws:storagegateway:us-east-1:123:gateway/sgw-1/volume/vol-2",
                                    "VolumeType": "STORED iSCSI"}
                            ]
                        });

                        const service = new StorageGatewayService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getVolumes();

                        expect(result).toHaveLength(2);
                        expect(result[0].VolumeType).toBe("CACHED iSCSI");

                    }
                );

                it(
                    "returns empty when no volumes",
                    async () => {

                        sgwMock.on(ListVolumesCommand).resolves({});

                        const service = new StorageGatewayService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getVolumes();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

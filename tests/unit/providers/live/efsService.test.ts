import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    EFSClient,
    DescribeFileSystemsCommand,
    DescribeMountTargetsCommand,
    DescribeAccessPointsCommand
} from "@aws-sdk/client-efs";
import {EfsService} from "../../../../src/providers/live/efsService.js";

const efsMock = mockClient(EFSClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    efsMock.reset();

});

describe(
    "EfsService",
    () => {

        describe(
            "getFileSystems",
            () => {

                it(
                    "returns file systems",
                    async () => {

                        efsMock.on(DescribeFileSystemsCommand).resolves({
                            "FileSystems": [
                                {"FileSystemId": "fs-1",
                                    "LifeCycleState": "available",
                                    "NumberOfMountTargets": 2,
                                    "SizeInBytes": {"Value": 1024},
                                    "OwnerId": "123456789012",
                                    "CreationToken": "token-1",
                                    "CreationTime": new Date(),
                                    "PerformanceMode": "generalPurpose",
                                    "Tags": []},
                                {"FileSystemId": "fs-2",
                                    "LifeCycleState": "available",
                                    "NumberOfMountTargets": 1,
                                    "SizeInBytes": {"Value": 2048},
                                    "OwnerId": "123456789012",
                                    "CreationToken": "token-2",
                                    "CreationTime": new Date(),
                                    "PerformanceMode": "generalPurpose",
                                    "Tags": []}
                            ]
                        });

                        const service = new EfsService(
                            creds,
                            "us-east-1"
                        );
                        const fs = await service.getFileSystems();

                        expect(fs).toHaveLength(2);
                        expect(fs[0].FileSystemId).toBe("fs-1");

                    }
                );

                it(
                    "returns empty when no file systems",
                    async () => {

                        efsMock.on(DescribeFileSystemsCommand).resolves({});

                        const service = new EfsService(
                            creds,
                            "us-east-1"
                        );
                        const fs = await service.getFileSystems();

                        expect(fs).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getMountTargets",
            () => {

                it(
                    "returns mount targets for a file system",
                    async () => {

                        efsMock.on(DescribeMountTargetsCommand).resolves({
                            "MountTargets": [
                                {"MountTargetId": "mt-1",
                                    "FileSystemId": "fs-1",
                                    "SubnetId": "subnet-1",
                                    "LifeCycleState": "available"},
                                {"MountTargetId": "mt-2",
                                    "FileSystemId": "fs-1",
                                    "SubnetId": "subnet-2",
                                    "LifeCycleState": "available"}
                            ]
                        });

                        const service = new EfsService(
                            creds,
                            "us-east-1"
                        );
                        const targets = await service.getMountTargets("fs-1");

                        expect(targets).toHaveLength(2);
                        expect(targets[0].MountTargetId).toBe("mt-1");

                    }
                );

                it(
                    "returns empty when no mount targets",
                    async () => {

                        efsMock.on(DescribeMountTargetsCommand).resolves({});

                        const service = new EfsService(
                            creds,
                            "us-east-1"
                        );
                        const targets = await service.getMountTargets("fs-1");

                        expect(targets).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getAccessPoints",
            () => {

                it(
                    "returns access points",
                    async () => {

                        efsMock.on(DescribeAccessPointsCommand).resolves({
                            "AccessPoints": [
                                {"AccessPointId": "ap-1",
                                    "FileSystemId": "fs-1",
                                    "RootDirectory": {"Path": "/data"}},
                                {"AccessPointId": "ap-2",
                                    "FileSystemId": "fs-2",
                                    "RootDirectory": {"Path": "/logs"}}
                            ]
                        });

                        const service = new EfsService(
                            creds,
                            "us-east-1"
                        );
                        const aps = await service.getAccessPoints();

                        expect(aps).toHaveLength(2);
                        expect(aps[0].AccessPointId).toBe("ap-1");

                    }
                );

                it(
                    "returns empty when no access points",
                    async () => {

                        efsMock.on(DescribeAccessPointsCommand).resolves({});

                        const service = new EfsService(
                            creds,
                            "us-east-1"
                        );
                        const aps = await service.getAccessPoints();

                        expect(aps).toHaveLength(0);

                    }
                );

            }
        );

    }
);

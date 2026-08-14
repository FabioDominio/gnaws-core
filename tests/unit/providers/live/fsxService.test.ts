import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    FSxClient,
    DescribeFileSystemsCommand
} from "@aws-sdk/client-fsx";
import {FsxService} from "../../../../src/providers/live/fsxService.js";

const fsxMock = mockClient(FSxClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    fsxMock.reset();

});

describe(
    "FsxService",
    () => {

        describe(
            "getFileSystems",
            () => {

                it(
                    "returns file systems",
                    async () => {

                        fsxMock.on(DescribeFileSystemsCommand).resolves({
                            "FileSystems": [
                                {"FileSystemId": "fs-1",
                                    "FileSystemType": "LUSTRE",
                                    "Lifecycle": "AVAILABLE"},
                                {"FileSystemId": "fs-2",
                                    "FileSystemType": "WINDOWS",
                                    "Lifecycle": "AVAILABLE"}
                            ]
                        });

                        const service = new FsxService(
                            creds,
                            "us-east-1"
                        );
                        const fs = await service.getFileSystems();

                        expect(fs).toHaveLength(2);
                        expect(fs[0].FileSystemId).toBe("fs-1");

                    }
                );

                it(
                    "aggregates file systems across pages",
                    async () => {

                        fsxMock.on(DescribeFileSystemsCommand).
                            resolvesOnce({"FileSystems": [{"FileSystemId": "fs-1"}],
                                "NextToken": "tok"}).
                            resolvesOnce({"FileSystems": [{"FileSystemId": "fs-2"}]});

                        const service = new FsxService(
                            creds,
                            "us-east-1"
                        );
                        const fs = await service.getFileSystems();

                        expect(fs).toHaveLength(2);

                    }
                );

                it(
                    "returns empty when no file systems",
                    async () => {

                        fsxMock.on(DescribeFileSystemsCommand).resolves({});

                        const service = new FsxService(
                            creds,
                            "us-east-1"
                        );
                        const fs = await service.getFileSystems();

                        expect(fs).toHaveLength(0);

                    }
                );

            }
        );

    }
);

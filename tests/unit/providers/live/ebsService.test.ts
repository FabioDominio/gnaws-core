import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {EBSClient, ListSnapshotBlocksCommand} from "@aws-sdk/client-ebs";
import {EbsService} from "../../../../src/providers/live/ebsService.js";

const ebsMock = mockClient(EBSClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    ebsMock.reset();

});

describe(
    "EbsService",
    () => {

        describe(
            "getSnapshotBlocks",
            () => {

                it(
                    "returns snapshot blocks",
                    async () => {

                        ebsMock.on(ListSnapshotBlocksCommand).resolves({
                            "Blocks": [
                                {"BlockIndex": 0,
                                    "BlockToken": "token-0"},
                                {"BlockIndex": 1,
                                    "BlockToken": "token-1"}
                            ]
                        });

                        const service = new EbsService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getSnapshotBlocks("snap-123");

                        expect(result).toHaveLength(2);
                        expect(result[0].BlockIndex).toBe(0);

                    }
                );

                it(
                    "returns empty when no blocks",
                    async () => {

                        ebsMock.on(ListSnapshotBlocksCommand).resolves({});

                        const service = new EbsService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getSnapshotBlocks("snap-123");

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

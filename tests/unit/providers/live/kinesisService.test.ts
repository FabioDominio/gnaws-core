import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    KinesisClient,
    ListStreamsCommand
} from "@aws-sdk/client-kinesis";
import {KinesisService} from "../../../../src/providers/live/kinesisService.js";

const kinesisMock = mockClient(KinesisClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    kinesisMock.reset();

});

describe(
    "KinesisService",
    () => {

        describe(
            "getStreams",
            () => {

                it(
                    "returns streams",
                    async () => {

                        kinesisMock.on(ListStreamsCommand).resolves({
                            "StreamSummaries": [
                                {"StreamName": "stream-1",
                                    "StreamARN": "arn:aws:kinesis:us-east-1:123:stream/stream-1",
                                    "StreamStatus": "ACTIVE"},
                                {"StreamName": "stream-2",
                                    "StreamARN": "arn:aws:kinesis:us-east-1:123:stream/stream-2",
                                    "StreamStatus": "ACTIVE"}
                            ]
                        });

                        const service = new KinesisService(
                            creds,
                            "us-east-1"
                        );
                        const streams = await service.getStreams();

                        expect(streams).toHaveLength(2);
                        expect(streams[0].StreamName).toBe("stream-1");

                    }
                );

                it(
                    "aggregates streams across pages",
                    async () => {

                        kinesisMock.on(ListStreamsCommand).
                            resolvesOnce({"StreamSummaries": [
                                {"StreamName": "s1",
                                    "StreamARN": "arn:aws:kinesis:us-east-1:123:stream/s1",
                                    "StreamStatus": "ACTIVE"}
                            ],
                            "HasMoreStreams": true,
                            "NextToken": "tok"}).
                            resolvesOnce({"StreamSummaries": [
                                {"StreamName": "s2",
                                    "StreamARN": "arn:aws:kinesis:us-east-1:123:stream/s2",
                                    "StreamStatus": "ACTIVE"}
                            ],
                            "HasMoreStreams": false});

                        const service = new KinesisService(
                            creds,
                            "us-east-1"
                        );
                        const streams = await service.getStreams();

                        expect(streams).toHaveLength(2);

                    }
                );

                it(
                    "returns empty when no streams",
                    async () => {

                        kinesisMock.on(ListStreamsCommand).resolves({});

                        const service = new KinesisService(
                            creds,
                            "us-east-1"
                        );
                        const streams = await service.getStreams();

                        expect(streams).toHaveLength(0);

                    }
                );

            }
        );

    }
);

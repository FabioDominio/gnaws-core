import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    MediaConnectClient,
    ListFlowsCommand,
    DescribeFlowCommand
} from "@aws-sdk/client-mediaconnect";
import {MediaConnectService} from "../../../../src/providers/live/mediaConnectService.js";

const mcMock = mockClient(MediaConnectClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    mcMock.reset();

});

describe(
    "MediaConnectService",
    () => {

        describe(
            "getFlows",
            () => {

                it(
                    "returns flows with full details",
                    async () => {

                        mcMock.on(ListFlowsCommand).resolves({
                            "Flows": [
                                {"FlowArn": "arn:aws:mediaconnect:us-east-1:123:flow:flow-1",
                                    "Name": "flow-1",
                                    "AvailabilityZone": "us-east-1a",
                                    "Description": "",
                                    "SourceType": "OWNED",
                                    "Status": "ACTIVE"},
                                {"FlowArn": "arn:aws:mediaconnect:us-east-1:123:flow:flow-2",
                                    "Name": "flow-2",
                                    "AvailabilityZone": "us-east-1a",
                                    "Description": "",
                                    "SourceType": "OWNED",
                                    "Status": "STANDBY"}
                            ]
                        });
                        mcMock.on(
                            DescribeFlowCommand,
                            {"FlowArn": "arn:aws:mediaconnect:us-east-1:123:flow:flow-1"}
                        ).resolves({
                            "Flow": {"FlowArn": "arn:aws:mediaconnect:us-east-1:123:flow:flow-1",
                                "Name": "flow-1",
                                "Status": "ACTIVE",
                                "AvailabilityZone": "us-east-1a",
                                "Entitlements": [],
                                "Outputs": [],
                                "Source": {"Name": "source-1",
                                    "SourceArn": "arn:aws:mediaconnect:us-east-1:123:source:source-1"}}
                        });
                        mcMock.on(
                            DescribeFlowCommand,
                            {"FlowArn": "arn:aws:mediaconnect:us-east-1:123:flow:flow-2"}
                        ).resolves({
                            "Flow": {"FlowArn": "arn:aws:mediaconnect:us-east-1:123:flow:flow-2",
                                "Name": "flow-2",
                                "Status": "STANDBY",
                                "AvailabilityZone": "us-east-1a",
                                "Entitlements": [],
                                "Outputs": [],
                                "Source": {"Name": "source-2",
                                    "SourceArn": "arn:aws:mediaconnect:us-east-1:123:source:source-2"}}
                        });

                        const service = new MediaConnectService(
                            creds,
                            "us-east-1"
                        );
                        const flows = await service.getFlows();

                        expect(flows).toHaveLength(2);
                        expect(flows[0].Name).toBe("flow-1");

                    }
                );

                it(
                    "skips flows that fail DescribeFlow",
                    async () => {

                        mcMock.on(ListFlowsCommand).resolves({
                            "Flows": [
                                {"FlowArn": "arn:aws:mediaconnect:us-east-1:123:flow:flow-ok",
                                    "Name": "flow-ok",
                                    "AvailabilityZone": "us-east-1a",
                                    "Description": "",
                                    "SourceType": "OWNED",
                                    "Status": "ACTIVE"},
                                {"FlowArn": "arn:aws:mediaconnect:us-east-1:123:flow:flow-gone",
                                    "Name": "flow-gone",
                                    "AvailabilityZone": "us-east-1a",
                                    "Description": "",
                                    "SourceType": "OWNED",
                                    "Status": "ACTIVE"}
                            ]
                        });
                        mcMock.on(
                            DescribeFlowCommand,
                            {"FlowArn": "arn:aws:mediaconnect:us-east-1:123:flow:flow-ok"}
                        ).resolves({
                            "Flow": {"FlowArn": "arn:aws:mediaconnect:us-east-1:123:flow:flow-ok",
                                "Name": "flow-ok",
                                "Status": "ACTIVE",
                                "AvailabilityZone": "us-east-1a",
                                "Entitlements": [],
                                "Outputs": [],
                                "Source": {"Name": "source-ok",
                                    "SourceArn": "arn:aws:mediaconnect:us-east-1:123:source:source-ok"}}
                        });
                        mcMock.on(
                            DescribeFlowCommand,
                            {"FlowArn": "arn:aws:mediaconnect:us-east-1:123:flow:flow-gone"}
                        ).rejects(new Error("NotFoundException"));

                        const service = new MediaConnectService(
                            creds,
                            "us-east-1"
                        );
                        const flows = await service.getFlows();

                        expect(flows).toHaveLength(1);
                        expect(flows[0].Name).toBe("flow-ok");

                    }
                );

                it(
                    "returns empty when no flows",
                    async () => {

                        mcMock.on(ListFlowsCommand).resolves({});

                        const service = new MediaConnectService(
                            creds,
                            "us-east-1"
                        );
                        const flows = await service.getFlows();

                        expect(flows).toHaveLength(0);

                    }
                );

            }
        );

    }
);

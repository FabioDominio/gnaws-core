import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {TransferClient, ListServersCommand, DescribeServerCommand} from "@aws-sdk/client-transfer";
import {TransferService} from "../../../../src/providers/live/transferService.js";

const transferMock = mockClient(TransferClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    transferMock.reset();

});

describe(
    "TransferService",
    () => {

        describe(
            "getServers",
            () => {

                it(
                    "returns servers with describe enrichment",
                    async () => {

                        transferMock.on(ListServersCommand).resolves({
                            "Servers": [
                                {"ServerId": "s-1",
                                    "Arn": "arn:aws:transfer:us-east-1:123:server/s-1",
                                    "State": "ONLINE"},
                                {"ServerId": "s-2",
                                    "Arn": "arn:aws:transfer:us-east-1:123:server/s-2",
                                    "State": "ONLINE"}
                            ]
                        });
                        transferMock.on(DescribeServerCommand).callsFake((input: {"ServerId"?: string}) => ({
                            "Server": {"ServerId": input.ServerId,
                                "Arn": `arn:aws:transfer:us-east-1:123:server/${String(input.ServerId)}`,
                                "State": "ONLINE",
                                "EndpointType": "PUBLIC",
                                "Protocols": ["SFTP"]}
                        }));

                        const service = new TransferService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getServers();

                        expect(result).toHaveLength(2);
                        expect(result[0].EndpointType).toBe("PUBLIC");

                    }
                );

                it(
                    "skips servers without ServerId",
                    async () => {

                        transferMock.on(ListServersCommand).resolves({
                            "Servers": [
                                {"ServerId": "s-1",
                                    "Arn": "arn:aws:transfer:us-east-1:123:server/s-1"},
                                {"Arn": "arn:aws:transfer:us-east-1:123:server/no-id"}
                            ]
                        });
                        transferMock.on(DescribeServerCommand).resolves({
                            "Server": {"ServerId": "s-1",
                                "State": "ONLINE",
                                "EndpointType": "PUBLIC",
                                "Arn": "arn:aws:transfer:us-east-1:123:server/s-1"}
                        });

                        const service = new TransferService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getServers();

                        expect(result).toHaveLength(1);

                    }
                );

                it(
                    "returns empty when no servers",
                    async () => {

                        transferMock.on(ListServersCommand).resolves({});

                        const service = new TransferService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getServers();

                        expect(result).toHaveLength(0);

                    }
                );

                it(
                    "skips deleted servers gracefully",
                    async () => {

                        transferMock.on(ListServersCommand).resolves({
                            "Servers": [
                                {"ServerId": "s-1",
                                    "Arn": "arn:aws:transfer:us-east-1:123:server/s-1"}
                            ]
                        });
                        transferMock.on(DescribeServerCommand).rejects(new Error("ResourceNotFoundException"));

                        const service = new TransferService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getServers();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

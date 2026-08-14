import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {DirectoryServiceClient, DescribeDirectoriesCommand} from "@aws-sdk/client-directory-service";
import {DirectoryServiceService} from "../../../../src/providers/live/directoryServiceService.js";

const dsMock = mockClient(DirectoryServiceClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    dsMock.reset();

});

describe(
    "DirectoryServiceService",
    () => {

        describe(
            "getDirectories",
            () => {

                it(
                    "returns directories",
                    async () => {

                        dsMock.on(DescribeDirectoriesCommand).resolves({
                            "DirectoryDescriptions": [
                                {"DirectoryId": "d-1234",
                                    "Name": "corp.example.com",
                                    "Type": "MicrosoftAD",
                                    "Size": "Small"},
                                {"DirectoryId": "d-5678",
                                    "Name": "dev.example.com",
                                    "Type": "SimpleAD",
                                    "Size": "Small"}
                            ]
                        });

                        const service = new DirectoryServiceService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getDirectories();

                        expect(result).toHaveLength(2);
                        expect(result[0].DirectoryId).toBe("d-1234");
                        expect(result[0].Name).toBe("corp.example.com");

                    }
                );

                it(
                    "returns empty when no directories",
                    async () => {

                        dsMock.on(DescribeDirectoriesCommand).resolves({});

                        const service = new DirectoryServiceService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getDirectories();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

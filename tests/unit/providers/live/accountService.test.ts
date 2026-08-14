import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {AccountClient, ListRegionsCommand} from "@aws-sdk/client-account";
import {AccountService} from "../../../../src/providers/live/accountService.js";

const accountMock = mockClient(AccountClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    accountMock.reset();

});

describe(
    "AccountService",
    () => {

        describe(
            "getRegions",
            () => {

                it(
                    "returns regions",
                    async () => {

                        accountMock.on(ListRegionsCommand).resolves({
                            "Regions": [
                                {"RegionName": "us-east-1",
                                    "RegionOptStatus": "ENABLED_BY_DEFAULT"},
                                {"RegionName": "us-west-2",
                                    "RegionOptStatus": "ENABLED_BY_DEFAULT"},
                                {"RegionName": "ap-southeast-1",
                                    "RegionOptStatus": "ENABLED"}
                            ]
                        });

                        const service = new AccountService(creds);
                        const result = await service.getRegions();

                        expect(result).toHaveLength(3);
                        expect(result[0].RegionName).toBe("us-east-1");

                    }
                );

                it(
                    "returns empty when no regions",
                    async () => {

                        accountMock.on(ListRegionsCommand).resolves({});

                        const service = new AccountService(creds);
                        const result = await service.getRegions();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

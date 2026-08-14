import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {OutpostsClient, ListOutpostsCommand, ListSitesCommand} from "@aws-sdk/client-outposts";
import {OutpostsService} from "../../../../src/providers/live/outpostsService.js";

const outpostsMock = mockClient(OutpostsClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    outpostsMock.reset();

});

describe(
    "OutpostsService",
    () => {

        describe(
            "getOutposts",
            () => {

                it(
                    "returns outposts",
                    async () => {

                        outpostsMock.on(ListOutpostsCommand).resolves({
                            "Outposts": [
                                {"OutpostId": "op-1",
                                    "OutpostArn": "arn:aws:outposts:us-east-1:123:outpost/op-1",
                                    "Name": "outpost-1"},
                                {"OutpostId": "op-2",
                                    "OutpostArn": "arn:aws:outposts:us-east-1:123:outpost/op-2",
                                    "Name": "outpost-2"}
                            ]
                        });

                        const service = new OutpostsService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getOutposts();

                        expect(result).toHaveLength(2);
                        expect(result[0].Name).toBe("outpost-1");

                    }
                );

                it(
                    "returns empty when no outposts",
                    async () => {

                        outpostsMock.on(ListOutpostsCommand).resolves({});

                        const service = new OutpostsService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getOutposts();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getSites",
            () => {

                it(
                    "returns sites",
                    async () => {

                        outpostsMock.on(ListSitesCommand).resolves({
                            "Sites": [
                                {"SiteId": "site-1",
                                    "Name": "Data Center 1",
                                    "AccountId": "123456789012"},
                                {"SiteId": "site-2",
                                    "Name": "Data Center 2",
                                    "AccountId": "123456789012"}
                            ]
                        });

                        const service = new OutpostsService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getSites();

                        expect(result).toHaveLength(2);
                        expect(result[0].Name).toBe("Data Center 1");

                    }
                );

                it(
                    "returns empty when no sites",
                    async () => {

                        outpostsMock.on(ListSitesCommand).resolves({});

                        const service = new OutpostsService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getSites();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

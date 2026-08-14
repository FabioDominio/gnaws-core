import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {AthenaClient, ListWorkGroupsCommand, GetWorkGroupCommand, ListDataCatalogsCommand} from "@aws-sdk/client-athena";
import {AthenaService} from "../../../../src/providers/live/athenaService.js";

const athenaMock = mockClient(AthenaClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    athenaMock.reset();

});

describe(
    "AthenaService",
    () => {

        describe(
            "getWorkGroups",
            () => {

                it(
                    "returns work groups with describe enrichment",
                    async () => {

                        athenaMock.on(ListWorkGroupsCommand).resolves({
                            "WorkGroups": [
                                {"Name": "primary",
                                    "State": "ENABLED"},
                                {"Name": "analytics",
                                    "State": "ENABLED"}
                            ]
                        });
                        athenaMock.on(GetWorkGroupCommand).callsFake((input: {"WorkGroup"?: string}) => ({
                            "WorkGroup": {"Name": input.WorkGroup,
                                "State": "ENABLED",
                                "Configuration": {"ResultConfiguration": {}}}
                        }));

                        const service = new AthenaService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getWorkGroups();

                        expect(result).toHaveLength(2);
                        expect(result[0].Name).toBe("primary");

                    }
                );

                it(
                    "skips work groups without name",
                    async () => {

                        athenaMock.on(ListWorkGroupsCommand).resolves({
                            "WorkGroups": [
                                {"Name": "valid",
                                    "State": "ENABLED"},
                                {"State": "ENABLED"}
                            ]
                        });
                        athenaMock.on(GetWorkGroupCommand).resolves({
                            "WorkGroup": {"Name": "valid",
                                "State": "ENABLED"}
                        });

                        const service = new AthenaService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getWorkGroups();

                        expect(result).toHaveLength(1);

                    }
                );

                it(
                    "returns empty when no work groups",
                    async () => {

                        athenaMock.on(ListWorkGroupsCommand).resolves({});

                        const service = new AthenaService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getWorkGroups();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getDataCatalogs",
            () => {

                it(
                    "returns data catalogs",
                    async () => {

                        athenaMock.on(ListDataCatalogsCommand).resolves({
                            "DataCatalogsSummary": [
                                {"CatalogName": "AwsDataCatalog",
                                    "Type": "GLUE"},
                                {"CatalogName": "my-catalog",
                                    "Type": "HIVE"}
                            ]
                        });

                        const service = new AthenaService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getDataCatalogs();

                        expect(result).toHaveLength(2);
                        expect(result[0].CatalogName).toBe("AwsDataCatalog");

                    }
                );

                it(
                    "returns empty when no catalogs",
                    async () => {

                        athenaMock.on(ListDataCatalogsCommand).resolves({});

                        const service = new AthenaService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getDataCatalogs();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

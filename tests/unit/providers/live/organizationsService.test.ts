import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {OrganizationsClient, ListRootsCommand, ListOrganizationalUnitsForParentCommand, ListAccountsCommand, ListPoliciesCommand} from "@aws-sdk/client-organizations";
import {OrganizationsService} from "../../../../src/providers/live/organizationsService.js";

const orgMock = mockClient(OrganizationsClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    orgMock.reset();

});

describe(
    "OrganizationsService",
    () => {

        describe(
            "getRoots",
            () => {

                it(
                    "returns roots",
                    async () => {

                        orgMock.on(ListRootsCommand).resolves({
                            "Roots": [
                                {"Id": "r-1234",
                                    "Arn": "arn:aws:organizations::123:root/o-123/r-1234",
                                    "Name": "Root"}
                            ]
                        });

                        const service = new OrganizationsService(creds);
                        const result = await service.getRoots();

                        expect(result).toHaveLength(1);
                        expect(result[0].Id).toBe("r-1234");

                    }
                );

                it(
                    "returns empty when no roots",
                    async () => {

                        orgMock.on(ListRootsCommand).resolves({});

                        const service = new OrganizationsService(creds);
                        const result = await service.getRoots();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getOrganizationalUnits",
            () => {

                it(
                    "returns OUs for a parent",
                    async () => {

                        orgMock.on(ListOrganizationalUnitsForParentCommand).resolves({
                            "OrganizationalUnits": [
                                {"Id": "ou-1234",
                                    "Arn": "arn:aws:organizations::123:ou/o-123/ou-1234",
                                    "Name": "Production"},
                                {"Id": "ou-5678",
                                    "Arn": "arn:aws:organizations::123:ou/o-123/ou-5678",
                                    "Name": "Development"}
                            ]
                        });

                        const service = new OrganizationsService(creds);
                        const result = await service.getOrganizationalUnits("r-1234");

                        expect(result).toHaveLength(2);
                        expect(result[0].Name).toBe("Production");

                    }
                );

                it(
                    "returns empty when no OUs",
                    async () => {

                        orgMock.on(ListOrganizationalUnitsForParentCommand).resolves({});

                        const service = new OrganizationsService(creds);
                        const result = await service.getOrganizationalUnits("r-1234");

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getAccounts",
            () => {

                it(
                    "returns accounts",
                    async () => {

                        orgMock.on(ListAccountsCommand).resolves({
                            "Accounts": [
                                {"Id": "111111111111",
                                    "Name": "Main Account",
                                    "Status": "ACTIVE"},
                                {"Id": "222222222222",
                                    "Name": "Dev Account",
                                    "Status": "ACTIVE"}
                            ]
                        });

                        const service = new OrganizationsService(creds);
                        const result = await service.getAccounts();

                        expect(result).toHaveLength(2);
                        expect(result[0].Id).toBe("111111111111");

                    }
                );

                it(
                    "returns empty when no accounts",
                    async () => {

                        orgMock.on(ListAccountsCommand).resolves({});

                        const service = new OrganizationsService(creds);
                        const result = await service.getAccounts();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getPolicies",
            () => {

                it(
                    "returns policies across all types",
                    async () => {

                        orgMock.on(ListPoliciesCommand).resolves({
                            "Policies": [
                                {"Id": "p-1",
                                    "Name": "SCP-1",
                                    "Type": "SERVICE_CONTROL_POLICY"}
                            ]
                        });

                        const service = new OrganizationsService(creds);
                        const result = await service.getPolicies();

                        // Called for 4 policy types, each returns 1 policy
                        expect(result).toHaveLength(4);

                    }
                );

                it(
                    "skips policy types that error (not enabled)",
                    async () => {

                        orgMock.on(ListPoliciesCommand).
                            resolvesOnce({"Policies": [
                                {"Id": "p-1",
                                    "Name": "SCP-1",
                                    "Type": "SERVICE_CONTROL_POLICY"}
                            ]}).
                            rejectsOnce(new Error("PolicyTypeNotEnabledException")).
                            rejectsOnce(new Error("PolicyTypeNotEnabledException")).
                            rejectsOnce(new Error("PolicyTypeNotEnabledException"));

                        const service = new OrganizationsService(creds);
                        const result = await service.getPolicies();

                        expect(result).toHaveLength(1);

                    }
                );

                it(
                    "returns empty when no policies",
                    async () => {

                        orgMock.on(ListPoliciesCommand).resolves({});

                        const service = new OrganizationsService(creds);
                        const result = await service.getPolicies();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

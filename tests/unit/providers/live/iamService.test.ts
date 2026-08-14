import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    IAMClient,
    ListUsersCommand,
    ListRolesCommand,
    ListPoliciesCommand,
    ListGroupsCommand,
    ListInstanceProfilesCommand,
    ListMFADevicesCommand,
    ListAccessKeysCommand,
    ListServerCertificatesCommand,
    ListVirtualMFADevicesCommand,
    ListGroupsForUserCommand,
    ListInstanceProfilesForRoleCommand,
    ListRolePoliciesCommand,
    ListUserPoliciesCommand,
    ListGroupPoliciesCommand,
    ListAttachedRolePoliciesCommand,
    ListSSHPublicKeysCommand,
    GetGroupCommand
} from "@aws-sdk/client-iam";
import {IamService} from "../../../../src/providers/live/iamService.js";

const iamMock = mockClient(IAMClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    iamMock.reset();

});

describe(
    "IamService",
    () => {

        describe(
            "getUsers",
            () => {

                it(
                    "returns users from single page",
                    async () => {

                        iamMock.on(ListUsersCommand).resolves({
                            "Users": [
                                {"UserName": "alice",
                                    "UserId": "u1",
                                    "Path": "/",
                                    "Arn": "arn:aws:iam::123:user/alice",
                                    "CreateDate": new Date()},
                                {"UserName": "bob",
                                    "UserId": "u2",
                                    "Path": "/",
                                    "Arn": "arn:aws:iam::123:user/bob",
                                    "CreateDate": new Date()}
                            ]
                        });

                        const service = new IamService(creds);
                        const result = await service.getUsers();

                        expect(result).toHaveLength(2);
                        expect(result[0].UserName).toBe("alice");

                    }
                );

                it(
                    "aggregates across pages",
                    async () => {

                        iamMock.on(ListUsersCommand).
                            resolvesOnce({"Users": [
                                {"UserName": "alice",
                                    "UserId": "u1",
                                    "Path": "/",
                                    "Arn": "arn:aws:iam::123:user/alice",
                                    "CreateDate": new Date()}
                            ],
                            "IsTruncated": true,
                            "Marker": "tok"}).
                            resolvesOnce({"Users": [
                                {"UserName": "bob",
                                    "UserId": "u2",
                                    "Path": "/",
                                    "Arn": "arn:aws:iam::123:user/bob",
                                    "CreateDate": new Date()}
                            ]});

                        const service = new IamService(creds);
                        const result = await service.getUsers();

                        expect(result).toHaveLength(2);

                    }
                );

                it(
                    "returns empty array when no users",
                    async () => {

                        iamMock.on(ListUsersCommand).resolves({});

                        const service = new IamService(creds);
                        const result = await service.getUsers();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getRoles",
            () => {

                it(
                    "returns roles",
                    async () => {

                        iamMock.on(ListRolesCommand).resolves({
                            "Roles": [
                                {"RoleName": "role-1",
                                    "RoleId": "r1",
                                    "Arn": "arn:aws:iam::123:role/role-1",
                                    "Path": "/",
                                    "CreateDate": new Date()}
                            ]
                        });

                        const service = new IamService(creds);
                        const result = await service.getRoles();

                        expect(result).toHaveLength(1);
                        expect(result[0].RoleName).toBe("role-1");

                    }
                );

                it(
                    "returns empty array when no roles",
                    async () => {

                        iamMock.on(ListRolesCommand).resolves({});

                        const service = new IamService(creds);
                        const result = await service.getRoles();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getPolicies",
            () => {

                it(
                    "returns policies",
                    async () => {

                        iamMock.on(ListPoliciesCommand).resolves({
                            "Policies": [
                                {"PolicyName": "pol-1",
                                    "PolicyId": "p1",
                                    "Arn": "arn:aws:iam::123:policy/pol-1"}
                            ]
                        });

                        const service = new IamService(creds);
                        const result = await service.getPolicies();

                        expect(result).toHaveLength(1);
                        expect(result[0].PolicyName).toBe("pol-1");

                    }
                );

                it(
                    "returns empty array when no policies",
                    async () => {

                        iamMock.on(ListPoliciesCommand).resolves({});

                        const service = new IamService(creds);
                        const result = await service.getPolicies();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getUserGroups",
            () => {

                it(
                    "returns groups",
                    async () => {

                        iamMock.on(ListGroupsCommand).resolves({
                            "Groups": [
                                {"GroupName": "admins",
                                    "GroupId": "g1",
                                    "Arn": "arn:aws:iam::123:group/admins",
                                    "Path": "/",
                                    "CreateDate": new Date()}
                            ]
                        });

                        const service = new IamService(creds);
                        const result = await service.getUserGroups();

                        expect(result).toHaveLength(1);
                        expect(result[0].GroupName).toBe("admins");

                    }
                );

                it(
                    "returns empty array when no groups",
                    async () => {

                        iamMock.on(ListGroupsCommand).resolves({});

                        const service = new IamService(creds);
                        const result = await service.getUserGroups();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getInstanceProfiles",
            () => {

                it(
                    "returns instance profiles",
                    async () => {

                        iamMock.on(ListInstanceProfilesCommand).resolves({
                            "InstanceProfiles": [
                                {"InstanceProfileName": "ip-1",
                                    "InstanceProfileId": "ip1",
                                    "Arn": "arn:aws:iam::123:instance-profile/ip-1",
                                    "Path": "/",
                                    "Roles": [],
                                    "CreateDate": new Date()}
                            ]
                        });

                        const service = new IamService(creds);
                        const result = await service.getInstanceProfiles();

                        expect(result).toHaveLength(1);
                        expect(result[0].InstanceProfileName).toBe("ip-1");

                    }
                );

                it(
                    "returns empty array when no profiles",
                    async () => {

                        iamMock.on(ListInstanceProfilesCommand).resolves({});

                        const service = new IamService(creds);
                        const result = await service.getInstanceProfiles();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getMFADevices",
            () => {

                it(
                    "returns MFA devices for user",
                    async () => {

                        iamMock.on(ListMFADevicesCommand).resolves({
                            "MFADevices": [
                                {"UserName": "alice",
                                    "SerialNumber": "arn:aws:iam::123:mfa/alice",
                                    "EnableDate": new Date()}
                            ]
                        });

                        const service = new IamService(creds);
                        const result = await service.getMFADevices("alice");

                        expect(result).toHaveLength(1);
                        expect(result[0].SerialNumber).toContain("alice");

                    }
                );

                it(
                    "returns empty array when no MFA devices",
                    async () => {

                        iamMock.on(ListMFADevicesCommand).resolves({});

                        const service = new IamService(creds);
                        const result = await service.getMFADevices("alice");

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getAccessKeys",
            () => {

                it(
                    "returns access keys for user",
                    async () => {

                        iamMock.on(ListAccessKeysCommand).resolves({
                            "AccessKeyMetadata": [
                                {"UserName": "alice",
                                    "AccessKeyId": "AKIA123",
                                    "Status": "Active"}
                            ]
                        });

                        const service = new IamService(creds);
                        const result = await service.getAccessKeys("alice");

                        expect(result).toHaveLength(1);
                        expect(result[0].AccessKeyId).toBe("AKIA123");

                    }
                );

                it(
                    "returns empty array when no access keys",
                    async () => {

                        iamMock.on(ListAccessKeysCommand).resolves({});

                        const service = new IamService(creds);
                        const result = await service.getAccessKeys("alice");

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getServerCertificates",
            () => {

                it(
                    "returns server certificates",
                    async () => {

                        iamMock.on(ListServerCertificatesCommand).resolves({
                            "ServerCertificateMetadataList": [
                                {"ServerCertificateName": "cert-1",
                                    "ServerCertificateId": "sc1",
                                    "Arn": "arn:aws:iam::123:server-certificate/cert-1",
                                    "Path": "/"}
                            ]
                        });

                        const service = new IamService(creds);
                        const result = await service.getServerCertificates();

                        expect(result).toHaveLength(1);
                        expect(result[0].ServerCertificateName).toBe("cert-1");

                    }
                );

                it(
                    "returns empty array when no certificates",
                    async () => {

                        iamMock.on(ListServerCertificatesCommand).resolves({});

                        const service = new IamService(creds);
                        const result = await service.getServerCertificates();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getVirtualMFADevices",
            () => {

                it(
                    "returns virtual MFA devices",
                    async () => {

                        iamMock.on(ListVirtualMFADevicesCommand).resolves({
                            "VirtualMFADevices": [{"SerialNumber": "arn:aws:iam::123:mfa/root-account-mfa-device"}]
                        });

                        const service = new IamService(creds);
                        const result = await service.getVirtualMFADevices();

                        expect(result).toHaveLength(1);

                    }
                );

                it(
                    "returns empty array when no virtual MFA devices",
                    async () => {

                        iamMock.on(ListVirtualMFADevicesCommand).resolves({});

                        const service = new IamService(creds);
                        const result = await service.getVirtualMFADevices();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getGroupsForUser",
            () => {

                it(
                    "returns groups for user",
                    async () => {

                        iamMock.on(ListGroupsForUserCommand).resolves({
                            "Groups": [
                                {"GroupName": "admins",
                                    "GroupId": "g1",
                                    "Arn": "arn:aws:iam::123:group/admins",
                                    "Path": "/",
                                    "CreateDate": new Date()}
                            ]
                        });

                        const service = new IamService(creds);
                        const result = await service.getGroupsForUser("alice");

                        expect(result).toHaveLength(1);
                        expect(result[0].GroupName).toBe("admins");

                    }
                );

                it(
                    "returns empty array when user has no groups",
                    async () => {

                        iamMock.on(ListGroupsForUserCommand).resolves({});

                        const service = new IamService(creds);
                        const result = await service.getGroupsForUser("alice");

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getInstanceProfilesForRole",
            () => {

                it(
                    "returns instance profiles for role",
                    async () => {

                        iamMock.on(ListInstanceProfilesForRoleCommand).resolves({
                            "InstanceProfiles": [
                                {"InstanceProfileName": "ip-1",
                                    "InstanceProfileId": "ip1",
                                    "Arn": "arn:aws:iam::123:instance-profile/ip-1",
                                    "Path": "/",
                                    "Roles": [],
                                    "CreateDate": new Date()}
                            ]
                        });

                        const service = new IamService(creds);
                        const result = await service.getInstanceProfilesForRole("my-role");

                        expect(result).toHaveLength(1);

                    }
                );

                it(
                    "returns empty array when no instance profiles for role",
                    async () => {

                        iamMock.on(ListInstanceProfilesForRoleCommand).resolves({});

                        const service = new IamService(creds);
                        const result = await service.getInstanceProfilesForRole("my-role");

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getRolePolicies",
            () => {

                it(
                    "returns inline policy names for role",
                    async () => {

                        iamMock.on(ListRolePoliciesCommand).resolves({
                            "PolicyNames": [
                                "inline-pol-1",
                                "inline-pol-2"
                            ]
                        });

                        const service = new IamService(creds);
                        const result = await service.getRolePolicies("my-role");

                        expect(result).toHaveLength(2);
                        expect(result[0]).toBe("inline-pol-1");

                    }
                );

                it(
                    "returns empty array when no inline policies",
                    async () => {

                        iamMock.on(ListRolePoliciesCommand).resolves({});

                        const service = new IamService(creds);
                        const result = await service.getRolePolicies("my-role");

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getUserPolicies",
            () => {

                it(
                    "returns inline policy names for user",
                    async () => {

                        iamMock.on(ListUserPoliciesCommand).resolves({
                            "PolicyNames": ["user-pol-1"]
                        });

                        const service = new IamService(creds);
                        const result = await service.getUserPolicies("alice");

                        expect(result).toHaveLength(1);
                        expect(result[0]).toBe("user-pol-1");

                    }
                );

                it(
                    "returns empty array when no inline policies",
                    async () => {

                        iamMock.on(ListUserPoliciesCommand).resolves({});

                        const service = new IamService(creds);
                        const result = await service.getUserPolicies("alice");

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getGroupPolicies",
            () => {

                it(
                    "returns inline policy names for group",
                    async () => {

                        iamMock.on(ListGroupPoliciesCommand).resolves({
                            "PolicyNames": ["group-pol-1"]
                        });

                        const service = new IamService(creds);
                        const result = await service.getGroupPolicies("admins");

                        expect(result).toHaveLength(1);
                        expect(result[0]).toBe("group-pol-1");

                    }
                );

                it(
                    "returns empty array when no inline policies",
                    async () => {

                        iamMock.on(ListGroupPoliciesCommand).resolves({});

                        const service = new IamService(creds);
                        const result = await service.getGroupPolicies("admins");

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getAttachedRolePolicies",
            () => {

                it(
                    "returns attached policies for role",
                    async () => {

                        iamMock.on(ListAttachedRolePoliciesCommand).resolves({
                            "AttachedPolicies": [
                                {"PolicyName": "ReadOnlyAccess",
                                    "PolicyArn": "arn:aws:iam::aws:policy/ReadOnlyAccess"},
                                {"PolicyName": "S3Full",
                                    "PolicyArn": "arn:aws:iam::123:policy/S3Full"}
                            ]
                        });

                        const service = new IamService(creds);
                        const result = await service.getAttachedRolePolicies("my-role");

                        expect(result).toHaveLength(2);
                        expect(result[0].PolicyName).toBe("ReadOnlyAccess");

                    }
                );

                it(
                    "returns empty array when no attached policies",
                    async () => {

                        iamMock.on(ListAttachedRolePoliciesCommand).resolves({});

                        const service = new IamService(creds);
                        const result = await service.getAttachedRolePolicies("my-role");

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getSSHPublicKeys",
            () => {

                it(
                    "returns SSH public keys for user",
                    async () => {

                        iamMock.on(ListSSHPublicKeysCommand).resolves({
                            "SSHPublicKeys": [
                                {"UserName": "alice",
                                    "SSHPublicKeyId": "APKA123",
                                    "Status": "Active",
                                    "UploadDate": new Date()},
                                {"UserName": "alice",
                                    "SSHPublicKeyId": "APKA456",
                                    "Status": "Inactive",
                                    "UploadDate": new Date()}
                            ]
                        });

                        const service = new IamService(creds);
                        const result = await service.getSSHPublicKeys("alice");

                        expect(result).toHaveLength(2);
                        expect(result[0].SSHPublicKeyId).toBe("APKA123");

                    }
                );

                it(
                    "returns empty array when no SSH public keys",
                    async () => {

                        iamMock.on(ListSSHPublicKeysCommand).resolves({});

                        const service = new IamService(creds);
                        const result = await service.getSSHPublicKeys("alice");

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getGroupMembers",
            () => {

                it(
                    "returns users in group",
                    async () => {

                        iamMock.on(GetGroupCommand).resolves({
                            "Users": [
                                {"UserName": "alice",
                                    "UserId": "u1",
                                    "Path": "/",
                                    "Arn": "arn:aws:iam::123:user/alice",
                                    "CreateDate": new Date()},
                                {"UserName": "bob",
                                    "UserId": "u2",
                                    "Path": "/",
                                    "Arn": "arn:aws:iam::123:user/bob",
                                    "CreateDate": new Date()}
                            ],
                            "Group": {"GroupName": "admins",
                                "GroupId": "g1",
                                "Arn": "arn:aws:iam::123:group/admins",
                                "Path": "/",
                                "CreateDate": new Date()}
                        });

                        const service = new IamService(creds);
                        const result = await service.getGroupMembers("admins");

                        expect(result).toHaveLength(2);
                        expect(result[0].UserName).toBe("alice");

                    }
                );

                it(
                    "returns empty array when no members",
                    async () => {

                        iamMock.on(GetGroupCommand).resolves({
                            "Group": {"GroupName": "admins",
                                "GroupId": "g1",
                                "Arn": "arn:aws:iam::123:group/admins",
                                "Path": "/",
                                "CreateDate": new Date()}
                        });

                        const service = new IamService(creds);
                        const result = await service.getGroupMembers("admins");

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

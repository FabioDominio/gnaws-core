import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {IamCacheService} from "../../../../src/providers/cache/iamCacheService.js";

describe(
    "IamCacheService",
    () => {

        let tmpDir: string;

        beforeEach(() => {

            tmpDir = mkdtempSync(join(
                tmpdir(),
                "gnaws-test-"
            ));

        });

        afterEach(() => {

            rmSync(
                tmpDir,
                {"recursive": true}
            );

        });

        const methods = [
            {"method": "getUsers",
                "file": "iam_users.json",
                "data": [
                    {"UserName": "alice",
                        "UserId": "AIDA1"}
                ]},
            {"method": "getRoles",
                "file": "iam_roles.json",
                "data": [
                    {"RoleName": "admin",
                        "RoleId": "AROA1"}
                ]},
            {"method": "getPolicies",
                "file": "iam_policies.json",
                "data": [
                    {"PolicyName": "ReadOnly",
                        "Arn": "arn:aws:iam::123:policy/ReadOnly"}
                ]},
            {"method": "getUserGroups",
                "file": "iam_user_groups.json",
                "data": [
                    {"GroupName": "devs",
                        "GroupId": "AGPA1"}
                ]},
            {"method": "getInstanceProfiles",
                "file": "iam_instance_profiles.json",
                "data": [{"InstanceProfileName": "profile-1"}]},
            {"method": "getAttachedRolePolicies",
                "file": "iam_role_policies.json",
                "data": [],
                "args": ["admin"]},
            {"method": "getAttachedUserPolicies",
                "file": "iam_user_policies.json",
                "data": [],
                "args": ["alice"]},
            {"method": "getAttachedGroupPolicies",
                "file": "iam_group_policies.json",
                "data": [],
                "args": ["devs"]},
            {"method": "getAccessKeys",
                "file": "iam_access_keys.json",
                "data": [{"AccessKeyId": "AKIA1"}],
                "args": ["alice"]},
            {"method": "getServerCertificates",
                "file": "iam_server_certificates.json",
                "data": [{"ServerCertificateName": "cert-1"}]},
            {"method": "getVirtualMFADevices",
                "file": "iam_virtual_mfa_devices.json",
                "data": [{"SerialNumber": "arn:aws:iam::123:mfa/alice"}]},
            {"method": "getGroupsForUser",
                "file": "iam_groups_for_user.json",
                "data": [{"GroupName": "devs"}],
                "args": ["alice"]},
            {"method": "getRolePolicies",
                "file": "iam_role_policies.json",
                "data": ["inline-policy-1"],
                "args": ["admin"]},
            {"method": "getUserPolicies",
                "file": "iam_user_policies.json",
                "data": ["user-inline-1"],
                "args": ["alice"]},
            {"method": "getGroupPolicies",
                "file": "iam_group_policies.json",
                "data": ["group-inline-1"],
                "args": ["devs"]}
        ] as const;

        for (const entry of methods) {

            const {method, file, data} = entry;
            const args = "args" in entry
                ? entry.args
                : [];

            it(
                `${method} reads ${file}`,
                async () => {

                    writeFileSync(
                        join(
                            tmpDir,
                            file
                        ),
                        JSON.stringify(data)
                    );
                    const service = new IamCacheService(tmpDir);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
                    const result = await (service[method] as any)(...args);
                    expect(result).toEqual(data);

                }
            );

            it(
                `${method} returns empty array for missing file`,
                async () => {

                    const service = new IamCacheService(tmpDir);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
                    const result = await (service[method] as any)(...args);
                    expect(result).toEqual([]);

                }
            );

        }

        it(
            "getMFADevices returns empty array (hardcoded)",
            async () => {

                const service = new IamCacheService(tmpDir);
                const result = await service.getMFADevices("alice");
                expect(result).toEqual([]);

            }
        );

        it(
            "getSSHPublicKeys returns empty array (hardcoded)",
            async () => {

                const service = new IamCacheService(tmpDir);
                const result = await service.getSSHPublicKeys("alice");
                expect(result).toEqual([]);

            }
        );

        it(
            "getInstanceProfilesForRole returns empty array (hardcoded)",
            async () => {

                const service = new IamCacheService(tmpDir);
                const result = await service.getInstanceProfilesForRole("admin");
                expect(result).toEqual([]);

            }
        );

        it(
            "getGroupMembers returns empty array (hardcoded)",
            async () => {

                const service = new IamCacheService(tmpDir);
                const result = await service.getGroupMembers("devs");
                expect(result).toEqual([]);

            }
        );

        it(
            "getAttachedRolePolicies resolves ARNs from map by role name",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "iam_roles.json"
                    ),
                    JSON.stringify([
                        {"RoleId": "r1",
                            "RoleName": "admin"}
                    ])
                );
                writeFileSync(
                    join(
                        tmpDir,
                        "iam_role_policies.json"
                    ),
                    JSON.stringify({"r1": ["arn:aws:iam::aws:policy/AmazonS3ReadOnly"]})
                );
                const service = new IamCacheService(tmpDir);
                const result = await service.getAttachedRolePolicies("admin");
                expect(result).toEqual([
                    {"PolicyArn": "arn:aws:iam::aws:policy/AmazonS3ReadOnly",
                        "PolicyName": "AmazonS3ReadOnly"}
                ]);

            }
        );

        it(
            "getAttachedRolePolicies returns empty for unknown role",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "iam_roles.json"
                    ),
                    JSON.stringify([])
                );
                writeFileSync(
                    join(
                        tmpDir,
                        "iam_role_policies.json"
                    ),
                    JSON.stringify({})
                );
                const service = new IamCacheService(tmpDir);
                const result = await service.getAttachedRolePolicies("unknown");
                expect(result).toEqual([]);

            }
        );

    }
);

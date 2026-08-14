import type {User, Role, Policy, Group, InstanceProfile, AttachedPolicy, MFADevice, AccessKeyMetadata, ServerCertificateMetadata, SSHPublicKeyMetadata, VirtualMFADevice} from "@aws-sdk/client-iam";
import type {Iam} from "../../interfaces/iam.js";
import {readCacheFile, readCacheObject} from "./cacheReader.js";

export class IamCacheService implements Iam {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getUsers (): Promise<User[]> {

        return readCacheFile(
            this.#cacheDir,
            "iam_users.json"
        );

    }

    async getRoles (): Promise<Role[]> {

        return readCacheFile(
            this.#cacheDir,
            "iam_roles.json"
        );

    }

    async getPolicies (): Promise<Policy[]> {

        return readCacheFile(
            this.#cacheDir,
            "iam_policies.json"
        );

    }

    async getUserGroups (): Promise<Group[]> {

        return readCacheFile(
            this.#cacheDir,
            "iam_user_groups.json"
        );

    }

    async getInstanceProfiles (): Promise<InstanceProfile[]> {

        return readCacheFile(
            this.#cacheDir,
            "iam_instance_profiles.json"
        );

    }

    async getAttachedRolePolicies (roleName: string): Promise<AttachedPolicy[]> {

        const map = readCacheObject<Record<string, string[]>>(
            this.#cacheDir,
            "iam_role_policies.json"
        );
        const roles = readCacheFile<{"RoleId"?: string;
            "RoleName"?: string;}[]>(
            this.#cacheDir,
            "iam_roles.json"
        );
        const role = roles.find((r) => r.RoleName === roleName);
        if (!role?.RoleId) {

            return [];

        }
        const arns = map[role.RoleId] ?? [];
        return arns.map((arn) => ({"PolicyArn": arn,
            "PolicyName": arn.split("/").pop() ?? arn}));

    }

    async getAttachedUserPolicies (userName: string): Promise<AttachedPolicy[]> {

        const map = readCacheObject<Record<string, string[]>>(
            this.#cacheDir,
            "iam_user_policies.json"
        );
        const users = readCacheFile<{"UserId"?: string;
            "UserName"?: string;}[]>(
            this.#cacheDir,
            "iam_users.json"
        );
        const user = users.find((u) => u.UserName === userName);
        if (!user?.UserId) {

            return [];

        }
        const arns = map[user.UserId] ?? [];
        return arns.map((arn) => ({"PolicyArn": arn,
            "PolicyName": arn.split("/").pop() ?? arn}));

    }

    async getAttachedGroupPolicies (groupName: string): Promise<AttachedPolicy[]> {

        const map = readCacheObject<Record<string, string[]>>(
            this.#cacheDir,
            "iam_group_policies.json"
        );
        const groups = readCacheFile<{"GroupId"?: string;
            "GroupName"?: string;}[]>(
            this.#cacheDir,
            "iam_user_groups.json"
        );
        const group = groups.find((g) => g.GroupName === groupName);
        if (!group?.GroupId) {

            return [];

        }
        const arns = map[group.GroupId] ?? [];
        return arns.map((arn) => ({"PolicyArn": arn,
            "PolicyName": arn.split("/").pop() ?? arn}));

    }

    async getMFADevices (_userName: string): Promise<MFADevice[]> {

        return [];

    }

    async getAccessKeys (_userName: string): Promise<AccessKeyMetadata[]> {

        return readCacheFile(
            this.#cacheDir,
            "iam_access_keys.json"
        );

    }

    async getServerCertificates (): Promise<ServerCertificateMetadata[]> {

        return readCacheFile(
            this.#cacheDir,
            "iam_server_certificates.json"
        );

    }

    async getSSHPublicKeys (_userName: string): Promise<SSHPublicKeyMetadata[]> {

        return [];

    }

    async getVirtualMFADevices (): Promise<VirtualMFADevice[]> {

        return readCacheFile(
            this.#cacheDir,
            "iam_virtual_mfa_devices.json"
        );

    }

    async getGroupsForUser (_userName: string): Promise<Group[]> {

        return readCacheFile(
            this.#cacheDir,
            "iam_groups_for_user.json"
        );

    }

    async getInstanceProfilesForRole (_roleName: string): Promise<InstanceProfile[]> {

        return [];

    }

    async getRolePolicies (_roleName: string): Promise<string[]> {

        return readCacheFile(
            this.#cacheDir,
            "iam_role_policies.json"
        );

    }

    async getUserPolicies (_userName: string): Promise<string[]> {

        return readCacheFile(
            this.#cacheDir,
            "iam_user_policies.json"
        );

    }

    async getGroupPolicies (_groupName: string): Promise<string[]> {

        return readCacheFile(
            this.#cacheDir,
            "iam_group_policies.json"
        );

    }

    async getGroupMembers (_groupName: string): Promise<User[]> {

        return [];

    }

}

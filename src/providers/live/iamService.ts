import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    IAMClient,
    type IAMClientConfig,
    type User,
    type Role,
    type Policy,
    type Group,
    type InstanceProfile,
    type AttachedPolicy,
    type MFADevice,
    type AccessKeyMetadata,
    type ServerCertificateMetadata,
    type SSHPublicKeyMetadata,
    type VirtualMFADevice,
    paginateListPolicies,
    paginateListRoles,
    paginateListUsers,
    paginateListGroups,
    paginateListInstanceProfiles,
    paginateListAttachedRolePolicies,
    paginateListAttachedUserPolicies,
    paginateListAttachedGroupPolicies,
    paginateListMFADevices,
    paginateListAccessKeys,
    paginateListServerCertificates,
    paginateListSSHPublicKeys,
    paginateListVirtualMFADevices,
    paginateListGroupsForUser,
    paginateListInstanceProfilesForRole,
    paginateListRolePolicies,
    paginateListUserPolicies,
    paginateListGroupPolicies,
    paginateGetGroup
}
    from "@aws-sdk/client-iam";

/*
 *  Available but not yet implemented:
 *  paginateGetAccountAuthorizationDetails,
 *  paginateListAccountAliases,
 *  paginateListEntitiesForPolicy,
 *  paginateListInstanceProfileTags,
 *  paginateListMFADeviceTags,
 *  paginateListOpenIDConnectProviderTags,
 *  paginateListPolicyTags,
 *  paginateListPolicyVersions,
 *  paginateListRoleTags,
 *  paginateListSAMLProviderTags,
 *  paginateListServerCertificateTags,
 *  paginateListSigningCertificates,
 *  paginateListUserTags,
 *  paginateSimulateCustomPolicy,
 *  paginateSimulatePrincipalPolicy,
 */
import type {Iam} from "../../interfaces/iam.js";

/**
 * Iam
 */
export class IamService implements Iam {

    #iamClient: IAMClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, logger?: SdkLogger) {

        const iamClientConfig: IAMClientConfig = {
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#iamClient = new IAMClient(iamClientConfig);

    }

    /**
     * Get the list of users
     * @return {User[]} the list of users
     */
    async getUsers (): Promise<User[]> {

        const client = this.#iamClient;
        const users = [];
        for await (const page of paginateListUsers(
            {client},
            {}
        )) {

            if (page.Users !== undefined) {

                users.push(...page.Users);

            }

        }
        return users;

    }

    /**
     * Get the list of roles
     * @return {Role[]} the list of roles
     */
    async getRoles (): Promise <Role[]> {

        const client = this.#iamClient;
        const roles = [];
        for await (const page of paginateListRoles(
            {client},
            { }
        )) {

            if (page.Roles !== undefined) {

                roles.push(...page.Roles);

            }

        }
        return roles;

    }

    /**
     * Get the list of policies
     * @return {Policy[]} the list of policies
     */
    async getPolicies (): Promise<Policy[]> {

        const client = this.#iamClient;
        const policies = [];
        for await (const page of paginateListPolicies(
            {client},
            {
                "Scope": "Local"
            }
        )) {

            if (page.Policies !== undefined) {

                policies.push(...page.Policies);

            }

        }
        return policies;

    }

    /**
     * Get the list of user groups
     * @return {Group[]} the list of user groups
     */
    async getUserGroups (): Promise<Group[]> {

        const client = this.#iamClient;
        const groups = [];
        for await (const page of paginateListGroups(
            {client},
            {}
        )) {

            if (page.Groups !== undefined) {

                groups.push(...page.Groups);

            }

        }
        return groups;

    }

    async getInstanceProfiles (): Promise<InstanceProfile[]> {

        const client = this.#iamClient;
        const profiles = [];
        for await (const page of paginateListInstanceProfiles(
            {client},
            {}
        )) {

            if (page.InstanceProfiles !== undefined) {

                profiles.push(...page.InstanceProfiles);

            }

        }
        return profiles;

    }

    async getAttachedRolePolicies (roleName: string): Promise<AttachedPolicy[]> {

        const client = this.#iamClient;
        const policies = [];
        for await (const page of paginateListAttachedRolePolicies(
            {client},
            {"RoleName": roleName}
        )) {

            if (page.AttachedPolicies !== undefined) {

                policies.push(...page.AttachedPolicies);

            }

        }
        return policies;

    }

    async getAttachedUserPolicies (userName: string): Promise<AttachedPolicy[]> {

        const client = this.#iamClient;
        const policies = [];
        for await (const page of paginateListAttachedUserPolicies(
            {client},
            {"UserName": userName}
        )) {

            if (page.AttachedPolicies !== undefined) {

                policies.push(...page.AttachedPolicies);

            }

        }
        return policies;

    }

    async getAttachedGroupPolicies (groupName: string): Promise<AttachedPolicy[]> {

        const client = this.#iamClient;
        const policies = [];
        for await (const page of paginateListAttachedGroupPolicies(
            {client},
            {"GroupName": groupName}
        )) {

            if (page.AttachedPolicies !== undefined) {

                policies.push(...page.AttachedPolicies);

            }

        }
        return policies;

    }

    async getMFADevices (userName: string): Promise<MFADevice[]> {

        const client = this.#iamClient;
        const devices = [];
        for await (const page of paginateListMFADevices(
            {client},
            {"UserName": userName}
        )) {

            if (page.MFADevices !== undefined) {

                devices.push(...page.MFADevices);

            }

        }
        return devices;

    }

    async getAccessKeys (userName: string): Promise<AccessKeyMetadata[]> {

        const client = this.#iamClient;
        const keys = [];
        for await (const page of paginateListAccessKeys(
            {client},
            {"UserName": userName}
        )) {

            if (page.AccessKeyMetadata !== undefined) {

                keys.push(...page.AccessKeyMetadata);

            }

        }
        return keys;

    }

    async getServerCertificates (): Promise<ServerCertificateMetadata[]> {

        const client = this.#iamClient;
        const certs = [];
        for await (const page of paginateListServerCertificates(
            {client},
            {}
        )) {

            if (page.ServerCertificateMetadataList !== undefined) {

                certs.push(...page.ServerCertificateMetadataList);

            }

        }
        return certs;

    }

    async getSSHPublicKeys (userName: string): Promise<SSHPublicKeyMetadata[]> {

        const client = this.#iamClient;
        const keys = [];
        for await (const page of paginateListSSHPublicKeys(
            {client},
            {"UserName": userName}
        )) {

            if (page.SSHPublicKeys !== undefined) {

                keys.push(...page.SSHPublicKeys);

            }

        }
        return keys;

    }

    async getVirtualMFADevices (): Promise<VirtualMFADevice[]> {

        const client = this.#iamClient;
        const devices = [];
        for await (const page of paginateListVirtualMFADevices(
            {client},
            {}
        )) {

            if (page.VirtualMFADevices !== undefined) {

                devices.push(...page.VirtualMFADevices);

            }

        }
        return devices;

    }

    async getGroupsForUser (userName: string): Promise<Group[]> {

        const client = this.#iamClient;
        const groups = [];
        for await (const page of paginateListGroupsForUser(
            {client},
            {"UserName": userName}
        )) {

            if (page.Groups !== undefined) {

                groups.push(...page.Groups);

            }

        }
        return groups;

    }

    async getInstanceProfilesForRole (roleName: string): Promise<InstanceProfile[]> {

        const client = this.#iamClient;
        const profiles = [];
        for await (const page of paginateListInstanceProfilesForRole(
            {client},
            {"RoleName": roleName}
        )) {

            if (page.InstanceProfiles !== undefined) {

                profiles.push(...page.InstanceProfiles);

            }

        }
        return profiles;

    }

    async getRolePolicies (roleName: string): Promise<string[]> {

        const client = this.#iamClient;
        const policyNames = [];
        for await (const page of paginateListRolePolicies(
            {client},
            {"RoleName": roleName}
        )) {

            if (page.PolicyNames !== undefined) {

                policyNames.push(...page.PolicyNames);

            }

        }
        return policyNames;

    }

    async getUserPolicies (userName: string): Promise<string[]> {

        const client = this.#iamClient;
        const policyNames = [];
        for await (const page of paginateListUserPolicies(
            {client},
            {"UserName": userName}
        )) {

            if (page.PolicyNames !== undefined) {

                policyNames.push(...page.PolicyNames);

            }

        }
        return policyNames;

    }

    async getGroupPolicies (groupName: string): Promise<string[]> {

        const client = this.#iamClient;
        const policyNames = [];
        for await (const page of paginateListGroupPolicies(
            {client},
            {"GroupName": groupName}
        )) {

            if (page.PolicyNames !== undefined) {

                policyNames.push(...page.PolicyNames);

            }

        }
        return policyNames;

    }

    async getGroupMembers (groupName: string): Promise<User[]> {

        const client = this.#iamClient;
        const users = [];
        for await (const page of paginateGetGroup(
            {client},
            {"GroupName": groupName}
        )) {

            if (page.Users !== undefined) {

                users.push(...page.Users);

            }

        }
        return users;

    }

}

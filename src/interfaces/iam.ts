import type {AccessKeyMetadata, AttachedPolicy, Group, InstanceProfile, MFADevice, Policy, Role, ServerCertificateMetadata, SSHPublicKeyMetadata, User, VirtualMFADevice} from "@aws-sdk/client-iam";

export interface Iam {
    getUsers (): Promise<User[]>;
    getRoles (): Promise<Role[]>;
    getPolicies (): Promise<Policy[]>;
    getUserGroups (): Promise<Group[]>;
    getInstanceProfiles (): Promise<InstanceProfile[]>;
    getAttachedRolePolicies (roleName: string): Promise<AttachedPolicy[]>;
    getAttachedUserPolicies (userName: string): Promise<AttachedPolicy[]>;
    getAttachedGroupPolicies (groupName: string): Promise<AttachedPolicy[]>;
    getMFADevices (userName: string): Promise<MFADevice[]>;
    getAccessKeys (userName: string): Promise<AccessKeyMetadata[]>;
    getServerCertificates (): Promise<ServerCertificateMetadata[]>;
    getSSHPublicKeys (userName: string): Promise<SSHPublicKeyMetadata[]>;
    getVirtualMFADevices (): Promise<VirtualMFADevice[]>;
    getGroupsForUser (userName: string): Promise<Group[]>;
    getInstanceProfilesForRole (roleName: string): Promise<InstanceProfile[]>;
    getRolePolicies (roleName: string): Promise<string[]>;
    getUserPolicies (userName: string): Promise<string[]>;
    getGroupPolicies (groupName: string): Promise<string[]>;
    getGroupMembers (groupName: string): Promise<User[]>;
}

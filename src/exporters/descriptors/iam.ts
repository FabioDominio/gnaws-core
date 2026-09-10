import {describe, boolStr} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const iamDescriptors: DescriptorGroup = [

    describe({
        "resourceType": "group",
        "scope": "global",
        "list": (inv) => inv.getUserGroups(),
        "id": (g) => g.GroupId,
        "name": (g) => g.GroupName,
        "columns": [
            {"label": "Path",
                "value": (g) => g.Path},
            {"label": "Created",
                "value": (g) => g.CreateDate?.toISOString()}
        ]
    }),
    describe({
        "resourceType": "user",
        "scope": "global",
        "list": (inv) => inv.getUsers(),
        "id": (u) => u.UserId,
        "name": (u) => u.UserName,
        "tags": (u) => u.Tags,
        "columns": [
            {"label": "Path",
                "value": (u) => u.Path},
            {"label": "Created",
                "value": (u) => u.CreateDate?.toISOString()},
            {"label": "Password Last Used",
                "value": (u) => u.PasswordLastUsed?.toISOString()}
        ]
    }),
    describe({
        "resourceType": "role",
        "scope": "global",
        "list": (inv) => inv.getRoles(),
        "id": (r) => r.RoleId,
        "name": (r) => r.RoleName,
        "tags": (r) => r.Tags,
        "columns": [
            {"label": "Path",
                "value": (r) => r.Path},
            {"label": "Created",
                "value": (r) => r.CreateDate?.toISOString()},
            {"label": "Description",
                "value": (r) => r.Description}
        ]
    }),
    describe({
        "resourceType": "policy",
        "scope": "global",
        "list": (inv) => inv.getPolicies(),
        "id": (p) => p.PolicyId,
        "name": (p) => p.PolicyName,
        "tags": (p) => p.Tags,
        "columns": [
            {"label": "Path",
                "value": (p) => p.Path},
            {"label": "Attachments",
                "value": (p) => p.AttachmentCount?.toString()},
            {"label": "Attachable",
                "value": (p) => boolStr(p.IsAttachable)},
            {"label": "Created",
                "value": (p) => p.CreateDate?.toISOString()}
        ]
    }),
    describe({
        "resourceType": "instanceprofile",
        "scope": "global",
        "list": (inv) => inv.getInstanceProfiles(),
        "id": (p) => p.InstanceProfileId,
        "name": (p) => p.InstanceProfileName,
        "columns": [
            {"label": "Path",
                "value": (p) => p.Path},
            {"label": "Created",
                "value": (p) => p.CreateDate?.toISOString()}
        ]
    }),
    describe({
        "resourceType": "mfadevice",
        "scope": "global",
        "list": (inv) => inv.getMfaDevices(),
        "id": (m) => m.SerialNumber,
        "name": (m) => m.SerialNumber,
        "columns": [
            {"label": "User",
                "value": (m) => m.UserName},
            {"label": "Enabled",
                "value": (m) => m.EnableDate?.toISOString()}
        ]
    }),
    describe({
        "resourceType": "accesskey",
        "scope": "global",
        "list": (inv) => inv.getAccessKeys(),
        "id": (k) => k.AccessKeyId,
        "name": (k) => k.AccessKeyId,
        "columns": [
            {"label": "User",
                "value": (k) => k.UserName},
            {"label": "Status",
                "value": (k) => k.Status},
            {"label": "Created",
                "value": (k) => k.CreateDate?.toISOString()}
        ]
    }),
    describe({
        "resourceType": "sshpublickey",
        "scope": "global",
        "list": (inv) => inv.getSshPublicKeys(),
        "id": (k) => k.SSHPublicKeyId,
        "name": (k) => k.SSHPublicKeyId,
        "columns": [
            {"label": "User",
                "value": (k) => k.UserName},
            {"label": "Uploaded",
                "value": (k) => k.UploadDate?.toISOString()}
        ]
    }),
    describe({
        "resourceType": "servercertificate",
        "scope": "global",
        "list": (inv) => inv.getServerCertificates(),
        "id": (c) => c.ServerCertificateId,
        "name": (c) => c.ServerCertificateName,
        "columns": [
            {"label": "Path",
                "value": (c) => c.Path},
            {"label": "Uploaded",
                "value": (c) => c.UploadDate?.toISOString()},
            {"label": "Expiration",
                "value": (c) => c.Expiration?.toISOString()}
        ]
    }),
    describe({
        "resourceType": "virtualmfadevice",
        "scope": "global",
        "list": (inv) => inv.getVirtualMfaDevices(),
        "id": (m) => m.SerialNumber,
        "name": (m) => m.SerialNumber,
        "columns": [
            {"label": "User",
                "value": (m) => m.User?.UserName},
            {"label": "Enabled",
                "value": (m) => m.EnableDate?.toISOString()}
        ]
    })

];

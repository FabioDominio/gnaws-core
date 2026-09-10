import {describe, boolStr} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const organizationsDescriptors: DescriptorGroup = [

    describe({
        "resourceType": "orgroot",
        "scope": "global",
        "list": (inv) => inv.getOrgRoots(),
        "id": (r) => r.Id,
        "name": (r) => r.Name ?? r.Id,
        "columns": [
            {"label": "ARN",
                "value": (r) => r.Arn}
        ]
    }),
    describe({
        "resourceType": "orgou",
        "scope": "global",
        "list": (inv) => inv.getOrgOUs(),
        "id": (ou) => ou.ou.Id,
        "name": (ou) => ou.ou.Name ?? ou.ou.Id,
        "columns": [
            {"label": "Parent ID",
                "value": (ou) => ou.parentId},
            {"label": "ARN",
                "value": (ou) => ou.ou.Arn}
        ]
    }),
    describe({
        "resourceType": "orgaccount",
        "scope": "global",
        "list": (inv) => inv.getOrgAccounts(),
        "id": (a) => a.Id,
        "name": (a) => a.Name ?? a.Id,
        "columns": [
            {"label": "Email",
                "value": (a) => a.Email},
            {"label": "State",
                "value": (a) => a.State},
            {"label": "Joined",
                "value": (a) => a.JoinedTimestamp?.toISOString()}
        ]
    }),
    describe({
        "resourceType": "orgpolicy",
        "scope": "global",
        "list": (inv) => inv.getOrgPolicies(),
        "id": (p) => p.Id,
        "name": (p) => p.Name ?? p.Id,
        "columns": [
            {"label": "Type",
                "value": (p) => p.Type},
            {"label": "AWS Managed",
                "value": (p) => boolStr(p.AwsManaged)},
            {"label": "Description",
                "value": (p) => p.Description}
        ]
    })

];

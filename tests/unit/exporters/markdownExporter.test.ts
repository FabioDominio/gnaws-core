import {mkdtempSync, readFileSync, rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {describe, it, expect, afterEach} from "vitest";
import {MarkdownExporter} from "../../../src/exporters/markdownExporter.js";
import {resourceDescriptors} from "../../../src/exporters/resourceDescriptors.js";
import type {Inventory} from "../../../src/inventory.js";

/**
 * Build a fake Inventory that returns `[]` for every `getXxx()` getter by
 * default, overriding only the getters supplied in `overrides`. A Proxy lets
 * the exporter call any of its ~100 descriptor getters without stubbing each.
 */
function fakeInventory (
    regions: string[],
    overrides: Record<string, (region: string) => unknown[]>
): Inventory {

    const base: Record<string, unknown> = {
        "getAccountRegions": () => regions.map((name) => ({"RegionName": name,
            "RegionOptStatus": "ENABLED_BY_DEFAULT"}))
    };

    return new Proxy(
        base,
        {
            "get": (target, prop: string) => {

                if (prop in target) {

                    return target[prop];

                }

                if (prop in overrides) {

                    return overrides[prop];

                }

                return () => [];

            }
        }
    ) as unknown as Inventory;

}

const tmpDirs: string[] = [];

/**
 * Recover the inventory getter name a descriptor's `list` calls, by invoking
 * it against a recording proxy.
 */
function getterNameOf (list: (inv: Inventory, region: string) => unknown[]): string | undefined {

    const recorded: string[] = [];
    const recorder = new Proxy(
        {},
        {"get": (_t, prop: string) => {

            recorded.push(prop);
            return () => [];

        }}
    ) as unknown as Inventory;
    list(
        recorder,
        "eu-west-1"
    );
    return recorded[0];

}

/**
 * Minimal stub resource that satisfies the id/name accessors of the global
 * descriptors, including the two with nested access (`orgou` → `ou.ou.Id`,
 * `s3bucket` → `b.bucket.Name`). One object covers all global shapes because
 * the field names do not collide.
 */
function stubResource (): unknown {

    return {
        "Id": "id",
        "Name": "name",
        "ARN": "arn",
        "GroupId": "gid",
        "GroupName": "gname",
        "UserId": "uid",
        "UserName": "uname",
        "RoleId": "rid",
        "RoleName": "rname",
        "PolicyId": "pid",
        "PolicyName": "pname",
        "InstanceProfileId": "ipid",
        "InstanceProfileName": "ipname",
        "SerialNumber": "serial",
        "AccessKeyId": "akid",
        "SSHPublicKeyId": "sshid",
        "ServerCertificateId": "scid",
        "ServerCertificateName": "scname",
        "AcceleratorArn": "acc-arn",
        "EndpointGroupArn": "eg-arn",
        "GlobalNetworkId": "gn-id",
        "CoreNetworkArn": "cn-arn",
        "DomainName": "dom",
        "FunctionMetadata": {"FunctionARN": "fn-arn"},
        "OriginAccessControlConfig": {"Name": "oac"},
        "ou": {"Id": "ou-id",
            "Name": "ou-name"},
        "bucket": {"Name": "bucket-name"},
        "region": "eu-west-1"
    };

}

function exportToString (inventory: Inventory): string {

    const dir = mkdtempSync(join(
        tmpdir(),
        "gnaws-md-"
    ));
    tmpDirs.push(dir);
    const out = join(
        dir,
        "inventory.md"
    );
    new MarkdownExporter().export(
        out,
        inventory
    );
    return readFileSync(
        out,
        "utf8"
    );

}

afterEach(() => {

    while (tmpDirs.length > 0) {

        const dir = tmpDirs.pop();
        if (dir) {

            rmSync(
                dir,
                {"recursive": true,
                    "force": true}
            );

        }

    }

});

describe(
    "MarkdownExporter",
    () => {

        it(
            "writes the top-level heading and a Global section",
            () => {

                const md = exportToString(fakeInventory(
                    ["eu-west-1"],
                    {}
                ));
                expect(md).toContain("# AWS resources");
                expect(md).toContain("## Global");
                expect(md).toContain("## Region eu-west-1");

            }
        );

        it(
            "renders a global resource as its own table under Global",
            () => {

                const md = exportToString(fakeInventory(
                    ["eu-west-1"],
                    {"getRoles": () => [
                        {"RoleId": "AROA1",
                            "RoleName": "my-role"}
                    ]}
                ));
                expect(md).toContain("#### role (1)");

                /*
                 * Every table leads with Id|Name and ends with Tags; role also
                 * declares extra columns in between.
                 */
                expect(md).toMatch(/\|Id\|Name\|.*\|Tags\|/u);
                expect(md).toContain("|AROA1|my-role|");

            }
        );

        it(
            "renders a regional resource under its region with flattened tags",
            () => {

                const md = exportToString(fakeInventory(
                    ["eu-west-1"],
                    {"getSecretsByRegion": () => [
                        {"ARN": "arn:aws:secretsmanager:eu-west-1:1:secret:s",
                            "Name": "s",
                            "Tags": [
                                {"Key": "zeta",
                                    "Value": "1"},
                                {"Key": "alpha",
                                    "Value": "2"}
                            ]}
                    ]}
                ));
                expect(md).toContain("## Region eu-west-1");
                expect(md).toContain("#### secret (1)");

                /*
                 * Tags flatten deterministically (localeCompare: alpha < zeta)
                 * and always render as the final column. secret also declares
                 * extra columns (empty here), so match id|name at the start and
                 * the flattened tags at the end of the row.
                 */
                expect(md).toContain("|arn:aws:secretsmanager:eu-west-1:1:secret:s|s|");
                expect(md).toMatch(/\|arn:aws:secretsmanager:eu-west-1:1:secret:s\|s\|.*\|alpha=2; zeta=1\|/u);

            }
        );

        it(
            "omits tables for resource types with no resources",
            () => {

                const md = exportToString(fakeInventory(
                    ["eu-west-1"],
                    {}
                ));
                // No resources anywhere -> no per-type tables at all.
                expect(md).not.toContain("####");

            }
        );

        it(
            "escapes pipe characters in cells",
            () => {

                const md = exportToString(fakeInventory(
                    ["eu-west-1"],
                    {"getRoles": () => [
                        {"RoleId": "a|b",
                            "RoleName": "c|d"}
                    ]}
                ));
                expect(md).toContain("|a\\|b|c\\|d||");

            }
        );

        it(
            "renders descriptor extra columns between Name and Tags",
            () => {

                const md = exportToString(fakeInventory(
                    ["eu-west-1"],
                    {"getInstancesByRegion": () => [
                        {"InstanceId": "i-1",
                            "InstanceType": "t3.micro",
                            "State": {"Name": "running"},
                            "PrivateIpAddress": "10.0.0.5",
                            "SubnetId": "subnet-9",
                            "Tags": [
                                {"Key": "Name",
                                    "Value": "web"}
                            ]}
                    ]}
                ));
                // Header carries the extra column labels in order.
                expect(md).toContain("|Id|Name|Type|State|Private IP|Subnet ID|Tags|");
                // Row carries the extra values in the same order.
                expect(md).toContain("|i-1|web|t3.micro|running|10.0.0.5|subnet-9|Name=web|");

            }
        );

        it(
            "always leads with Id|Name and ends every table header with Tags",
            () => {

                /*
                 * Now that every descriptor declares extra columns, the base
                 * still holds: Id and Name are the first two columns and Tags is
                 * always the last. Render a couple of types and check headers.
                 */
                const md = exportToString(fakeInventory(
                    ["eu-west-1"],
                    {"getRoles": () => [
                        {"RoleId": "AROA1",
                            "RoleName": "my-role"}
                    ],
                    "getKeysByRegion": () => [
                        {"KeyArn": "arn:aws:kms:eu-west-1:1:key/k",
                            "KeyId": "k"}
                    ]}
                ));

                const headers = [...md.matchAll(/^\|Id\|Name\|.*\|Tags\|$/gmu)];
                // At least the two rendered types produced a well-formed header.
                expect(headers.length).toBeGreaterThanOrEqual(2);
                expect(md).toContain("|AROA1|my-role|");

            }
        );

        it(
            "uses uniform label casing across every descriptor column",
            () => {

                /*
                 * Guards casing consistency for the ~150 descriptors' columns:
                 * each whitespace-separated word must be either an all-caps
                 * acronym/unit token or a Title Case word (leading uppercase).
                 * Parenthesised unit qualifiers like "(GB)", "(bytes)", "(s)",
                 * "(days)" and a trailing "%" are allowed. This fails if a new
                 * descriptor introduces a lowercase-first or mixed-case label.
                 */
                const allowedAcronyms = new Set([
                    "ARN",
                    "ID",
                    "IP",
                    "VPC",
                    "AZ",
                    "CIDR",
                    "DNS",
                    "KMS",
                    "HSM",
                    "AMI",
                    "API",
                    "URL",
                    "URI",
                    "S3",
                    "ASG",
                    "ENI",
                    "CA",
                    "AWS",
                    "DB"
                ]);

                const isTitleWord = (word: string): boolean => {

                    // Strip a parenthesised unit qualifier and a trailing percent.
                    const bare = word.
                        replace(
                            /\(.*\)$/u,
                            ""
                        ).
                        replace(
                            /%$/u,
                            ""
                        );
                    if (bare === "") {

                        return true;

                    }
                    if (allowedAcronyms.has(bare)) {

                        return true;

                    }
                    // Title Case: leading uppercase letter, no all-lowercase word.
                    return (/^[A-Z][A-Za-z0-9-]*$/u).test(bare);

                };

                const offenders: string[] = [];
                for (const descriptor of resourceDescriptors) {

                    for (const column of descriptor.columns ?? []) {

                        const words = column.label.split(" ");
                        if (!words.every(isTitleWord)) {

                            offenders.push(`${descriptor.resourceType}: "${column.label}"`);

                        }

                    }

                }

                expect(offenders).toEqual([]);

            }
        );

        it(
            "gives every column a non-empty, unique-per-type label",
            () => {

                const offenders: string[] = [];
                for (const descriptor of resourceDescriptors) {

                    const labels = (descriptor.columns ?? []).map((column) => column.label);
                    for (const label of labels) {

                        if (label.trim() === "") {

                            offenders.push(`${descriptor.resourceType}: empty label`);

                        }

                    }
                    if (new Set(labels).size !== labels.length) {

                        offenders.push(`${descriptor.resourceType}: duplicate column labels`);

                    }

                }

                expect(offenders).toEqual([]);

            }
        );

        it(
            "renders newly-populated columns for a service type (ElastiCache)",
            () => {

                const md = exportToString(fakeInventory(
                    ["eu-west-1"],
                    {"getCacheClustersByRegion": () => [
                        {"ARN": "arn:aws:elasticache:eu-west-1:1:cluster:c",
                            "CacheClusterId": "c",
                            "Engine": "redis",
                            "CacheNodeType": "cache.t3.micro",
                            "CacheClusterStatus": "available"}
                    ]}
                ));
                expect(md).toContain("#### cachecluster (1)");
                // Engine / Node Type / Status columns were populated for this type.
                expect(md).toContain("Engine");
                expect(md).toContain("redis");
                expect(md).toContain("cache.t3.micro");
                expect(md).toContain("available");

            }
        );

        it(
            "is driven by the shared descriptor table (non-empty, unique types)",
            () => {

                /*
                 * CsvExporter and MarkdownExporter both import this same array,
                 * so covering "the same resources" is guaranteed by construction.
                 * Guard that the shared table is substantial and has unique keys.
                 */
                expect(resourceDescriptors.length).toBeGreaterThan(100);
                const types = resourceDescriptors.map((desc) => desc.resourceType);
                expect(new Set(types).size).toBe(types.length);

            }
        );

        it(
            "renders every global descriptor type when each has a resource",
            () => {

                /*
                 * Global descriptors have simple, safe accessors; give each one a
                 * stub resource and assert every global type renders a table.
                 */
                const globals = resourceDescriptors.filter((desc) => desc.scope === "global");
                const overrides: Record<string, (region: string) => unknown[]> = {};

                for (const descriptor of globals) {

                    const getter = getterNameOf(descriptor.list);
                    if (getter) {

                        overrides[getter] = () => [stubResource()];

                    }

                }

                const md = exportToString(fakeInventory(
                    ["eu-west-1"],
                    overrides
                ));

                for (const descriptor of globals) {

                    expect(md).toContain(`#### ${descriptor.resourceType} (`);

                }

            }
        );

    }
);

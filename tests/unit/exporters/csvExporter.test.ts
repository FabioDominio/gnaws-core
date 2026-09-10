import {mkdtempSync, readFileSync, rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {describe, it, expect, afterEach} from "vitest";
import {CsvExporter} from "../../../src/exporters/csvExporter.js";
import type {Inventory} from "../../../src/inventory.js";

/**
 * Build a fake Inventory that returns `[]` for every `getXxx()` getter by
 * default, overriding only the getters supplied in `overrides`. A Proxy is
 * used so the exporter can call any of its ~100 descriptor getters without
 * each one being stubbed explicitly.
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

                // Any other getter yields no resources.
                return () => [];

            }
        }
    ) as unknown as Inventory;

}

const tmpDirs: string[] = [];

function exportToString (inventory: Inventory): string {

    const dir = mkdtempSync(join(
        tmpdir(),
        "gnaws-csv-"
    ));
    tmpDirs.push(dir);
    const out = join(
        dir,
        "inventory.csv"
    );
    new CsvExporter().export(
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
    "CsvExporter",
    () => {

        it(
            "writes the canonical header row",
            () => {

                const csv = exportToString(fakeInventory(
                    ["eu-west-1"],
                    {}
                ));
                const lines = csv.split("\n");
                expect(lines[0]).toBe("region,resource_type,id,name,tags");

            }
        );

        it(
            "emits an empty inventory as header only (with trailing newline)",
            () => {

                const csv = exportToString(fakeInventory(
                    ["eu-west-1"],
                    {}
                ));
                expect(csv).toBe("region,resource_type,id,name,tags\n");

            }
        );

        it(
            "emits a global resource with region 'global' and no tags",
            () => {

                const csv = exportToString(fakeInventory(
                    ["eu-west-1"],
                    {"getRoles": () => [
                        {"RoleId": "AROA123",
                            "RoleName": "my-role"}
                    ]}
                ));
                expect(csv).toContain("global,role,AROA123,my-role,\n");

            }
        );

        it(
            "emits a regional resource under its region",
            () => {

                const csv = exportToString(fakeInventory(
                    [
                        "eu-west-1",
                        "us-east-1"
                    ],
                    {"getVpcsByRegion": (region) => {

                        if (region !== "us-east-1") {

                            return [];

                        }

                        return [
                            {"VpcId": "vpc-1",
                                "Tags": [
                                    {"Key": "Name",
                                        "Value": "prod"}
                                ]}
                        ];

                    }}
                ));
                expect(csv).toContain("us-east-1,vpc,vpc-1,prod,Name=prod\n");
                // Not emitted for the region with no VPCs.
                expect(csv).not.toContain("eu-west-1,vpc,");

            }
        );

        it(
            "flattens tags deterministically, sorted by key",
            () => {

                const csv = exportToString(fakeInventory(
                    ["eu-west-1"],
                    {"getInstancesByRegion": () => [
                        {"InstanceId": "i-1",
                            "Tags": [
                                {"Key": "zeta",
                                    "Value": "1"},
                                {"Key": "alpha",
                                    "Value": "2"},
                                {"Key": "Name",
                                    "Value": "web"}
                            ]}
                    ]}
                ));
                // Sorted by key via localeCompare: alpha < Name < zeta.
                expect(csv).toContain("eu-west-1,instance,i-1,web,alpha=2; Name=web; zeta=1\n");

            }
        );

        it(
            "RFC 4180-escapes fields containing comma, quote, or newline",
            () => {

                const csv = exportToString(fakeInventory(
                    ["eu-west-1"],
                    {"getRoles": () => [
                        {"RoleId": "id,with,commas",
                            "RoleName": "quote\"inside",
                            "Tags": [
                                {"Key": "note",
                                    "Value": "line\nbreak"}
                            ]}
                    ]}
                ));

                /*
                 * id has commas -> quoted; name has a quote -> quoted+doubled;
                 * tag value has newline -> whole tags field quoted.
                 */
                expect(csv).toContain("global,role,\"id,with,commas\",\"quote\"\"inside\",\"note=line\nbreak\"\n");

            }
        );

        it(
            "converts SQS record-shaped tags to key=value pairs",
            () => {

                const csv = exportToString(fakeInventory(
                    ["eu-west-1"],
                    {"getQueuesByRegion": () => [
                        {"queueArn": "arn:aws:sqs:eu-west-1:1:q",
                            "queueName": "q",
                            "tags": {"env": "prod",
                                "team": "core"}}
                    ]}
                ));
                expect(csv).toContain("eu-west-1,sqsqueue,arn:aws:sqs:eu-west-1:1:q,q,env=prod; team=core\n");

            }
        );

        it(
            "converts ECS lowercase {key,value} tags to key=value pairs",
            () => {

                const csv = exportToString(fakeInventory(
                    ["eu-west-1"],
                    {"getEcsClustersByRegion": () => [
                        {"clusterArn": "arn:aws:ecs:eu-west-1:1:cluster/c",
                            "clusterName": "c",
                            "tags": [
                                {"key": "env",
                                    "value": "prod"}
                            ]}
                    ]}
                ));
                expect(csv).toContain("eu-west-1,ecscluster,arn:aws:ecs:eu-west-1:1:cluster/c,c,env=prod\n");

            }
        );

        it(
            "ignores descriptor extra columns — rows stay 5 fields",
            () => {

                /*
                 * instance declares extra columns (Type/State/…); CSV must still
                 * emit exactly region,resource_type,id,name,tags with no extras.
                 */
                const csv = exportToString(fakeInventory(
                    ["eu-west-1"],
                    {"getInstancesByRegion": () => [
                        {"InstanceId": "i-1",
                            "InstanceType": "t3.micro",
                            "State": {"Name": "running"},
                            "PrivateIpAddress": "10.0.0.5",
                            "Tags": [
                                {"Key": "Name",
                                    "Value": "web"}
                            ]}
                    ]}
                ));

                const row = csv.split("\n").find((line) => line.startsWith("eu-west-1,instance,"));
                expect(row).toBeDefined();
                // Exactly 5 comma-separated fields; no InstanceType/State leaked in.
                expect(row).toBe("eu-west-1,instance,i-1,web,Name=web");
                expect(csv).not.toContain("t3.micro");
                expect(csv).not.toContain("running");

            }
        );

        it(
            "places a global S3 bucket under its own region via regionOf",
            () => {

                const csv = exportToString(fakeInventory(
                    ["eu-west-1"],
                    {"getBuckets": () => [
                        {"bucket": {"Name": "my-bucket"},
                            "region": "us-east-1",
                            "tags": [
                                {"Key": "Name",
                                    "Value": "my-bucket"}
                            ]}
                    ]}
                ));
                expect(csv).toContain("us-east-1,s3bucket,my-bucket,my-bucket,Name=my-bucket\n");

            }
        );

    }
);

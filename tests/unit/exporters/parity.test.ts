import {mkdtempSync, readFileSync, rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {describe, it, expect, afterEach} from "vitest";
import {CsvExporter} from "../../../src/exporters/csvExporter.js";
import {MarkdownExporter} from "../../../src/exporters/markdownExporter.js";
import type {Inventory} from "../../../src/inventory.js";

/**
 * Fake Inventory returning `[]` for every getter except the overrides.
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

function exportBoth (inventory: Inventory): {"csv": string;
    "md": string;} {

    const dir = mkdtempSync(join(
        tmpdir(),
        "gnaws-parity-"
    ));
    tmpDirs.push(dir);
    const csvPath = join(
        dir,
        "out.csv"
    );
    const mdPath = join(
        dir,
        "out.md"
    );
    new CsvExporter().export(
        csvPath,
        inventory
    );
    new MarkdownExporter().export(
        mdPath,
        inventory
    );
    return {"csv": readFileSync(
        csvPath,
        "utf8"
    ),
    "md": readFileSync(
        mdPath,
        "utf8"
    )};

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
    "CSV/Markdown exporter parity",
    () => {

        it(
            "both exporters emit the same set of resource types for one inventory",
            () => {

                // A mixed inventory spanning global + regional, tagged + not.
                const {csv, md} = exportBoth(fakeInventory(
                    ["eu-west-1"],
                    {
                        "getRoles": () => [
                            {"RoleId": "AROA1",
                                "RoleName": "r"}
                        ],
                        "getBuckets": () => [
                            {"bucket": {"Name": "b"},
                                "region": "eu-west-1"}
                        ],
                        "getVpcsByRegion": () => [
                            {"VpcId": "vpc-1",
                                "CidrBlock": "10.0.0.0/16"}
                        ],
                        "getInstancesByRegion": () => [
                            {"InstanceId": "i-1",
                                "InstanceType": "t3.micro"}
                        ],
                        "getSecretsByRegion": () => [
                            {"ARN": "arn:secret",
                                "Name": "s"}
                        ]
                    }
                ));

                // resourceTypes present in CSV rows (skip header line).
                const csvTypes = new Set(csv.split("\n").
                    slice(1).
                    filter((line) => line.length > 0).
                    map((line) => line.split(",")[1]));

                // resourceTypes present as Markdown tables.
                const mdTypes = new Set([...md.matchAll(/^#### (\S+) \(/gmu)].map((match) => match[1]));

                expect(csvTypes).toEqual(mdTypes);
                // Sanity: the five seeded types are all present.
                expect(csvTypes).toEqual(new Set([
                    "role",
                    "s3bucket",
                    "vpc",
                    "instance",
                    "secret"
                ]));

            }
        );

        it(
            "both exporters agree on id, name, and flattened tags per resource",
            () => {

                const {csv, md} = exportBoth(fakeInventory(
                    ["eu-west-1"],
                    {"getInstancesByRegion": () => [
                        {"InstanceId": "i-1",
                            "Tags": [
                                {"Key": "zeta",
                                    "Value": "1"},
                                {"Key": "alpha",
                                    "Value": "2"}
                            ]}
                    ]}
                ));

                // CSV: region,instance,i-1,<name>,alpha=2; zeta=1
                const csvRow = csv.split("\n").find((line) => line.startsWith("eu-west-1,instance,"));
                expect(csvRow).toBe("eu-west-1,instance,i-1,,alpha=2; zeta=1");

                /*
                 * Markdown row for the same resource: id=i-1, tags flattened
                 * identically, as the final column.
                 */
                expect(md).toContain("|i-1|");
                expect(md).toMatch(/\|i-1\|.*\|alpha=2; zeta=1\|/u);

            }
        );

    }
);

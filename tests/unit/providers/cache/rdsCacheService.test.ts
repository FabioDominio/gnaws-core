import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {RdsCacheService} from "../../../../src/providers/cache/rdsCacheService.js";

describe(
    "RdsCacheService",
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
            {"method": "getDBInstances",
                "file": "rds_instances.json",
                "data": [
                    {"DBInstanceIdentifier": "mydb",
                        "Engine": "postgres"}
                ]},
            {"method": "getDBClusters",
                "file": "rds_clusters.json",
                "data": [
                    {"DBClusterIdentifier": "my-cluster",
                        "Engine": "aurora-postgresql"}
                ]},
            {"method": "getDBProxies",
                "file": "rds_proxies.json",
                "data": [{"DBProxyName": "my-proxy"}]},
            {"method": "getDBSubnetGroups",
                "file": "rds_subnet_groups.json",
                "data": [{"DBSubnetGroupName": "default"}]},
            {"method": "getDBProxyTargetGroups",
                "file": "rds_proxy_target_groups.json",
                "data": [{"TargetGroupName": "default"}],
                "args": ["my-proxy"]}
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
                    const service = new RdsCacheService(tmpDir);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
                    const result = await (service[method] as any)(...args);
                    expect(result).toEqual(data);

                }
            );

            it(
                `${method} returns empty array for missing file`,
                async () => {

                    const service = new RdsCacheService(tmpDir);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
                    const result = await (service[method] as any)(...args);
                    expect(result).toEqual([]);

                }
            );

        }

    }
);

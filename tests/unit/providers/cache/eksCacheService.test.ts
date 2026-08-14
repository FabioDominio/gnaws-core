import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {EksCacheService} from "../../../../src/providers/cache/eksCacheService.js";

describe(
    "EksCacheService",
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
            {"method": "getClusters",
                "file": "eks_clusters.json",
                "data": [
                    {"name": "my-cluster",
                        "arn": "arn:aws:eks:us-east-1:123:cluster/my-cluster"}
                ]},
            {"method": "getNodegroups",
                "file": "eks_nodegroups.json",
                "data": [
                    {"nodegroupName": "ng-1",
                        "clusterName": "my-cluster"}
                ],
                "args": ["my-cluster"]},
            {"method": "getFargateProfiles",
                "file": "eks_fargate_profiles.json",
                "data": [
                    {"fargateProfileName": "fp-1",
                        "clusterName": "my-cluster"}
                ],
                "args": ["my-cluster"]},
            {"method": "getPodIdentityAssociations",
                "file": "eks_pod_identity_associations.json",
                "data": [{"associationId": "a-1"}],
                "args": ["my-cluster"]},
            {"method": "getAddons",
                "file": "eks_addons.json",
                "data": [{"addonName": "vpc-cni"}],
                "args": ["my-cluster"]},
            {"method": "getAccessEntries",
                "file": "eks_access_entries.json",
                "data": [{"principalArn": "arn:aws:iam::123:role/admin"}],
                "args": ["my-cluster"]}
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
                    const service = new EksCacheService(tmpDir);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
                    const result = await (service[method] as any)(...args);
                    expect(result).toEqual(data);

                }
            );

            it(
                `${method} returns empty array for missing file`,
                async () => {

                    const service = new EksCacheService(tmpDir);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
                    const result = await (service[method] as any)(...args);
                    expect(result).toEqual([]);

                }
            );

        }

        it(
            "getAssociatedAccessPolicies returns empty array (hardcoded)",
            async () => {

                const service = new EksCacheService(tmpDir);
                const result = await service.getAssociatedAccessPolicies(
                    "my-cluster",
                    "arn:aws:iam::123:role/admin"
                );
                expect(result).toEqual([]);

            }
        );

    }
);

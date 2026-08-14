import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {Elbv2CacheService} from "../../../../src/providers/cache/elbv2CacheService.js";

describe(
    "Elbv2CacheService",
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
            {"method": "getLoadBalancers",
                "file": "elbv2_load_balancers.json",
                "data": [{"LoadBalancerArn": "arn:aws:elasticloadbalancing:us-east-1:123:loadbalancer/app/my-lb/abc"}]},
            {"method": "getTargetGroups",
                "file": "elbv2_target_groups.json",
                "data": [{"TargetGroupArn": "arn:aws:elasticloadbalancing:us-east-1:123:targetgroup/my-tg/abc"}]},
            {"method": "getListeners",
                "file": "elbv2_listeners.json",
                "data": [{"ListenerArn": "arn:aws:elasticloadbalancing:us-east-1:123:listener/app/my-lb/abc/def"}],
                "args": ["arn:lb"]},
            {"method": "getRules",
                "file": "elbv2_rules.json",
                "data": [{"RuleArn": "arn:rule-1"}],
                "args": ["arn:listener"]},
            {"method": "getListenerCertificates",
                "file": "elbv2_listener_certificates.json",
                "data": [{"CertificateArn": "arn:acm:cert-1"}],
                "args": ["arn:listener"]},
            {"method": "getTrustStores",
                "file": "elbv2_trust_stores.json",
                "data": [{"TrustStoreArn": "arn:ts-1"}]}
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
                    const service = new Elbv2CacheService(tmpDir);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
                    const result = await (service[method] as any)(...args);
                    expect(result).toEqual(data);

                }
            );

            it(
                `${method} returns empty array for missing file`,
                async () => {

                    const service = new Elbv2CacheService(tmpDir);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
                    const result = await (service[method] as any)(...args);
                    expect(result).toEqual([]);

                }
            );

        }

        it(
            "getTrustStoreAssociations returns empty array (hardcoded)",
            async () => {

                const service = new Elbv2CacheService(tmpDir);
                const result = await service.getTrustStoreAssociations("arn:ts-1");
                expect(result).toEqual([]);

            }
        );

        it(
            "getTagsForResources returns empty array (hardcoded)",
            async () => {

                const service = new Elbv2CacheService(tmpDir);
                const result = await service.getTagsForResources(["arn:lb-1"]);
                expect(result).toEqual([]);

            }
        );

    }
);

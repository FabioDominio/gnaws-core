import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {Route53ResolverCacheService} from "../../../../src/providers/cache/route53ResolverCacheService.js";

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

describe(
    "Route53ResolverCacheService",
    () => {

        it(
            "getResolverEndpoints reads route53resolver_endpoints.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "route53resolver_endpoints.json"
                    ),
                    JSON.stringify([{"Id": "rslvr-in-1"}])
                );
                const service = new Route53ResolverCacheService(tmpDir);
                expect(await service.getResolverEndpoints()).toEqual([{"Id": "rslvr-in-1"}]);

            }
        );

        it(
            "getResolverEndpoints returns empty for missing file",
            async () => {

                const service = new Route53ResolverCacheService(tmpDir);
                expect(await service.getResolverEndpoints()).toEqual([]);

            }
        );

        it(
            "getResolverRules reads route53resolver_rules.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "route53resolver_rules.json"
                    ),
                    JSON.stringify([{"Id": "rslvr-rr-1"}])
                );
                const service = new Route53ResolverCacheService(tmpDir);
                expect(await service.getResolverRules()).toEqual([{"Id": "rslvr-rr-1"}]);

            }
        );

        it(
            "getResolverRules returns empty for missing file",
            async () => {

                const service = new Route53ResolverCacheService(tmpDir);
                expect(await service.getResolverRules()).toEqual([]);

            }
        );

        it(
            "getResolverRuleAssociations reads route53resolver_rule_associations.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "route53resolver_rule_associations.json"
                    ),
                    JSON.stringify([{"Id": "rslvr-rrassoc-1"}])
                );
                const service = new Route53ResolverCacheService(tmpDir);
                expect(await service.getResolverRuleAssociations()).toEqual([{"Id": "rslvr-rrassoc-1"}]);

            }
        );

        it(
            "getResolverRuleAssociations returns empty for missing file",
            async () => {

                const service = new Route53ResolverCacheService(tmpDir);
                expect(await service.getResolverRuleAssociations()).toEqual([]);

            }
        );

        it(
            "getFirewallRuleGroups reads route53resolver_firewall_rule_groups.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "route53resolver_firewall_rule_groups.json"
                    ),
                    JSON.stringify([{"Id": "rslvr-frg-1"}])
                );
                const service = new Route53ResolverCacheService(tmpDir);
                expect(await service.getFirewallRuleGroups()).toEqual([{"Id": "rslvr-frg-1"}]);

            }
        );

        it(
            "getFirewallRuleGroups returns empty for missing file",
            async () => {

                const service = new Route53ResolverCacheService(tmpDir);
                expect(await service.getFirewallRuleGroups()).toEqual([]);

            }
        );

        it(
            "getFirewallRuleGroupAssociations reads route53resolver_firewall_rule_group_associations.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "route53resolver_firewall_rule_group_associations.json"
                    ),
                    JSON.stringify([{"Id": "rslvr-frga-1"}])
                );
                const service = new Route53ResolverCacheService(tmpDir);
                expect(await service.getFirewallRuleGroupAssociations()).toEqual([{"Id": "rslvr-frga-1"}]);

            }
        );

        it(
            "getFirewallRuleGroupAssociations returns empty for missing file",
            async () => {

                const service = new Route53ResolverCacheService(tmpDir);
                expect(await service.getFirewallRuleGroupAssociations()).toEqual([]);

            }
        );

    }
);

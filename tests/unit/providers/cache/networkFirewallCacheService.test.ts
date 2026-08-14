import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {NetworkFirewallCacheService} from "../../../../src/providers/cache/networkFirewallCacheService.js";

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
    "NetworkFirewallCacheService",
    () => {

        it(
            "getFirewalls reads network_firewall_firewalls.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "network_firewall_firewalls.json"
                    ),
                    JSON.stringify([{"FirewallName": "fw1"}])
                );
                const service = new NetworkFirewallCacheService(tmpDir);
                expect(await service.getFirewalls()).toEqual([{"FirewallName": "fw1"}]);

            }
        );

        it(
            "getFirewalls returns empty for missing file",
            async () => {

                const service = new NetworkFirewallCacheService(tmpDir);
                expect(await service.getFirewalls()).toEqual([]);

            }
        );

        it(
            "getFirewallPolicies reads network_firewall_policies.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "network_firewall_policies.json"
                    ),
                    JSON.stringify([{"Name": "policy1"}])
                );
                const service = new NetworkFirewallCacheService(tmpDir);
                expect(await service.getFirewallPolicies()).toEqual([{"Name": "policy1"}]);

            }
        );

        it(
            "getFirewallPolicies returns empty for missing file",
            async () => {

                const service = new NetworkFirewallCacheService(tmpDir);
                expect(await service.getFirewallPolicies()).toEqual([]);

            }
        );

        it(
            "getRuleGroups reads network_firewall_rule_groups.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "network_firewall_rule_groups.json"
                    ),
                    JSON.stringify([{"Name": "rg1"}])
                );
                const service = new NetworkFirewallCacheService(tmpDir);
                expect(await service.getRuleGroups()).toEqual([{"Name": "rg1"}]);

            }
        );

        it(
            "getRuleGroups returns empty for missing file",
            async () => {

                const service = new NetworkFirewallCacheService(tmpDir);
                expect(await service.getRuleGroups()).toEqual([]);

            }
        );

    }
);

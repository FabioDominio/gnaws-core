import {describe, it, expect} from "vitest";
import {join} from "node:path";
import {mkdtempSync, rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {Inventory, GraphBuilder, UnusedDetector, CacheServiceFactory, CacheWriter} from "../../src/index.js";

const FIXTURES_DIR = join(
    __dirname,
    "fixtures"
);

describe(
    "Integration: CacheServiceFactory → GraphBuilder → UnusedDetector",
    () => {

        it(
            "loads fixtures, builds graph, and detects unused resources",
            async () => {

                const factory = new CacheServiceFactory(FIXTURES_DIR);
                const credentials = {"accessKeyId": "fake",
                    "secretAccessKey": "fake"};
                const inventory = new Inventory(
                    credentials,
                    factory
                );
                await inventory.init();
                await inventory.loadResources();

                const graph = new GraphBuilder().build(inventory);
                expect(graph.hasNode("eu-west-1")).toBe(true);
                expect(graph.order).toBeGreaterThan(1);

                const detector = new UnusedDetector();
                const findings = detector.detect(
                    inventory,
                    graph
                );

                expect(findings.length).toBeGreaterThan(0);

                const resourceTypes = findings.map((f) => f.resourceType);
                expect(resourceTypes).toContain("ebsvolume");
                expect(resourceTypes).toContain("elasticip");
                expect(resourceTypes).toContain("networkinterface");
                expect(resourceTypes).toContain("securitygroup");
                expect(resourceTypes).toContain("certificate");

            }
        );

        it(
            "detects the correct number of findings per resource type",
            async () => {

                const factory = new CacheServiceFactory(FIXTURES_DIR);
                const credentials = {"accessKeyId": "fake",
                    "secretAccessKey": "fake"};
                const inventory = new Inventory(
                    credentials,
                    factory
                );
                await inventory.init();
                await inventory.loadResources();

                const graph = new GraphBuilder().build(inventory);
                const detector = new UnusedDetector();
                const findings = detector.detect(
                    inventory,
                    graph
                );

                const ebsFindings = findings.filter((f) => f.resourceType === "ebsvolume");
                expect(ebsFindings).toHaveLength(1);
                expect(ebsFindings[0].arn).toContain("vol-detached");

                const eipFindings = findings.filter((f) => f.resourceType === "elasticip");
                expect(eipFindings).toHaveLength(1);
                expect(eipFindings[0].name).toContain("1.2.3.4");

                const eniFindings = findings.filter((f) => f.resourceType === "networkinterface");
                expect(eniFindings).toHaveLength(1);
                expect(eniFindings[0].arn).toContain("eni-detached");

                const sgFindings = findings.filter((f) => f.resourceType === "securitygroup");
                expect(sgFindings).toHaveLength(1);
                expect(sgFindings[0].name).toBe("orphan-sg");

                const acmFindings = findings.filter((f) => f.resourceType === "certificate");
                expect(acmFindings).toHaveLength(1);
                expect(acmFindings[0].name).toBe("unused.example.com");

            }
        );

        it(
            "detects load balancers with no targets and orphaned target groups",
            async () => {

                const factory = new CacheServiceFactory(FIXTURES_DIR);
                const credentials = {"accessKeyId": "fake",
                    "secretAccessKey": "fake"};
                const inventory = new Inventory(
                    credentials,
                    factory
                );
                await inventory.init();
                await inventory.loadResources();

                const graph = new GraphBuilder().build(inventory);
                const detector = new UnusedDetector();
                const findings = detector.detect(
                    inventory,
                    graph
                );

                const lbFindings = findings.filter((f) => f.resourceType === "loadbalancer");
                expect(lbFindings).toHaveLength(1);
                expect(lbFindings[0].name).toBe("orphan-lb");

                const tgFindings = findings.filter((f) => f.resourceType === "targetgroup");
                expect(tgFindings).toHaveLength(1);
                expect(tgFindings[0].name).toBe("orphan-tg");

            }
        );

        it(
            "graph contains correct nodes and edges",
            async () => {

                const factory = new CacheServiceFactory(FIXTURES_DIR);
                const credentials = {"accessKeyId": "fake",
                    "secretAccessKey": "fake"};
                const inventory = new Inventory(
                    credentials,
                    factory
                );
                await inventory.init();
                await inventory.loadResources();

                const graph = new GraphBuilder().build(inventory);

                expect(graph.getNodeAttribute(
                    "eu-west-1",
                    "resourcetype"
                )).toBe("region");

                expect(graph.hasNode("sg-unused")).toBe(true);
                expect(graph.hasNode("sg-used")).toBe(true);
                expect(graph.hasNode("arn:aws:acm:eu-west-1:123:certificate/unused-cert")).toBe(true);

                // LB and TG nodes exist
                expect(graph.hasNode("arn:aws:elasticloadbalancing:eu-west-1:123:loadbalancer/app/orphan-lb/abc")).toBe(true);
                expect(graph.hasNode("arn:aws:elasticloadbalancing:eu-west-1:123:targetgroup/orphan-tg/xyz")).toBe(true);

            }
        );

        it(
            "supports filtering detection by rule ID",
            async () => {

                const factory = new CacheServiceFactory(FIXTURES_DIR);
                const credentials = {"accessKeyId": "fake",
                    "secretAccessKey": "fake"};
                const inventory = new Inventory(
                    credentials,
                    factory
                );
                await inventory.init();
                await inventory.loadResources();

                const graph = new GraphBuilder().build(inventory);
                const detector = new UnusedDetector();

                const findings = detector.detect(
                    inventory,
                    graph,
                    {"ruleIds": ["ebs-detached-volume"]}
                );

                expect(findings).toHaveLength(1);
                expect(findings[0].resourceType).toBe("ebsvolume");

            }
        );

        it(
            "supports filtering detection by resource type",
            async () => {

                const factory = new CacheServiceFactory(FIXTURES_DIR);
                const credentials = {"accessKeyId": "fake",
                    "secretAccessKey": "fake"};
                const inventory = new Inventory(
                    credentials,
                    factory
                );
                await inventory.init();
                await inventory.loadResources();

                const graph = new GraphBuilder().build(inventory);
                const detector = new UnusedDetector();

                const findings = detector.detect(
                    inventory,
                    graph,
                    {"resourceTypes": [
                        "securitygroup",
                        "certificate"
                    ]}
                );

                expect(findings).toHaveLength(2);
                const types = findings.map((f) => f.resourceType);
                expect(types).toContain("securitygroup");
                expect(types).toContain("certificate");

            }
        );

        it(
            "supports filtering detection by max tier",
            async () => {

                const factory = new CacheServiceFactory(FIXTURES_DIR);
                const credentials = {"accessKeyId": "fake",
                    "secretAccessKey": "fake"};
                const inventory = new Inventory(
                    credentials,
                    factory
                );
                await inventory.init();
                await inventory.loadResources();

                const graph = new GraphBuilder().build(inventory);
                const detector = new UnusedDetector();

                // All current rules are tier 1, so maxTier: 1 should return all
                const findings = detector.detect(
                    inventory,
                    graph,
                    {"maxTier": 1}
                );
                expect(findings.length).toBeGreaterThan(0);

                /*
                 * maxTier: 0 (below all rules) should return nothing
                 * Actually tier minimum is 1, so let's test that tier 2 still includes tier 1
                 */
                const tier2Findings = detector.detect(
                    inventory,
                    graph,
                    {"maxTier": 2}
                );
                expect(tier2Findings.length).toEqual(findings.length);

            }
        );

    }
);

describe(
    "Integration: CacheWriter → CacheServiceFactory round-trip",
    () => {

        it(
            "dump and reload produces identical detection results",
            async () => {

                // Load from fixtures
                const factory1 = new CacheServiceFactory(FIXTURES_DIR);
                const credentials = {"accessKeyId": "fake",
                    "secretAccessKey": "fake"};
                const inv1 = new Inventory(
                    credentials,
                    factory1
                );
                await inv1.init();
                await inv1.loadResources();

                // Dump to temp dir
                const tmpDir = mkdtempSync(join(
                    tmpdir(),
                    "gnaws-integration-"
                ));
                try {

                    const writer = new CacheWriter(tmpDir);
                    writer.writeAll(inv1);

                    // Reload from dump
                    const factory2 = new CacheServiceFactory(tmpDir);
                    const inv2 = new Inventory(
                        credentials,
                        factory2
                    );
                    await inv2.init();
                    await inv2.loadResources();

                    // Build graphs and detect from both
                    const graph1 = new GraphBuilder().build(inv1);
                    const graph2 = new GraphBuilder().build(inv2);

                    const detector = new UnusedDetector();
                    const findings1 = detector.detect(
                        inv1,
                        graph1
                    );
                    const findings2 = detector.detect(
                        inv2,
                        graph2
                    );

                    // Same number of findings
                    expect(findings2.length).toBe(findings1.length);

                    // Same resource types detected
                    const types1 = findings1.map((f) => f.resourceType).sort();
                    const types2 = findings2.map((f) => f.resourceType).sort();
                    expect(types2).toEqual(types1);

                } finally {

                    rmSync(
                        tmpDir,
                        {"recursive": true}
                    );

                }

            }
        );

        it(
            "graph node count is preserved through dump/reload",
            async () => {

                const factory1 = new CacheServiceFactory(FIXTURES_DIR);
                const credentials = {"accessKeyId": "fake",
                    "secretAccessKey": "fake"};
                const inv1 = new Inventory(
                    credentials,
                    factory1
                );
                await inv1.init();
                await inv1.loadResources();

                const tmpDir = mkdtempSync(join(
                    tmpdir(),
                    "gnaws-integration-"
                ));
                try {

                    const writer = new CacheWriter(tmpDir);
                    writer.writeAll(inv1);

                    const factory2 = new CacheServiceFactory(tmpDir);
                    const inv2 = new Inventory(
                        credentials,
                        factory2
                    );
                    await inv2.init();
                    await inv2.loadResources();

                    const graph1 = new GraphBuilder().build(inv1);
                    const graph2 = new GraphBuilder().build(inv2);

                    expect(graph2.order).toBe(graph1.order);
                    expect(graph2.size).toBe(graph1.size);

                } finally {

                    rmSync(
                        tmpDir,
                        {"recursive": true}
                    );

                }

            }
        );

    }
);

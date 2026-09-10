# GNAWS — Graph your AWS

> *Find what's gnawing at your bill.*

[![npm](https://img.shields.io/npm/v/@gnaws/core)](https://www.npmjs.com/package/@gnaws/core)
[![license](https://img.shields.io/badge/license-AGPL--3.0-blue)](LICENSE)
[![node](https://img.shields.io/node/v/@gnaws/core)](package.json)

GNAWS is an open-source AWS infrastructure intelligence library. It crawls your AWS account, builds a complete resource inventory, connects everything into a directed relationship graph, and surfaces unused resources that are quietly draining your budget.

The name is a double meaning: **G**raph your **AWS** — and like something gnawing in the dark, GNAWS finds the forgotten resources silently costing you money.

## Features

- **81 AWS services** inventoried across 284 paginated API calls
- **Directed resource graph** built with Graphology — relationships between all discovered resources
- **Tags on every node** — AWS resource tags normalized as key-value pairs
- **Unused resource detection** via structural/functional rules (tier 1 state-based + tier 2 graph-based)
- **DNS pre-check** — skips services unavailable in each region before scanning
- **Per-region error resilience** — timeouts or failures in one region don't crash the scan
- **Multiple export formats**: GEXF 1.3 (Gephi), JSON (sigma.js), Markdown report, CSV inventory
- **Dual-mode providers**: live AWS and offline cache (JSON dump files)
- **Exporter interface** — pluggable architecture for adding new export formats

## Installation

```bash
npm install @gnaws/core
```

Requires Node.js >= 24.

## Usage

```typescript
import { Inventory, GraphBuilder, UnusedDetector, LiveServiceFactory } from "@gnaws/core";
import { fromIni } from "@aws-sdk/credential-providers";

const credentials = fromIni({ profile: "your-profile" });

// 1. Discover resources
const inventory = new Inventory(credentials, new LiveServiceFactory());
await inventory.init();
await inventory.loadResources();

// 2. Build relationship graph
const graph = new GraphBuilder().build(inventory);

// 3. Detect unused resources
const detector = new UnusedDetector();
const findings = detector.detect(inventory, graph);

for (const finding of findings) {
    console.log(`[${finding.confidence}] ${finding.reason}`);
}
```

### Offline mode (from a cached dump)

```typescript
import { Inventory, GraphBuilder, CacheServiceFactory } from "@gnaws/core";

// No AWS credentials needed — reads from local JSON files
const inventory = new Inventory(new CacheServiceFactory("./dump"));
await inventory.init();
await inventory.loadResources();
const graph = new GraphBuilder().build(inventory);
```

### Export

```typescript
import { GexfExporter, JsonExporter, MarkdownExporter, CsvExporter } from "@gnaws/core";

new GexfExporter().export("graph.gexf", inventory, graph);      // Gephi
new JsonExporter().export("graph.json", inventory, graph);      // sigma.js
new MarkdownExporter().export("report.md", inventory, graph);   // Markdown report (one table per resource type)
new CsvExporter().export("inventory.csv", inventory, graph);    // flat CSV inventory sheet
```

`MarkdownExporter` and `CsvExporter` are inventory-driven and share the same
per-service descriptor table (`exporters/descriptors/`), so they cover the same
resource set with identical canonical resource-type keys. Markdown groups one
table per resource type (per region) with extended per-type columns; CSV is a
single flat sheet with columns `region,resource_type,id,name,tags`. The `graph`
argument is optional for both.

### Dump inventory for offline use

```typescript
import { CacheWriter } from "@gnaws/core";

const writer = new CacheWriter("./dump");
writer.writeAll(inventory);
```

### Full example: dump → detect → export

```typescript
import { Inventory, GraphBuilder, UnusedDetector, CacheServiceFactory, MarkdownExporter } from "@gnaws/core";

// Load from a previously saved dump — no AWS credentials needed
const inventory = new Inventory(new CacheServiceFactory("./dump"));
await inventory.init();
await inventory.loadResources();

// Build the graph
const graph = new GraphBuilder().build(inventory);

// Detect unused resources
const detector = new UnusedDetector();
const findings = detector.detect(inventory, graph);

console.log(`Found ${findings.length} unused resources:`);
for (const f of findings) {
    console.log(`  [${f.confidence}] ${f.reason}`);
}

// Export a Markdown report
new MarkdownExporter().export("report.md", inventory, graph);
```


## Detection Rules

All rules are structural/functional — they check whether a resource is connected to anything, not whether it has been idle for a time period.

| Rule ID | Tier | Resource | Detection |
|---------|------|----------|-----------|
| `ebs-detached-volume` | 1 | EBS Volume | State === "available" |
| `eip-unassociated` | 1 | Elastic IP | No AssociationId |
| `eni-detached` | 1 | Network Interface | Status === "available" |
| `sg-unused` | 1 | Security Group | Not referenced by any ENI |
| `lb-no-targets` | 1 | Load Balancer | Zero target groups |
| `tg-orphaned` | 1 | Target Group | No LB association |
| `acm-unused` | 1 | ACM Certificate | InUse === false |
| `iam-policy-orphaned` | 1 | IAM Policy | AttachmentCount === 0 |
| `iam-role-unused` | 2 | IAM Role | No policies attached, not used by any compute resource |
| `esm-broken` | 2 | Event Source Mapping | Source or target no longer in graph |
| `cloudfront-function-unused` | 2 | CloudFront Function | Not associated with any distribution |

## Architecture

```
src/
  index.ts              # Library entry point — all public exports
  inventory.ts          # Resource discovery across all regions
  graphBuilder.ts       # Two-pass directed graph (nodes, then edges)
  detection/            # Detection rules and orchestrator
  exporters/            # GEXF, JSON, Markdown, CSV, CacheWriter
    descriptors/        # Shared per-service resource descriptor groups (CSV + Markdown)
  providers/
    live/               # Real AWS SDK implementations
    cache/              # Offline JSON-based implementations
  interfaces/           # Service contracts per AWS service
```

## Contributing

See [CONTRIBUTING.md](https://github.com/FabioDominio/gnaws-core/blob/main/CONTRIBUTING.md).

## Support

If GNAWS saves you money on your AWS bill, consider sponsoring the project.

[![Sponsor on GitHub](https://img.shields.io/badge/sponsor-GitHub-pink?logo=github)](https://github.com/sponsors/FabioDominio)
[![Sponsor on PayPal](https://img.shields.io/badge/sponsor-PayPal-blue?logo=paypal)](https://paypal.me/drdominiof)

## License

AGPL-3.0 — see [LICENSE](LICENSE).

---

*Not affiliated with or endorsed by Amazon Web Services.*

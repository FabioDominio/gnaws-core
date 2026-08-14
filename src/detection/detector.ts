import type {DirectedGraph} from "graphology";
import type {Inventory} from "../inventory.js";
import type {DetectionContext, DetectionRule, DetectionTier, UnusedResource} from "./types.js";
import {allRules} from "./rules/index.js";

/**
 * Configuration options for the unused resource detector.
 */
export interface DetectorOptions {

    /**
     * Maximum detection tier to run. Rules above this tier are skipped.
     * - 1: state-based only (fastest, no graph analysis)
     * - 2: state + graph (default, comprehensive without API calls)
     * - 3: state + graph + metrics (deepest, requires CloudWatch)
     */
    "maxTier"?: DetectionTier;

    /**
     * Specific rule IDs to run. If provided, only these rules execute.
     * Useful for targeted scans (e.g., "only check EBS volumes").
     */
    "ruleIds"?: string[];

    /**
     * Specific resource types to scan. If provided, only rules matching
     * these resource types execute.
     */
    "resourceTypes"?: string[];
}

/**
 * Orchestrates unused resource detection by running registered rules
 * against the inventory and graph data.
 *
 * Usage:
 * ```typescript
 * const detector = new UnusedDetector();
 * const findings = detector.detect(inventory, graph);
 * ```
 *
 * Rules are automatically loaded from the rules directory. Custom rules
 * can be provided via the constructor for testing or extension.
 */
export class UnusedDetector {

    #rules: DetectionRule[];

    /**
     * @param rules - Optional custom rules. If omitted, all built-in rules are loaded.
     */
    constructor (rules?: DetectionRule[]) {

        this.#rules = rules ?? allRules;

    }

    /**
     * Run unused resource detection across all enabled regions.
     *
     * @param inventory - Fully populated inventory (must have called loadResources)
     * @param graph - Built relationship graph (from GraphBuilder.build)
     * @param options - Optional configuration to filter rules or limit tier depth
     * @returns Array of unused resource findings, sorted by name
     */
    detect (inventory: Inventory, graph: DirectedGraph, options: DetectorOptions = {}): UnusedResource[] {

        const maxTier = options.maxTier ?? 2;

        const regions = inventory.getAccountRegions().
            map((r) => r.RegionName).
            filter((name): name is string => name !== undefined);

        const context: DetectionContext = {
            inventory,
            graph,
            regions
        };

        // Filter rules based on options
        const activeRules = this.#rules.filter((rule) => {

            if (rule.tier > maxTier) {

                return false;

            }
            if (options.ruleIds && !options.ruleIds.includes(rule.id)) {

                return false;

            }
            if (options.resourceTypes && !options.resourceTypes.includes(rule.resourceType)) {

                return false;

            }
            return true;

        });

        // Run all active rules and collect findings
        const findings: UnusedResource[] = [];
        for (const rule of activeRules) {

            const results = rule.detect(context);
            findings.push(...results);

        }

        // Sort by name
        findings.sort((a, b) => a.name.localeCompare(b.name));

        return findings;

    }

    /**
     * Get metadata about all registered rules.
     */
    getRules (): readonly {"id": string;
        "resourceType": string;
        "tier": DetectionTier;
        "description": string;}[] {

        return this.#rules.map((rule) => ({
            "id": rule.id,
            "resourceType": rule.resourceType,
            "tier": rule.tier,
            "description": rule.description
        }));

    }

}

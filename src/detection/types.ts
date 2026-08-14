import type {DirectedGraph} from "graphology";
import type {Inventory} from "../inventory.js";

/**
 * Detection tier indicates how the unused resource was identified:
 * - Tier 1: State-based — uses resource attributes already in inventory (deterministic, zero cost)
 * - Tier 2: Graph-based — analyzes edge relationships (requires edge role classification)
 * - Tier 3: Metrics-based — queries CloudWatch for activity (requires API calls, opt-in)
 */
export type DetectionTier = 1 | 2 | 3;

/**
 * Confidence level of the detection:
 * - "high": deterministic state check (e.g., Volume.State === "available") — always correct
 * - "medium": heuristic-based (e.g., no functional edges, age threshold) — may have false positives
 */
export type Confidence = "high" | "medium";

/**
 * A single unused resource finding produced by a detection rule.
 */
export interface UnusedResource {

    /** Full ARN of the resource, or a constructed identifier if no ARN exists */
    "arn": string;

    /** Resource type key matching resourceTypeConfig (e.g., "ebsvolume", "elasticip") */
    "resourceType": string;

    /** AWS region where the resource lives */
    "region": string;

    /** Human-readable name or identifier for display */
    "name": string;

    /** Human-readable explanation of why this resource is considered unused */
    "reason": string;

    /** Which detection tier produced this finding */
    "tier": DetectionTier;

    /** How confident we are this is truly unused */
    "confidence": Confidence;

}

/**
 * Context passed to every detection rule. Contains all data sources
 * needed for detection without rules needing to fetch anything themselves.
 */
export interface DetectionContext {

    /** Fully populated inventory with all resource data */
    "inventory": Inventory;

    /** Built relationship graph with all nodes and edges */
    "graph": DirectedGraph;

    /** List of regions the account has enabled */
    "regions": string[];
}

/**
 * A detection rule that identifies unused resources of a specific type.
 *
 * Each rule is self-contained: it knows which resource type it handles,
 * which detection tier it operates at, and how to scan for unused instances.
 *
 * Rules must be pure — they read from context but never mutate it.
 */
export interface DetectionRule {

    /** Unique identifier for this rule (e.g., "ebs-detached-volume") */
    "id": string;

    /** Resource type this rule targets (matches resourceTypeConfig keys) */
    "resourceType": string;

    /** Detection tier: 1 = state, 2 = graph, 3 = metrics */
    "tier": DetectionTier;

    /** Short human-readable description of what this rule detects */
    "description": string;

    /** Run detection and return all findings. Must not throw — return empty array on failure. */
    detect (context: DetectionContext): UnusedResource[];
}

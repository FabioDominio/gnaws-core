import type {DetectionRule, DetectionContext, UnusedResource} from "../types.js";

/**
 * Detects IAM roles that are not attached to any policy and not referenced
 * by any compute resource (Lambda, ECS, EKS, SFN, etc.).
 *
 * Detection: Tier 2 (graph-based)
 * - A role with degree 0 (or only orphan edges) has no policies attached and
 *   nothing using it as an execution role.
 * - Service-linked roles (path starts with /aws-service-role/) are excluded —
 *   AWS manages their lifecycle.
 * - SSO reserved roles (name starts with AWSReservedSSO_) are excluded.
 *
 * False positives:
 * - Roles used by services not yet modeled in the graph (e.g., CodeDeploy, Step Functions
 *   not yet scanned). Medium confidence to account for this.
 * - Cross-account roles used by external accounts — they won't show compute connections
 *   in this account's graph.
 */
export const iamRoleUnused: DetectionRule = {
    "id": "iam-role-unused",
    "resourceType": "role",
    "tier": 2,
    "description": "IAM roles with no attached policies and not used by any compute resource",

    detect (context: DetectionContext): UnusedResource[] {

        const findings: UnusedResource[] = [];

        for (const role of context.inventory.getRoles()) {

            if (!role.RoleId || !role.RoleName) {

                continue;

            }

            // Skip AWS service-linked roles — AWS manages their lifecycle
            if (role.Path?.startsWith("/aws-service-role/")) {

                continue;

            }

            // Skip SSO-reserved roles
            if (role.RoleName.startsWith("AWSReservedSSO_")) {

                continue;

            }

            if (!context.graph.hasNode(role.RoleId)) {

                continue;

            }

            // Check all edges: if only orphan edges exist, role is unused
            const edges = context.graph.edges(role.RoleId);
            const nonOrphanEdges = edges.filter((e) => context.graph.getEdgeAttribute(
                e,
                "edgeType"
            ) !== "orphan");

            if (nonOrphanEdges.length > 0) {

                continue;

            }

            findings.push({
                "arn": role.Arn ?? `arn:aws:iam::unknown:role/${role.RoleName}`,
                "resourceType": "role",
                "region": "global",
                "name": role.RoleName,
                "reason": `IAM role "${role.RoleName}" has no attached policies and is not used by any compute resource`,
                "tier": 2,
                "confidence": "medium"
            });

        }

        return findings;

    }
};

import type {DetectionRule, DetectionContext, UnusedResource} from "../types.js";

/**
 * Detects EBS volumes in "available" state — meaning they are not attached
 * to any instance. These volumes still incur storage costs.
 *
 * Detection: Tier 1 (state-based)
 * - A volume with State === "available" is detached from all instances.
 * - This is deterministic: AWS only reports "available" when there are zero attachments.
 * - Common cause: instance terminated without deleting its volumes (DeleteOnTermination=false).
 *
 * False positives: Rare. Possible cases:
 * - Volume intentionally kept as a backup (but snapshots are cheaper for this).
 * - Volume about to be attached to a new instance (transient state during migration).
 */
export const ebsDetachedVolume: DetectionRule = {
    "id": "ebs-detached-volume",
    "resourceType": "ebsvolume",
    "tier": 1,
    "description": "EBS volumes not attached to any instance (available state)",

    detect (context: DetectionContext): UnusedResource[] {

        const findings: UnusedResource[] = [];

        for (const region of context.regions) {

            const volumes = context.inventory.getVolumesByRegion(region);

            for (const volume of volumes) {

                // "available" means no attachments — deterministically unused
                if (volume.State !== "available") {

                    continue;

                }

                const sizeGb = volume.Size ?? 0;
                const volumeType = volume.VolumeType ?? "gp3";

                const name = volume.Tags?.find((t) => t.Key === "Name")?.Value ??
                  volume.VolumeId ??
                  "unknown";

                findings.push({
                    "arn": `arn:aws:ec2:${region}::volume/${volume.VolumeId ?? ""}`,
                    "resourceType": "ebsvolume",
                    region,
                    name,
                    "reason": `Detached EBS volume (${volumeType}, ${String(sizeGb)} GB) — no instance attachment`,
                    "tier": 1,
                    "confidence": "high"
                });

            }

        }

        return findings;

    }
};

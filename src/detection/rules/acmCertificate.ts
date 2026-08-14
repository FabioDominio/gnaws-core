import type {DetectionRule, DetectionContext, UnusedResource} from "../types.js";

/**
 * Detects ACM certificates that are not in use by any AWS resource.
 *
 * Detection: Tier 1 (state-based)
 * - ACM certificates include an InUseBy field that lists all ARNs of resources
 *   (CloudFront distributions, ALBs, API Gateways, etc.) using the certificate.
 * - An empty InUseBy array means no resource references this certificate for TLS.
 *
 * Why this is structural:
 * - We check the direct association between the cert and consuming resources.
 * - A cert with zero consumers is architecturally disconnected — it's not
 *   providing TLS termination for anything.
 *
 * ACM certificates are free, but unused certs:
 * - Create renewal noise (ACM auto-renews, sends validation emails/DNS checks)
 * - Clutter the certificate list making it harder to find active ones
 * - May reference domains you no longer own (security concern if cert is valid)
 * - Count toward the 2500 certificates per account quota
 *
 * Common causes:
 * - Load balancer or CloudFront distribution deleted, cert left behind.
 * - Certificate requested for testing/staging, environment torn down.
 * - Domain migrated to a different cert (wildcard), old per-domain certs orphaned.
 *
 * Exclusions:
 * - We only have CertificateSummary data from ListCertificates, which includes
 *   InUseBy. If InUseBy is not populated in the summary, we skip (can't determine).
 *
 * False positives:
 * - Cert just issued, resource about to reference it (transient during deploy).
 * - Cert used by a resource in another account (cross-account can't be seen).
 */
export const acmCertificateUnused: DetectionRule = {
    "id": "acm-unused",
    "resourceType": "certificate",
    "tier": 1,
    "description": "ACM certificates not attached to any resource (ALB, CloudFront, API Gateway)",

    detect (context: DetectionContext): UnusedResource[] {

        const findings: UnusedResource[] = [];

        for (const region of context.regions) {

            const certificates = context.inventory.getCertificatesByRegion(region);

            for (const cert of certificates) {

                /*
                 * InUseBy is the list of resource ARNs consuming this certificate.
                 * If undefined, we can't determine usage from the summary — skip.
                 */
                if (cert.InUse === undefined) {

                    continue;

                }

                // If the certificate IS in use, skip it
                if (cert.InUse) {

                    continue;

                }

                const name = cert.DomainName ?? cert.CertificateArn ?? "unknown";

                findings.push({
                    "arn": cert.CertificateArn ?? `arn:aws:acm:${region}::certificate/unknown`,
                    "resourceType": "certificate",
                    region,
                    name,
                    "reason": `Certificate for "${cert.DomainName ?? "unknown"}" is not attached to any resource`,
                    "tier": 1,
                    "confidence": "high"
                });

            }

        }

        return findings;

    }
};

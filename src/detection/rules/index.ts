import type {DetectionRule} from "../types.js";
import {ebsDetachedVolume} from "./ebsVolume.js";
import {elasticIpUnassociated} from "./elasticIp.js";
import {eniDetached} from "./networkInterface.js";
import {securityGroupUnused} from "./securityGroup.js";
import {loadBalancerNoTargets} from "./loadBalancer.js";
import {targetGroupOrphaned} from "./targetGroup.js";
import {acmCertificateUnused} from "./acmCertificate.js";
import {iamRoleUnused} from "./iamRole.js";
import {iamPolicyOrphaned} from "./iamPolicy.js";
import {eventSourceMappingBroken} from "./eventSourceMapping.js";
import {cloudfrontFunctionUnused} from "./cloudfrontFunction.js";

/**
 * All built-in detection rules.
 *
 * Each rule is purely structural/functional — it checks whether a resource is
 * connected to or serving any other resource, not whether it has been "active"
 * for a time period.
 */
export const allRules: DetectionRule[] = [
    // Tier 1: state-based (deterministic)
    ebsDetachedVolume,
    elasticIpUnassociated,
    eniDetached,
    securityGroupUnused,
    loadBalancerNoTargets,
    targetGroupOrphaned,
    acmCertificateUnused,
    iamPolicyOrphaned,
    // Tier 2: graph-based (heuristic)
    iamRoleUnused,
    eventSourceMappingBroken,
    cloudfrontFunctionUnused
];

export {
    ebsDetachedVolume,
    elasticIpUnassociated,
    eniDetached,
    securityGroupUnused,
    loadBalancerNoTargets,
    targetGroupOrphaned,
    acmCertificateUnused,
    iamPolicyOrphaned,
    iamRoleUnused,
    eventSourceMappingBroken,
    cloudfrontFunctionUnused
};

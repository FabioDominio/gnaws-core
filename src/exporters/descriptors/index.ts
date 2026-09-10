/**
 * Aggregator for the per-service descriptor groups.
 *
 * Each sibling module owns the descriptors for one AWS service (mirroring the
 * per-service `#addXxxResources` methods in `graphBuilder.ts`). This module
 * concatenates them into the flat {@link resourceDescriptors} array that
 * inventory-driven exporters (CSV, Markdown) iterate.
 *
 * Nothing forces an exporter to use the flat array — a consumer may import a
 * single service group (e.g. `ec2Descriptors`) directly. The aggregate is
 * provided for the common "export everything" case.
 */
import type {DescriptorGroup, ResourceDescriptor} from "./types.js";

// Global-scoped services first (keeps the Markdown "Global" section cohesive).
import {organizationsDescriptors} from "./organizations.js";
import {iamDescriptors} from "./iam.js";
import {route53Descriptors} from "./route53.js";
import {s3Descriptors} from "./s3.js";
import {cloudfrontDescriptors} from "./cloudfront.js";
import {globalAcceleratorDescriptors} from "./globalAccelerator.js";
import {networkManagerDescriptors} from "./networkManager.js";

// Regional services.
import {acmDescriptors} from "./acm.js";
import {kmsDescriptors} from "./kms.js";
import {efsDescriptors} from "./efs.js";
import {autoScalingDescriptors} from "./autoscaling.js";
import {rdsDescriptors} from "./rds.js";
import {apiGatewayDescriptors} from "./apiGateway.js";
import {dynamodbDescriptors} from "./dynamodb.js";
import {containersDescriptors} from "./containers.js";
import {elbv2Descriptors} from "./elbv2.js";
import {messagingDescriptors} from "./messaging.js";
import {secretsManagerDescriptors} from "./secretsManager.js";
import {wafDescriptors} from "./waf.js";
import {elastiCacheDescriptors} from "./elastiCache.js";
import {searchDescriptors} from "./search.js";
import {codebuildDescriptors} from "./codebuild.js";
import {glacierMskDescriptors} from "./glacierMsk.js";
import {analyticsDescriptors} from "./analytics.js";
import {storageServicesDescriptors} from "./storageServices.js";
import {networkFirewallDescriptors} from "./networkFirewall.js";
import {cicdDescriptors} from "./cicd.js";
import {cloudFormationDescriptors} from "./cloudFormation.js";
import {ec2Descriptors} from "./ec2.js";
import {lambdaDescriptors} from "./lambda.js";
import {cloudwatchDescriptors} from "./cloudwatch.js";
import {integrationDescriptors} from "./integration.js";
import {iotDescriptors} from "./iot.js";
import {glueDescriptors} from "./glue.js";
import {dmsDescriptors} from "./dms.js";
import {route53ResolverDescriptors} from "./route53Resolver.js";
import {datasyncDescriptors} from "./datasync.js";
import {endUserComputeDescriptors} from "./endUserCompute.js";
import {appMeshDescriptors} from "./appMesh.js";
import {classicElbDescriptors} from "./classicElb.js";
import {sagemakerDescriptors} from "./sagemaker.js";
import {mediaconnectDescriptors} from "./mediaconnect.js";
import {batchDescriptors} from "./batch.js";
import {memorydbDescriptors} from "./memorydb.js";
import {beanstalkDescriptors} from "./beanstalk.js";

// Re-export shared types and helpers so `descriptors` is a single entry point.
export type {TagPair, ExtraColumn, ResourceDescriptor, DescriptorGroup} from "./types.js";
export {describe, nameTag, recordTags, lowerTags, flattenTags} from "./types.js";

// Re-export each per-service group for direct, granular consumption.
export {organizationsDescriptors} from "./organizations.js";
export {iamDescriptors} from "./iam.js";
export {route53Descriptors} from "./route53.js";
export {s3Descriptors} from "./s3.js";
export {cloudfrontDescriptors} from "./cloudfront.js";
export {globalAcceleratorDescriptors} from "./globalAccelerator.js";
export {networkManagerDescriptors} from "./networkManager.js";
export {acmDescriptors} from "./acm.js";
export {kmsDescriptors} from "./kms.js";
export {efsDescriptors} from "./efs.js";
export {autoScalingDescriptors} from "./autoscaling.js";
export {rdsDescriptors} from "./rds.js";
export {apiGatewayDescriptors} from "./apiGateway.js";
export {dynamodbDescriptors} from "./dynamodb.js";
export {containersDescriptors} from "./containers.js";
export {elbv2Descriptors} from "./elbv2.js";
export {messagingDescriptors} from "./messaging.js";
export {secretsManagerDescriptors} from "./secretsManager.js";
export {wafDescriptors} from "./waf.js";
export {elastiCacheDescriptors} from "./elastiCache.js";
export {searchDescriptors} from "./search.js";
export {codebuildDescriptors} from "./codebuild.js";
export {glacierMskDescriptors} from "./glacierMsk.js";
export {analyticsDescriptors} from "./analytics.js";
export {storageServicesDescriptors} from "./storageServices.js";
export {networkFirewallDescriptors} from "./networkFirewall.js";
export {cicdDescriptors} from "./cicd.js";
export {cloudFormationDescriptors} from "./cloudFormation.js";
export {ec2Descriptors} from "./ec2.js";
export {lambdaDescriptors} from "./lambda.js";
export {cloudwatchDescriptors} from "./cloudwatch.js";
export {integrationDescriptors} from "./integration.js";
export {iotDescriptors} from "./iot.js";
export {glueDescriptors} from "./glue.js";
export {dmsDescriptors} from "./dms.js";
export {route53ResolverDescriptors} from "./route53Resolver.js";
export {datasyncDescriptors} from "./datasync.js";
export {endUserComputeDescriptors} from "./endUserCompute.js";
export {appMeshDescriptors} from "./appMesh.js";
export {classicElbDescriptors} from "./classicElb.js";
export {sagemakerDescriptors} from "./sagemaker.js";
export {mediaconnectDescriptors} from "./mediaconnect.js";
export {batchDescriptors} from "./batch.js";
export {memorydbDescriptors} from "./memorydb.js";
export {beanstalkDescriptors} from "./beanstalk.js";

/**
 * All per-service descriptor groups, in a stable order (global-scoped services
 * first). Add a new service by creating its group module and appending it here.
 */
const groups: DescriptorGroup[] = [
    organizationsDescriptors,
    iamDescriptors,
    route53Descriptors,
    s3Descriptors,
    cloudfrontDescriptors,
    globalAcceleratorDescriptors,
    networkManagerDescriptors,
    acmDescriptors,
    kmsDescriptors,
    efsDescriptors,
    autoScalingDescriptors,
    rdsDescriptors,
    apiGatewayDescriptors,
    dynamodbDescriptors,
    containersDescriptors,
    elbv2Descriptors,
    messagingDescriptors,
    secretsManagerDescriptors,
    wafDescriptors,
    elastiCacheDescriptors,
    searchDescriptors,
    codebuildDescriptors,
    glacierMskDescriptors,
    analyticsDescriptors,
    storageServicesDescriptors,
    networkFirewallDescriptors,
    cicdDescriptors,
    cloudFormationDescriptors,
    ec2Descriptors,
    lambdaDescriptors,
    cloudwatchDescriptors,
    integrationDescriptors,
    iotDescriptors,
    glueDescriptors,
    dmsDescriptors,
    route53ResolverDescriptors,
    datasyncDescriptors,
    endUserComputeDescriptors,
    appMeshDescriptors,
    classicElbDescriptors,
    sagemakerDescriptors,
    mediaconnectDescriptors,
    batchDescriptors,
    memorydbDescriptors,
    beanstalkDescriptors
];

/**
 * Flat aggregate of every service group's descriptors — the single source of
 * truth for inventory-driven exporters that export the whole account.
 */
export const resourceDescriptors: ResourceDescriptor<unknown>[] = groups.flat();

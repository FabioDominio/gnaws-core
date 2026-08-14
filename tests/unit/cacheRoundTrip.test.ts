import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {mkdtempSync, rmSync} from "node:fs";
import {join} from "node:path";
import {tmpdir} from "node:os";
import {CacheWriter} from "../../src/exporters/cacheWriter.js";
import {readCacheFile, readCacheObject, listCacheRegions} from "../../src/providers/cache/cacheReader.js";
import type {Inventory} from "../../src/inventory.js";

/**
 * Creates a mock Inventory with realistic data for CacheWriter.
 * Only the getters that CacheWriter calls need to be mocked.
 */
function writerInventory (): Inventory {

    const regions = [
        {"RegionName": "eu-west-1",
            "RegionOptStatus": "ENABLED_BY_DEFAULT"}
    ];
    const vpcs = [
        {"VpcId": "vpc-abc",
            "CidrBlock": "10.0.0.0/16",
            "Tags": [
                {"Key": "Name",
                    "Value": "test-vpc"}
            ]}
    ];
    const volumes = [
        {"VolumeId": "vol-111",
            "State": "available",
            "Size": 100,
            "VolumeType": "gp3"}
    ];
    const securityGroups = [
        {"GroupId": "sg-111",
            "GroupName": "web-sg",
            "VpcId": "vpc-abc"}
    ];
    const lambdas = [
        {"FunctionArn": "arn:aws:lambda:eu-west-1:123:function:my-fn",
            "FunctionName": "my-fn"}
    ];
    const buckets = [
        {"bucket": {"Name": "my-bucket"},
            "region": "eu-west-1",
            "tags": []}
    ];

    const emptyArray = (): unknown[] => [];
    const emptyMap = (): Record<string, unknown[]> => ({});

    const getters: Record<string, (...args: unknown[]) => unknown> = {
        "getAccountRegions": () => regions,
        "getUsers": emptyArray,
        "getRoles": emptyArray,
        "getPolicies": emptyArray,
        "getUserGroups": emptyArray,
        "getInstanceProfiles": emptyArray,
        "getAccessKeys": emptyArray,
        "getServerCertificates": emptyArray,
        "getVirtualMfaDevices": emptyArray,
        "getRolePoliciesMap": () => ({}),
        "getUserPoliciesMap": () => ({}),
        "getGroupPoliciesMap": () => ({}),
        "getBuckets": () => buckets,
        "getDirectoryBuckets": emptyArray,
        "getDistributions": emptyArray,
        "getCloudFrontFunctions": emptyArray,
        "getOriginAccessControls": emptyArray,
        "getKeyValueStores": emptyArray,
        "getHostedZones": emptyArray,
        "getRoute53HealthChecks": emptyArray,
        "getRecordSetsByZone": emptyArray,
        "getOrgRoots": emptyArray,
        "getOrgOUs": emptyArray,
        "getOrgAccounts": emptyArray,
        "getOrgPolicies": emptyArray,
        "getAccelerators": emptyArray,
        "getAcceleratorListeners": emptyArray,
        "getAcceleratorEndpointGroups": emptyArray,
        "getGlobalNetworks": emptyArray,
        "getNmSites": emptyArray,
        "getNmDevices": emptyArray,
        "getNmLinks": emptyArray,
        "getNmConnections": emptyArray,
        "getCoreNetworks": emptyArray,
        "getNmAttachments": emptyArray,
        "getTransitGatewayRegistrations": emptyArray,
        // Regional getters
        "getVpcsByRegion": () => vpcs,
        "getSubnetsByRegion": emptyArray,
        "getSecurityGroupsByRegion": () => securityGroups,
        "getInstancesByRegion": emptyArray,
        "getVolumesByRegion": () => volumes,
        "getAddressesByRegion": emptyArray,
        "getNetworkInterfacesByRegion": emptyArray,
        "getInternetGatewaysByRegion": emptyArray,
        "getEgressOnlyInternetGatewaysByRegion": emptyArray,
        "getNatGatewaysByRegion": emptyArray,
        "getRouteTablesByRegion": emptyArray,
        "getVpcEndpointsByRegion": emptyArray,
        "getImagesByRegion": emptyArray,
        "getSnapshotsByRegion": emptyArray,
        "getKeyPairsByRegion": emptyArray,
        "getNetworkAclsByRegion": emptyArray,
        "getFlowLogsByRegion": emptyArray,
        "getDhcpOptionsByRegion": emptyArray,
        "getManagedPrefixListsByRegion": emptyArray,
        "getVpcPeeringConnectionsByRegion": emptyArray,
        "getLaunchTemplatesByRegion": emptyArray,
        "getTransitGatewaysByRegion": emptyArray,
        "getTransitGatewayAttachmentsByRegion": emptyArray,
        "getTransitGatewayRouteTablesByRegion": emptyArray,
        "getTransitGatewayVpcAttachmentsByRegion": emptyArray,
        "getTransitGatewayPeeringAttachmentsByRegion": emptyArray,
        "getTransitGatewayConnectsByRegion": emptyArray,
        "getTransitGatewayConnectPeersByRegion": emptyArray,
        "getVerifiedAccessInstancesByRegion": emptyArray,
        "getVerifiedAccessGroupsByRegion": emptyArray,
        "getVerifiedAccessEndpointsByRegion": emptyArray,
        "getVerifiedAccessTrustProvidersByRegion": emptyArray,
        "getVpcEndpointServiceConfigsByRegion": emptyArray,
        "getSecurityGroupRulesByRegion": emptyArray,
        "getLocalGatewaysByRegion": emptyArray,
        "getLocalGatewayRouteTablesByRegion": emptyArray,
        "getLocalGatewayRtVpcAssociationsByRegion": emptyArray,
        "getLocalGatewayVirtualInterfacesByRegion": emptyArray,
        "getLocalGatewayVifGroupsByRegion": emptyArray,
        "getStaleSecurityGroupsByRegion": emptyArray,
        "getInstanceConnectEndpointsByRegion": emptyArray,
        "getImagesInRecycleBinByRegion": emptyArray,
        "getSnapshotsInRecycleBinByRegion": emptyArray,
        "getFleetsByRegion": emptyArray,
        "getTrafficMirrorSessionsByRegion": emptyArray,
        "getTrafficMirrorTargetsByRegion": emptyArray,
        "getTrafficMirrorFiltersByRegion": emptyArray,
        "getClientVpnEndpointsByRegion": emptyArray,
        "getLambdasByRegion": () => lambdas,
        "getEventSourceMappingsByRegion": emptyArray,
        "getLayersByRegion": emptyArray,
        "getAliasesByRegion": emptyArray,
        "getFunctionUrlConfigsByRegion": emptyArray,
        "getProvisionedConcurrencyByRegion": emptyArray,
        "getLogGroupsByRegion": emptyArray,
        "getMetricAlarmsByRegion": emptyArray,
        "getCompositeAlarmsByRegion": emptyArray,
        "getSubscriptionFiltersByRegion": emptyArray,
        "getMetricStreamsByRegion": emptyArray,
        "getMetricFiltersByRegion": emptyArray,
        "getDeliveriesByRegion": emptyArray,
        "getDeliveryDestinationsByRegion": emptyArray,
        "getDeliverySourcesByRegion": emptyArray,
        "getTableBucketsByRegion": emptyArray,
        "getNamespacesByRegion": emptyArray,
        "getTablesByRegion": emptyArray,
        "getDynamoDBTablesByRegion": emptyArray,
        "getEcrRepositoriesByRegion": emptyArray,
        "getEcsClustersByRegion": emptyArray,
        "getEcsServicesByRegion": emptyArray,
        "getEcsTaskDefinitionArnsByRegion": emptyArray,
        "getEcsContainerInstancesByRegion": emptyArray,
        "getLoadBalancersByRegion": emptyArray,
        "getTargetGroupsByRegion": emptyArray,
        "getListenersByRegion": emptyArray,
        "getRulesByRegion": emptyArray,
        "getTrustStoresByRegion": emptyArray,
        "getTopicsByRegion": emptyArray,
        "getSubscriptionsByRegion": emptyArray,
        "getQueuesByRegion": emptyArray,
        "getEksClustersByRegion": emptyArray,
        "getEksNodegroupsByRegion": emptyArray,
        "getFargateProfilesByRegion": emptyArray,
        "getPodIdentityAssociationsByRegion": emptyArray,
        "getEksAddonsByRegion": emptyArray,
        "getEksAccessEntriesByRegion": emptyArray,
        "getSecretsByRegion": emptyArray,
        "getCertificatesByRegion": emptyArray,
        "getFileSystemsByRegion": emptyArray,
        "getAccessPointsByRegion": emptyArray,
        "getKeysByRegion": emptyArray,
        "getAutoScalingGroupsByRegion": emptyArray,
        "getLaunchConfigsByRegion": emptyArray,
        "getScalingPoliciesByRegion": emptyArray,
        "getDBInstancesByRegion": emptyArray,
        "getDBClustersByRegion": emptyArray,
        "getDBProxiesByRegion": emptyArray,
        "getDBSubnetGroupsByRegion": emptyArray,
        "getDBProxyTargetGroupsByRegion": emptyArray,
        "getRestApisByRegion": emptyArray,
        "getHttpApisByRegion": emptyArray,
        "getVpcLinksByRegion": emptyArray,
        "getHttpVpcLinksByRegion": emptyArray,
        "getDomainNamesByRegion": emptyArray,
        "getUsagePlansByRegion": emptyArray,
        "getWebAclsByRegion": emptyArray,
        "getCacheClustersByRegion": emptyArray,
        "getReplicationGroupsByRegion": emptyArray,
        "getCacheSubnetGroupsByRegion": emptyArray,
        "getServerlessCachesByRegion": emptyArray,
        "getEventBusesByRegion": emptyArray,
        "getStateMachinesByRegion": emptyArray,
        "getKinesisStreamsByRegion": emptyArray,
        "getOpenSearchDomainsByRegion": emptyArray,
        "getCodeBuildProjectsByRegion": emptyArray,
        "getCognitoUserPoolsByRegion": emptyArray,
        "getCognitoIdentityProvidersByRegion": emptyArray,
        "getCognitoUserPoolClientsByRegion": emptyArray,
        "getCloudMapNamespacesByRegion": emptyArray,
        "getCloudMapServicesByRegion": emptyArray,
        "getCloudMapInstancesByRegion": emptyArray,
        "getBackupVaultsByRegion": emptyArray,
        "getProtectedResourcesByRegion": emptyArray,
        "getBackupPlansByRegion": emptyArray,
        "getBackupSelectionsByRegion": emptyArray,
        "getGlacierVaultsByRegion": emptyArray,
        "getCodeArtifactDomainsByRegion": emptyArray,
        "getCodeArtifactRepositoriesByRegion": emptyArray,
        "getMskClustersByRegion": emptyArray,
        "getRedshiftClustersByRegion": emptyArray,
        "getRedshiftSubnetGroupsByRegion": emptyArray,
        "getNeptuneClustersByRegion": emptyArray,
        "getNeptuneInstancesByRegion": emptyArray,
        "getNeptuneSubnetGroupsByRegion": emptyArray,
        "getDocDbClustersByRegion": emptyArray,
        "getDocDbInstancesByRegion": emptyArray,
        "getDocDbSubnetGroupsByRegion": emptyArray,
        "getFsxFileSystemsByRegion": emptyArray,
        "getNetworkFirewallsByRegion": emptyArray,
        "getFirewallPoliciesByRegion": emptyArray,
        "getRuleGroupsByRegion": emptyArray,
        "getCodePipelinesByRegion": emptyArray,
        "getCloudTrailsByRegion": emptyArray,
        "getSsmParametersByRegion": emptyArray,
        "getSsmManagedInstancesByRegion": emptyArray,
        "getSsmMaintenanceWindowsByRegion": emptyArray,
        "getSsmDocumentsByRegion": emptyArray,
        "getSsmAssociationsByRegion": emptyArray,
        "getSsmPatchBaselinesByRegion": emptyArray,
        "getCfnStacksByRegion": emptyArray,
        "getCfnStackResourcesByRegion": emptyMap,
        "getCfnExportsByRegion": emptyArray,
        "getCfnStackSetsByRegion": emptyArray,
        "getMqBrokersByRegion": emptyArray,
        "getMqConfigurationsByRegion": emptyArray,
        "getMwaaEnvironmentsByRegion": emptyArray,
        "getAppRunnerServicesByRegion": emptyArray,
        "getVpcConnectorsByRegion": emptyArray,
        "getTransferServersByRegion": emptyArray,
        "getLatticeServiceNetworksByRegion": emptyArray,
        "getLatticeServicesByRegion": emptyArray,
        "getLatticeTargetGroupsByRegion": emptyArray,
        "getLatticeVpcAssociationsByRegion": emptyArray,
        "getLatticeServiceAssociationsByRegion": emptyArray,
        "getIotThingsByRegion": emptyArray,
        "getIotThingTypesByRegion": emptyArray,
        "getIotThingGroupsByRegion": emptyArray,
        "getIotCertificatesByRegion": emptyArray,
        "getIotTopicRulesByRegion": emptyArray,
        "getIotTopicRuleDestinationsByRegion": emptyArray,
        "getGlueConnectionsByRegion": emptyArray,
        "getGlueCrawlersByRegion": emptyArray,
        "getGlueDatabasesByRegion": emptyArray,
        "getGlueJobsByRegion": emptyArray,
        "getGlueTriggersByRegion": emptyArray,
        "getGlueTablesByRegion": emptyArray,
        "getGlueRegistriesByRegion": emptyArray,
        "getGlueSchemasByRegion": emptyArray,
        "getGlueWorkflowsByRegion": emptyArray,
        "getDmsReplicationInstancesByRegion": emptyArray,
        "getDmsSubnetGroupsByRegion": emptyArray,
        "getDmsEndpointsByRegion": emptyArray,
        "getDmsReplicationTasksByRegion": emptyArray,
        "getDmsConnectionsByRegion": emptyArray,
        "getResolverEndpointsByRegion": emptyArray,
        "getResolverRulesByRegion": emptyArray,
        "getResolverRuleAssociationsByRegion": emptyArray,
        "getFirewallRuleGroupsByRegion": emptyArray,
        "getFirewallRuleGroupAssociationsByRegion": emptyArray,
        "getBatchComputeEnvironmentsByRegion": emptyArray,
        "getBatchJobQueuesByRegion": emptyArray,
        "getBatchSchedulingPoliciesByRegion": emptyArray,
        "getMemoryDbClustersByRegion": emptyArray,
        "getMemoryDbSubnetGroupsByRegion": emptyArray,
        "getMemoryDbAclsByRegion": emptyArray,
        "getMemoryDbUsersByRegion": emptyArray,
        "getEmrClustersByRegion": emptyArray,
        "getEmrInstanceFleetsByRegion": emptyArray,
        "getEmrInstanceGroupsByRegion": emptyArray,
        "getEmrSecurityConfigsByRegion": emptyArray,
        "getEmrServerlessAppsByRegion": emptyArray,
        "getBeanstalkAppsByRegion": emptyArray,
        "getBeanstalkEnvsByRegion": emptyArray,
        "getAthenaWorkGroupsByRegion": emptyArray,
        "getAthenaDataCatalogsByRegion": emptyArray,
        "getDataSyncAgentsByRegion": emptyArray,
        "getDataSyncLocationsByRegion": emptyArray,
        "getDataSyncTasksByRegion": emptyArray,
        "getGraphqlApisByRegion": emptyArray,
        "getAppSyncDataSourcesByRegion": emptyArray,
        "getRsNamespacesByRegion": emptyArray,
        "getRsWorkgroupsByRegion": emptyArray,
        "getOssCollectionsByRegion": emptyArray,
        "getOssVpcEndpointsByRegion": emptyArray,
        "getDirectoriesByRegion": emptyArray,
        "getWorkspacesByRegion": emptyArray,
        "getWorkspaceDirectoriesByRegion": emptyArray,
        "getHsmClustersByRegion": emptyArray,
        "getMeshesByRegion": emptyArray,
        "getVirtualNodesByRegion": emptyArray,
        "getVirtualServicesByRegion": emptyArray,
        "getS3AccessPointsByRegion": emptyArray,
        "getClassicLoadBalancersByRegion": emptyArray,
        "getPipesByRegion": emptyArray,
        "getGatewaysByRegion": emptyArray,
        "getFileSharesByRegion": emptyArray,
        "getSgwVolumesByRegion": emptyArray,
        "getOutpostsByRegion": emptyArray,
        "getOutpostSitesByRegion": emptyArray,
        "getInfraConfigsByRegion": emptyArray,
        "getDeploymentGroupsByRegion": emptyArray,
        "getMediaConnectFlowsByRegion": emptyArray,
        "getNotebookInstancesByRegion": emptyArray
    };

    return new Proxy(
        {} as Inventory,
        {
            get (_target, prop: string) {

                const fn = getters[prop];
                if (typeof fn === "function") {

                    return fn;

                }
                return undefined;

            }
        }
    );

}

describe(
    "CacheWriter / CacheReader round-trip",
    () => {

        let tempDir: string;

        beforeEach(() => {

            tempDir = mkdtempSync(join(
                tmpdir(),
                "gnaws-test-"
            ));

        });

        afterEach(() => {

            rmSync(
                tempDir,
                {"recursive": true,
                    "force": true}
            );

        });

        it(
            "writes a manifest.json with version and regions",
            () => {

                const inv = writerInventory();
                const writer = new CacheWriter(tempDir);
                writer.writeAll(inv);

                const manifest = readCacheObject<Record<string, unknown>>(
                    tempDir,
                    "manifest.json"
                );
                expect(manifest.version).toBe(1);
                expect(manifest.regions).toEqual(["eu-west-1"]);
                expect(manifest.scannedAt).toBeDefined();

            }
        );

        it(
            "writes global/ec2_regions.json with region list",
            () => {

                const inv = writerInventory();
                const writer = new CacheWriter(tempDir);
                writer.writeAll(inv);

                const regions = readCacheFile(
                    join(
                        tempDir,
                        "global"
                    ),
                    "ec2_regions.json"
                );
                expect(regions).toHaveLength(1);
                expect(regions[0]).toEqual({"RegionName": "eu-west-1",
                    "RegionOptStatus": "ENABLED_BY_DEFAULT"});

            }
        );

        it(
            "writes per-region EC2 VPC data and reads it back",
            () => {

                const inv = writerInventory();
                const writer = new CacheWriter(tempDir);
                writer.writeAll(inv);

                const vpcs = readCacheFile<unknown[]>(
                    join(
                        tempDir,
                        "eu-west-1"
                    ),
                    "ec2_vpcs.json"
                );
                expect(vpcs).toHaveLength(1);
                expect((vpcs[0] as Record<string, unknown>).VpcId).toBe("vpc-abc");

            }
        );

        it(
            "writes per-region Lambda function data",
            () => {

                const inv = writerInventory();
                const writer = new CacheWriter(tempDir);
                writer.writeAll(inv);

                const lambdas = readCacheFile<unknown[]>(
                    join(
                        tempDir,
                        "eu-west-1"
                    ),
                    "lambda_functions.json"
                );
                expect(lambdas).toHaveLength(1);
                expect((lambdas[0] as Record<string, unknown>).FunctionName).toBe("my-fn");

            }
        );

        it(
            "writes per-region EC2 volume data",
            () => {

                const inv = writerInventory();
                const writer = new CacheWriter(tempDir);
                writer.writeAll(inv);

                const volumes = readCacheFile<unknown[]>(
                    join(
                        tempDir,
                        "eu-west-1"
                    ),
                    "ec2_volumes.json"
                );
                expect(volumes).toHaveLength(1);
                expect((volumes[0] as Record<string, unknown>).VolumeId).toBe("vol-111");
                expect((volumes[0] as Record<string, unknown>).State).toBe("available");

            }
        );

        it(
            "listCacheRegions returns region directories",
            () => {

                const inv = writerInventory();
                const writer = new CacheWriter(tempDir);
                writer.writeAll(inv);

                const regions = listCacheRegions(tempDir);
                expect(regions).toContain("eu-west-1");
                expect(regions).not.toContain("global");

            }
        );

        it(
            "readCacheFile returns empty array for missing files",
            () => {

                const result = readCacheFile(
                    tempDir,
                    "nonexistent.json"
                );
                expect(result).toEqual([]);

            }
        );

        it(
            "readCacheObject returns empty object for missing files",
            () => {

                const result = readCacheObject(
                    tempDir,
                    "nonexistent.json"
                );
                expect(result).toEqual({});

            }
        );

        it(
            "readCacheObject reads stack resources (object format)",
            () => {

                const inv = writerInventory();
                const writer = new CacheWriter(tempDir);
                writer.writeAll(inv);

                const stackResources = readCacheObject(
                    join(
                        tempDir,
                        "eu-west-1"
                    ),
                    "cloudformation_stack_resources.json"
                );
                // Should be an object (empty since mock returns {})
                expect(typeof stackResources).toBe("object");
                expect(Array.isArray(stackResources)).toBe(false);

            }
        );

        it(
            "CacheWriter skips hosted zones with no Id when writing record sets",
            () => {

                // Create a custom inventory with hosted zones to test the null-guard
                const baseInv = writerInventory();

                // Build a new proxy that overrides getHostedZones and getRecordSetsByZone
                const customInv = new Proxy(
                    {} as Inventory,
                    {
                        get (_target, prop: string) {

                            if (prop === "getHostedZones") {

                                return () => [
                                    {"Name": "example.com.",
                                        "Id": "/hostedzone/Z111"},
                                    {"Name": "no-id.com."}
                                ];

                            }
                            if (prop === "getRecordSetsByZone") {

                                return (zoneId: string) => {

                                    if (zoneId === "/hostedzone/Z111") {

                                        return [
                                            {"Name": "example.com.",
                                                "Type": "A",
                                                "TTL": 300}
                                        ];

                                    }
                                    return [];

                                };

                            }
                            // Delegate everything else to the base inventory
                            return (baseInv as unknown as Record<string, unknown>)[prop];

                        }
                    }
                );

                const writer = new CacheWriter(tempDir);
                writer.writeAll(customInv);

                const recordSets = readCacheFile(
                    join(
                        tempDir,
                        "global"
                    ),
                    "route53_record_sets.json"
                );
                // Only the zone with Id should have its records written
                expect(recordSets).toHaveLength(1);
                expect((recordSets[0] as Record<string, unknown>).Name).toBe("example.com.");

            }
        );

    }
);

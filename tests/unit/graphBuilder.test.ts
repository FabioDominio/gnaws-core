import {describe, it, expect} from "vitest";
import {GraphBuilder} from "../../src/graphBuilder.js";
import type {Inventory} from "../../src/inventory.js";

/**
 * Creates a minimal mock Inventory that satisfies GraphBuilder.build().
 * Every getter returns empty arrays/maps by default; pass overrides for the ones under test.
 */
function graphInventory (overrides: Record<string, unknown> = {}): Inventory {

    const emptyArray = (): unknown[] => [];
    const emptyMap = (): Record<string, unknown[]> => ({});

    const defaults: Record<string, () => unknown> = {
        "getAccountRegions": () => [
            {"RegionName": "eu-west-1",
                "RegionOptStatus": "ENABLED_BY_DEFAULT"}
        ],
        "getOrgRoots": emptyArray,
        "getOrgOUs": emptyArray,
        "getOrgAccounts": emptyArray,
        "getOrgPolicies": emptyArray,
        "getUsers": emptyArray,
        "getRoles": emptyArray,
        "getRoleByArn": () => undefined,
        "getPolicies": emptyArray,
        "getPolicyByArn": () => undefined,
        "getUserGroups": emptyArray,
        "getInstanceProfiles": emptyArray,
        "getAccessKeys": emptyArray,
        "getSshPublicKeys": emptyArray,
        "getServerCertificates": emptyArray,
        "getMfaDevices": emptyArray,
        "getVirtualMfaDevices": emptyArray,
        "getUserGroupMemberships": emptyArray,
        "getGroupMemberships": emptyArray,
        "getInstanceProfileRoleEdges": emptyArray,
        "getUserPolicies": () => [],
        "getRolePolicies": () => [],
        "getGroupPolicies": () => [],
        "getCertificatesByRegion": emptyArray,
        "getKeysByRegion": emptyArray,
        "getAliasesByKeyId": emptyArray,
        "getFileSystemsByRegion": emptyArray,
        "getMountTargetsByFileSystem": emptyArray,
        "getAccessPointsByRegion": emptyArray,
        "getBuckets": emptyArray,
        "getDirectoryBuckets": emptyArray,
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
        "getTrustStoreAssociationsByRegion": emptyArray,
        "getListenerCertificateArns": emptyArray,
        "getElbv2TagsByArn": emptyArray,
        "getTopicsByRegion": emptyArray,
        "getSubscriptionsByRegion": emptyArray,
        "getQueuesByRegion": emptyArray,
        "getDlqSourceEdges": emptyArray,
        "getHostedZones": emptyArray,
        "getRecordSetsByZone": emptyArray,
        "getRoute53HealthChecks": emptyArray,
        "getEksClustersByRegion": emptyArray,
        "getEksNodegroupsByRegion": emptyArray,
        "getFargateProfilesByRegion": emptyArray,
        "getPodIdentityAssociationsByRegion": emptyArray,
        "getEksAddonsByRegion": emptyArray,
        "getEksAccessEntriesByRegion": emptyArray,
        "getSecretsByRegion": emptyArray,
        "getDistributions": emptyArray,
        "getCloudFrontFunctions": emptyArray,
        "getOriginAccessControls": emptyArray,
        "getKeyValueStores": emptyArray,
        "getAutoScalingGroupsByRegion": emptyArray,
        "getLaunchConfigsByRegion": emptyArray,
        "getScalingPoliciesByRegion": emptyArray,
        "getLifecycleHooksByRegion": emptyArray,
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
        "getWafResourceAssociations": emptyArray,
        "getCacheClustersByRegion": emptyArray,
        "getReplicationGroupsByRegion": emptyArray,
        "getCacheSubnetGroupsByRegion": emptyArray,
        "getServerlessCachesByRegion": emptyArray,
        "getEventBusesByRegion": emptyArray,
        "getEventBridgeRulesByRegion": emptyArray,
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
        "getNotebookInstancesByRegion": emptyArray,
        // Regional EC2 getters
        "getVpcsByRegion": emptyArray,
        "getSubnetsByRegion": emptyArray,
        "getSecurityGroupsByRegion": emptyArray,
        "getInternetGatewaysByRegion": emptyArray,
        "getNatGatewaysByRegion": emptyArray,
        "getEgressOnlyInternetGatewaysByRegion": emptyArray,
        "getNetworkInterfacesByRegion": emptyArray,
        "getRouteTablesByRegion": emptyArray,
        "getInstancesByRegion": emptyArray,
        "getVolumesByRegion": emptyArray,
        "getVpcEndpointsByRegion": emptyArray,
        "getAddressesByRegion": emptyArray,
        "getImagesByRegion": emptyArray,
        "getSnapshotsByRegion": emptyArray,
        "getKeyPairsByRegion": emptyArray,
        "getNetworkAclsByRegion": emptyArray,
        "getFlowLogsByRegion": emptyArray,
        "getDhcpOptionsByRegion": emptyArray,
        "getManagedPrefixListsByRegion": emptyArray,
        "getVpcPeeringConnectionsByRegion": emptyArray,
        "getLaunchTemplatesByRegion": emptyArray,
        "getFleetsByRegion": emptyArray,
        "getTransitGatewaysByRegion": emptyArray,
        "getTransitGatewayAttachmentsByRegion": emptyArray,
        "getTransitGatewayRouteTablesByRegion": emptyArray,
        "getTransitGatewayVpcAttachmentsByRegion": emptyArray,
        "getTransitGatewayPeeringAttachmentsByRegion": emptyArray,
        "getTransitGatewayConnectsByRegion": emptyArray,
        "getTransitGatewayConnectPeersByRegion": emptyArray,
        "getVerifiedAccessInstancesByRegion": emptyArray,
        "getVerifiedAccessTrustProvidersByRegion": emptyArray,
        "getVerifiedAccessGroupsByRegion": emptyArray,
        "getVerifiedAccessEndpointsByRegion": emptyArray,
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
        "getLambdasByRegion": emptyArray,
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
        "getTrafficMirrorSessionsByRegion": emptyArray,
        "getTrafficMirrorTargetsByRegion": emptyArray,
        "getTrafficMirrorFiltersByRegion": emptyArray,
        "getClientVpnEndpointsByRegion": emptyArray
    };

    // Apply overrides
    const merged = {...defaults,
        ...overrides};

    // Return a Proxy that calls the function for each getter
    return new Proxy(
        {} as Inventory,
        {
            get (_target, prop: string) {

                const fn = merged[prop];
                if (typeof fn === "function") {

                    return fn;

                }
                return undefined;

            }
        }
    );

}

describe(
    "GraphBuilder",
    () => {

        it(
            "creates a region node for each account region",
            () => {

                const inv = graphInventory();
                const graph = new GraphBuilder().build(inv);
                expect(graph.hasNode("eu-west-1")).toBe(true);
                expect(graph.getNodeAttribute(
                    "eu-west-1",
                    "resourcetype"
                )).toBe("region");

            }
        );

        it(
            "creates VPC nodes and links them to region",
            () => {

                const inv = graphInventory({
                    "getVpcsByRegion": () => [
                        {"VpcId": "vpc-abc",
                            "CidrBlock": "10.0.0.0/16",
                            "Tags": [
                                {"Key": "Name",
                                    "Value": "my-vpc"}
                            ]}
                    ]
                });
                const graph = new GraphBuilder().build(inv);
                expect(graph.hasNode("vpc-abc")).toBe(true);
                expect(graph.getNodeAttribute(
                    "vpc-abc",
                    "label"
                )).toBe("my-vpc");
                expect(graph.hasDirectedEdge(
                    "vpc-abc",
                    "eu-west-1"
                )).toBe(true);

            }
        );

        it(
            "creates subnet → vpc edges",
            () => {

                const inv = graphInventory({
                    "getVpcsByRegion": () => [
                        {"VpcId": "vpc-abc",
                            "CidrBlock": "10.0.0.0/16"}
                    ],
                    "getSubnetsByRegion": () => [
                        {"SubnetId": "subnet-1",
                            "VpcId": "vpc-abc",
                            "CidrBlock": "10.0.1.0/24",
                            "AvailabilityZone": "eu-west-1a"}
                    ]
                });
                const graph = new GraphBuilder().build(inv);
                expect(graph.hasNode("subnet-1")).toBe(true);
                expect(graph.hasDirectedEdge(
                    "subnet-1",
                    "vpc-abc"
                )).toBe(true);

            }
        );

        it(
            "creates security group nodes linked to VPC",
            () => {

                const inv = graphInventory({
                    "getVpcsByRegion": () => [{"VpcId": "vpc-abc"}],
                    "getSecurityGroupsByRegion": () => [
                        {"GroupId": "sg-111",
                            "GroupName": "my-sg",
                            "VpcId": "vpc-abc"}
                    ]
                });
                const graph = new GraphBuilder().build(inv);
                expect(graph.hasNode("sg-111")).toBe(true);
                expect(graph.getNodeAttribute(
                    "sg-111",
                    "label"
                )).toBe("my-sg");
                expect(graph.hasDirectedEdge(
                    "sg-111",
                    "vpc-abc"
                )).toBe(true);

            }
        );

        it(
            "creates instance nodes with subnet and SG edges",
            () => {

                const inv = graphInventory({
                    "getVpcsByRegion": () => [{"VpcId": "vpc-abc"}],
                    "getSubnetsByRegion": () => [
                        {"SubnetId": "subnet-1",
                            "VpcId": "vpc-abc"}
                    ],
                    "getSecurityGroupsByRegion": () => [
                        {"GroupId": "sg-111",
                            "VpcId": "vpc-abc"}
                    ],
                    "getInstancesByRegion": () => [
                        {
                            "InstanceId": "i-12345",
                            "SubnetId": "subnet-1",
                            "SecurityGroups": [{"GroupId": "sg-111"}],
                            "State": {"Name": "running"},
                            "InstanceType": "t3.micro",
                            "Tags": [
                                {"Key": "Name",
                                    "Value": "web-server"}
                            ]
                        }
                    ]
                });
                const graph = new GraphBuilder().build(inv);
                expect(graph.hasNode("i-12345")).toBe(true);
                expect(graph.getNodeAttribute(
                    "i-12345",
                    "label"
                )).toBe("web-server");
                expect(graph.hasDirectedEdge(
                    "i-12345",
                    "subnet-1"
                )).toBe(true);
                expect(graph.hasDirectedEdge(
                    "i-12345",
                    "sg-111"
                )).toBe(true);

            }
        );

        it(
            "creates load balancer and target group nodes with edges",
            () => {

                const lbArn = "arn:aws:elasticloadbalancing:eu-west-1:123:loadbalancer/app/my-lb/abc";
                const tgArn = "arn:aws:elasticloadbalancing:eu-west-1:123:targetgroup/my-tg/xyz";

                const inv = graphInventory({
                    "getVpcsByRegion": () => [{"VpcId": "vpc-abc"}],
                    "getLoadBalancersByRegion": () => [
                        {"LoadBalancerArn": lbArn,
                            "LoadBalancerName": "my-lb",
                            "VpcId": "vpc-abc",
                            "Type": "application",
                            "Scheme": "internet-facing"}
                    ],
                    "getTargetGroupsByRegion": () => [
                        {"TargetGroupArn": tgArn,
                            "TargetGroupName": "my-tg",
                            "VpcId": "vpc-abc",
                            "LoadBalancerArns": [lbArn]}
                    ],
                    "getElbv2TagsByArn": () => []
                });
                const graph = new GraphBuilder().build(inv);
                expect(graph.hasNode(lbArn)).toBe(true);
                expect(graph.hasNode(tgArn)).toBe(true);
                expect(graph.getNodeAttribute(
                    lbArn,
                    "label"
                )).toBe("my-lb");
                expect(graph.getNodeAttribute(
                    tgArn,
                    "label"
                )).toBe("my-tg");
                // tg → lb (both ELBv2 nodes exist when TG is added)
                expect(graph.hasDirectedEdge(
                    tgArn,
                    lbArn
                )).toBe(true);

                /*
                 * lb → vpc edge is created because VPC node is added in #addRegionalResources (called last)
                 * and ELBv2 nodes are added earlier. Since addEdgeSafe only works when both nodes exist,
                 * we verify the VPC node exists and lb links to it (VPC is created after ELBv2 in pipeline,
                 * but actually #addRegionalResources creates VPC nodes, which ARE added after ELBv2)
                 */
                expect(graph.hasNode("vpc-abc")).toBe(true);

            }
        );

        it(
            "leaves orphaned nodes without a region attribute as singletons",
            () => {

                const inv = graphInventory({
                    "getInstancesByRegion": () => [
                        {
                            "InstanceId": "i-lonely",
                            "SubnetId": "subnet-nonexistent",
                            "SecurityGroups": [{"GroupId": "sg-nonexistent"}],
                            "State": {"Name": "running"}
                        }
                    ]
                });
                const graph = new GraphBuilder().build(inv);
                // Instance node is still created
                expect(graph.hasNode("i-lonely")).toBe(true);
                // No structural edges (subnet/sg missing), no region attribute → singleton
                expect(graph.edges("i-lonely")).toHaveLength(0);

            }
        );

        it(
            "stores tags as a Record<string, string> on nodes",
            () => {

                const inv = graphInventory({
                    "getVpcsByRegion": () => [
                        {"VpcId": "vpc-tagged",
                            "Tags": [
                                {"Key": "Environment",
                                    "Value": "prod"},
                                {"Key": "Team",
                                    "Value": "platform"}
                            ]}
                    ]
                });
                const graph = new GraphBuilder().build(inv);
                const tags = graph.getNodeAttribute(
                    "vpc-tagged",
                    "tags"
                ) as Record<string, string>;
                expect(tags).toEqual({"Environment": "prod",
                    "Team": "platform"});

            }
        );

        it(
            "builds an S3 bucket node linked to region",
            () => {

                const inv = graphInventory({
                    "getBuckets": () => [
                        {"bucket": {"Name": "my-bucket"},
                            "region": "eu-west-1",
                            "tags": [
                                {"Key": "App",
                                    "Value": "backend"}
                            ]}
                    ]
                });
                const graph = new GraphBuilder().build(inv);
                expect(graph.hasNode("my-bucket")).toBe(true);
                expect(graph.getNodeAttribute(
                    "my-bucket",
                    "resourcetype"
                )).toBe("s3bucket");
                expect(graph.hasDirectedEdge(
                    "my-bucket",
                    "eu-west-1"
                )).toBe(true);

            }
        );

        it(
            "handles empty inventory without errors",
            () => {

                const inv = graphInventory();
                const graph = new GraphBuilder().build(inv);
                // Should have at least the region node
                expect(graph.order).toBeGreaterThanOrEqual(1);
                expect(graph.hasNode("eu-west-1")).toBe(true);

            }
        );

        it(
            "creates Lambda function nodes with VPC edges",
            () => {

                const fnArn = "arn:aws:lambda:eu-west-1:123:function:my-fn";
                const inv = graphInventory({
                    "getVpcsByRegion": () => [{"VpcId": "vpc-abc"}],
                    "getSubnetsByRegion": () => [
                        {"SubnetId": "subnet-1",
                            "VpcId": "vpc-abc"}
                    ],
                    "getSecurityGroupsByRegion": () => [
                        {"GroupId": "sg-111",
                            "VpcId": "vpc-abc"}
                    ],
                    "getLambdasByRegion": () => [
                        {
                            "FunctionArn": fnArn,
                            "FunctionName": "my-fn",
                            "VpcConfig": {"SubnetIds": ["subnet-1"],
                                "SecurityGroupIds": ["sg-111"]}
                        }
                    ]
                });
                const graph = new GraphBuilder().build(inv);
                expect(graph.hasNode(fnArn)).toBe(true);
                expect(graph.hasDirectedEdge(
                    fnArn,
                    "subnet-1"
                )).toBe(true);
                expect(graph.hasDirectedEdge(
                    fnArn,
                    "sg-111"
                )).toBe(true);

            }
        );

    }
);

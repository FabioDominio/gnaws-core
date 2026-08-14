import type {AwsCredentialIdentity, AwsCredentialIdentityProvider} from "@aws-sdk/types";

import type {ServiceFactory} from "./serviceFactory.js";
import {checkServiceAvailability, SERVICE_ENDPOINT_PREFIX} from "./dnsPreCheck.js";
import type {Account} from "./interfaces/account.js";
import type {Iam} from "./interfaces/iam.js";
import {type Region, RegionOptStatus} from "@aws-sdk/client-account";
import type {Ec2} from "./interfaces/ec2.js";
import type {Lambda} from "./interfaces/lambda.js";
import type {S3, BucketInfo, DirectoryBucketInfo} from "./interfaces/s3.js";
import type {S3Tables} from "./interfaces/s3tables.js";
import type {CloudWatch} from "./interfaces/cloudwatch.js";
import type {CloudFront} from "./interfaces/cloudfront.js";
import type {DynamoDB} from "./interfaces/dynamodb.js";
import type {Ebs} from "./interfaces/ebs.js";
import type {Ecr} from "./interfaces/ecr.js";
import type {Ecs, ContainerInstanceInfo} from "./interfaces/ecs.js";
import type {Elbv2} from "./interfaces/elbv2.js";
import type {Sns} from "./interfaces/sns.js";
import type {Sqs, QueueInfo} from "./interfaces/sqs.js";
import type {Route53} from "./interfaces/route53.js";
import type {Eks} from "./interfaces/eks.js";
import type {SecretsManager} from "./interfaces/secretsmanager.js";
import type {Acm} from "./interfaces/acm.js";
import type {Efs} from "./interfaces/efs.js";
import type {Kms} from "./interfaces/kms.js";
import type {AutoScaling} from "./interfaces/autoscaling.js";
import type {Rds} from "./interfaces/rds.js";
import type {ApiGateway} from "./interfaces/apigateway.js";
import type {Waf} from "./interfaces/waf.js";
import type {WafResourceAssociation} from "./interfaces/waf.js";
import type {ElastiCache} from "./interfaces/elasticache.js";
import type {EventBridge} from "./interfaces/eventbridge.js";
import type {RuleWithTargets} from "./interfaces/eventbridge.js";
import type {Organizations} from "./interfaces/organizations.js";
import type {Sfn} from "./interfaces/sfn.js";
import type {StateMachineInfo} from "./interfaces/sfn.js";
import type {Kinesis} from "./interfaces/kinesis.js";
import type {OpenSearch} from "./interfaces/opensearch.js";
import type {CodeBuild} from "./interfaces/codebuild.js";
import type {Cognito, CognitoUserPoolInfo} from "./interfaces/cognito.js";
import type {ServiceDiscovery} from "./interfaces/servicediscovery.js";
import type {Backup} from "./interfaces/backup.js";
import type {Glacier} from "./interfaces/glacier.js";
import type {CodeArtifact} from "./interfaces/codeartifact.js";
import type {Msk} from "./interfaces/msk.js";
import type {Redshift} from "./interfaces/redshift.js";
import type {Neptune} from "./interfaces/neptune.js";
import type {DocDb} from "./interfaces/docdb.js";
import type {Fsx} from "./interfaces/fsx.js";
import type {NetworkFirewall, NetworkFirewallInfo} from "./interfaces/networkfirewall.js";
import type {FirewallPolicyMetadata, RuleGroupMetadata} from "@aws-sdk/client-network-firewall";
import type {CodePipeline} from "./interfaces/codepipeline.js";
import type {CloudTrail, CloudTrailTrailInfo} from "./interfaces/cloudtrail.js";
import type {GlobalAcceleratorService} from "./interfaces/globalaccelerator.js";
import type {Ssm} from "./interfaces/ssm.js";
import type {CloudFormation, StackResourcesMap} from "./interfaces/cloudformation.js";
import type {Mq} from "./interfaces/mq.js";
import type {Mwaa} from "./interfaces/mwaa.js";
import type {AppRunner} from "./interfaces/apprunner.js";
import type {BrokerSummary, Configuration as MqConfiguration} from "@aws-sdk/client-mq";
import type {Environment as MwaaEnvironment} from "@aws-sdk/client-mwaa";
import type {Service as AppRunnerServiceType, VpcConnector} from "@aws-sdk/client-apprunner";
import type {Transfer} from "./interfaces/transfer.js";
import type {DescribedServer} from "@aws-sdk/client-transfer";
import type {VpcLattice} from "./interfaces/vpclattice.js";
import type {ServiceNetworkSummary as LatticeServiceNetwork, ServiceSummary as LatticeService, TargetGroupSummary as LatticeTargetGroup, ServiceNetworkVpcAssociationSummary as LatticeVpcAssociation, ServiceNetworkServiceAssociationSummary as LatticeServiceAssociation} from "@aws-sdk/client-vpc-lattice";
import type {NetworkManager} from "./interfaces/networkmanager.js";
import type {GlobalNetwork, Site as NmSite, Device as NmDevice, Link as NmLink, Connection as NmConnection, CoreNetworkSummary, Attachment as NmAttachment, TransitGatewayRegistration} from "@aws-sdk/client-networkmanager";
import type {Iot} from "./interfaces/iot.js";
import type {ThingAttribute, ThingTypeDefinition, GroupNameAndArn as IotGroupNameAndArn, Certificate as IotCertificate, TopicRuleListItem, TopicRuleDestinationSummary} from "@aws-sdk/client-iot";
import type {Glue} from "./interfaces/glue.js";
import type {Connection as GlueConnection, Crawler, Database as GlueDatabase, Job as GlueJob, Trigger as GlueTrigger, Table as GlueTable, RegistryListItem, SchemaListItem, Workflow as GlueWorkflow} from "@aws-sdk/client-glue";
import type {Dms} from "./interfaces/dms.js";
import type {ReplicationInstance, ReplicationSubnetGroup as DmsSubnetGroup, Endpoint as DmsEndpoint, ReplicationTask, Connection as DmsConnection} from "@aws-sdk/client-database-migration-service";
import type {Route53Resolver} from "./interfaces/route53resolver.js";
import type {Batch} from "./interfaces/batch.js";
import type {MemoryDb} from "./interfaces/memorydb.js";
import type {Emr} from "./interfaces/emr.js";
import type {EmrServerless} from "./interfaces/emrserverless.js";
import type {ElasticBeanstalk} from "./interfaces/elasticbeanstalk.js";
import type {Athena} from "./interfaces/athena.js";
import type {ResolverEndpoint, ResolverRule, ResolverRuleAssociation, FirewallRuleGroupMetadata, FirewallRuleGroupAssociation} from "@aws-sdk/client-route53resolver";
import type {EgressOnlyInternetGateway, Instance, InternetGateway, NatGateway, NetworkInterface, RouteTable, SecurityGroup, Subnet, Volume, Vpc, VpcEndpoint, Address, Image, Snapshot, KeyPairInfo, NetworkAcl, FlowLog, DhcpOptions, ManagedPrefixList, VpcPeeringConnection, LaunchTemplate, TransitGateway, TransitGatewayAttachment, TransitGatewayConnect, TransitGatewayConnectPeer, TransitGatewayPeeringAttachment, TransitGatewayRouteTable, TransitGatewayVpcAttachment, SecurityGroupRule, LocalGateway, LocalGatewayRouteTable, LocalGatewayRouteTableVpcAssociation, LocalGatewayVirtualInterface, LocalGatewayVirtualInterfaceGroup, StaleSecurityGroup, Ec2InstanceConnectEndpoint, ImageRecycleBinInfo, SnapshotRecycleBinInfo, FleetData, TrafficMirrorSession, TrafficMirrorTarget, TrafficMirrorFilter, ClientVpnEndpoint, VerifiedAccessInstance, VerifiedAccessGroup, VerifiedAccessEndpoint, VerifiedAccessTrustProvider, ServiceConfiguration} from "@aws-sdk/client-ec2";
import type {Group, InstanceProfile, MFADevice, AccessKeyMetadata, ServerCertificateMetadata, SSHPublicKeyMetadata, VirtualMFADevice, Policy, Role, User} from "@aws-sdk/client-iam";
import type {AliasConfiguration, EventSourceMappingConfiguration, FunctionConfiguration, FunctionUrlConfig, LayersListItem, ProvisionedConcurrencyConfigListItem} from "@aws-sdk/client-lambda";
import type {LogGroup, SubscriptionFilter, MetricFilter, Delivery, DeliveryDestination, DeliverySource} from "@aws-sdk/client-cloudwatch-logs";
import type {MetricAlarm, CompositeAlarm, MetricStreamEntry} from "@aws-sdk/client-cloudwatch";
import type {DistributionSummary, FunctionSummary, OriginAccessControl, KeyValueStore} from "@aws-sdk/client-cloudfront";
import type {TableBucketSummary, NamespaceSummary, TableSummary} from "@aws-sdk/client-s3tables";
import type {TableDescription} from "@aws-sdk/client-dynamodb";
import type {Repository} from "@aws-sdk/client-ecr";
import type {Cluster, Service as EcsService} from "@aws-sdk/client-ecs";
import type {LoadBalancer, TargetGroup, Listener, Rule, TrustStore, TrustStoreAssociation} from "@aws-sdk/client-elastic-load-balancing-v2";
import type {Topic, Subscription} from "@aws-sdk/client-sns";
import type {HostedZone, ResourceRecordSet} from "@aws-sdk/client-route-53";
import type {Cluster as EksCluster, Nodegroup, FargateProfile, Addon as EksAddon, AccessEntry as EksAccessEntry} from "@aws-sdk/client-eks";
import type {PodIdentityInfo} from "./interfaces/eks.js";
import type {SecretListEntry} from "@aws-sdk/client-secrets-manager";
import type {CertificateSummary} from "@aws-sdk/client-acm";
import type {AccessPointDescription, FileSystemDescription, MountTargetDescription} from "@aws-sdk/client-efs";
import type {KeyListEntry, AliasListEntry} from "@aws-sdk/client-kms";
import type {AutoScalingGroup, LaunchConfiguration, ScalingPolicy, LifecycleHook} from "@aws-sdk/client-auto-scaling";
import type {DBInstance, DBCluster, DBProxy, DBSubnetGroup, DBProxyTargetGroup} from "@aws-sdk/client-rds";
import type {RestApi, VpcLink, DomainName, UsagePlan} from "@aws-sdk/client-api-gateway";
import type {Api, VpcLink as HttpVpcLink} from "@aws-sdk/client-apigatewayv2";
import type {WebACLSummary} from "@aws-sdk/client-wafv2";
import type {CacheCluster, CacheSubnetGroup, ReplicationGroup, ServerlessCache} from "@aws-sdk/client-elasticache";
import type {EventBus} from "@aws-sdk/client-eventbridge";
import type {Account as OrgAccount, OrganizationalUnit, PolicySummary as OrgPolicySummary, Root as OrgRoot} from "@aws-sdk/client-organizations";
import type {StreamSummary} from "@aws-sdk/client-kinesis";
import type {DomainStatus} from "@aws-sdk/client-opensearch";
import type {Project} from "@aws-sdk/client-codebuild";
import type {NamespaceSummary as CloudMapNamespace, Service as CloudMapService} from "@aws-sdk/client-servicediscovery";
import type {BackupVaultListMember, ProtectedResource} from "@aws-sdk/client-backup";
import type {DescribeVaultOutput} from "@aws-sdk/client-glacier";
import type {DomainSummary, RepositorySummary} from "@aws-sdk/client-codeartifact";
import type {ClusterInfo} from "@aws-sdk/client-kafka";
import type {Cluster as RedshiftCluster, ClusterSubnetGroup as RedshiftSubnetGroup} from "@aws-sdk/client-redshift";
import type {DBCluster as NeptuneDBCluster, DBInstance as NeptuneDBInstance, DBSubnetGroup as NeptuneSubnetGroup} from "@aws-sdk/client-neptune";
import type {DBCluster as DocDbDBCluster, DBInstance as DocDbDBInstance, DBSubnetGroup as DocDbSubnetGroup} from "@aws-sdk/client-docdb";
import type {FileSystem} from "@aws-sdk/client-fsx";
import type {PipelineSummary} from "@aws-sdk/client-codepipeline";
import type {Accelerator, Listener as GaListener, EndpointGroup} from "@aws-sdk/client-global-accelerator";
import type {ParameterMetadata, InstanceInformation, MaintenanceWindowIdentity, DocumentIdentifier, Association, PatchBaselineIdentity} from "@aws-sdk/client-ssm";
import type {StackSummary, Export, StackSetSummary} from "@aws-sdk/client-cloudformation";
import type {BackupPlansListMember, BackupSelectionsListMember} from "@aws-sdk/client-backup";
import type {ProviderDescription, UserPoolClientDescription} from "@aws-sdk/client-cognito-identity-provider";
import type {InstanceSummary as CloudMapInstanceSummary} from "@aws-sdk/client-servicediscovery";
import type {HealthCheck} from "@aws-sdk/client-route-53";
import type {ComputeEnvironmentDetail, JobQueueDetail, SchedulingPolicyListingDetail} from "@aws-sdk/client-batch";
import type {Cluster as MemoryDbCluster, SubnetGroup as MemoryDbSubnetGroup, ACL as MemoryDbACL, User as MemoryDbUser} from "@aws-sdk/client-memorydb";
import type {ClusterSummary as EmrClusterSummary, InstanceFleet as EmrInstanceFleet, InstanceGroup as EmrInstanceGroup, SecurityConfigurationSummary as EmrSecurityConfig} from "@aws-sdk/client-emr";
import type {ApplicationSummary as EmrServerlessApp} from "@aws-sdk/client-emr-serverless";
import type {ApplicationDescription as BeanstalkApp, EnvironmentDescription as BeanstalkEnv} from "@aws-sdk/client-elastic-beanstalk";
import type {WorkGroup as AthenaWorkGroup, DataCatalogSummary as AthenaDataCatalog} from "@aws-sdk/client-athena";
import type {DataSync} from "./interfaces/datasync.js";
import type {AgentListEntry as DataSyncAgent, LocationListEntry as DataSyncLocation, DescribeTaskResponse as DataSyncTask} from "@aws-sdk/client-datasync";
import type {AppSync} from "./interfaces/appsync.js";
import type {GraphqlApi, DataSource as AppSyncDataSource} from "@aws-sdk/client-appsync";
import type {RedshiftServerless} from "./interfaces/redshiftserverless.js";
import type {Namespace as RsNamespace, Workgroup as RsWorkgroup} from "@aws-sdk/client-redshift-serverless";
import type {OpenSearchServerless} from "./interfaces/opensearchserverless.js";
import type {CollectionSummary as OssCollection, VpcEndpointSummary as OssVpcEndpoint} from "@aws-sdk/client-opensearchserverless";
import type {DirectoryService} from "./interfaces/directoryservice.js";
import type {DirectoryDescription} from "@aws-sdk/client-directory-service";
import type {WorkSpaces} from "./interfaces/workspaces.js";
import type {Workspace, WorkspaceDirectory} from "@aws-sdk/client-workspaces";
import type {CloudHsm} from "./interfaces/cloudhsm.js";
import type {Cluster as HsmCluster} from "@aws-sdk/client-cloudhsm-v2";
import type {AppMesh} from "./interfaces/appmesh.js";
import type {MeshRef, VirtualNodeRef, VirtualServiceRef} from "@aws-sdk/client-app-mesh";
import type {S3Control} from "./interfaces/s3control.js";
import type {AccessPoint as S3AccessPoint} from "@aws-sdk/client-s3-control";
import type {Elb} from "./interfaces/elb.js";
import type {LoadBalancerDescription as ClassicLoadBalancer} from "@aws-sdk/client-elastic-load-balancing";
import type {Pipes} from "./interfaces/pipes.js";
import type {Pipe} from "@aws-sdk/client-pipes";
import type {StorageGateway} from "./interfaces/storagegateway.js";
import type {GatewayInfo, FileShareInfo, VolumeInfo} from "@aws-sdk/client-storage-gateway";
import type {Outposts} from "./interfaces/outposts.js";
import type {Outpost as AwsOutpost, Site as OutpostSite} from "@aws-sdk/client-outposts";
import type {ImageBuilder} from "./interfaces/imagebuilder.js";
import type {InfrastructureConfiguration} from "@aws-sdk/client-imagebuilder";
import type {CodeDeploy} from "./interfaces/codedeploy.js";
import type {DeploymentGroupInfo} from "@aws-sdk/client-codedeploy";
import type {MediaConnect} from "./interfaces/mediaconnect.js";
import type {Flow as MediaConnectFlow} from "@aws-sdk/client-mediaconnect";
import type {SageMaker} from "./interfaces/sagemaker.js";
import type {DescribeNotebookInstanceOutput} from "@aws-sdk/client-sagemaker";

export interface GroupMembership {
    "groupId": string;
    "userId": string;
}

export interface InstanceProfileRoleEdge {
    "instanceProfileId": string;
    "roleId": string;
}

export interface OrganizationalUnitWithParent {
    "ou": OrganizationalUnit;
    "parentId": string;
}

export interface RuleWithListenerArn {
    "rule": Rule;
    "listenerArn": string;
}

export class Inventory {

    #accountService: Account | undefined;

    #iamService: Iam | undefined;

    #s3Service: S3 | undefined;

    #cloudFrontService: CloudFront | undefined;

    #distributions: DistributionSummary[];

    #cloudFrontFunctions: FunctionSummary[];

    #originAccessControls: OriginAccessControl[];

    #keyValueStores: KeyValueStore[];

    #s3TablesServicesByRegion: Map<string, S3Tables>;

    #tableBucketsByRegion: Map<string, TableBucketSummary[]>;

    #namespacesByRegion: Map<string, NamespaceSummary[]>;

    #tablesByRegion: Map<string, TableSummary[]>;

    #dynamoDBServicesByRegion: Map<string, DynamoDB>;

    #dynamoDBTablesByRegion: Map<string, TableDescription[]>;

    #ebsServicesByRegion: Map<string, Ebs>;

    #snapshotBlockCounts: Map<string, number>;

    #ecrServicesByRegion: Map<string, Ecr>;

    #ecrRepositoriesByRegion: Map<string, Repository[]>;

    #ecsServicesByRegion: Map<string, Ecs>;

    #ecsClusters: Map<string, Cluster[]>;

    #ecsServices: Map<string, EcsService[]>;

    #ecsTaskDefinitionArns: Map<string, string[]>;

    #ecsContainerInstances: Map<string, ContainerInstanceInfo[]>;

    #elbv2ServicesByRegion: Map<string, Elbv2>;

    #loadBalancersByRegion: Map<string, LoadBalancer[]>;

    #trustStoresByRegion: Map<string, TrustStore[]>;

    #trustStoreAssociationsByRegion: Map<string, TrustStoreAssociation[]>;

    #targetGroupsByRegion: Map<string, TargetGroup[]>;

    #listenersByRegion: Map<string, Listener[]>;

    #rulesByRegion: Map<string, RuleWithListenerArn[]>;

    #listenerCertificatesByListener: Map<string, string[]>;

    #elbv2TagsByArn: Map<string, {"Key"?: string;
        "Value"?: string;}[]>;

    #snsServicesByRegion: Map<string, Sns>;

    #topicsByRegion: Map<string, Topic[]>;

    #subscriptionsByRegion: Map<string, Subscription[]>;

    #sqsServicesByRegion: Map<string, Sqs>;

    #queuesByRegion: Map<string, QueueInfo[]>;

    #route53Service: Route53 | undefined;

    #hostedZones: HostedZone[];

    #recordSetsByZone: Map<string, ResourceRecordSet[]>;

    #eksServicesByRegion: Map<string, Eks>;

    #eksClustersByRegion: Map<string, EksCluster[]>;

    #eksNodegroupsByRegion: Map<string, Nodegroup[]>;

    #fargateProfilesByRegion: Map<string, FargateProfile[]>;

    #podIdentityAssociationsByRegion: Map<string, PodIdentityInfo[]>;

    #eksAddonsByRegion: Map<string, EksAddon[]>;

    #eksAccessEntriesByRegion: Map<string, EksAccessEntry[]>;

    #secretsManagerServicesByRegion: Map<string, SecretsManager>;

    #secretsByRegion: Map<string, SecretListEntry[]>;

    #acmServicesByRegion: Map<string, Acm>;

    #certificatesByRegion: Map<string, CertificateSummary[]>;

    #efsServicesByRegion: Map<string, Efs>;

    #fileSystemsByRegion: Map<string, FileSystemDescription[]>;

    #mountTargetsByFileSystem: Map<string, MountTargetDescription[]>;

    #accessPointsByRegion: Map<string, AccessPointDescription[]>;

    #kmsServicesByRegion: Map<string, Kms>;

    #keysByRegion: Map<string, KeyListEntry[]>;

    #aliasesByKeyId: Map<string, AliasListEntry[]>;

    #autoScalingServicesByRegion: Map<string, AutoScaling>;

    #autoScalingGroupsByRegion: Map<string, AutoScalingGroup[]>;

    #launchConfigsByRegion: Map<string, LaunchConfiguration[]>;

    #scalingPoliciesByRegion: Map<string, ScalingPolicy[]>;

    #lifecycleHooksByRegion: Map<string, LifecycleHook[]>;

    #rdsServicesByRegion: Map<string, Rds>;

    #dbInstancesByRegion: Map<string, DBInstance[]>;

    #dbClustersByRegion: Map<string, DBCluster[]>;

    #dbProxiesByRegion: Map<string, DBProxy[]>;

    #dbSubnetGroupsByRegion: Map<string, DBSubnetGroup[]>;

    #dbProxyTargetGroupsByRegion: Map<string, DBProxyTargetGroup[]>;

    #apiGatewayServicesByRegion: Map<string, ApiGateway>;

    #restApisByRegion: Map<string, RestApi[]>;

    #httpApisByRegion: Map<string, Api[]>;

    #httpVpcLinksByRegion: Map<string, HttpVpcLink[]>;

    #vpcLinksByRegion: Map<string, VpcLink[]>;

    #domainNamesByRegion: Map<string, DomainName[]>;

    #usagePlansByRegion: Map<string, UsagePlan[]>;

    #wafServicesByRegion: Map<string, Waf>;

    #webAclsByRegion: Map<string, WebACLSummary[]>;

    #wafResourceAssociations: WafResourceAssociation[];

    #elastiCacheServicesByRegion: Map<string, ElastiCache>;

    #cacheClustersByRegion: Map<string, CacheCluster[]>;

    #replicationGroupsByRegion: Map<string, ReplicationGroup[]>;

    #cacheSubnetGroupsByRegion: Map<string, CacheSubnetGroup[]>;

    #serverlessCachesByRegion: Map<string, ServerlessCache[]>;

    #eventBridgeServicesByRegion: Map<string, EventBridge>;

    #eventBusesByRegion: Map<string, EventBus[]>;

    #eventBridgeRulesByRegion: Map<string, RuleWithTargets[]>;

    #sfnServicesByRegion: Map<string, Sfn>;

    #stateMachinesByRegion: Map<string, StateMachineInfo[]>;

    #kinesisServicesByRegion: Map<string, Kinesis>;

    #kinesisStreamsByRegion: Map<string, StreamSummary[]>;

    #openSearchServicesByRegion: Map<string, OpenSearch>;

    #openSearchDomainsByRegion: Map<string, DomainStatus[]>;

    #codeBuildServicesByRegion: Map<string, CodeBuild>;

    #codeBuildProjectsByRegion: Map<string, Project[]>;

    #cognitoServicesByRegion: Map<string, Cognito>;

    #cognitoUserPoolsByRegion: Map<string, CognitoUserPoolInfo[]>;

    #serviceDiscoveryServicesByRegion: Map<string, ServiceDiscovery>;

    #cloudMapNamespacesByRegion: Map<string, CloudMapNamespace[]>;

    #cloudMapServicesByRegion: Map<string, CloudMapService[]>;

    #backupServicesByRegion: Map<string, Backup>;

    #backupVaultsByRegion: Map<string, BackupVaultListMember[]>;

    #protectedResourcesByRegion: Map<string, ProtectedResource[]>;

    #glacierServicesByRegion: Map<string, Glacier>;

    #glacierVaultsByRegion: Map<string, DescribeVaultOutput[]>;

    #codeArtifactServicesByRegion: Map<string, CodeArtifact>;

    #codeArtifactDomainsByRegion: Map<string, DomainSummary[]>;

    #codeArtifactRepositoriesByRegion: Map<string, RepositorySummary[]>;

    #mskServicesByRegion: Map<string, Msk>;

    #mskClustersByRegion: Map<string, ClusterInfo[]>;

    #redshiftServicesByRegion: Map<string, Redshift>;

    #redshiftClustersByRegion: Map<string, RedshiftCluster[]>;

    #redshiftSubnetGroupsByRegion: Map<string, RedshiftSubnetGroup[]>;

    #neptuneServicesByRegion: Map<string, Neptune>;

    #neptuneClustersByRegion: Map<string, NeptuneDBCluster[]>;

    #neptuneInstancesByRegion: Map<string, NeptuneDBInstance[]>;

    #neptuneSubnetGroupsByRegion: Map<string, NeptuneSubnetGroup[]>;

    #docDbServicesByRegion: Map<string, DocDb>;

    #docDbClustersByRegion: Map<string, DocDbDBCluster[]>;

    #docDbInstancesByRegion: Map<string, DocDbDBInstance[]>;

    #docDbSubnetGroupsByRegion: Map<string, DocDbSubnetGroup[]>;

    #fsxServicesByRegion: Map<string, Fsx>;

    #fsxFileSystemsByRegion: Map<string, FileSystem[]>;

    #networkFirewallServicesByRegion: Map<string, NetworkFirewall>;

    #networkFirewallsByRegion: Map<string, NetworkFirewallInfo[]>;

    #firewallPoliciesByRegion: Map<string, FirewallPolicyMetadata[]>;

    #ruleGroupsByRegion: Map<string, RuleGroupMetadata[]>;

    #codePipelineServicesByRegion: Map<string, CodePipeline>;

    #codePipelinesByRegion: Map<string, PipelineSummary[]>;

    #cloudTrailServicesByRegion: Map<string, CloudTrail>;

    #cloudTrailsByRegion: Map<string, CloudTrailTrailInfo[]>;

    #ssmServicesByRegion: Map<string, Ssm>;

    #ssmParametersByRegion: Map<string, ParameterMetadata[]>;

    #ssmManagedInstancesByRegion: Map<string, InstanceInformation[]>;

    #ssmMaintenanceWindowsByRegion: Map<string, MaintenanceWindowIdentity[]>;

    #ssmDocumentsByRegion: Map<string, DocumentIdentifier[]>;

    #ssmAssociationsByRegion: Map<string, Association[]>;

    #cloudFormationServicesByRegion: Map<string, CloudFormation>;

    #cfnStacksByRegion: Map<string, StackSummary[]>;

    #cfnStackResourcesByRegion: Map<string, StackResourcesMap>;

    #mqServicesByRegion: Map<string, Mq>;

    #mqBrokersByRegion: Map<string, BrokerSummary[]>;

    #mqConfigurationsByRegion: Map<string, MqConfiguration[]>;

    #mwaaServicesByRegion: Map<string, Mwaa>;

    #mwaaEnvironmentsByRegion: Map<string, MwaaEnvironment[]>;

    #appRunnerServicesByRegion: Map<string, AppRunner>;

    #appRunnerSvcsByRegion: Map<string, AppRunnerServiceType[]>;

    #vpcConnectorsByRegion: Map<string, VpcConnector[]>;

    #transferServicesByRegion: Map<string, Transfer>;

    #transferServersByRegion: Map<string, DescribedServer[]>;

    #vpcLatticeServicesByRegion: Map<string, VpcLattice>;

    #latticeServiceNetworksByRegion: Map<string, LatticeServiceNetwork[]>;

    #latticeServicesByRegion: Map<string, LatticeService[]>;

    #latticeTargetGroupsByRegion: Map<string, LatticeTargetGroup[]>;

    #latticeVpcAssociationsByRegion: Map<string, LatticeVpcAssociation[]>;

    #latticeServiceAssociationsByRegion: Map<string, LatticeServiceAssociation[]>;

    #networkManagerService: NetworkManager | undefined;

    #globalNetworks: GlobalNetwork[] = [];

    #nmSites: NmSite[] = [];

    #nmDevices: NmDevice[] = [];

    #nmLinks: NmLink[] = [];

    #nmConnections: NmConnection[] = [];

    #coreNetworks: CoreNetworkSummary[] = [];

    #nmAttachments: NmAttachment[] = [];

    #transitGatewayRegistrations: TransitGatewayRegistration[] = [];

    #iotServicesByRegion: Map<string, Iot>;

    #iotThingsByRegion: Map<string, ThingAttribute[]>;

    #iotThingTypesByRegion: Map<string, ThingTypeDefinition[]>;

    #iotThingGroupsByRegion: Map<string, IotGroupNameAndArn[]>;

    #iotCertificatesByRegion: Map<string, IotCertificate[]>;

    #iotTopicRulesByRegion: Map<string, TopicRuleListItem[]>;

    #iotTopicRuleDestinationsByRegion: Map<string, TopicRuleDestinationSummary[]>;

    #glueServicesByRegion: Map<string, Glue>;

    #glueConnectionsByRegion: Map<string, GlueConnection[]>;

    #glueCrawlersByRegion: Map<string, Crawler[]>;

    #glueDatabasesByRegion: Map<string, GlueDatabase[]>;

    #glueJobsByRegion: Map<string, GlueJob[]>;

    #glueTriggersByRegion: Map<string, GlueTrigger[]>;

    #glueTablesByRegion: Map<string, GlueTable[]>;

    #glueRegistriesByRegion: Map<string, RegistryListItem[]>;

    #glueSchemasByRegion: Map<string, SchemaListItem[]>;

    #glueWorkflowsByRegion: Map<string, GlueWorkflow[]>;

    #dmsServicesByRegion: Map<string, Dms>;

    #dmsReplicationInstancesByRegion: Map<string, ReplicationInstance[]>;

    #dmsSubnetGroupsByRegion: Map<string, DmsSubnetGroup[]>;

    #dmsEndpointsByRegion: Map<string, DmsEndpoint[]>;

    #dmsReplicationTasksByRegion: Map<string, ReplicationTask[]>;

    #dmsConnectionsByRegion: Map<string, DmsConnection[]>;

    #route53ResolverServicesByRegion: Map<string, Route53Resolver>;

    #resolverEndpointsByRegion: Map<string, ResolverEndpoint[]>;

    #resolverRulesByRegion: Map<string, ResolverRule[]>;

    #resolverRuleAssociationsByRegion: Map<string, ResolverRuleAssociation[]>;

    #firewallRuleGroupsByRegion: Map<string, FirewallRuleGroupMetadata[]>;

    #firewallRuleGroupAssociationsByRegion: Map<string, FirewallRuleGroupAssociation[]>;

    #cfnExportsByRegion: Map<string, Export[]>;

    #cfnStackSetsByRegion: Map<string, StackSetSummary[]>;

    #globalAcceleratorService: GlobalAcceleratorService | undefined;

    #accelerators: Accelerator[];

    #acceleratorListeners: GaListener[];

    #acceleratorEndpointGroups: EndpointGroup[];

    #ssmPatchBaselinesByRegion: Map<string, PatchBaselineIdentity[]>;

    #backupPlansByRegion: Map<string, BackupPlansListMember[]>;

    #backupSelectionsByRegion: Map<string, BackupSelectionsListMember[]>;

    #cognitoIdentityProvidersByRegion: Map<string, ProviderDescription[]>;

    #cognitoUserPoolClientsByRegion: Map<string, UserPoolClientDescription[]>;

    #cloudMapInstancesByRegion: Map<string, CloudMapInstanceSummary[]>;

    #route53HealthChecks: HealthCheck[];

    #directoryBuckets: DirectoryBucketInfo[];

    #dlqSourceEdges: {"sourceArn": string;
        "dlqArn": string;}[];

    #organizationsService: Organizations | undefined;

    #orgRoots: OrgRoot[];

    #orgOUs: OrganizationalUnitWithParent[];

    #orgAccounts: OrgAccount[];

    #orgPolicies: OrgPolicySummary[];

    #batchServicesByRegion: Map<string, Batch>;

    #batchComputeEnvironmentsByRegion: Map<string, ComputeEnvironmentDetail[]>;

    #batchJobQueuesByRegion: Map<string, JobQueueDetail[]>;

    #batchSchedulingPoliciesByRegion: Map<string, SchedulingPolicyListingDetail[]>;

    #memoryDbServicesByRegion: Map<string, MemoryDb>;

    #memoryDbClustersByRegion: Map<string, MemoryDbCluster[]>;

    #memoryDbSubnetGroupsByRegion: Map<string, MemoryDbSubnetGroup[]>;

    #memoryDbAclsByRegion: Map<string, MemoryDbACL[]>;

    #memoryDbUsersByRegion: Map<string, MemoryDbUser[]>;

    #emrServicesByRegion: Map<string, Emr>;

    #emrClustersByRegion: Map<string, EmrClusterSummary[]>;

    #emrInstanceFleetsByRegion: Map<string, EmrInstanceFleet[]>;

    #emrInstanceGroupsByRegion: Map<string, EmrInstanceGroup[]>;

    #emrSecurityConfigsByRegion: Map<string, EmrSecurityConfig[]>;

    #emrServerlessServicesByRegion: Map<string, EmrServerless>;

    #emrServerlessAppsByRegion: Map<string, EmrServerlessApp[]>;

    #beanstalkServicesByRegion: Map<string, ElasticBeanstalk>;

    #beanstalkAppsByRegion: Map<string, BeanstalkApp[]>;

    #beanstalkEnvsByRegion: Map<string, BeanstalkEnv[]>;

    #athenaServicesByRegion: Map<string, Athena>;

    #athenaWorkGroupsByRegion: Map<string, AthenaWorkGroup[]>;

    #athenaDataCatalogsByRegion: Map<string, AthenaDataCatalog[]>;

    #dataSyncServicesByRegion: Map<string, DataSync>;

    #dataSyncAgentsByRegion: Map<string, DataSyncAgent[]>;

    #dataSyncLocationsByRegion: Map<string, DataSyncLocation[]>;

    #dataSyncTasksByRegion: Map<string, DataSyncTask[]>;

    #appSyncServicesByRegion: Map<string, AppSync>;

    #graphqlApisByRegion: Map<string, GraphqlApi[]>;

    #appSyncDataSourcesByRegion: Map<string, AppSyncDataSource[]>;

    #redshiftServerlessServicesByRegion: Map<string, RedshiftServerless>;

    #rsNamespacesByRegion: Map<string, RsNamespace[]>;

    #rsWorkgroupsByRegion: Map<string, RsWorkgroup[]>;

    #ossServicesByRegion: Map<string, OpenSearchServerless>;

    #ossCollectionsByRegion: Map<string, OssCollection[]>;

    #ossVpcEndpointsByRegion: Map<string, OssVpcEndpoint[]>;

    #directoryServicesByRegion: Map<string, DirectoryService>;

    #directoriesByRegion: Map<string, DirectoryDescription[]>;

    #workspacesServicesByRegion: Map<string, WorkSpaces>;

    #workspacesByRegion: Map<string, Workspace[]>;

    #workspaceDirectoriesByRegion: Map<string, WorkspaceDirectory[]>;

    #cloudHsmServicesByRegion: Map<string, CloudHsm>;

    #hsmClustersByRegion: Map<string, HsmCluster[]>;

    #appMeshServicesByRegion: Map<string, AppMesh>;

    #meshesByRegion: Map<string, MeshRef[]>;

    #virtualNodesByRegion: Map<string, VirtualNodeRef[]>;

    #virtualServicesByRegion: Map<string, VirtualServiceRef[]>;

    #s3ControlServicesByRegion: Map<string, S3Control>;

    #s3AccessPointsByRegion: Map<string, S3AccessPoint[]>;

    #elbServicesByRegion: Map<string, Elb>;

    #classicLoadBalancersByRegion: Map<string, ClassicLoadBalancer[]>;

    #pipesServicesByRegion: Map<string, Pipes>;

    #pipesByRegion: Map<string, Pipe[]>;

    #storageGatewayServicesByRegion: Map<string, StorageGateway>;

    #gatewaysByRegion: Map<string, GatewayInfo[]>;

    #fileSharesByRegion: Map<string, FileShareInfo[]>;

    #sgwVolumesByRegion: Map<string, VolumeInfo[]>;

    #outpostsServicesByRegion: Map<string, Outposts>;

    #outpostsByRegion: Map<string, AwsOutpost[]>;

    #outpostSitesByRegion: Map<string, OutpostSite[]>;

    #imageBuilderServicesByRegion: Map<string, ImageBuilder>;

    #infraConfigsByRegion: Map<string, InfrastructureConfiguration[]>;

    #codeDeployServicesByRegion: Map<string, CodeDeploy>;

    #deploymentGroupsByRegion: Map<string, DeploymentGroupInfo[]>;

    #mediaConnectServicesByRegion: Map<string, MediaConnect>;

    #mediaConnectFlowsByRegion: Map<string, MediaConnectFlow[]>;

    #sageMakerServicesByRegion: Map<string, SageMaker>;

    #notebookInstancesByRegion: Map<string, DescribeNotebookInstanceOutput[]>;

    #accountRegions: Region[] = [];

    #credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity;

    #factory: ServiceFactory;

    #ec2ServicesByRegion: Map<string, Ec2>;

    #lambdaServicesByRegion: Map<string, Lambda>;

    #vpcsByRegion: Map<string, Vpc[]>;

    #subnetsByRegion: Map<string, Subnet[]>;

    #securityGroupsByRegion: Map<string, SecurityGroup[]>;

    #internetGatewaysByRegion: Map<string, InternetGateway[]>;

    #egressOnlyInternetGatewaysByRegion: Map<string, EgressOnlyInternetGateway[]>;

    #natGatewaysByRegion: Map<string, NatGateway[]>;

    #networkInterfacesByRegion: Map<string, NetworkInterface[]>;

    #lambdasByRegion: Map<string, FunctionConfiguration[]>;

    #routeTablesByRegion: Map<string, RouteTable[]>;

    #volumesByRegion: Map<string, Volume[]>;

    #instancesByRegion: Map<string, Instance[]>;

    #vpcEndpointsByRegion: Map<string, VpcEndpoint[]>;

    #addressesByRegion: Map<string, Address[]>;

    #imagesByRegion: Map<string, Image[]>;

    #snapshotsByRegion: Map<string, Snapshot[]>;

    #keyPairsByRegion: Map<string, KeyPairInfo[]>;

    #networkAclsByRegion: Map<string, NetworkAcl[]>;

    #flowLogsByRegion: Map<string, FlowLog[]>;

    #dhcpOptionsByRegion: Map<string, DhcpOptions[]>;

    #managedPrefixListsByRegion: Map<string, ManagedPrefixList[]>;

    #vpcPeeringConnectionsByRegion: Map<string, VpcPeeringConnection[]>;

    #launchTemplatesByRegion: Map<string, LaunchTemplate[]>;

    #transitGatewaysByRegion: Map<string, TransitGateway[]>;

    #transitGatewayAttachmentsByRegion: Map<string, TransitGatewayAttachment[]>;

    #transitGatewayRouteTablesByRegion: Map<string, TransitGatewayRouteTable[]>;

    #transitGatewayVpcAttachmentsByRegion: Map<string, TransitGatewayVpcAttachment[]>;

    #transitGatewayPeeringAttachmentsByRegion: Map<string, TransitGatewayPeeringAttachment[]>;

    #transitGatewayConnectsByRegion: Map<string, TransitGatewayConnect[]>;

    #transitGatewayConnectPeersByRegion: Map<string, TransitGatewayConnectPeer[]>;

    #verifiedAccessInstancesByRegion: Map<string, VerifiedAccessInstance[]>;

    #verifiedAccessGroupsByRegion: Map<string, VerifiedAccessGroup[]>;

    #verifiedAccessEndpointsByRegion: Map<string, VerifiedAccessEndpoint[]>;

    #verifiedAccessTrustProvidersByRegion: Map<string, VerifiedAccessTrustProvider[]>;

    #vpcEndpointServiceConfigsByRegion: Map<string, ServiceConfiguration[]>;

    #securityGroupRulesByRegion: Map<string, SecurityGroupRule[]>;

    #localGatewaysByRegion: Map<string, LocalGateway[]>;

    #localGatewayRouteTablesByRegion: Map<string, LocalGatewayRouteTable[]>;

    #localGatewayRtVpcAssociationsByRegion: Map<string, LocalGatewayRouteTableVpcAssociation[]>;

    #localGatewayVirtualInterfacesByRegion: Map<string, LocalGatewayVirtualInterface[]>;

    #localGatewayVifGroupsByRegion: Map<string, LocalGatewayVirtualInterfaceGroup[]>;

    #staleSecurityGroupsByRegion: Map<string, StaleSecurityGroup[]>;

    #instanceConnectEndpointsByRegion: Map<string, Ec2InstanceConnectEndpoint[]>;

    #imagesInRecycleBinByRegion: Map<string, ImageRecycleBinInfo[]>;

    #snapshotsInRecycleBinByRegion: Map<string, SnapshotRecycleBinInfo[]>;

    #fleetsByRegion: Map<string, FleetData[]>;

    #trafficMirrorSessionsByRegion: Map<string, TrafficMirrorSession[]>;

    #trafficMirrorTargetsByRegion: Map<string, TrafficMirrorTarget[]>;

    #trafficMirrorFiltersByRegion: Map<string, TrafficMirrorFilter[]>;

    #clientVpnEndpointsByRegion: Map<string, ClientVpnEndpoint[]>;

    #eventSourceMappingsByRegion: Map<string, EventSourceMappingConfiguration[]>;

    #layersByRegion: Map<string, LayersListItem[]>;

    #aliasesByRegion: Map<string, AliasConfiguration[]>;

    #functionUrlConfigsByRegion: Map<string, FunctionUrlConfig[]>;

    #provisionedConcurrencyByRegion: Map<string, ProvisionedConcurrencyConfigListItem[]>;

    #cloudWatchServicesByRegion: Map<string, CloudWatch>;

    #logGroupsByRegion: Map<string, LogGroup[]>;

    #metricAlarmsByRegion: Map<string, MetricAlarm[]>;

    #compositeAlarmsByRegion: Map<string, CompositeAlarm[]>;

    #subscriptionFiltersByRegion: Map<string, SubscriptionFilter[]>;

    #metricStreamsByRegion: Map<string, MetricStreamEntry[]>;

    #metricFiltersByRegion: Map<string, MetricFilter[]>;

    #deliveriesByRegion: Map<string, Delivery[]>;

    #deliveryDestinationsByRegion: Map<string, DeliveryDestination[]>;

    #deliverySourcesByRegion: Map<string, DeliverySource[]>;

    #instanceProfiles: InstanceProfile[];

    #buckets: BucketInfo[];

    #users: User[];

    #roles: Role[];

    #policies: Policy[];

    #userGroups: Group[];

    #mfaDevices: MFADevice[];

    #accessKeys: AccessKeyMetadata[];

    #serverCertificates: ServerCertificateMetadata[];

    #sshPublicKeys: SSHPublicKeyMetadata[];

    #virtualMfaDevices: VirtualMFADevice[];

    #userGroupMemberships: GroupMembership[];

    #instanceProfileRoleEdges: InstanceProfileRoleEdge[];

    #rolePolicies: Map<string, string[]>;

    #userPolicies: Map<string, string[]>;

    #groupPolicies: Map<string, string[]>;

    #groupMemberships: GroupMembership[];

    constructor (credentialsOrFactory: AwsCredentialIdentityProvider | AwsCredentialIdentity | ServiceFactory, factory?: ServiceFactory) {

        if (factory === undefined) {

            // Called as: new Inventory(factory) — offline/cache mode, no credentials needed
            this.#credentials = {"accessKeyId": "",
                "secretAccessKey": ""};
            this.#factory = credentialsOrFactory as ServiceFactory;

        } else {

            // Called as: new Inventory(credentials, factory) — live mode
            this.#credentials = credentialsOrFactory as AwsCredentialIdentityProvider | AwsCredentialIdentity;
            this.#factory = factory;

        }
        this.#ec2ServicesByRegion = new Map<string, Ec2>();
        this.#lambdaServicesByRegion = new Map<string, Lambda>();
        this.#users = [];
        this.#roles = [];
        this.#policies = [];
        this.#userGroups = [];
        this.#instanceProfiles = [];
        this.#buckets = [];
        this.#distributions = [];
        this.#cloudFrontFunctions = [];
        this.#originAccessControls = [];
        this.#keyValueStores = [];
        this.#s3TablesServicesByRegion = new Map();
        this.#tableBucketsByRegion = new Map();
        this.#namespacesByRegion = new Map();
        this.#tablesByRegion = new Map();
        this.#dynamoDBServicesByRegion = new Map();
        this.#dynamoDBTablesByRegion = new Map();
        this.#ebsServicesByRegion = new Map();
        this.#snapshotBlockCounts = new Map();
        this.#ecrServicesByRegion = new Map();
        this.#ecrRepositoriesByRegion = new Map();
        this.#ecsServicesByRegion = new Map();
        this.#ecsClusters = new Map();
        this.#ecsServices = new Map();
        this.#ecsTaskDefinitionArns = new Map();
        this.#ecsContainerInstances = new Map();
        this.#elbv2ServicesByRegion = new Map();
        this.#loadBalancersByRegion = new Map();
        this.#trustStoresByRegion = new Map();
        this.#trustStoreAssociationsByRegion = new Map();
        this.#targetGroupsByRegion = new Map();
        this.#listenersByRegion = new Map();
        this.#rulesByRegion = new Map();
        this.#listenerCertificatesByListener = new Map();
        this.#elbv2TagsByArn = new Map();
        this.#snsServicesByRegion = new Map();
        this.#topicsByRegion = new Map();
        this.#subscriptionsByRegion = new Map();
        this.#sqsServicesByRegion = new Map();
        this.#queuesByRegion = new Map();
        this.#hostedZones = [];
        this.#recordSetsByZone = new Map();
        this.#eksServicesByRegion = new Map();
        this.#eksClustersByRegion = new Map();
        this.#eksNodegroupsByRegion = new Map();
        this.#fargateProfilesByRegion = new Map();
        this.#podIdentityAssociationsByRegion = new Map();
        this.#eksAddonsByRegion = new Map();
        this.#eksAccessEntriesByRegion = new Map();
        this.#secretsManagerServicesByRegion = new Map();
        this.#secretsByRegion = new Map();
        this.#acmServicesByRegion = new Map();
        this.#certificatesByRegion = new Map();
        this.#efsServicesByRegion = new Map();
        this.#fileSystemsByRegion = new Map();
        this.#mountTargetsByFileSystem = new Map();
        this.#accessPointsByRegion = new Map();
        this.#kmsServicesByRegion = new Map();
        this.#keysByRegion = new Map();
        this.#aliasesByKeyId = new Map();
        this.#autoScalingServicesByRegion = new Map();
        this.#autoScalingGroupsByRegion = new Map();
        this.#launchConfigsByRegion = new Map();
        this.#scalingPoliciesByRegion = new Map();
        this.#lifecycleHooksByRegion = new Map();
        this.#rdsServicesByRegion = new Map();
        this.#dbInstancesByRegion = new Map();
        this.#dbClustersByRegion = new Map();
        this.#dbProxiesByRegion = new Map();
        this.#dbSubnetGroupsByRegion = new Map();
        this.#dbProxyTargetGroupsByRegion = new Map();
        this.#apiGatewayServicesByRegion = new Map();
        this.#restApisByRegion = new Map();
        this.#httpApisByRegion = new Map();
        this.#httpVpcLinksByRegion = new Map();
        this.#vpcLinksByRegion = new Map();
        this.#domainNamesByRegion = new Map();
        this.#usagePlansByRegion = new Map();
        this.#wafServicesByRegion = new Map();
        this.#webAclsByRegion = new Map();
        this.#wafResourceAssociations = [];
        this.#elastiCacheServicesByRegion = new Map();
        this.#cacheClustersByRegion = new Map();
        this.#replicationGroupsByRegion = new Map();
        this.#cacheSubnetGroupsByRegion = new Map();
        this.#serverlessCachesByRegion = new Map();
        this.#eventBridgeServicesByRegion = new Map();
        this.#eventBusesByRegion = new Map();
        this.#eventBridgeRulesByRegion = new Map();
        this.#sfnServicesByRegion = new Map();
        this.#stateMachinesByRegion = new Map();
        this.#kinesisServicesByRegion = new Map();
        this.#kinesisStreamsByRegion = new Map();
        this.#openSearchServicesByRegion = new Map();
        this.#openSearchDomainsByRegion = new Map();
        this.#codeBuildServicesByRegion = new Map();
        this.#codeBuildProjectsByRegion = new Map();
        this.#cognitoServicesByRegion = new Map();
        this.#cognitoUserPoolsByRegion = new Map();
        this.#serviceDiscoveryServicesByRegion = new Map();
        this.#cloudMapNamespacesByRegion = new Map();
        this.#cloudMapServicesByRegion = new Map();
        this.#backupServicesByRegion = new Map();
        this.#backupVaultsByRegion = new Map();
        this.#protectedResourcesByRegion = new Map();
        this.#glacierServicesByRegion = new Map();
        this.#glacierVaultsByRegion = new Map();
        this.#codeArtifactServicesByRegion = new Map();
        this.#codeArtifactDomainsByRegion = new Map();
        this.#codeArtifactRepositoriesByRegion = new Map();
        this.#mskServicesByRegion = new Map();
        this.#mskClustersByRegion = new Map();
        this.#redshiftServicesByRegion = new Map();
        this.#redshiftClustersByRegion = new Map();
        this.#redshiftSubnetGroupsByRegion = new Map();
        this.#neptuneServicesByRegion = new Map();
        this.#neptuneClustersByRegion = new Map();
        this.#neptuneInstancesByRegion = new Map();
        this.#neptuneSubnetGroupsByRegion = new Map();
        this.#docDbServicesByRegion = new Map();
        this.#docDbClustersByRegion = new Map();
        this.#docDbInstancesByRegion = new Map();
        this.#docDbSubnetGroupsByRegion = new Map();
        this.#fsxServicesByRegion = new Map();
        this.#fsxFileSystemsByRegion = new Map();
        this.#networkFirewallServicesByRegion = new Map();
        this.#networkFirewallsByRegion = new Map();
        this.#firewallPoliciesByRegion = new Map();
        this.#ruleGroupsByRegion = new Map();
        this.#codePipelineServicesByRegion = new Map();
        this.#codePipelinesByRegion = new Map();
        this.#cloudTrailServicesByRegion = new Map();
        this.#cloudTrailsByRegion = new Map();
        this.#ssmServicesByRegion = new Map();
        this.#ssmParametersByRegion = new Map();
        this.#ssmManagedInstancesByRegion = new Map();
        this.#ssmMaintenanceWindowsByRegion = new Map();
        this.#ssmDocumentsByRegion = new Map();
        this.#ssmAssociationsByRegion = new Map();
        this.#cloudFormationServicesByRegion = new Map();
        this.#cfnStacksByRegion = new Map();
        this.#cfnStackResourcesByRegion = new Map();
        this.#mqServicesByRegion = new Map();
        this.#mqBrokersByRegion = new Map();
        this.#mqConfigurationsByRegion = new Map();
        this.#mwaaServicesByRegion = new Map();
        this.#mwaaEnvironmentsByRegion = new Map();
        this.#appRunnerServicesByRegion = new Map();
        this.#appRunnerSvcsByRegion = new Map();
        this.#vpcConnectorsByRegion = new Map();
        this.#transferServicesByRegion = new Map();
        this.#transferServersByRegion = new Map();
        this.#vpcLatticeServicesByRegion = new Map();
        this.#latticeServiceNetworksByRegion = new Map();
        this.#latticeServicesByRegion = new Map();
        this.#latticeTargetGroupsByRegion = new Map();
        this.#latticeVpcAssociationsByRegion = new Map();
        this.#latticeServiceAssociationsByRegion = new Map();
        this.#iotServicesByRegion = new Map();
        this.#iotThingsByRegion = new Map();
        this.#iotThingTypesByRegion = new Map();
        this.#iotThingGroupsByRegion = new Map();
        this.#iotCertificatesByRegion = new Map();
        this.#iotTopicRulesByRegion = new Map();
        this.#iotTopicRuleDestinationsByRegion = new Map();
        this.#glueServicesByRegion = new Map();
        this.#glueConnectionsByRegion = new Map();
        this.#glueCrawlersByRegion = new Map();
        this.#glueDatabasesByRegion = new Map();
        this.#glueJobsByRegion = new Map();
        this.#glueTriggersByRegion = new Map();
        this.#glueTablesByRegion = new Map();
        this.#glueRegistriesByRegion = new Map();
        this.#glueSchemasByRegion = new Map();
        this.#glueWorkflowsByRegion = new Map();
        this.#dmsServicesByRegion = new Map();
        this.#dmsReplicationInstancesByRegion = new Map();
        this.#dmsSubnetGroupsByRegion = new Map();
        this.#dmsEndpointsByRegion = new Map();
        this.#dmsReplicationTasksByRegion = new Map();
        this.#dmsConnectionsByRegion = new Map();
        this.#route53ResolverServicesByRegion = new Map();
        this.#resolverEndpointsByRegion = new Map();
        this.#resolverRulesByRegion = new Map();
        this.#resolverRuleAssociationsByRegion = new Map();
        this.#firewallRuleGroupsByRegion = new Map();
        this.#firewallRuleGroupAssociationsByRegion = new Map();
        this.#batchServicesByRegion = new Map();
        this.#batchComputeEnvironmentsByRegion = new Map();
        this.#batchJobQueuesByRegion = new Map();
        this.#batchSchedulingPoliciesByRegion = new Map();
        this.#memoryDbServicesByRegion = new Map();
        this.#memoryDbClustersByRegion = new Map();
        this.#memoryDbSubnetGroupsByRegion = new Map();
        this.#memoryDbAclsByRegion = new Map();
        this.#memoryDbUsersByRegion = new Map();
        this.#emrServicesByRegion = new Map();
        this.#emrClustersByRegion = new Map();
        this.#emrInstanceFleetsByRegion = new Map();
        this.#emrInstanceGroupsByRegion = new Map();
        this.#emrSecurityConfigsByRegion = new Map();
        this.#emrServerlessServicesByRegion = new Map();
        this.#emrServerlessAppsByRegion = new Map();
        this.#beanstalkServicesByRegion = new Map();
        this.#beanstalkAppsByRegion = new Map();
        this.#beanstalkEnvsByRegion = new Map();
        this.#athenaServicesByRegion = new Map();
        this.#athenaWorkGroupsByRegion = new Map();
        this.#athenaDataCatalogsByRegion = new Map();
        this.#dataSyncServicesByRegion = new Map();
        this.#dataSyncAgentsByRegion = new Map();
        this.#dataSyncLocationsByRegion = new Map();
        this.#dataSyncTasksByRegion = new Map();
        this.#appSyncServicesByRegion = new Map();
        this.#graphqlApisByRegion = new Map();
        this.#appSyncDataSourcesByRegion = new Map();
        this.#redshiftServerlessServicesByRegion = new Map();
        this.#rsNamespacesByRegion = new Map();
        this.#rsWorkgroupsByRegion = new Map();
        this.#ossServicesByRegion = new Map();
        this.#ossCollectionsByRegion = new Map();
        this.#ossVpcEndpointsByRegion = new Map();
        this.#directoryServicesByRegion = new Map();
        this.#directoriesByRegion = new Map();
        this.#workspacesServicesByRegion = new Map();
        this.#workspacesByRegion = new Map();
        this.#workspaceDirectoriesByRegion = new Map();
        this.#cloudHsmServicesByRegion = new Map();
        this.#hsmClustersByRegion = new Map();
        this.#appMeshServicesByRegion = new Map();
        this.#meshesByRegion = new Map();
        this.#virtualNodesByRegion = new Map();
        this.#virtualServicesByRegion = new Map();
        this.#s3ControlServicesByRegion = new Map();
        this.#s3AccessPointsByRegion = new Map();
        this.#elbServicesByRegion = new Map();
        this.#classicLoadBalancersByRegion = new Map();
        this.#pipesServicesByRegion = new Map();
        this.#pipesByRegion = new Map();
        this.#storageGatewayServicesByRegion = new Map();
        this.#gatewaysByRegion = new Map();
        this.#fileSharesByRegion = new Map();
        this.#sgwVolumesByRegion = new Map();
        this.#outpostsServicesByRegion = new Map();
        this.#outpostsByRegion = new Map();
        this.#outpostSitesByRegion = new Map();
        this.#imageBuilderServicesByRegion = new Map();
        this.#infraConfigsByRegion = new Map();
        this.#codeDeployServicesByRegion = new Map();
        this.#deploymentGroupsByRegion = new Map();
        this.#mediaConnectServicesByRegion = new Map();
        this.#mediaConnectFlowsByRegion = new Map();
        this.#sageMakerServicesByRegion = new Map();
        this.#notebookInstancesByRegion = new Map();
        this.#cfnExportsByRegion = new Map();
        this.#cfnStackSetsByRegion = new Map();
        this.#accelerators = [];
        this.#acceleratorListeners = [];
        this.#acceleratorEndpointGroups = [];
        this.#ssmPatchBaselinesByRegion = new Map();
        this.#backupPlansByRegion = new Map();
        this.#backupSelectionsByRegion = new Map();
        this.#cognitoIdentityProvidersByRegion = new Map();
        this.#cognitoUserPoolClientsByRegion = new Map();
        this.#cloudMapInstancesByRegion = new Map();
        this.#route53HealthChecks = [];
        this.#directoryBuckets = [];
        this.#dlqSourceEdges = [];
        this.#orgRoots = [];
        this.#orgOUs = [];
        this.#orgAccounts = [];
        this.#orgPolicies = [];
        this.#mfaDevices = [];
        this.#accessKeys = [];
        this.#serverCertificates = [];
        this.#sshPublicKeys = [];
        this.#virtualMfaDevices = [];
        this.#userGroupMemberships = [];
        this.#instanceProfileRoleEdges = [];
        this.#rolePolicies = new Map();
        this.#userPolicies = new Map();
        this.#groupPolicies = new Map();
        this.#groupMemberships = [];
        this.#vpcsByRegion = new Map();
        this.#subnetsByRegion = new Map();
        this.#securityGroupsByRegion = new Map();
        this.#internetGatewaysByRegion = new Map();
        this.#egressOnlyInternetGatewaysByRegion = new Map();
        this.#natGatewaysByRegion = new Map();
        this.#networkInterfacesByRegion = new Map();
        this.#routeTablesByRegion = new Map();
        this.#volumesByRegion = new Map();
        this.#instancesByRegion = new Map();
        this.#vpcEndpointsByRegion = new Map();
        this.#addressesByRegion = new Map();
        this.#imagesByRegion = new Map();
        this.#snapshotsByRegion = new Map();
        this.#keyPairsByRegion = new Map();
        this.#networkAclsByRegion = new Map();
        this.#flowLogsByRegion = new Map();
        this.#dhcpOptionsByRegion = new Map();
        this.#managedPrefixListsByRegion = new Map();
        this.#vpcPeeringConnectionsByRegion = new Map();
        this.#launchTemplatesByRegion = new Map();
        this.#transitGatewaysByRegion = new Map();
        this.#transitGatewayAttachmentsByRegion = new Map();
        this.#transitGatewayRouteTablesByRegion = new Map();
        this.#transitGatewayVpcAttachmentsByRegion = new Map();
        this.#transitGatewayPeeringAttachmentsByRegion = new Map();
        this.#transitGatewayConnectsByRegion = new Map();
        this.#transitGatewayConnectPeersByRegion = new Map();
        this.#verifiedAccessInstancesByRegion = new Map();
        this.#verifiedAccessGroupsByRegion = new Map();
        this.#verifiedAccessEndpointsByRegion = new Map();
        this.#verifiedAccessTrustProvidersByRegion = new Map();
        this.#vpcEndpointServiceConfigsByRegion = new Map();
        this.#securityGroupRulesByRegion = new Map();
        this.#localGatewaysByRegion = new Map();
        this.#localGatewayRouteTablesByRegion = new Map();
        this.#localGatewayRtVpcAssociationsByRegion = new Map();
        this.#localGatewayVirtualInterfacesByRegion = new Map();
        this.#localGatewayVifGroupsByRegion = new Map();
        this.#staleSecurityGroupsByRegion = new Map();
        this.#instanceConnectEndpointsByRegion = new Map();
        this.#imagesInRecycleBinByRegion = new Map();
        this.#snapshotsInRecycleBinByRegion = new Map();
        this.#fleetsByRegion = new Map();
        this.#trafficMirrorSessionsByRegion = new Map();
        this.#trafficMirrorTargetsByRegion = new Map();
        this.#trafficMirrorFiltersByRegion = new Map();
        this.#clientVpnEndpointsByRegion = new Map();
        this.#lambdasByRegion = new Map();
        this.#eventSourceMappingsByRegion = new Map();
        this.#layersByRegion = new Map();
        this.#aliasesByRegion = new Map();
        this.#functionUrlConfigsByRegion = new Map();
        this.#provisionedConcurrencyByRegion = new Map();
        this.#cloudWatchServicesByRegion = new Map();
        this.#logGroupsByRegion = new Map();
        this.#metricAlarmsByRegion = new Map();
        this.#compositeAlarmsByRegion = new Map();
        this.#subscriptionFiltersByRegion = new Map();
        this.#metricStreamsByRegion = new Map();
        this.#metricFiltersByRegion = new Map();
        this.#deliveriesByRegion = new Map();
        this.#deliveryDestinationsByRegion = new Map();
        this.#deliverySourcesByRegion = new Map();

    }

    /**
     * Initialize the service
     */
    async init (): Promise<void> {


        /*
         * Create services
         */
        // Common
        const factory = this.#factory;
        // Global services
        this.#accountService = factory.createAccountService(this.#credentials);
        this.#iamService = factory.createIamService(this.#credentials);
        this.#s3Service = factory.createS3Service(this.#credentials);
        this.#cloudFrontService = factory.createCloudFrontService(this.#credentials);
        this.#route53Service = factory.createRoute53Service(this.#credentials);
        this.#organizationsService = factory.createOrganizationsService(this.#credentials);
        this.#globalAcceleratorService = factory.createGlobalAcceleratorService(this.#credentials);
        this.#accountRegions = await this.#accountService.getRegions();

        // Resolve account ID from credentials (skipped in cache/offline mode)
        const creds = this.#credentials;
        let accountId = "";
        if (typeof creds === "function") {

            const resolvedCreds = await creds();
            accountId = resolvedCreds.accountId ?? "";

        } else if (creds.accessKeyId) {

            accountId = (creds as {"accountId"?: string}).accountId ?? "";

        }

        // DNS pre-check: discover which services are unavailable in each region
        const enabledRegionNames = this.#accountRegions.
            filter((r) => r.RegionName && (r.RegionOptStatus === RegionOptStatus.ENABLED || r.RegionOptStatus === RegionOptStatus.ENABLED_BY_DEFAULT)).
            map((r) => r.RegionName) as string[];

        const unavailable = await checkServiceAvailability(
            Object.keys(SERVICE_ENDPOINT_PREFIX),
            enabledRegionNames
        );

        const isAvailable = (serviceName: string, regionName: string): boolean => !unavailable.has(`${serviceName}:${regionName}`);

        // Regional services
        for (const region of this.#accountRegions) {

            if (region.RegionName && (region.RegionOptStatus === RegionOptStatus.ENABLED ||
              region.RegionOptStatus === RegionOptStatus.ENABLED_BY_DEFAULT)) {

                // Create regional services
                this.#ec2ServicesByRegion.set(
                    region.RegionName,
                    factory.createEc2Service(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#lambdaServicesByRegion.set(
                    region.RegionName,
                    factory.createLambdaService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#cloudWatchServicesByRegion.set(
                    region.RegionName,
                    factory.createCloudWatchService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#s3TablesServicesByRegion.set(
                    region.RegionName,
                    factory.createS3TablesService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#dynamoDBServicesByRegion.set(
                    region.RegionName,
                    factory.createDynamoDBService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#ebsServicesByRegion.set(
                    region.RegionName,
                    factory.createEbsService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#ecrServicesByRegion.set(
                    region.RegionName,
                    factory.createEcrService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#ecsServicesByRegion.set(
                    region.RegionName,
                    factory.createEcsService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#elbv2ServicesByRegion.set(
                    region.RegionName,
                    factory.createElbv2Service(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#snsServicesByRegion.set(
                    region.RegionName,
                    factory.createSnsService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#sqsServicesByRegion.set(
                    region.RegionName,
                    factory.createSqsService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#eksServicesByRegion.set(
                    region.RegionName,
                    factory.createEksService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#secretsManagerServicesByRegion.set(
                    region.RegionName,
                    factory.createSecretsManagerService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#acmServicesByRegion.set(
                    region.RegionName,
                    factory.createAcmService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#efsServicesByRegion.set(
                    region.RegionName,
                    factory.createEfsService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#kmsServicesByRegion.set(
                    region.RegionName,
                    factory.createKmsService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#autoScalingServicesByRegion.set(
                    region.RegionName,
                    factory.createAutoScalingService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#rdsServicesByRegion.set(
                    region.RegionName,
                    factory.createRdsService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#apiGatewayServicesByRegion.set(
                    region.RegionName,
                    factory.createApiGatewayService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#wafServicesByRegion.set(
                    region.RegionName,
                    factory.createWafService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#elastiCacheServicesByRegion.set(
                    region.RegionName,
                    factory.createElastiCacheService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#eventBridgeServicesByRegion.set(
                    region.RegionName,
                    factory.createEventBridgeService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#sfnServicesByRegion.set(
                    region.RegionName,
                    factory.createSfnService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#kinesisServicesByRegion.set(
                    region.RegionName,
                    factory.createKinesisService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#openSearchServicesByRegion.set(
                    region.RegionName,
                    factory.createOpenSearchService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#codeBuildServicesByRegion.set(
                    region.RegionName,
                    factory.createCodeBuildService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#cognitoServicesByRegion.set(
                    region.RegionName,
                    factory.createCognitoService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#serviceDiscoveryServicesByRegion.set(
                    region.RegionName,
                    factory.createServiceDiscoveryService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#backupServicesByRegion.set(
                    region.RegionName,
                    factory.createBackupService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#glacierServicesByRegion.set(
                    region.RegionName,
                    factory.createGlacierService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#codeArtifactServicesByRegion.set(
                    region.RegionName,
                    factory.createCodeArtifactService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#mskServicesByRegion.set(
                    region.RegionName,
                    factory.createMskService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#redshiftServicesByRegion.set(
                    region.RegionName,
                    factory.createRedshiftService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#neptuneServicesByRegion.set(
                    region.RegionName,
                    factory.createNeptuneService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#docDbServicesByRegion.set(
                    region.RegionName,
                    factory.createDocDbService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#fsxServicesByRegion.set(
                    region.RegionName,
                    factory.createFsxService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#networkFirewallServicesByRegion.set(
                    region.RegionName,
                    factory.createNetworkFirewallService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#codePipelineServicesByRegion.set(
                    region.RegionName,
                    factory.createCodePipelineService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#cloudTrailServicesByRegion.set(
                    region.RegionName,
                    factory.createCloudTrailService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#ssmServicesByRegion.set(
                    region.RegionName,
                    factory.createSsmService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#cloudFormationServicesByRegion.set(
                    region.RegionName,
                    factory.createCloudFormationService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#mqServicesByRegion.set(
                    region.RegionName,
                    factory.createMqService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#mwaaServicesByRegion.set(
                    region.RegionName,
                    factory.createMwaaService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#appRunnerServicesByRegion.set(
                    region.RegionName,
                    factory.createAppRunnerService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#transferServicesByRegion.set(
                    region.RegionName,
                    factory.createTransferService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#vpcLatticeServicesByRegion.set(
                    region.RegionName,
                    factory.createVpcLatticeService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                if (!this.#networkManagerService) {

                    this.#networkManagerService = factory.createNetworkManagerService(
                        this.#credentials,
                        "us-west-2"
                    );

                }
                this.#iotServicesByRegion.set(
                    region.RegionName,
                    factory.createIotService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#glueServicesByRegion.set(
                    region.RegionName,
                    factory.createGlueService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#dmsServicesByRegion.set(
                    region.RegionName,
                    factory.createDmsService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#route53ResolverServicesByRegion.set(
                    region.RegionName,
                    factory.createRoute53ResolverService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#batchServicesByRegion.set(
                    region.RegionName,
                    factory.createBatchService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#memoryDbServicesByRegion.set(
                    region.RegionName,
                    factory.createMemoryDbService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#emrServicesByRegion.set(
                    region.RegionName,
                    factory.createEmrService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#emrServerlessServicesByRegion.set(
                    region.RegionName,
                    factory.createEmrServerlessService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#beanstalkServicesByRegion.set(
                    region.RegionName,
                    factory.createElasticBeanstalkService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#athenaServicesByRegion.set(
                    region.RegionName,
                    factory.createAthenaService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#dataSyncServicesByRegion.set(
                    region.RegionName,
                    factory.createDataSyncService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#appSyncServicesByRegion.set(
                    region.RegionName,
                    factory.createAppSyncService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#redshiftServerlessServicesByRegion.set(
                    region.RegionName,
                    factory.createRedshiftServerlessService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#ossServicesByRegion.set(
                    region.RegionName,
                    factory.createOpenSearchServerlessService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#directoryServicesByRegion.set(
                    region.RegionName,
                    factory.createDirectoryServiceService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#workspacesServicesByRegion.set(
                    region.RegionName,
                    factory.createWorkspacesService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#cloudHsmServicesByRegion.set(
                    region.RegionName,
                    factory.createCloudHsmService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#appMeshServicesByRegion.set(
                    region.RegionName,
                    factory.createAppMeshService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#s3ControlServicesByRegion.set(
                    region.RegionName,
                    factory.createS3ControlService(
                        this.#credentials,
                        region.RegionName,
                        accountId
                    )
                );
                this.#elbServicesByRegion.set(
                    region.RegionName,
                    factory.createElbService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#pipesServicesByRegion.set(
                    region.RegionName,
                    factory.createPipesService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#storageGatewayServicesByRegion.set(
                    region.RegionName,
                    factory.createStorageGatewayService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#outpostsServicesByRegion.set(
                    region.RegionName,
                    factory.createOutpostsService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#imageBuilderServicesByRegion.set(
                    region.RegionName,
                    factory.createImageBuilderService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#codeDeployServicesByRegion.set(
                    region.RegionName,
                    factory.createCodeDeployService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#mediaConnectServicesByRegion.set(
                    region.RegionName,
                    factory.createMediaConnectService(
                        this.#credentials,
                        region.RegionName
                    )
                );
                this.#sageMakerServicesByRegion.set(
                    region.RegionName,
                    factory.createSageMakerService(
                        this.#credentials,
                        region.RegionName
                    )
                );

            }

        }

        // Remove services for regions where DNS showed the endpoint doesn't exist
        if (unavailable.size > 0) {

            const serviceMaps: [string, Map<string, unknown>][] = [
                [
                    "ec2",
                    this.#ec2ServicesByRegion
                ],
                [
                    "lambda",
                    this.#lambdaServicesByRegion
                ],
                [
                    "cloudWatch",
                    this.#cloudWatchServicesByRegion
                ],
                [
                    "s3Tables",
                    this.#s3TablesServicesByRegion
                ],
                [
                    "dynamoDB",
                    this.#dynamoDBServicesByRegion
                ],
                [
                    "ebs",
                    this.#ebsServicesByRegion
                ],
                [
                    "ecr",
                    this.#ecrServicesByRegion
                ],
                [
                    "ecs",
                    this.#ecsServicesByRegion
                ],
                [
                    "elbv2",
                    this.#elbv2ServicesByRegion
                ],
                [
                    "sns",
                    this.#snsServicesByRegion
                ],
                [
                    "sqs",
                    this.#sqsServicesByRegion
                ],
                [
                    "eks",
                    this.#eksServicesByRegion
                ],
                [
                    "secretsManager",
                    this.#secretsManagerServicesByRegion
                ],
                [
                    "acm",
                    this.#acmServicesByRegion
                ],
                [
                    "efs",
                    this.#efsServicesByRegion
                ],
                [
                    "kms",
                    this.#kmsServicesByRegion
                ],
                [
                    "autoScaling",
                    this.#autoScalingServicesByRegion
                ],
                [
                    "rds",
                    this.#rdsServicesByRegion
                ],
                [
                    "apiGateway",
                    this.#apiGatewayServicesByRegion
                ],
                [
                    "waf",
                    this.#wafServicesByRegion
                ],
                [
                    "elastiCache",
                    this.#elastiCacheServicesByRegion
                ],
                [
                    "eventBridge",
                    this.#eventBridgeServicesByRegion
                ],
                [
                    "sfn",
                    this.#sfnServicesByRegion
                ],
                [
                    "kinesis",
                    this.#kinesisServicesByRegion
                ],
                [
                    "openSearch",
                    this.#openSearchServicesByRegion
                ],
                [
                    "codeBuild",
                    this.#codeBuildServicesByRegion
                ],
                [
                    "cognito",
                    this.#cognitoServicesByRegion
                ],
                [
                    "serviceDiscovery",
                    this.#serviceDiscoveryServicesByRegion
                ],
                [
                    "backup",
                    this.#backupServicesByRegion
                ],
                [
                    "glacier",
                    this.#glacierServicesByRegion
                ],
                [
                    "codeArtifact",
                    this.#codeArtifactServicesByRegion
                ],
                [
                    "msk",
                    this.#mskServicesByRegion
                ],
                [
                    "redshift",
                    this.#redshiftServicesByRegion
                ],
                [
                    "neptune",
                    this.#neptuneServicesByRegion
                ],
                [
                    "docDb",
                    this.#docDbServicesByRegion
                ],
                [
                    "fsx",
                    this.#fsxServicesByRegion
                ],
                [
                    "networkFirewall",
                    this.#networkFirewallServicesByRegion
                ],
                [
                    "codePipeline",
                    this.#codePipelineServicesByRegion
                ],
                [
                    "cloudTrail",
                    this.#cloudTrailServicesByRegion
                ],
                [
                    "ssm",
                    this.#ssmServicesByRegion
                ],
                [
                    "cloudFormation",
                    this.#cloudFormationServicesByRegion
                ],
                [
                    "mq",
                    this.#mqServicesByRegion
                ],
                [
                    "mwaa",
                    this.#mwaaServicesByRegion
                ],
                [
                    "appRunner",
                    this.#appRunnerServicesByRegion
                ],
                [
                    "transfer",
                    this.#transferServicesByRegion
                ],
                [
                    "vpcLattice",
                    this.#vpcLatticeServicesByRegion
                ],
                [
                    "iot",
                    this.#iotServicesByRegion
                ],
                [
                    "glue",
                    this.#glueServicesByRegion
                ],
                [
                    "dms",
                    this.#dmsServicesByRegion
                ],
                [
                    "route53Resolver",
                    this.#route53ResolverServicesByRegion
                ],
                [
                    "batch",
                    this.#batchServicesByRegion
                ],
                [
                    "memoryDb",
                    this.#memoryDbServicesByRegion
                ],
                [
                    "emr",
                    this.#emrServicesByRegion
                ],
                [
                    "emrServerless",
                    this.#emrServerlessServicesByRegion
                ],
                [
                    "beanstalk",
                    this.#beanstalkServicesByRegion
                ],
                [
                    "athena",
                    this.#athenaServicesByRegion
                ],
                [
                    "dataSync",
                    this.#dataSyncServicesByRegion
                ],
                [
                    "appSync",
                    this.#appSyncServicesByRegion
                ],
                [
                    "redshiftServerless",
                    this.#redshiftServerlessServicesByRegion
                ],
                [
                    "oss",
                    this.#ossServicesByRegion
                ],
                [
                    "directoryService",
                    this.#directoryServicesByRegion
                ],
                [
                    "workspaces",
                    this.#workspacesServicesByRegion
                ],
                [
                    "cloudHsm",
                    this.#cloudHsmServicesByRegion
                ],
                [
                    "appMesh",
                    this.#appMeshServicesByRegion
                ],
                [
                    "s3Control",
                    this.#s3ControlServicesByRegion
                ],
                [
                    "elb",
                    this.#elbServicesByRegion
                ],
                [
                    "pipes",
                    this.#pipesServicesByRegion
                ],
                [
                    "storageGateway",
                    this.#storageGatewayServicesByRegion
                ],
                [
                    "outposts",
                    this.#outpostsServicesByRegion
                ],
                [
                    "imageBuilder",
                    this.#imageBuilderServicesByRegion
                ],
                [
                    "codeDeploy",
                    this.#codeDeployServicesByRegion
                ],
                [
                    "mediaConnect",
                    this.#mediaConnectServicesByRegion
                ],
                [
                    "sageMaker",
                    this.#sageMakerServicesByRegion
                ]
            ];

            let skipped = 0;
            for (const [
                serviceName,
                serviceMap
            ] of serviceMaps) {

                for (const region of serviceMap.keys()) {

                    if (!isAvailable(
                        serviceName,
                        region
                    )) {

                        serviceMap.delete(region);
                        skipped++;

                    }

                }

            }
            if (skipped > 0) {

                console.log(`[gnaws] DNS pre-check: skipped ${String(skipped)} service/region combinations (endpoint not available)`);

            }

        }

    }

    /**
     * Load all the resources from the cloud
     */
    async loadResources (): Promise <void> {

        if (!this.#iamService) {

            throw new Error("Uninitialized IAM service!");

        }
        this.#users = await this.#iamService.getUsers();
        this.#roles = await this.#iamService.getRoles();
        this.#policies = await this.#iamService.getPolicies();
        this.#userGroups = await this.#iamService.getUserGroups();

        // Per-user IAM resources
        for (const user of this.#users) {

            if (user.UserName) {

                const mfaDevices = await this.#iamService.getMFADevices(user.UserName);
                this.#mfaDevices.push(...mfaDevices);

                const accessKeys = await this.#iamService.getAccessKeys(user.UserName);
                this.#accessKeys.push(...accessKeys);

                const sshKeys = await this.#iamService.getSSHPublicKeys(user.UserName);
                this.#sshPublicKeys.push(...sshKeys);

                const groupsForUser = await this.#iamService.getGroupsForUser(user.UserName);
                for (const group of groupsForUser) {

                    if (group.GroupId && user.UserId) {

                        this.#userGroupMemberships.push({
                            "groupId": group.GroupId,
                            "userId": user.UserId
                        });

                    }

                }

                const attachedUserPolicies = await this.#iamService.getAttachedUserPolicies(user.UserName);
                this.#userPolicies.set(
                    user.UserId ?? user.UserName,
                    attachedUserPolicies.map((p) => p.PolicyArn).filter(Boolean) as string[]
                );

            }

        }

        // Per-role IAM resources
        for (const role of this.#roles) {

            if (role.RoleName) {

                const profilesForRole = await this.#iamService.getInstanceProfilesForRole(role.RoleName);
                for (const profile of profilesForRole) {

                    if (profile.InstanceProfileId && role.RoleId) {

                        this.#instanceProfileRoleEdges.push({
                            "instanceProfileId": profile.InstanceProfileId,
                            "roleId": role.RoleId
                        });

                    }

                }

                const attachedRolePolicies = await this.#iamService.getAttachedRolePolicies(role.RoleName);
                this.#rolePolicies.set(
                    role.RoleId ?? role.RoleName,
                    attachedRolePolicies.map((p) => p.PolicyArn).filter(Boolean) as string[]
                );

            }

        }

        // Per-group IAM resources
        for (const group of this.#userGroups) {

            if (group.GroupName) {

                const attachedGroupPolicies = await this.#iamService.getAttachedGroupPolicies(group.GroupName);
                this.#groupPolicies.set(
                    group.GroupId ?? group.GroupName,
                    attachedGroupPolicies.map((p) => p.PolicyArn).filter(Boolean) as string[]
                );

                const members = await this.#iamService.getGroupMembers(group.GroupName);
                for (const member of members) {

                    if (group.GroupId && member.UserId) {

                        this.#groupMemberships.push({
                            "groupId": group.GroupId,
                            "userId": member.UserId
                        });

                    }

                }

            }

        }

        // Standalone IAM resources
        this.#serverCertificates = await this.#iamService.getServerCertificates();
        this.#virtualMfaDevices = await this.#iamService.getVirtualMFADevices();
        this.#instanceProfiles = await this.#iamService.getInstanceProfiles();

        // Regional EC2 resources
        for (const [
            region,
            service
        ] of this.#ec2ServicesByRegion.entries()) {

            try {

                this.#vpcsByRegion.set(
                    region,
                    await service.getVpcs()
                );
                this.#subnetsByRegion.set(
                    region,
                    await service.getSubnets()
                );
                this.#securityGroupsByRegion.set(
                    region,
                    await service.getSecurityGroups()
                );
                this.#internetGatewaysByRegion.set(
                    region,
                    await service.getInternetGateways()
                );
                this.#egressOnlyInternetGatewaysByRegion.set(
                    region,
                    await service.getEgressOnlyInternetGateways()
                );
                this.#natGatewaysByRegion.set(
                    region,
                    await service.getNatGateways()
                );
                this.#networkInterfacesByRegion.set(
                    region,
                    await service.getNetworkInterfaces()
                );
                this.#routeTablesByRegion.set(
                    region,
                    await service.getRouteTables()
                );
                this.#volumesByRegion.set(
                    region,
                    await service.getVolumes()
                );
                const instances = await service.getInstances();
                this.#instancesByRegion.set(
                    region,
                    instances
                );
                this.#vpcEndpointsByRegion.set(
                    region,
                    await service.getVpcEndpoints()
                );
                const addresses = await service.getAddresses();
                this.#addressesByRegion.set(
                    region,
                    addresses
                );
                const images = await service.getImages();
                this.#imagesByRegion.set(
                    region,
                    images
                );
                const snapshots = await service.getSnapshots();
                this.#snapshotsByRegion.set(
                    region,
                    snapshots
                );
                const keyPairs = await service.getKeyPairs();
                this.#keyPairsByRegion.set(
                    region,
                    keyPairs
                );
                const networkAcls = await service.getNetworkAcls();
                this.#networkAclsByRegion.set(
                    region,
                    networkAcls
                );
                const flowLogs = await service.getFlowLogs();
                this.#flowLogsByRegion.set(
                    region,
                    flowLogs
                );
                const dhcpOptions = await service.getDhcpOptions();
                this.#dhcpOptionsByRegion.set(
                    region,
                    dhcpOptions
                );
                const managedPrefixLists = await service.getManagedPrefixLists();
                this.#managedPrefixListsByRegion.set(
                    region,
                    managedPrefixLists
                );
                const vpcPeeringConnections = await service.getVpcPeeringConnections();
                this.#vpcPeeringConnectionsByRegion.set(
                    region,
                    vpcPeeringConnections
                );
                const launchTemplates = await service.getLaunchTemplates();
                this.#launchTemplatesByRegion.set(
                    region,
                    launchTemplates
                );
                const transitGateways = await service.getTransitGateways();
                this.#transitGatewaysByRegion.set(
                    region,
                    transitGateways
                );
                const transitGatewayAttachments = await service.getTransitGatewayAttachments();
                this.#transitGatewayAttachmentsByRegion.set(
                    region,
                    transitGatewayAttachments
                );
                const transitGatewayRouteTables = await service.getTransitGatewayRouteTables();
                this.#transitGatewayRouteTablesByRegion.set(
                    region,
                    transitGatewayRouteTables
                );
                const transitGatewayVpcAttachments = await service.getTransitGatewayVpcAttachments();
                this.#transitGatewayVpcAttachmentsByRegion.set(
                    region,
                    transitGatewayVpcAttachments
                );
                const transitGatewayPeeringAttachments = await service.getTransitGatewayPeeringAttachments();
                this.#transitGatewayPeeringAttachmentsByRegion.set(
                    region,
                    transitGatewayPeeringAttachments
                );
                const transitGatewayConnects = await service.getTransitGatewayConnects();
                this.#transitGatewayConnectsByRegion.set(
                    region,
                    transitGatewayConnects
                );
                const transitGatewayConnectPeers = await service.getTransitGatewayConnectPeers();
                this.#transitGatewayConnectPeersByRegion.set(
                    region,
                    transitGatewayConnectPeers
                );
                const verifiedAccessInstances = await service.getVerifiedAccessInstances();
                this.#verifiedAccessInstancesByRegion.set(
                    region,
                    verifiedAccessInstances
                );
                const verifiedAccessGroups = await service.getVerifiedAccessGroups();
                this.#verifiedAccessGroupsByRegion.set(
                    region,
                    verifiedAccessGroups
                );
                const verifiedAccessEndpoints = await service.getVerifiedAccessEndpoints();
                this.#verifiedAccessEndpointsByRegion.set(
                    region,
                    verifiedAccessEndpoints
                );
                const verifiedAccessTrustProviders = await service.getVerifiedAccessTrustProviders();
                this.#verifiedAccessTrustProvidersByRegion.set(
                    region,
                    verifiedAccessTrustProviders
                );
                const vpcEndpointServiceConfigs = await service.getVpcEndpointServiceConfigurations();
                this.#vpcEndpointServiceConfigsByRegion.set(
                    region,
                    vpcEndpointServiceConfigs
                );
                const securityGroupRules = await service.getSecurityGroupRules();
                this.#securityGroupRulesByRegion.set(
                    region,
                    securityGroupRules
                );
                const localGateways = await service.getLocalGateways();
                this.#localGatewaysByRegion.set(
                    region,
                    localGateways
                );
                const localGatewayRouteTables = await service.getLocalGatewayRouteTables();
                this.#localGatewayRouteTablesByRegion.set(
                    region,
                    localGatewayRouteTables
                );
                const localGatewayRtVpcAssociations = await service.getLocalGatewayRouteTableVpcAssociations();
                this.#localGatewayRtVpcAssociationsByRegion.set(
                    region,
                    localGatewayRtVpcAssociations
                );
                const localGatewayVirtualInterfaces = await service.getLocalGatewayVirtualInterfaces();
                this.#localGatewayVirtualInterfacesByRegion.set(
                    region,
                    localGatewayVirtualInterfaces
                );
                const localGatewayVifGroups = await service.getLocalGatewayVirtualInterfaceGroups();
                this.#localGatewayVifGroupsByRegion.set(
                    region,
                    localGatewayVifGroups
                );
                // Stale SGs require a VPC ID - fetch for each VPC in this region
                const staleGroups: StaleSecurityGroup[] = [];
                for (const vpc of this.#vpcsByRegion.get(region) ?? []) {

                    if (vpc.VpcId) {

                        const vpcStale = await service.getStaleSecurityGroups(vpc.VpcId);
                        staleGroups.push(...vpcStale);

                    }

                }
                this.#staleSecurityGroupsByRegion.set(
                    region,
                    staleGroups
                );
                const instanceConnectEndpoints = await service.getInstanceConnectEndpoints();
                this.#instanceConnectEndpointsByRegion.set(
                    region,
                    instanceConnectEndpoints
                );
                const imagesInRecycleBin = await service.getImagesInRecycleBin();
                this.#imagesInRecycleBinByRegion.set(
                    region,
                    imagesInRecycleBin
                );
                const snapshotsInRecycleBin = await service.getSnapshotsInRecycleBin();
                this.#snapshotsInRecycleBinByRegion.set(
                    region,
                    snapshotsInRecycleBin
                );
                const fleets = await service.getFleets();
                this.#fleetsByRegion.set(
                    region,
                    fleets
                );
                const trafficMirrorSessions = await service.getTrafficMirrorSessions();
                this.#trafficMirrorSessionsByRegion.set(
                    region,
                    trafficMirrorSessions
                );
                const trafficMirrorTargets = await service.getTrafficMirrorTargets();
                this.#trafficMirrorTargetsByRegion.set(
                    region,
                    trafficMirrorTargets
                );
                const trafficMirrorFilters = await service.getTrafficMirrorFilters();
                this.#trafficMirrorFiltersByRegion.set(
                    region,
                    trafficMirrorFilters
                );
                const clientVpnEndpoints = await service.getClientVpnEndpoints();
                this.#clientVpnEndpointsByRegion.set(
                    region,
                    clientVpnEndpoints
                );

            } catch (err: unknown) {

                this.#handleRegionError(
                    "ec2",
                    region,
                    err
                );

            }

        }
        for (const [
            region,
            service
        ] of this.#lambdaServicesByRegion.entries()) {

            try {

                const lambdas = await service.getLambdas();
                this.#lambdasByRegion.set(
                    region,
                    lambdas
                );
                const eventSourceMappings = await service.getEventSourceMappings();
                this.#eventSourceMappingsByRegion.set(
                    region,
                    eventSourceMappings
                );
                const layers = await service.getLayers();
                this.#layersByRegion.set(
                    region,
                    layers
                );
                // Per-function resources
                const aliases: AliasConfiguration[] = [];
                const functionUrls: FunctionUrlConfig[] = [];
                const provisionedConcurrency: ProvisionedConcurrencyConfigListItem[] = [];
                for (const lambda of lambdas) {

                    if (lambda.FunctionName) {

                        const fnAliases = await service.getAliases(lambda.FunctionName);
                        aliases.push(...fnAliases);
                        const fnUrls = await service.getFunctionUrlConfigs(lambda.FunctionName);
                        functionUrls.push(...fnUrls);
                        const fnPC = await service.getProvisionedConcurrencyConfigs(lambda.FunctionName);
                        provisionedConcurrency.push(...fnPC);

                    }

                }
                this.#aliasesByRegion.set(
                    region,
                    aliases
                );
                this.#functionUrlConfigsByRegion.set(
                    region,
                    functionUrls
                );
                this.#provisionedConcurrencyByRegion.set(
                    region,
                    provisionedConcurrency
                );

            } catch (err: unknown) {

                this.#handleRegionError(
                    "lambda",
                    region,
                    err
                );

            }

        }

        // S3 (global)
        if (this.#s3Service) {

            this.#buckets = await this.#s3Service.getBuckets();

        }

        // CloudFront (global)
        if (this.#cloudFrontService) {

            this.#distributions = await this.#cloudFrontService.getDistributions();
            this.#cloudFrontFunctions = await this.#cloudFrontService.getFunctions();
            this.#originAccessControls = await this.#cloudFrontService.getOriginAccessControls();
            this.#keyValueStores = await this.#cloudFrontService.getKeyValueStores();

        }

        // CloudWatch (regional)
        for (const [
            region,
            service
        ] of this.#cloudWatchServicesByRegion.entries()) {

            try {

                const logGroups = await service.getLogGroups();
                this.#logGroupsByRegion.set(
                    region,
                    logGroups
                );

                const allSubscriptionFilters: SubscriptionFilter[] = [];
                for (const logGroup of logGroups) {

                    if (logGroup.logGroupName) {

                        const filters = await service.getSubscriptionFilters(logGroup.logGroupName);
                        allSubscriptionFilters.push(...filters);

                    }

                }
                this.#subscriptionFiltersByRegion.set(
                    region,
                    allSubscriptionFilters
                );

                const metricStreams = await service.getMetricStreams();
                this.#metricStreamsByRegion.set(
                    region,
                    metricStreams
                );

                const metricFilters = await service.getMetricFilters();
                this.#metricFiltersByRegion.set(
                    region,
                    metricFilters
                );

                const deliveries = await service.getDeliveries();
                this.#deliveriesByRegion.set(
                    region,
                    deliveries
                );

                const deliveryDestinations = await service.getDeliveryDestinations();
                this.#deliveryDestinationsByRegion.set(
                    region,
                    deliveryDestinations
                );

                const deliverySources = await service.getDeliverySources();
                this.#deliverySourcesByRegion.set(
                    region,
                    deliverySources
                );

                const metricAlarms = await service.getMetricAlarms();
                this.#metricAlarmsByRegion.set(
                    region,
                    metricAlarms
                );
                const compositeAlarms = await service.getCompositeAlarms();
                this.#compositeAlarmsByRegion.set(
                    region,
                    compositeAlarms
                );

            } catch (err: unknown) {

                this.#handleRegionError(
                    "cloudWatch",
                    region,
                    err
                );

            }

        }

        // S3 Tables (regional)
        for (const [
            region,
            service
        ] of this.#s3TablesServicesByRegion.entries()) {

            try {

                const tableBuckets = await service.getTableBuckets();
                this.#tableBucketsByRegion.set(
                    region,
                    tableBuckets
                );

                const allNamespaces: NamespaceSummary[] = [];
                const allTables: TableSummary[] = [];
                for (const bucket of tableBuckets) {

                    if (bucket.arn) {

                        const namespaces = await service.getNamespaces(bucket.arn);
                        allNamespaces.push(...namespaces);

                        const tables = await service.getTables(bucket.arn);
                        allTables.push(...tables);

                    }

                }
                this.#namespacesByRegion.set(
                    region,
                    allNamespaces
                );
                this.#tablesByRegion.set(
                    region,
                    allTables
                );

            } catch (err: unknown) {

                this.#handleRegionError(
                    "s3Tables",
                    region,
                    err
                );

            }

        }

        // DynamoDB (regional)
        await this.#forEachRegion(
            this.#dynamoDBServicesByRegion,
            "dynamoDB",
            async (region, service) => {

                const tables = await service.getTables();
                this.#dynamoDBTablesByRegion.set(
                    region,
                    tables
                );

            }
        );

        // EBS (regional - enrich existing snapshots with block counts)
        for (const [
            region,
            service
        ] of this.#ebsServicesByRegion.entries()) {

            try {

                const snapshots = this.#snapshotsByRegion.get(region) ?? [];
                for (const snapshot of snapshots) {

                    if (snapshot.SnapshotId) {

                        try {

                            const blocks = await service.getSnapshotBlocks(snapshot.SnapshotId);
                            this.#snapshotBlockCounts.set(
                                snapshot.SnapshotId,
                                blocks.length
                            );

                        } catch {

                            // Snapshot may not be accessible for block listing
                        }

                    }

                }

            } catch (err: unknown) {

                this.#handleRegionError(
                    "ebs",
                    region,
                    err
                );

            }

        }

        // ECR (regional)
        await this.#forEachRegion(
            this.#ecrServicesByRegion,
            "ecr",
            async (region, service) => {

                const repositories = await service.getRepositories();
                this.#ecrRepositoriesByRegion.set(
                    region,
                    repositories
                );

            }
        );

        // ECS (regional)
        for (const [
            region,
            service
        ] of this.#ecsServicesByRegion.entries()) {

            try {

                const clusters = await service.getClusters();
                this.#ecsClusters.set(
                    region,
                    clusters
                );

                const allServices: EcsService[] = [];
                const allContainerInstances: ContainerInstanceInfo[] = [];
                for (const cluster of clusters) {

                    if (cluster.clusterArn) {

                        const services = await service.getServices(cluster.clusterArn);
                        allServices.push(...services);

                        const containerInstances = await service.getContainerInstances(cluster.clusterArn);
                        for (const ci of containerInstances) {

                            allContainerInstances.push({
                                "containerInstance": ci,
                                "clusterArn": cluster.clusterArn
                            });

                        }

                    }

                }
                this.#ecsServices.set(
                    region,
                    allServices
                );
                this.#ecsContainerInstances.set(
                    region,
                    allContainerInstances
                );

                const taskDefinitionArns = await service.getTaskDefinitionArns();
                this.#ecsTaskDefinitionArns.set(
                    region,
                    taskDefinitionArns
                );

            } catch (err: unknown) {

                this.#handleRegionError(
                    "ecs",
                    region,
                    err
                );

            }

        }

        // ELBv2 (regional)
        for (const [
            region,
            service
        ] of this.#elbv2ServicesByRegion.entries()) {

            try {

                const loadBalancers = await service.getLoadBalancers();
                this.#loadBalancersByRegion.set(
                    region,
                    loadBalancers
                );

                const trustStores = await service.getTrustStores();
                this.#trustStoresByRegion.set(
                    region,
                    trustStores
                );

                const allTrustStoreAssociations: TrustStoreAssociation[] = [];
                for (const ts of trustStores) {

                    if (ts.TrustStoreArn) {

                        const assocs = await service.getTrustStoreAssociations(ts.TrustStoreArn);
                        allTrustStoreAssociations.push(...assocs);

                    }

                }
                this.#trustStoreAssociationsByRegion.set(
                    region,
                    allTrustStoreAssociations
                );

                const targetGroups = await service.getTargetGroups();
                this.#targetGroupsByRegion.set(
                    region,
                    targetGroups
                );

                // Fetch tags for all LBs and TGs in one batch
                const allArns = [
                    ...loadBalancers.map((lb) => lb.LoadBalancerArn).filter((arn): arn is string => arn !== undefined),
                    ...targetGroups.map((tg) => tg.TargetGroupArn).filter((arn): arn is string => arn !== undefined)
                ];
                if (allArns.length > 0) {

                    const tagDescriptions = await service.getTagsForResources(allArns);
                    for (const td of tagDescriptions) {

                        if (td.ResourceArn && td.Tags) {

                            this.#elbv2TagsByArn.set(
                                td.ResourceArn,
                                td.Tags
                            );

                        }

                    }

                }

                const allListeners: Listener[] = [];
                for (const lb of loadBalancers) {

                    if (lb.LoadBalancerArn) {

                        const listeners = await service.getListeners(lb.LoadBalancerArn);
                        allListeners.push(...listeners);

                    }

                }
                this.#listenersByRegion.set(
                    region,
                    allListeners
                );

                const allRules: RuleWithListenerArn[] = [];
                for (const listener of allListeners) {

                    if (listener.ListenerArn) {

                        const rules = await service.getRules(listener.ListenerArn);
                        for (const rule of rules) {

                            allRules.push({
                                "rule": rule,
                                "listenerArn": listener.ListenerArn
                            });

                        }

                        const certificates = await service.getListenerCertificates(listener.ListenerArn);
                        const certArns: string[] = certificates.
                            map((c) => c.CertificateArn).
                            filter((arn): arn is string => arn !== undefined);
                        this.#listenerCertificatesByListener.set(
                            listener.ListenerArn,
                            certArns
                        );

                    }

                }
                this.#rulesByRegion.set(
                    region,
                    allRules
                );

            } catch (err: unknown) {

                this.#handleRegionError(
                    "elbv2",
                    region,
                    err
                );

            }

        }

        // SNS (regional)
        await this.#forEachRegion(
            this.#snsServicesByRegion,
            "sns",
            async (region, service) => {

                const topics = await service.getTopics();
                this.#topicsByRegion.set(
                    region,
                    topics
                );

                const subscriptions = await service.getSubscriptions();
                this.#subscriptionsByRegion.set(
                    region,
                    subscriptions
                );

            }
        );

        // SQS (regional)
        await this.#forEachRegion(
            this.#sqsServicesByRegion,
            "sqs",
            async (region, service) => {

                const queues = await service.getQueues();
                this.#queuesByRegion.set(
                    region,
                    queues
                );

            }
        );

        // Route 53 (global)
        if (this.#route53Service) {

            this.#hostedZones = await this.#route53Service.getHostedZones();
            for (const zone of this.#hostedZones) {

                if (zone.Id) {

                    const records = await this.#route53Service.getRecordSets(zone.Id);
                    this.#recordSetsByZone.set(
                        zone.Id,
                        records
                    );

                }

            }

        }

        // Organizations (global)
        if (this.#organizationsService) {

            this.#orgRoots = await this.#organizationsService.getRoots();

            const orgService = this.#organizationsService;
            const collectOUs = async (parentId: string): Promise<void> => {

                const ous = await orgService.getOrganizationalUnits(parentId);

                for (const ou of ous) {

                    this.#orgOUs.push({"ou": ou,
                        "parentId": parentId});

                    if (ou.Id) {

                        await collectOUs(ou.Id);

                    }

                }

            };

            for (const root of this.#orgRoots) {

                if (root.Id) {

                    await collectOUs(root.Id);

                }

            }

            this.#orgAccounts = await this.#organizationsService.getAccounts();

            this.#orgPolicies = await this.#organizationsService.getPolicies();

        }

        // EKS (regional)
        for (const [
            region,
            service
        ] of this.#eksServicesByRegion.entries()) {

            try {

                const clusters = await service.getClusters();
                this.#eksClustersByRegion.set(
                    region,
                    clusters
                );

                const allNodegroups: Nodegroup[] = [];
                const allFargateProfiles: FargateProfile[] = [];
                const allPodIdentityAssociations: PodIdentityInfo[] = [];
                const allAddons: EksAddon[] = [];
                const allAccessEntries: EksAccessEntry[] = [];
                for (const cluster of clusters) {

                    if (cluster.name) {

                        const nodegroups = await service.getNodegroups(cluster.name);
                        allNodegroups.push(...nodegroups);

                        const fargateProfiles = await service.getFargateProfiles(cluster.name);
                        allFargateProfiles.push(...fargateProfiles);

                        const podIdentityAssociations = await service.getPodIdentityAssociations(cluster.name);
                        allPodIdentityAssociations.push(...podIdentityAssociations);

                        const addons = await service.getAddons(cluster.name);
                        allAddons.push(...addons);

                        const accessEntries = await service.getAccessEntries(cluster.name);
                        allAccessEntries.push(...accessEntries);

                    }

                }
                this.#eksNodegroupsByRegion.set(
                    region,
                    allNodegroups
                );
                this.#fargateProfilesByRegion.set(
                    region,
                    allFargateProfiles
                );
                this.#podIdentityAssociationsByRegion.set(
                    region,
                    allPodIdentityAssociations
                );
                this.#eksAddonsByRegion.set(
                    region,
                    allAddons
                );
                this.#eksAccessEntriesByRegion.set(
                    region,
                    allAccessEntries
                );

            } catch (err: unknown) {

                this.#handleRegionError(
                    "eks",
                    region,
                    err
                );

            }

        }

        // Secrets Manager (regional)
        await this.#forEachRegion(
            this.#secretsManagerServicesByRegion,
            "secretsManager",
            async (region, service) => {

                const secrets = await service.getSecrets();
                this.#secretsByRegion.set(
                    region,
                    secrets
                );

            }
        );

        // ACM (regional)
        await this.#forEachRegion(
            this.#acmServicesByRegion,
            "acm",
            async (region, service) => {

                const certificates = await service.getCertificates();
                this.#certificatesByRegion.set(
                    region,
                    certificates
                );

            }
        );

        // EFS (regional)
        for (const [
            region,
            service
        ] of this.#efsServicesByRegion.entries()) {

            try {

                const fileSystems = await service.getFileSystems();
                this.#fileSystemsByRegion.set(
                    region,
                    fileSystems
                );

                // Load mount targets for each file system
                for (const fs of fileSystems) {

                    if (fs.FileSystemId) {

                        const mountTargets = await service.getMountTargets(fs.FileSystemId);
                        this.#mountTargetsByFileSystem.set(
                            fs.FileSystemId,
                            mountTargets
                        );

                    }

                }

                const accessPoints = await service.getAccessPoints();
                this.#accessPointsByRegion.set(
                    region,
                    accessPoints
                );

            } catch (err: unknown) {

                this.#handleRegionError(
                    "efs",
                    region,
                    err
                );

            }

        }

        // KMS (regional)
        for (const [
            region,
            service
        ] of this.#kmsServicesByRegion.entries()) {

            try {

                const keys = await service.getKeys();
                this.#keysByRegion.set(
                    region,
                    keys
                );

                const aliases = await service.getAliases();
                // Group aliases by target key ID
                for (const alias of aliases) {

                    if (alias.TargetKeyId) {

                        const existing = this.#aliasesByKeyId.get(alias.TargetKeyId) ?? [];
                        existing.push(alias);
                        this.#aliasesByKeyId.set(
                            alias.TargetKeyId,
                            existing
                        );

                    }

                }

            } catch (err: unknown) {

                this.#handleRegionError(
                    "kms",
                    region,
                    err
                );

            }

        }

        // Auto Scaling (regional)
        for (const [
            region,
            service
        ] of this.#autoScalingServicesByRegion.entries()) {

            try {

                const groups = await service.getAutoScalingGroups();
                this.#autoScalingGroupsByRegion.set(
                    region,
                    groups
                );

                const launchConfigs = await service.getLaunchConfigurations();
                this.#launchConfigsByRegion.set(
                    region,
                    launchConfigs
                );

                const scalingPolicies = await service.getScalingPolicies();
                this.#scalingPoliciesByRegion.set(
                    region,
                    scalingPolicies
                );

                const allLifecycleHooks: LifecycleHook[] = [];
                for (const asg of groups) {

                    if (asg.AutoScalingGroupName) {

                        const hooks = await service.getLifecycleHooks(asg.AutoScalingGroupName);
                        allLifecycleHooks.push(...hooks);

                    }

                }
                this.#lifecycleHooksByRegion.set(
                    region,
                    allLifecycleHooks
                );

            } catch (err: unknown) {

                this.#handleRegionError(
                    "autoScaling",
                    region,
                    err
                );

            }

        }

        // RDS (regional)
        for (const [
            region,
            service
        ] of this.#rdsServicesByRegion.entries()) {

            try {

                const instances = await service.getDBInstances();
                this.#dbInstancesByRegion.set(
                    region,
                    instances
                );

                const clusters = await service.getDBClusters();
                this.#dbClustersByRegion.set(
                    region,
                    clusters
                );

                const proxies = await service.getDBProxies();
                this.#dbProxiesByRegion.set(
                    region,
                    proxies
                );

                const subnetGroups = await service.getDBSubnetGroups();
                this.#dbSubnetGroupsByRegion.set(
                    region,
                    subnetGroups
                );

                const allProxyTargetGroups: DBProxyTargetGroup[] = [];
                for (const proxy of proxies) {

                    if (proxy.DBProxyName) {

                        const tgs = await service.getDBProxyTargetGroups(proxy.DBProxyName);
                        allProxyTargetGroups.push(...tgs);

                    }

                }
                this.#dbProxyTargetGroupsByRegion.set(
                    region,
                    allProxyTargetGroups
                );

            } catch (err: unknown) {

                this.#handleRegionError(
                    "rds",
                    region,
                    err
                );

            }

        }

        // API Gateway (regional)
        await this.#forEachRegion(
            this.#apiGatewayServicesByRegion,
            "apiGateway",
            async (region, service) => {

                const restApis = await service.getRestApis();
                this.#restApisByRegion.set(
                    region,
                    restApis
                );

                const httpApis = await service.getHttpApis();
                this.#httpApisByRegion.set(
                    region,
                    httpApis
                );

                const httpVpcLinks = await service.getHttpVpcLinks();
                this.#httpVpcLinksByRegion.set(
                    region,
                    httpVpcLinks
                );

                const vpcLinks = await service.getVpcLinks();
                this.#vpcLinksByRegion.set(
                    region,
                    vpcLinks
                );

                const domainNames = await service.getDomainNames();
                this.#domainNamesByRegion.set(
                    region,
                    domainNames
                );

                const usagePlans = await service.getUsagePlans();
                this.#usagePlansByRegion.set(
                    region,
                    usagePlans
                );

            }
        );

        // WAF (regional)
        for (const [
            region,
            service
        ] of this.#wafServicesByRegion.entries()) {

            try {

                const webAcls = await service.getWebAcls();
                this.#webAclsByRegion.set(
                    region,
                    webAcls
                );

                for (const acl of webAcls) {

                    if (acl.ARN) {

                        const resourceArns = await service.getResourceAssociations(acl.ARN);

                        for (const resourceArn of resourceArns) {

                            this.#wafResourceAssociations.push({
                                "webAclArn": acl.ARN,
                                "resourceArn": resourceArn
                            });

                        }

                    }

                }

            } catch (err: unknown) {

                this.#handleRegionError(
                    "waf",
                    region,
                    err
                );

            }

        }

        // ElastiCache (regional)
        await this.#forEachRegion(
            this.#elastiCacheServicesByRegion,
            "elastiCache",
            async (region, service) => {

                const cacheClusters = await service.getCacheClusters();
                this.#cacheClustersByRegion.set(
                    region,
                    cacheClusters
                );

                const replicationGroups = await service.getReplicationGroups();
                this.#replicationGroupsByRegion.set(
                    region,
                    replicationGroups
                );

                const cacheSubnetGroups = await service.getCacheSubnetGroups();
                this.#cacheSubnetGroupsByRegion.set(
                    region,
                    cacheSubnetGroups
                );

                const serverlessCaches = await service.getServerlessCaches();
                this.#serverlessCachesByRegion.set(
                    region,
                    serverlessCaches
                );

            }
        );

        // EventBridge (regional)
        for (const [
            region,
            service
        ] of this.#eventBridgeServicesByRegion.entries()) {

            try {

                const buses = await service.getEventBuses();
                this.#eventBusesByRegion.set(
                    region,
                    buses
                );

                const allRules: RuleWithTargets[] = [];
                for (const bus of buses) {

                    if (bus.Name) {

                        const rulesWithTargets = await service.getRulesWithTargets(bus.Name);
                        allRules.push(...rulesWithTargets);

                    }

                }
                this.#eventBridgeRulesByRegion.set(
                    region,
                    allRules
                );

            } catch (err: unknown) {

                this.#handleRegionError(
                    "eventBridge",
                    region,
                    err
                );

            }

        }

        // Step Functions (regional)
        await this.#forEachRegion(
            this.#sfnServicesByRegion,
            "sfn",
            async (region, service) => {

                const stateMachines = await service.getStateMachines();
                this.#stateMachinesByRegion.set(
                    region,
                    stateMachines
                );

            }
        );

        // Kinesis (regional)
        await this.#forEachRegion(
            this.#kinesisServicesByRegion,
            "kinesis",
            async (region, service) => {

                const streams = await service.getStreams();
                this.#kinesisStreamsByRegion.set(
                    region,
                    streams
                );

            }
        );

        // OpenSearch (regional)
        await this.#forEachRegion(
            this.#openSearchServicesByRegion,
            "openSearch",
            async (region, service) => {

                const domains = await service.getDomains();
                this.#openSearchDomainsByRegion.set(
                    region,
                    domains
                );

            }
        );

        // CodeBuild (regional)
        await this.#forEachRegion(
            this.#codeBuildServicesByRegion,
            "codeBuild",
            async (region, service) => {

                const projects = await service.getProjects();
                this.#codeBuildProjectsByRegion.set(
                    region,
                    projects
                );

            }
        );

        // Cognito (regional)
        await this.#forEachRegion(
            this.#cognitoServicesByRegion,
            "cognito",
            async (region, service) => {

                const userPools = await service.getUserPools();
                this.#cognitoUserPoolsByRegion.set(
                    region,
                    userPools
                );

            }
        );

        // Service Discovery / CloudMap (regional)
        await this.#forEachRegion(
            this.#serviceDiscoveryServicesByRegion,
            "serviceDiscovery",
            async (region, service) => {

                const namespaces = await service.getNamespaces();
                this.#cloudMapNamespacesByRegion.set(
                    region,
                    namespaces
                );

                const services = await service.getServices();
                this.#cloudMapServicesByRegion.set(
                    region,
                    services
                );

            }
        );

        // Backup (regional)
        await this.#forEachRegion(
            this.#backupServicesByRegion,
            "backup",
            async (region, service) => {

                const vaults = await service.getBackupVaults();
                this.#backupVaultsByRegion.set(
                    region,
                    vaults
                );

                const protectedResources = await service.getProtectedResources();
                this.#protectedResourcesByRegion.set(
                    region,
                    protectedResources
                );

            }
        );

        // Glacier (regional)
        await this.#forEachRegion(
            this.#glacierServicesByRegion,
            "glacier",
            async (region, service) => {

                const vaults = await service.getVaults();
                this.#glacierVaultsByRegion.set(
                    region,
                    vaults
                );

            }
        );

        // CodeArtifact (regional)
        await this.#forEachRegion(
            this.#codeArtifactServicesByRegion,
            "codeArtifact",
            async (region, service) => {

                const domains = await service.getDomains();
                this.#codeArtifactDomainsByRegion.set(
                    region,
                    domains
                );

                const repositories = await service.getRepositories();
                this.#codeArtifactRepositoriesByRegion.set(
                    region,
                    repositories
                );

            }
        );

        // MSK (regional)
        await this.#forEachRegion(
            this.#mskServicesByRegion,
            "msk",
            async (region, service) => {

                const clusters = await service.getClusters();
                this.#mskClustersByRegion.set(
                    region,
                    clusters
                );

            }
        );

        // Redshift (regional)
        await this.#forEachRegion(
            this.#redshiftServicesByRegion,
            "redshift",
            async (region, service) => {

                const clusters = await service.getClusters();
                this.#redshiftClustersByRegion.set(
                    region,
                    clusters
                );

                const subnetGroups = await service.getClusterSubnetGroups();
                this.#redshiftSubnetGroupsByRegion.set(
                    region,
                    subnetGroups
                );

            }
        );

        // Neptune (regional)
        await this.#forEachRegion(
            this.#neptuneServicesByRegion,
            "neptune",
            async (region, service) => {

                const clusters = await service.getDBClusters();
                this.#neptuneClustersByRegion.set(
                    region,
                    clusters
                );

                const instances = await service.getDBInstances();
                this.#neptuneInstancesByRegion.set(
                    region,
                    instances
                );

                const subnetGroups = await service.getDBSubnetGroups();
                this.#neptuneSubnetGroupsByRegion.set(
                    region,
                    subnetGroups
                );

            }
        );

        // DocumentDB (regional)
        await this.#forEachRegion(
            this.#docDbServicesByRegion,
            "docDb",
            async (region, service) => {

                const clusters = await service.getDBClusters();
                this.#docDbClustersByRegion.set(
                    region,
                    clusters
                );

                const instances = await service.getDBInstances();
                this.#docDbInstancesByRegion.set(
                    region,
                    instances
                );

                const subnetGroups = await service.getDBSubnetGroups();
                this.#docDbSubnetGroupsByRegion.set(
                    region,
                    subnetGroups
                );

            }
        );

        // FSx (regional)
        await this.#forEachRegion(
            this.#fsxServicesByRegion,
            "fsx",
            async (region, service) => {

                const fileSystems = await service.getFileSystems();
                this.#fsxFileSystemsByRegion.set(
                    region,
                    fileSystems
                );

            }
        );

        // Network Firewall (regional)
        await this.#forEachRegion(
            this.#networkFirewallServicesByRegion,
            "networkFirewall",
            async (region, service) => {

                const firewalls = await service.getFirewalls();
                this.#networkFirewallsByRegion.set(
                    region,
                    firewalls
                );

                const policies = await service.getFirewallPolicies();
                this.#firewallPoliciesByRegion.set(
                    region,
                    policies
                );

                const ruleGroups = await service.getRuleGroups();
                this.#ruleGroupsByRegion.set(
                    region,
                    ruleGroups
                );

            }
        );

        // CodePipeline (regional)
        await this.#forEachRegion(
            this.#codePipelineServicesByRegion,
            "codePipeline",
            async (region, service) => {

                const pipelines = await service.getPipelines();
                this.#codePipelinesByRegion.set(
                    region,
                    pipelines
                );

            }
        );

        // CloudTrail (regional)
        await this.#forEachRegion(
            this.#cloudTrailServicesByRegion,
            "cloudTrail",
            async (region, service) => {

                const trails = await service.getTrails();
                this.#cloudTrailsByRegion.set(
                    region,
                    trails
                );

            }
        );

        // SSM (regional)
        await this.#forEachRegion(
            this.#ssmServicesByRegion,
            "ssm",
            async (region, service) => {

                const parameters = await service.getParameters();
                this.#ssmParametersByRegion.set(
                    region,
                    parameters
                );

                const managedInstances = await service.getManagedInstances();
                this.#ssmManagedInstancesByRegion.set(
                    region,
                    managedInstances
                );

                const maintenanceWindows = await service.getMaintenanceWindows();
                this.#ssmMaintenanceWindowsByRegion.set(
                    region,
                    maintenanceWindows
                );

                const documents = await service.getDocuments();
                this.#ssmDocumentsByRegion.set(
                    region,
                    documents
                );

                const associations = await service.getAssociations();
                this.#ssmAssociationsByRegion.set(
                    region,
                    associations
                );

            }
        );

        // CloudFormation (regional)
        await this.#forEachRegion(
            this.#cloudFormationServicesByRegion,
            "cloudFormation",
            async (region, service) => {

                const stacks = await service.getStacks();
                this.#cfnStacksByRegion.set(
                    region,
                    stacks
                );

                const stackIds = stacks.
                    map((s) => s.StackId).
                    filter((id): id is string => id !== undefined);

                const stackResources = await service.getStackResources(stackIds);
                this.#cfnStackResourcesByRegion.set(
                    region,
                    stackResources
                );

                const exports = await service.getExports();
                this.#cfnExportsByRegion.set(
                    region,
                    exports
                );

                const stackSets = await service.getStackSets();
                this.#cfnStackSetsByRegion.set(
                    region,
                    stackSets
                );

            }
        );

        // SSM Patch Baselines (regional)
        await this.#forEachRegion(
            this.#ssmServicesByRegion,
            "ssm",
            async (region, service) => {

                const patchBaselines = await service.getPatchBaselines();
                this.#ssmPatchBaselinesByRegion.set(
                    region,
                    patchBaselines
                );

            }
        );

        // Backup Plans + Selections (regional)
        for (const [
            region,
            service
        ] of this.#backupServicesByRegion.entries()) {

            try {

                const plans = await service.getBackupPlans();
                this.#backupPlansByRegion.set(
                    region,
                    plans
                );

                const selections: BackupSelectionsListMember[] = [];

                for (const plan of plans) {

                    if (plan.BackupPlanId) {

                        const planSelections = await service.getBackupSelections(plan.BackupPlanId);
                        selections.push(...planSelections);

                    }

                }

                this.#backupSelectionsByRegion.set(
                    region,
                    selections
                );

            } catch (err: unknown) {

                this.#handleRegionError(
                    "backup",
                    region,
                    err
                );

            }

        }

        // Cognito Identity Providers + User Pool Clients (regional)
        for (const [
            region,
            service
        ] of this.#cognitoServicesByRegion.entries()) {

            try {

                const pools = this.#cognitoUserPoolsByRegion.get(region) ?? [];
                const providers: ProviderDescription[] = [];
                const clients: UserPoolClientDescription[] = [];

                for (const pool of pools) {

                    const poolProviders = await service.getIdentityProviders(pool.Id);
                    providers.push(...poolProviders);

                    const poolClients = await service.getUserPoolClients(pool.Id);
                    clients.push(...poolClients);

                }

                this.#cognitoIdentityProvidersByRegion.set(
                    region,
                    providers
                );

                this.#cognitoUserPoolClientsByRegion.set(
                    region,
                    clients
                );

            } catch (err: unknown) {

                this.#handleRegionError(
                    "cognito",
                    region,
                    err
                );

            }

        }

        // Service Discovery Instances (regional)
        for (const [
            region,
            service
        ] of this.#serviceDiscoveryServicesByRegion.entries()) {

            try {

                const services = this.#cloudMapServicesByRegion.get(region) ?? [];
                const instances: CloudMapInstanceSummary[] = [];

                for (const svc of services) {

                    if (svc.Id) {

                        const svcInstances = await service.getInstances(svc.Id);
                        instances.push(...svcInstances);

                    }

                }

                this.#cloudMapInstancesByRegion.set(
                    region,
                    instances
                );

            } catch (err: unknown) {

                this.#handleRegionError(
                    "serviceDiscovery",
                    region,
                    err
                );

            }

        }

        // Global Accelerator (global)
        if (this.#globalAcceleratorService) {

            this.#accelerators = await this.#globalAcceleratorService.getAccelerators();

            for (const accelerator of this.#accelerators) {

                if (accelerator.AcceleratorArn) {

                    const listeners = await this.#globalAcceleratorService.getListeners(accelerator.AcceleratorArn);
                    this.#acceleratorListeners.push(...listeners);

                    for (const listener of listeners) {

                        if (listener.ListenerArn) {

                            const endpointGroups = await this.#globalAcceleratorService.getEndpointGroups(listener.ListenerArn);
                            this.#acceleratorEndpointGroups.push(...endpointGroups);

                        }

                    }

                }

            }

        }

        // Route53 Health Checks (global)
        if (this.#route53Service) {

            this.#route53HealthChecks = await this.#route53Service.getHealthChecks();

        }

        // S3 Directory Buckets (global)
        if (this.#s3Service) {

            this.#directoryBuckets = await this.#s3Service.getDirectoryBuckets();

        }

        // SQS Dead Letter Source Queues
        for (const [
            region,
            service
        ] of this.#sqsServicesByRegion.entries()) {

            try {

                const queues = this.#queuesByRegion.get(region) ?? [];

                for (const queue of queues) {

                    if (!queue.queueUrl || !queue.queueArn) {

                        continue;

                    }

                    const sourceUrls = await service.getDeadLetterSourceQueues(queue.queueUrl);

                    for (const sourceUrl of sourceUrls) {

                        const sourceQueue = queues.find((q) => q.queueUrl === sourceUrl);

                        if (sourceQueue?.queueArn) {

                            this.#dlqSourceEdges.push({
                                "sourceArn": sourceQueue.queueArn,
                                "dlqArn": queue.queueArn
                            });

                        }

                    }

                }

            } catch (err: unknown) {

                this.#handleRegionError(
                    "sqs",
                    region,
                    err
                );

            }

        }

        // Amazon MQ (regional)
        await this.#forEachRegion(
            this.#mqServicesByRegion,
            "mq",
            async (region, service) => {

                const brokers = await service.getBrokers();
                this.#mqBrokersByRegion.set(
                    region,
                    brokers
                );

                const configurations = await service.getConfigurations();
                this.#mqConfigurationsByRegion.set(
                    region,
                    configurations
                );

            }
        );

        // MWAA (regional)
        await this.#forEachRegion(
            this.#mwaaServicesByRegion,
            "mwaa",
            async (region, service) => {

                const environments = await service.getEnvironments();
                this.#mwaaEnvironmentsByRegion.set(
                    region,
                    environments
                );

            }
        );

        // AppRunner (regional)
        await this.#forEachRegion(
            this.#appRunnerServicesByRegion,
            "appRunner",
            async (region, service) => {

                const services = await service.getServices();
                this.#appRunnerSvcsByRegion.set(
                    region,
                    services
                );

                const vpcConnectors = await service.getVpcConnectors();
                this.#vpcConnectorsByRegion.set(
                    region,
                    vpcConnectors
                );

            }
        );

        // Transfer Family (regional)
        await this.#forEachRegion(
            this.#transferServicesByRegion,
            "transfer",
            async (region, service) => {

                const servers = await service.getServers();
                this.#transferServersByRegion.set(
                    region,
                    servers
                );

            }
        );

        // VPC Lattice (regional)
        await this.#forEachRegion(
            this.#vpcLatticeServicesByRegion,
            "vpcLattice",
            async (region, service) => {

                const serviceNetworks = await service.getServiceNetworks();
                this.#latticeServiceNetworksByRegion.set(
                    region,
                    serviceNetworks
                );

                const latticeServices = await service.getServices();
                this.#latticeServicesByRegion.set(
                    region,
                    latticeServices
                );

                const targetGroups = await service.getTargetGroups();
                this.#latticeTargetGroupsByRegion.set(
                    region,
                    targetGroups
                );

                const vpcAssociations: LatticeVpcAssociation[] = [];
                const serviceAssociations: LatticeServiceAssociation[] = [];
                for (const sn of serviceNetworks) {

                    if (sn.id) {

                        const va = await service.getServiceNetworkVpcAssociations(sn.id);
                        vpcAssociations.push(...va);

                        const sa = await service.getServiceNetworkServiceAssociations(sn.id);
                        serviceAssociations.push(...sa);

                    }

                }
                this.#latticeVpcAssociationsByRegion.set(
                    region,
                    vpcAssociations
                );

                this.#latticeServiceAssociationsByRegion.set(
                    region,
                    serviceAssociations
                );

            }
        );

        // Network Manager (global)
        if (this.#networkManagerService) {

            const nmService = this.#networkManagerService;
            this.#globalNetworks = await nmService.getGlobalNetworks();
            this.#coreNetworks = await nmService.getCoreNetworks();
            this.#nmAttachments = await nmService.getAttachments();

            const allSites: NmSite[] = [];
            const allDevices: NmDevice[] = [];
            const allLinks: NmLink[] = [];
            const allConnections: NmConnection[] = [];
            const allTgwRegistrations: TransitGatewayRegistration[] = [];

            for (const gn of this.#globalNetworks) {

                if (gn.GlobalNetworkId) {

                    const sites = await nmService.getSites(gn.GlobalNetworkId);
                    allSites.push(...sites);

                    const devices = await nmService.getDevices(gn.GlobalNetworkId);
                    allDevices.push(...devices);

                    const links = await nmService.getLinks(gn.GlobalNetworkId);
                    allLinks.push(...links);

                    const connections = await nmService.getConnections(gn.GlobalNetworkId);
                    allConnections.push(...connections);

                    const tgwRegs = await nmService.getTransitGatewayRegistrations(gn.GlobalNetworkId);
                    allTgwRegistrations.push(...tgwRegs);

                }

            }

            this.#nmSites = allSites;
            this.#nmDevices = allDevices;
            this.#nmLinks = allLinks;
            this.#nmConnections = allConnections;
            this.#transitGatewayRegistrations = allTgwRegistrations;

        }

        // IoT (regional)
        await this.#forEachRegion(
            this.#iotServicesByRegion,
            "iot",
            async (region, service) => {

                const things = await service.getThings();
                this.#iotThingsByRegion.set(
                    region,
                    things
                );

                const thingTypes = await service.getThingTypes();
                this.#iotThingTypesByRegion.set(
                    region,
                    thingTypes
                );

                const thingGroups = await service.getThingGroups();
                this.#iotThingGroupsByRegion.set(
                    region,
                    thingGroups
                );

                const certificates = await service.getCertificates();
                this.#iotCertificatesByRegion.set(
                    region,
                    certificates
                );

                const topicRules = await service.getTopicRules();
                this.#iotTopicRulesByRegion.set(
                    region,
                    topicRules
                );

                const topicRuleDestinations = await service.getTopicRuleDestinations();
                this.#iotTopicRuleDestinationsByRegion.set(
                    region,
                    topicRuleDestinations
                );

            }
        );

        // Glue (regional)
        await this.#forEachRegion(
            this.#glueServicesByRegion,
            "glue",
            async (region, service) => {

                const connections = await service.getConnections();
                this.#glueConnectionsByRegion.set(
                    region,
                    connections
                );

                const crawlers = await service.getCrawlers();
                this.#glueCrawlersByRegion.set(
                    region,
                    crawlers
                );

                const databases = await service.getDatabases();
                this.#glueDatabasesByRegion.set(
                    region,
                    databases
                );

                const jobs = await service.getJobs();
                this.#glueJobsByRegion.set(
                    region,
                    jobs
                );

                const triggers = await service.getTriggers();
                this.#glueTriggersByRegion.set(
                    region,
                    triggers
                );

                const tables = await service.getTables();
                this.#glueTablesByRegion.set(
                    region,
                    tables
                );

                const registries = await service.getRegistries();
                this.#glueRegistriesByRegion.set(
                    region,
                    registries
                );

                const schemas = await service.getSchemas();
                this.#glueSchemasByRegion.set(
                    region,
                    schemas
                );

                const workflows = await service.getWorkflows();
                this.#glueWorkflowsByRegion.set(
                    region,
                    workflows
                );

            }
        );

        // DMS (regional)
        await this.#forEachRegion(
            this.#dmsServicesByRegion,
            "dms",
            async (region, service) => {

                const replicationInstances = await service.getReplicationInstances();
                this.#dmsReplicationInstancesByRegion.set(
                    region,
                    replicationInstances
                );

                const subnetGroups = await service.getReplicationSubnetGroups();
                this.#dmsSubnetGroupsByRegion.set(
                    region,
                    subnetGroups
                );

                const endpoints = await service.getEndpoints();
                this.#dmsEndpointsByRegion.set(
                    region,
                    endpoints
                );

                const replicationTasks = await service.getReplicationTasks();
                this.#dmsReplicationTasksByRegion.set(
                    region,
                    replicationTasks
                );

                const connections = await service.getConnections();
                this.#dmsConnectionsByRegion.set(
                    region,
                    connections
                );

            }
        );

        // Route53 Resolver (regional)
        await this.#forEachRegion(
            this.#route53ResolverServicesByRegion,
            "route53Resolver",
            async (region, service) => {

                const resolverEndpoints = await service.getResolverEndpoints();
                this.#resolverEndpointsByRegion.set(
                    region,
                    resolverEndpoints
                );

                const resolverRules = await service.getResolverRules();
                this.#resolverRulesByRegion.set(
                    region,
                    resolverRules
                );

                const ruleAssociations = await service.getResolverRuleAssociations();
                this.#resolverRuleAssociationsByRegion.set(
                    region,
                    ruleAssociations
                );

                const firewallRuleGroups = await service.getFirewallRuleGroups();
                this.#firewallRuleGroupsByRegion.set(
                    region,
                    firewallRuleGroups
                );

                const firewallRuleGroupAssociations = await service.getFirewallRuleGroupAssociations();
                this.#firewallRuleGroupAssociationsByRegion.set(
                    region,
                    firewallRuleGroupAssociations
                );

            }
        );

        // Batch (regional)
        await this.#forEachRegion(
            this.#batchServicesByRegion,
            "batch",
            async (region, service) => {

                const computeEnvironments = await service.getComputeEnvironments();
                this.#batchComputeEnvironmentsByRegion.set(
                    region,
                    computeEnvironments
                );

                const jobQueues = await service.getJobQueues();
                this.#batchJobQueuesByRegion.set(
                    region,
                    jobQueues
                );

                const schedulingPolicies = await service.getSchedulingPolicies();
                this.#batchSchedulingPoliciesByRegion.set(
                    region,
                    schedulingPolicies
                );

            }
        );

        // MemoryDB (regional)
        await this.#forEachRegion(
            this.#memoryDbServicesByRegion,
            "memoryDb",
            async (region, service) => {

                const clusters = await service.getClusters();
                this.#memoryDbClustersByRegion.set(
                    region,
                    clusters
                );

                const subnetGroups = await service.getSubnetGroups();
                this.#memoryDbSubnetGroupsByRegion.set(
                    region,
                    subnetGroups
                );

                const acls = await service.getACLs();
                this.#memoryDbAclsByRegion.set(
                    region,
                    acls
                );

                const users = await service.getUsers();
                this.#memoryDbUsersByRegion.set(
                    region,
                    users
                );

            }
        );

        // EMR (regional)
        for (const [
            region,
            service
        ] of this.#emrServicesByRegion.entries()) {

            try {

                const clusters = await service.getClusters();
                this.#emrClustersByRegion.set(
                    region,
                    clusters
                );

                const allFleets: EmrInstanceFleet[] = [];
                const allGroups: EmrInstanceGroup[] = [];
                for (const cluster of clusters) {

                    if (cluster.Id) {

                        const fleets = await service.getInstanceFleets(cluster.Id);
                        allFleets.push(...fleets);

                        const groups = await service.getInstanceGroups(cluster.Id);
                        allGroups.push(...groups);

                    }

                }
                this.#emrInstanceFleetsByRegion.set(
                    region,
                    allFleets
                );
                this.#emrInstanceGroupsByRegion.set(
                    region,
                    allGroups
                );

                const securityConfigs = await service.getSecurityConfigurations();
                this.#emrSecurityConfigsByRegion.set(
                    region,
                    securityConfigs
                );

            } catch (err: unknown) {

                this.#handleRegionError(
                    "emr",
                    region,
                    err
                );

            }

        }

        // EMR Serverless (regional)
        await this.#forEachRegion(
            this.#emrServerlessServicesByRegion,
            "emrServerless",
            async (region, service) => {

                const applications = await service.getApplications();
                this.#emrServerlessAppsByRegion.set(
                    region,
                    applications
                );

            }
        );

        // Elastic Beanstalk (regional)
        await this.#forEachRegion(
            this.#beanstalkServicesByRegion,
            "beanstalk",
            async (region, service) => {

                const applications = await service.getApplications();
                this.#beanstalkAppsByRegion.set(
                    region,
                    applications
                );

                const environments = await service.getEnvironments();
                this.#beanstalkEnvsByRegion.set(
                    region,
                    environments
                );

            }
        );

        // Athena (regional)
        await this.#forEachRegion(
            this.#athenaServicesByRegion,
            "athena",
            async (region, service) => {

                const workGroups = await service.getWorkGroups();
                this.#athenaWorkGroupsByRegion.set(
                    region,
                    workGroups
                );

                const dataCatalogs = await service.getDataCatalogs();
                this.#athenaDataCatalogsByRegion.set(
                    region,
                    dataCatalogs
                );

            }
        );

        // DataSync (regional)
        await this.#forEachRegion(
            this.#dataSyncServicesByRegion,
            "dataSync",
            async (region, service) => {

                const agents = await service.getAgents();
                this.#dataSyncAgentsByRegion.set(
                    region,
                    agents
                );

                const locations = await service.getLocations();
                this.#dataSyncLocationsByRegion.set(
                    region,
                    locations
                );

                const tasks = await service.getTasks();
                this.#dataSyncTasksByRegion.set(
                    region,
                    tasks
                );

            }
        );

        // AppSync (regional)
        for (const [
            region,
            service
        ] of this.#appSyncServicesByRegion.entries()) {

            try {

                const apis = await service.getGraphqlApis();
                this.#graphqlApisByRegion.set(
                    region,
                    apis
                );

                const allDataSources: AppSyncDataSource[] = [];
                for (const api of apis) {

                    if (api.apiId) {

                        const ds = await service.getDataSources(api.apiId);
                        allDataSources.push(...ds);

                    }

                }
                this.#appSyncDataSourcesByRegion.set(
                    region,
                    allDataSources
                );

            } catch (err: unknown) {

                this.#handleRegionError(
                    "appSync",
                    region,
                    err
                );

            }

        }

        // Redshift Serverless (regional)
        await this.#forEachRegion(
            this.#redshiftServerlessServicesByRegion,
            "redshiftServerless",
            async (region, service) => {

                this.#rsNamespacesByRegion.set(
                    region,
                    await service.getNamespaces()
                );
                this.#rsWorkgroupsByRegion.set(
                    region,
                    await service.getWorkgroups()
                );

            }
        );

        // OpenSearch Serverless (regional)
        await this.#forEachRegion(
            this.#ossServicesByRegion,
            "oss",
            async (region, service) => {

                this.#ossCollectionsByRegion.set(
                    region,
                    await service.getCollections()
                );
                this.#ossVpcEndpointsByRegion.set(
                    region,
                    await service.getVpcEndpoints()
                );

            }
        );

        // Directory Service (regional)
        await this.#forEachRegion(
            this.#directoryServicesByRegion,
            "directory",
            async (region, service) => {

                this.#directoriesByRegion.set(
                    region,
                    await service.getDirectories()
                );

            }
        );

        // WorkSpaces (regional)
        await this.#forEachRegion(
            this.#workspacesServicesByRegion,
            "workspaces",
            async (region, service) => {

                this.#workspacesByRegion.set(
                    region,
                    await service.getWorkspaces()
                );
                this.#workspaceDirectoriesByRegion.set(
                    region,
                    await service.getDirectories()
                );

            }
        );

        // CloudHSM (regional)
        await this.#forEachRegion(
            this.#cloudHsmServicesByRegion,
            "cloudHsm",
            async (region, service) => {

                this.#hsmClustersByRegion.set(
                    region,
                    await service.getClusters()
                );

            }
        );

        // App Mesh (regional)
        for (const [
            region,
            service
        ] of this.#appMeshServicesByRegion.entries()) {

            try {

                const meshes = await service.getMeshes();
                this.#meshesByRegion.set(
                    region,
                    meshes
                );
                const allNodes: VirtualNodeRef[] = [];
                const allServices: VirtualServiceRef[] = [];
                for (const mesh of meshes) {

                    if (mesh.meshName) {

                        const nodes = await service.getVirtualNodes(mesh.meshName);
                        allNodes.push(...nodes);
                        const svcs = await service.getVirtualServices(mesh.meshName);
                        allServices.push(...svcs);

                    }

                }
                this.#virtualNodesByRegion.set(
                    region,
                    allNodes
                );
                this.#virtualServicesByRegion.set(
                    region,
                    allServices
                );

            } catch (err: unknown) {

                this.#handleRegionError(
                    "appMesh",
                    region,
                    err
                );

            }

        }

        // S3 Control (regional)
        await this.#forEachRegion(
            this.#s3ControlServicesByRegion,
            "s3Control",
            async (region, service) => {

                this.#s3AccessPointsByRegion.set(
                    region,
                    await service.getAccessPoints()
                );

            }
        );

        // Classic ELB (regional)
        await this.#forEachRegion(
            this.#elbServicesByRegion,
            "elb",
            async (region, service) => {

                this.#classicLoadBalancersByRegion.set(
                    region,
                    await service.getLoadBalancers()
                );

            }
        );

        // EventBridge Pipes (regional)
        await this.#forEachRegion(
            this.#pipesServicesByRegion,
            "pipes",
            async (region, service) => {

                this.#pipesByRegion.set(
                    region,
                    await service.getPipes()
                );

            }
        );

        // Storage Gateway (regional)
        await this.#forEachRegion(
            this.#storageGatewayServicesByRegion,
            "storageGateway",
            async (region, service) => {

                this.#gatewaysByRegion.set(
                    region,
                    await service.getGateways()
                );
                this.#fileSharesByRegion.set(
                    region,
                    await service.getFileShares()
                );
                this.#sgwVolumesByRegion.set(
                    region,
                    await service.getVolumes()
                );

            }
        );

        // Outposts (regional)
        await this.#forEachRegion(
            this.#outpostsServicesByRegion,
            "outposts",
            async (region, service) => {

                this.#outpostsByRegion.set(
                    region,
                    await service.getOutposts()
                );
                this.#outpostSitesByRegion.set(
                    region,
                    await service.getSites()
                );

            }
        );

        // ImageBuilder (regional)
        await this.#forEachRegion(
            this.#imageBuilderServicesByRegion,
            "imageBuilder",
            async (region, service) => {

                this.#infraConfigsByRegion.set(
                    region,
                    await service.getInfrastructureConfigurations()
                );

            }
        );

        // CodeDeploy (regional)
        await this.#forEachRegion(
            this.#codeDeployServicesByRegion,
            "codeDeploy",
            async (region, service) => {

                this.#deploymentGroupsByRegion.set(
                    region,
                    await service.getDeploymentGroups()
                );

            }
        );

        // MediaConnect (regional)
        await this.#forEachRegion(
            this.#mediaConnectServicesByRegion,
            "mediaConnect",
            async (region, service) => {

                this.#mediaConnectFlowsByRegion.set(
                    region,
                    await service.getFlows()
                );

            }
        );

        // SageMaker (regional)
        await this.#forEachRegion(
            this.#sageMakerServicesByRegion,
            "sageMaker",
            async (region, service) => {

                this.#notebookInstancesByRegion.set(
                    region,
                    await service.getNotebookInstances()
                );

            }
        );

    }

    getUsers (): User[] {

        return this.#users;

    }

    getRoles (): Role[] {

        return this.#roles;

    }

    getRoleByArn (arn: string): Role | undefined {

        return this.#roles.find((r) => r.Arn === arn);

    }

    getPolicies (): Policy[] {

        return this.#policies;

    }

    getPolicyByArn (arn: string): Policy | undefined {

        return this.#policies.find((p) => p.Arn === arn);

    }

    getUserGroups (): Group[] {

        return this.#userGroups;

    }

    getAccountRegions (): Region[] {

        return this.#accountRegions;

    }

    getVpcsByRegion (region: string): Vpc[] {

        return this.#vpcsByRegion.get(region) ?? [];

    }

    getSubnetsByRegion (region: string): Subnet[] {

        return this.#subnetsByRegion.get(region) ?? [];

    }

    getSecurityGroupsByRegion (region: string): SecurityGroup[] {

        return this.#securityGroupsByRegion.get(region) ?? [];

    }

    getNetworkInterfacesByRegion (region: string): NetworkInterface[] {

        return this.#networkInterfacesByRegion.get(region) ?? [];

    }

    getInternetGatewaysByRegion (region: string): InternetGateway[] {

        return this.#internetGatewaysByRegion.get(region) ?? [];

    }

    getEgressOnlyInternetGatewaysByRegion (region: string): EgressOnlyInternetGateway[] {

        return this.#egressOnlyInternetGatewaysByRegion.get(region) ?? [];

    }

    getNatGatewaysByRegion (region: string): NatGateway[] {

        return this.#natGatewaysByRegion.get(region) ?? [];

    }

    getRouteTablesByRegion (region: string): RouteTable[] {

        return this.#routeTablesByRegion.get(region) ?? [];

    }

    getVolumesByRegion (region: string): Volume[] {

        return this.#volumesByRegion.get(region) ?? [];

    }

    getInstancesByRegion (region: string): Instance[] {

        return this.#instancesByRegion.get(region) ?? [];

    }

    getVpcEndpointsByRegion (region: string): VpcEndpoint[] {

        return this.#vpcEndpointsByRegion.get(region) ?? [];

    }

    getAddressesByRegion (region: string): Address[] {

        return this.#addressesByRegion.get(region) ?? [];

    }

    getImagesByRegion (region: string): Image[] {

        return this.#imagesByRegion.get(region) ?? [];

    }

    getSnapshotsByRegion (region: string): Snapshot[] {

        return this.#snapshotsByRegion.get(region) ?? [];

    }

    getKeyPairsByRegion (region: string): KeyPairInfo[] {

        return this.#keyPairsByRegion.get(region) ?? [];

    }

    getNetworkAclsByRegion (region: string): NetworkAcl[] {

        return this.#networkAclsByRegion.get(region) ?? [];

    }

    getFlowLogsByRegion (region: string): FlowLog[] {

        return this.#flowLogsByRegion.get(region) ?? [];

    }

    getDhcpOptionsByRegion (region: string): DhcpOptions[] {

        return this.#dhcpOptionsByRegion.get(region) ?? [];

    }

    getManagedPrefixListsByRegion (region: string): ManagedPrefixList[] {

        return this.#managedPrefixListsByRegion.get(region) ?? [];

    }

    getVpcPeeringConnectionsByRegion (region: string): VpcPeeringConnection[] {

        return this.#vpcPeeringConnectionsByRegion.get(region) ?? [];

    }

    getLaunchTemplatesByRegion (region: string): LaunchTemplate[] {

        return this.#launchTemplatesByRegion.get(region) ?? [];

    }

    getTransitGatewaysByRegion (region: string): TransitGateway[] {

        return this.#transitGatewaysByRegion.get(region) ?? [];

    }

    getTransitGatewayAttachmentsByRegion (region: string): TransitGatewayAttachment[] {

        return this.#transitGatewayAttachmentsByRegion.get(region) ?? [];

    }

    getTransitGatewayRouteTablesByRegion (region: string): TransitGatewayRouteTable[] {

        return this.#transitGatewayRouteTablesByRegion.get(region) ?? [];

    }

    getTransitGatewayVpcAttachmentsByRegion (region: string): TransitGatewayVpcAttachment[] {

        return this.#transitGatewayVpcAttachmentsByRegion.get(region) ?? [];

    }

    getTransitGatewayPeeringAttachmentsByRegion (region: string): TransitGatewayPeeringAttachment[] {

        return this.#transitGatewayPeeringAttachmentsByRegion.get(region) ?? [];

    }

    getTransitGatewayConnectsByRegion (region: string): TransitGatewayConnect[] {

        return this.#transitGatewayConnectsByRegion.get(region) ?? [];

    }

    getTransitGatewayConnectPeersByRegion (region: string): TransitGatewayConnectPeer[] {

        return this.#transitGatewayConnectPeersByRegion.get(region) ?? [];

    }

    getVerifiedAccessInstancesByRegion (region: string): VerifiedAccessInstance[] {

        return this.#verifiedAccessInstancesByRegion.get(region) ?? [];

    }

    getVerifiedAccessGroupsByRegion (region: string): VerifiedAccessGroup[] {

        return this.#verifiedAccessGroupsByRegion.get(region) ?? [];

    }

    getVerifiedAccessEndpointsByRegion (region: string): VerifiedAccessEndpoint[] {

        return this.#verifiedAccessEndpointsByRegion.get(region) ?? [];

    }

    getVerifiedAccessTrustProvidersByRegion (region: string): VerifiedAccessTrustProvider[] {

        return this.#verifiedAccessTrustProvidersByRegion.get(region) ?? [];

    }

    getVpcEndpointServiceConfigsByRegion (region: string): ServiceConfiguration[] {

        return this.#vpcEndpointServiceConfigsByRegion.get(region) ?? [];

    }

    getSecurityGroupRulesByRegion (region: string): SecurityGroupRule[] {

        return this.#securityGroupRulesByRegion.get(region) ?? [];

    }

    getLocalGatewaysByRegion (region: string): LocalGateway[] {

        return this.#localGatewaysByRegion.get(region) ?? [];

    }

    getLocalGatewayRouteTablesByRegion (region: string): LocalGatewayRouteTable[] {

        return this.#localGatewayRouteTablesByRegion.get(region) ?? [];

    }

    getLocalGatewayRtVpcAssociationsByRegion (region: string): LocalGatewayRouteTableVpcAssociation[] {

        return this.#localGatewayRtVpcAssociationsByRegion.get(region) ?? [];

    }

    getLocalGatewayVirtualInterfacesByRegion (region: string): LocalGatewayVirtualInterface[] {

        return this.#localGatewayVirtualInterfacesByRegion.get(region) ?? [];

    }

    getLocalGatewayVifGroupsByRegion (region: string): LocalGatewayVirtualInterfaceGroup[] {

        return this.#localGatewayVifGroupsByRegion.get(region) ?? [];

    }

    getStaleSecurityGroupsByRegion (region: string): StaleSecurityGroup[] {

        return this.#staleSecurityGroupsByRegion.get(region) ?? [];

    }

    getInstanceConnectEndpointsByRegion (region: string): Ec2InstanceConnectEndpoint[] {

        return this.#instanceConnectEndpointsByRegion.get(region) ?? [];

    }

    getImagesInRecycleBinByRegion (region: string): ImageRecycleBinInfo[] {

        return this.#imagesInRecycleBinByRegion.get(region) ?? [];

    }

    getSnapshotsInRecycleBinByRegion (region: string): SnapshotRecycleBinInfo[] {

        return this.#snapshotsInRecycleBinByRegion.get(region) ?? [];

    }

    getFleetsByRegion (region: string): FleetData[] {

        return this.#fleetsByRegion.get(region) ?? [];

    }

    getTrafficMirrorSessionsByRegion (region: string): TrafficMirrorSession[] {

        return this.#trafficMirrorSessionsByRegion.get(region) ?? [];

    }

    getTrafficMirrorTargetsByRegion (region: string): TrafficMirrorTarget[] {

        return this.#trafficMirrorTargetsByRegion.get(region) ?? [];

    }

    getTrafficMirrorFiltersByRegion (region: string): TrafficMirrorFilter[] {

        return this.#trafficMirrorFiltersByRegion.get(region) ?? [];

    }

    getClientVpnEndpointsByRegion (region: string): ClientVpnEndpoint[] {

        return this.#clientVpnEndpointsByRegion.get(region) ?? [];

    }

    getEventSourceMappingsByRegion (region: string): EventSourceMappingConfiguration[] {

        return this.#eventSourceMappingsByRegion.get(region) ?? [];

    }

    getLambdasByRegion (region: string): FunctionConfiguration[] {

        return this.#lambdasByRegion.get(region) ?? [];

    }

    getLayersByRegion (region: string): LayersListItem[] {

        return this.#layersByRegion.get(region) ?? [];

    }

    getAliasesByRegion (region: string): AliasConfiguration[] {

        return this.#aliasesByRegion.get(region) ?? [];

    }

    getFunctionUrlConfigsByRegion (region: string): FunctionUrlConfig[] {

        return this.#functionUrlConfigsByRegion.get(region) ?? [];

    }

    getProvisionedConcurrencyByRegion (region: string): ProvisionedConcurrencyConfigListItem[] {

        return this.#provisionedConcurrencyByRegion.get(region) ?? [];

    }

    getInstanceProfiles (): InstanceProfile[] {

        return this.#instanceProfiles;

    }

    getBuckets (): BucketInfo[] {

        return this.#buckets;

    }

    getMfaDevices (): MFADevice[] {

        return this.#mfaDevices;

    }

    getAccessKeys (): AccessKeyMetadata[] {

        return this.#accessKeys;

    }

    getServerCertificates (): ServerCertificateMetadata[] {

        return this.#serverCertificates;

    }

    getSshPublicKeys (): SSHPublicKeyMetadata[] {

        return this.#sshPublicKeys;

    }

    getVirtualMfaDevices (): VirtualMFADevice[] {

        return this.#virtualMfaDevices;

    }

    getUserGroupMemberships (): GroupMembership[] {

        return this.#userGroupMemberships;

    }

    getInstanceProfileRoleEdges (): InstanceProfileRoleEdge[] {

        return this.#instanceProfileRoleEdges;

    }

    getRolePolicies (roleId: string): string[] {

        return this.#rolePolicies.get(roleId) ?? [];

    }

    getRolePoliciesMap (): Record<string, string[]> {

        return Object.fromEntries(this.#rolePolicies);

    }

    getUserPolicies (userId: string): string[] {

        return this.#userPolicies.get(userId) ?? [];

    }

    getUserPoliciesMap (): Record<string, string[]> {

        return Object.fromEntries(this.#userPolicies);

    }

    getGroupPolicies (groupId: string): string[] {

        return this.#groupPolicies.get(groupId) ?? [];

    }

    getGroupPoliciesMap (): Record<string, string[]> {

        return Object.fromEntries(this.#groupPolicies);

    }

    getGroupMemberships (): GroupMembership[] {

        return this.#groupMemberships;

    }

    getLogGroupsByRegion (region: string): LogGroup[] {

        return this.#logGroupsByRegion.get(region) ?? [];

    }

    getMetricAlarmsByRegion (region: string): MetricAlarm[] {

        return this.#metricAlarmsByRegion.get(region) ?? [];

    }

    getCompositeAlarmsByRegion (region: string): CompositeAlarm[] {

        return this.#compositeAlarmsByRegion.get(region) ?? [];

    }

    getSubscriptionFiltersByRegion (region: string): SubscriptionFilter[] {

        return this.#subscriptionFiltersByRegion.get(region) ?? [];

    }

    getMetricStreamsByRegion (region: string): MetricStreamEntry[] {

        return this.#metricStreamsByRegion.get(region) ?? [];

    }

    getMetricFiltersByRegion (region: string): MetricFilter[] {

        return this.#metricFiltersByRegion.get(region) ?? [];

    }

    getDeliveriesByRegion (region: string): Delivery[] {

        return this.#deliveriesByRegion.get(region) ?? [];

    }

    getDeliveryDestinationsByRegion (region: string): DeliveryDestination[] {

        return this.#deliveryDestinationsByRegion.get(region) ?? [];

    }

    getDeliverySourcesByRegion (region: string): DeliverySource[] {

        return this.#deliverySourcesByRegion.get(region) ?? [];

    }

    getDistributions (): DistributionSummary[] {

        return this.#distributions;

    }

    getCloudFrontFunctions (): FunctionSummary[] {

        return this.#cloudFrontFunctions;

    }

    getOriginAccessControls (): OriginAccessControl[] {

        return this.#originAccessControls;

    }

    getKeyValueStores (): KeyValueStore[] {

        return this.#keyValueStores;

    }

    getTableBucketsByRegion (region: string): TableBucketSummary[] {

        return this.#tableBucketsByRegion.get(region) ?? [];

    }

    getNamespacesByRegion (region: string): NamespaceSummary[] {

        return this.#namespacesByRegion.get(region) ?? [];

    }

    getTablesByRegion (region: string): TableSummary[] {

        return this.#tablesByRegion.get(region) ?? [];

    }

    getDynamoDBTablesByRegion (region: string): TableDescription[] {

        return this.#dynamoDBTablesByRegion.get(region) ?? [];

    }

    getSnapshotBlockCount (snapshotId: string): number {

        return this.#snapshotBlockCounts.get(snapshotId) ?? 0;

    }

    getEcrRepositoriesByRegion (region: string): Repository[] {

        return this.#ecrRepositoriesByRegion.get(region) ?? [];

    }

    getEcsClustersByRegion (region: string): Cluster[] {

        return this.#ecsClusters.get(region) ?? [];

    }

    getEcsServicesByRegion (region: string): EcsService[] {

        return this.#ecsServices.get(region) ?? [];

    }

    getEcsTaskDefinitionArnsByRegion (region: string): string[] {

        return this.#ecsTaskDefinitionArns.get(region) ?? [];

    }

    getEcsContainerInstancesByRegion (region: string): ContainerInstanceInfo[] {

        return this.#ecsContainerInstances.get(region) ?? [];

    }

    getLoadBalancersByRegion (region: string): LoadBalancer[] {

        return this.#loadBalancersByRegion.get(region) ?? [];

    }

    getTrustStoresByRegion (region: string): TrustStore[] {

        return this.#trustStoresByRegion.get(region) ?? [];

    }

    getTrustStoreAssociationsByRegion (region: string): TrustStoreAssociation[] {

        return this.#trustStoreAssociationsByRegion.get(region) ?? [];

    }

    getTargetGroupsByRegion (region: string): TargetGroup[] {

        return this.#targetGroupsByRegion.get(region) ?? [];

    }

    getElbv2TagsByArn (arn: string): {"Key"?: string;
        "Value"?: string;}[] | undefined {

        return this.#elbv2TagsByArn.get(arn);

    }

    getListenersByRegion (region: string): Listener[] {

        return this.#listenersByRegion.get(region) ?? [];

    }

    getRulesByRegion (region: string): RuleWithListenerArn[] {

        return this.#rulesByRegion.get(region) ?? [];

    }

    getListenerCertificateArns (listenerArn: string): string[] {

        return this.#listenerCertificatesByListener.get(listenerArn) ?? [];

    }

    getTopicsByRegion (region: string): Topic[] {

        return this.#topicsByRegion.get(region) ?? [];

    }

    getSubscriptionsByRegion (region: string): Subscription[] {

        return this.#subscriptionsByRegion.get(region) ?? [];

    }

    getQueuesByRegion (region: string): QueueInfo[] {

        return this.#queuesByRegion.get(region) ?? [];

    }

    getHostedZones (): HostedZone[] {

        return this.#hostedZones;

    }

    getRecordSetsByZone (zoneId: string): ResourceRecordSet[] {

        return this.#recordSetsByZone.get(zoneId) ?? [];

    }

    getEksClustersByRegion (region: string): EksCluster[] {

        return this.#eksClustersByRegion.get(region) ?? [];

    }

    getEksNodegroupsByRegion (region: string): Nodegroup[] {

        return this.#eksNodegroupsByRegion.get(region) ?? [];

    }

    getFargateProfilesByRegion (region: string): FargateProfile[] {

        return this.#fargateProfilesByRegion.get(region) ?? [];

    }

    getPodIdentityAssociationsByRegion (region: string): PodIdentityInfo[] {

        return this.#podIdentityAssociationsByRegion.get(region) ?? [];

    }

    getEksAddonsByRegion (region: string): EksAddon[] {

        return this.#eksAddonsByRegion.get(region) ?? [];

    }

    getEksAccessEntriesByRegion (region: string): EksAccessEntry[] {

        return this.#eksAccessEntriesByRegion.get(region) ?? [];

    }

    getSecretsByRegion (region: string): SecretListEntry[] {

        return this.#secretsByRegion.get(region) ?? [];

    }

    getCertificatesByRegion (region: string): CertificateSummary[] {

        return this.#certificatesByRegion.get(region) ?? [];

    }

    getFileSystemsByRegion (region: string): FileSystemDescription[] {

        return this.#fileSystemsByRegion.get(region) ?? [];

    }

    getMountTargetsByFileSystem (fileSystemId: string): MountTargetDescription[] {

        return this.#mountTargetsByFileSystem.get(fileSystemId) ?? [];

    }

    getAccessPointsByRegion (region: string): AccessPointDescription[] {

        return this.#accessPointsByRegion.get(region) ?? [];

    }

    getKeysByRegion (region: string): KeyListEntry[] {

        return this.#keysByRegion.get(region) ?? [];

    }

    getAliasesByKeyId (keyId: string): AliasListEntry[] {

        return this.#aliasesByKeyId.get(keyId) ?? [];

    }

    getAutoScalingGroupsByRegion (region: string): AutoScalingGroup[] {

        return this.#autoScalingGroupsByRegion.get(region) ?? [];

    }

    getLaunchConfigsByRegion (region: string): LaunchConfiguration[] {

        return this.#launchConfigsByRegion.get(region) ?? [];

    }

    getScalingPoliciesByRegion (region: string): ScalingPolicy[] {

        return this.#scalingPoliciesByRegion.get(region) ?? [];

    }

    getLifecycleHooksByRegion (region: string): LifecycleHook[] {

        return this.#lifecycleHooksByRegion.get(region) ?? [];

    }

    getDBInstancesByRegion (region: string): DBInstance[] {

        return this.#dbInstancesByRegion.get(region) ?? [];

    }

    getDBClustersByRegion (region: string): DBCluster[] {

        return this.#dbClustersByRegion.get(region) ?? [];

    }

    getDBProxiesByRegion (region: string): DBProxy[] {

        return this.#dbProxiesByRegion.get(region) ?? [];

    }

    getDBSubnetGroupsByRegion (region: string): DBSubnetGroup[] {

        return this.#dbSubnetGroupsByRegion.get(region) ?? [];

    }

    getDBProxyTargetGroupsByRegion (region: string): DBProxyTargetGroup[] {

        return this.#dbProxyTargetGroupsByRegion.get(region) ?? [];

    }

    getRestApisByRegion (region: string): RestApi[] {

        return this.#restApisByRegion.get(region) ?? [];

    }

    getHttpApisByRegion (region: string): Api[] {

        return this.#httpApisByRegion.get(region) ?? [];

    }

    getHttpVpcLinksByRegion (region: string): HttpVpcLink[] {

        return this.#httpVpcLinksByRegion.get(region) ?? [];

    }

    getVpcLinksByRegion (region: string): VpcLink[] {

        return this.#vpcLinksByRegion.get(region) ?? [];

    }

    getDomainNamesByRegion (region: string): DomainName[] {

        return this.#domainNamesByRegion.get(region) ?? [];

    }

    getUsagePlansByRegion (region: string): UsagePlan[] {

        return this.#usagePlansByRegion.get(region) ?? [];

    }

    getWebAclsByRegion (region: string): WebACLSummary[] {

        return this.#webAclsByRegion.get(region) ?? [];

    }

    getWafResourceAssociations (): WafResourceAssociation[] {

        return this.#wafResourceAssociations;

    }

    getCacheClustersByRegion (region: string): CacheCluster[] {

        return this.#cacheClustersByRegion.get(region) ?? [];

    }

    getReplicationGroupsByRegion (region: string): ReplicationGroup[] {

        return this.#replicationGroupsByRegion.get(region) ?? [];

    }

    getCacheSubnetGroupsByRegion (region: string): CacheSubnetGroup[] {

        return this.#cacheSubnetGroupsByRegion.get(region) ?? [];

    }

    getServerlessCachesByRegion (region: string): ServerlessCache[] {

        return this.#serverlessCachesByRegion.get(region) ?? [];

    }

    getEventBusesByRegion (region: string): EventBus[] {

        return this.#eventBusesByRegion.get(region) ?? [];

    }

    getEventBridgeRulesByRegion (region: string): RuleWithTargets[] {

        return this.#eventBridgeRulesByRegion.get(region) ?? [];

    }

    getStateMachinesByRegion (region: string): StateMachineInfo[] {

        return this.#stateMachinesByRegion.get(region) ?? [];

    }

    getKinesisStreamsByRegion (region: string): StreamSummary[] {

        return this.#kinesisStreamsByRegion.get(region) ?? [];

    }

    getOpenSearchDomainsByRegion (region: string): DomainStatus[] {

        return this.#openSearchDomainsByRegion.get(region) ?? [];

    }

    getCodeBuildProjectsByRegion (region: string): Project[] {

        return this.#codeBuildProjectsByRegion.get(region) ?? [];

    }

    getCognitoUserPoolsByRegion (region: string): CognitoUserPoolInfo[] {

        return this.#cognitoUserPoolsByRegion.get(region) ?? [];

    }

    getCloudMapNamespacesByRegion (region: string): CloudMapNamespace[] {

        return this.#cloudMapNamespacesByRegion.get(region) ?? [];

    }

    getCloudMapServicesByRegion (region: string): CloudMapService[] {

        return this.#cloudMapServicesByRegion.get(region) ?? [];

    }

    getOrgRoots (): OrgRoot[] {

        return this.#orgRoots;

    }

    getOrgOUs (): OrganizationalUnitWithParent[] {

        return this.#orgOUs;

    }

    getOrgAccounts (): OrgAccount[] {

        return this.#orgAccounts;

    }

    getOrgPolicies (): OrgPolicySummary[] {

        return this.#orgPolicies;

    }

    getBackupVaultsByRegion (region: string): BackupVaultListMember[] {

        return this.#backupVaultsByRegion.get(region) ?? [];

    }

    getProtectedResourcesByRegion (region: string): ProtectedResource[] {

        return this.#protectedResourcesByRegion.get(region) ?? [];

    }

    getGlacierVaultsByRegion (region: string): DescribeVaultOutput[] {

        return this.#glacierVaultsByRegion.get(region) ?? [];

    }

    getCodeArtifactDomainsByRegion (region: string): DomainSummary[] {

        return this.#codeArtifactDomainsByRegion.get(region) ?? [];

    }

    getCodeArtifactRepositoriesByRegion (region: string): RepositorySummary[] {

        return this.#codeArtifactRepositoriesByRegion.get(region) ?? [];

    }

    getMskClustersByRegion (region: string): ClusterInfo[] {

        return this.#mskClustersByRegion.get(region) ?? [];

    }

    getRedshiftClustersByRegion (region: string): RedshiftCluster[] {

        return this.#redshiftClustersByRegion.get(region) ?? [];

    }

    getRedshiftSubnetGroupsByRegion (region: string): RedshiftSubnetGroup[] {

        return this.#redshiftSubnetGroupsByRegion.get(region) ?? [];

    }

    getNeptuneClustersByRegion (region: string): NeptuneDBCluster[] {

        return this.#neptuneClustersByRegion.get(region) ?? [];

    }

    getNeptuneInstancesByRegion (region: string): NeptuneDBInstance[] {

        return this.#neptuneInstancesByRegion.get(region) ?? [];

    }

    getNeptuneSubnetGroupsByRegion (region: string): NeptuneSubnetGroup[] {

        return this.#neptuneSubnetGroupsByRegion.get(region) ?? [];

    }

    getDocDbClustersByRegion (region: string): DocDbDBCluster[] {

        return this.#docDbClustersByRegion.get(region) ?? [];

    }

    getDocDbInstancesByRegion (region: string): DocDbDBInstance[] {

        return this.#docDbInstancesByRegion.get(region) ?? [];

    }

    getDocDbSubnetGroupsByRegion (region: string): DocDbSubnetGroup[] {

        return this.#docDbSubnetGroupsByRegion.get(region) ?? [];

    }

    getFsxFileSystemsByRegion (region: string): FileSystem[] {

        return this.#fsxFileSystemsByRegion.get(region) ?? [];

    }

    getNetworkFirewallsByRegion (region: string): NetworkFirewallInfo[] {

        return this.#networkFirewallsByRegion.get(region) ?? [];

    }

    getFirewallPoliciesByRegion (region: string): FirewallPolicyMetadata[] {

        return this.#firewallPoliciesByRegion.get(region) ?? [];

    }

    getRuleGroupsByRegion (region: string): RuleGroupMetadata[] {

        return this.#ruleGroupsByRegion.get(region) ?? [];

    }

    getCodePipelinesByRegion (region: string): PipelineSummary[] {

        return this.#codePipelinesByRegion.get(region) ?? [];

    }

    getCloudTrailsByRegion (region: string): CloudTrailTrailInfo[] {

        return this.#cloudTrailsByRegion.get(region) ?? [];

    }

    getSsmParametersByRegion (region: string): ParameterMetadata[] {

        return this.#ssmParametersByRegion.get(region) ?? [];

    }

    getSsmManagedInstancesByRegion (region: string): InstanceInformation[] {

        return this.#ssmManagedInstancesByRegion.get(region) ?? [];

    }

    getSsmMaintenanceWindowsByRegion (region: string): MaintenanceWindowIdentity[] {

        return this.#ssmMaintenanceWindowsByRegion.get(region) ?? [];

    }

    getSsmDocumentsByRegion (region: string): DocumentIdentifier[] {

        return this.#ssmDocumentsByRegion.get(region) ?? [];

    }

    getSsmAssociationsByRegion (region: string): Association[] {

        return this.#ssmAssociationsByRegion.get(region) ?? [];

    }

    getCfnStacksByRegion (region: string): StackSummary[] {

        return this.#cfnStacksByRegion.get(region) ?? [];

    }

    getCfnStackResourcesByRegion (region: string): StackResourcesMap {

        return this.#cfnStackResourcesByRegion.get(region) ?? {};

    }

    getAccelerators (): Accelerator[] {

        return this.#accelerators;

    }

    getDlqSourceEdges (): {"sourceArn": string;
        "dlqArn": string;}[] {

        return this.#dlqSourceEdges;

    }

    getCfnExportsByRegion (region: string): Export[] {

        return this.#cfnExportsByRegion.get(region) ?? [];

    }

    getCfnStackSetsByRegion (region: string): StackSetSummary[] {

        return this.#cfnStackSetsByRegion.get(region) ?? [];

    }

    getAcceleratorListeners (): GaListener[] {

        return this.#acceleratorListeners;

    }

    getAcceleratorEndpointGroups (): EndpointGroup[] {

        return this.#acceleratorEndpointGroups;

    }

    getSsmPatchBaselinesByRegion (region: string): PatchBaselineIdentity[] {

        return this.#ssmPatchBaselinesByRegion.get(region) ?? [];

    }

    getBackupPlansByRegion (region: string): BackupPlansListMember[] {

        return this.#backupPlansByRegion.get(region) ?? [];

    }

    getBackupSelectionsByRegion (region: string): BackupSelectionsListMember[] {

        return this.#backupSelectionsByRegion.get(region) ?? [];

    }

    getCognitoIdentityProvidersByRegion (region: string): ProviderDescription[] {

        return this.#cognitoIdentityProvidersByRegion.get(region) ?? [];

    }

    getCognitoUserPoolClientsByRegion (region: string): UserPoolClientDescription[] {

        return this.#cognitoUserPoolClientsByRegion.get(region) ?? [];

    }

    getCloudMapInstancesByRegion (region: string): CloudMapInstanceSummary[] {

        return this.#cloudMapInstancesByRegion.get(region) ?? [];

    }

    getRoute53HealthChecks (): HealthCheck[] {

        return this.#route53HealthChecks;

    }

    getDirectoryBuckets (): DirectoryBucketInfo[] {

        return this.#directoryBuckets;

    }

    getMqBrokersByRegion (region: string): BrokerSummary[] {

        return this.#mqBrokersByRegion.get(region) ?? [];

    }

    getMqConfigurationsByRegion (region: string): MqConfiguration[] {

        return this.#mqConfigurationsByRegion.get(region) ?? [];

    }

    getMwaaEnvironmentsByRegion (region: string): MwaaEnvironment[] {

        return this.#mwaaEnvironmentsByRegion.get(region) ?? [];

    }

    getAppRunnerServicesByRegion (region: string): AppRunnerServiceType[] {

        return this.#appRunnerSvcsByRegion.get(region) ?? [];

    }

    getVpcConnectorsByRegion (region: string): VpcConnector[] {

        return this.#vpcConnectorsByRegion.get(region) ?? [];

    }

    getTransferServersByRegion (region: string): DescribedServer[] {

        return this.#transferServersByRegion.get(region) ?? [];

    }

    getLatticeServiceNetworksByRegion (region: string): LatticeServiceNetwork[] {

        return this.#latticeServiceNetworksByRegion.get(region) ?? [];

    }

    getLatticeServicesByRegion (region: string): LatticeService[] {

        return this.#latticeServicesByRegion.get(region) ?? [];

    }

    getLatticeTargetGroupsByRegion (region: string): LatticeTargetGroup[] {

        return this.#latticeTargetGroupsByRegion.get(region) ?? [];

    }

    getLatticeVpcAssociationsByRegion (region: string): LatticeVpcAssociation[] {

        return this.#latticeVpcAssociationsByRegion.get(region) ?? [];

    }

    getLatticeServiceAssociationsByRegion (region: string): LatticeServiceAssociation[] {

        return this.#latticeServiceAssociationsByRegion.get(region) ?? [];

    }

    getGlobalNetworks (): GlobalNetwork[] {

        return this.#globalNetworks;

    }

    getNmSites (): NmSite[] {

        return this.#nmSites;

    }

    getNmDevices (): NmDevice[] {

        return this.#nmDevices;

    }

    getNmLinks (): NmLink[] {

        return this.#nmLinks;

    }

    getNmConnections (): NmConnection[] {

        return this.#nmConnections;

    }

    getCoreNetworks (): CoreNetworkSummary[] {

        return this.#coreNetworks;

    }

    getNmAttachments (): NmAttachment[] {

        return this.#nmAttachments;

    }

    getTransitGatewayRegistrations (): TransitGatewayRegistration[] {

        return this.#transitGatewayRegistrations;

    }

    getIotThingsByRegion (region: string): ThingAttribute[] {

        return this.#iotThingsByRegion.get(region) ?? [];

    }

    getIotThingTypesByRegion (region: string): ThingTypeDefinition[] {

        return this.#iotThingTypesByRegion.get(region) ?? [];

    }

    getIotThingGroupsByRegion (region: string): IotGroupNameAndArn[] {

        return this.#iotThingGroupsByRegion.get(region) ?? [];

    }

    getIotCertificatesByRegion (region: string): IotCertificate[] {

        return this.#iotCertificatesByRegion.get(region) ?? [];

    }

    getIotTopicRulesByRegion (region: string): TopicRuleListItem[] {

        return this.#iotTopicRulesByRegion.get(region) ?? [];

    }

    getIotTopicRuleDestinationsByRegion (region: string): TopicRuleDestinationSummary[] {

        return this.#iotTopicRuleDestinationsByRegion.get(region) ?? [];

    }

    getGlueConnectionsByRegion (region: string): GlueConnection[] {

        return this.#glueConnectionsByRegion.get(region) ?? [];

    }

    getGlueCrawlersByRegion (region: string): Crawler[] {

        return this.#glueCrawlersByRegion.get(region) ?? [];

    }

    getGlueDatabasesByRegion (region: string): GlueDatabase[] {

        return this.#glueDatabasesByRegion.get(region) ?? [];

    }

    getGlueJobsByRegion (region: string): GlueJob[] {

        return this.#glueJobsByRegion.get(region) ?? [];

    }

    getGlueTriggersByRegion (region: string): GlueTrigger[] {

        return this.#glueTriggersByRegion.get(region) ?? [];

    }

    getGlueTablesByRegion (region: string): GlueTable[] {

        return this.#glueTablesByRegion.get(region) ?? [];

    }

    getGlueRegistriesByRegion (region: string): RegistryListItem[] {

        return this.#glueRegistriesByRegion.get(region) ?? [];

    }

    getGlueSchemasByRegion (region: string): SchemaListItem[] {

        return this.#glueSchemasByRegion.get(region) ?? [];

    }

    getGlueWorkflowsByRegion (region: string): GlueWorkflow[] {

        return this.#glueWorkflowsByRegion.get(region) ?? [];

    }

    getDmsReplicationInstancesByRegion (region: string): ReplicationInstance[] {

        return this.#dmsReplicationInstancesByRegion.get(region) ?? [];

    }

    getDmsSubnetGroupsByRegion (region: string): DmsSubnetGroup[] {

        return this.#dmsSubnetGroupsByRegion.get(region) ?? [];

    }

    getDmsEndpointsByRegion (region: string): DmsEndpoint[] {

        return this.#dmsEndpointsByRegion.get(region) ?? [];

    }

    getDmsReplicationTasksByRegion (region: string): ReplicationTask[] {

        return this.#dmsReplicationTasksByRegion.get(region) ?? [];

    }

    getDmsConnectionsByRegion (region: string): DmsConnection[] {

        return this.#dmsConnectionsByRegion.get(region) ?? [];

    }

    getResolverEndpointsByRegion (region: string): ResolverEndpoint[] {

        return this.#resolverEndpointsByRegion.get(region) ?? [];

    }

    getResolverRulesByRegion (region: string): ResolverRule[] {

        return this.#resolverRulesByRegion.get(region) ?? [];

    }

    getResolverRuleAssociationsByRegion (region: string): ResolverRuleAssociation[] {

        return this.#resolverRuleAssociationsByRegion.get(region) ?? [];

    }

    getFirewallRuleGroupsByRegion (region: string): FirewallRuleGroupMetadata[] {

        return this.#firewallRuleGroupsByRegion.get(region) ?? [];

    }

    getFirewallRuleGroupAssociationsByRegion (region: string): FirewallRuleGroupAssociation[] {

        return this.#firewallRuleGroupAssociationsByRegion.get(region) ?? [];

    }

    getBatchComputeEnvironmentsByRegion (region: string): ComputeEnvironmentDetail[] {

        return this.#batchComputeEnvironmentsByRegion.get(region) ?? [];

    }

    getBatchJobQueuesByRegion (region: string): JobQueueDetail[] {

        return this.#batchJobQueuesByRegion.get(region) ?? [];

    }

    getBatchSchedulingPoliciesByRegion (region: string): SchedulingPolicyListingDetail[] {

        return this.#batchSchedulingPoliciesByRegion.get(region) ?? [];

    }

    getMemoryDbClustersByRegion (region: string): MemoryDbCluster[] {

        return this.#memoryDbClustersByRegion.get(region) ?? [];

    }

    getMemoryDbSubnetGroupsByRegion (region: string): MemoryDbSubnetGroup[] {

        return this.#memoryDbSubnetGroupsByRegion.get(region) ?? [];

    }

    getMemoryDbAclsByRegion (region: string): MemoryDbACL[] {

        return this.#memoryDbAclsByRegion.get(region) ?? [];

    }

    getMemoryDbUsersByRegion (region: string): MemoryDbUser[] {

        return this.#memoryDbUsersByRegion.get(region) ?? [];

    }

    getEmrClustersByRegion (region: string): EmrClusterSummary[] {

        return this.#emrClustersByRegion.get(region) ?? [];

    }

    getEmrInstanceFleetsByRegion (region: string): EmrInstanceFleet[] {

        return this.#emrInstanceFleetsByRegion.get(region) ?? [];

    }

    getEmrInstanceGroupsByRegion (region: string): EmrInstanceGroup[] {

        return this.#emrInstanceGroupsByRegion.get(region) ?? [];

    }

    getEmrSecurityConfigsByRegion (region: string): EmrSecurityConfig[] {

        return this.#emrSecurityConfigsByRegion.get(region) ?? [];

    }

    getEmrServerlessAppsByRegion (region: string): EmrServerlessApp[] {

        return this.#emrServerlessAppsByRegion.get(region) ?? [];

    }

    getBeanstalkAppsByRegion (region: string): BeanstalkApp[] {

        return this.#beanstalkAppsByRegion.get(region) ?? [];

    }

    getBeanstalkEnvsByRegion (region: string): BeanstalkEnv[] {

        return this.#beanstalkEnvsByRegion.get(region) ?? [];

    }

    getAthenaWorkGroupsByRegion (region: string): AthenaWorkGroup[] {

        return this.#athenaWorkGroupsByRegion.get(region) ?? [];

    }

    getAthenaDataCatalogsByRegion (region: string): AthenaDataCatalog[] {

        return this.#athenaDataCatalogsByRegion.get(region) ?? [];

    }

    getDataSyncAgentsByRegion (region: string): DataSyncAgent[] {

        return this.#dataSyncAgentsByRegion.get(region) ?? [];

    }

    getDataSyncLocationsByRegion (region: string): DataSyncLocation[] {

        return this.#dataSyncLocationsByRegion.get(region) ?? [];

    }

    getDataSyncTasksByRegion (region: string): DataSyncTask[] {

        return this.#dataSyncTasksByRegion.get(region) ?? [];

    }

    getGraphqlApisByRegion (region: string): GraphqlApi[] {

        return this.#graphqlApisByRegion.get(region) ?? [];

    }

    getAppSyncDataSourcesByRegion (region: string): AppSyncDataSource[] {

        return this.#appSyncDataSourcesByRegion.get(region) ?? [];

    }

    getRsNamespacesByRegion (region: string): RsNamespace[] {

        return this.#rsNamespacesByRegion.get(region) ?? [];

    }

    getRsWorkgroupsByRegion (region: string): RsWorkgroup[] {

        return this.#rsWorkgroupsByRegion.get(region) ?? [];

    }

    getOssCollectionsByRegion (region: string): OssCollection[] {

        return this.#ossCollectionsByRegion.get(region) ?? [];

    }

    getOssVpcEndpointsByRegion (region: string): OssVpcEndpoint[] {

        return this.#ossVpcEndpointsByRegion.get(region) ?? [];

    }

    getDirectoriesByRegion (region: string): DirectoryDescription[] {

        return this.#directoriesByRegion.get(region) ?? [];

    }

    getWorkspacesByRegion (region: string): Workspace[] {

        return this.#workspacesByRegion.get(region) ?? [];

    }

    getWorkspaceDirectoriesByRegion (region: string): WorkspaceDirectory[] {

        return this.#workspaceDirectoriesByRegion.get(region) ?? [];

    }

    getHsmClustersByRegion (region: string): HsmCluster[] {

        return this.#hsmClustersByRegion.get(region) ?? [];

    }

    getMeshesByRegion (region: string): MeshRef[] {

        return this.#meshesByRegion.get(region) ?? [];

    }

    getVirtualNodesByRegion (region: string): VirtualNodeRef[] {

        return this.#virtualNodesByRegion.get(region) ?? [];

    }

    getVirtualServicesByRegion (region: string): VirtualServiceRef[] {

        return this.#virtualServicesByRegion.get(region) ?? [];

    }

    getS3AccessPointsByRegion (region: string): S3AccessPoint[] {

        return this.#s3AccessPointsByRegion.get(region) ?? [];

    }

    getClassicLoadBalancersByRegion (region: string): ClassicLoadBalancer[] {

        return this.#classicLoadBalancersByRegion.get(region) ?? [];

    }

    getPipesByRegion (region: string): Pipe[] {

        return this.#pipesByRegion.get(region) ?? [];

    }

    getGatewaysByRegion (region: string): GatewayInfo[] {

        return this.#gatewaysByRegion.get(region) ?? [];

    }

    getFileSharesByRegion (region: string): FileShareInfo[] {

        return this.#fileSharesByRegion.get(region) ?? [];

    }

    getSgwVolumesByRegion (region: string): VolumeInfo[] {

        return this.#sgwVolumesByRegion.get(region) ?? [];

    }

    getOutpostsByRegion (region: string): AwsOutpost[] {

        return this.#outpostsByRegion.get(region) ?? [];

    }

    getOutpostSitesByRegion (region: string): OutpostSite[] {

        return this.#outpostSitesByRegion.get(region) ?? [];

    }

    getInfraConfigsByRegion (region: string): InfrastructureConfiguration[] {

        return this.#infraConfigsByRegion.get(region) ?? [];

    }

    getDeploymentGroupsByRegion (region: string): DeploymentGroupInfo[] {

        return this.#deploymentGroupsByRegion.get(region) ?? [];

    }

    getMediaConnectFlowsByRegion (region: string): MediaConnectFlow[] {

        return this.#mediaConnectFlowsByRegion.get(region) ?? [];

    }

    getNotebookInstancesByRegion (region: string): DescribeNotebookInstanceOutput[] {

        return this.#notebookInstancesByRegion.get(region) ?? [];

    }

    async #forEachRegion<T> (serviceMap: Map<string, T>, serviceName: string, fn: (region: string, service: T) => Promise<void>): Promise<void> {

        for (const [
            region,
            service
        ] of serviceMap.entries()) {

            try {

                await fn(
                    region,
                    service
                );

            } catch (err: unknown) {

                this.#handleRegionError(
                    serviceName,
                    region,
                    err
                );

            }

        }

    }

    #handleRegionError (serviceName: string, region: string, err: unknown): void {

        const e = err as {"Code"?: string;
            "name"?: string;
            "message"?: string;};
        const code = e.Code ?? e.name ?? "Unknown";
        const msg = e.message ?? "";
        console.warn(`[gnaws] Skipping ${serviceName} in ${region}: ${code} — ${msg.substring(
            0,
            100
        )}`);

    }

}

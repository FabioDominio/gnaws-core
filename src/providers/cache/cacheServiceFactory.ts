import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import {join} from "node:path";
import {ServiceFactory} from "../../serviceFactory.js";
import type {SdkLogger} from "../../logger.js";
import {setCacheLogger} from "./cacheReader.js";

import type {Account} from "../../interfaces/account.js";
import type {Acm} from "../../interfaces/acm.js";
import type {Efs} from "../../interfaces/efs.js";
import type {Kms} from "../../interfaces/kms.js";
import type {AutoScaling} from "../../interfaces/autoscaling.js";
import type {Rds} from "../../interfaces/rds.js";
import type {ApiGateway} from "../../interfaces/apigateway.js";
import type {Waf} from "../../interfaces/waf.js";
import type {ElastiCache} from "../../interfaces/elasticache.js";
import type {EventBridge} from "../../interfaces/eventbridge.js";
import type {Organizations} from "../../interfaces/organizations.js";
import type {Sfn} from "../../interfaces/sfn.js";
import type {Kinesis} from "../../interfaces/kinesis.js";
import type {OpenSearch} from "../../interfaces/opensearch.js";
import type {CodeBuild} from "../../interfaces/codebuild.js";
import type {Cognito} from "../../interfaces/cognito.js";
import type {ServiceDiscovery} from "../../interfaces/servicediscovery.js";
import type {Backup} from "../../interfaces/backup.js";
import type {Glacier} from "../../interfaces/glacier.js";
import type {CodeArtifact} from "../../interfaces/codeartifact.js";
import type {Msk} from "../../interfaces/msk.js";
import type {Redshift} from "../../interfaces/redshift.js";
import type {Neptune} from "../../interfaces/neptune.js";
import type {DocDb} from "../../interfaces/docdb.js";
import type {Fsx} from "../../interfaces/fsx.js";
import type {NetworkFirewall} from "../../interfaces/networkfirewall.js";
import type {CodePipeline} from "../../interfaces/codepipeline.js";
import type {CloudTrail} from "../../interfaces/cloudtrail.js";
import type {GlobalAcceleratorService} from "../../interfaces/globalaccelerator.js";
import type {Ssm} from "../../interfaces/ssm.js";
import type {CloudFormation} from "../../interfaces/cloudformation.js";
import type {Mq} from "../../interfaces/mq.js";
import type {Mwaa} from "../../interfaces/mwaa.js";
import type {AppRunner} from "../../interfaces/apprunner.js";
import type {Transfer} from "../../interfaces/transfer.js";
import type {VpcLattice} from "../../interfaces/vpclattice.js";
import type {NetworkManager} from "../../interfaces/networkmanager.js";
import type {Iot} from "../../interfaces/iot.js";
import type {Glue} from "../../interfaces/glue.js";
import type {Dms} from "../../interfaces/dms.js";
import type {Route53Resolver} from "../../interfaces/route53resolver.js";
import type {Batch} from "../../interfaces/batch.js";
import type {MemoryDb} from "../../interfaces/memorydb.js";
import type {Emr} from "../../interfaces/emr.js";
import type {EmrServerless} from "../../interfaces/emrserverless.js";
import type {ElasticBeanstalk} from "../../interfaces/elasticbeanstalk.js";
import type {Athena} from "../../interfaces/athena.js";
import type {DataSync} from "../../interfaces/datasync.js";
import type {AppSync} from "../../interfaces/appsync.js";
import type {RedshiftServerless} from "../../interfaces/redshiftserverless.js";
import type {OpenSearchServerless} from "../../interfaces/opensearchserverless.js";
import type {DirectoryService} from "../../interfaces/directoryservice.js";
import type {WorkSpaces} from "../../interfaces/workspaces.js";
import type {CloudHsm} from "../../interfaces/cloudhsm.js";
import type {AppMesh} from "../../interfaces/appmesh.js";
import type {S3Control} from "../../interfaces/s3control.js";
import type {Elb} from "../../interfaces/elb.js";
import type {Pipes} from "../../interfaces/pipes.js";
import type {StorageGateway} from "../../interfaces/storagegateway.js";
import type {Outposts} from "../../interfaces/outposts.js";
import type {ImageBuilder} from "../../interfaces/imagebuilder.js";
import type {CodeDeploy} from "../../interfaces/codedeploy.js";
import type {MediaConnect} from "../../interfaces/mediaconnect.js";
import type {SageMaker} from "../../interfaces/sagemaker.js";
import type {Ec2} from "../../interfaces/ec2.js";
import type {Iam} from "../../interfaces/iam.js";
import type {Lambda} from "../../interfaces/lambda.js";
import type {S3} from "../../interfaces/s3.js";
import type {S3Tables} from "../../interfaces/s3tables.js";
import type {DynamoDB} from "../../interfaces/dynamodb.js";
import type {Ebs} from "../../interfaces/ebs.js";
import type {Ecs} from "../../interfaces/ecs.js";
import type {Elbv2} from "../../interfaces/elbv2.js";
import type {Sns} from "../../interfaces/sns.js";
import type {Sqs} from "../../interfaces/sqs.js";
import type {Route53} from "../../interfaces/route53.js";
import type {Eks} from "../../interfaces/eks.js";
import type {SecretsManager} from "../../interfaces/secretsmanager.js";
import type {CloudWatch} from "../../interfaces/cloudwatch.js";
import type {CloudFront} from "../../interfaces/cloudfront.js";

import {AccountCacheService} from "./accountCacheService.js";
import {AcmCacheService} from "./acmCacheService.js";
import {ApiGatewayCacheService} from "./apiGatewayCacheService.js";
import {AppMeshCacheService} from "./appMeshCacheService.js";
import {AppRunnerCacheService} from "./appRunnerCacheService.js";
import {AppSyncCacheService} from "./appSyncCacheService.js";
import {AthenaCacheService} from "./athenaCacheService.js";
import {AutoScalingCacheService} from "./autoScalingCacheService.js";
import {BackupCacheService} from "./backupCacheService.js";
import {BatchCacheService} from "./batchCacheService.js";
import {CloudFormationCacheService} from "./cloudFormationCacheService.js";
import {CloudHsmCacheService} from "./cloudHsmCacheService.js";
import {CloudTrailCacheService} from "./cloudTrailCacheService.js";
import {CloudFrontCacheService} from "./cloudfrontCacheService.js";
import {CloudWatchCacheService} from "./cloudwatchCacheService.js";
import {CodeArtifactCacheService} from "./codeArtifactCacheService.js";
import {CodeBuildCacheService} from "./codeBuildCacheService.js";
import {CodeDeployCacheService} from "./codeDeployCacheService.js";
import {CodePipelineCacheService} from "./codePipelineCacheService.js";
import {CognitoCacheService} from "./cognitoCacheService.js";
import {DataSyncCacheService} from "./dataSyncCacheService.js";
import {DirectoryCacheServiceCacheService} from "./directoryServiceCacheService.js";
import {DmsCacheService} from "./dmsCacheService.js";
import {DocDbCacheService} from "./docDbCacheService.js";
import {DynamoDBCacheService} from "./dynamodbCacheService.js";
import {EbsCacheService} from "./ebsCacheService.js";
import {Ec2CacheService} from "./ec2CacheService.js";
import type {Ecr} from "../../interfaces/ecr.js";
import {EcrCacheService} from "./ecrCacheService.js";
import {EcsCacheService} from "./ecsCacheService.js";
import {EfsCacheService} from "./efsCacheService.js";
import {EksCacheService} from "./eksCacheService.js";
import {ElastiCacheCacheService} from "./elastiCacheCacheService.js";
import {ElasticBeanstalkCacheService} from "./elasticBeanstalkCacheService.js";
import {ElbCacheService} from "./elbCacheService.js";
import {Elbv2CacheService} from "./elbv2CacheService.js";
import {EmrCacheService} from "./emrCacheService.js";
import {EmrServerlessCacheService} from "./emrServerlessCacheService.js";
import {EventBridgeCacheService} from "./eventBridgeCacheService.js";
import {FsxCacheService} from "./fsxCacheService.js";
import {GlacierCacheService} from "./glacierCacheService.js";
import {GlobalAcceleratorCacheService} from "./globalAcceleratorCacheService.js";
import {GlueCacheService} from "./glueCacheService.js";
import {IamCacheService} from "./iamCacheService.js";
import {ImageBuilderCacheService} from "./imageBuilderCacheService.js";
import {IotCacheService} from "./iotCacheService.js";
import {KinesisCacheService} from "./kinesisCacheService.js";
import {KmsCacheService} from "./kmsCacheService.js";
import {LambdaCacheService} from "./lambdaCacheService.js";
import {MediaConnectCacheService} from "./mediaConnectCacheService.js";
import {MemoryDbCacheService} from "./memoryDbCacheService.js";
import {MqCacheService} from "./mqCacheService.js";
import {MskCacheService} from "./mskCacheService.js";
import {MwaaCacheService} from "./mwaaCacheService.js";
import {NeptuneCacheService} from "./neptuneCacheService.js";
import {NetworkFirewallCacheService} from "./networkFirewallCacheService.js";
import {NetworkManagerCacheService} from "./networkManagerCacheService.js";
import {OpenSearchCacheService} from "./openSearchCacheService.js";
import {OpenSearchServerlessCacheService} from "./openSearchServerlessCacheService.js";
import {OrganizationsCacheService} from "./organizationsCacheService.js";
import {OutpostsCacheService} from "./outpostsCacheService.js";
import {PipesCacheService} from "./pipesCacheService.js";
import {RdsCacheService} from "./rdsCacheService.js";
import {RedshiftCacheService} from "./redshiftCacheService.js";
import {RedshiftServerlessCacheService} from "./redshiftServerlessCacheService.js";
import {Route53CacheService} from "./route53CacheService.js";
import {Route53ResolverCacheService} from "./route53ResolverCacheService.js";
import {S3CacheService} from "./s3CacheService.js";
import {S3ControlCacheService} from "./s3ControlCacheService.js";
import {S3TablesCacheService} from "./s3TablesCacheService.js";
import {SageMakerCacheService} from "./sageMakerCacheService.js";
import {SecretsManagerCacheService} from "./secretsManagerCacheService.js";
import {CacheServiceDiscoveryCacheService} from "./serviceDiscoveryCacheService.js";
import {SfnCacheService} from "./sfnCacheService.js";
import {SnsCacheService} from "./snsCacheService.js";
import {SqsCacheService} from "./sqsCacheService.js";
import {SsmCacheService} from "./ssmCacheService.js";
import {StorageGatewayCacheService} from "./storageGatewayCacheService.js";
import {TransferCacheService} from "./transferCacheService.js";
import {VpcLatticeCacheService} from "./vpcLatticeCacheService.js";
import {WafCacheService} from "./wafCacheService.js";
import {WorkspacesCacheService} from "./workspacesCacheService.js";

export class CacheServiceFactory extends ServiceFactory {

    #cacheDir: string;

    constructor (cacheDir: string, logger?: SdkLogger) {

        super();
        this.#cacheDir = cacheDir;
        setCacheLogger(logger);

    }

    createAccountService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Account {

        return new AccountCacheService(join(
            this.#cacheDir,
            "global"
        ));

    }

    createEc2Service (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Ec2 {

        return new Ec2CacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createIamService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Iam {

        return new IamCacheService(join(
            this.#cacheDir,
            "global"
        ));

    }

    createLambdaService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Lambda {

        return new LambdaCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createS3Service (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): S3 {

        return new S3CacheService(join(
            this.#cacheDir,
            "global"
        ));

    }

    createS3TablesService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): S3Tables {

        return new S3TablesCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createDynamoDBService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): DynamoDB {

        return new DynamoDBCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createEbsService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Ebs {

        return new EbsCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createEcrService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Ecr {

        return new EcrCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createEcsService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Ecs {

        return new EcsCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createElbv2Service (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Elbv2 {

        return new Elbv2CacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createSnsService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Sns {

        return new SnsCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createSqsService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Sqs {

        return new SqsCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createRoute53Service (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Route53 {

        return new Route53CacheService(join(
            this.#cacheDir,
            "global"
        ));

    }

    createEksService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Eks {

        return new EksCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createSecretsManagerService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): SecretsManager {

        return new SecretsManagerCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createCloudWatchService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): CloudWatch {

        return new CloudWatchCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createCloudFrontService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): CloudFront {

        return new CloudFrontCacheService(join(
            this.#cacheDir,
            "global"
        ));

    }

    createAcmService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Acm {

        return new AcmCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createEfsService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Efs {

        return new EfsCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createKmsService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Kms {

        return new KmsCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createAutoScalingService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): AutoScaling {

        return new AutoScalingCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createRdsService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Rds {

        return new RdsCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createApiGatewayService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): ApiGateway {

        return new ApiGatewayCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createWafService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Waf {

        return new WafCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createElastiCacheService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): ElastiCache {

        return new ElastiCacheCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createEventBridgeService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): EventBridge {

        return new EventBridgeCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createOrganizationsService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Organizations {

        return new OrganizationsCacheService(join(
            this.#cacheDir,
            "global"
        ));

    }

    createSfnService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Sfn {

        return new SfnCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createKinesisService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Kinesis {

        return new KinesisCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createOpenSearchService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): OpenSearch {

        return new OpenSearchCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createCodeBuildService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): CodeBuild {

        return new CodeBuildCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createCognitoService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Cognito {

        return new CognitoCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createServiceDiscoveryService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): ServiceDiscovery {

        return new CacheServiceDiscoveryCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createBackupService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Backup {

        return new BackupCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createGlacierService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Glacier {

        return new GlacierCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createCodeArtifactService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): CodeArtifact {

        return new CodeArtifactCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createMskService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Msk {

        return new MskCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createRedshiftService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Redshift {

        return new RedshiftCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createNeptuneService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Neptune {

        return new NeptuneCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createDocDbService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): DocDb {

        return new DocDbCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createFsxService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Fsx {

        return new FsxCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createNetworkFirewallService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): NetworkFirewall {

        return new NetworkFirewallCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createCodePipelineService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): CodePipeline {

        return new CodePipelineCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createCloudTrailService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): CloudTrail {

        return new CloudTrailCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createGlobalAcceleratorService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): GlobalAcceleratorService {

        return new GlobalAcceleratorCacheService(join(
            this.#cacheDir,
            "global"
        ));

    }

    createSsmService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Ssm {

        return new SsmCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createCloudFormationService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): CloudFormation {

        return new CloudFormationCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createMqService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Mq {

        return new MqCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createMwaaService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Mwaa {

        return new MwaaCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createAppRunnerService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): AppRunner {

        return new AppRunnerCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createTransferService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Transfer {

        return new TransferCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createVpcLatticeService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): VpcLattice {

        return new VpcLatticeCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createNetworkManagerService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): NetworkManager {

        return new NetworkManagerCacheService(join(
            this.#cacheDir,
            "global"
        ));

    }

    createIotService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Iot {

        return new IotCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createGlueService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Glue {

        return new GlueCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createDmsService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Dms {

        return new DmsCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createRoute53ResolverService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Route53Resolver {

        return new Route53ResolverCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createBatchService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Batch {

        return new BatchCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createMemoryDbService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): MemoryDb {

        return new MemoryDbCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createEmrService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Emr {

        return new EmrCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createEmrServerlessService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): EmrServerless {

        return new EmrServerlessCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createElasticBeanstalkService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): ElasticBeanstalk {

        return new ElasticBeanstalkCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createAthenaService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Athena {

        return new AthenaCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createDataSyncService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): DataSync {

        return new DataSyncCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createAppSyncService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): AppSync {

        return new AppSyncCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createRedshiftServerlessService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): RedshiftServerless {

        return new RedshiftServerlessCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createOpenSearchServerlessService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): OpenSearchServerless {

        return new OpenSearchServerlessCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createDirectoryServiceService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): DirectoryService {

        return new DirectoryCacheServiceCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createWorkspacesService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): WorkSpaces {

        return new WorkspacesCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createCloudHsmService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): CloudHsm {

        return new CloudHsmCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createAppMeshService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): AppMesh {

        return new AppMeshCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createS3ControlService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string, _accountId?: string): S3Control {

        return new S3ControlCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createElbService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Elb {

        return new ElbCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createPipesService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Pipes {

        return new PipesCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createStorageGatewayService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): StorageGateway {

        return new StorageGatewayCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createOutpostsService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): Outposts {

        return new OutpostsCacheService(join(
            this.#cacheDir,
            "global"
        ));

    }

    createImageBuilderService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): ImageBuilder {

        return new ImageBuilderCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createCodeDeployService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): CodeDeploy {

        return new CodeDeployCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createMediaConnectService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): MediaConnect {

        return new MediaConnectCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

    createSageMakerService (_credentials?: AwsCredentialIdentityProvider | AwsCredentialIdentity, _region?: string): SageMaker {

        return new SageMakerCacheService(join(
            this.#cacheDir,
            _region ?? ""
        ));

    }

}

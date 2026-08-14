import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {ServiceFactory} from "../../serviceFactory.js";
import {AccountService} from "./accountService.js";
import type {Account} from "../../interfaces/account.js";
import type {Ec2} from "../../interfaces/ec2.js";
import {Ec2Service} from "./ec2Service.js";
import {IamService} from "./iamService.js";
import type {Iam} from "../../interfaces/iam.js";
import {LambdaService} from "./lambdaService.js";
import type {Lambda} from "../../interfaces/lambda.js";
import type {S3} from "../../interfaces/s3.js";
import {S3Service} from "./s3Service.js";
import type {S3Tables} from "../../interfaces/s3tables.js";
import {S3TablesService} from "./s3tablesService.js";
import type {DynamoDB} from "../../interfaces/dynamodb.js";
import {DynamoDBService} from "./dynamodbService.js";
import type {Ebs} from "../../interfaces/ebs.js";
import {EbsService} from "./ebsService.js";
import type {Ecr} from "../../interfaces/ecr.js";
import {EcrService} from "./ecrService.js";
import type {Ecs} from "../../interfaces/ecs.js";
import {EcsServiceImpl} from "./ecsService.js";
import type {Elbv2} from "../../interfaces/elbv2.js";
import {Elbv2Service} from "./elbv2Service.js";
import type {Sns} from "../../interfaces/sns.js";
import {SnsService} from "./snsService.js";
import type {Sqs} from "../../interfaces/sqs.js";
import {SqsService} from "./sqsService.js";
import type {Route53} from "../../interfaces/route53.js";
import {Route53Service} from "./route53Service.js";
import type {Eks} from "../../interfaces/eks.js";
import {EksService} from "./eksService.js";
import type {SecretsManager} from "../../interfaces/secretsmanager.js";
import {SecretsManagerService} from "./secretsManagerService.js";
import type {CloudWatch} from "../../interfaces/cloudwatch.js";
import {CloudWatchService} from "./cloudwatchService.js";
import type {CloudFront} from "../../interfaces/cloudfront.js";
import {CloudFrontService} from "./cloudfrontService.js";
import type {Acm} from "../../interfaces/acm.js";
import {AcmService} from "./acmService.js";
import type {Efs} from "../../interfaces/efs.js";
import {EfsService} from "./efsService.js";
import type {Kms} from "../../interfaces/kms.js";
import {KmsService} from "./kmsService.js";
import type {AutoScaling} from "../../interfaces/autoscaling.js";
import {AutoScalingService} from "./autoScalingService.js";
import type {Rds} from "../../interfaces/rds.js";
import {RdsService} from "./rdsService.js";
import type {ApiGateway} from "../../interfaces/apigateway.js";
import {ApiGatewayService} from "./apiGatewayService.js";
import type {Waf} from "../../interfaces/waf.js";
import {WafService} from "./wafService.js";
import type {ElastiCache} from "../../interfaces/elasticache.js";
import {ElastiCacheService} from "./elastiCacheService.js";
import type {EventBridge} from "../../interfaces/eventbridge.js";
import {EventBridgeService} from "./eventBridgeService.js";
import type {Organizations} from "../../interfaces/organizations.js";
import {OrganizationsService} from "./organizationsService.js";
import type {Sfn} from "../../interfaces/sfn.js";
import {SfnService} from "./sfnService.js";
import type {Kinesis} from "../../interfaces/kinesis.js";
import {KinesisService} from "./kinesisService.js";
import type {OpenSearch} from "../../interfaces/opensearch.js";
import {OpenSearchService} from "./openSearchService.js";
import type {CodeBuild} from "../../interfaces/codebuild.js";
import {CodeBuildService} from "./codeBuildService.js";
import type {Cognito} from "../../interfaces/cognito.js";
import {CognitoService} from "./cognitoService.js";
import type {ServiceDiscovery} from "../../interfaces/servicediscovery.js";
import {ServiceDiscoveryService} from "./serviceDiscoveryService.js";
import type {Backup} from "../../interfaces/backup.js";
import {BackupService} from "./backupService.js";
import type {Glacier} from "../../interfaces/glacier.js";
import {GlacierService} from "./glacierService.js";
import type {CodeArtifact} from "../../interfaces/codeartifact.js";
import {CodeArtifactService} from "./codeArtifactService.js";
import type {Msk} from "../../interfaces/msk.js";
import {MskService} from "./mskService.js";
import type {Redshift} from "../../interfaces/redshift.js";
import {RedshiftService} from "./redshiftService.js";
import type {Neptune} from "../../interfaces/neptune.js";
import {NeptuneService} from "./neptuneService.js";
import type {DocDb} from "../../interfaces/docdb.js";
import {DocDbService} from "./docDbService.js";
import type {Fsx} from "../../interfaces/fsx.js";
import {FsxService} from "./fsxService.js";
import type {NetworkFirewall} from "../../interfaces/networkfirewall.js";
import {NetworkFirewallService} from "./networkFirewallService.js";
import type {CodePipeline} from "../../interfaces/codepipeline.js";
import {CodePipelineService} from "./codePipelineService.js";
import type {CloudTrail} from "../../interfaces/cloudtrail.js";
import {CloudTrailService} from "./cloudTrailService.js";
import type {GlobalAcceleratorService} from "../../interfaces/globalaccelerator.js";
import {GlobalAcceleratorServiceImpl} from "./globalAcceleratorService.js";
import type {Ssm} from "../../interfaces/ssm.js";
import {SsmService} from "./ssmService.js";
import type {CloudFormation} from "../../interfaces/cloudformation.js";
import {CloudFormationService} from "./cloudFormationService.js";
import type {Mq} from "../../interfaces/mq.js";
import {MqService} from "./mqService.js";
import type {Mwaa} from "../../interfaces/mwaa.js";
import {MwaaService} from "./mwaaService.js";
import type {AppRunner} from "../../interfaces/apprunner.js";
import {AppRunnerService} from "./appRunnerService.js";
import type {Transfer} from "../../interfaces/transfer.js";
import {TransferService} from "./transferService.js";
import type {VpcLattice} from "../../interfaces/vpclattice.js";
import {VpcLatticeService} from "./vpcLatticeService.js";
import type {NetworkManager} from "../../interfaces/networkmanager.js";
import {NetworkManagerService} from "./networkManagerService.js";
import type {Iot} from "../../interfaces/iot.js";
import {IotService} from "./iotService.js";
import type {Glue} from "../../interfaces/glue.js";
import {GlueService} from "./glueService.js";
import type {Dms} from "../../interfaces/dms.js";
import {DmsService} from "./dmsService.js";
import type {Route53Resolver} from "../../interfaces/route53resolver.js";
import {Route53ResolverService} from "./route53ResolverService.js";
import type {Batch} from "../../interfaces/batch.js";
import {BatchService} from "./batchService.js";
import type {MemoryDb} from "../../interfaces/memorydb.js";
import {MemoryDbService} from "./memoryDbService.js";
import type {Emr} from "../../interfaces/emr.js";
import {EmrService} from "./emrService.js";
import type {EmrServerless} from "../../interfaces/emrserverless.js";
import {EmrServerlessService} from "./emrServerlessService.js";
import type {ElasticBeanstalk} from "../../interfaces/elasticbeanstalk.js";
import {ElasticBeanstalkService} from "./elasticBeanstalkService.js";
import type {Athena} from "../../interfaces/athena.js";
import {AthenaService} from "./athenaService.js";
import type {DataSync} from "../../interfaces/datasync.js";
import {DataSyncService} from "./dataSyncService.js";
import type {AppSync} from "../../interfaces/appsync.js";
import {AppSyncService} from "./appSyncService.js";
import type {RedshiftServerless} from "../../interfaces/redshiftserverless.js";
import {RedshiftServerlessService} from "./redshiftServerlessService.js";
import type {OpenSearchServerless} from "../../interfaces/opensearchserverless.js";
import {OpenSearchServerlessService} from "./openSearchServerlessService.js";
import type {DirectoryService} from "../../interfaces/directoryservice.js";
import {DirectoryServiceService} from "./directoryServiceService.js";
import type {WorkSpaces} from "../../interfaces/workspaces.js";
import {WorkspacesService} from "./workspacesService.js";
import type {CloudHsm} from "../../interfaces/cloudhsm.js";
import {CloudHsmService} from "./cloudHsmService.js";
import type {AppMesh} from "../../interfaces/appmesh.js";
import {AppMeshService} from "./appMeshService.js";
import type {S3Control} from "../../interfaces/s3control.js";
import {S3ControlService} from "./s3ControlService.js";
import type {Elb} from "../../interfaces/elb.js";
import {ElbService} from "./elbService.js";
import type {Pipes} from "../../interfaces/pipes.js";
import {PipesService} from "./pipesService.js";
import type {StorageGateway} from "../../interfaces/storagegateway.js";
import {StorageGatewayService} from "./storageGatewayService.js";
import type {Outposts} from "../../interfaces/outposts.js";
import {OutpostsService} from "./outpostsService.js";
import type {ImageBuilder} from "../../interfaces/imagebuilder.js";
import {ImageBuilderService} from "./imageBuilderService.js";
import type {CodeDeploy} from "../../interfaces/codedeploy.js";
import {CodeDeployService} from "./codeDeployService.js";
import type {MediaConnect} from "../../interfaces/mediaconnect.js";
import {MediaConnectService} from "./mediaConnectService.js";
import type {SageMaker} from "../../interfaces/sagemaker.js";
import {SageMakerService} from "./sageMakerService.js";

export class LiveServiceFactory extends ServiceFactory {

    #logger?: SdkLogger;

    constructor (logger?: SdkLogger) {

        super();
        this.#logger = logger;

    }

    createAccountService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity): Account {

        return new AccountService(
            credentials,
            this.#child("account")
        );

    }

    createEc2Service (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Ec2 {

        return new Ec2Service(
            credentials,
            region,
            this.#child("ec2")
        );

    }

    createIamService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity): Iam {

        return new IamService(
            credentials,
            this.#child("iam")
        );

    }

    createLambdaService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Lambda {

        return new LambdaService(
            credentials,
            region,
            this.#child("lambda")
        );

    }

    createS3Service (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity): S3 {

        return new S3Service(
            credentials,
            this.#child("s3")
        );

    }

    createS3TablesService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): S3Tables {

        return new S3TablesService(
            credentials,
            region,
            this.#child("s3tables")
        );

    }

    createDynamoDBService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): DynamoDB {

        return new DynamoDBService(
            credentials,
            region,
            this.#child("dynamodb")
        );

    }

    createEbsService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Ebs {

        return new EbsService(
            credentials,
            region,
            this.#child("ebs")
        );

    }

    createEcrService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Ecr {

        return new EcrService(
            credentials,
            region,
            this.#child("ecr")
        );

    }

    createEcsService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Ecs {

        return new EcsServiceImpl(
            credentials,
            region
        );

    }

    createElbv2Service (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Elbv2 {

        return new Elbv2Service(
            credentials,
            region,
            this.#child("elbv2")
        );

    }

    createSnsService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Sns {

        return new SnsService(
            credentials,
            region,
            this.#child("sns")
        );

    }

    createSqsService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Sqs {

        return new SqsService(
            credentials,
            region,
            this.#child("sqs")
        );

    }

    createRoute53Service (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity): Route53 {

        return new Route53Service(
            credentials,
            this.#child("route53")
        );

    }

    createEksService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Eks {

        return new EksService(
            credentials,
            region,
            this.#child("eks")
        );

    }

    createSecretsManagerService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): SecretsManager {

        return new SecretsManagerService(
            credentials,
            region,
            this.#child("secretsmanager")
        );

    }

    createCloudWatchService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): CloudWatch {

        return new CloudWatchService(
            credentials,
            region,
            this.#child("cloudwatch")
        );

    }

    createCloudFrontService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity): CloudFront {

        return new CloudFrontService(
            credentials,
            this.#child("cloudfront")
        );

    }

    createAcmService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Acm {

        return new AcmService(
            credentials,
            region,
            this.#child("acm")
        );

    }

    createEfsService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Efs {

        return new EfsService(
            credentials,
            region,
            this.#child("efs")
        );

    }

    createKmsService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Kms {

        return new KmsService(
            credentials,
            region,
            this.#child("kms")
        );

    }

    createAutoScalingService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): AutoScaling {

        return new AutoScalingService(
            credentials,
            region,
            this.#child("autoscaling")
        );

    }

    createRdsService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Rds {

        return new RdsService(
            credentials,
            region,
            this.#child("rds")
        );

    }

    createApiGatewayService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): ApiGateway {

        return new ApiGatewayService(
            credentials,
            region,
            this.#child("apigateway")
        );

    }

    createWafService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Waf {

        return new WafService(
            credentials,
            region,
            this.#child("waf")
        );

    }

    createElastiCacheService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): ElastiCache {

        return new ElastiCacheService(
            credentials,
            region,
            this.#child("elasticache")
        );

    }

    createEventBridgeService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): EventBridge {

        return new EventBridgeService(
            credentials,
            region,
            this.#child("eventbridge")
        );

    }

    createOrganizationsService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity): Organizations {

        return new OrganizationsService(
            credentials,
            this.#child("organizations")
        );

    }

    createSfnService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Sfn {

        return new SfnService(
            credentials,
            region,
            this.#child("sfn")
        );

    }

    createKinesisService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Kinesis {

        return new KinesisService(
            credentials,
            region,
            this.#child("kinesis")
        );

    }

    createOpenSearchService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): OpenSearch {

        return new OpenSearchService(
            credentials,
            region,
            this.#child("opensearch")
        );

    }

    createCodeBuildService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): CodeBuild {

        return new CodeBuildService(
            credentials,
            region,
            this.#child("codebuild")
        );

    }

    createCognitoService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Cognito {

        return new CognitoService(
            credentials,
            region,
            this.#child("cognito")
        );

    }

    createServiceDiscoveryService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): ServiceDiscovery {

        return new ServiceDiscoveryService(
            credentials,
            region,
            this.#child("servicediscovery")
        );

    }

    createBackupService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Backup {

        return new BackupService(
            credentials,
            region,
            this.#child("backup")
        );

    }

    createGlacierService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Glacier {

        return new GlacierService(
            credentials,
            region,
            this.#child("glacier")
        );

    }

    createCodeArtifactService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): CodeArtifact {

        return new CodeArtifactService(
            credentials,
            region,
            this.#child("codeartifact")
        );

    }

    createMskService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Msk {

        return new MskService(
            credentials,
            region,
            this.#child("msk")
        );

    }

    createRedshiftService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Redshift {

        return new RedshiftService(
            credentials,
            region,
            this.#child("redshift")
        );

    }

    createNeptuneService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Neptune {

        return new NeptuneService(
            credentials,
            region,
            this.#child("neptune")
        );

    }

    createDocDbService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): DocDb {

        return new DocDbService(
            credentials,
            region,
            this.#child("docdb")
        );

    }

    createFsxService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Fsx {

        return new FsxService(
            credentials,
            region,
            this.#child("fsx")
        );

    }

    createNetworkFirewallService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): NetworkFirewall {

        return new NetworkFirewallService(
            credentials,
            region,
            this.#child("networkfirewall")
        );

    }

    createCodePipelineService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): CodePipeline {

        return new CodePipelineService(
            credentials,
            region,
            this.#child("codepipeline")
        );

    }

    createCloudTrailService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): CloudTrail {

        return new CloudTrailService(
            credentials,
            region,
            this.#child("cloudtrail")
        );

    }

    createGlobalAcceleratorService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity): GlobalAcceleratorService {

        return new GlobalAcceleratorServiceImpl(credentials);

    }

    createSsmService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Ssm {

        return new SsmService(
            credentials,
            region,
            this.#child("ssm")
        );

    }

    createCloudFormationService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): CloudFormation {

        return new CloudFormationService(
            credentials,
            region,
            this.#child("cloudformation")
        );

    }

    createMqService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Mq {

        return new MqService(
            credentials,
            region,
            this.#child("mq")
        );

    }

    createMwaaService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Mwaa {

        return new MwaaService(
            credentials,
            region,
            this.#child("mwaa")
        );

    }

    createAppRunnerService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): AppRunner {

        return new AppRunnerService(
            credentials,
            region,
            this.#child("apprunner")
        );

    }

    createTransferService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Transfer {

        return new TransferService(
            credentials,
            region,
            this.#child("transfer")
        );

    }

    createVpcLatticeService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): VpcLattice {

        return new VpcLatticeService(
            credentials,
            region,
            this.#child("vpclattice")
        );

    }

    createNetworkManagerService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): NetworkManager {

        return new NetworkManagerService(
            credentials,
            region,
            this.#child("networkmanager")
        );

    }

    createIotService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Iot {

        return new IotService(
            credentials,
            region,
            this.#child("iot")
        );

    }

    createGlueService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Glue {

        return new GlueService(
            credentials,
            region,
            this.#child("glue")
        );

    }

    createDmsService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Dms {

        return new DmsService(
            credentials,
            region,
            this.#child("dms")
        );

    }

    createRoute53ResolverService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Route53Resolver {

        return new Route53ResolverService(
            credentials,
            region,
            this.#child("route53resolver")
        );

    }

    createBatchService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Batch {

        return new BatchService(
            credentials,
            region,
            this.#child("batch")
        );

    }

    createMemoryDbService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): MemoryDb {

        return new MemoryDbService(
            credentials,
            region,
            this.#child("memorydb")
        );

    }

    createEmrService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Emr {

        return new EmrService(
            credentials,
            region,
            this.#child("emr")
        );

    }

    createEmrServerlessService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): EmrServerless {

        return new EmrServerlessService(
            credentials,
            region,
            this.#child("emrserverless")
        );

    }

    createElasticBeanstalkService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): ElasticBeanstalk {

        return new ElasticBeanstalkService(
            credentials,
            region,
            this.#child("elasticbeanstalk")
        );

    }

    createAthenaService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Athena {

        return new AthenaService(
            credentials,
            region,
            this.#child("athena")
        );

    }

    createDataSyncService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): DataSync {

        return new DataSyncService(
            credentials,
            region,
            this.#child("datasync")
        );

    }

    createAppSyncService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): AppSync {

        return new AppSyncService(
            credentials,
            region,
            this.#child("appsync")
        );

    }

    createRedshiftServerlessService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): RedshiftServerless {

        return new RedshiftServerlessService(
            credentials,
            region,
            this.#child("redshiftserverless")
        );

    }

    createOpenSearchServerlessService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): OpenSearchServerless {

        return new OpenSearchServerlessService(
            credentials,
            region,
            this.#child("opensearchserverless")
        );

    }

    createDirectoryServiceService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): DirectoryService {

        return new DirectoryServiceService(
            credentials,
            region,
            this.#child("directoryservice")
        );

    }

    createWorkspacesService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): WorkSpaces {

        return new WorkspacesService(
            credentials,
            region,
            this.#child("workspaces")
        );

    }

    createCloudHsmService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): CloudHsm {

        return new CloudHsmService(
            credentials,
            region,
            this.#child("cloudhsm")
        );

    }

    createAppMeshService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): AppMesh {

        return new AppMeshService(
            credentials,
            region,
            this.#child("appmesh")
        );

    }

    createS3ControlService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, accountId: string): S3Control {

        return new S3ControlService(
            credentials,
            region,
            accountId,
            this.#child("s3control")
        );

    }

    createElbService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Elb {

        return new ElbService(
            credentials,
            region,
            this.#child("elb")
        );

    }

    createPipesService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Pipes {

        return new PipesService(
            credentials,
            region,
            this.#child("pipes")
        );

    }

    createStorageGatewayService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): StorageGateway {

        return new StorageGatewayService(
            credentials,
            region,
            this.#child("storagegateway")
        );

    }

    createOutpostsService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): Outposts {

        return new OutpostsService(
            credentials,
            region,
            this.#child("outposts")
        );

    }

    createImageBuilderService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): ImageBuilder {

        return new ImageBuilderService(
            credentials,
            region,
            this.#child("imagebuilder")
        );

    }

    createCodeDeployService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): CodeDeploy {

        return new CodeDeployService(
            credentials,
            region,
            this.#child("codedeploy")
        );

    }

    createMediaConnectService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): MediaConnect {

        return new MediaConnectService(
            credentials,
            region,
            this.#child("mediaconnect")
        );

    }

    createSageMakerService (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string): SageMaker {

        return new SageMakerService(
            credentials,
            region,
            this.#child("sagemaker")
        );

    }

    #child (name: string): SdkLogger | undefined {

        return this.#logger?.child
            ? this.#logger.child(name)
            : this.#logger;

    }

}

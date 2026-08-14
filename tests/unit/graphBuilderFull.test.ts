import {describe, it, expect} from "vitest";
import {GraphBuilder} from "../../src/graphBuilder.js";
import type {Inventory} from "../../src/inventory.js";

const REGION = "eu-west-1";

function fullInventory (): Inventory {

    const emptyArray = (): unknown[] => [];
    const emptyMap = (): Record<string, unknown[]> => ({});

    const data: Record<string, (...args: unknown[]) => unknown> = {
        // Regions
        "getAccountRegions": () => [
            {"RegionName": REGION,
                "RegionOptStatus": "ENABLED_BY_DEFAULT"}
        ],
        // Organizations
        "getOrgRoots": () => [
            {"Id": "r-test",
                "Name": "Root"}
        ],
        "getOrgOUs": () => [
            {"ou": {"Id": "ou-test",
                "Name": "OU1"},
            "parentId": "r-test"}
        ],
        "getOrgAccounts": () => [
            {"Id": "111111111111",
                "Name": "TestAccount"}
        ],
        "getOrgPolicies": () => [
            {"Id": "p-test",
                "Arn": "arn:aws:organizations::111111111111:policy/p-test",
                "Name": "TestPolicy"}
        ],
        // IAM
        "getUserGroups": () => [
            {"GroupId": "grp-test",
                "GroupName": "Admins"}
        ],
        "getUsers": () => [
            {"UserId": "usr-test",
                "UserName": "testuser"}
        ],
        "getRoles": () => [
            {"RoleId": "role-test",
                "RoleName": "TestRole",
                "Arn": "arn:aws:iam::111:role/TestRole"}
        ],
        "getRoleByArn": (arn: string) => {

            if (arn === "arn:aws:iam::111:role/TestRole") {

                return {"RoleId": "role-test",
                    "RoleName": "TestRole",
                    "Arn": "arn:aws:iam::111:role/TestRole"};

            }

            return undefined;

        },
        "getPolicies": () => [
            {"PolicyId": "pol-test",
                "PolicyName": "TestPolicy",
                "Arn": "arn:aws:iam::111:policy/TestPolicy"}
        ],
        "getPolicyByArn": (arn: string) => {

            if (arn === "arn:aws:iam::111:policy/TestPolicy") {

                return {"PolicyId": "pol-test",
                    "PolicyName": "TestPolicy",
                    "Arn": "arn:aws:iam::111:policy/TestPolicy"};

            }

            return undefined;

        },
        "getInstanceProfiles": () => [
            {"InstanceProfileId": "ip-test",
                "InstanceProfileName": "TestIP",
                "Roles": [{"RoleId": "role-test"}]}
        ],
        "getMfaDevices": () => [
            {"SerialNumber": "arn:aws:iam::111:mfa/test",
                "UserName": "testuser"}
        ],
        "getAccessKeys": () => [
            {"AccessKeyId": "AKIA-TEST",
                "UserName": "testuser",
                "Status": "Active"}
        ],
        "getSshPublicKeys": () => [
            {"SSHPublicKeyId": "ssh-test",
                "UserName": "testuser",
                "Status": "Active"}
        ],
        "getServerCertificates": () => [
            {"ServerCertificateId": "cert-test",
                "ServerCertificateName": "TestCert",
                "Expiration": new Date()}
        ],
        "getVirtualMfaDevices": () => [
            {"SerialNumber": "arn:aws:iam::111:mfa/virtual-test",
                "User": {"UserId": "usr-test"}}
        ],
        "getUserGroupMemberships": () => [
            {"userId": "usr-test",
                "groupId": "grp-test"}
        ],
        "getGroupMemberships": () => [],
        "getInstanceProfileRoleEdges": () => [
            {"instanceProfileId": "ip-test",
                "roleId": "role-test"}
        ],
        "getUserPolicies": () => [],
        "getRolePolicies": () => [],
        "getGroupPolicies": () => [],
        // ACM
        "getCertificatesByRegion": () => [
            {"CertificateArn": "arn:aws:acm:eu-west-1:111:certificate/test",
                "DomainName": "test.example.com",
                "Status": "ISSUED",
                "Type": "AMAZON_ISSUED",
                "InUse": true}
        ],
        // KMS
        "getKeysByRegion": () => [
            {"KeyArn": "arn:aws:kms:eu-west-1:111:key/test-key",
                "KeyId": "test-key"}
        ],
        "getAliasesByKeyId": () => [{"AliasName": "alias/test-key"}],
        // EFS
        "getFileSystemsByRegion": () => [
            {"FileSystemArn": "arn:aws:elasticfilesystem:eu-west-1:111:file-system/fs-test",
                "FileSystemId": "fs-test",
                "Name": "TestFS",
                "LifeCycleState": "available",
                "OwnerId": "111"}
        ],
        "getMountTargetsByFileSystem": () => [
            {"MountTargetId": "mt-test",
                "SubnetId": "subnet-test"}
        ],
        "getAccessPointsByRegion": () => [
            {"AccessPointArn": "arn:aws:elasticfilesystem:eu-west-1:111:access-point/ap-test",
                "AccessPointId": "ap-test",
                "Name": "TestAP",
                "FileSystemId": "fs-test"}
        ],
        // S3
        "getBuckets": () => [
            {"bucket": {"Name": "test-bucket"},
                "region": REGION,
                "tags": [
                    {"Key": "Env",
                        "Value": "test"}
                ],
                "notificationConfiguration": {}}
        ],
        "getDirectoryBuckets": () => [{"name": "dir-bucket-test"}],
        // S3 Tables
        "getTableBucketsByRegion": () => [
            {"arn": "arn:aws:s3tables:eu-west-1:111:bucket/tb-test",
                "name": "tb-test"}
        ],
        "getNamespacesByRegion": () => [
            {"namespace": ["ns-test"],
                "createdBy": "111"}
        ],
        "getTablesByRegion": () => [
            {"tableARN": "arn:aws:s3tables:eu-west-1:111:table/tbl-test",
                "name": "tbl-test",
                "namespace": ["ns-test"]}
        ],
        // DynamoDB
        "getDynamoDBTablesByRegion": () => [
            {"TableArn": "arn:aws:dynamodb:eu-west-1:111:table/TestTable",
                "TableName": "TestTable",
                "TableStatus": "ACTIVE",
                "ItemCount": 100,
                "TableSizeBytes": 1024}
        ],
        // ECR
        "getEcrRepositoriesByRegion": () => [
            {"repositoryArn": "arn:aws:ecr:eu-west-1:111:repository/test-repo",
                "repositoryName": "test-repo"}
        ],
        // ECS
        "getEcsClustersByRegion": () => [
            {"clusterArn": "arn:aws:ecs:eu-west-1:111:cluster/test-cluster",
                "clusterName": "test-cluster",
                "status": "ACTIVE",
                "runningTasksCount": 1,
                "activeServicesCount": 1}
        ],
        "getEcsServicesByRegion": () => [
            {"serviceArn": "arn:aws:ecs:eu-west-1:111:service/test-svc",
                "serviceName": "test-svc",
                "clusterArn": "arn:aws:ecs:eu-west-1:111:cluster/test-cluster",
                "launchType": "FARGATE",
                "desiredCount": 1}
        ],
        "getEcsTaskDefinitionArnsByRegion": () => ["arn:aws:ecs:eu-west-1:111:task-definition/test-td:1"],
        "getEcsContainerInstancesByRegion": () => [
            {"containerInstance": {"containerInstanceArn": "arn:aws:ecs:eu-west-1:111:container-instance/ci-test",
                "status": "ACTIVE",
                "runningTasksCount": 1},
            "clusterArn": "arn:aws:ecs:eu-west-1:111:cluster/test-cluster"}
        ],
        // ELBv2
        "getLoadBalancersByRegion": () => [
            {"LoadBalancerArn": "arn:aws:elasticloadbalancing:eu-west-1:111:loadbalancer/app/test-lb/123",
                "LoadBalancerName": "test-lb",
                "Type": "application",
                "VpcId": "vpc-test"}
        ],
        "getTargetGroupsByRegion": () => [
            {"TargetGroupArn": "arn:aws:elasticloadbalancing:eu-west-1:111:targetgroup/test-tg/123",
                "TargetGroupName": "test-tg",
                "VpcId": "vpc-test",
                "LoadBalancerArns": ["arn:aws:elasticloadbalancing:eu-west-1:111:loadbalancer/app/test-lb/123"]}
        ],
        "getListenersByRegion": () => [
            {"ListenerArn": "arn:aws:elasticloadbalancing:eu-west-1:111:listener/app/test-lb/123/456",
                "LoadBalancerArn": "arn:aws:elasticloadbalancing:eu-west-1:111:loadbalancer/app/test-lb/123",
                "Protocol": "HTTPS",
                "Port": 443}
        ],
        "getRulesByRegion": () => [],
        "getTrustStoresByRegion": () => [
            {"TrustStoreArn": "arn:aws:elasticloadbalancing:eu-west-1:111:truststore/ts-test",
                "Name": "ts-test",
                "Status": "ACTIVE"}
        ],
        "getTrustStoreAssociationsByRegion": emptyArray,
        "getListenerCertificateArns": () => [],
        "getElbv2TagsByArn": () => [],
        // SNS
        "getTopicsByRegion": () => [{"TopicArn": "arn:aws:sns:eu-west-1:111:test-topic"}],
        "getSubscriptionsByRegion": () => [
            {"SubscriptionArn": "arn:aws:sns:eu-west-1:111:test-topic:sub-test",
                "TopicArn": "arn:aws:sns:eu-west-1:111:test-topic",
                "Protocol": "sqs",
                "Endpoint": "arn:aws:sqs:eu-west-1:111:test-queue"}
        ],
        // SQS
        "getQueuesByRegion": () => [
            {"queueArn": "arn:aws:sqs:eu-west-1:111:test-queue",
                "queueUrl": "https://sqs.eu-west-1.amazonaws.com/111/test-queue",
                "queueName": "test-queue"}
        ],
        "getDlqSourceEdges": emptyArray,
        // Route 53
        "getHostedZones": () => [
            {"Id": "/hostedzone/Z-TEST",
                "Name": "example.com."}
        ],
        "getRecordSetsByZone": () => [],
        "getRoute53HealthChecks": () => [{"Id": "hc-test"}],
        // EKS
        "getEksClustersByRegion": () => [
            {"arn": "arn:aws:eks:eu-west-1:111:cluster/test-eks",
                "name": "test-eks",
                "version": "1.28",
                "status": "ACTIVE",
                "roleArn": "role-test",
                "resourcesVpcConfig": {"vpcId": "vpc-test",
                    "subnetIds": ["subnet-test"],
                    "securityGroupIds": ["sg-test"]}}
        ],
        "getEksNodegroupsByRegion": () => [
            {"nodegroupArn": "arn:aws:eks:eu-west-1:111:nodegroup/test-eks/ng-test/123",
                "nodegroupName": "ng-test",
                "clusterName": "test-eks",
                "status": "ACTIVE",
                "nodeRole": "role-test",
                "subnets": ["subnet-test"]}
        ],
        "getFargateProfilesByRegion": () => [
            {"fargateProfileArn": "arn:aws:eks:eu-west-1:111:fargateprofile/test-eks/fp-test/123",
                "fargateProfileName": "fp-test",
                "clusterName": "test-eks",
                "status": "ACTIVE",
                "subnets": ["subnet-test"],
                "podExecutionRoleArn": "role-test"}
        ],
        "getPodIdentityAssociationsByRegion": () => [
            {"associationArn": "arn:aws:eks:eu-west-1:111:podidentityassociation/test-eks/pia-test",
                "clusterName": "test-eks",
                "namespace": "default",
                "serviceAccount": "sa-test",
                "roleArn": "role-test"}
        ],
        "getEksAddonsByRegion": () => [
            {"addonArn": "arn:aws:eks:eu-west-1:111:addon/test-eks/vpc-cni/123",
                "addonName": "vpc-cni",
                "clusterName": "test-eks",
                "status": "ACTIVE"}
        ],
        "getEksAccessEntriesByRegion": () => [
            {"accessEntryArn": "arn:aws:eks:eu-west-1:111:access-entry/test-eks/ae-test",
                "clusterName": "test-eks",
                "username": "testuser",
                "type": "STANDARD",
                "principalArn": "role-test"}
        ],
        // Secrets Manager
        "getSecretsByRegion": () => [
            {"ARN": "arn:aws:secretsmanager:eu-west-1:111:secret:test-secret",
                "Name": "test-secret"}
        ],
        // CloudFront
        "getDistributions": () => [
            {"Id": "DIST-TEST",
                "ARN": "arn:aws:cloudfront::111:distribution/DIST-TEST",
                "DomainName": "d123.cloudfront.net",
                "Status": "Deployed",
                "Origins": {"Items": []}}
        ],
        "getCloudFrontFunctions": () => [
            {"Name": "cf-func-test",
                "FunctionMetadata": {"FunctionARN": "arn:aws:cloudfront::111:function/cf-func-test",
                    "Stage": "LIVE"},
                "FunctionConfig": {"Runtime": "cloudfront-js-2.0"}}
        ],
        "getOriginAccessControls": () => [
            {"Id": "oac-test",
                "OriginAccessControlConfig": {"Name": "oac-test",
                    "OriginAccessControlOriginType": "s3",
                    "SigningBehavior": "always"}}
        ],
        "getKeyValueStores": () => [
            {"ARN": "arn:aws:cloudfront::111:key-value-store/kvs-test",
                "Name": "kvs-test",
                "Status": "READY"}
        ],
        // Auto Scaling
        "getAutoScalingGroupsByRegion": () => [
            {"AutoScalingGroupARN": "arn:aws:autoscaling:eu-west-1:111:autoScalingGroup:asg-test",
                "AutoScalingGroupName": "asg-test",
                "MinSize": 1,
                "MaxSize": 3,
                "DesiredCapacity": 2}
        ],
        "getLaunchConfigsByRegion": () => [
            {"LaunchConfigurationARN": "arn:aws:autoscaling:eu-west-1:111:launchConfiguration:lc-test",
                "LaunchConfigurationName": "lc-test",
                "InstanceType": "t3.micro"}
        ],
        "getScalingPoliciesByRegion": () => [
            {"PolicyARN": "arn:aws:autoscaling:eu-west-1:111:scalingPolicy:sp-test",
                "PolicyName": "sp-test",
                "PolicyType": "TargetTrackingScaling",
                "AutoScalingGroupName": "asg-test"}
        ],
        "getLifecycleHooksByRegion": () => [
            {"LifecycleHookName": "hook-test",
                "AutoScalingGroupName": "asg-test",
                "LifecycleTransition": "autoscaling:EC2_INSTANCE_LAUNCHING"}
        ],
        // RDS
        "getDBClustersByRegion": () => [
            {"DBClusterArn": "arn:aws:rds:eu-west-1:111:cluster:test-cluster",
                "DBClusterIdentifier": "test-cluster"}
        ],
        "getDBInstancesByRegion": () => [
            {"DBInstanceArn": "arn:aws:rds:eu-west-1:111:db:test-db",
                "DBInstanceIdentifier": "test-db",
                "DBClusterIdentifier": "test-cluster"}
        ],
        "getDBProxiesByRegion": () => [
            {"DBProxyArn": "arn:aws:rds:eu-west-1:111:db-proxy:test-proxy",
                "DBProxyName": "test-proxy",
                "RoleArn": "role-test"}
        ],
        "getDBSubnetGroupsByRegion": () => [
            {"DBSubnetGroupArn": "arn:aws:rds:eu-west-1:111:subgrp:test-subgrp",
                "DBSubnetGroupName": "test-subgrp",
                "VpcId": "vpc-test"}
        ],
        "getDBProxyTargetGroupsByRegion": () => [
            {"TargetGroupArn": "arn:aws:rds:eu-west-1:111:target-group:tg-test",
                "TargetGroupName": "default",
                "DBProxyName": "test-proxy",
                "Status": "available"}
        ],
        // API Gateway
        "getRestApisByRegion": () => [
            {"id": "rest-api-test",
                "name": "TestRestAPI"}
        ],
        "getHttpApisByRegion": () => [
            {"ApiId": "http-api-test",
                "Name": "TestHttpAPI"}
        ],
        "getVpcLinksByRegion": () => [
            {"id": "vpclink-test",
                "name": "TestVpcLink",
                "status": "AVAILABLE"}
        ],
        "getHttpVpcLinksByRegion": () => [
            {"VpcLinkId": "httpvpclink-test",
                "Name": "TestHttpVpcLink",
                "VpcLinkStatus": "AVAILABLE"}
        ],
        "getDomainNamesByRegion": () => [
            {"domainName": "api.example.com",
                "domainNameStatus": "AVAILABLE"}
        ],
        "getUsagePlansByRegion": () => [
            {"id": "up-test",
                "name": "TestUsagePlan"}
        ],
        // WAF
        "getWebAclsByRegion": () => [
            {"ARN": "arn:aws:wafv2:eu-west-1:111:regional/webacl/test-acl/123",
                "Name": "test-acl"}
        ],
        "getWafResourceAssociations": emptyArray,
        // ElastiCache
        "getReplicationGroupsByRegion": () => [
            {"ARN": "arn:aws:elasticache:eu-west-1:111:replicationgroup:rg-test",
                "ReplicationGroupId": "rg-test"}
        ],
        "getCacheClustersByRegion": () => [
            {"ARN": "arn:aws:elasticache:eu-west-1:111:cluster:cc-test",
                "CacheClusterId": "cc-test"}
        ],
        "getCacheSubnetGroupsByRegion": () => [
            {"ARN": "arn:aws:elasticache:eu-west-1:111:subnetgroup:csg-test",
                "CacheSubnetGroupName": "csg-test",
                "VpcId": "vpc-test"}
        ],
        "getServerlessCachesByRegion": () => [
            {"ARN": "arn:aws:elasticache:eu-west-1:111:serverlesscache:sc-test",
                "ServerlessCacheName": "sc-test"}
        ],
        // EventBridge
        "getEventBusesByRegion": () => [
            {"Arn": "arn:aws:events:eu-west-1:111:event-bus/default",
                "Name": "default"}
        ],
        "getEventBridgeRulesByRegion": () => [
            {"rule": {"Arn": "arn:aws:events:eu-west-1:111:rule/test-rule",
                "Name": "test-rule",
                "EventBusName": "default"},
            "targets": [{"Arn": "arn:aws:lambda:eu-west-1:111:function:test-fn"}]}
        ],
        // Step Functions
        "getStateMachinesByRegion": () => [
            {"stateMachineArn": "arn:aws:states:eu-west-1:111:stateMachine:test-sfn",
                "name": "test-sfn",
                "roleArn": "role-test"}
        ],
        // Kinesis
        "getKinesisStreamsByRegion": () => [
            {"StreamARN": "arn:aws:kinesis:eu-west-1:111:stream/test-stream",
                "StreamName": "test-stream"}
        ],
        // OpenSearch
        "getOpenSearchDomainsByRegion": () => [
            {"ARN": "arn:aws:es:eu-west-1:111:domain/test-os",
                "DomainName": "test-os"}
        ],
        // CodeBuild
        "getCodeBuildProjectsByRegion": () => [
            {"arn": "arn:aws:codebuild:eu-west-1:111:project/test-cb",
                "name": "test-cb"}
        ],
        // Cognito
        "getCognitoUserPoolsByRegion": () => [
            {"Id": "eu-west-1_test",
                "Arn": "arn:aws:cognito-idp:eu-west-1:111:userpool/eu-west-1_test",
                "Name": "TestPool"}
        ],
        "getCognitoIdentityProvidersByRegion": () => [
            {"ProviderName": "Google",
                "ProviderType": "Google"}
        ],
        "getCognitoUserPoolClientsByRegion": () => [
            {"ClientId": "client-test",
                "ClientName": "TestClient",
                "UserPoolId": "eu-west-1_test"}
        ],
        // Service Discovery
        "getCloudMapNamespacesByRegion": () => [
            {"Arn": "arn:aws:servicediscovery:eu-west-1:111:namespace/ns-test",
                "Id": "ns-test",
                "Name": "test-ns"}
        ],
        "getCloudMapServicesByRegion": () => [
            {"Arn": "arn:aws:servicediscovery:eu-west-1:111:service/svc-test",
                "Id": "svc-test",
                "Name": "test-svc",
                "NamespaceId": "ns-test"}
        ],
        "getCloudMapInstancesByRegion": () => [{"Id": "inst-test"}],
        // Backup
        "getBackupVaultsByRegion": () => [
            {"BackupVaultArn": "arn:aws:backup:eu-west-1:111:backup-vault:test-vault",
                "BackupVaultName": "test-vault",
                "EncryptionKeyArn": "arn:aws:kms:eu-west-1:111:key/test-key"}
        ],
        "getProtectedResourcesByRegion": emptyArray,
        "getBackupPlansByRegion": () => [
            {"BackupPlanArn": "arn:aws:backup:eu-west-1:111:backup-plan:bp-test",
                "BackupPlanId": "bp-test",
                "BackupPlanName": "TestPlan"}
        ],
        "getBackupSelectionsByRegion": () => [
            {"SelectionId": "sel-test",
                "SelectionName": "TestSelection",
                "BackupPlanId": "bp-test",
                "IamRoleArn": "role-test"}
        ],
        // Glacier
        "getGlacierVaultsByRegion": () => [
            {"VaultARN": "arn:aws:glacier:eu-west-1:111:vaults/test-vault",
                "VaultName": "test-vault"}
        ],
        // CodeArtifact
        "getCodeArtifactDomainsByRegion": () => [
            {"arn": "arn:aws:codeartifact:eu-west-1:111:domain/test-domain",
                "name": "test-domain",
                "encryptionKey": "arn:aws:kms:eu-west-1:111:key/test-key"}
        ],
        "getCodeArtifactRepositoriesByRegion": () => [
            {"arn": "arn:aws:codeartifact:eu-west-1:111:repository/test-domain/test-repo",
                "name": "test-repo",
                "domainName": "test-domain"}
        ],
        // MSK
        "getMskClustersByRegion": () => [
            {"ClusterArn": "arn:aws:kafka:eu-west-1:111:cluster/test-msk/123",
                "ClusterName": "test-msk"}
        ],
        // Redshift
        "getRedshiftClustersByRegion": () => [
            {"ClusterNamespaceArn": "arn:aws:redshift:eu-west-1:111:namespace:rs-test",
                "ClusterIdentifier": "rs-test",
                "VpcId": "vpc-test"}
        ],
        "getRedshiftSubnetGroupsByRegion": () => [
            {"ClusterSubnetGroupName": "rs-subgrp-test",
                "VpcId": "vpc-test"}
        ],
        // Neptune
        "getNeptuneClustersByRegion": () => [
            {"DBClusterArn": "arn:aws:rds:eu-west-1:111:cluster:neptune-test",
                "DBClusterIdentifier": "neptune-test"}
        ],
        "getNeptuneInstancesByRegion": () => [
            {"DBInstanceArn": "arn:aws:rds:eu-west-1:111:db:neptune-inst-test",
                "DBInstanceIdentifier": "neptune-inst-test",
                "DBClusterIdentifier": "neptune-test"}
        ],
        "getNeptuneSubnetGroupsByRegion": () => [
            {"DBSubnetGroupArn": "arn:aws:rds:eu-west-1:111:subgrp:neptune-subgrp",
                "DBSubnetGroupName": "neptune-subgrp",
                "VpcId": "vpc-test"}
        ],
        // DocumentDB
        "getDocDbClustersByRegion": () => [
            {"DBClusterArn": "arn:aws:rds:eu-west-1:111:cluster:docdb-test",
                "DBClusterIdentifier": "docdb-test"}
        ],
        "getDocDbInstancesByRegion": () => [
            {"DBInstanceArn": "arn:aws:rds:eu-west-1:111:db:docdb-inst-test",
                "DBInstanceIdentifier": "docdb-inst-test",
                "DBClusterIdentifier": "docdb-test"}
        ],
        "getDocDbSubnetGroupsByRegion": () => [
            {"DBSubnetGroupArn": "arn:aws:rds:eu-west-1:111:subgrp:docdb-subgrp",
                "DBSubnetGroupName": "docdb-subgrp",
                "VpcId": "vpc-test"}
        ],
        // FSx
        "getFsxFileSystemsByRegion": () => [
            {"ResourceARN": "arn:aws:fsx:eu-west-1:111:file-system/fs-fsx-test",
                "FileSystemId": "fs-fsx-test",
                "VpcId": "vpc-test",
                "Tags": [
                    {"Key": "Name",
                        "Value": "TestFSx"}
                ]}
        ],
        // Network Firewall
        "getNetworkFirewallsByRegion": () => [
            {"firewallArn": "arn:aws:network-firewall:eu-west-1:111:firewall/test-fw",
                "firewallName": "test-fw",
                "vpcId": "vpc-test"}
        ],
        "getFirewallPoliciesByRegion": () => [
            {"Arn": "arn:aws:network-firewall:eu-west-1:111:firewall-policy/test-fwp",
                "Name": "test-fwp"}
        ],
        "getRuleGroupsByRegion": () => [
            {"Arn": "arn:aws:network-firewall:eu-west-1:111:stateful-rulegroup/test-rg",
                "Name": "test-rg"}
        ],
        // CodePipeline
        "getCodePipelinesByRegion": () => [{"name": "test-pipeline"}],
        // CloudTrail
        "getCloudTrailsByRegion": () => [
            {"TrailARN": "arn:aws:cloudtrail:eu-west-1:111:trail/test-trail",
                "Name": "test-trail",
                "S3BucketName": "test-bucket"}
        ],
        // SSM
        "getSsmParametersByRegion": () => [
            {"ARN": "arn:aws:ssm:eu-west-1:111:parameter/test-param",
                "Name": "/test-param",
                "Type": "String"}
        ],
        "getSsmManagedInstancesByRegion": () => [
            {"InstanceId": "mi-test",
                "ComputerName": "test-managed"}
        ],
        "getSsmMaintenanceWindowsByRegion": () => [
            {"WindowId": "mw-test",
                "Name": "TestWindow"}
        ],
        "getSsmDocumentsByRegion": () => [{"Name": "test-doc"}],
        "getSsmAssociationsByRegion": () => [
            {"AssociationId": "assoc-test",
                "Name": "test-doc",
                "InstanceId": "mi-test"}
        ],
        "getSsmPatchBaselinesByRegion": () => [
            {"BaselineId": "pb-test",
                "BaselineName": "TestBaseline"}
        ],
        // CloudFormation
        "getCfnStacksByRegion": () => [
            {"StackId": "arn:aws:cloudformation:eu-west-1:111:stack/test-stack/123",
                "StackName": "test-stack"}
        ],
        "getCfnStackResourcesByRegion": emptyMap,
        "getCfnExportsByRegion": () => [
            {"Name": "test-export",
                "ExportingStackId": "arn:aws:cloudformation:eu-west-1:111:stack/test-stack/123"}
        ],
        "getCfnStackSetsByRegion": () => [
            {"StackSetId": "stackset-test",
                "StackSetName": "TestStackSet"}
        ],
        // Global Accelerator
        "getAccelerators": () => [
            {"AcceleratorArn": "arn:aws:globalaccelerator::111:accelerator/acc-test",
                "Name": "test-acc"}
        ],
        "getAcceleratorListeners": () => [
            {"ListenerArn": "arn:aws:globalaccelerator::111:accelerator/acc-test/listener/lst-test",
                "Protocol": "TCP",
                "PortRanges": [{"FromPort": 80}]}
        ],
        "getAcceleratorEndpointGroups": () => [
            {"EndpointGroupArn": "arn:aws:globalaccelerator::111:accelerator/acc-test/listener/lst-test/endpoint-group/eg-test",
                "EndpointGroupRegion": REGION}
        ],
        // Network Manager
        "getGlobalNetworks": () => [
            {"GlobalNetworkId": "gn-test",
                "State": "AVAILABLE"}
        ],
        "getNmSites": () => [
            {"SiteId": "site-test",
                "GlobalNetworkId": "gn-test",
                "State": "AVAILABLE"}
        ],
        "getNmDevices": () => [
            {"DeviceId": "device-test",
                "SiteId": "site-test",
                "Type": "router"}
        ],
        "getNmLinks": () => [
            {"LinkId": "link-test",
                "SiteId": "site-test",
                "Type": "broadband"}
        ],
        "getNmConnections": () => [
            {"ConnectionId": "conn-test",
                "DeviceId": "device-test",
                "ConnectedDeviceId": "device-test"}
        ],
        "getCoreNetworks": () => [
            {"CoreNetworkArn": "arn:aws:networkmanager::111:core-network/cn-test",
                "CoreNetworkId": "cn-test",
                "GlobalNetworkId": "gn-test",
                "State": "AVAILABLE"}
        ],
        "getNmAttachments": () => [
            {"AttachmentId": "att-test",
                "CoreNetworkArn": "arn:aws:networkmanager::111:core-network/cn-test",
                "AttachmentType": "VPC",
                "State": "AVAILABLE"}
        ],
        "getTransitGatewayRegistrations": emptyArray,
        // MQ
        "getMqBrokersByRegion": () => [
            {"BrokerArn": "arn:aws:mq:eu-west-1:111:broker:test-broker:123",
                "BrokerName": "test-broker",
                "EngineType": "RABBITMQ",
                "DeploymentMode": "SINGLE_INSTANCE",
                "BrokerState": "RUNNING"}
        ],
        "getMqConfigurationsByRegion": () => [
            {"Arn": "arn:aws:mq:eu-west-1:111:configuration:test-config:123",
                "Name": "test-config",
                "EngineType": "RABBITMQ"}
        ],
        // MWAA
        "getMwaaEnvironmentsByRegion": () => [
            {"Arn": "arn:aws:airflow:eu-west-1:111:environment/test-mwaa",
                "Name": "test-mwaa",
                "Status": "AVAILABLE"}
        ],
        // AppRunner
        "getVpcConnectorsByRegion": () => [
            {"VpcConnectorArn": "arn:aws:apprunner:eu-west-1:111:vpcconnector/vc-test/1/123",
                "VpcConnectorName": "vc-test"}
        ],
        "getAppRunnerServicesByRegion": () => [
            {"ServiceArn": "arn:aws:apprunner:eu-west-1:111:service/ar-svc-test/123",
                "ServiceName": "ar-svc-test",
                "Status": "RUNNING"}
        ],
        // Transfer Family
        "getTransferServersByRegion": () => [
            {"Arn": "arn:aws:transfer:eu-west-1:111:server/s-test",
                "ServerId": "s-test",
                "EndpointType": "PUBLIC",
                "State": "ONLINE"}
        ],
        // VPC Lattice
        "getLatticeServiceNetworksByRegion": () => [
            {"arn": "arn:aws:vpc-lattice:eu-west-1:111:servicenetwork/sn-test",
                "name": "sn-test"}
        ],
        "getLatticeServicesByRegion": () => [
            {"arn": "arn:aws:vpc-lattice:eu-west-1:111:service/ls-test",
                "name": "ls-test",
                "status": "ACTIVE"}
        ],
        "getLatticeTargetGroupsByRegion": () => [
            {"arn": "arn:aws:vpc-lattice:eu-west-1:111:targetgroup/ltg-test",
                "name": "ltg-test",
                "type": "INSTANCE",
                "protocol": "HTTP"}
        ],
        "getLatticeVpcAssociationsByRegion": emptyArray,
        "getLatticeServiceAssociationsByRegion": emptyArray,
        // IoT
        "getIotThingsByRegion": () => [
            {"thingArn": "arn:aws:iot:eu-west-1:111:thing/test-thing",
                "thingName": "test-thing",
                "thingTypeName": "test-type"}
        ],
        "getIotThingTypesByRegion": () => [
            {"thingTypeArn": "arn:aws:iot:eu-west-1:111:thingtype/test-type",
                "thingTypeName": "test-type"}
        ],
        "getIotThingGroupsByRegion": () => [
            {"groupArn": "arn:aws:iot:eu-west-1:111:thinggroup/test-group",
                "groupName": "test-group"}
        ],
        "getIotCertificatesByRegion": () => [
            {"certificateArn": "arn:aws:iot:eu-west-1:111:cert/test-cert",
                "certificateId": "test-cert",
                "status": "ACTIVE"}
        ],
        "getIotTopicRulesByRegion": () => [
            {"ruleArn": "arn:aws:iot:eu-west-1:111:rule/test-rule",
                "ruleName": "test-rule"}
        ],
        "getIotTopicRuleDestinationsByRegion": () => [
            {"arn": "arn:aws:iot:eu-west-1:111:ruledestination/test-dest",
                "status": "ENABLED"}
        ],
        // Glue
        "getGlueConnectionsByRegion": () => [
            {"Name": "glue-conn-test",
                "ConnectionType": "JDBC"}
        ],
        "getGlueCrawlersByRegion": () => [
            {"Name": "glue-crawler-test",
                "State": "READY"}
        ],
        "getGlueDatabasesByRegion": () => [{"Name": "glue-db-test"}],
        "getGlueJobsByRegion": () => [
            {"Name": "glue-job-test",
                "GlueVersion": "4.0",
                "WorkerType": "G.1X"}
        ],
        "getGlueTriggersByRegion": () => [
            {"Name": "glue-trigger-test",
                "Type": "ON_DEMAND",
                "State": "CREATED"}
        ],
        "getGlueTablesByRegion": () => [
            {"Name": "glue-table-test",
                "DatabaseName": "glue-db-test"}
        ],
        "getGlueRegistriesByRegion": () => [
            {"RegistryArn": "arn:aws:glue:eu-west-1:111:registry/test-reg",
                "RegistryName": "test-reg"}
        ],
        "getGlueSchemasByRegion": () => [
            {"SchemaArn": "arn:aws:glue:eu-west-1:111:schema/test-schema",
                "SchemaName": "test-schema",
                "RegistryName": "test-reg"}
        ],
        "getGlueWorkflowsByRegion": () => [{"Name": "glue-wf-test"}],
        // DMS
        "getDmsReplicationInstancesByRegion": () => [
            {"ReplicationInstanceArn": "arn:aws:dms:eu-west-1:111:rep:dms-ri-test",
                "ReplicationInstanceIdentifier": "dms-ri-test",
                "ReplicationInstanceClass": "dms.t3.medium",
                "ReplicationInstanceStatus": "available"}
        ],
        "getDmsSubnetGroupsByRegion": () => [{"ReplicationSubnetGroupIdentifier": "dms-sg-test"}],
        "getDmsEndpointsByRegion": () => [
            {"EndpointArn": "arn:aws:dms:eu-west-1:111:endpoint:dms-ep-test",
                "EndpointIdentifier": "dms-ep-test",
                "EndpointType": "SOURCE",
                "EngineName": "postgres"}
        ],
        "getDmsReplicationTasksByRegion": () => [
            {"ReplicationTaskArn": "arn:aws:dms:eu-west-1:111:task:dms-task-test",
                "ReplicationTaskIdentifier": "dms-task-test",
                "Status": "running",
                "MigrationType": "full-load",
                "ReplicationInstanceArn": "arn:aws:dms:eu-west-1:111:rep:dms-ri-test",
                "SourceEndpointArn": "arn:aws:dms:eu-west-1:111:endpoint:dms-ep-test"}
        ],
        "getDmsConnectionsByRegion": emptyArray,
        // Route53 Resolver
        "getResolverEndpointsByRegion": () => [
            {"Id": "rslvr-ep-test",
                "Name": "test-resolver-ep",
                "Direction": "INBOUND",
                "Status": "OPERATIONAL",
                "HostVPCId": "vpc-test"}
        ],
        "getResolverRulesByRegion": () => [
            {"Id": "rslvr-rule-test",
                "Name": "test-resolver-rule",
                "RuleType": "FORWARD",
                "Status": "COMPLETE"}
        ],
        "getResolverRuleAssociationsByRegion": () => [
            {"Id": "rslvr-assoc-test",
                "Name": "test-assoc",
                "Status": "COMPLETE",
                "ResolverRuleId": "rslvr-rule-test",
                "VPCId": "vpc-test"}
        ],
        "getFirewallRuleGroupsByRegion": () => [
            {"Arn": "arn:aws:route53resolver:eu-west-1:111:firewall-rule-group/frg-test",
                "Name": "test-frg"}
        ],
        "getFirewallRuleGroupAssociationsByRegion": () => [
            {"Id": "frga-test",
                "Name": "test-frga",
                "Status": "COMPLETE",
                "VpcId": "vpc-test",
                "FirewallRuleGroupId": "arn:aws:route53resolver:eu-west-1:111:firewall-rule-group/frg-test"}
        ],
        // Batch
        "getBatchComputeEnvironmentsByRegion": () => [
            {"computeEnvironmentArn": "arn:aws:batch:eu-west-1:111:compute-environment/batch-ce-test",
                "computeEnvironmentName": "batch-ce-test"}
        ],
        "getBatchJobQueuesByRegion": () => [
            {"jobQueueArn": "arn:aws:batch:eu-west-1:111:job-queue/batch-jq-test",
                "jobQueueName": "batch-jq-test",
                "computeEnvironmentOrder": [{"computeEnvironment": "arn:aws:batch:eu-west-1:111:compute-environment/batch-ce-test"}]}
        ],
        "getBatchSchedulingPoliciesByRegion": () => [{"arn": "arn:aws:batch:eu-west-1:111:scheduling-policy/batch-sp-test"}],
        // MemoryDB
        "getMemoryDbSubnetGroupsByRegion": () => [
            {"ARN": "arn:aws:memorydb:eu-west-1:111:subnetgroup/mdb-sg-test",
                "Name": "mdb-sg-test",
                "VpcId": "vpc-test"}
        ],
        "getMemoryDbAclsByRegion": () => [
            {"ARN": "arn:aws:memorydb:eu-west-1:111:acl/mdb-acl-test",
                "Name": "mdb-acl-test"}
        ],
        "getMemoryDbUsersByRegion": () => [
            {"ARN": "arn:aws:memorydb:eu-west-1:111:user/mdb-user-test",
                "Name": "mdb-user-test",
                "ACLNames": ["mdb-acl-test"]}
        ],
        "getMemoryDbClustersByRegion": () => [
            {"ARN": "arn:aws:memorydb:eu-west-1:111:cluster/mdb-cluster-test",
                "Name": "mdb-cluster-test",
                "SubnetGroupName": "mdb-sg-test",
                "ACLName": "mdb-acl-test"}
        ],
        // EMR
        "getEmrClustersByRegion": () => [
            {"ClusterArn": "arn:aws:elasticmapreduce:eu-west-1:111:cluster/j-test",
                "Name": "emr-test"}
        ],
        "getEmrInstanceFleetsByRegion": emptyArray,
        "getEmrInstanceGroupsByRegion": emptyArray,
        "getEmrSecurityConfigsByRegion": () => [{"Name": "emr-sec-config-test"}],
        // EMR Serverless
        "getEmrServerlessAppsByRegion": () => [
            {"arn": "arn:aws:emr-serverless:eu-west-1:111:/applications/app-test",
                "name": "emr-sl-test",
                "type": "SPARK",
                "state": "STARTED"}
        ],
        // Beanstalk
        "getBeanstalkAppsByRegion": () => [
            {"ApplicationArn": "arn:aws:elasticbeanstalk:eu-west-1:111:application/eb-app-test",
                "ApplicationName": "eb-app-test"}
        ],
        "getBeanstalkEnvsByRegion": () => [
            {"EnvironmentArn": "arn:aws:elasticbeanstalk:eu-west-1:111:environment/eb-app-test/eb-env-test",
                "EnvironmentName": "eb-env-test",
                "ApplicationName": "eb-app-test",
                "Status": "Ready",
                "Health": "Green"}
        ],
        // Athena
        "getAthenaWorkGroupsByRegion": () => [{"Name": "athena-wg-test"}],
        "getAthenaDataCatalogsByRegion": () => [
            {"CatalogName": "athena-catalog-test",
                "Type": "GLUE"}
        ],
        // DataSync
        "getDataSyncAgentsByRegion": () => [
            {"AgentArn": "arn:aws:datasync:eu-west-1:111:agent/agent-test",
                "Name": "ds-agent-test",
                "Status": "ONLINE"}
        ],
        "getDataSyncLocationsByRegion": () => [
            {"LocationArn": "arn:aws:datasync:eu-west-1:111:location/loc-test",
                "LocationUri": "s3://test-bucket/path"}
        ],
        "getDataSyncTasksByRegion": () => [
            {"TaskArn": "arn:aws:datasync:eu-west-1:111:task/task-test",
                "Name": "ds-task-test",
                "Status": "AVAILABLE",
                "SourceLocationArn": "arn:aws:datasync:eu-west-1:111:location/loc-test"}
        ],
        // AppSync
        "getGraphqlApisByRegion": () => [
            {"arn": "arn:aws:appsync:eu-west-1:111:apis/api-test",
                "name": "appsync-test",
                "authenticationType": "API_KEY"}
        ],
        "getAppSyncDataSourcesByRegion": () => [
            {"dataSourceArn": "arn:aws:appsync:eu-west-1:111:apis/api-test/datasources/ds-test",
                "name": "ds-test",
                "type": "AMAZON_DYNAMODB"}
        ],
        // Redshift Serverless
        "getRsNamespacesByRegion": () => [
            {"namespaceArn": "arn:aws:redshift-serverless:eu-west-1:111:namespace/rs-ns-test",
                "namespaceName": "rs-ns-test"}
        ],
        "getRsWorkgroupsByRegion": () => [
            {"workgroupArn": "arn:aws:redshift-serverless:eu-west-1:111:workgroup/rs-wg-test",
                "workgroupName": "rs-wg-test",
                "namespaceName": "rs-ns-test"}
        ],
        // OpenSearch Serverless
        "getOssCollectionsByRegion": () => [
            {"arn": "arn:aws:aoss:eu-west-1:111:collection/oss-col-test",
                "name": "oss-col-test",
                "status": "ACTIVE"}
        ],
        "getOssVpcEndpointsByRegion": () => [
            {"id": "oss-vpce-test",
                "name": "oss-vpce-test",
                "status": "ACTIVE"}
        ],
        // Directory Service
        "getDirectoriesByRegion": () => [
            {"DirectoryId": "d-test",
                "Name": "test-dir",
                "Type": "MicrosoftAD"}
        ],
        // WorkSpaces
        "getWorkspacesByRegion": () => [
            {"WorkspaceId": "ws-test",
                "State": "AVAILABLE",
                "DirectoryId": "d-test"}
        ],
        "getWorkspaceDirectoriesByRegion": emptyArray,
        // CloudHSM
        "getHsmClustersByRegion": () => [
            {"ClusterId": "cluster-hsm-test",
                "State": "ACTIVE",
                "VpcId": "vpc-test"}
        ],
        // App Mesh
        "getMeshesByRegion": () => [
            {"arn": "arn:aws:appmesh:eu-west-1:111:mesh/test-mesh",
                "meshName": "test-mesh"}
        ],
        "getVirtualNodesByRegion": () => [
            {"arn": "arn:aws:appmesh:eu-west-1:111:mesh/test-mesh/virtualNode/vn-test",
                "virtualNodeName": "vn-test",
                "meshName": "test-mesh"}
        ],
        "getVirtualServicesByRegion": () => [
            {"arn": "arn:aws:appmesh:eu-west-1:111:mesh/test-mesh/virtualService/vs-test",
                "virtualServiceName": "vs-test",
                "meshName": "test-mesh"}
        ],
        // S3 Control
        "getS3AccessPointsByRegion": () => [
            {"AccessPointArn": "arn:aws:s3:eu-west-1:111:accesspoint/ap-test",
                "Name": "ap-test",
                "Bucket": "test-bucket"}
        ],
        // Classic ELB
        "getClassicLoadBalancersByRegion": () => [
            {"LoadBalancerName": "classic-elb-test",
                "VPCId": "vpc-test"}
        ],
        // EventBridge Pipes
        "getPipesByRegion": () => [
            {"Arn": "arn:aws:pipes:eu-west-1:111:pipe/pipe-test",
                "Name": "pipe-test",
                "CurrentState": "RUNNING",
                "Source": "arn:aws:sqs:eu-west-1:111:test-queue"}
        ],
        // Storage Gateway
        "getGatewaysByRegion": () => [
            {"GatewayARN": "arn:aws:storagegateway:eu-west-1:111:gateway/sgw-test",
                "GatewayName": "sgw-test",
                "GatewayId": "sgw-test",
                "GatewayType": "FILE_S3",
                "GatewayOperationalState": "ACTIVE"}
        ],
        "getFileSharesByRegion": () => [
            {"FileShareARN": "arn:aws:storagegateway:eu-west-1:111:share/share-test",
                "FileShareId": "share-test",
                "FileShareType": "NFS",
                "GatewayARN": "arn:aws:storagegateway:eu-west-1:111:gateway/sgw-test"}
        ],
        "getSgwVolumesByRegion": () => [
            {"VolumeARN": "arn:aws:storagegateway:eu-west-1:111:gateway/sgw-test/volume/vol-sgw-test",
                "VolumeId": "vol-sgw-test",
                "VolumeType": "CACHED iSCSI",
                "GatewayARN": "arn:aws:storagegateway:eu-west-1:111:gateway/sgw-test"}
        ],
        // Outposts
        "getOutpostSitesByRegion": () => [
            {"SiteArn": "arn:aws:outposts:eu-west-1:111:site/site-test",
                "Name": "outpost-site-test",
                "OperatingAddressCountryCode": "IE"}
        ],
        "getOutpostsByRegion": () => [
            {"OutpostArn": "arn:aws:outposts:eu-west-1:111:outpost/op-test",
                "Name": "outpost-test",
                "LifeCycleStatus": "ACTIVE",
                "SiteArn": "arn:aws:outposts:eu-west-1:111:site/site-test"}
        ],
        // ImageBuilder
        "getInfraConfigsByRegion": () => [
            {"arn": "arn:aws:imagebuilder:eu-west-1:111:infrastructure-configuration/ic-test",
                "name": "ic-test",
                "subnetId": "subnet-test"}
        ],
        // CodeDeploy
        "getDeploymentGroupsByRegion": () => [
            {"deploymentGroupName": "dg-test",
                "applicationName": "app-test",
                "computePlatform": "Server"}
        ],
        // MediaConnect
        "getMediaConnectFlowsByRegion": () => [
            {"FlowArn": "arn:aws:mediaconnect:eu-west-1:111:flow:flow-test:test-flow",
                "Name": "test-flow",
                "Status": "ACTIVE"}
        ],
        // SageMaker
        "getNotebookInstancesByRegion": () => [
            {"NotebookInstanceArn": "arn:aws:sagemaker:eu-west-1:111:notebook-instance/nb-test",
                "NotebookInstanceName": "nb-test",
                "NotebookInstanceStatus": "InService",
                "SubnetId": "subnet-test"}
        ],
        // EC2 Regional
        "getVpcsByRegion": () => [
            {"VpcId": "vpc-test",
                "CidrBlock": "10.0.0.0/16",
                "Tags": [
                    {"Key": "Name",
                        "Value": "test-vpc"}
                ]}
        ],
        "getSubnetsByRegion": () => [
            {"SubnetId": "subnet-test",
                "VpcId": "vpc-test",
                "CidrBlock": "10.0.1.0/24",
                "AvailabilityZone": "eu-west-1a",
                "Tags": [
                    {"Key": "Name",
                        "Value": "test-subnet"}
                ]}
        ],
        "getSecurityGroupsByRegion": () => [
            {"GroupId": "sg-test",
                "GroupName": "test-sg",
                "VpcId": "vpc-test"}
        ],
        "getInternetGatewaysByRegion": () => [
            {"InternetGatewayId": "igw-test",
                "Attachments": [{"VpcId": "vpc-test"}]}
        ],
        "getNatGatewaysByRegion": () => [
            {"NatGatewayId": "nat-test",
                "VpcId": "vpc-test",
                "SubnetId": "subnet-test"}
        ],
        "getEgressOnlyInternetGatewaysByRegion": () => [
            {"EgressOnlyInternetGatewayId": "eigw-test",
                "Attachments": [{"VpcId": "vpc-test"}]}
        ],
        "getNetworkInterfacesByRegion": () => [
            {"NetworkInterfaceId": "eni-test",
                "SubnetId": "subnet-test",
                "AvailabilityZone": "eu-west-1a",
                "Status": "in-use",
                "Groups": [{"GroupId": "sg-test"}]}
        ],
        "getRouteTablesByRegion": () => [
            {"RouteTableId": "rtb-test",
                "VpcId": "vpc-test"}
        ],
        "getInstancesByRegion": () => [
            {"InstanceId": "i-test",
                "SubnetId": "subnet-test",
                "InstanceType": "t3.micro",
                "State": {"Name": "running"},
                "SecurityGroups": [{"GroupId": "sg-test"}],
                "Tags": [
                    {"Key": "Name",
                        "Value": "test-instance"}
                ]}
        ],
        "getVolumesByRegion": () => [
            {"VolumeId": "vol-test",
                "Size": 20,
                "VolumeType": "gp3",
                "State": "in-use",
                "Attachments": [{"InstanceId": "i-test"}]}
        ],
        "getVpcEndpointsByRegion": () => [
            {"VpcEndpointId": "vpce-test",
                "VpcId": "vpc-test",
                "ServiceName": "com.amazonaws.eu-west-1.s3",
                "VpcEndpointType": "Gateway"}
        ],
        "getAddressesByRegion": () => [
            {"AllocationId": "eipalloc-test",
                "PublicIp": "1.2.3.4",
                "InstanceId": "i-test"}
        ],
        "getImagesByRegion": () => [
            {"ImageId": "ami-test",
                "Name": "test-ami",
                "Architecture": "x86_64",
                "State": "available"}
        ],
        "getSnapshotsByRegion": () => [
            {"SnapshotId": "snap-test",
                "VolumeId": "vol-test",
                "VolumeSize": 20,
                "State": "completed"}
        ],
        "getKeyPairsByRegion": () => [
            {"KeyPairId": "kp-test",
                "KeyName": "test-key",
                "KeyType": "rsa"}
        ],
        "getNetworkAclsByRegion": () => [
            {"NetworkAclId": "acl-test",
                "VpcId": "vpc-test",
                "IsDefault": true}
        ],
        "getFlowLogsByRegion": () => [
            {"FlowLogId": "fl-test",
                "FlowLogStatus": "ACTIVE",
                "TrafficType": "ALL",
                "ResourceId": "vpc-test"}
        ],
        "getDhcpOptionsByRegion": () => [{"DhcpOptionsId": "dopt-test"}],
        "getManagedPrefixListsByRegion": () => [
            {"PrefixListId": "pl-test",
                "PrefixListName": "test-pl",
                "State": "create-complete"}
        ],
        "getVpcPeeringConnectionsByRegion": () => [
            {"VpcPeeringConnectionId": "pcx-test",
                "AccepterVpcInfo": {"VpcId": "vpc-test"},
                "RequesterVpcInfo": {"VpcId": "vpc-test"},
                "Status": {"Code": "active"}}
        ],
        "getLaunchTemplatesByRegion": () => [
            {"LaunchTemplateId": "lt-test",
                "LaunchTemplateName": "test-lt"}
        ],
        "getFleetsByRegion": () => [
            {"FleetId": "fleet-test",
                "FleetState": "active",
                "Type": "maintain",
                "TargetCapacitySpecification": {"TotalTargetCapacity": 2}}
        ],
        // Transit Gateways
        "getTransitGatewaysByRegion": () => [
            {"TransitGatewayId": "tgw-test",
                "State": "available"}
        ],
        "getTransitGatewayAttachmentsByRegion": () => [
            {"TransitGatewayAttachmentId": "tgw-att-test",
                "TransitGatewayId": "tgw-test",
                "ResourceType": "vpc",
                "ResourceId": "vpc-test",
                "State": "available"}
        ],
        "getTransitGatewayRouteTablesByRegion": () => [
            {"TransitGatewayRouteTableId": "tgw-rtb-test",
                "TransitGatewayId": "tgw-test",
                "State": "available"}
        ],
        "getTransitGatewayVpcAttachmentsByRegion": () => [
            {"TransitGatewayAttachmentId": "tgw-vpc-att-test",
                "TransitGatewayId": "tgw-test",
                "VpcId": "vpc-test",
                "State": "available",
                "SubnetIds": ["subnet-test"]}
        ],
        "getTransitGatewayPeeringAttachmentsByRegion": () => [
            {"TransitGatewayAttachmentId": "tgw-peer-test",
                "State": "available",
                "RequesterTgwInfo": {"TransitGatewayId": "tgw-test"}}
        ],
        "getTransitGatewayConnectsByRegion": () => [
            {"TransitGatewayAttachmentId": "tgw-connect-test",
                "TransitGatewayId": "tgw-test",
                "State": "available",
                "TransportTransitGatewayAttachmentId": "tgw-att-test"}
        ],
        "getTransitGatewayConnectPeersByRegion": () => [
            {"TransitGatewayConnectPeerId": "tgw-cp-test",
                "TransitGatewayAttachmentId": "tgw-connect-test",
                "State": "available"}
        ],
        // Verified Access
        "getVerifiedAccessInstancesByRegion": () => [{"VerifiedAccessInstanceId": "vai-test"}],
        "getVerifiedAccessTrustProvidersByRegion": () => [
            {"VerifiedAccessTrustProviderId": "vatp-test",
                "TrustProviderType": "user"}
        ],
        "getVerifiedAccessGroupsByRegion": () => [
            {"VerifiedAccessGroupArn": "arn:aws:ec2:eu-west-1:111:verified-access-group/vag-test",
                "VerifiedAccessGroupId": "vag-test",
                "VerifiedAccessInstanceId": "vai-test"}
        ],
        "getVerifiedAccessEndpointsByRegion": () => [
            {"VerifiedAccessEndpointId": "vae-test",
                "EndpointType": "load-balancer",
                "VerifiedAccessGroupId": "arn:aws:ec2:eu-west-1:111:verified-access-group/vag-test"}
        ],
        // VPC Endpoint Service
        "getVpcEndpointServiceConfigsByRegion": () => [
            {"ServiceId": "vpce-svc-test",
                "ServiceName": "com.amazonaws.vpce.eu-west-1.vpce-svc-test",
                "ServiceState": "Available"}
        ],
        // Security Group Rules
        "getSecurityGroupRulesByRegion": emptyArray,
        // Local Gateways
        "getLocalGatewaysByRegion": () => [
            {"LocalGatewayId": "lgw-test",
                "State": "available"}
        ],
        "getLocalGatewayRouteTablesByRegion": () => [
            {"LocalGatewayRouteTableId": "lgw-rtb-test",
                "LocalGatewayId": "lgw-test",
                "State": "available"}
        ],
        "getLocalGatewayRtVpcAssociationsByRegion": emptyArray,
        "getLocalGatewayVirtualInterfacesByRegion": () => [
            {"LocalGatewayVirtualInterfaceId": "lgw-vif-test",
                "LocalGatewayId": "lgw-test"}
        ],
        "getLocalGatewayVifGroupsByRegion": emptyArray,
        // Stale Security Groups
        "getStaleSecurityGroupsByRegion": emptyArray,
        // Instance Connect Endpoints
        "getInstanceConnectEndpointsByRegion": () => [
            {"InstanceConnectEndpointId": "ice-test",
                "SubnetId": "subnet-test",
                "State": "create-complete",
                "SecurityGroupIds": ["sg-test"]}
        ],
        // Recycle Bin
        "getImagesInRecycleBinByRegion": () => [{"ImageId": "ami-recycled-test"}],
        "getSnapshotsInRecycleBinByRegion": () => [{"SnapshotId": "snap-recycled-test"}],
        // Lambda
        "getLambdasByRegion": () => [
            {"FunctionArn": "arn:aws:lambda:eu-west-1:111:function:test-fn",
                "FunctionName": "test-fn",
                "VpcConfig": {"VpcId": "vpc-test",
                    "SubnetIds": ["subnet-test"],
                    "SecurityGroupIds": ["sg-test"]}}
        ],
        "getEventSourceMappingsByRegion": () => [
            {"UUID": "esm-test",
                "FunctionArn": "arn:aws:lambda:eu-west-1:111:function:test-fn",
                "EventSourceArn": "arn:aws:sqs:eu-west-1:111:test-queue"}
        ],
        "getLayersByRegion": () => [
            {"LayerArn": "arn:aws:lambda:eu-west-1:111:layer:test-layer",
                "LayerName": "test-layer"}
        ],
        "getAliasesByRegion": () => [
            {"AliasArn": "arn:aws:lambda:eu-west-1:111:function:test-fn:prod",
                "Name": "prod",
                "FunctionVersion": "1"}
        ],
        "getFunctionUrlConfigsByRegion": () => [
            {"FunctionUrl": "https://abc123.lambda-url.eu-west-1.on.aws/",
                "FunctionArn": "arn:aws:lambda:eu-west-1:111:function:test-fn",
                "AuthType": "NONE"}
        ],
        "getProvisionedConcurrencyByRegion": () => [
            {"FunctionArn": "arn:aws:lambda:eu-west-1:111:function:test-fn",
                "RequestedProvisionedConcurrentExecutions": 5,
                "Status": "READY"}
        ],
        // CloudWatch
        "getLogGroupsByRegion": () => [
            {"logGroupName": "/aws/lambda/test-fn",
                "arn": "arn:aws:logs:eu-west-1:111:log-group:/aws/lambda/test-fn:*",
                "retentionInDays": 14,
                "storedBytes": 1024}
        ],
        "getMetricAlarmsByRegion": () => [
            {"AlarmName": "test-alarm",
                "AlarmArn": "arn:aws:cloudwatch:eu-west-1:111:alarm:test-alarm",
                "StateValue": "OK",
                "Namespace": "AWS/Lambda",
                "MetricName": "Errors",
                "ComparisonOperator": "GreaterThanThreshold",
                "Threshold": 0}
        ],
        "getCompositeAlarmsByRegion": () => [
            {"AlarmName": "composite-test",
                "AlarmArn": "arn:aws:cloudwatch:eu-west-1:111:alarm:composite-test",
                "StateValue": "OK",
                "AlarmRule": "ALARM(test-alarm)"}
        ],
        "getSubscriptionFiltersByRegion": emptyArray,
        "getMetricStreamsByRegion": () => [
            {"Arn": "arn:aws:cloudwatch:eu-west-1:111:metric-stream/ms-test",
                "Name": "ms-test",
                "State": "running"}
        ],
        "getMetricFiltersByRegion": emptyArray,
        "getDeliveriesByRegion": emptyArray,
        "getDeliveryDestinationsByRegion": emptyArray,
        "getDeliverySourcesByRegion": emptyArray,
        // Traffic Mirroring
        "getTrafficMirrorFiltersByRegion": () => [{"TrafficMirrorFilterId": "tmf-test"}],
        "getTrafficMirrorTargetsByRegion": () => [
            {"TrafficMirrorTargetId": "tmt-test",
                "Type": "network-interface",
                "NetworkInterfaceId": "eni-test"}
        ],
        "getTrafficMirrorSessionsByRegion": () => [
            {"TrafficMirrorSessionId": "tms-test",
                "NetworkInterfaceId": "eni-test",
                "TrafficMirrorTargetId": "tmt-test",
                "TrafficMirrorFilterId": "tmf-test"}
        ],
        // Client VPN
        "getClientVpnEndpointsByRegion": () => [
            {"ClientVpnEndpointId": "cvpn-test",
                "VpcId": "vpc-test",
                "SecurityGroupIds": ["sg-test"]}
        ]
    };

    return new Proxy(
        {} as Inventory,
        {
            get (_target, prop: string) {

                const fn = data[prop];
                if (typeof fn === "function") {

                    return fn;

                }
                return undefined;

            }
        }
    );

}

describe(
    "GraphBuilder — full resource coverage",
    () => {

        const inv = fullInventory();
        const graph = new GraphBuilder().build(inv);

        it(
            "builds the graph without throwing",
            () => {

                expect(graph).toBeDefined();

            }
        );

        it(
            "creates at least 150 nodes (one per resource type instance)",
            () => {

                // We have ~200+ resource instances in the mock
                expect(graph.order).toBeGreaterThanOrEqual(150);

            }
        );

        it(
            "creates edges (edge count > 0)",
            () => {

                expect(graph.size).toBeGreaterThan(0);

            }
        );

        it(
            "has a region node",
            () => {

                expect(graph.hasNode(REGION)).toBe(true);
                expect(graph.getNodeAttribute(
                    REGION,
                    "resourcetype"
                )).toBe("region");

            }
        );

        // Organizations
        it(
            "has org root, OU, account, policy nodes",
            () => {

                expect(graph.hasNode("r-test")).toBe(true);
                expect(graph.getNodeAttribute(
                    "r-test",
                    "resourcetype"
                )).toBe("orgroot");
                expect(graph.hasNode("ou-test")).toBe(true);
                expect(graph.getNodeAttribute(
                    "ou-test",
                    "resourcetype"
                )).toBe("orgou");
                expect(graph.hasNode("111111111111")).toBe(true);
                expect(graph.hasNode("arn:aws:organizations::111111111111:policy/p-test")).toBe(true);

            }
        );

        it(
            "has org OU → root edge",
            () => {

                expect(graph.hasDirectedEdge(
                    "ou-test",
                    "r-test"
                )).toBe(true);

            }
        );

        // IAM
        it(
            "has IAM user, role, group, policy nodes",
            () => {

                expect(graph.getNodeAttribute(
                    "usr-test",
                    "resourcetype"
                )).toBe("user");
                expect(graph.getNodeAttribute(
                    "role-test",
                    "resourcetype"
                )).toBe("role");
                expect(graph.getNodeAttribute(
                    "grp-test",
                    "resourcetype"
                )).toBe("group");
                expect(graph.getNodeAttribute(
                    "pol-test",
                    "resourcetype"
                )).toBe("policy");
                expect(graph.getNodeAttribute(
                    "ip-test",
                    "resourcetype"
                )).toBe("instanceprofile");

            }
        );

        // EC2
        it(
            "has VPC → region edge",
            () => {

                expect(graph.hasNode("vpc-test")).toBe(true);
                expect(graph.getNodeAttribute(
                    "vpc-test",
                    "resourcetype"
                )).toBe("vpc");
                expect(graph.hasDirectedEdge(
                    "vpc-test",
                    REGION
                )).toBe(true);

            }
        );

        it(
            "has subnet → VPC edge",
            () => {

                expect(graph.hasNode("subnet-test")).toBe(true);
                expect(graph.hasDirectedEdge(
                    "subnet-test",
                    "vpc-test"
                )).toBe(true);

            }
        );

        it(
            "has instance → subnet edge",
            () => {

                expect(graph.hasNode("i-test")).toBe(true);
                expect(graph.getNodeAttribute(
                    "i-test",
                    "resourcetype"
                )).toBe("instance");
                expect(graph.hasDirectedEdge(
                    "i-test",
                    "subnet-test"
                )).toBe(true);

            }
        );

        it(
            "has volume → instance edge",
            () => {

                expect(graph.hasNode("vol-test")).toBe(true);
                expect(graph.hasDirectedEdge(
                    "vol-test",
                    "i-test"
                )).toBe(true);

            }
        );

        it(
            "has security group → VPC edge",
            () => {

                expect(graph.hasNode("sg-test")).toBe(true);
                expect(graph.hasDirectedEdge(
                    "sg-test",
                    "vpc-test"
                )).toBe(true);

            }
        );

        it(
            "has ENI → subnet edge",
            () => {

                expect(graph.hasNode("eni-test")).toBe(true);
                expect(graph.hasDirectedEdge(
                    "eni-test",
                    "subnet-test"
                )).toBe(true);

            }
        );

        it(
            "has IGW, NAT, EIGW nodes",
            () => {

                expect(graph.hasNode("igw-test")).toBe(true);
                expect(graph.hasNode("nat-test")).toBe(true);
                expect(graph.hasNode("eigw-test")).toBe(true);

            }
        );

        it(
            "has transit gateway nodes and edges",
            () => {

                expect(graph.hasNode("tgw-test")).toBe(true);
                expect(graph.hasDirectedEdge(
                    "tgw-test",
                    REGION
                )).toBe(true);
                expect(graph.hasNode("tgw-att-test")).toBe(true);
                expect(graph.hasDirectedEdge(
                    "tgw-att-test",
                    "tgw-test"
                )).toBe(true);

            }
        );

        // Lambda
        it(
            "has Lambda function → region edge",
            () => {

                expect(graph.hasNode("arn:aws:lambda:eu-west-1:111:function:test-fn")).toBe(true);
                expect(graph.getNodeAttribute(
                    "arn:aws:lambda:eu-west-1:111:function:test-fn",
                    "resourcetype"
                )).toBe("lambdafunction");
                expect(graph.hasDirectedEdge(
                    "arn:aws:lambda:eu-west-1:111:function:test-fn",
                    REGION
                )).toBe(true);

            }
        );

        it(
            "has Lambda layer, alias, function URL, ESM nodes",
            () => {

                expect(graph.hasNode("arn:aws:lambda:eu-west-1:111:layer:test-layer")).toBe(true);
                expect(graph.hasNode("arn:aws:lambda:eu-west-1:111:function:test-fn:prod")).toBe(true);
                expect(graph.hasNode("https://abc123.lambda-url.eu-west-1.on.aws/")).toBe(true);
                expect(graph.hasNode("esm-test")).toBe(true);

            }
        );

        // ECS
        it(
            "has ECS cluster, service, task definition nodes",
            () => {

                expect(graph.getNodeAttribute(
                    "arn:aws:ecs:eu-west-1:111:cluster/test-cluster",
                    "resourcetype"
                )).toBe("ecscluster");
                expect(graph.getNodeAttribute(
                    "arn:aws:ecs:eu-west-1:111:service/test-svc",
                    "resourcetype"
                )).toBe("ecsservice");
                expect(graph.hasNode("arn:aws:ecs:eu-west-1:111:task-definition/test-td:1")).toBe(true);

            }
        );

        it(
            "has ECS service → cluster edge",
            () => {

                expect(graph.hasDirectedEdge(
                    "arn:aws:ecs:eu-west-1:111:service/test-svc",
                    "arn:aws:ecs:eu-west-1:111:cluster/test-cluster"
                )).toBe(true);

            }
        );

        // ELBv2
        it(
            "has load balancer node and target group → LB edge",
            () => {

                const lbArn = "arn:aws:elasticloadbalancing:eu-west-1:111:loadbalancer/app/test-lb/123";
                const tgArn = "arn:aws:elasticloadbalancing:eu-west-1:111:targetgroup/test-tg/123";
                expect(graph.hasNode(lbArn)).toBe(true);
                expect(graph.getNodeAttribute(
                    lbArn,
                    "resourcetype"
                )).toBe("loadbalancer");
                expect(graph.hasNode(tgArn)).toBe(true);
                expect(graph.hasDirectedEdge(
                    tgArn,
                    lbArn
                )).toBe(true);

            }
        );

        // S3
        it(
            "has S3 bucket → region edge",
            () => {

                expect(graph.hasNode("test-bucket")).toBe(true);
                expect(graph.getNodeAttribute(
                    "test-bucket",
                    "resourcetype"
                )).toBe("s3bucket");
                expect(graph.hasDirectedEdge(
                    "test-bucket",
                    REGION
                )).toBe(true);

            }
        );

        // RDS
        it(
            "has RDS cluster and instance nodes",
            () => {

                expect(graph.hasNode("arn:aws:rds:eu-west-1:111:cluster:test-cluster")).toBe(true);
                expect(graph.hasNode("arn:aws:rds:eu-west-1:111:db:test-db")).toBe(true);

            }
        );

        // EKS
        it(
            "has EKS cluster → region edge",
            () => {

                expect(graph.hasNode("arn:aws:eks:eu-west-1:111:cluster/test-eks")).toBe(true);
                expect(graph.hasDirectedEdge(
                    "arn:aws:eks:eu-west-1:111:cluster/test-eks",
                    REGION
                )).toBe(true);

            }
        );

        // CloudFront
        it(
            "has CloudFront distribution and function nodes",
            () => {

                expect(graph.hasNode("arn:aws:cloudfront::111:distribution/DIST-TEST")).toBe(true);
                expect(graph.hasNode("arn:aws:cloudfront::111:function/cf-func-test")).toBe(true);
                expect(graph.hasNode("oac-test")).toBe(true);

            }
        );

        // DynamoDB
        it(
            "has DynamoDB table node",
            () => {

                expect(graph.hasNode("arn:aws:dynamodb:eu-west-1:111:table/TestTable")).toBe(true);
                expect(graph.getNodeAttribute(
                    "arn:aws:dynamodb:eu-west-1:111:table/TestTable",
                    "resourcetype"
                )).toBe("dynamodbtable");

            }
        );

        // SNS/SQS
        it(
            "has SNS topic and SQS queue nodes",
            () => {

                expect(graph.hasNode("arn:aws:sns:eu-west-1:111:test-topic")).toBe(true);
                expect(graph.hasNode("arn:aws:sqs:eu-west-1:111:test-queue")).toBe(true);

            }
        );

        // Global Accelerator
        it(
            "has Global Accelerator hierarchy",
            () => {

                expect(graph.hasNode("arn:aws:globalaccelerator::111:accelerator/acc-test")).toBe(true);
                expect(graph.hasNode("arn:aws:globalaccelerator::111:accelerator/acc-test/listener/lst-test")).toBe(true);

            }
        );

        // Spot-check various service nodes exist
        it(
            "has nodes for all major service types",
            () => {

                const expectedNodes: [string, string][] = [
                    [
                        "arn:aws:acm:eu-west-1:111:certificate/test",
                        "certificate"
                    ],
                    [
                        "arn:aws:kms:eu-west-1:111:key/test-key",
                        "kmskey"
                    ],
                    [
                        "arn:aws:elasticfilesystem:eu-west-1:111:file-system/fs-test",
                        "filesystem"
                    ],
                    [
                        "arn:aws:ecr:eu-west-1:111:repository/test-repo",
                        "ecrrepository"
                    ],
                    [
                        "arn:aws:secretsmanager:eu-west-1:111:secret:test-secret",
                        "secret"
                    ],
                    [
                        "arn:aws:wafv2:eu-west-1:111:regional/webacl/test-acl/123",
                        "webacl"
                    ],
                    [
                        "arn:aws:states:eu-west-1:111:stateMachine:test-sfn",
                        "statemachine"
                    ],
                    [
                        "arn:aws:kinesis:eu-west-1:111:stream/test-stream",
                        "kinesisstream"
                    ],
                    [
                        "arn:aws:es:eu-west-1:111:domain/test-os",
                        "opensearchdomain"
                    ],
                    [
                        "arn:aws:codebuild:eu-west-1:111:project/test-cb",
                        "codebuildproject"
                    ],
                    [
                        "arn:aws:cognito-idp:eu-west-1:111:userpool/eu-west-1_test",
                        "userpool"
                    ],
                    [
                        "arn:aws:servicediscovery:eu-west-1:111:namespace/ns-test",
                        "cloudmapnamespace"
                    ],
                    [
                        "arn:aws:backup:eu-west-1:111:backup-vault:test-vault",
                        "backupvault"
                    ],
                    [
                        "arn:aws:glacier:eu-west-1:111:vaults/test-vault",
                        "glaciervault"
                    ],
                    [
                        "arn:aws:codeartifact:eu-west-1:111:domain/test-domain",
                        "codeartifactdomain"
                    ],
                    [
                        "arn:aws:kafka:eu-west-1:111:cluster/test-msk/123",
                        "mskcluster"
                    ],
                    [
                        "arn:aws:rds:eu-west-1:111:cluster:neptune-test",
                        "neptunecluster"
                    ],
                    [
                        "arn:aws:rds:eu-west-1:111:cluster:docdb-test",
                        "docdbcluster"
                    ],
                    [
                        "arn:aws:fsx:eu-west-1:111:file-system/fs-fsx-test",
                        "fsxfilesystem"
                    ],
                    [
                        "arn:aws:network-firewall:eu-west-1:111:firewall/test-fw",
                        "networkfirewall"
                    ],
                    [
                        "test-pipeline",
                        "pipeline"
                    ],
                    [
                        "arn:aws:cloudtrail:eu-west-1:111:trail/test-trail",
                        "trail"
                    ],
                    [
                        "arn:aws:mq:eu-west-1:111:broker:test-broker:123",
                        "mqbroker"
                    ],
                    [
                        "arn:aws:airflow:eu-west-1:111:environment/test-mwaa",
                        "mwaaenvironment"
                    ],
                    [
                        "arn:aws:apprunner:eu-west-1:111:service/ar-svc-test/123",
                        "apprunnerservice"
                    ],
                    [
                        "arn:aws:transfer:eu-west-1:111:server/s-test",
                        "transferserver"
                    ],
                    [
                        "arn:aws:vpc-lattice:eu-west-1:111:servicenetwork/sn-test",
                        "latticeservicenetwork"
                    ],
                    [
                        "arn:aws:iot:eu-west-1:111:thing/test-thing",
                        "iotthing"
                    ],
                    [
                        "arn:aws:dms:eu-west-1:111:rep:dms-ri-test",
                        "dmsreplicationinstance"
                    ],
                    [
                        "rslvr-ep-test",
                        "resolverendpoint"
                    ],
                    [
                        "arn:aws:batch:eu-west-1:111:compute-environment/batch-ce-test",
                        "batchcomputeenvironment"
                    ],
                    [
                        "arn:aws:memorydb:eu-west-1:111:cluster/mdb-cluster-test",
                        "memorydbcluster"
                    ],
                    [
                        "arn:aws:elasticmapreduce:eu-west-1:111:cluster/j-test",
                        "emrcluster"
                    ],
                    [
                        "arn:aws:emr-serverless:eu-west-1:111:/applications/app-test",
                        "emrserverlessapplication"
                    ],
                    [
                        "arn:aws:elasticbeanstalk:eu-west-1:111:application/eb-app-test",
                        "beanstalkapplication"
                    ],
                    [
                        "arn:aws:appsync:eu-west-1:111:apis/api-test",
                        "graphqlapi"
                    ],
                    [
                        "arn:aws:redshift-serverless:eu-west-1:111:namespace/rs-ns-test",
                        "rsnamespace"
                    ],
                    [
                        "arn:aws:aoss:eu-west-1:111:collection/oss-col-test",
                        "osscollection"
                    ],
                    [
                        "d-test",
                        "directory"
                    ],
                    [
                        "ws-test",
                        "workspace"
                    ],
                    [
                        "cluster-hsm-test",
                        "hsmcluster"
                    ],
                    [
                        "arn:aws:appmesh:eu-west-1:111:mesh/test-mesh",
                        "appmesh"
                    ],
                    [
                        "classic-elb-test",
                        "classicelb"
                    ],
                    [
                        "arn:aws:pipes:eu-west-1:111:pipe/pipe-test",
                        "eventbridgepipe"
                    ],
                    [
                        "arn:aws:storagegateway:eu-west-1:111:gateway/sgw-test",
                        "storagegateway"
                    ],
                    [
                        "arn:aws:outposts:eu-west-1:111:outpost/op-test",
                        "outpost"
                    ],
                    [
                        "arn:aws:mediaconnect:eu-west-1:111:flow:flow-test:test-flow",
                        "mediaconnectflow"
                    ],
                    [
                        "arn:aws:sagemaker:eu-west-1:111:notebook-instance/nb-test",
                        "notebookinstance"
                    ]
                ];
                for (const [
                    nodeId,
                    resourceType
                ] of expectedNodes) {

                    expect(
                        graph.hasNode(nodeId),
                        `Missing node: ${nodeId}`
                    ).toBe(true);
                    expect(
                        graph.getNodeAttribute(
                            nodeId,
                            "resourcetype"
                        ),
                        `Wrong type for ${nodeId}`
                    ).toBe(resourceType);

                }

            }
        );

        // Check a variety of parent-child edges across different services
        it(
            "has cross-service edges",
            () => {

                // EKS nodegroup → cluster
                expect(graph.hasDirectedEdge(
                    "arn:aws:eks:eu-west-1:111:nodegroup/test-eks/ng-test/123",
                    "arn:aws:eks:eu-west-1:111:cluster/test-eks"
                )).toBe(true);
                // Lambda → subnet (Lambda added in #addRegionalResources, subnet already exists)
                expect(graph.hasDirectedEdge(
                    "arn:aws:lambda:eu-west-1:111:function:test-fn",
                    "subnet-test"
                )).toBe(true);
                // NAT → subnet
                expect(graph.hasDirectedEdge(
                    "nat-test",
                    "subnet-test"
                )).toBe(true);
                // Instance Connect Endpoint → subnet
                expect(graph.hasDirectedEdge(
                    "ice-test",
                    "subnet-test"
                )).toBe(true);
                // Traffic mirror session → target
                expect(graph.hasDirectedEdge(
                    "tms-test",
                    "tmt-test"
                )).toBe(true);
                // Snapshot → volume
                expect(graph.hasDirectedEdge(
                    "snap-test",
                    "vol-test"
                )).toBe(true);
                // CloudTrail → S3 bucket
                expect(graph.hasDirectedEdge(
                    "arn:aws:cloudtrail:eu-west-1:111:trail/test-trail",
                    "test-bucket"
                )).toBe(true);
                // DMS task → replication instance
                expect(graph.hasDirectedEdge(
                    "arn:aws:dms:eu-west-1:111:task:dms-task-test",
                    "arn:aws:dms:eu-west-1:111:rep:dms-ri-test"
                )).toBe(true);
                // Beanstalk env → app
                expect(graph.hasDirectedEdge(
                    "arn:aws:elasticbeanstalk:eu-west-1:111:environment/eb-app-test/eb-env-test",
                    "arn:aws:elasticbeanstalk:eu-west-1:111:application/eb-app-test"
                )).toBe(true);

            }
        );

    }
);

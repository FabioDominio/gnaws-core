import {mkdirSync, writeFileSync} from "node:fs";
import {join} from "node:path";
import type {Inventory} from "../inventory.js";

/**
 * Exports all fetched resource data from a Inventory instance to a cache directory.
 * The exported files can later be loaded by CacheServiceFactory for offline use.
 */
export class CacheWriter {

    #outputDir: string;

    constructor (outputDir: string) {

        this.#outputDir = outputDir;
        mkdirSync(
            outputDir,
            {"recursive": true}
        );

    }

    /**
     * Write all resource data to JSON files in the output directory.
     */
    writeAll (rs: Inventory): void {

        const regions = rs.getAccountRegions();
        const regionNames = regions.map((r) => r.RegionName).filter(Boolean) as string[];

        this.#writeGlobal(
            rs,
            regions
        );
        this.#writeRegional(
            rs,
            regionNames
        );

        // Manifest
        this.#write(
            "manifest.json",
            {
                "version": 1,
                "scannedAt": new Date().toISOString(),
                "regions": regionNames
            }
        );

    }

    #writeGlobal (rs: Inventory, regions: unknown[]): void {

        const globalDir = join(
            this.#outputDir,
            "global"
        );
        mkdirSync(
            globalDir,
            {"recursive": true}
        );

        const g = (filename: string, data: unknown): void => {

            writeFileSync(
                join(
                    globalDir,
                    filename
                ),
                JSON.stringify(
                    data,
                    null,
                    2
                )
            );

        };

        // Account
        g(
            "ec2_regions.json",
            regions
        );

        // IAM
        g(
            "iam_users.json",
            rs.getUsers()
        );
        g(
            "iam_roles.json",
            rs.getRoles()
        );
        g(
            "iam_policies.json",
            rs.getPolicies()
        );
        g(
            "iam_user_groups.json",
            rs.getUserGroups()
        );
        g(
            "iam_instance_profiles.json",
            rs.getInstanceProfiles()
        );
        g(
            "iam_access_keys.json",
            rs.getAccessKeys()
        );
        g(
            "iam_server_certificates.json",
            rs.getServerCertificates()
        );
        g(
            "iam_virtual_mfa_devices.json",
            rs.getVirtualMfaDevices()
        );
        g(
            "iam_role_policies.json",
            rs.getRolePoliciesMap()
        );
        g(
            "iam_user_policies.json",
            rs.getUserPoliciesMap()
        );
        g(
            "iam_group_policies.json",
            rs.getGroupPoliciesMap()
        );

        // S3
        g(
            "s3_directory_buckets.json",
            rs.getDirectoryBuckets()
        );

        // CloudFront
        g(
            "cloudfront_distributions.json",
            rs.getDistributions()
        );
        g(
            "cloudfront_functions.json",
            rs.getCloudFrontFunctions()
        );
        g(
            "cloudfront_origin_access_controls.json",
            rs.getOriginAccessControls()
        );
        g(
            "cloudfront_key_value_stores.json",
            rs.getKeyValueStores()
        );

        // Route53
        g(
            "route53_hosted_zones.json",
            rs.getHostedZones()
        );
        g(
            "route53_health_checks.json",
            rs.getRoute53HealthChecks()
        );
        // Record sets merged from all zones
        const allRecordSets: unknown[] = [];
        for (const z of rs.getHostedZones()) {

            if (z.Id) {

                allRecordSets.push(...rs.getRecordSetsByZone(z.Id));

            }

        }
        g(
            "route53_record_sets.json",
            allRecordSets
        );

        // Organizations
        g(
            "organizations_roots.json",
            rs.getOrgRoots()
        );
        g(
            "organizations_ous.json",
            rs.getOrgOUs()
        );
        g(
            "organizations_accounts.json",
            rs.getOrgAccounts()
        );
        g(
            "organizations_policies.json",
            rs.getOrgPolicies()
        );

        // Global Accelerator
        g(
            "global_accelerator_accelerators.json",
            rs.getAccelerators()
        );
        g(
            "global_accelerator_listeners.json",
            rs.getAcceleratorListeners()
        );
        g(
            "global_accelerator_endpoint_groups.json",
            rs.getAcceleratorEndpointGroups()
        );

        // Network Manager
        g(
            "networkmanager_global_networks.json",
            rs.getGlobalNetworks()
        );
        g(
            "networkmanager_sites.json",
            rs.getNmSites()
        );
        g(
            "networkmanager_devices.json",
            rs.getNmDevices()
        );
        g(
            "networkmanager_links.json",
            rs.getNmLinks()
        );
        g(
            "networkmanager_connections.json",
            rs.getNmConnections()
        );
        g(
            "networkmanager_core_networks.json",
            rs.getCoreNetworks()
        );
        g(
            "networkmanager_attachments.json",
            rs.getNmAttachments()
        );
        g(
            "networkmanager_transit_gateway_registrations.json",
            rs.getTransitGatewayRegistrations()
        );

    }

    #writeRegional (rs: Inventory, regionNames: string[]): void {

        // Create region directories
        for (const region of regionNames) {

            mkdirSync(
                join(
                    this.#outputDir,
                    region
                ),
                {"recursive": true}
            );

        }

        // Helper to write per-region files
        const perRegion = (filename: string, getter: (region: string) => unknown[]): void => {

            for (const region of regionNames) {

                const data = getter(region);
                writeFileSync(
                    join(
                        this.#outputDir,
                        region,
                        filename
                    ),
                    JSON.stringify(
                        data,
                        null,
                        2
                    )
                );

            }

        };

        // EC2
        perRegion(
            "ec2_vpcs.json",
            (r) => rs.getVpcsByRegion(r)
        );
        perRegion(
            "ec2_subnets.json",
            (r) => rs.getSubnetsByRegion(r)
        );
        perRegion(
            "ec2_security_groups.json",
            (r) => rs.getSecurityGroupsByRegion(r)
        );
        perRegion(
            "ec2_instances.json",
            (r) => rs.getInstancesByRegion(r)
        );
        perRegion(
            "ec2_volumes.json",
            (r) => rs.getVolumesByRegion(r)
        );
        perRegion(
            "ec2_addresses.json",
            (r) => rs.getAddressesByRegion(r)
        );
        perRegion(
            "ec2_network_interfaces.json",
            (r) => rs.getNetworkInterfacesByRegion(r)
        );
        perRegion(
            "ec2_internet_gateways.json",
            (r) => rs.getInternetGatewaysByRegion(r)
        );
        perRegion(
            "ec2_egress_only_internet_gateways.json",
            (r) => rs.getEgressOnlyInternetGatewaysByRegion(r)
        );
        perRegion(
            "ec2_nat_gateways.json",
            (r) => rs.getNatGatewaysByRegion(r)
        );
        perRegion(
            "ec2_route_tables.json",
            (r) => rs.getRouteTablesByRegion(r)
        );
        perRegion(
            "ec2_vpc_endpoints.json",
            (r) => rs.getVpcEndpointsByRegion(r)
        );
        perRegion(
            "ec2_images.json",
            (r) => rs.getImagesByRegion(r)
        );
        perRegion(
            "ec2_snapshots.json",
            (r) => rs.getSnapshotsByRegion(r)
        );
        perRegion(
            "ec2_key_pairs.json",
            (r) => rs.getKeyPairsByRegion(r)
        );
        perRegion(
            "ec2_network_acls.json",
            (r) => rs.getNetworkAclsByRegion(r)
        );
        perRegion(
            "ec2_flow_logs.json",
            (r) => rs.getFlowLogsByRegion(r)
        );
        perRegion(
            "ec2_dhcp_options.json",
            (r) => rs.getDhcpOptionsByRegion(r)
        );
        perRegion(
            "ec2_managed_prefix_lists.json",
            (r) => rs.getManagedPrefixListsByRegion(r)
        );
        perRegion(
            "ec2_vpc_peering_connections.json",
            (r) => rs.getVpcPeeringConnectionsByRegion(r)
        );
        perRegion(
            "ec2_launch_templates.json",
            (r) => rs.getLaunchTemplatesByRegion(r)
        );
        perRegion(
            "ec2_transit_gateways.json",
            (r) => rs.getTransitGatewaysByRegion(r)
        );
        perRegion(
            "ec2_transit_gateway_attachments.json",
            (r) => rs.getTransitGatewayAttachmentsByRegion(r)
        );
        perRegion(
            "ec2_transit_gateway_route_tables.json",
            (r) => rs.getTransitGatewayRouteTablesByRegion(r)
        );
        perRegion(
            "ec2_transit_gateway_vpc_attachments.json",
            (r) => rs.getTransitGatewayVpcAttachmentsByRegion(r)
        );
        perRegion(
            "ec2_transit_gateway_peering_attachments.json",
            (r) => rs.getTransitGatewayPeeringAttachmentsByRegion(r)
        );
        perRegion(
            "ec2_transit_gateway_connects.json",
            (r) => rs.getTransitGatewayConnectsByRegion(r)
        );
        perRegion(
            "ec2_transit_gateway_connect_peers.json",
            (r) => rs.getTransitGatewayConnectPeersByRegion(r)
        );
        perRegion(
            "ec2_verified_access_instances.json",
            (r) => rs.getVerifiedAccessInstancesByRegion(r)
        );
        perRegion(
            "ec2_verified_access_groups.json",
            (r) => rs.getVerifiedAccessGroupsByRegion(r)
        );
        perRegion(
            "ec2_verified_access_endpoints.json",
            (r) => rs.getVerifiedAccessEndpointsByRegion(r)
        );
        perRegion(
            "ec2_verified_access_trust_providers.json",
            (r) => rs.getVerifiedAccessTrustProvidersByRegion(r)
        );
        perRegion(
            "ec2_vpc_endpoint_service_configurations.json",
            (r) => rs.getVpcEndpointServiceConfigsByRegion(r)
        );
        perRegion(
            "ec2_security_group_rules.json",
            (r) => rs.getSecurityGroupRulesByRegion(r)
        );
        perRegion(
            "ec2_local_gateways.json",
            (r) => rs.getLocalGatewaysByRegion(r)
        );
        perRegion(
            "ec2_local_gateway_route_tables.json",
            (r) => rs.getLocalGatewayRouteTablesByRegion(r)
        );
        perRegion(
            "ec2_local_gateway_route_table_vpc_associations.json",
            (r) => rs.getLocalGatewayRtVpcAssociationsByRegion(r)
        );
        perRegion(
            "ec2_local_gateway_virtual_interfaces.json",
            (r) => rs.getLocalGatewayVirtualInterfacesByRegion(r)
        );
        perRegion(
            "ec2_local_gateway_virtual_interface_groups.json",
            (r) => rs.getLocalGatewayVifGroupsByRegion(r)
        );
        perRegion(
            "ec2_stale_security_groups.json",
            (r) => rs.getStaleSecurityGroupsByRegion(r)
        );
        perRegion(
            "ec2_instance_connect_endpoints.json",
            (r) => rs.getInstanceConnectEndpointsByRegion(r)
        );
        perRegion(
            "ec2_images_recycle_bin.json",
            (r) => rs.getImagesInRecycleBinByRegion(r)
        );
        perRegion(
            "ec2_snapshots_recycle_bin.json",
            (r) => rs.getSnapshotsInRecycleBinByRegion(r)
        );
        perRegion(
            "ec2_fleets.json",
            (r) => rs.getFleetsByRegion(r)
        );
        perRegion(
            "ec2_traffic_mirror_sessions.json",
            (r) => rs.getTrafficMirrorSessionsByRegion(r)
        );
        perRegion(
            "ec2_traffic_mirror_targets.json",
            (r) => rs.getTrafficMirrorTargetsByRegion(r)
        );
        perRegion(
            "ec2_traffic_mirror_filters.json",
            (r) => rs.getTrafficMirrorFiltersByRegion(r)
        );
        perRegion(
            "ec2_client_vpn_endpoints.json",
            (r) => rs.getClientVpnEndpointsByRegion(r)
        );

        // Lambda
        perRegion(
            "lambda_functions.json",
            (r) => rs.getLambdasByRegion(r)
        );
        perRegion(
            "lambda_event_source_mappings.json",
            (r) => rs.getEventSourceMappingsByRegion(r)
        );
        perRegion(
            "lambda_layers.json",
            (r) => rs.getLayersByRegion(r)
        );
        perRegion(
            "lambda_aliases.json",
            (r) => rs.getAliasesByRegion(r)
        );
        perRegion(
            "lambda_function_url_configs.json",
            (r) => rs.getFunctionUrlConfigsByRegion(r)
        );
        perRegion(
            "lambda_provisioned_concurrency.json",
            (r) => rs.getProvisionedConcurrencyByRegion(r)
        );

        // CloudWatch
        perRegion(
            "cloudwatch_log_groups.json",
            (r) => rs.getLogGroupsByRegion(r)
        );
        perRegion(
            "cloudwatch_metric_alarms.json",
            (r) => rs.getMetricAlarmsByRegion(r)
        );
        perRegion(
            "cloudwatch_composite_alarms.json",
            (r) => rs.getCompositeAlarmsByRegion(r)
        );
        perRegion(
            "cloudwatch_subscription_filters.json",
            (r) => rs.getSubscriptionFiltersByRegion(r)
        );
        perRegion(
            "cloudwatch_metric_streams.json",
            (r) => rs.getMetricStreamsByRegion(r)
        );
        perRegion(
            "cloudwatch_metric_filters.json",
            (r) => rs.getMetricFiltersByRegion(r)
        );
        perRegion(
            "cloudwatch_deliveries.json",
            (r) => rs.getDeliveriesByRegion(r)
        );
        perRegion(
            "cloudwatch_delivery_destinations.json",
            (r) => rs.getDeliveryDestinationsByRegion(r)
        );
        perRegion(
            "cloudwatch_delivery_sources.json",
            (r) => rs.getDeliverySourcesByRegion(r)
        );

        // S3 Tables
        perRegion(
            "s3tables_table_buckets.json",
            (r) => rs.getTableBucketsByRegion(r)
        );
        perRegion(
            "s3tables_namespaces.json",
            (r) => rs.getNamespacesByRegion(r)
        );
        perRegion(
            "s3tables_tables.json",
            (r) => rs.getTablesByRegion(r)
        );

        // DynamoDB
        perRegion(
            "dynamodb_tables.json",
            (r) => rs.getDynamoDBTablesByRegion(r)
        );

        // ECR
        perRegion(
            "ecr_repositories.json",
            (r) => rs.getEcrRepositoriesByRegion(r)
        );

        // ECS
        perRegion(
            "ecs_clusters.json",
            (r) => rs.getEcsClustersByRegion(r)
        );
        perRegion(
            "ecs_services.json",
            (r) => rs.getEcsServicesByRegion(r)
        );
        perRegion(
            "ecs_task_definition_arns.json",
            (r) => rs.getEcsTaskDefinitionArnsByRegion(r)
        );
        perRegion(
            "ecs_container_instances.json",
            (r) => rs.getEcsContainerInstancesByRegion(r)
        );

        // ELBv2
        perRegion(
            "elbv2_load_balancers.json",
            (r) => rs.getLoadBalancersByRegion(r)
        );
        perRegion(
            "elbv2_target_groups.json",
            (r) => rs.getTargetGroupsByRegion(r)
        );
        perRegion(
            "elbv2_listeners.json",
            (r) => rs.getListenersByRegion(r)
        );
        perRegion(
            "elbv2_rules.json",
            (r) => rs.getRulesByRegion(r)
        );
        perRegion(
            "elbv2_trust_stores.json",
            (r) => rs.getTrustStoresByRegion(r)
        );
        perRegion(
            "elbv2_listener_certificates.json",
            (_r) => []
        );

        // Classic ELB
        perRegion(
            "elb_load_balancers.json",
            (r) => rs.getClassicLoadBalancersByRegion(r)
        );

        // SNS
        perRegion(
            "sns_topics.json",
            (r) => rs.getTopicsByRegion(r)
        );
        perRegion(
            "sns_subscriptions.json",
            (r) => rs.getSubscriptionsByRegion(r)
        );

        // SQS
        perRegion(
            "sqs_queues.json",
            (r) => rs.getQueuesByRegion(r)
        );
        // DLQ source edges (merged flat)
        for (const region of regionNames) {

            writeFileSync(
                join(
                    this.#outputDir,
                    region,
                    "sqs_dlq_sources.json"
                ),
                JSON.stringify(
                    [],
                    null,
                    2
                )
            );

        }

        // EKS
        perRegion(
            "eks_clusters.json",
            (r) => rs.getEksClustersByRegion(r)
        );
        perRegion(
            "eks_nodegroups.json",
            (r) => rs.getEksNodegroupsByRegion(r)
        );
        perRegion(
            "eks_fargate_profiles.json",
            (r) => rs.getFargateProfilesByRegion(r)
        );
        perRegion(
            "eks_pod_identity_associations.json",
            (r) => rs.getPodIdentityAssociationsByRegion(r)
        );
        perRegion(
            "eks_addons.json",
            (r) => rs.getEksAddonsByRegion(r)
        );
        perRegion(
            "eks_access_entries.json",
            (r) => rs.getEksAccessEntriesByRegion(r)
        );

        // Secrets Manager
        perRegion(
            "secretsmanager_secrets.json",
            (r) => rs.getSecretsByRegion(r)
        );

        // ACM
        perRegion(
            "acm_certificates.json",
            (r) => rs.getCertificatesByRegion(r)
        );

        // EFS
        perRegion(
            "efs_file_systems.json",
            (r) => rs.getFileSystemsByRegion(r)
        );
        perRegion(
            "efs_access_points.json",
            (r) => rs.getAccessPointsByRegion(r)
        );

        // KMS
        perRegion(
            "kms_keys.json",
            (r) => rs.getKeysByRegion(r)
        );
        // Aliases merged flat per region
        perRegion(
            "kms_aliases.json",
            (_r) => []
        );

        // Auto Scaling
        perRegion(
            "autoscaling_groups.json",
            (r) => rs.getAutoScalingGroupsByRegion(r)
        );
        perRegion(
            "autoscaling_launch_configurations.json",
            (r) => rs.getLaunchConfigsByRegion(r)
        );
        perRegion(
            "autoscaling_scaling_policies.json",
            (r) => rs.getScalingPoliciesByRegion(r)
        );

        // RDS
        perRegion(
            "rds_instances.json",
            (r) => rs.getDBInstancesByRegion(r)
        );
        perRegion(
            "rds_clusters.json",
            (r) => rs.getDBClustersByRegion(r)
        );
        perRegion(
            "rds_proxies.json",
            (r) => rs.getDBProxiesByRegion(r)
        );
        perRegion(
            "rds_subnet_groups.json",
            (r) => rs.getDBSubnetGroupsByRegion(r)
        );
        perRegion(
            "rds_proxy_target_groups.json",
            (r) => rs.getDBProxyTargetGroupsByRegion(r)
        );

        // API Gateway
        perRegion(
            "apigateway_rest_apis.json",
            (r) => rs.getRestApisByRegion(r)
        );
        perRegion(
            "apigateway_http_apis.json",
            (r) => rs.getHttpApisByRegion(r)
        );
        perRegion(
            "apigateway_vpc_links.json",
            (r) => rs.getVpcLinksByRegion(r)
        );
        perRegion(
            "apigateway_domain_names.json",
            (r) => rs.getDomainNamesByRegion(r)
        );
        perRegion(
            "apigateway_usage_plans.json",
            (r) => rs.getUsagePlansByRegion(r)
        );

        // WAF
        perRegion(
            "waf_web_acls.json",
            (r) => rs.getWebAclsByRegion(r)
        );

        // ElastiCache
        perRegion(
            "elasticache_clusters.json",
            (r) => rs.getCacheClustersByRegion(r)
        );
        perRegion(
            "elasticache_replication_groups.json",
            (r) => rs.getReplicationGroupsByRegion(r)
        );
        perRegion(
            "elasticache_cache_subnet_groups.json",
            (r) => rs.getCacheSubnetGroupsByRegion(r)
        );
        perRegion(
            "elasticache_serverless_caches.json",
            (r) => rs.getServerlessCachesByRegion(r)
        );

        // EventBridge
        perRegion(
            "eventbridge_buses.json",
            (r) => rs.getEventBusesByRegion(r)
        );

        // Step Functions
        perRegion(
            "sfn_state_machines.json",
            (r) => rs.getStateMachinesByRegion(r)
        );

        // Kinesis
        perRegion(
            "kinesis_streams.json",
            (r) => rs.getKinesisStreamsByRegion(r)
        );

        // OpenSearch
        perRegion(
            "opensearch_domains.json",
            (r) => rs.getOpenSearchDomainsByRegion(r)
        );

        // CodeBuild
        perRegion(
            "codebuild_projects.json",
            (r) => rs.getCodeBuildProjectsByRegion(r)
        );

        // Cognito
        perRegion(
            "cognito_user_pools.json",
            (r) => rs.getCognitoUserPoolsByRegion(r)
        );
        perRegion(
            "cognito_identity_providers.json",
            (r) => rs.getCognitoIdentityProvidersByRegion(r)
        );
        perRegion(
            "cognito_user_pool_clients.json",
            (r) => rs.getCognitoUserPoolClientsByRegion(r)
        );

        // Service Discovery / CloudMap
        perRegion(
            "servicediscovery_namespaces.json",
            (r) => rs.getCloudMapNamespacesByRegion(r)
        );
        perRegion(
            "servicediscovery_services.json",
            (r) => rs.getCloudMapServicesByRegion(r)
        );
        perRegion(
            "servicediscovery_instances.json",
            (r) => rs.getCloudMapInstancesByRegion(r)
        );

        // Backup
        perRegion(
            "backup_vaults.json",
            (r) => rs.getBackupVaultsByRegion(r)
        );
        perRegion(
            "backup_protected_resources.json",
            (r) => rs.getProtectedResourcesByRegion(r)
        );
        perRegion(
            "backup_plans.json",
            (r) => rs.getBackupPlansByRegion(r)
        );
        perRegion(
            "backup_selections.json",
            (r) => rs.getBackupSelectionsByRegion(r)
        );

        // Glacier
        perRegion(
            "glacier_vaults.json",
            (r) => rs.getGlacierVaultsByRegion(r)
        );

        // CodeArtifact
        perRegion(
            "codeartifact_domains.json",
            (r) => rs.getCodeArtifactDomainsByRegion(r)
        );
        perRegion(
            "codeartifact_repositories.json",
            (r) => rs.getCodeArtifactRepositoriesByRegion(r)
        );

        // MSK
        perRegion(
            "msk_clusters.json",
            (r) => rs.getMskClustersByRegion(r)
        );

        // Redshift
        perRegion(
            "redshift_clusters.json",
            (r) => rs.getRedshiftClustersByRegion(r)
        );
        perRegion(
            "redshift_subnet_groups.json",
            (r) => rs.getRedshiftSubnetGroupsByRegion(r)
        );

        // Neptune
        perRegion(
            "neptune_clusters.json",
            (r) => rs.getNeptuneClustersByRegion(r)
        );
        perRegion(
            "neptune_instances.json",
            (r) => rs.getNeptuneInstancesByRegion(r)
        );
        perRegion(
            "neptune_subnet_groups.json",
            (r) => rs.getNeptuneSubnetGroupsByRegion(r)
        );

        // DocumentDB
        perRegion(
            "docdb_clusters.json",
            (r) => rs.getDocDbClustersByRegion(r)
        );
        perRegion(
            "docdb_instances.json",
            (r) => rs.getDocDbInstancesByRegion(r)
        );
        perRegion(
            "docdb_subnet_groups.json",
            (r) => rs.getDocDbSubnetGroupsByRegion(r)
        );

        // FSx
        perRegion(
            "fsx_file_systems.json",
            (r) => rs.getFsxFileSystemsByRegion(r)
        );

        // Network Firewall
        perRegion(
            "network_firewall_firewalls.json",
            (r) => rs.getNetworkFirewallsByRegion(r)
        );
        perRegion(
            "network_firewall_policies.json",
            (r) => rs.getFirewallPoliciesByRegion(r)
        );
        perRegion(
            "network_firewall_rule_groups.json",
            (r) => rs.getRuleGroupsByRegion(r)
        );

        // CodePipeline
        perRegion(
            "codepipeline_pipelines.json",
            (r) => rs.getCodePipelinesByRegion(r)
        );

        // CloudTrail
        perRegion(
            "cloudtrail_trails.json",
            (r) => rs.getCloudTrailsByRegion(r)
        );

        // SSM
        perRegion(
            "ssm_parameters.json",
            (r) => rs.getSsmParametersByRegion(r)
        );
        perRegion(
            "ssm_managed_instances.json",
            (r) => rs.getSsmManagedInstancesByRegion(r)
        );
        perRegion(
            "ssm_maintenance_windows.json",
            (r) => rs.getSsmMaintenanceWindowsByRegion(r)
        );
        perRegion(
            "ssm_documents.json",
            (r) => rs.getSsmDocumentsByRegion(r)
        );
        perRegion(
            "ssm_associations.json",
            (r) => rs.getSsmAssociationsByRegion(r)
        );
        perRegion(
            "ssm_patch_baselines.json",
            (r) => rs.getSsmPatchBaselinesByRegion(r)
        );

        // CloudFormation
        perRegion(
            "cloudformation_stacks.json",
            (r) => rs.getCfnStacksByRegion(r)
        );
        // Stack resources is a map (object), write it directly per region
        for (const region of regionNames) {

            const data = rs.getCfnStackResourcesByRegion(region);
            writeFileSync(
                join(
                    this.#outputDir,
                    region,
                    "cloudformation_stack_resources.json"
                ),
                JSON.stringify(
                    data,
                    null,
                    2
                )
            );

        }
        perRegion(
            "cloudformation_exports.json",
            (r) => rs.getCfnExportsByRegion(r)
        );
        perRegion(
            "cloudformation_stack_sets.json",
            (r) => rs.getCfnStackSetsByRegion(r)
        );

        // Amazon MQ
        perRegion(
            "mq_brokers.json",
            (r) => rs.getMqBrokersByRegion(r)
        );
        perRegion(
            "mq_configurations.json",
            (r) => rs.getMqConfigurationsByRegion(r)
        );

        // MWAA
        perRegion(
            "mwaa_environments.json",
            (r) => rs.getMwaaEnvironmentsByRegion(r)
        );

        // AppRunner
        perRegion(
            "apprunner_services.json",
            (r) => rs.getAppRunnerServicesByRegion(r)
        );
        perRegion(
            "apprunner_vpc_connectors.json",
            (r) => rs.getVpcConnectorsByRegion(r)
        );

        // Transfer Family
        perRegion(
            "transfer_servers.json",
            (r) => rs.getTransferServersByRegion(r)
        );

        // VPC Lattice
        perRegion(
            "vpclattice_service_networks.json",
            (r) => rs.getLatticeServiceNetworksByRegion(r)
        );
        perRegion(
            "vpclattice_services.json",
            (r) => rs.getLatticeServicesByRegion(r)
        );
        perRegion(
            "vpclattice_target_groups.json",
            (r) => rs.getLatticeTargetGroupsByRegion(r)
        );
        perRegion(
            "vpclattice_vpc_associations.json",
            (r) => rs.getLatticeVpcAssociationsByRegion(r)
        );
        perRegion(
            "vpclattice_service_associations.json",
            (r) => rs.getLatticeServiceAssociationsByRegion(r)
        );

        // IoT
        perRegion(
            "iot_things.json",
            (r) => rs.getIotThingsByRegion(r)
        );
        perRegion(
            "iot_thing_types.json",
            (r) => rs.getIotThingTypesByRegion(r)
        );
        perRegion(
            "iot_thing_groups.json",
            (r) => rs.getIotThingGroupsByRegion(r)
        );
        perRegion(
            "iot_certificates.json",
            (r) => rs.getIotCertificatesByRegion(r)
        );
        perRegion(
            "iot_topic_rules.json",
            (r) => rs.getIotTopicRulesByRegion(r)
        );
        perRegion(
            "iot_topic_rule_destinations.json",
            (r) => rs.getIotTopicRuleDestinationsByRegion(r)
        );

        // Glue
        perRegion(
            "glue_connections.json",
            (r) => rs.getGlueConnectionsByRegion(r)
        );
        perRegion(
            "glue_crawlers.json",
            (r) => rs.getGlueCrawlersByRegion(r)
        );
        perRegion(
            "glue_databases.json",
            (r) => rs.getGlueDatabasesByRegion(r)
        );
        perRegion(
            "glue_jobs.json",
            (r) => rs.getGlueJobsByRegion(r)
        );
        perRegion(
            "glue_triggers.json",
            (r) => rs.getGlueTriggersByRegion(r)
        );
        perRegion(
            "glue_tables.json",
            (r) => rs.getGlueTablesByRegion(r)
        );
        perRegion(
            "glue_registries.json",
            (r) => rs.getGlueRegistriesByRegion(r)
        );
        perRegion(
            "glue_schemas.json",
            (r) => rs.getGlueSchemasByRegion(r)
        );
        perRegion(
            "glue_workflows.json",
            (r) => rs.getGlueWorkflowsByRegion(r)
        );

        // DMS
        perRegion(
            "dms_replication_instances.json",
            (r) => rs.getDmsReplicationInstancesByRegion(r)
        );
        perRegion(
            "dms_replication_subnet_groups.json",
            (r) => rs.getDmsSubnetGroupsByRegion(r)
        );
        perRegion(
            "dms_endpoints.json",
            (r) => rs.getDmsEndpointsByRegion(r)
        );
        perRegion(
            "dms_replication_tasks.json",
            (r) => rs.getDmsReplicationTasksByRegion(r)
        );
        perRegion(
            "dms_connections.json",
            (r) => rs.getDmsConnectionsByRegion(r)
        );

        // Route53 Resolver
        perRegion(
            "route53resolver_endpoints.json",
            (r) => rs.getResolverEndpointsByRegion(r)
        );
        perRegion(
            "route53resolver_rules.json",
            (r) => rs.getResolverRulesByRegion(r)
        );
        perRegion(
            "route53resolver_rule_associations.json",
            (r) => rs.getResolverRuleAssociationsByRegion(r)
        );
        perRegion(
            "route53resolver_firewall_rule_groups.json",
            (r) => rs.getFirewallRuleGroupsByRegion(r)
        );
        perRegion(
            "route53resolver_firewall_rule_group_associations.json",
            (r) => rs.getFirewallRuleGroupAssociationsByRegion(r)
        );

        // Batch
        perRegion(
            "batch_compute_environments.json",
            (r) => rs.getBatchComputeEnvironmentsByRegion(r)
        );
        perRegion(
            "batch_job_queues.json",
            (r) => rs.getBatchJobQueuesByRegion(r)
        );
        perRegion(
            "batch_scheduling_policies.json",
            (r) => rs.getBatchSchedulingPoliciesByRegion(r)
        );

        // MemoryDB
        perRegion(
            "memorydb_clusters.json",
            (r) => rs.getMemoryDbClustersByRegion(r)
        );
        perRegion(
            "memorydb_subnet_groups.json",
            (r) => rs.getMemoryDbSubnetGroupsByRegion(r)
        );
        perRegion(
            "memorydb_acls.json",
            (r) => rs.getMemoryDbAclsByRegion(r)
        );
        perRegion(
            "memorydb_users.json",
            (r) => rs.getMemoryDbUsersByRegion(r)
        );

        // EMR
        perRegion(
            "emr_clusters.json",
            (r) => rs.getEmrClustersByRegion(r)
        );
        perRegion(
            "emr_instance_fleets.json",
            (r) => rs.getEmrInstanceFleetsByRegion(r)
        );
        perRegion(
            "emr_instance_groups.json",
            (r) => rs.getEmrInstanceGroupsByRegion(r)
        );
        perRegion(
            "emr_security_configurations.json",
            (r) => rs.getEmrSecurityConfigsByRegion(r)
        );

        // EMR Serverless
        perRegion(
            "emr_serverless_applications.json",
            (r) => rs.getEmrServerlessAppsByRegion(r)
        );

        // Elastic Beanstalk
        perRegion(
            "elasticbeanstalk_applications.json",
            (r) => rs.getBeanstalkAppsByRegion(r)
        );
        perRegion(
            "elasticbeanstalk_environments.json",
            (r) => rs.getBeanstalkEnvsByRegion(r)
        );

        // Athena
        perRegion(
            "athena_workgroups.json",
            (r) => rs.getAthenaWorkGroupsByRegion(r)
        );
        perRegion(
            "athena_data_catalogs.json",
            (r) => rs.getAthenaDataCatalogsByRegion(r)
        );

        // DataSync
        perRegion(
            "datasync_agents.json",
            (r) => rs.getDataSyncAgentsByRegion(r)
        );
        perRegion(
            "datasync_locations.json",
            (r) => rs.getDataSyncLocationsByRegion(r)
        );
        perRegion(
            "datasync_tasks.json",
            (r) => rs.getDataSyncTasksByRegion(r)
        );

        // AppSync
        perRegion(
            "appsync_apis.json",
            (r) => rs.getGraphqlApisByRegion(r)
        );
        perRegion(
            "appsync_data_sources.json",
            (r) => rs.getAppSyncDataSourcesByRegion(r)
        );

        // Redshift Serverless
        perRegion(
            "redshiftserverless_namespaces.json",
            (r) => rs.getRsNamespacesByRegion(r)
        );
        perRegion(
            "redshiftserverless_workgroups.json",
            (r) => rs.getRsWorkgroupsByRegion(r)
        );

        // OpenSearch Serverless
        perRegion(
            "opensearchserverless_collections.json",
            (r) => rs.getOssCollectionsByRegion(r)
        );
        perRegion(
            "opensearchserverless_vpc_endpoints.json",
            (r) => rs.getOssVpcEndpointsByRegion(r)
        );

        // Directory Service
        perRegion(
            "directoryservice_directories.json",
            (r) => rs.getDirectoriesByRegion(r)
        );

        // WorkSpaces
        perRegion(
            "workspaces_workspaces.json",
            (r) => rs.getWorkspacesByRegion(r)
        );
        perRegion(
            "workspaces_directories.json",
            (r) => rs.getWorkspaceDirectoriesByRegion(r)
        );

        // CloudHSM
        perRegion(
            "cloudhsm_clusters.json",
            (r) => rs.getHsmClustersByRegion(r)
        );

        // App Mesh
        perRegion(
            "appmesh_meshes.json",
            (r) => rs.getMeshesByRegion(r)
        );
        perRegion(
            "appmesh_virtual_nodes.json",
            (r) => rs.getVirtualNodesByRegion(r)
        );
        perRegion(
            "appmesh_virtual_services.json",
            (r) => rs.getVirtualServicesByRegion(r)
        );

        // S3 Control
        perRegion(
            "s3control_access_points.json",
            (r) => rs.getS3AccessPointsByRegion(r)
        );

        // EventBridge Pipes
        perRegion(
            "pipes_pipes.json",
            (r) => rs.getPipesByRegion(r)
        );

        // Storage Gateway
        perRegion(
            "storagegateway_gateways.json",
            (r) => rs.getGatewaysByRegion(r)
        );
        perRegion(
            "storagegateway_file_shares.json",
            (r) => rs.getFileSharesByRegion(r)
        );
        perRegion(
            "storagegateway_volumes.json",
            (r) => rs.getSgwVolumesByRegion(r)
        );

        // Outposts
        perRegion(
            "outposts_outposts.json",
            (r) => rs.getOutpostsByRegion(r)
        );
        perRegion(
            "outposts_sites.json",
            (r) => rs.getOutpostSitesByRegion(r)
        );

        // Image Builder
        perRegion(
            "imagebuilder_infra_configs.json",
            (r) => rs.getInfraConfigsByRegion(r)
        );

        // CodeDeploy
        perRegion(
            "codedeploy_deployment_groups.json",
            (r) => rs.getDeploymentGroupsByRegion(r)
        );

        // MediaConnect
        perRegion(
            "mediaconnect_flows.json",
            (r) => rs.getMediaConnectFlowsByRegion(r)
        );

        // SageMaker
        perRegion(
            "sagemaker_notebooks.json",
            (r) => rs.getNotebookInstancesByRegion(r)
        );

    }

    #write (filename: string, data: unknown): void {

        const filePath = join(
            this.#outputDir,
            filename
        );
        writeFileSync(
            filePath,
            JSON.stringify(
                data,
                null,
                2
            )
        );

    }

}

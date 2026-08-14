import {DirectedGraph} from "graphology";
import type {Inventory} from "./inventory.js";

/**
 * Builds a directed graph of AWS resources and their relationships.
 *
 * Node strategy:
 * - Every resource becomes a node identified by its AWS ID
 * - The `resourcetype` attribute enables filtering/styling per type
 * - The `label` attribute is the human-readable name (from Name tag or ID)
 *
 * Edge strategy:
 * - Directed edges represent "belongs to" / "uses" / "attached to" relationships
 * - Direction: child → parent (e.g., subnet → vpc, instance → subnet)
 * - This means: following edges from a leaf leads you to the containing infrastructure
 */
export class GraphBuilder {

    #graph: DirectedGraph;

    /** When true, #addEdgeSafe is a no-op (nodes-only pass). */
    #nodeOnlyPass = false;

    constructor () {

        this.#graph = new DirectedGraph();

    }

    /**
     * Build the full resource graph from loaded data.
     * Call after inventory.loadResources() has completed.
     */
    build (inventory: Inventory): DirectedGraph {

        // ── Pass 1: nodes only ──────────────────────────────────────────
        this.#nodeOnlyPass = true;
        this.#addOrganizationsResources(inventory);
        this.#addRegionNodes(inventory);
        this.#addIamResources(inventory);
        this.#addAcmResources(inventory);
        this.#addKmsResources(inventory);
        this.#addEfsResources(inventory);
        this.#addS3Resources(inventory);
        this.#addS3TablesResources(inventory);
        this.#addDynamoDBResources(inventory);
        this.#addEcrResources(inventory);
        this.#addEcsResources(inventory);
        this.#addElbv2Resources(inventory);
        this.#addSnsResources(inventory);
        this.#addSqsResources(inventory);
        this.#addRoute53Resources(inventory);
        this.#addEksResources(inventory);
        this.#addSecretsManagerResources(inventory);
        this.#addCloudFrontResources(inventory);
        this.#addAutoScalingResources(inventory);
        this.#addRdsResources(inventory);
        this.#addApiGatewayResources(inventory);
        this.#addWafResources(inventory);
        this.#addElastiCacheResources(inventory);
        this.#addEventBridgeResources(inventory);
        this.#addSfnResources(inventory);
        this.#addKinesisResources(inventory);
        this.#addOpenSearchResources(inventory);
        this.#addCodeBuildResources(inventory);
        this.#addCognitoResources(inventory);
        this.#addServiceDiscoveryResources(inventory);
        this.#addBackupResources(inventory);
        this.#addGlacierResources(inventory);
        this.#addCodeArtifactResources(inventory);
        this.#addMskResources(inventory);
        this.#addRedshiftResources(inventory);
        this.#addNeptuneResources(inventory);
        this.#addDocDbResources(inventory);
        this.#addFsxResources(inventory);
        this.#addNetworkFirewallResources(inventory);
        this.#addCodePipelineResources(inventory);
        this.#addCloudTrailResources(inventory);
        this.#addSsmResources(inventory);
        this.#addCloudFormationResources(inventory);
        this.#addMqResources(inventory);
        this.#addMwaaResources(inventory);
        this.#addAppRunnerResources(inventory);
        this.#addTransferResources(inventory);
        this.#addVpcLatticeResources(inventory);
        this.#addNetworkManagerResources(inventory);
        this.#addIotResources(inventory);
        this.#addGlueResources(inventory);
        this.#addDmsResources(inventory);
        this.#addRoute53ResolverResources(inventory);
        this.#addGlobalAcceleratorResources(inventory);
        this.#addBatchResources(inventory);
        this.#addMemoryDbResources(inventory);
        this.#addEmrResources(inventory);
        this.#addEmrServerlessResources(inventory);
        this.#addBeanstalkResources(inventory);
        this.#addAthenaResources(inventory);
        this.#addDataSyncResources(inventory);
        this.#addAppSyncResources(inventory);
        this.#addRedshiftServerlessResources(inventory);
        this.#addOpenSearchServerlessResources(inventory);
        this.#addDirectoryServiceResources(inventory);
        this.#addWorkspacesResources(inventory);
        this.#addCloudHsmResources(inventory);
        this.#addAppMeshResources(inventory);
        this.#addS3ControlResources(inventory);
        this.#addClassicElbResources(inventory);
        this.#addPipesResources(inventory);
        this.#addStorageGatewayResources(inventory);
        this.#addOutpostsResources(inventory);
        this.#addImageBuilderResources(inventory);
        this.#addCodeDeployResources(inventory);
        this.#addMediaConnectResources(inventory);
        this.#addSageMakerResources(inventory);
        this.#addRegionalResources(inventory);

        // ── Pass 2: edges (all nodes exist now) ────────────────────────
        this.#nodeOnlyPass = false;
        this.#addOrganizationsResources(inventory);
        this.#addIamResources(inventory);
        this.#addAcmResources(inventory);
        this.#addKmsResources(inventory);
        this.#addEfsResources(inventory);
        this.#addS3Resources(inventory);
        this.#addS3TablesResources(inventory);
        this.#addDynamoDBResources(inventory);
        this.#addEcrResources(inventory);
        this.#addEcsResources(inventory);
        this.#addElbv2Resources(inventory);
        this.#addSnsResources(inventory);
        this.#addSqsResources(inventory);
        this.#addRoute53Resources(inventory);
        this.#addEksResources(inventory);
        this.#addSecretsManagerResources(inventory);
        this.#addCloudFrontResources(inventory);
        this.#addAutoScalingResources(inventory);
        this.#addRdsResources(inventory);
        this.#addApiGatewayResources(inventory);
        this.#addWafResources(inventory);
        this.#addElastiCacheResources(inventory);
        this.#addEventBridgeResources(inventory);
        this.#addSfnResources(inventory);
        this.#addKinesisResources(inventory);
        this.#addOpenSearchResources(inventory);
        this.#addCodeBuildResources(inventory);
        this.#addCognitoResources(inventory);
        this.#addServiceDiscoveryResources(inventory);
        this.#addBackupResources(inventory);
        this.#addGlacierResources(inventory);
        this.#addCodeArtifactResources(inventory);
        this.#addMskResources(inventory);
        this.#addRedshiftResources(inventory);
        this.#addNeptuneResources(inventory);
        this.#addDocDbResources(inventory);
        this.#addFsxResources(inventory);
        this.#addNetworkFirewallResources(inventory);
        this.#addCodePipelineResources(inventory);
        this.#addCloudTrailResources(inventory);
        this.#addSsmResources(inventory);
        this.#addCloudFormationResources(inventory);
        this.#addMqResources(inventory);
        this.#addMwaaResources(inventory);
        this.#addAppRunnerResources(inventory);
        this.#addTransferResources(inventory);
        this.#addVpcLatticeResources(inventory);
        this.#addNetworkManagerResources(inventory);
        this.#addIotResources(inventory);
        this.#addGlueResources(inventory);
        this.#addDmsResources(inventory);
        this.#addRoute53ResolverResources(inventory);
        this.#addGlobalAcceleratorResources(inventory);
        this.#addBatchResources(inventory);
        this.#addMemoryDbResources(inventory);
        this.#addEmrResources(inventory);
        this.#addEmrServerlessResources(inventory);
        this.#addBeanstalkResources(inventory);
        this.#addAthenaResources(inventory);
        this.#addDataSyncResources(inventory);
        this.#addAppSyncResources(inventory);
        this.#addRedshiftServerlessResources(inventory);
        this.#addOpenSearchServerlessResources(inventory);
        this.#addDirectoryServiceResources(inventory);
        this.#addWorkspacesResources(inventory);
        this.#addCloudHsmResources(inventory);
        this.#addAppMeshResources(inventory);
        this.#addS3ControlResources(inventory);
        this.#addClassicElbResources(inventory);
        this.#addPipesResources(inventory);
        this.#addStorageGatewayResources(inventory);
        this.#addOutpostsResources(inventory);
        this.#addImageBuilderResources(inventory);
        this.#addCodeDeployResources(inventory);
        this.#addMediaConnectResources(inventory);
        this.#addSageMakerResources(inventory);
        this.#addRegionalResources(inventory);

        // ── Pass 3: connect isolated nodes to their region ─────────────
        this.#connectOrphanedNodes();

        return this.#graph;

    }

    // ─── Organizations ─────────────────────────────────────────────────────

    #addOrganizationsResources (rs: Inventory): void {

        // Org Roots
        for (const root of rs.getOrgRoots()) {

            this.#addNode(
                root.Id,
                "orgroot",
                root.Name ?? root.Id
            );

        }

        // Organizational Units
        for (const ouWithParent of rs.getOrgOUs()) {

            const ou = ouWithParent.ou;

            this.#addNode(
                ou.Id,
                "orgou",
                ou.Name ?? ou.Id
            );

            this.#addEdgeSafe(
                ou.Id,
                ouWithParent.parentId
            );

        }

        // Accounts
        for (const account of rs.getOrgAccounts()) {

            this.#addNode(
                account.Id,
                "orgaccount",
                account.Name ?? account.Id
            );

        }

        // Policies
        for (const policy of rs.getOrgPolicies()) {

            const id = policy.Arn ?? policy.Id;
            if (!id) {

                continue;

            }

            this.#addNode(
                id,
                "orgpolicy",
                policy.Name ?? id
            );

            // policy → org root (policies are org-level resources)
            const roots = rs.getOrgRoots();
            if (roots.length > 0 && roots[0].Id) {

                this.#addEdgeSafe(
                    id,
                    roots[0].Id
                );

            }

        }

    }

    // ─── Regions ─────────────────────────────────────────────────────────

    #addRegionNodes (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const region = reg.RegionName;
            if (!region) {

                continue;

            }

            this.#addNode(
                region,
                "region",
                region,
                {"status": reg.RegionOptStatus}
            );

        }

    }

    // ─── ACM (regional) ────────────────────────────────────────────────

    #addAcmResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const cert of rs.getCertificatesByRegion(regionName)) {

                const arn = cert.CertificateArn;
                if (!arn) {

                    continue;

                }
                this.#addNode(
                    arn,
                    "certificate",
                    cert.DomainName ?? arn,
                    {
                        "region": regionName,
                        "status": cert.Status ?? "",
                        "type": cert.Type ?? "",
                        "inUse": cert.InUse ?? false
                    }
                );
                // certificate → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

        }

        /*
         * After all certificates are added as nodes, link listeners → certificates
         * (Listeners reference certificate ARNs in their Certificates field)
         */
        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const listener of rs.getListenersByRegion(regionName)) {

                for (const certRef of listener.Certificates ?? []) {

                    if (certRef.CertificateArn) {

                        // listener → certificate
                        this.#addEdgeSafe(
                            listener.ListenerArn,
                            certRef.CertificateArn
                        );

                    }

                }

            }

        }

    }


    // ─── KMS (regional) ──────────────────────────────────────────────────

    #addKmsResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const key of rs.getKeysByRegion(regionName)) {

                const arn = key.KeyArn;
                if (!arn) {

                    continue;

                }

                // Use alias name as label if available, otherwise key ID
                const aliases = rs.getAliasesByKeyId(key.KeyId ?? "");
                const aliasName = aliases.find((a) => !a.AliasName?.startsWith("alias/aws/"))?.AliasName ??
                  aliases[0]?.AliasName ??
                  key.KeyId ??
                  arn;

                this.#addNode(
                    arn,
                    "kmskey",
                    aliasName,
                    {"region": regionName}
                );
                // key → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

        }

    }

    // ─── EFS (regional) ──────────────────────────────────────────────────

    #addEfsResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const fs of rs.getFileSystemsByRegion(regionName)) {

                const arn = fs.FileSystemArn;
                if (!arn) {

                    continue;

                }
                this.#addNode(
                    arn,
                    "filesystem",
                    fs.Name ?? fs.FileSystemId ?? arn,
                    {
                        "region": regionName,
                        "lifecycleState": fs.LifeCycleState ?? "",
                        "encrypted": fs.Encrypted ?? false,
                        "performanceMode": fs.PerformanceMode ?? "",
                        "throughputMode": fs.ThroughputMode ?? ""
                    }
                );
                // file system → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                // file system → KMS key (if encrypted)
                if (fs.KmsKeyId) {

                    this.#addEdgeSafe(
                        arn,
                        fs.KmsKeyId
                    );

                }

                // Mount targets
                for (const mt of rs.getMountTargetsByFileSystem(fs.FileSystemId ?? "")) {

                    const mtId = mt.MountTargetId;
                    if (!mtId) {

                        continue;

                    }
                    this.#addNode(
                        mtId,
                        "mounttarget",
                        mtId,
                        {"availabilityZone": mt.AvailabilityZoneName ?? ""}
                    );
                    // mount target → file system
                    this.#addEdgeSafe(
                        mtId,
                        arn
                    );
                    // mount target → subnet
                    this.#addEdgeSafe(
                        mtId,
                        mt.SubnetId
                    );

                }

            }

            // Access Points
            for (const ap of rs.getAccessPointsByRegion(regionName)) {

                const arn = ap.AccessPointArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "efsaccesspoint",
                    ap.Name ?? ap.AccessPointId ?? arn
                );
                // access point → file system
                if (ap.FileSystemId) {

                    const fileSystems = rs.getFileSystemsByRegion(regionName);
                    const fs = fileSystems.find((f) => f.FileSystemId === ap.FileSystemId);
                    if (fs?.FileSystemId) {

                        this.#addEdgeSafe(
                            arn,
                            "arn:aws:elasticfilesystem:" + regionName + ":" + (fs.OwnerId ?? "") + ":file-system/" + fs.FileSystemId
                        );

                    }

                }

            }

        }

    }

    // ─── Auto Scaling (regional) ────────────────────────────────────────

    #addAutoScalingResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const asg of rs.getAutoScalingGroupsByRegion(regionName)) {

                const arn = asg.AutoScalingGroupARN;
                if (!arn) {

                    continue;

                }
                this.#addNode(
                    arn,
                    "autoscalinggroup",
                    asg.AutoScalingGroupName ?? arn,
                    {
                        "region": regionName,
                        "minSize": asg.MinSize ?? 0,
                        "maxSize": asg.MaxSize ?? 0,
                        "desiredCapacity": asg.DesiredCapacity ?? 0
                    },
                    asg.Tags?.map((t) => ({"Key": t.Key,
                        "Value": t.Value}))
                );
                // asg → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                // asg → launch template
                if (asg.LaunchTemplate?.LaunchTemplateId) {

                    this.#addEdgeSafe(
                        arn,
                        asg.LaunchTemplate.LaunchTemplateId
                    );

                }
                // asg → target groups
                for (const tgArn of asg.TargetGroupARNs ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        tgArn
                    );

                }
                // asg → subnets (VPCZoneIdentifier is comma-separated)
                if (asg.VPCZoneIdentifier) {

                    for (const subnetId of asg.VPCZoneIdentifier.split(",")) {

                        this.#addEdgeSafe(
                            arn,
                            subnetId.trim()
                        );

                    }

                }

            }

            // Launch Configurations
            for (const lc of rs.getLaunchConfigsByRegion(regionName)) {

                const lcArn = lc.LaunchConfigurationARN;
                if (!lcArn) {

                    continue;

                }

                this.#addNode(
                    lcArn,
                    "launchconfiguration",
                    lc.LaunchConfigurationName ?? lcArn,
                    {"instanceType": lc.InstanceType}
                );
                // launch config → region
                this.#addEdgeSafe(
                    lcArn,
                    regionName
                );

            }

            // Scaling Policies
            for (const policy of rs.getScalingPoliciesByRegion(regionName)) {

                const policyArn = policy.PolicyARN;
                if (!policyArn) {

                    continue;

                }

                this.#addNode(
                    policyArn,
                    "scalingpolicy",
                    policy.PolicyName ?? policyArn,
                    {"policyType": policy.PolicyType}
                );
                // scaling policy → ASG
                const asgName = policy.AutoScalingGroupName;
                if (asgName) {

                    const asg = rs.getAutoScalingGroupsByRegion(regionName).find((g) => g.AutoScalingGroupName === asgName);
                    if (asg?.AutoScalingGroupARN) {

                        this.#addEdgeSafe(
                            policyArn,
                            asg.AutoScalingGroupARN
                        );

                    }

                }

            }

            // Lifecycle Hooks
            for (const hook of rs.getLifecycleHooksByRegion(regionName)) {

                const name = hook.LifecycleHookName;
                if (!name) {

                    continue;

                }

                const hookId = `${hook.AutoScalingGroupName ?? ""}/${name}`;
                this.#addNode(
                    hookId,
                    "lifecyclehook",
                    name,
                    {"transition": hook.LifecycleTransition}
                );
                // hook → ASG
                const asg = rs.getAutoScalingGroupsByRegion(regionName).
                    find((g) => g.AutoScalingGroupName === hook.AutoScalingGroupName);
                if (asg?.AutoScalingGroupARN) {

                    this.#addEdgeSafe(
                        hookId,
                        asg.AutoScalingGroupARN
                    );

                }
                // hook → IAM role
                if (hook.RoleARN) {

                    this.#addEdgeSafe(
                        hookId,
                        hook.RoleARN
                    );

                }
                // hook → notification target (SNS/SQS)
                if (hook.NotificationTargetARN) {

                    this.#addEdgeSafe(
                        hookId,
                        hook.NotificationTargetARN
                    );

                }

            }

        }

    }

    // ─── RDS (regional) ─────────────────────────────────────────────────

    #addRdsResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            // DB Clusters
            for (const cluster of rs.getDBClustersByRegion(regionName)) {

                const arn = cluster.DBClusterArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "dbcluster",
                    cluster.DBClusterIdentifier ?? arn,
                    undefined,
                    cluster.TagList
                );
                // cluster → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                // cluster → VPC security groups
                for (const sg of cluster.VpcSecurityGroups ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        sg.VpcSecurityGroupId
                    );

                }
                // cluster → KMS key
                if (cluster.KmsKeyId) {

                    this.#addEdgeSafe(
                        arn,
                        cluster.KmsKeyId
                    );

                }

            }

            // DB Instances
            for (const instance of rs.getDBInstancesByRegion(regionName)) {

                const arn = instance.DBInstanceArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "dbinstance",
                    instance.DBInstanceIdentifier ?? arn,
                    undefined,
                    instance.TagList
                );
                // instance → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                // instance → subnets
                for (const subnet of instance.DBSubnetGroup?.Subnets ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        subnet.SubnetIdentifier
                    );

                }
                // instance → VPC security groups
                for (const sg of instance.VpcSecurityGroups ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        sg.VpcSecurityGroupId
                    );

                }
                // instance → KMS key
                if (instance.KmsKeyId) {

                    this.#addEdgeSafe(
                        arn,
                        instance.KmsKeyId
                    );

                }
                // instance → DB cluster
                if (instance.DBClusterIdentifier) {

                    const clusters = rs.getDBClustersByRegion(regionName);
                    const cluster = clusters.find((c) => c.DBClusterIdentifier === instance.DBClusterIdentifier);
                    if (cluster?.DBClusterArn) {

                        this.#addEdgeSafe(
                            arn,
                            cluster.DBClusterArn
                        );

                    }

                }

            }

            // DB Proxies
            for (const proxy of rs.getDBProxiesByRegion(regionName)) {

                const proxyArn = proxy.DBProxyArn;
                if (!proxyArn) {

                    continue;

                }

                this.#addNode(
                    proxyArn,
                    "dbproxy",
                    proxy.DBProxyName ?? proxyArn
                );
                // proxy → region
                this.#addEdgeSafe(
                    proxyArn,
                    regionName
                );
                // proxy → subnets
                for (const subnetId of proxy.VpcSubnetIds ?? []) {

                    this.#addEdgeSafe(
                        proxyArn,
                        subnetId
                    );

                }
                // proxy → security groups
                for (const sgId of proxy.VpcSecurityGroupIds ?? []) {

                    this.#addEdgeSafe(
                        proxyArn,
                        sgId
                    );

                }
                // proxy → IAM role
                if (proxy.RoleArn) {

                    const resolvedRole = rs.getRoleByArn(proxy.RoleArn);
                    this.#addEdgeSafe(
                        proxyArn,
                        resolvedRole?.RoleId
                    );

                }

            }

            // DB Subnet Groups
            for (const sg of rs.getDBSubnetGroupsByRegion(regionName)) {

                const arn = sg.DBSubnetGroupArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "dbsubnetgroup",
                    sg.DBSubnetGroupName ?? arn
                );
                // subnet group → VPC
                this.#addEdgeSafe(
                    arn,
                    sg.VpcId
                );
                // subnet group → subnets
                for (const subnet of sg.Subnets ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        subnet.SubnetIdentifier
                    );

                }

            }

            // DB Proxy Target Groups
            for (const tg of rs.getDBProxyTargetGroupsByRegion(regionName)) {

                const arn = tg.TargetGroupArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "dbproxytargetgroup",
                    tg.TargetGroupName ?? arn,
                    {"status": tg.Status}
                );
                // target group → proxy (find proxy by name)
                const proxy = rs.getDBProxiesByRegion(regionName).
                    find((p) => p.DBProxyName === tg.DBProxyName);
                if (proxy?.DBProxyArn) {

                    this.#addEdgeSafe(
                        arn,
                        proxy.DBProxyArn
                    );

                }

            }

        }

    }

    // ─── API Gateway (regional) ─────────────────────────────────────────

    #addApiGatewayResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            // REST APIs
            for (const api of rs.getRestApisByRegion(regionName)) {

                const id = api.id;
                if (!id) {

                    continue;

                }

                this.#addNode(
                    id,
                    "restapi",
                    api.name ?? id
                );
                // api → region
                this.#addEdgeSafe(
                    id,
                    regionName
                );
                // api → VPC endpoints (for PRIVATE APIs)
                for (const vpceId of api.endpointConfiguration?.vpcEndpointIds ?? []) {

                    this.#addEdgeSafe(
                        id,
                        vpceId
                    );

                }

            }

            // HTTP APIs
            for (const api of rs.getHttpApisByRegion(regionName)) {

                const id = api.ApiId;
                if (!id) {

                    continue;

                }

                this.#addNode(
                    id,
                    "httpapi",
                    api.Name ?? id
                );
                // api → region
                this.#addEdgeSafe(
                    id,
                    regionName
                );

            }

            // VPC Links
            for (const link of rs.getVpcLinksByRegion(regionName)) {

                const id = link.id;
                if (!id) {

                    continue;

                }
                this.#addNode(
                    id,
                    "vpclink",
                    link.name ?? id,
                    {"status": link.status ?? ""}
                );
                this.#addEdgeSafe(
                    id,
                    regionName
                );
                // VPC link → NLB target ARNs
                for (const targetArn of link.targetArns ?? []) {

                    this.#addEdgeSafe(
                        id,
                        targetArn
                    );

                }

            }

            // HTTP API VPC Links (apigatewayv2)
            for (const link of rs.getHttpVpcLinksByRegion(regionName)) {

                const id = link.VpcLinkId;
                if (!id) {

                    continue;

                }

                this.#addNode(
                    id,
                    "httpvpclink",
                    link.Name ?? id,
                    {"status": link.VpcLinkStatus}
                );
                this.#addEdgeSafe(
                    id,
                    regionName
                );
                // HTTP VPC link → subnets
                for (const subnetId of link.SubnetIds ?? []) {

                    this.#addEdgeSafe(
                        id,
                        subnetId
                    );

                }
                // HTTP VPC link → security groups
                for (const sgId of link.SecurityGroupIds ?? []) {

                    this.#addEdgeSafe(
                        id,
                        sgId
                    );

                }

            }

            // Domain Names
            for (const domain of rs.getDomainNamesByRegion(regionName)) {

                const name = domain.domainName;
                if (!name) {

                    continue;

                }
                this.#addNode(
                    name,
                    "apidomainname",
                    name,
                    {"status": domain.domainNameStatus ?? ""}
                );
                this.#addEdgeSafe(
                    name,
                    regionName
                );
                // domain → ACM certificate
                if (domain.certificateArn) {

                    this.#addEdgeSafe(
                        name,
                        domain.certificateArn
                    );

                }

            }

            // Usage Plans
            for (const plan of rs.getUsagePlansByRegion(regionName)) {

                const id = plan.id;
                if (!id) {

                    continue;

                }
                this.#addNode(
                    id,
                    "usageplan",
                    plan.name ?? id
                );
                this.#addEdgeSafe(
                    id,
                    regionName
                );
                // usage plan → REST APIs (via apiStages)
                for (const stage of plan.apiStages ?? []) {

                    if (stage.apiId) {

                        this.#addEdgeSafe(
                            id,
                            stage.apiId
                        );

                    }

                }

            }

        }

    }

    // ─── S3 (global) ────────────────────────────────────────────────────

    #addS3Resources (rs: Inventory): void {

        for (const bucketInfo of rs.getBuckets()) {

            const name = bucketInfo.bucket.Name;
            if (!name) {

                continue;

            }

            this.#addNode(
                name,
                "s3bucket",
                name,
                {"region": bucketInfo.region},
                bucketInfo.tags
            );

            // bucket → region
            this.#addEdgeSafe(
                name,
                bucketInfo.region
            );

            // bucket → Lambda (via notification configuration)
            for (const config of bucketInfo.notificationConfiguration?.LambdaFunctionConfigurations ?? []) {

                this.#addEdgeSafe(
                    name,
                    config.LambdaFunctionArn
                );

            }

            // bucket → SNS topics (via notification configuration)
            for (const config of bucketInfo.notificationConfiguration?.TopicConfigurations ?? []) {

                this.#addEdgeSafe(
                    name,
                    config.TopicArn
                );

            }

            // bucket → SQS queues (via notification configuration)
            for (const config of bucketInfo.notificationConfiguration?.QueueConfigurations ?? []) {

                this.#addEdgeSafe(
                    name,
                    config.QueueArn
                );

            }

        }

        // Directory Buckets
        for (const dirBucket of rs.getDirectoryBuckets()) {

            this.#addNode(
                dirBucket.name,
                "directorybucket",
                dirBucket.name
            );

        }

    }

    // ─── S3 Tables (regional) ────────────────────────────────────────────

    #addS3TablesResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            // Table Buckets
            for (const bucket of rs.getTableBucketsByRegion(regionName)) {

                if (!bucket.arn) {

                    continue;

                }
                this.#addNode(
                    bucket.arn,
                    "s3tablebucket",
                    bucket.name ?? bucket.arn,
                    {"region": regionName}
                );
                // table bucket → region
                this.#addEdgeSafe(
                    bucket.arn,
                    regionName
                );

            }

            // Namespaces
            for (const ns of rs.getNamespacesByRegion(regionName)) {

                const nsName = ns.namespace?.join("/");
                if (!nsName) {

                    continue;

                }
                // Build a unique ID using namespace + createdBy info
                const nsId = `s3table-ns:${regionName}:${nsName}:${ns.createdBy ?? ""}`;
                this.#addNode(
                    nsId,
                    "s3tablenamespace",
                    nsName,
                    {"region": regionName}
                );

                // namespace → table bucket (find the bucket that contains this namespace)
                for (const bucket of rs.getTableBucketsByRegion(regionName)) {

                    if (bucket.arn) {

                        this.#addEdgeSafe(
                            nsId,
                            bucket.arn
                        );

                    }

                }

            }

            // Tables
            for (const table of rs.getTablesByRegion(regionName)) {

                const tableARN = table.tableARN;
                if (!tableARN) {

                    continue;

                }
                this.#addNode(
                    tableARN,
                    "s3table",
                    table.name ?? tableARN,
                    {
                        "region": regionName,
                        "namespace": table.namespace?.join("/") ?? ""
                    }
                );

                // table → namespace
                const nsName = table.namespace?.join("/");
                if (nsName) {

                    // Find the matching namespace node
                    for (const ns of rs.getNamespacesByRegion(regionName)) {

                        if (ns.namespace?.join("/") === nsName) {

                            const nsId = `s3table-ns:${regionName}:${nsName}:${ns.createdBy ?? ""}`;
                            this.#addEdgeSafe(
                                tableARN,
                                nsId
                            );
                            break;

                        }

                    }

                }

            }

        }

    }

    // ─── DynamoDB (regional) ────────────────────────────────────────────

    #addDynamoDBResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const table of rs.getDynamoDBTablesByRegion(regionName)) {

                const tableArn = table.TableArn;
                if (!tableArn) {

                    continue;

                }
                this.#addNode(
                    tableArn,
                    "dynamodbtable",
                    table.TableName ?? tableArn,
                    {
                        "region": regionName,
                        "status": table.TableStatus ?? "",
                        "itemCount": table.ItemCount ?? 0,
                        "sizeBytes": table.TableSizeBytes ?? 0
                    }
                );

                // table → region
                this.#addEdgeSafe(
                    tableArn,
                    regionName
                );

                // table → stream (Lambda event source mappings will connect via ARN)
                if (table.LatestStreamArn) {

                    this.#addEdgeSafe(
                        tableArn,
                        table.LatestStreamArn
                    );

                }

            }

        }

    }

    // ─── ECR (regional + public global) ─────────────────────────────────

    #addEcrResources (rs: Inventory): void {

        // ECR (regional)
        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const repo of rs.getEcrRepositoriesByRegion(regionName)) {

                const arn = repo.repositoryArn;
                if (!arn) {

                    continue;

                }
                this.#addNode(
                    arn,
                    "ecrrepository",
                    repo.repositoryName ?? arn,
                    {"region": regionName}
                );
                // repo → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

        }

    }

    // ─── ECS (regional) ──────────────────────────────────────────────────

    #addEcsResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            // Clusters
            for (const cluster of rs.getEcsClustersByRegion(regionName)) {

                const arn = cluster.clusterArn;
                if (!arn) {

                    continue;

                }
                this.#addNode(
                    arn,
                    "ecscluster",
                    cluster.clusterName ?? arn,
                    {
                        "region": regionName,
                        "status": cluster.status ?? "",
                        "runningTasks": cluster.runningTasksCount ?? 0,
                        "activeServices": cluster.activeServicesCount ?? 0
                    },
                    cluster.tags?.map((t) => ({"Key": t.key,
                        "Value": t.value}))
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

            // Services
            for (const svc of rs.getEcsServicesByRegion(regionName)) {

                const arn = svc.serviceArn;
                if (!arn) {

                    continue;

                }
                this.#addNode(
                    arn,
                    "ecsservice",
                    svc.serviceName ?? arn,
                    {
                        "region": regionName,
                        "launchType": svc.launchType ?? "",
                        "desiredCount": svc.desiredCount ?? 0
                    },
                    svc.tags?.map((t) => ({"Key": t.key,
                        "Value": t.value}))
                );
                // service → cluster
                this.#addEdgeSafe(
                    arn,
                    svc.clusterArn
                );
                // service → IAM role
                if (svc.roleArn) {

                    const role = rs.getRoleByArn(svc.roleArn);
                    this.#addEdgeSafe(
                        arn,
                        role?.RoleId
                    );

                }
                // service → target groups (load balancer integration)
                for (const lb of svc.loadBalancers ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        lb.targetGroupArn
                    );

                }
                // service → subnets and security groups
                const vpcConfig = svc.networkConfiguration?.awsvpcConfiguration;
                if (vpcConfig) {

                    for (const subnet of vpcConfig.subnets ?? []) {

                        this.#addEdgeSafe(
                            arn,
                            subnet
                        );

                    }
                    for (const sg of vpcConfig.securityGroups ?? []) {

                        this.#addEdgeSafe(
                            arn,
                            sg
                        );

                    }

                }

            }

            // Task Definitions
            for (const tdArn of rs.getEcsTaskDefinitionArnsByRegion(regionName)) {

                // ARN format: arn:aws:ecs:region:account:task-definition/family:revision
                const parts = tdArn.split("/");
                const familyRevision = parts[parts.length - 1];

                this.#addNode(
                    tdArn,
                    "taskdefinition",
                    familyRevision,
                    {"region": regionName}
                );
                // task definition → region
                this.#addEdgeSafe(
                    tdArn,
                    regionName
                );

            }

            // Container Instances
            for (const ciInfo of rs.getEcsContainerInstancesByRegion(regionName)) {

                const ci = ciInfo.containerInstance;
                const ciArn = ci.containerInstanceArn;
                if (!ciArn) {

                    continue;

                }

                this.#addNode(
                    ciArn,
                    "containerinstance",
                    ciArn,
                    {
                        "region": regionName,
                        "status": ci.status ?? "",
                        "runningTasks": ci.runningTasksCount ?? 0
                    }
                );
                // container instance → cluster
                this.#addEdgeSafe(
                    ciArn,
                    ciInfo.clusterArn
                );
                // container instance → EC2 instance
                this.#addEdgeSafe(
                    ciArn,
                    ci.ec2InstanceId
                );

            }

        }

    }

    // ─── ELBv2 (regional) ────────────────────────────────────────────────

    #addElbv2Resources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            // Load Balancers
            for (const lb of rs.getLoadBalancersByRegion(regionName)) {

                const arn = lb.LoadBalancerArn;
                if (!arn) {

                    continue;

                }
                this.#addNode(
                    arn,
                    "loadbalancer",
                    lb.LoadBalancerName ?? arn,
                    {
                        "region": regionName,
                        "type": lb.Type ?? "",
                        "scheme": lb.Scheme ?? "",
                        "dnsName": lb.DNSName ?? ""
                    },
                    rs.getElbv2TagsByArn(arn)
                );
                // lb → VPC
                this.#addEdgeSafe(
                    arn,
                    lb.VpcId
                );
                // lb → security groups
                for (const sg of lb.SecurityGroups ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        sg
                    );

                }
                // lb → subnets
                for (const az of lb.AvailabilityZones ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        az.SubnetId
                    );

                }

            }

            // Target Groups
            for (const tg of rs.getTargetGroupsByRegion(regionName)) {

                const arn = tg.TargetGroupArn;
                if (!arn) {

                    continue;

                }
                this.#addNode(
                    arn,
                    "targetgroup",
                    tg.TargetGroupName ?? arn,
                    {
                        "region": regionName,
                        "protocol": tg.Protocol ?? "",
                        "port": tg.Port ?? 0,
                        "targetType": tg.TargetType ?? ""
                    },
                    rs.getElbv2TagsByArn(arn)
                );
                // target group → VPC
                this.#addEdgeSafe(
                    arn,
                    tg.VpcId
                );
                // target group → load balancer
                for (const lbArn of tg.LoadBalancerArns ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        lbArn
                    );

                }

            }

            // Listeners
            for (const listener of rs.getListenersByRegion(regionName)) {

                const arn = listener.ListenerArn;
                if (!arn) {

                    continue;

                }
                this.#addNode(
                    arn,
                    "listener",
                    `${listener.Protocol ?? ""}:${String(listener.Port ?? "")}`,
                    {"region": regionName}
                );
                // listener → load balancer
                this.#addEdgeSafe(
                    arn,
                    listener.LoadBalancerArn
                );
                // listener → target group (default action)
                for (const action of listener.DefaultActions ?? []) {

                    if (action.TargetGroupArn) {

                        this.#addEdgeSafe(
                            arn,
                            action.TargetGroupArn
                        );

                    }

                }
                // listener → additional certificates
                for (const certArn of rs.getListenerCertificateArns(arn)) {

                    this.#addEdgeSafe(
                        arn,
                        certArn
                    );

                }

            }

            // Rules
            for (const ruleWithListener of rs.getRulesByRegion(regionName)) {

                const rule = ruleWithListener.rule;

                if (rule.IsDefault === true) {

                    continue;

                }

                const ruleArn = rule.RuleArn;
                if (!ruleArn) {

                    continue;

                }

                this.#addNode(
                    ruleArn,
                    "listenerrule",
                    "Rule " + (rule.Priority ?? ""),
                    {"region": regionName}
                );

                // rule → listener
                this.#addEdgeSafe(
                    ruleArn,
                    ruleWithListener.listenerArn
                );

                // rule → target groups
                for (const action of rule.Actions ?? []) {

                    if (action.TargetGroupArn) {

                        this.#addEdgeSafe(
                            ruleArn,
                            action.TargetGroupArn
                        );

                    }

                }

            }

            // Trust Stores
            for (const ts of rs.getTrustStoresByRegion(regionName)) {

                const arn = ts.TrustStoreArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "truststore",
                    ts.Name ?? arn,
                    {"status": ts.Status}
                );
                // trust store → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

            // Trust Store Associations (trust store → listener)
            for (const assoc of rs.getTrustStoreAssociationsByRegion(regionName)) {

                if (assoc.ResourceArn) {

                    // find which trust store this association belongs to
                    for (const ts of rs.getTrustStoresByRegion(regionName)) {

                        if (ts.TrustStoreArn) {

                            this.#addEdgeSafe(
                                assoc.ResourceArn,
                                ts.TrustStoreArn
                            );

                        }

                    }

                }

            }

        }

    }

    // ─── SNS (regional) ──────────────────────────────────────────────────

    #addSnsResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            // Topics
            for (const topic of rs.getTopicsByRegion(regionName)) {

                const arn = topic.TopicArn;
                if (!arn) {

                    continue;

                }
                const name = arn.split(":").pop() ?? arn;
                this.#addNode(
                    arn,
                    "snstopic",
                    name,
                    {"region": regionName}
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

            // Subscriptions
            for (const sub of rs.getSubscriptionsByRegion(regionName)) {

                const arn = sub.SubscriptionArn;
                if (!arn || arn === "PendingConfirmation") {

                    continue;

                }
                this.#addNode(
                    arn,
                    "snssubscription",
                    `${sub.Protocol ?? ""}→${(sub.Endpoint ?? "").split(":").pop() ?? ""}`,
                    {
                        "region": regionName,
                        "protocol": sub.Protocol ?? ""
                    }
                );
                // subscription → topic
                this.#addEdgeSafe(
                    arn,
                    sub.TopicArn
                );
                // subscription → endpoint (Lambda, SQS, etc.)
                this.#addEdgeSafe(
                    arn,
                    sub.Endpoint
                );

            }

        }

    }

    // ─── SQS (regional) ──────────────────────────────────────────────────

    #addSqsResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const queue of rs.getQueuesByRegion(regionName)) {

                const id = queue.queueArn ?? queue.queueUrl;
                if (!id) {

                    continue;

                }
                this.#addNode(
                    id,
                    "sqsqueue",
                    queue.queueName ?? id,
                    {"region": regionName},
                    queue.tags
                        ? Object.entries(queue.tags).map(([
                            key,
                            value
                        ]) => ({"Key": key,
                            "Value": value}))
                        : undefined
                );
                this.#addEdgeSafe(
                    id,
                    regionName
                );

            }

        }

        // DLQ source edges: source queue → DLQ
        for (const edge of rs.getDlqSourceEdges()) {

            this.#addEdgeSafe(
                edge.sourceArn,
                edge.dlqArn
            );

        }

    }

    // ─── Route 53 (global) ───────────────────────────────────────────────

    #addRoute53Resources (rs: Inventory): void {

        // Hosted Zones
        for (const zone of rs.getHostedZones()) {

            if (!zone.Id) {

                continue;

            }
            this.#addNode(
                zone.Id,
                "hostedzone",
                zone.Name ?? zone.Id,
                {"private": zone.Config?.PrivateZone ?? false}
            );

            // Record Sets → targets (CloudFront, ELB, S3, etc.)
            for (const record of rs.getRecordSetsByZone(zone.Id)) {

                // Alias targets: connect zone to the target resource
                if (record.AliasTarget?.DNSName) {

                    /*
                     * TODO: Try to find matching CloudFront distribution or ELB by DNS
                     * Edge: hostedzone → target is implicit via DNS name matching
                     */

                }

            }

        }

        // Health Checks
        for (const healthCheck of rs.getRoute53HealthChecks()) {

            const healthCheckId = healthCheck.Id;
            if (!healthCheckId) {

                continue;

            }

            this.#addNode(
                healthCheckId,
                "route53healthcheck",
                healthCheckId
            );

        }

    }

    // ─── EKS (regional) ──────────────────────────────────────────────────

    #addEksResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            // Clusters
            for (const cluster of rs.getEksClustersByRegion(regionName)) {

                const arn = cluster.arn;
                if (!arn) {

                    continue;

                }
                this.#addNode(
                    arn,
                    "ekscluster",
                    cluster.name ?? arn,
                    {
                        "region": regionName,
                        "version": cluster.version ?? "",
                        "status": cluster.status ?? ""
                    },
                    cluster.tags
                        ? Object.entries(cluster.tags).map(([
                            key,
                            value
                        ]) => ({"Key": key,
                            "Value": value}))
                        : undefined
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                // cluster → IAM role
                if (cluster.roleArn) {

                    const resolvedRole = rs.getRoleByArn(cluster.roleArn);
                    this.#addEdgeSafe(
                        arn,
                        resolvedRole?.RoleId
                    );

                }
                // cluster → VPC
                this.#addEdgeSafe(
                    arn,
                    cluster.resourcesVpcConfig?.vpcId
                );
                // cluster → subnets
                for (const subnet of cluster.resourcesVpcConfig?.subnetIds ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        subnet
                    );

                }
                // cluster → security groups
                for (const sg of cluster.resourcesVpcConfig?.securityGroupIds ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        sg
                    );

                }

            }

            // Nodegroups
            for (const ng of rs.getEksNodegroupsByRegion(regionName)) {

                const arn = ng.nodegroupArn;
                if (!arn) {

                    continue;

                }
                this.#addNode(
                    arn,
                    "eksnodegroup",
                    ng.nodegroupName ?? arn,
                    {
                        "region": regionName,
                        "status": ng.status ?? ""
                    }
                );
                // nodegroup → cluster
                const clusterArn = rs.getEksClustersByRegion(regionName).
                    find((c) => c.name === ng.clusterName)?.arn;
                this.#addEdgeSafe(
                    arn,
                    clusterArn
                );
                // nodegroup → IAM role
                this.#addEdgeSafe(
                    arn,
                    ng.nodeRole
                );
                // nodegroup → subnets
                for (const subnet of ng.subnets ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        subnet
                    );

                }

            }

            // Fargate Profiles
            for (const fp of rs.getFargateProfilesByRegion(regionName)) {

                const fpArn = fp.fargateProfileArn;
                if (!fpArn) {

                    continue;

                }

                this.#addNode(
                    fpArn,
                    "fargateprofile",
                    fp.fargateProfileName ?? fpArn,
                    {
                        "region": regionName,
                        "status": fp.status ?? ""
                    }
                );
                // fargate profile → cluster
                const clusterArn = rs.getEksClustersByRegion(regionName).
                    find((c) => c.name === fp.clusterName)?.arn;
                this.#addEdgeSafe(
                    fpArn,
                    clusterArn
                );
                // fargate profile → subnets
                for (const subnet of fp.subnets ?? []) {

                    this.#addEdgeSafe(
                        fpArn,
                        subnet
                    );

                }
                // fargate profile → pod execution role
                if (fp.podExecutionRoleArn) {

                    const resolvedRole = rs.getRoleByArn(fp.podExecutionRoleArn);
                    this.#addEdgeSafe(
                        fpArn,
                        resolvedRole?.RoleId
                    );

                }

            }

            // Pod Identity Associations
            for (const pia of rs.getPodIdentityAssociationsByRegion(regionName)) {

                const piaArn = pia.associationArn;
                if (!piaArn) {

                    continue;

                }

                this.#addNode(
                    piaArn,
                    "podidentity",
                    `${pia.namespace}/${pia.serviceAccount}`,
                    {"region": regionName}
                );
                // pod identity → cluster
                const clusterArn = rs.getEksClustersByRegion(regionName).
                    find((c) => c.name === pia.clusterName)?.arn;
                this.#addEdgeSafe(
                    piaArn,
                    clusterArn
                );
                // pod identity → IAM role
                if (pia.roleArn) {

                    if (pia.roleArn) {

                        const resolvedRole = rs.getRoleByArn(pia.roleArn);
                        this.#addEdgeSafe(
                            piaArn,
                            resolvedRole?.RoleId
                        );

                    }

                }

            }

            // EKS Addons
            for (const addon of rs.getEksAddonsByRegion(regionName)) {

                const arn = addon.addonArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "eksaddon",
                    addon.addonName ?? arn,
                    {"status": addon.status}
                );
                // addon → cluster
                const clusterArn = rs.getEksClustersByRegion(regionName).
                    find((c) => c.name === addon.clusterName)?.arn;
                this.#addEdgeSafe(
                    arn,
                    clusterArn
                );
                // addon → IAM service account role
                if (addon.serviceAccountRoleArn) {

                    if (addon.serviceAccountRoleArn) {

                        const resolvedRole = rs.getRoleByArn(addon.serviceAccountRoleArn);
                        this.#addEdgeSafe(
                            arn,
                            resolvedRole?.RoleId
                        );

                    }

                }

            }

            // EKS Access Entries
            for (const entry of rs.getEksAccessEntriesByRegion(regionName)) {

                const arn = entry.accessEntryArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "eksaccessentry",
                    entry.username ?? arn,
                    {"type": entry.type}
                );
                // access entry → cluster
                const clusterArn = rs.getEksClustersByRegion(regionName).
                    find((c) => c.name === entry.clusterName)?.arn;
                this.#addEdgeSafe(
                    arn,
                    clusterArn
                );
                // access entry → IAM principal
                if (entry.principalArn) {

                    this.#addEdgeSafe(
                        arn,
                        entry.principalArn
                    );

                }

            }

        }

    }

    // ─── Secrets Manager (regional) ──────────────────────────────────────

    #addSecretsManagerResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const secret of rs.getSecretsByRegion(regionName)) {

                const arn = secret.ARN;
                if (!arn) {

                    continue;

                }
                this.#addNode(
                    arn,
                    "secret",
                    secret.Name ?? arn,
                    {"region": regionName},
                    secret.Tags
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

        }

    }

    // ─── CloudFront (global) ─────────────────────────────────────────────

    #addCloudFrontResources (rs: Inventory): void {

        // Origin Access Controls
        for (const oac of rs.getOriginAccessControls()) {

            if (!oac.Id) {

                continue;

            }
            this.#addNode(
                oac.Id,
                "originaccesscontrol",
                oac.OriginAccessControlConfig?.Name ?? oac.Id,
                {
                    "originType": oac.OriginAccessControlConfig?.OriginAccessControlOriginType ?? "",
                    "signingBehavior": oac.OriginAccessControlConfig?.SigningBehavior ?? ""
                }
            );

        }

        // CloudFront Functions
        for (const fn of rs.getCloudFrontFunctions()) {

            const arn = fn.FunctionMetadata?.FunctionARN;
            if (!arn) {

                continue;

            }
            this.#addNode(
                arn,
                "cloudfrontfunction",
                fn.Name ?? arn,
                {
                    "runtime": fn.FunctionConfig?.Runtime ?? "",
                    "stage": fn.FunctionMetadata?.Stage ?? ""
                }
            );

        }

        // Distributions
        for (const dist of rs.getDistributions()) {

            if (!dist.Id) {

                continue;

            }
            const aliases = dist.Aliases?.Items?.join(", ");
            this.#addNode(
                dist.ARN ?? dist.Id,
                "distribution",
                aliases ?? dist.DomainName ?? dist.Id,
                {
                    "status": dist.Status ?? "",
                    "domainName": dist.DomainName ?? "",
                    "aliases": aliases,
                    "httpVersion": dist.HttpVersion ?? ""
                }
            );

            // distribution → S3 bucket origins (if bucket is in the graph)
            for (const origin of dist.Origins?.Items ?? []) {

                const domain = origin.DomainName ?? "";
                // Match S3 bucket origins by domain pattern: <bucket-name>.s3.<region>.amazonaws.com
                const s3Match = domain.match(/^([^.]+)\.s3[.-]/);
                if (s3Match) {

                    this.#addEdgeSafe(
                        dist.ARN ?? dist.Id,
                        s3Match[1]
                    );

                }

                // distribution → OAC
                if (origin.OriginAccessControlId) {

                    this.#addEdgeSafe(
                        dist.ARN ?? dist.Id,
                        origin.OriginAccessControlId
                    );

                }

            }

            // distribution → CloudFront function (from cache behaviors)
            const functionAssociations = dist.DefaultCacheBehavior?.FunctionAssociations?.Items ?? [];
            for (const assoc of functionAssociations) {

                if (assoc.FunctionARN) {

                    this.#addEdgeSafe(
                        dist.ARN ?? dist.Id,
                        assoc.FunctionARN
                    );

                }

            }

            // distribution → ACM certificate
            if (dist.ViewerCertificate?.ACMCertificateArn) {

                this.#addEdgeSafe(
                    dist.ARN ?? dist.Id,
                    dist.ViewerCertificate.ACMCertificateArn
                );

            }

        }

        // Key Value Stores
        for (const kvs of rs.getKeyValueStores()) {

            if (!kvs.ARN) {

                continue;

            }
            this.#addNode(
                kvs.ARN,
                "keyvaluestore",
                kvs.Name ?? kvs.ARN,
                {"status": kvs.Status ?? ""}
            );

        }

    }

    // ─── IAM (global) ────────────────────────────────────────────────────

    #addIamResources (rs: Inventory): void {

        for (const group of rs.getUserGroups()) {

            const inlinePolicies = rs.getGroupPolicies(group.GroupId ?? "");
            this.#addNode(
                group.GroupId,
                "group",
                group.GroupName,
                inlinePolicies.length > 0
                    ? {"inlinePolicies": inlinePolicies.join(", ")}
                    : undefined
            );

        }

        for (const user of rs.getUsers()) {

            const inlinePolicies = rs.getUserPolicies(user.UserId ?? "");
            this.#addNode(
                user.UserId,
                "user",
                user.UserName,
                inlinePolicies.length > 0
                    ? {"inlinePolicies": inlinePolicies.join(", ")}
                    : undefined
            );

        }

        for (const role of rs.getRoles()) {

            this.#addNode(
                role.RoleId,
                "role",
                role.RoleName
            );

        }

        for (const policy of rs.getPolicies()) {

            this.#addNode(
                policy.PolicyId,
                "policy",
                policy.PolicyName
            );

        }

        for (const profile of rs.getInstanceProfiles()) {

            this.#addNode(
                profile.InstanceProfileId,
                "instanceprofile",
                profile.InstanceProfileName
            );
            // instance profile → role
            for (const role of profile.Roles ?? []) {

                this.#addEdgeSafe(
                    profile.InstanceProfileId,
                    role.RoleId
                );

            }

        }

        // MFA devices → user
        for (const device of rs.getMfaDevices()) {

            this.#addNode(
                device.SerialNumber,
                "mfadevice",
                device.SerialNumber
            );
            // Find user node by UserName
            const user = rs.getUsers().find((u) => u.UserName === device.UserName);
            if (user) {

                this.#addEdgeSafe(
                    device.SerialNumber,
                    user.UserId
                );

            }

        }

        // Access keys → user
        for (const key of rs.getAccessKeys()) {

            this.#addNode(
                key.AccessKeyId,
                "accesskey",
                key.AccessKeyId,
                {"status": key.Status}
            );
            const user = rs.getUsers().find((u) => u.UserName === key.UserName);
            if (user) {

                this.#addEdgeSafe(
                    key.AccessKeyId,
                    user.UserId
                );

            }

        }

        // SSH public keys → user
        for (const key of rs.getSshPublicKeys()) {

            this.#addNode(
                key.SSHPublicKeyId,
                "sshpublickey",
                key.SSHPublicKeyId,
                {"status": key.Status}
            );
            const user = rs.getUsers().find((u) => u.UserName === key.UserName);
            if (user) {

                this.#addEdgeSafe(
                    key.SSHPublicKeyId,
                    user.UserId
                );

            }

        }

        // Server certificates → region (standalone, connect to first region)
        for (const cert of rs.getServerCertificates()) {

            this.#addNode(
                cert.ServerCertificateId,
                "servercertificate",
                cert.ServerCertificateName,
                {"expiration": cert.Expiration instanceof Date
                    ? cert.Expiration.toISOString()
                    : ""}
            );
            // Connect to first available region as a standalone global resource
            const firstRegion = rs.getAccountRegions().find((r) => r.RegionName);
            if (firstRegion?.RegionName) {

                this.#addEdgeSafe(
                    cert.ServerCertificateId,
                    firstRegion.RegionName
                );

            }

        }

        // Virtual MFA devices → user
        for (const device of rs.getVirtualMfaDevices()) {

            this.#addNode(
                device.SerialNumber,
                "virtualmfadevice",
                device.SerialNumber
            );
            if (device.User?.UserId) {

                this.#addEdgeSafe(
                    device.SerialNumber,
                    device.User.UserId
                );

            }

        }

        // User → Group edges (from getGroupsForUser)
        for (const membership of rs.getUserGroupMemberships()) {

            this.#addEdgeSafe(
                membership.userId,
                membership.groupId
            );

        }

        // User → Group edges (from getGroupMembers / paginateGetGroup)
        for (const membership of rs.getGroupMemberships()) {

            this.#addEdgeSafe(
                membership.userId,
                membership.groupId
            );

        }

        // InstanceProfile → Role edges (from getInstanceProfilesForRole)
        for (const edge of rs.getInstanceProfileRoleEdges()) {

            this.#addEdgeSafe(
                edge.instanceProfileId,
                edge.roleId
            );

        }

        // Role → attached managed policy edges
        for (const role of rs.getRoles()) {

            for (const policyArn of rs.getRolePolicies(role.RoleId ?? "")) {

                const policy = rs.getPolicyByArn(policyArn);
                this.#addEdgeSafe(
                    role.RoleId,
                    policy?.PolicyId
                );

            }

        }

        // User → attached managed policy edges
        for (const user of rs.getUsers()) {

            for (const policyArn of rs.getUserPolicies(user.UserId ?? "")) {

                const policy = rs.getPolicyByArn(policyArn);
                this.#addEdgeSafe(
                    user.UserId,
                    policy?.PolicyId
                );

            }

        }

        // Group → attached managed policy edges
        for (const group of rs.getUserGroups()) {

            for (const policyArn of rs.getGroupPolicies(group.GroupId ?? "")) {

                const policy = rs.getPolicyByArn(policyArn);
                this.#addEdgeSafe(
                    group.GroupId,
                    policy?.PolicyId
                );

            }

        }

    }

    // ─── WAF (regional) ──────────────────────────────────────────────────

    #addWafResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            for (const acl of rs.getWebAclsByRegion(regionName)) {

                const arn = acl.ARN;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "webacl",
                    acl.Name ?? arn
                );
                // webacl → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

        }

        // WebACL → protected resource edges
        for (const assoc of rs.getWafResourceAssociations()) {

            this.#addEdgeSafe(
                assoc.webAclArn,
                assoc.resourceArn
            );

        }

    }

    // ─── ElastiCache (regional) ─────────────────────────────────────────

    #addElastiCacheResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            // Replication Groups
            for (const group of rs.getReplicationGroupsByRegion(regionName)) {

                const arn = group.ARN;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "replicationgroup",
                    group.ReplicationGroupId ?? arn
                );
                // replication group → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                // replication group → KMS key
                if (group.KmsKeyId) {

                    this.#addEdgeSafe(
                        arn,
                        group.KmsKeyId
                    );

                }

            }

            // Cache Clusters
            for (const cluster of rs.getCacheClustersByRegion(regionName)) {

                const arn = cluster.ARN;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "cachecluster",
                    cluster.CacheClusterId ?? arn
                );
                // cluster → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                // cluster → security groups
                for (const sg of cluster.SecurityGroups ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        sg.SecurityGroupId
                    );

                }
                // cluster → replication group
                if (cluster.ReplicationGroupId) {

                    const groups = rs.getReplicationGroupsByRegion(regionName);
                    const group = groups.find((g) => g.ReplicationGroupId === cluster.ReplicationGroupId);
                    if (group?.ARN) {

                        this.#addEdgeSafe(
                            arn,
                            group.ARN
                        );

                    }

                }
                // cluster → cache subnet group
                if (cluster.CacheSubnetGroupName) {

                    const subnetGroups = rs.getCacheSubnetGroupsByRegion(regionName);
                    const sg = subnetGroups.find((g) => g.CacheSubnetGroupName === cluster.CacheSubnetGroupName);
                    if (sg?.ARN) {

                        this.#addEdgeSafe(
                            arn,
                            sg.ARN
                        );

                    }

                }

            }

            // Cache Subnet Groups
            for (const sg of rs.getCacheSubnetGroupsByRegion(regionName)) {

                const arn = sg.ARN;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "cachesubnetgroup",
                    sg.CacheSubnetGroupName ?? arn
                );
                // subnet group → VPC
                this.#addEdgeSafe(
                    arn,
                    sg.VpcId
                );
                // subnet group → subnets
                for (const subnet of sg.Subnets ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        subnet.SubnetIdentifier
                    );

                }

            }

            // Serverless Caches
            for (const cache of rs.getServerlessCachesByRegion(regionName)) {

                const arn = cache.ARN;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "serverlesscache",
                    cache.ServerlessCacheName ?? arn
                );
                // serverless cache → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                // serverless cache → security groups
                for (const sgId of cache.SecurityGroupIds ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        sgId
                    );

                }
                // serverless cache → subnets
                for (const subnetId of cache.SubnetIds ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        subnetId
                    );

                }
                // serverless cache → KMS key
                if (cache.KmsKeyId) {

                    this.#addEdgeSafe(
                        arn,
                        cache.KmsKeyId
                    );

                }

            }

        }

    }

    // ─── EventBridge (regional) ─────────────────────────────────────────

    #addEventBridgeResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            // Event Buses
            const buses = rs.getEventBusesByRegion(regionName);
            for (const bus of buses) {

                const arn = bus.Arn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "eventbus",
                    bus.Name ?? arn
                );
                // bus → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

            // Rules with Targets
            for (const ruleWithTargets of rs.getEventBridgeRulesByRegion(regionName)) {

                const rule = ruleWithTargets.rule;
                const ruleArn = rule.Arn;
                if (!ruleArn) {

                    continue;

                }

                this.#addNode(
                    ruleArn,
                    "eventrule",
                    rule.Name ?? ruleArn
                );

                // rule → event bus
                if (rule.EventBusName) {

                    const bus = buses.find((b) => b.Name === rule.EventBusName);
                    if (bus?.Arn) {

                        this.#addEdgeSafe(
                            ruleArn,
                            bus.Arn
                        );

                    }

                }

                // rule → targets
                for (const target of ruleWithTargets.targets) {

                    if (target.Arn) {

                        this.#addEdgeSafe(
                            ruleArn,
                            target.Arn
                        );

                    }

                }

            }

        }

    }

    // ─── Step Functions (regional) ─────────────────────────────────────────

    #addSfnResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            const stateMachines = rs.getStateMachinesByRegion(regionName);
            for (const sm of stateMachines) {

                this.#addNode(
                    sm.stateMachineArn,
                    "statemachine",
                    sm.name
                );

                // state machine → region
                this.#addEdgeSafe(
                    sm.stateMachineArn,
                    regionName
                );

                // state machine → IAM role
                if (sm.roleArn) {

                    const role = rs.getRoleByArn(sm.roleArn);
                    this.#addEdgeSafe(
                        sm.stateMachineArn,
                        role?.RoleId
                    );

                }

            }

        }

    }

    #addKinesisResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            const streams = rs.getKinesisStreamsByRegion(regionName);
            for (const stream of streams) {

                this.#addNode(
                    stream.StreamARN,
                    "kinesisstream",
                    stream.StreamName
                );

                // stream → region
                this.#addEdgeSafe(
                    stream.StreamARN,
                    regionName
                );

            }

        }

    }

    #addOpenSearchResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            const domains = rs.getOpenSearchDomainsByRegion(regionName);
            for (const domain of domains) {

                this.#addNode(
                    domain.ARN,
                    "opensearchdomain",
                    domain.DomainName
                );

                // domain → region
                this.#addEdgeSafe(
                    domain.ARN,
                    regionName
                );

                // domain → VPC
                if (domain.VPCOptions?.VPCId) {

                    this.#addEdgeSafe(
                        domain.ARN,
                        domain.VPCOptions.VPCId
                    );

                }

                // domain → subnets
                if (domain.VPCOptions?.SubnetIds) {

                    for (const subnetId of domain.VPCOptions.SubnetIds) {

                        this.#addEdgeSafe(
                            domain.ARN,
                            subnetId
                        );

                    }

                }

                // domain → security groups
                if (domain.VPCOptions?.SecurityGroupIds) {

                    for (const sgId of domain.VPCOptions.SecurityGroupIds) {

                        this.#addEdgeSafe(
                            domain.ARN,
                            sgId
                        );

                    }

                }

                // domain → KMS key
                if (domain.EncryptionAtRestOptions?.KmsKeyId) {

                    this.#addEdgeSafe(
                        domain.ARN,
                        domain.EncryptionAtRestOptions.KmsKeyId
                    );

                }

            }

        }

    }

    // ─── CodeBuild ───────────────────────────────────────────────────────

    #addCodeBuildResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            const projects = rs.getCodeBuildProjectsByRegion(regionName);
            for (const project of projects) {

                this.#addNode(
                    project.arn,
                    "codebuildproject",
                    project.name
                );

                // project → region
                this.#addEdgeSafe(
                    project.arn,
                    regionName
                );

                // project → service role (IAM)
                if (project.serviceRole) {

                    this.#addEdgeSafe(
                        project.arn,
                        project.serviceRole
                    );

                }

                // project → VPC
                if (project.vpcConfig?.vpcId) {

                    this.#addEdgeSafe(
                        project.arn,
                        project.vpcConfig.vpcId
                    );

                }

                // project → subnets
                if (project.vpcConfig?.subnets) {

                    for (const subnet of project.vpcConfig.subnets) {

                        this.#addEdgeSafe(
                            project.arn,
                            subnet
                        );

                    }

                }

                // project → security groups
                if (project.vpcConfig?.securityGroupIds) {

                    for (const sgId of project.vpcConfig.securityGroupIds) {

                        this.#addEdgeSafe(
                            project.arn,
                            sgId
                        );

                    }

                }

            }

        }

    }

    // ─── Cognito ─────────────────────────────────────────────────────────

    #addCognitoResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            const pools = rs.getCognitoUserPoolsByRegion(regionName);
            for (const pool of pools) {

                const nodeId = pool.Arn ?? pool.Id;

                this.#addNode(
                    nodeId,
                    "userpool",
                    pool.Name
                );

                // pool → region
                this.#addEdgeSafe(
                    nodeId,
                    regionName
                );

                // pool → Lambda triggers
                if (pool.LambdaConfig) {

                    for (const lambdaArn of Object.values(pool.LambdaConfig)) {

                        if (lambdaArn) {

                            this.#addEdgeSafe(
                                nodeId,
                                lambdaArn
                            );

                        }

                    }

                }

            }

            // Identity Providers
            const providers = rs.getCognitoIdentityProvidersByRegion(regionName);
            for (const provider of providers) {

                const providerName = provider.ProviderName;
                if (!providerName) {

                    continue;

                }

                const providerNodeId = `cognito-idp:${regionName}:${providerName}`;

                this.#addNode(
                    providerNodeId,
                    "cognitoidp",
                    `${providerName} (${provider.ProviderType ?? ""})`
                );

                // identity provider → user pool (find parent pool in this region)
                const poolsInRegion = rs.getCognitoUserPoolsByRegion(regionName);
                if (poolsInRegion.length > 0) {

                    const parentPool = poolsInRegion[0];
                    const poolNodeId = parentPool.Arn ?? parentPool.Id;
                    this.#addEdgeSafe(
                        providerNodeId,
                        poolNodeId
                    );

                }

            }

            // User Pool Clients
            const clients = rs.getCognitoUserPoolClientsByRegion(regionName);
            for (const client of clients) {

                const clientId = client.ClientId;
                if (!clientId) {

                    continue;

                }

                const clientNodeId = `cognito-client:${regionName}:${clientId}`;

                this.#addNode(
                    clientNodeId,
                    "cognitoclient",
                    client.ClientName ?? clientId
                );

                // client → user pool
                if (client.UserPoolId) {

                    const poolsInRegion = rs.getCognitoUserPoolsByRegion(regionName);
                    const parentPool = poolsInRegion.find((p) => p.Id === client.UserPoolId);

                    if (parentPool) {

                        const poolNodeId = parentPool.Arn ?? parentPool.Id;
                        this.#addEdgeSafe(
                            clientNodeId,
                            poolNodeId
                        );

                    }

                }

            }

        }

    }

    // ─── Service Discovery (CloudMap) ────────────────────────────────────

    #addServiceDiscoveryResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            const namespaces = rs.getCloudMapNamespacesByRegion(regionName);
            for (const ns of namespaces) {

                this.#addNode(
                    ns.Arn,
                    "cloudmapnamespace",
                    ns.Name
                );

                // namespace → region
                this.#addEdgeSafe(
                    ns.Arn,
                    regionName
                );

            }

            const services = rs.getCloudMapServicesByRegion(regionName);
            for (const svc of services) {

                this.#addNode(
                    svc.Arn,
                    "cloudmapservice",
                    svc.Name
                );

                // service → namespace
                if (svc.NamespaceId) {

                    const parentNamespace = namespaces.find((ns) => ns.Id === svc.NamespaceId);

                    if (parentNamespace?.Arn) {

                        this.#addEdgeSafe(
                            svc.Arn,
                            parentNamespace.Arn
                        );

                    }

                }

            }

            // Instances
            const instances = rs.getCloudMapInstancesByRegion(regionName);
            for (const instance of instances) {

                const instanceId = instance.Id;
                if (!instanceId) {

                    continue;

                }

                const instanceNodeId = `sd-instance:${regionName}:${instanceId}`;

                this.#addNode(
                    instanceNodeId,
                    "servicediscoveryinstance",
                    instanceId
                );

                // instance → service (find parent service)
                if (services.length > 0) {

                    const parentService = services[0];

                    if (parentService.Arn) {

                        this.#addEdgeSafe(
                            instanceNodeId,
                            parentService.Arn
                        );

                    }

                }

            }

        }

    }

    // ─── Backup (regional) ───────────────────────────────────────────────

    #addBackupResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            const vaults = rs.getBackupVaultsByRegion(regionName);
            const protectedResources = rs.getProtectedResourcesByRegion(regionName);

            for (const vault of vaults) {

                this.#addNode(
                    vault.BackupVaultArn,
                    "backupvault",
                    vault.BackupVaultName
                );

                // vault → region
                this.#addEdgeSafe(
                    vault.BackupVaultArn,
                    regionName
                );

                // vault → KMS key
                this.#addEdgeSafe(
                    vault.BackupVaultArn,
                    vault.EncryptionKeyArn
                );

                // vault → protected resources
                for (const resource of protectedResources) {

                    this.#addEdgeSafe(
                        vault.BackupVaultArn,
                        resource.ResourceArn
                    );

                }

            }

            // Backup Plans
            const plans = rs.getBackupPlansByRegion(regionName);
            for (const plan of plans) {

                const planArn = plan.BackupPlanArn;
                if (!planArn) {

                    continue;

                }

                this.#addNode(
                    planArn,
                    "backupplan",
                    plan.BackupPlanName ?? planArn
                );

                // plan → region
                this.#addEdgeSafe(
                    planArn,
                    regionName
                );

            }

            // Backup Selections
            const selections = rs.getBackupSelectionsByRegion(regionName);
            for (const selection of selections) {

                const selectionId = selection.SelectionId;
                if (!selectionId) {

                    continue;

                }

                const nodeId = `backup-selection:${regionName}:${selectionId}`;

                this.#addNode(
                    nodeId,
                    "backupselection",
                    selection.SelectionName ?? selectionId
                );

                // selection → plan
                if (selection.BackupPlanId) {

                    const parentPlan = plans.find((p) => p.BackupPlanId === selection.BackupPlanId);

                    if (parentPlan?.BackupPlanArn) {

                        this.#addEdgeSafe(
                            nodeId,
                            parentPlan.BackupPlanArn
                        );

                    }

                }

                // selection → IAM role
                if (selection.IamRoleArn) {

                    if (selection.IamRoleArn) {

                        const resolvedRole = rs.getRoleByArn(selection.IamRoleArn);
                        this.#addEdgeSafe(
                            nodeId,
                            resolvedRole?.RoleId
                        );

                    }

                }

            }

        }

    }

    // ─── Glacier (regional) ──────────────────────────────────────────────

    #addGlacierResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            for (const vault of rs.getGlacierVaultsByRegion(regionName)) {

                this.#addNode(
                    vault.VaultARN,
                    "glaciervault",
                    vault.VaultName
                );

                // vault → region
                this.#addEdgeSafe(
                    vault.VaultARN,
                    regionName
                );

            }

        }

    }

    // ─── CodeArtifact (regional) ─────────────────────────────────────────

    #addCodeArtifactResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            const domains = rs.getCodeArtifactDomainsByRegion(regionName);

            for (const domain of domains) {

                this.#addNode(
                    domain.arn,
                    "codeartifactdomain",
                    domain.name
                );

                // domain → region
                this.#addEdgeSafe(
                    domain.arn,
                    regionName
                );

                // domain → KMS key
                this.#addEdgeSafe(
                    domain.arn,
                    domain.encryptionKey
                );

            }

            for (const repo of rs.getCodeArtifactRepositoriesByRegion(regionName)) {

                this.#addNode(
                    repo.arn,
                    "codeartifactrepo",
                    repo.name
                );

                // repo → domain
                if (repo.domainName) {

                    const parentDomain = domains.find((d) => d.name === repo.domainName);

                    if (parentDomain?.arn) {

                        this.#addEdgeSafe(
                            repo.arn,
                            parentDomain.arn
                        );

                    }

                }

            }

        }

    }

    // ─── MSK (regional) ─────────────────────────────────────────────────

    #addMskResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            for (const cluster of rs.getMskClustersByRegion(regionName)) {

                const arn = cluster.ClusterArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "mskcluster",
                    cluster.ClusterName ?? arn
                );

                // cluster → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

                // cluster → subnets
                for (const subnet of cluster.BrokerNodeGroupInfo?.ClientSubnets ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        subnet
                    );

                }

                // cluster → security groups
                for (const sg of cluster.BrokerNodeGroupInfo?.SecurityGroups ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        sg
                    );

                }

                // cluster → KMS key
                if (cluster.EncryptionInfo?.EncryptionAtRest?.DataVolumeKMSKeyId) {

                    this.#addEdgeSafe(
                        arn,
                        cluster.EncryptionInfo.EncryptionAtRest.DataVolumeKMSKeyId
                    );

                }

            }

        }

    }

    // ─── Redshift (regional) ────────────────────────────────────────────

    #addRedshiftResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            for (const cluster of rs.getRedshiftClustersByRegion(regionName)) {

                const nodeId = cluster.ClusterNamespaceArn ?? `redshift:${cluster.ClusterIdentifier ?? ""}`;
                if (!nodeId) {

                    continue;

                }

                this.#addNode(
                    nodeId,
                    "redshiftcluster",
                    cluster.ClusterIdentifier ?? nodeId
                );

                // cluster → region
                this.#addEdgeSafe(
                    nodeId,
                    regionName
                );

                // cluster → VPC
                if (cluster.VpcId) {

                    this.#addEdgeSafe(
                        nodeId,
                        cluster.VpcId
                    );

                }

                // cluster → security groups
                for (const sg of cluster.VpcSecurityGroups ?? []) {

                    this.#addEdgeSafe(
                        nodeId,
                        sg.VpcSecurityGroupId
                    );

                }

                // cluster → KMS key
                if (cluster.KmsKeyId) {

                    this.#addEdgeSafe(
                        nodeId,
                        cluster.KmsKeyId
                    );

                }

                // cluster → IAM roles
                for (const role of cluster.IamRoles ?? []) {

                    if (role.IamRoleArn) {

                        const resolvedRole = rs.getRoleByArn(role.IamRoleArn);
                        this.#addEdgeSafe(
                            nodeId,
                            resolvedRole?.RoleId
                        );

                    }

                }

            }

            // Redshift Cluster Subnet Groups
            for (const sg of rs.getRedshiftSubnetGroupsByRegion(regionName)) {

                const nodeId = `redshift-subnetgroup:${sg.ClusterSubnetGroupName ?? ""}`;

                this.#addNode(
                    nodeId,
                    "redshiftsubnetgroup",
                    sg.ClusterSubnetGroupName ?? nodeId
                );
                // subnet group → VPC
                this.#addEdgeSafe(
                    nodeId,
                    sg.VpcId
                );
                // subnet group → subnets
                for (const subnet of sg.Subnets ?? []) {

                    this.#addEdgeSafe(
                        nodeId,
                        subnet.SubnetIdentifier
                    );

                }

            }

        }

    }

    // ─── Neptune (regional) ─────────────────────────────────────────────

    #addNeptuneResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            const clusters = rs.getNeptuneClustersByRegion(regionName);

            // Neptune Clusters
            for (const cluster of clusters) {

                const arn = cluster.DBClusterArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "neptunecluster",
                    cluster.DBClusterIdentifier ?? arn
                );

                // cluster → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

                // cluster → security groups
                for (const sg of cluster.VpcSecurityGroups ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        sg.VpcSecurityGroupId
                    );

                }

                // cluster → KMS key
                if (cluster.KmsKeyId) {

                    this.#addEdgeSafe(
                        arn,
                        cluster.KmsKeyId
                    );

                }

            }

            // Neptune Instances
            for (const instance of rs.getNeptuneInstancesByRegion(regionName)) {

                const arn = instance.DBInstanceArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "neptuneinstance",
                    instance.DBInstanceIdentifier ?? arn
                );

                // instance → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

                // instance → subnets
                for (const subnet of instance.DBSubnetGroup?.Subnets ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        subnet.SubnetIdentifier
                    );

                }

                // instance → cluster
                if (instance.DBClusterIdentifier) {

                    const parentCluster = clusters.find((c) => c.DBClusterIdentifier === instance.DBClusterIdentifier);
                    if (parentCluster?.DBClusterArn) {

                        this.#addEdgeSafe(
                            arn,
                            parentCluster.DBClusterArn
                        );

                    }

                }

            }

            // Neptune Subnet Groups
            for (const sg of rs.getNeptuneSubnetGroupsByRegion(regionName)) {

                const arn = sg.DBSubnetGroupArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "neptunesubnetgroup",
                    sg.DBSubnetGroupName ?? arn
                );
                // subnet group → VPC
                this.#addEdgeSafe(
                    arn,
                    sg.VpcId
                );
                // subnet group → subnets
                for (const subnet of sg.Subnets ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        subnet.SubnetIdentifier
                    );

                }

            }

        }

    }

    // ─── DocumentDB (regional) ───────────────────────────────────────────

    #addDocDbResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            const clusters = rs.getDocDbClustersByRegion(regionName);

            // DocumentDB Clusters
            for (const cluster of clusters) {

                const arn = cluster.DBClusterArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "docdbcluster",
                    cluster.DBClusterIdentifier ?? arn
                );

                // cluster → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

                // cluster → security groups
                for (const sg of cluster.VpcSecurityGroups ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        sg.VpcSecurityGroupId
                    );

                }

                // cluster → KMS key
                if (cluster.KmsKeyId) {

                    this.#addEdgeSafe(
                        arn,
                        cluster.KmsKeyId
                    );

                }

            }

            // DocumentDB Instances
            for (const instance of rs.getDocDbInstancesByRegion(regionName)) {

                const arn = instance.DBInstanceArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "docdbinstance",
                    instance.DBInstanceIdentifier ?? arn
                );

                // instance → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

                // instance → subnets
                for (const subnet of instance.DBSubnetGroup?.Subnets ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        subnet.SubnetIdentifier
                    );

                }

                // instance → cluster
                if (instance.DBClusterIdentifier) {

                    const parentCluster = clusters.find((c) => c.DBClusterIdentifier === instance.DBClusterIdentifier);
                    if (parentCluster?.DBClusterArn) {

                        this.#addEdgeSafe(
                            arn,
                            parentCluster.DBClusterArn
                        );

                    }

                }

            }

            // DocumentDB Subnet Groups
            for (const sg of rs.getDocDbSubnetGroupsByRegion(regionName)) {

                const arn = sg.DBSubnetGroupArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "docdbsubnetgroup",
                    sg.DBSubnetGroupName ?? arn
                );
                // subnet group → VPC
                this.#addEdgeSafe(
                    arn,
                    sg.VpcId
                );
                // subnet group → subnets
                for (const subnet of sg.Subnets ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        subnet.SubnetIdentifier
                    );

                }

            }

        }

    }

    // ─── FSx (regional) ─────────────────────────────────────────────────

    #addFsxResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            for (const fs of rs.getFsxFileSystemsByRegion(regionName)) {

                const arn = fs.ResourceARN;
                if (!arn) {

                    continue;

                }

                const nameTag = fs.Tags?.find((t) => t.Key === "Name")?.Value;
                this.#addNode(
                    arn,
                    "fsxfilesystem",
                    nameTag ?? fs.FileSystemId ?? arn,
                    undefined,
                    fs.Tags
                );

                // fs → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

                // fs → VPC
                if (fs.VpcId) {

                    this.#addEdgeSafe(
                        arn,
                        fs.VpcId
                    );

                }

                // fs → subnets
                for (const subnetId of fs.SubnetIds ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        subnetId
                    );

                }

                // fs → KMS key
                if (fs.KmsKeyId) {

                    this.#addEdgeSafe(
                        arn,
                        fs.KmsKeyId
                    );

                }

            }

        }

    }

    // ─── Network Firewall (regional) ────────────────────────────────────

    #addNetworkFirewallResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            for (const fw of rs.getNetworkFirewallsByRegion(regionName)) {

                const arn = fw.firewallArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "networkfirewall",
                    fw.firewallName
                );

                // firewall → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

                // firewall → VPC
                if (fw.vpcId) {

                    this.#addEdgeSafe(
                        arn,
                        fw.vpcId
                    );

                }

                // firewall → subnets
                for (const subnetId of fw.subnetMappings ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        subnetId
                    );

                }

            }

            // Firewall Policies
            for (const policy of rs.getFirewallPoliciesByRegion(regionName)) {

                const arn = policy.Arn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "firewallpolicy",
                    policy.Name ?? arn
                );
                // policy → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

            // Rule Groups
            for (const group of rs.getRuleGroupsByRegion(regionName)) {

                const arn = group.Arn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "firewallrulegroup",
                    group.Name ?? arn
                );
                // rule group → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

        }

    }

    // ─── CodePipeline (regional) ────────────────────────────────────────

    #addCodePipelineResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            for (const pipeline of rs.getCodePipelinesByRegion(regionName)) {

                const name = pipeline.name;
                if (!name) {

                    continue;

                }

                this.#addNode(
                    name,
                    "pipeline",
                    name
                );

                // pipeline → region
                this.#addEdgeSafe(
                    name,
                    regionName
                );

            }

        }

    }

    // ─── CloudTrail (regional) ──────────────────────────────────────────

    #addCloudTrailResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            for (const trail of rs.getCloudTrailsByRegion(regionName)) {

                const arn = trail.TrailARN;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "trail",
                    trail.Name ?? arn
                );

                // trail → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

                // trail → S3 bucket
                if (trail.S3BucketName) {

                    this.#addEdgeSafe(
                        arn,
                        trail.S3BucketName
                    );

                }

                // trail → CloudWatch Logs log group
                if (trail.CloudWatchLogsLogGroupArn) {

                    this.#addEdgeSafe(
                        arn,
                        trail.CloudWatchLogsLogGroupArn
                    );

                }

                // trail → KMS key
                if (trail.KmsKeyId) {

                    this.#addEdgeSafe(
                        arn,
                        trail.KmsKeyId
                    );

                }

            }

        }

    }

    // ─── SSM (regional) ───────────────────────────────────────────────────

    #addSsmResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            // Parameters
            const parameters = rs.getSsmParametersByRegion(regionName);
            for (const param of parameters) {

                const paramId = param.ARN ?? param.Name;
                if (!paramId) {

                    continue;

                }

                this.#addNode(
                    paramId,
                    "ssmparameter",
                    param.Name
                );

                // parameter → region
                this.#addEdgeSafe(
                    paramId,
                    regionName
                );

                // SecureString parameter → KMS key
                if (param.Type === "SecureString" && param.KeyId) {

                    this.#addEdgeSafe(
                        paramId,
                        param.KeyId
                    );

                }

            }

            // Managed Instances
            const managedInstances = rs.getSsmManagedInstancesByRegion(regionName);
            for (const instance of managedInstances) {

                const instanceId = instance.InstanceId;
                if (!instanceId) {

                    continue;

                }

                /*
                 * If it's an EC2 instance (starts with i-), link SSM → EC2 instance node
                 * If it's a hybrid managed instance (starts with mi-), create its own node
                 */
                if (instanceId.startsWith("mi-")) {

                    this.#addNode(
                        instanceId,
                        "ssmmanagedinstance",
                        instance.ComputerName ?? instanceId
                    );

                    // managed instance → region
                    this.#addEdgeSafe(
                        instanceId,
                        regionName
                    );

                }

                // EC2 instances (i-*) already have nodes from EC2 service — no new node needed

            }

            // Maintenance Windows
            const maintenanceWindows = rs.getSsmMaintenanceWindowsByRegion(regionName);
            for (const window of maintenanceWindows) {

                const windowId = window.WindowId;
                if (!windowId) {

                    continue;

                }

                this.#addNode(
                    windowId,
                    "ssmmaintenancewindow",
                    window.Name ?? windowId
                );

                // window → region
                this.#addEdgeSafe(
                    windowId,
                    regionName
                );

            }

            // Documents
            const documents = rs.getSsmDocumentsByRegion(regionName);
            for (const doc of documents) {

                const docName = doc.Name;
                if (!docName) {

                    continue;

                }

                this.#addNode(
                    `ssm-doc:${regionName}:${docName}`,
                    "ssmdocument",
                    docName
                );

                // document → region
                this.#addEdgeSafe(
                    `ssm-doc:${regionName}:${docName}`,
                    regionName
                );

            }

            // Associations
            const associations = rs.getSsmAssociationsByRegion(regionName);
            for (const assoc of associations) {

                const assocId = assoc.AssociationId;
                if (!assocId) {

                    continue;

                }

                this.#addNode(
                    assocId,
                    "ssmassociation",
                    `${assoc.Name ?? ""}→${assoc.InstanceId ?? "targets"}`
                );

                // association → region
                this.#addEdgeSafe(
                    assocId,
                    regionName
                );

                // association → document
                if (assoc.Name) {

                    this.#addEdgeSafe(
                        assocId,
                        `ssm-doc:${regionName}:${assoc.Name}`
                    );

                }

                // association → target instance
                if (assoc.InstanceId) {

                    this.#addEdgeSafe(
                        assocId,
                        assoc.InstanceId
                    );

                }

            }

            // Patch Baselines
            const patchBaselines = rs.getSsmPatchBaselinesByRegion(regionName);
            for (const baseline of patchBaselines) {

                const baselineId = baseline.BaselineId;
                if (!baselineId) {

                    continue;

                }

                this.#addNode(
                    baselineId,
                    "patchbaseline",
                    baseline.BaselineName ?? baselineId
                );

                // patch baseline → region
                this.#addEdgeSafe(
                    baselineId,
                    regionName
                );

            }

        }

    }

    // ─── CloudFormation (regional) ─────────────────────────────────────────

    #addCloudFormationResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            // Stacks
            const stacks = rs.getCfnStacksByRegion(regionName);
            for (const stack of stacks) {

                const stackId = stack.StackId;
                if (!stackId) {

                    continue;

                }

                this.#addNode(
                    stackId,
                    "cfnstack",
                    stack.StackName
                );

                // Nested stack → parent stack
                if (stack.ParentId) {

                    this.#addEdgeSafe(
                        stackId,
                        stack.ParentId
                    );

                } else {

                    // Top-level stack → region
                    this.#addEdgeSafe(
                        stackId,
                        regionName
                    );

                }

            }

            // Stack Resources
            const stackResourcesMap = rs.getCfnStackResourcesByRegion(regionName);
            for (const [
                stackId,
                resources
            ] of Object.entries(stackResourcesMap)) {

                for (const resource of resources) {

                    const physicalId = resource.PhysicalResourceId;
                    if (!physicalId) {

                        continue;

                    }

                    // Skip nested stack resources (they are already stacks with their own node)
                    if (resource.ResourceType === "AWS::CloudFormation::Stack") {

                        continue;

                    }

                    /*
                     * Create edge: physical resource → stack (resource belongs to stack)
                     * Only add edge if the physical resource node exists
                     */
                    this.#addEdgeSafe(
                        physicalId,
                        stackId
                    );

                }

            }

            // Exports
            const exports = rs.getCfnExportsByRegion(regionName);
            for (const cfnExport of exports) {

                const exportName = cfnExport.Name;
                if (!exportName) {

                    continue;

                }

                this.#addNode(
                    `cfn-export:${regionName}:${exportName}`,
                    "cfnexport",
                    exportName
                );

                // export → exporting stack
                if (cfnExport.ExportingStackId) {

                    this.#addEdgeSafe(
                        `cfn-export:${regionName}:${exportName}`,
                        cfnExport.ExportingStackId
                    );

                } else {

                    // export → region (fallback)
                    this.#addEdgeSafe(
                        `cfn-export:${regionName}:${exportName}`,
                        regionName
                    );

                }

            }

            // Stack Sets
            const stackSets = rs.getCfnStackSetsByRegion(regionName);
            for (const stackSet of stackSets) {

                const stackSetId = stackSet.StackSetId;
                if (!stackSetId) {

                    continue;

                }

                this.#addNode(
                    stackSetId,
                    "cfnstackset",
                    stackSet.StackSetName ?? stackSetId
                );

                // stack set → region
                this.#addEdgeSafe(
                    stackSetId,
                    regionName
                );

            }

        }

    }

    // ─── Global Accelerator (global) ────────────────────────────────────

    #addGlobalAcceleratorResources (rs: Inventory): void {

        for (const accelerator of rs.getAccelerators()) {

            const arn = accelerator.AcceleratorArn;
            if (!arn) {

                continue;

            }

            this.#addNode(
                arn,
                "accelerator",
                accelerator.Name ?? arn
            );

        }

        // Listeners
        for (const listener of rs.getAcceleratorListeners()) {

            const listenerArn = listener.ListenerArn;
            if (!listenerArn) {

                continue;

            }

            this.#addNode(
                listenerArn,
                "acceleratorlistener",
                `${listener.Protocol ?? "TCP"}:${listener.PortRanges?.map((p) => p.FromPort).join(",") ?? ""}`
            );

            // listener → accelerator (extract accelerator ARN from listener ARN)
            const acceleratorArn = listenerArn.replace(
                /\/listener\/.*/,
                ""
            );
            this.#addEdgeSafe(
                listenerArn,
                acceleratorArn
            );

        }

        // Endpoint Groups
        for (const endpointGroup of rs.getAcceleratorEndpointGroups()) {

            const groupArn = endpointGroup.EndpointGroupArn;
            if (!groupArn) {

                continue;

            }

            this.#addNode(
                groupArn,
                "acceleratorendpointgroup",
                endpointGroup.EndpointGroupRegion ?? groupArn
            );

            // endpoint group → listener (extract listener ARN from endpoint group ARN)
            const listenerArn = groupArn.replace(
                /\/endpoint-group\/.*/,
                ""
            );
            this.#addEdgeSafe(
                groupArn,
                listenerArn
            );

        }

    }

    // ─── Regional resources ──────────────────────────────────────────────

    #addRegionalResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const region = reg.RegionName;
            if (!region) {

                continue;

            }

            this.#addNode(
                region,
                "region",
                region,
                {"status": reg.RegionOptStatus}
            );

            this.#addVpcs(
                rs,
                region
            );
            this.#addSubnets(
                rs,
                region
            );
            this.#addSecurityGroups(
                rs,
                region
            );
            this.#addInternetGateways(
                rs,
                region
            );
            this.#addNatGateways(
                rs,
                region
            );
            this.#addEgressOnlyInternetGateways(
                rs,
                region
            );
            this.#addNetworkInterfaces(
                rs,
                region
            );
            this.#addRouteTables(
                rs,
                region
            );
            this.#addInstances(
                rs,
                region
            );
            this.#addVolumes(
                rs,
                region
            );
            this.#addVpcEndpoints(
                rs,
                region
            );
            this.#addAddresses(
                rs,
                region
            );
            this.#addImages(
                rs,
                region
            );
            this.#addSnapshots(
                rs,
                region
            );
            this.#addKeyPairs(
                rs,
                region
            );
            this.#addNetworkAcls(
                rs,
                region
            );
            this.#addFlowLogs(
                rs,
                region
            );
            this.#addDhcpOptions(
                rs,
                region
            );
            this.#addManagedPrefixLists(
                rs,
                region
            );
            this.#addVpcPeeringConnections(
                rs,
                region
            );
            this.#addLaunchTemplates(
                rs,
                region
            );
            this.#addFleets(
                rs,
                region
            );
            this.#addTransitGateways(
                rs,
                region
            );
            this.#addTransitGatewayAttachments(
                rs,
                region
            );
            this.#addTransitGatewayRouteTables(
                rs,
                region
            );
            this.#addTransitGatewayVpcAttachments(
                rs,
                region
            );
            this.#addTransitGatewayPeeringAttachments(
                rs,
                region
            );
            this.#addTransitGatewayConnects(
                rs,
                region
            );
            this.#addTransitGatewayConnectPeers(
                rs,
                region
            );
            this.#addVerifiedAccess(
                rs,
                region
            );
            this.#addVpcEndpointServiceConfigurations(
                rs,
                region
            );
            this.#addSecurityGroupRules(
                rs,
                region
            );
            this.#addLocalGateways(
                rs,
                region
            );
            this.#addLocalGatewayRouteTables(
                rs,
                region
            );
            this.#addLocalGatewayRtVpcAssociations(
                rs,
                region
            );
            this.#addLocalGatewayVirtualInterfaces(
                rs,
                region
            );
            this.#addStaleSecurityGroups(
                rs,
                region
            );
            this.#addInstanceConnectEndpoints(
                rs,
                region
            );
            this.#addRecycleBin(
                rs,
                region
            );
            this.#addLambdas(
                rs,
                region
            );
            this.#addEventSourceMappings(
                rs,
                region
            );
            this.#addLayers(
                rs,
                region
            );
            this.#addAliases(
                rs,
                region
            );
            this.#addFunctionUrlConfigs(
                rs,
                region
            );
            this.#addProvisionedConcurrency(
                rs,
                region
            );
            this.#addLogGroups(
                rs,
                region
            );
            this.#addMetricAlarms(
                rs,
                region
            );
            this.#addCompositeAlarms(
                rs,
                region
            );
            this.#addSubscriptionFilters(
                rs,
                region
            );
            this.#addMetricStreams(
                rs,
                region
            );
            this.#addMetricFilters(
                rs,
                region
            );
            this.#addDeliveries(
                rs,
                region
            );
            this.#addTrafficMirroring(
                rs,
                region
            );
            this.#addClientVpnEndpoints(
                rs,
                region
            );

        }

    }

    // ─── EC2 ─────────────────────────────────────────────────────────────

    #addVpcs (rs: Inventory, region: string): void {

        for (const vpc of rs.getVpcsByRegion(region)) {

            this.#addNode(
                vpc.VpcId,
                "vpc",
                this.#nameTag(vpc.Tags),
                {"cidr": vpc.CidrBlock},
                vpc.Tags
            );
            // vpc → region
            this.#addEdgeSafe(
                vpc.VpcId,
                region
            );

        }

    }

    #addSubnets (rs: Inventory, region: string): void {

        for (const subnet of rs.getSubnetsByRegion(region)) {

            this.#addNode(
                subnet.SubnetId,
                "subnet",
                this.#nameTag(subnet.Tags),
                {"cidr": subnet.CidrBlock,
                    "availabilityZone": subnet.AvailabilityZone},
                subnet.Tags
            );
            // subnet → vpc
            this.#addEdgeSafe(
                subnet.SubnetId,
                subnet.VpcId
            );

        }

    }

    #addSecurityGroups (rs: Inventory, region: string): void {

        for (const sg of rs.getSecurityGroupsByRegion(region)) {

            this.#addNode(
                sg.GroupId,
                "securitygroup",
                sg.GroupName,
                {"region": region},
                sg.Tags
            );
            // security group → vpc
            this.#addEdgeSafe(
                sg.GroupId,
                sg.VpcId
            );

        }

    }

    #addInternetGateways (rs: Inventory, region: string): void {

        for (const igw of rs.getInternetGatewaysByRegion(region)) {

            this.#addNode(
                igw.InternetGatewayId,
                "internetgateway",
                igw.InternetGatewayId,
                undefined,
                igw.Tags
            );
            // internet gateway → vpc (via attachments)
            for (const attachment of igw.Attachments ?? []) {

                this.#addEdgeSafe(
                    igw.InternetGatewayId,
                    attachment.VpcId
                );

            }

        }

    }

    #addNatGateways (rs: Inventory, region: string): void {

        for (const nat of rs.getNatGatewaysByRegion(region)) {

            this.#addNode(
                nat.NatGatewayId,
                "natgateway",
                nat.NatGatewayId,
                undefined,
                nat.Tags
            );
            // nat gateway → vpc
            this.#addEdgeSafe(
                nat.NatGatewayId,
                nat.VpcId
            );
            // nat gateway → subnet
            this.#addEdgeSafe(
                nat.NatGatewayId,
                nat.SubnetId
            );

        }

    }

    #addEgressOnlyInternetGateways (rs: Inventory, region: string): void {

        for (const eigw of rs.getEgressOnlyInternetGatewaysByRegion(region)) {

            this.#addNode(
                eigw.EgressOnlyInternetGatewayId,
                "egressonlyinternetgateway",
                eigw.EgressOnlyInternetGatewayId
            );
            for (const attachment of eigw.Attachments ?? []) {

                this.#addEdgeSafe(
                    eigw.EgressOnlyInternetGatewayId,
                    attachment.VpcId
                );

            }

        }

    }

    #addNetworkInterfaces (rs: Inventory, region: string): void {

        for (const eni of rs.getNetworkInterfacesByRegion(region)) {

            this.#addNode(
                eni.NetworkInterfaceId,
                "networkinterface",
                eni.NetworkInterfaceId,
                {
                    "availabilityZone": eni.AvailabilityZone,
                    "description": eni.Description,
                    "status": eni.Status,
                    "region": region
                },
                eni.TagSet
            );
            // ENI → subnet
            this.#addEdgeSafe(
                eni.NetworkInterfaceId,
                eni.SubnetId
            );
            // ENI → security groups
            for (const group of eni.Groups ?? []) {

                this.#addEdgeSafe(
                    eni.NetworkInterfaceId,
                    group.GroupId
                );

            }

        }

    }

    #addRouteTables (rs: Inventory, region: string): void {

        for (const rt of rs.getRouteTablesByRegion(region)) {

            this.#addNode(
                rt.RouteTableId,
                "routetable",
                this.#nameTag(rt.Tags) ?? rt.RouteTableId,
                undefined,
                rt.Tags
            );
            // route table → vpc
            this.#addEdgeSafe(
                rt.RouteTableId,
                rt.VpcId
            );
            // route table → subnets (via associations)
            for (const assoc of rt.Associations ?? []) {

                if (assoc.SubnetId) {

                    this.#addEdgeSafe(
                        rt.RouteTableId,
                        assoc.SubnetId
                    );

                }

            }

        }

    }

    #addInstances (rs: Inventory, region: string): void {

        for (const instance of rs.getInstancesByRegion(region)) {

            this.#addNode(
                instance.InstanceId,
                "instance",
                this.#nameTag(instance.Tags) ?? instance.InstanceId,
                {"instanceType": instance.InstanceType,
                    "state": instance.State?.Name},
                instance.Tags
            );
            // instance → subnet
            this.#addEdgeSafe(
                instance.InstanceId,
                instance.SubnetId
            );
            // instance → security groups
            for (const sg of instance.SecurityGroups ?? []) {

                this.#addEdgeSafe(
                    instance.InstanceId,
                    sg.GroupId
                );

            }
            // instance → instance profile (by ID)
            if (instance.IamInstanceProfile?.Id) {

                this.#addEdgeSafe(
                    instance.InstanceId,
                    instance.IamInstanceProfile.Id
                );

            }

        }

    }

    #addVolumes (rs: Inventory, region: string): void {

        for (const vol of rs.getVolumesByRegion(region)) {

            this.#addNode(
                vol.VolumeId,
                "volume",
                this.#nameTag(vol.Tags) ?? vol.VolumeId,
                {"size": vol.Size,
                    "volumeType": vol.VolumeType,
                    "state": vol.State,
                    "region": region},
                vol.Tags
            );
            // volume → region
            this.#addEdgeSafe(
                vol.VolumeId,
                region
            );
            // volume → instance (via attachments)
            for (const attachment of vol.Attachments ?? []) {

                if (attachment.InstanceId) {

                    this.#addEdgeSafe(
                        vol.VolumeId,
                        attachment.InstanceId
                    );

                }

            }

        }

    }

    #addVpcEndpoints (rs: Inventory, region: string): void {

        for (const vpce of rs.getVpcEndpointsByRegion(region)) {

            this.#addNode(
                vpce.VpcEndpointId,
                "vpcendpoint",
                vpce.ServiceName ?? vpce.VpcEndpointId,
                {"endpointType": vpce.VpcEndpointType}
            );
            // vpc endpoint → vpc
            this.#addEdgeSafe(
                vpce.VpcEndpointId,
                vpce.VpcId
            );
            // gateway endpoint → route tables
            for (const rtId of vpce.RouteTableIds ?? []) {

                this.#addEdgeSafe(
                    vpce.VpcEndpointId,
                    rtId
                );

            }
            // interface endpoint → subnets
            for (const subnetId of vpce.SubnetIds ?? []) {

                this.#addEdgeSafe(
                    vpce.VpcEndpointId,
                    subnetId
                );

            }
            // interface endpoint → security groups
            for (const group of vpce.Groups ?? []) {

                this.#addEdgeSafe(
                    vpce.VpcEndpointId,
                    group.GroupId
                );

            }

        }

    }

    #addAddresses (rs: Inventory, region: string): void {

        for (const eip of rs.getAddressesByRegion(region)) {

            this.#addNode(
                eip.AllocationId,
                "elasticip",
                eip.PublicIp ?? eip.AllocationId,
                {"region": region},
                eip.Tags
            );
            // elastic IP → region
            this.#addEdgeSafe(
                eip.AllocationId,
                region
            );
            // elastic IP → instance
            if (eip.InstanceId) {

                this.#addEdgeSafe(
                    eip.AllocationId,
                    eip.InstanceId
                );

            }
            // elastic IP → network interface
            if (eip.NetworkInterfaceId) {

                this.#addEdgeSafe(
                    eip.AllocationId,
                    eip.NetworkInterfaceId
                );

            }

        }

    }

    // ─── Flow Logs, DHCP, Prefix Lists, Peering, Launch Templates, TGW, SG Rules ─

    #addFlowLogs (rs: Inventory, region: string): void {

        for (const fl of rs.getFlowLogsByRegion(region)) {

            this.#addNode(
                fl.FlowLogId,
                "flowlog",
                this.#nameTag(fl.Tags) ?? fl.FlowLogId,
                {"status": fl.FlowLogStatus,
                    "trafficType": fl.TrafficType},
                fl.Tags
            );
            // flow log → resource (VPC, subnet, or ENI)
            this.#addEdgeSafe(
                fl.FlowLogId,
                fl.ResourceId
            );

        }

    }

    #addDhcpOptions (rs: Inventory, region: string): void {

        for (const dhcp of rs.getDhcpOptionsByRegion(region)) {

            this.#addNode(
                dhcp.DhcpOptionsId,
                "dhcpoptions",
                this.#nameTag(dhcp.Tags) ?? dhcp.DhcpOptionsId,
                undefined,
                dhcp.Tags
            );
            // DHCP options → region (standalone, VPC association is on the VPC side)
            this.#addEdgeSafe(
                dhcp.DhcpOptionsId,
                region
            );

        }

    }

    #addManagedPrefixLists (rs: Inventory, region: string): void {

        for (const pl of rs.getManagedPrefixListsByRegion(region)) {

            this.#addNode(
                pl.PrefixListId,
                "prefixlist",
                pl.PrefixListName ?? pl.PrefixListId,
                {"state": pl.State}
            );
            // prefix list → region
            this.#addEdgeSafe(
                pl.PrefixListId,
                region
            );

        }

    }

    #addVpcPeeringConnections (rs: Inventory, region: string): void {

        for (const peering of rs.getVpcPeeringConnectionsByRegion(region)) {

            this.#addNode(
                peering.VpcPeeringConnectionId,
                "vpcpeering",
                this.#nameTag(peering.Tags) ?? peering.VpcPeeringConnectionId,
                {"status": peering.Status?.Code},
                peering.Tags
            );
            // peering → accepter VPC
            this.#addEdgeSafe(
                peering.VpcPeeringConnectionId,
                peering.AccepterVpcInfo?.VpcId
            );
            // peering → requester VPC
            this.#addEdgeSafe(
                peering.VpcPeeringConnectionId,
                peering.RequesterVpcInfo?.VpcId
            );

        }

    }

    #addLaunchTemplates (rs: Inventory, region: string): void {

        for (const lt of rs.getLaunchTemplatesByRegion(region)) {

            this.#addNode(
                lt.LaunchTemplateId,
                "launchtemplate",
                lt.LaunchTemplateName ?? lt.LaunchTemplateId
            );
            // launch template → region
            this.#addEdgeSafe(
                lt.LaunchTemplateId,
                region
            );

        }

    }

    #addFleets (rs: Inventory, region: string): void {

        for (const fleet of rs.getFleetsByRegion(region)) {

            const id = fleet.FleetId;
            if (!id) {

                continue;

            }

            const name = fleet.Tags?.find((t) => t.Key === "Name")?.Value ?? id;
            this.#addNode(
                id,
                "fleet",
                name,
                {
                    "state": fleet.FleetState ?? "",
                    "type": fleet.Type ?? "",
                    "totalCapacity": fleet.TargetCapacitySpecification?.TotalTargetCapacity ?? 0
                },
                fleet.Tags
            );
            // fleet → region
            this.#addEdgeSafe(
                id,
                region
            );
            // fleet → launch templates and subnets (from overrides)
            for (const config of fleet.LaunchTemplateConfigs ?? []) {

                const ltId = config.LaunchTemplateSpecification?.LaunchTemplateId;
                if (ltId) {

                    this.#addEdgeSafe(
                        id,
                        ltId
                    );

                }
                // fleet → subnets (from overrides)
                for (const override of config.Overrides ?? []) {

                    if (override.SubnetId) {

                        this.#addEdgeSafe(
                            id,
                            override.SubnetId
                        );

                    }

                }

            }

        }

    }

    #addTransitGateways (rs: Inventory, region: string): void {

        for (const tgw of rs.getTransitGatewaysByRegion(region)) {

            this.#addNode(
                tgw.TransitGatewayId,
                "transitgateway",
                this.#nameTag(tgw.Tags) ?? tgw.TransitGatewayId,
                {"state": tgw.State},
                tgw.Tags
            );
            // TGW → region
            this.#addEdgeSafe(
                tgw.TransitGatewayId,
                region
            );

        }

    }

    #addTransitGatewayAttachments (rs: Inventory, region: string): void {

        for (const att of rs.getTransitGatewayAttachmentsByRegion(region)) {

            this.#addNode(
                att.TransitGatewayAttachmentId,
                "transitgatewayattachment",
                att.TransitGatewayAttachmentId,
                {"resourceType": att.ResourceType,
                    "state": att.State}
            );
            // attachment → transit gateway
            this.#addEdgeSafe(
                att.TransitGatewayAttachmentId,
                att.TransitGatewayId
            );
            // attachment → resource (VPC, VPN, peering, etc.)
            this.#addEdgeSafe(
                att.TransitGatewayAttachmentId,
                att.ResourceId
            );

        }

    }

    #addTransitGatewayRouteTables (rs: Inventory, region: string): void {

        for (const rt of rs.getTransitGatewayRouteTablesByRegion(region)) {

            this.#addNode(
                rt.TransitGatewayRouteTableId,
                "transitgatewayroutetable",
                this.#nameTag(rt.Tags) ?? rt.TransitGatewayRouteTableId,
                {"state": rt.State},
                rt.Tags
            );
            // route table → transit gateway
            this.#addEdgeSafe(
                rt.TransitGatewayRouteTableId,
                rt.TransitGatewayId
            );

        }

    }

    #addTransitGatewayVpcAttachments (rs: Inventory, region: string): void {

        for (const att of rs.getTransitGatewayVpcAttachmentsByRegion(region)) {

            this.#addNode(
                att.TransitGatewayAttachmentId,
                "transitgatewayvpcattachment",
                this.#nameTag(att.Tags) ?? att.TransitGatewayAttachmentId,
                {"state": att.State},
                att.Tags
            );
            // vpc attachment → transit gateway
            this.#addEdgeSafe(
                att.TransitGatewayAttachmentId,
                att.TransitGatewayId
            );
            // vpc attachment → VPC
            this.#addEdgeSafe(
                att.TransitGatewayAttachmentId,
                att.VpcId
            );
            // vpc attachment → subnets
            for (const subnetId of att.SubnetIds ?? []) {

                this.#addEdgeSafe(
                    att.TransitGatewayAttachmentId,
                    subnetId
                );

            }

        }

    }

    #addTransitGatewayPeeringAttachments (rs: Inventory, region: string): void {

        for (const att of rs.getTransitGatewayPeeringAttachmentsByRegion(region)) {

            this.#addNode(
                att.TransitGatewayAttachmentId,
                "transitgatewaypeeringattachment",
                this.#nameTag(att.Tags) ?? att.TransitGatewayAttachmentId,
                {"state": att.State},
                att.Tags
            );
            // peering attachment → requester TGW
            this.#addEdgeSafe(
                att.TransitGatewayAttachmentId,
                att.RequesterTgwInfo?.TransitGatewayId
            );

        }

    }

    #addTransitGatewayConnects (rs: Inventory, region: string): void {

        for (const connect of rs.getTransitGatewayConnectsByRegion(region)) {

            this.#addNode(
                connect.TransitGatewayAttachmentId,
                "transitgatewayconnect",
                this.#nameTag(connect.Tags) ?? connect.TransitGatewayAttachmentId,
                {"state": connect.State},
                connect.Tags
            );
            // connect → transit gateway
            this.#addEdgeSafe(
                connect.TransitGatewayAttachmentId,
                connect.TransitGatewayId
            );
            // connect → transport attachment (underlying VPC/VPN attachment)
            this.#addEdgeSafe(
                connect.TransitGatewayAttachmentId,
                connect.TransportTransitGatewayAttachmentId
            );

        }

    }

    #addTransitGatewayConnectPeers (rs: Inventory, region: string): void {

        for (const peer of rs.getTransitGatewayConnectPeersByRegion(region)) {

            this.#addNode(
                peer.TransitGatewayConnectPeerId,
                "transitgatewayconnectpeer",
                this.#nameTag(peer.Tags) ?? peer.TransitGatewayConnectPeerId,
                {"state": peer.State},
                peer.Tags
            );
            // connect peer → connect attachment
            this.#addEdgeSafe(
                peer.TransitGatewayConnectPeerId,
                peer.TransitGatewayAttachmentId
            );

        }

    }

    #addVerifiedAccess (rs: Inventory, region: string): void {

        // Verified Access Instances
        for (const vai of rs.getVerifiedAccessInstancesByRegion(region)) {

            const id = vai.VerifiedAccessInstanceId;
            if (!id) {

                continue;

            }

            this.#addNode(
                id,
                "verifiedaccessinstance",
                this.#nameTag(vai.Tags) ?? id,
                undefined,
                vai.Tags
            );
            this.#addEdgeSafe(
                id,
                region
            );

        }

        // Verified Access Trust Providers → instance
        for (const tp of rs.getVerifiedAccessTrustProvidersByRegion(region)) {

            const id = tp.VerifiedAccessTrustProviderId;
            if (!id) {

                continue;

            }

            this.#addNode(
                id,
                "verifiedaccesstrustprovider",
                this.#nameTag(tp.Tags) ?? id,
                {"trustProviderType": tp.TrustProviderType},
                tp.Tags
            );
            this.#addEdgeSafe(
                id,
                (tp as unknown as {"VerifiedAccessInstanceId"?: string}).VerifiedAccessInstanceId
            );

        }

        // Verified Access Groups → instance
        for (const vag of rs.getVerifiedAccessGroupsByRegion(region)) {

            const arn = vag.VerifiedAccessGroupArn;
            if (!arn) {

                continue;

            }

            this.#addNode(
                arn,
                "verifiedaccessgroup",
                this.#nameTag(vag.Tags) ?? vag.VerifiedAccessGroupId ?? arn,
                undefined,
                vag.Tags
            );
            this.#addEdgeSafe(
                arn,
                vag.VerifiedAccessInstanceId
            );

        }

        // Verified Access Endpoints → group, SGs, cert
        for (const vae of rs.getVerifiedAccessEndpointsByRegion(region)) {

            const id = vae.VerifiedAccessEndpointId;
            if (!id) {

                continue;

            }

            this.#addNode(
                id,
                "verifiedaccessendpoint",
                this.#nameTag(vae.Tags) ?? id,
                {"endpointType": vae.EndpointType},
                vae.Tags
            );
            // endpoint → group
            this.#addEdgeSafe(
                id,
                vae.VerifiedAccessGroupId
            );
            // endpoint → SGs
            for (const sgId of vae.SecurityGroupIds ?? []) {

                this.#addEdgeSafe(
                    id,
                    sgId
                );

            }
            // endpoint → ACM cert
            if (vae.DomainCertificateArn) {

                this.#addEdgeSafe(
                    id,
                    vae.DomainCertificateArn
                );

            }

        }

    }

    #addVpcEndpointServiceConfigurations (rs: Inventory, region: string): void {

        for (const svc of rs.getVpcEndpointServiceConfigsByRegion(region)) {

            const id = svc.ServiceId;
            if (!id) {

                continue;

            }

            this.#addNode(
                id,
                "vpcendpointservice",
                svc.ServiceName ?? id,
                {"state": svc.ServiceState}
            );
            this.#addEdgeSafe(
                id,
                region
            );
            // service → NLBs
            for (const nlbArn of svc.NetworkLoadBalancerArns ?? []) {

                this.#addEdgeSafe(
                    id,
                    nlbArn
                );

            }
            // service → GLBs
            for (const glbArn of svc.GatewayLoadBalancerArns ?? []) {

                this.#addEdgeSafe(
                    id,
                    glbArn
                );

            }

        }

    }

    #addSecurityGroupRules (rs: Inventory, region: string): void {

        for (const rule of rs.getSecurityGroupRulesByRegion(region)) {

            // SG rules create edges between security groups (when referencing another SG)
            if (rule.ReferencedGroupInfo?.GroupId) {

                // referenced SG → this SG (the referenced group is allowed by this group)
                this.#addEdgeSafe(
                    rule.GroupId,
                    rule.ReferencedGroupInfo.GroupId
                );

            }

        }

    }

    // ─── Local Gateways, Stale Security Groups ────────────────────────

    #addLocalGateways (rs: Inventory, region: string): void {

        for (const lgw of rs.getLocalGatewaysByRegion(region)) {

            this.#addNode(
                lgw.LocalGatewayId,
                "localgateway",
                lgw.LocalGatewayId,
                {"state": lgw.State}
            );
            this.#addEdgeSafe(
                lgw.LocalGatewayId,
                region
            );

        }

    }

    #addLocalGatewayRouteTables (rs: Inventory, region: string): void {

        for (const rt of rs.getLocalGatewayRouteTablesByRegion(region)) {

            this.#addNode(
                rt.LocalGatewayRouteTableId,
                "localgatewayroutetable",
                rt.LocalGatewayRouteTableId,
                {"state": rt.State}
            );
            // route table → local gateway
            this.#addEdgeSafe(
                rt.LocalGatewayRouteTableId,
                rt.LocalGatewayId
            );

        }

    }

    #addLocalGatewayRtVpcAssociations (rs: Inventory, region: string): void {

        // These create edges between existing LGW route tables and VPCs
        for (const assoc of rs.getLocalGatewayRtVpcAssociationsByRegion(region)) {

            this.#addEdgeSafe(
                assoc.LocalGatewayRouteTableId,
                assoc.VpcId
            );

        }

    }

    #addLocalGatewayVirtualInterfaces (rs: Inventory, region: string): void {

        for (const vif of rs.getLocalGatewayVirtualInterfacesByRegion(region)) {

            this.#addNode(
                vif.LocalGatewayVirtualInterfaceId,
                "localgatewayvif",
                vif.LocalGatewayVirtualInterfaceId
            );
            // VIF → local gateway
            this.#addEdgeSafe(
                vif.LocalGatewayVirtualInterfaceId,
                vif.LocalGatewayId
            );

        }

    }

    #addStaleSecurityGroups (rs: Inventory, region: string): void {

        // Stale SGs enrich existing SG nodes with a "stale" attribute
        for (const staleSg of rs.getStaleSecurityGroupsByRegion(region)) {

            if (staleSg.GroupId && this.#graph.hasNode(staleSg.GroupId)) {

                this.#graph.setNodeAttribute(
                    staleSg.GroupId,
                    "stale",
                    true
                );

            }

        }

    }

    #addInstanceConnectEndpoints (rs: Inventory, region: string): void {

        for (const endpoint of rs.getInstanceConnectEndpointsByRegion(region)) {

            this.#addNode(
                endpoint.InstanceConnectEndpointId,
                "instanceconnectendpoint",
                this.#nameTag(endpoint.Tags) ?? endpoint.InstanceConnectEndpointId,
                {"state": endpoint.State}
            );
            // endpoint → subnet
            this.#addEdgeSafe(
                endpoint.InstanceConnectEndpointId,
                endpoint.SubnetId
            );
            // endpoint → security groups
            for (const sgId of endpoint.SecurityGroupIds ?? []) {

                this.#addEdgeSafe(
                    endpoint.InstanceConnectEndpointId,
                    sgId
                );

            }

        }

    }

    #addRecycleBin (rs: Inventory, region: string): void {

        for (const image of rs.getImagesInRecycleBinByRegion(region)) {

            this.#addNode(
                image.ImageId,
                "ami-recyclebin",
                `[Recycle Bin] ${image.ImageId ?? ""}`,
                {"recycleBin": true}
            );

        }
        for (const snapshot of rs.getSnapshotsInRecycleBinByRegion(region)) {

            this.#addNode(
                snapshot.SnapshotId,
                "snapshot-recyclebin",
                `[Recycle Bin] ${snapshot.SnapshotId ?? ""}`,
                {"recycleBin": true}
            );

        }

    }

    // ─── AMIs, Snapshots, Key Pairs, NACLs ─────────────────────────────

    #addImages (rs: Inventory, region: string): void {

        for (const image of rs.getImagesByRegion(region)) {

            this.#addNode(
                image.ImageId,
                "ami",
                this.#nameTag(image.Tags) ?? image.Name ?? image.ImageId,
                {"architecture": image.Architecture,
                    "state": image.State,
                    "region": region}
            );
            // AMI → region
            this.#addEdgeSafe(
                image.ImageId,
                region
            );
            // AMI → snapshot (via block device mappings)
            for (const bdm of image.BlockDeviceMappings ?? []) {

                if (bdm.Ebs?.SnapshotId) {

                    this.#addEdgeSafe(
                        image.ImageId,
                        bdm.Ebs.SnapshotId
                    );

                }

            }

        }

    }

    #addSnapshots (rs: Inventory, region: string): void {

        for (const snapshot of rs.getSnapshotsByRegion(region)) {

            this.#addNode(
                snapshot.SnapshotId,
                "snapshot",
                this.#nameTag(snapshot.Tags) ?? snapshot.SnapshotId,
                {"volumeSize": snapshot.VolumeSize,
                    "state": snapshot.State,
                    "region": region}
            );
            // snapshot → region
            this.#addEdgeSafe(
                snapshot.SnapshotId,
                region
            );
            // snapshot → volume (source volume)
            if (snapshot.VolumeId && snapshot.VolumeId !== "vol-ffffffff") {

                this.#addEdgeSafe(
                    snapshot.SnapshotId,
                    snapshot.VolumeId
                );

            }

        }

    }

    #addKeyPairs (rs: Inventory, region: string): void {

        for (const keyPair of rs.getKeyPairsByRegion(region)) {

            this.#addNode(
                keyPair.KeyPairId,
                "keypair",
                keyPair.KeyName ?? keyPair.KeyPairId,
                {"keyType": keyPair.KeyType}
            );
            // key pairs → region (standalone resource)
            this.#addEdgeSafe(
                keyPair.KeyPairId,
                region
            );

        }

    }

    #addNetworkAcls (rs: Inventory, region: string): void {

        for (const acl of rs.getNetworkAclsByRegion(region)) {

            this.#addNode(
                acl.NetworkAclId,
                "networkacl",
                this.#nameTag(acl.Tags) ?? acl.NetworkAclId,
                {"isDefault": acl.IsDefault}
            );
            // NACL → VPC
            this.#addEdgeSafe(
                acl.NetworkAclId,
                acl.VpcId
            );
            // NACL → subnets (via associations)
            for (const assoc of acl.Associations ?? []) {

                if (assoc.SubnetId) {

                    this.#addEdgeSafe(
                        acl.NetworkAclId,
                        assoc.SubnetId
                    );

                }

            }

        }

    }

    // ─── Lambda ──────────────────────────────────────────────────────────

    #addLambdas (rs: Inventory, region: string): void {

        for (const lambda of rs.getLambdasByRegion(region)) {

            this.#addNode(
                lambda.FunctionArn,
                "lambdafunction",
                lambda.FunctionName
            );
            // lambda → region
            this.#addEdgeSafe(
                lambda.FunctionArn,
                region
            );
            // lambda → execution role
            if (lambda.Role) {

                const role = rs.getRoleByArn(lambda.Role);
                this.#addEdgeSafe(
                    lambda.FunctionArn,
                    role?.RoleId
                );

            }
            // lambda → subnets (VPC-connected lambdas)
            for (const subnetId of lambda.VpcConfig?.SubnetIds ?? []) {

                this.#addEdgeSafe(
                    lambda.FunctionArn,
                    subnetId
                );

            }
            // lambda → security groups
            for (const sgId of lambda.VpcConfig?.SecurityGroupIds ?? []) {

                this.#addEdgeSafe(
                    lambda.FunctionArn,
                    sgId
                );

            }
            // lambda → layers (referenced layer version ARNs)
            for (const layer of lambda.Layers ?? []) {

                if (layer.Arn) {

                    /*
                     * Layer version ARN format: arn:aws:lambda:<region>:<account>:layer:<name>:<version>
                     * Layer node ARN format:    arn:aws:lambda:<region>:<account>:layer:<name>
                     * Strip the version suffix to match the layer node
                     */
                    const layerArn = layer.Arn.replace(
                        /:\d+$/,
                        ""
                    );
                    this.#addEdgeSafe(
                        lambda.FunctionArn,
                        layerArn
                    );

                }

            }

        }

    }

    #addEventSourceMappings (rs: Inventory, region: string): void {

        for (const esm of rs.getEventSourceMappingsByRegion(region)) {

            this.#addNode(
                esm.UUID,
                "eventsourcemapping",
                `${esm.EventSourceArn?.split(":").pop() ?? ""} → ${esm.FunctionArn?.split(":").pop() ?? ""}`
            );
            // event source mapping → lambda function (by ARN)
            if (esm.FunctionArn) {

                this.#addEdgeSafe(
                    esm.UUID,
                    esm.FunctionArn
                );

            }

        }

    }

    #addLayers (rs: Inventory, region: string): void {

        for (const layer of rs.getLayersByRegion(region)) {

            this.#addNode(
                layer.LayerArn,
                "lambdalayer",
                layer.LayerName
            );
            // layer → region
            this.#addEdgeSafe(
                layer.LayerArn,
                region
            );

        }

    }

    #addAliases (rs: Inventory, region: string): void {

        for (const alias of rs.getAliasesByRegion(region)) {

            this.#addNode(
                alias.AliasArn,
                "lambdaalias",
                alias.Name,
                {"functionVersion": alias.FunctionVersion}
            );
            // alias → function (derive function ARN from alias ARN)
            const functionArn = alias.AliasArn?.replace(
                `:${alias.Name ?? ""}`,
                ""
            );
            this.#addEdgeSafe(
                alias.AliasArn,
                functionArn
            );

        }

    }

    #addFunctionUrlConfigs (rs: Inventory, region: string): void {

        for (const urlConfig of rs.getFunctionUrlConfigsByRegion(region)) {

            this.#addNode(
                urlConfig.FunctionUrl,
                "functionurl",
                urlConfig.FunctionUrl,
                {"authType": urlConfig.AuthType}
            );
            // function URL → function
            this.#addEdgeSafe(
                urlConfig.FunctionUrl,
                urlConfig.FunctionArn
            );

        }

    }

    #addProvisionedConcurrency (rs: Inventory, region: string): void {

        for (const pc of rs.getProvisionedConcurrencyByRegion(region)) {

            const id = `pc:${pc.FunctionArn ?? ""}`;
            this.#addNode(
                id,
                "provisionedconcurrency",
                `PC: ${String(pc.RequestedProvisionedConcurrentExecutions ?? "")}`,
                {"requested": pc.RequestedProvisionedConcurrentExecutions,
                    "status": pc.Status}
            );
            // provisioned concurrency → function/alias
            this.#addEdgeSafe(
                id,
                pc.FunctionArn
            );

        }

    }

    // ─── Traffic Mirroring ──────────────────────────────────────────────

    #addTrafficMirroring (rs: Inventory, region: string): void {

        // Filters
        for (const filter of rs.getTrafficMirrorFiltersByRegion(region)) {

            const id = filter.TrafficMirrorFilterId;
            if (!id) {

                continue;

            }

            const name = filter.Tags?.find((t) => t.Key === "Name")?.Value ?? id;
            this.#addNode(
                id,
                "trafficmirrorfilter",
                name
            );
            // filter → region
            this.#addEdgeSafe(
                id,
                region
            );

        }

        // Targets
        for (const target of rs.getTrafficMirrorTargetsByRegion(region)) {

            const id = target.TrafficMirrorTargetId;
            if (!id) {

                continue;

            }

            const name = target.Tags?.find((t) => t.Key === "Name")?.Value ?? id;
            this.#addNode(
                id,
                "trafficmirrortarget",
                name
            );
            // target → network interface or NLB
            if (target.Type === "network-interface" && target.NetworkInterfaceId) {

                this.#addEdgeSafe(
                    id,
                    target.NetworkInterfaceId
                );

            } else if (target.NetworkLoadBalancerArn) {

                this.#addEdgeSafe(
                    id,
                    target.NetworkLoadBalancerArn
                );

            }

        }

        // Sessions
        for (const session of rs.getTrafficMirrorSessionsByRegion(region)) {

            const id = session.TrafficMirrorSessionId;
            if (!id) {

                continue;

            }

            const name = session.Tags?.find((t) => t.Key === "Name")?.Value ?? id;
            this.#addNode(
                id,
                "trafficmirrorsession",
                name
            );
            // session → source ENI
            this.#addEdgeSafe(
                id,
                session.NetworkInterfaceId
            );
            // session → target
            this.#addEdgeSafe(
                id,
                session.TrafficMirrorTargetId
            );
            // session → filter
            this.#addEdgeSafe(
                id,
                session.TrafficMirrorFilterId
            );

        }

    }

    // ─── Client VPN Endpoints ────────────────────────────────────────────

    #addClientVpnEndpoints (rs: Inventory, region: string): void {

        for (const endpoint of rs.getClientVpnEndpointsByRegion(region)) {

            const id = endpoint.ClientVpnEndpointId;
            if (!id) {

                continue;

            }

            const name = endpoint.Tags?.find((t) => t.Key === "Name")?.Value ?? id;
            this.#addNode(
                id,
                "clientvpnendpoint",
                name
            );
            // endpoint → VPC
            this.#addEdgeSafe(
                id,
                endpoint.VpcId
            );
            // endpoint → security groups
            for (const sgId of endpoint.SecurityGroupIds ?? []) {

                this.#addEdgeSafe(
                    id,
                    sgId
                );

            }
            // endpoint → ACM certificate
            if (endpoint.ServerCertificateArn) {

                this.#addEdgeSafe(
                    id,
                    endpoint.ServerCertificateArn
                );

            }

        }

    }

    // ─── Helpers ─────────────────────────────────────────────────────────

    /**
     * Add a node to the graph. Skips if id is undefined.
     */
    #addNode (id: string | undefined, resourceType: string, label: string | undefined, extra?: Record<string, unknown>, tags?: {"Key"?: string;
        "Value"?: string;}[]): void {

        if (!id || this.#graph.hasNode(id)) {

            return;

        }

        const tagMap: Record<string, string> = {};
        if (tags) {

            for (const tag of tags) {

                if (tag.Key) {

                    tagMap[tag.Key] = tag.Value ?? "";

                }

            }

        }

        this.#graph.addNode(
            id,
            {
                "label": label ?? id,
                "id": id,
                "resourcetype": resourceType,
                "x": 1,
                "y": 1,
                "tags": tagMap,
                ...extra
            }
        );

    }

    /**
     * Add an edge, silently skipping if source or target node doesn't exist.
     * This handles cross-region references and optional relationships gracefully.
     */
    #addEdgeSafe (source: string | undefined, target: string | undefined): void {

        if (this.#nodeOnlyPass) {

            return;

        }

        if (!source || !target) {

            return;

        }
        if (!this.#graph.hasNode(source) || !this.#graph.hasNode(target)) {

            return;

        }
        if (this.#graph.hasDirectedEdge(
            source,
            target
        )) {

            return;

        }
        this.#graph.addDirectedEdge(
            source,
            target
        );

    }

    // ─── CloudWatch ────────────────────────────────────────────────────

    #addLogGroups (rs: Inventory, region: string): void {

        for (const logGroup of rs.getLogGroupsByRegion(region)) {

            const name = logGroup.logGroupName;
            if (!name) {

                continue;

            }

            this.#addNode(
                logGroup.arn ?? name,
                "loggroup",
                name,
                {
                    "retentionInDays": logGroup.retentionInDays ?? "never expires",
                    "storedBytes": logGroup.storedBytes ?? 0
                }
            );

            // logGroup → region
            this.#addEdgeSafe(
                logGroup.arn ?? name,
                region
            );

            // Link /aws/lambda/<name> log groups to their Lambda function
            const lambdaPrefix = "/aws/lambda/";
            if (name.startsWith(lambdaPrefix)) {

                const functionName = name.slice(lambdaPrefix.length);
                // Find the Lambda by name in this region
                const lambdas = rs.getLambdasByRegion(region);
                const lambda = lambdas.find((fn) => fn.FunctionName === functionName);
                if (lambda?.FunctionArn) {

                    this.#addEdgeSafe(
                        logGroup.arn ?? name,
                        lambda.FunctionArn
                    );

                }

            }

        }

    }

    #addMetricAlarms (rs: Inventory, region: string): void {

        for (const alarm of rs.getMetricAlarmsByRegion(region)) {

            const name = alarm.AlarmName;
            if (!name) {

                continue;

            }

            this.#addNode(
                alarm.AlarmArn ?? name,
                "metricalarm",
                name,
                {
                    "state": alarm.StateValue ?? "UNKNOWN",
                    "metric": `${alarm.Namespace ?? ""}/${alarm.MetricName ?? ""}`,
                    "threshold": `${alarm.ComparisonOperator ?? ""} ${String(alarm.Threshold ?? "")}`
                }
            );

            // alarm → region
            this.#addEdgeSafe(
                alarm.AlarmArn ?? name,
                region
            );

            // Link alarm to SNS topics via alarm actions
            const allActions = [
                ...alarm.AlarmActions ?? [],
                ...alarm.OKActions ?? [],
                ...alarm.InsufficientDataActions ?? []
            ];
            for (const actionArn of allActions) {

                this.#addEdgeSafe(
                    alarm.AlarmArn ?? name,
                    actionArn
                );

            }

            // Link alarm to monitored resource via dimensions
            for (const dim of alarm.Dimensions ?? []) {

                if (dim.Name === "FunctionName" && dim.Value) {

                    // Find Lambda by name
                    const lambdas = rs.getLambdasByRegion(region);
                    const lambda = lambdas.find((fn) => fn.FunctionName === dim.Value);
                    if (lambda?.FunctionArn) {

                        this.#addEdgeSafe(
                            alarm.AlarmArn ?? name,
                            lambda.FunctionArn
                        );

                    }

                } else if (dim.Name === "InstanceId" && dim.Value) {

                    // Link to EC2 instance
                    this.#addEdgeSafe(
                        alarm.AlarmArn ?? name,
                        dim.Value
                    );

                } else if (dim.Name === "LoadBalancer" && dim.Value) {

                    // Find ALB/NLB by name suffix in ARN
                    const dimValue = dim.Value;
                    const lbs = rs.getLoadBalancersByRegion(region);
                    const lb = lbs.find((l) => l.LoadBalancerArn?.includes(dimValue));
                    if (lb?.LoadBalancerArn) {

                        this.#addEdgeSafe(
                            alarm.AlarmArn ?? name,
                            lb.LoadBalancerArn
                        );

                    }

                } else if (dim.Name === "TargetGroup" && dim.Value) {

                    // Find target group by name suffix in ARN
                    const dimValue = dim.Value;
                    const tgs = rs.getTargetGroupsByRegion(region);
                    const tg = tgs.find((t) => t.TargetGroupArn?.includes(dimValue));
                    if (tg?.TargetGroupArn) {

                        this.#addEdgeSafe(
                            alarm.AlarmArn ?? name,
                            tg.TargetGroupArn
                        );

                    }

                } else if (dim.Name === "QueueName" && dim.Value) {

                    // Find SQS queue by name
                    const queues = rs.getQueuesByRegion(region);
                    const queue = queues.find((q) => q.queueName === dim.Value);
                    if (queue?.queueArn) {

                        this.#addEdgeSafe(
                            alarm.AlarmArn ?? name,
                            queue.queueArn
                        );

                    }

                } else if (dim.Name === "TableName" && dim.Value) {

                    // Find DynamoDB table by name
                    const tables = rs.getDynamoDBTablesByRegion(region);
                    const table = tables.find((t) => t.TableName === dim.Value);
                    if (table?.TableArn) {

                        this.#addEdgeSafe(
                            alarm.AlarmArn ?? name,
                            table.TableArn
                        );

                    }

                } else if (dim.Name === "TopicName" && dim.Value) {

                    // Find SNS topic by name (last segment of ARN)
                    const topics = rs.getTopicsByRegion(region);
                    const topic = topics.find((t) => t.TopicArn?.endsWith(`:${dim.Value ?? ""}`));
                    if (topic?.TopicArn) {

                        this.#addEdgeSafe(
                            alarm.AlarmArn ?? name,
                            topic.TopicArn
                        );

                    }

                }

            }

        }

    }

    #addCompositeAlarms (rs: Inventory, region: string): void {

        for (const alarm of rs.getCompositeAlarmsByRegion(region)) {

            const name = alarm.AlarmName;
            if (!name) {

                continue;

            }

            this.#addNode(
                alarm.AlarmArn ?? name,
                "compositealarm",
                name,
                {
                    "state": alarm.StateValue ?? "UNKNOWN",
                    "rule": alarm.AlarmRule ?? ""
                }
            );

            // compositeAlarm → region
            this.#addEdgeSafe(
                alarm.AlarmArn ?? name,
                region
            );

            /*
             * Link to referenced metric alarms via AlarmRule
             * AlarmRule format: "ALARM(alarm-name) AND ALARM(other-alarm-name)"
             */
            const alarmNameRegex = /ALARM\(([^)]+)\)/g;
            let match = alarmNameRegex.exec(alarm.AlarmRule ?? "");
            while (match) {

                const referencedName = match[1];
                // Find the metric alarm by name in this region
                const metricAlarms = rs.getMetricAlarmsByRegion(region);
                const referenced = metricAlarms.find((a) => a.AlarmName === referencedName);
                if (referenced?.AlarmArn) {

                    this.#addEdgeSafe(
                        alarm.AlarmArn ?? name,
                        referenced.AlarmArn
                    );

                }
                match = alarmNameRegex.exec(alarm.AlarmRule ?? "");

            }

        }

    }

    // ─── Subscription Filters (edges only) ─────────────────────────────────

    #addSubscriptionFilters (rs: Inventory, region: string): void {

        for (const filter of rs.getSubscriptionFiltersByRegion(region)) {

            if (!filter.logGroupName || !filter.destinationArn) {

                continue;

            }

            // Find the log group node by name
            const logGroups = rs.getLogGroupsByRegion(region);
            const logGroup = logGroups.find((lg) => lg.logGroupName === filter.logGroupName);
            const logGroupId = logGroup?.arn ?? filter.logGroupName;

            // Add edge from log group → destination (Lambda, Kinesis, etc.)
            this.#addEdgeSafe(
                logGroupId,
                filter.destinationArn
            );

        }

    }

    // ─── Metric Streams ───────────────────────────────────────────────────

    #addMetricStreams (rs: Inventory, region: string): void {

        for (const stream of rs.getMetricStreamsByRegion(region)) {

            const arn = stream.Arn;
            if (!arn) {

                continue;

            }

            this.#addNode(
                arn,
                "metricstream",
                stream.Name ?? arn,
                {"state": stream.State}
            );
            // metric stream → region
            this.#addEdgeSafe(
                arn,
                region
            );
            // metric stream → Firehose delivery stream
            if (stream.FirehoseArn) {

                this.#addEdgeSafe(
                    arn,
                    stream.FirehoseArn
                );

            }

        }

    }

    // ─── Metric Filters ───────────────────────────────────────────────────

    #addMetricFilters (rs: Inventory, region: string): void {

        for (const filter of rs.getMetricFiltersByRegion(region)) {

            if (!filter.logGroupName || !filter.filterName) {

                continue;

            }

            // find the log group node
            const logGroups = rs.getLogGroupsByRegion(region);
            const logGroup = logGroups.find((lg) => lg.logGroupName === filter.logGroupName);
            const logGroupId = logGroup?.arn ?? filter.logGroupName;

            // find alarms that reference the metric this filter creates
            for (const transform of filter.metricTransformations ?? []) {

                const alarmsByMetric = rs.getMetricAlarmsByRegion(region).
                    filter((a) => a.Namespace === transform.metricNamespace &&
                      a.MetricName === transform.metricName);
                for (const alarm of alarmsByMetric) {

                    if (alarm.AlarmArn) {

                        // log group → alarm (via metric filter)
                        this.#addEdgeSafe(
                            logGroupId,
                            alarm.AlarmArn
                        );

                    }

                }

            }

        }

    }

    // ─── CW Logs Deliveries ───────────────────────────────────────────────

    #addDeliveries (rs: Inventory, region: string): void {

        // Build a map of destination name → ARN
        const destMap = new Map<string, string>();
        for (const dest of rs.getDeliveryDestinationsByRegion(region)) {

            if (dest.name && dest.arn) {

                destMap.set(
                    dest.name,
                    dest.arn
                );

            }

            // delivery destination → actual resource (S3, Firehose, CW Logs)
            const resourceArn = dest.deliveryDestinationConfiguration?.destinationResourceArn;
            if (dest.arn && resourceArn) {

                this.#addNode(
                    dest.arn,
                    "deliverydestination",
                    dest.name ?? dest.arn
                );
                this.#addEdgeSafe(
                    dest.arn,
                    resourceArn
                );

            }

        }

        // Build a map of source name → resource ARNs
        const sourceMap = new Map<string, string[]>();
        for (const src of rs.getDeliverySourcesByRegion(region)) {

            if (src.name) {

                sourceMap.set(
                    src.name,
                    src.resourceArns ?? []
                );

            }

        }

        // Delivery: source resource → delivery destination
        for (const delivery of rs.getDeliveriesByRegion(region)) {

            if (!delivery.arn) {

                continue;

            }

            const sourceResourceArns = sourceMap.get(delivery.deliverySourceName ?? "") ?? [];

            for (const srcArn of sourceResourceArns) {

                // source (log group/resource) → delivery destination
                this.#addEdgeSafe(
                    srcArn,
                    delivery.deliveryDestinationArn
                );

            }

        }

    }

    // ─── Amazon MQ ─────────────────────────────────────────────────────────

    #addMqResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const broker of rs.getMqBrokersByRegion(regionName)) {

                const arn = broker.BrokerArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "mqbroker",
                    broker.BrokerName ?? arn,
                    {"engineType": broker.EngineType,
                        "deploymentMode": broker.DeploymentMode,
                        "state": broker.BrokerState}
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

            for (const config of rs.getMqConfigurationsByRegion(regionName)) {

                const arn = config.Arn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "mqconfiguration",
                    config.Name ?? arn,
                    {"engineType": config.EngineType}
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

        }

    }

    // ─── MWAA ─────────────────────────────────────────────────────────────

    #addMwaaResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const env of rs.getMwaaEnvironmentsByRegion(regionName)) {

                const arn = env.Arn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "mwaaenvironment",
                    env.Name ?? arn,
                    {"status": env.Status}
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                // environment → execution role
                if (env.ExecutionRoleArn) {

                    if (env.ExecutionRoleArn) {

                        const resolvedRole = rs.getRoleByArn(env.ExecutionRoleArn);
                        this.#addEdgeSafe(
                            arn,
                            resolvedRole?.RoleId
                        );

                    }

                }
                // environment → KMS key
                if (env.KmsKey) {

                    this.#addEdgeSafe(
                        arn,
                        env.KmsKey
                    );

                }
                // environment → source S3 bucket
                if (env.SourceBucketArn) {

                    this.#addEdgeSafe(
                        arn,
                        env.SourceBucketArn
                    );

                }
                // environment → subnets
                for (const subnetId of env.NetworkConfiguration?.SubnetIds ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        subnetId
                    );

                }
                // environment → security groups
                for (const sgId of env.NetworkConfiguration?.SecurityGroupIds ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        sgId
                    );

                }

            }

        }

    }

    // ─── AppRunner ────────────────────────────────────────────────────────

    #addAppRunnerResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            // VPC Connectors
            for (const connector of rs.getVpcConnectorsByRegion(regionName)) {

                const arn = connector.VpcConnectorArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "apprunnerconnector",
                    connector.VpcConnectorName ?? arn
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                // connector → subnets
                for (const subnetId of connector.Subnets ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        subnetId
                    );

                }
                // connector → security groups
                for (const sgId of connector.SecurityGroups ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        sgId
                    );

                }

            }

            // Services
            for (const svc of rs.getAppRunnerServicesByRegion(regionName)) {

                const arn = svc.ServiceArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "apprunnerservice",
                    svc.ServiceName ?? arn,
                    {"status": svc.Status}
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                // service → VPC connector (via egress config)
                const vpcConnectorArn = svc.NetworkConfiguration?.EgressConfiguration?.VpcConnectorArn;
                if (vpcConnectorArn) {

                    this.#addEdgeSafe(
                        arn,
                        vpcConnectorArn
                    );

                }
                // service → IAM instance role
                if (svc.InstanceConfiguration?.InstanceRoleArn) {

                    if (svc.InstanceConfiguration.InstanceRoleArn) {

                        const resolvedRole = rs.getRoleByArn(svc.InstanceConfiguration.InstanceRoleArn);
                        this.#addEdgeSafe(
                            arn,
                            resolvedRole?.RoleId
                        );

                    }

                }

            }

        }

    }

    // ─── Transfer Family ────────────────────────────────────────────────────

    #addTransferResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const server of rs.getTransferServersByRegion(regionName)) {

                const arn = server.Arn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "transferserver",
                    server.ServerId ?? arn,
                    {"endpointType": server.EndpointType,
                        "state": server.State}
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                // server → IAM logging role
                if (server.LoggingRole) {

                    this.#addEdgeSafe(
                        arn,
                        server.LoggingRole
                    );

                }
                // server → VPC (endpoint details)
                if (server.EndpointDetails?.VpcId) {

                    this.#addEdgeSafe(
                        arn,
                        server.EndpointDetails.VpcId
                    );

                }
                // server → subnets
                for (const subnetId of server.EndpointDetails?.SubnetIds ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        subnetId
                    );

                }
                // server → security groups
                for (const sgId of server.EndpointDetails?.SecurityGroupIds ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        sgId
                    );

                }
                // server → VPC endpoint
                if (server.EndpointDetails?.VpcEndpointId) {

                    this.#addEdgeSafe(
                        arn,
                        server.EndpointDetails.VpcEndpointId
                    );

                }

            }

        }

    }

    // ─── VPC Lattice ──────────────────────────────────────────────────────

    #addVpcLatticeResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            // Service Networks
            for (const sn of rs.getLatticeServiceNetworksByRegion(regionName)) {

                const arn = sn.arn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "latticeservicenetwork",
                    sn.name ?? arn
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

            // Services
            for (const svc of rs.getLatticeServicesByRegion(regionName)) {

                const arn = svc.arn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "latticeservice",
                    svc.name ?? arn,
                    {"status": svc.status}
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

            // Target Groups
            for (const tg of rs.getLatticeTargetGroupsByRegion(regionName)) {

                const arn = tg.arn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "latticetargetgroup",
                    tg.name ?? arn,
                    {"type": tg.type,
                        "protocol": tg.protocol}
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

            // Service Network ↔ VPC associations
            for (const assoc of rs.getLatticeVpcAssociationsByRegion(regionName)) {

                if (assoc.serviceNetworkArn && assoc.vpcId) {

                    this.#addEdgeSafe(
                        assoc.serviceNetworkArn,
                        assoc.vpcId
                    );

                }

            }

            // Service Network ↔ Service associations
            for (const assoc of rs.getLatticeServiceAssociationsByRegion(regionName)) {

                if (assoc.serviceNetworkArn && assoc.serviceArn) {

                    this.#addEdgeSafe(
                        assoc.serviceArn,
                        assoc.serviceNetworkArn
                    );

                }

            }

        }

    }

    // ─── Network Manager ───────────────────────────────────────────────────

    #addNetworkManagerResources (rs: Inventory): void {

        // Global Networks
        for (const gn of rs.getGlobalNetworks()) {

            const id = gn.GlobalNetworkId;
            if (!id) {

                continue;

            }

            this.#addNode(
                id,
                "globalnetwork",
                this.#nameTag(gn.Tags) ?? id,
                {"state": gn.State}
            );

        }

        // Sites → global network
        for (const site of rs.getNmSites()) {

            const id = site.SiteId;
            if (!id) {

                continue;

            }

            this.#addNode(
                id,
                "nmsite",
                this.#nameTag(site.Tags) ?? id,
                {"state": site.State}
            );
            this.#addEdgeSafe(
                id,
                site.GlobalNetworkId
            );

        }

        // Devices → site, global network
        for (const device of rs.getNmDevices()) {

            const id = device.DeviceId;
            if (!id) {

                continue;

            }

            this.#addNode(
                id,
                "nmdevice",
                this.#nameTag(device.Tags) ?? id,
                {"type": device.Type}
            );
            this.#addEdgeSafe(
                id,
                device.SiteId
            );

        }

        // Links → site
        for (const link of rs.getNmLinks()) {

            const id = link.LinkId;
            if (!id) {

                continue;

            }

            this.#addNode(
                id,
                "nmlink",
                this.#nameTag(link.Tags) ?? id,
                {"type": link.Type}
            );
            this.#addEdgeSafe(
                id,
                link.SiteId
            );

        }

        // Connections → device ↔ device
        for (const conn of rs.getNmConnections()) {

            const id = conn.ConnectionId;
            if (!id) {

                continue;

            }

            this.#addNode(
                id,
                "nmconnection",
                this.#nameTag(conn.Tags) ?? id
            );
            this.#addEdgeSafe(
                id,
                conn.DeviceId
            );
            this.#addEdgeSafe(
                id,
                conn.ConnectedDeviceId
            );

        }

        // Core Networks → global network
        for (const cn of rs.getCoreNetworks()) {

            const arn = cn.CoreNetworkArn;
            if (!arn) {

                continue;

            }

            this.#addNode(
                arn,
                "corenetwork",
                this.#nameTag(cn.Tags) ?? cn.CoreNetworkId ?? arn,
                {"state": cn.State}
            );
            this.#addEdgeSafe(
                arn,
                cn.GlobalNetworkId
            );

        }

        // Attachments → core network
        for (const att of rs.getNmAttachments()) {

            const id = att.AttachmentId;
            if (!id) {

                continue;

            }

            this.#addNode(
                id,
                "nmattachment",
                id,
                {"type": att.AttachmentType,
                    "state": att.State}
            );
            this.#addEdgeSafe(
                id,
                att.CoreNetworkArn
            );
            // attachment → resource (VPC, TGW) via ResourceArn if present
            if (att.ResourceArn) {

                this.#addEdgeSafe(
                    id,
                    att.ResourceArn
                );

            }

        }

        // TGW Registrations → global network
        for (const reg of rs.getTransitGatewayRegistrations()) {

            if (reg.TransitGatewayArn && reg.GlobalNetworkId) {

                this.#addEdgeSafe(
                    reg.TransitGatewayArn,
                    reg.GlobalNetworkId
                );

            }

        }

    }

    // ─── IoT ───────────────────────────────────────────────────────────────

    #addIotResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            // Things
            for (const thing of rs.getIotThingsByRegion(regionName)) {

                const arn = thing.thingArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "iotthing",
                    thing.thingName ?? arn,
                    {"thingTypeName": thing.thingTypeName}
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

            // Thing Types
            for (const tt of rs.getIotThingTypesByRegion(regionName)) {

                const arn = tt.thingTypeArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "iotthingtype",
                    tt.thingTypeName ?? arn
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

            // Thing Groups
            for (const grp of rs.getIotThingGroupsByRegion(regionName)) {

                const arn = grp.groupArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "iotthinggroup",
                    grp.groupName ?? arn
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

            // Certificates
            for (const cert of rs.getIotCertificatesByRegion(regionName)) {

                const arn = cert.certificateArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "iotcertificate",
                    cert.certificateId ?? arn,
                    {"status": cert.status}
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

            // Topic Rules
            for (const rule of rs.getIotTopicRulesByRegion(regionName)) {

                const arn = rule.ruleArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "iottopicrule",
                    rule.ruleName ?? arn
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

            // Topic Rule Destinations
            for (const dest of rs.getIotTopicRuleDestinationsByRegion(regionName)) {

                const arn = dest.arn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "iotruledestination",
                    arn,
                    {"status": dest.status}
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                // destination → VPC (if VPC destination)
                if (dest.vpcDestinationSummary?.vpcId) {

                    this.#addEdgeSafe(
                        arn,
                        dest.vpcDestinationSummary.vpcId
                    );

                }

            }

            // Link things to their type
            for (const thing of rs.getIotThingsByRegion(regionName)) {

                if (thing.thingArn && thing.thingTypeName) {

                    const thingType = rs.getIotThingTypesByRegion(regionName).
                        find((tt) => tt.thingTypeName === thing.thingTypeName);
                    if (thingType?.thingTypeArn) {

                        this.#addEdgeSafe(
                            thing.thingArn,
                            thingType.thingTypeArn
                        );

                    }

                }

            }

        }

    }


    // ─── AWS Glue ─────────────────────────────────────────────────────────

    #addGlueResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const conn of rs.getGlueConnectionsByRegion(regionName)) {

                const name = conn.Name;
                if (!name) {

                    continue;

                }

                this.#addNode(
                    name,
                    "glueconnection",
                    name,
                    {"connectionType": conn.ConnectionType}
                );
                this.#addEdgeSafe(
                    name,
                    regionName
                );

                const pcr = conn.PhysicalConnectionRequirements;
                if (pcr) {

                    if (pcr.SubnetId) {

                        this.#addEdgeSafe(
                            name,
                            pcr.SubnetId
                        );

                    }

                    for (const sg of pcr.SecurityGroupIdList ?? []) {

                        this.#addEdgeSafe(
                            name,
                            sg
                        );

                    }

                }

            }

            for (const crawler of rs.getGlueCrawlersByRegion(regionName)) {

                const name = crawler.Name;
                if (!name) {

                    continue;

                }

                this.#addNode(
                    name,
                    "gluecrawler",
                    name,
                    {"state": crawler.State}
                );
                this.#addEdgeSafe(
                    name,
                    regionName
                );

                if (crawler.Role) {

                    if (crawler.Role) {

                        const resolvedRole = rs.getRoleByArn(crawler.Role);
                        this.#addEdgeSafe(
                            name,
                            resolvedRole?.RoleId
                        );

                    }

                }

            }

            for (const db of rs.getGlueDatabasesByRegion(regionName)) {

                const name = db.Name;
                if (!name) {

                    continue;

                }

                this.#addNode(
                    name,
                    "gluedatabase",
                    name
                );
                this.#addEdgeSafe(
                    name,
                    regionName
                );

            }

            for (const job of rs.getGlueJobsByRegion(regionName)) {

                const name = job.Name;
                if (!name) {

                    continue;

                }

                this.#addNode(
                    name,
                    "gluejob",
                    name,
                    {"glueVersion": job.GlueVersion,
                        "workerType": job.WorkerType}
                );
                this.#addEdgeSafe(
                    name,
                    regionName
                );

                if (job.Role) {

                    if (job.Role) {

                        const resolvedRole = rs.getRoleByArn(job.Role);
                        this.#addEdgeSafe(
                            name,
                            resolvedRole?.RoleId
                        );

                    }

                }

                for (const connName of job.Connections?.Connections ?? []) {

                    this.#addEdgeSafe(
                        name,
                        connName
                    );

                }

            }

            for (const trigger of rs.getGlueTriggersByRegion(regionName)) {

                const name = trigger.Name;
                if (!name) {

                    continue;

                }

                this.#addNode(
                    name,
                    "gluetrigger",
                    name,
                    {"type": trigger.Type,
                        "state": trigger.State}
                );
                this.#addEdgeSafe(
                    name,
                    regionName
                );

                for (const action of trigger.Actions ?? []) {

                    if (action.JobName) {

                        this.#addEdgeSafe(
                            name,
                            action.JobName
                        );

                    }

                }

            }

            for (const table of rs.getGlueTablesByRegion(regionName)) {

                const name = table.Name;
                if (!name) {

                    continue;

                }

                const id = `${table.DatabaseName ?? ""}/${name}`;
                this.#addNode(
                    id,
                    "gluetable",
                    name
                );
                if (table.DatabaseName) {

                    this.#addEdgeSafe(
                        id,
                        table.DatabaseName
                    );

                }

            }

            for (const registry of rs.getGlueRegistriesByRegion(regionName)) {

                const arn = registry.RegistryArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "glueregistry",
                    registry.RegistryName ?? arn
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

            for (const schema of rs.getGlueSchemasByRegion(regionName)) {

                const arn = schema.SchemaArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "glueschema",
                    schema.SchemaName ?? arn
                );
                if (schema.RegistryName) {

                    this.#addEdgeSafe(
                        arn,
                        schema.RegistryName
                    );

                }

            }

            for (const wf of rs.getGlueWorkflowsByRegion(regionName)) {

                const name = wf.Name;
                if (!name) {

                    continue;

                }

                this.#addNode(
                    name,
                    "glueworkflow",
                    name
                );
                this.#addEdgeSafe(
                    name,
                    regionName
                );

            }

        }

    }

    // ─── DMS ──────────────────────────────────────────────────────────────

    #addDmsResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const inst of rs.getDmsReplicationInstancesByRegion(regionName)) {

                const arn = inst.ReplicationInstanceArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "dmsreplicationinstance",
                    inst.ReplicationInstanceIdentifier ?? arn,
                    {"instanceClass": inst.ReplicationInstanceClass,
                        "status": inst.ReplicationInstanceStatus}
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

                for (const sg of inst.VpcSecurityGroups ?? []) {

                    if (sg.VpcSecurityGroupId) {

                        this.#addEdgeSafe(
                            arn,
                            sg.VpcSecurityGroupId
                        );

                    }

                }

            }

            for (const sg of rs.getDmsSubnetGroupsByRegion(regionName)) {

                const id = sg.ReplicationSubnetGroupIdentifier;
                if (!id) {

                    continue;

                }

                this.#addNode(
                    id,
                    "dmssubnetgroup",
                    id
                );
                this.#addEdgeSafe(
                    id,
                    regionName
                );

            }

            for (const ep of rs.getDmsEndpointsByRegion(regionName)) {

                const arn = ep.EndpointArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "dmsendpoint",
                    ep.EndpointIdentifier ?? arn,
                    {"endpointType": ep.EndpointType,
                        "engineName": ep.EngineName}
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

            for (const task of rs.getDmsReplicationTasksByRegion(regionName)) {

                const arn = task.ReplicationTaskArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "dmsreplicationtask",
                    task.ReplicationTaskIdentifier ?? arn,
                    {"status": task.Status,
                        "migrationType": task.MigrationType}
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

                if (task.ReplicationInstanceArn) {

                    this.#addEdgeSafe(
                        arn,
                        task.ReplicationInstanceArn
                    );

                }

                if (task.SourceEndpointArn) {

                    this.#addEdgeSafe(
                        arn,
                        task.SourceEndpointArn
                    );

                }

                if (task.TargetEndpointArn) {

                    this.#addEdgeSafe(
                        arn,
                        task.TargetEndpointArn
                    );

                }

            }

        }

    }

    // ─── Route53 Resolver ─────────────────────────────────────────────────

    #addRoute53ResolverResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const ep of rs.getResolverEndpointsByRegion(regionName)) {

                const id = ep.Id;
                if (!id) {

                    continue;

                }

                this.#addNode(
                    id,
                    "resolverendpoint",
                    ep.Name ?? id,
                    {"direction": ep.Direction,
                        "status": ep.Status}
                );
                this.#addEdgeSafe(
                    id,
                    regionName
                );

                if (ep.HostVPCId) {

                    this.#addEdgeSafe(
                        id,
                        ep.HostVPCId
                    );

                }

                for (const sgId of ep.SecurityGroupIds ?? []) {

                    this.#addEdgeSafe(
                        id,
                        sgId
                    );

                }

            }

            for (const rule of rs.getResolverRulesByRegion(regionName)) {

                const id = rule.Id;
                if (!id) {

                    continue;

                }

                if (rule.RuleType === "SYSTEM" || rule.RuleType === "RECURSIVE") {

                    continue;

                }

                this.#addNode(
                    id,
                    "resolverrule",
                    rule.Name ?? id,
                    {"ruleType": rule.RuleType,
                        "status": rule.Status}
                );
                this.#addEdgeSafe(
                    id,
                    regionName
                );

            }

            const systemRuleIds = new Set(rs.getResolverRulesByRegion(regionName).
                filter((r) => r.RuleType === "SYSTEM" || r.RuleType === "RECURSIVE").
                map((r) => r.Id).
                filter(Boolean));

            for (const assoc of rs.getResolverRuleAssociationsByRegion(regionName)) {

                const id = assoc.Id;
                if (!id) {

                    continue;

                }

                if (assoc.ResolverRuleId && systemRuleIds.has(assoc.ResolverRuleId)) {

                    continue;

                }

                this.#addNode(
                    id,
                    "resolverruleassociation",
                    assoc.Name ?? id,
                    {"status": assoc.Status}
                );

                if (assoc.ResolverRuleId) {

                    this.#addEdgeSafe(
                        id,
                        assoc.ResolverRuleId
                    );

                }

                if (assoc.VPCId) {

                    this.#addEdgeSafe(
                        id,
                        assoc.VPCId
                    );

                }

            }

            for (const grp of rs.getFirewallRuleGroupsByRegion(regionName)) {

                const arn = grp.Arn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "firewallrulegroup",
                    grp.Name ?? arn
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

            for (const assoc of rs.getFirewallRuleGroupAssociationsByRegion(regionName)) {

                const id = assoc.Id;
                if (!id) {

                    continue;

                }

                this.#addNode(
                    id,
                    "firewallrulegroupassociation",
                    assoc.Name ?? id,
                    {"status": assoc.Status}
                );

                if (assoc.VpcId) {

                    this.#addEdgeSafe(
                        id,
                        assoc.VpcId
                    );

                }

                if (assoc.FirewallRuleGroupId) {

                    this.#addEdgeSafe(
                        id,
                        assoc.FirewallRuleGroupId
                    );

                }

            }

        }

    }

    // ─── DataSync ──────────────────────────────────────────────────────────

    #addDataSyncResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            // Agents
            for (const agent of rs.getDataSyncAgentsByRegion(regionName)) {

                const arn = agent.AgentArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "datasyncagent",
                    agent.Name ?? arn,
                    {"status": agent.Status}
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

            // Locations
            for (const loc of rs.getDataSyncLocationsByRegion(regionName)) {

                const arn = loc.LocationArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "datasynclocation",
                    loc.LocationUri ?? arn
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

            // Tasks (with source/destination edges)
            for (const task of rs.getDataSyncTasksByRegion(regionName)) {

                const arn = task.TaskArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "datasynctask",
                    task.Name ?? arn,
                    {"status": task.Status}
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                // task → source location
                if (task.SourceLocationArn) {

                    this.#addEdgeSafe(
                        arn,
                        task.SourceLocationArn
                    );

                }
                // task → destination location
                if (task.DestinationLocationArn) {

                    this.#addEdgeSafe(
                        arn,
                        task.DestinationLocationArn
                    );

                }
                // task → CloudWatch log group
                if (task.CloudWatchLogGroupArn) {

                    this.#addEdgeSafe(
                        arn,
                        task.CloudWatchLogGroupArn
                    );

                }

            }

        }

    }

    // ─── AppSync ──────────────────────────────────────────────────────────

    #addAppSyncResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            // GraphQL APIs
            for (const api of rs.getGraphqlApisByRegion(regionName)) {

                const arn = api.arn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "graphqlapi",
                    api.name ?? arn,
                    {"authType": api.authenticationType}
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                // api → WAF Web ACL
                if (api.wafWebAclArn) {

                    this.#addEdgeSafe(
                        arn,
                        api.wafWebAclArn
                    );

                }

            }

            // Data Sources
            for (const ds of rs.getAppSyncDataSourcesByRegion(regionName)) {

                const arn = ds.dataSourceArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "appsyncdatasource",
                    ds.name ?? arn,
                    {"type": ds.type}
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                // data source → IAM service role
                if (ds.serviceRoleArn) {

                    if (ds.serviceRoleArn) {

                        const resolvedRole = rs.getRoleByArn(ds.serviceRoleArn);
                        this.#addEdgeSafe(
                            arn,
                            resolvedRole?.RoleId
                        );

                    }

                }
                // data source → Lambda function
                if (ds.lambdaConfig?.lambdaFunctionArn) {

                    this.#addEdgeSafe(
                        arn,
                        ds.lambdaConfig.lambdaFunctionArn
                    );

                }
                // data source → DynamoDB table (construct ARN)
                if (ds.dynamodbConfig?.tableName && ds.dynamodbConfig.awsRegion) {

                    // Find matching DynamoDB table node by name
                    const tableArn = `arn:aws:dynamodb:${ds.dynamodbConfig.awsRegion}:*:table/${ds.dynamodbConfig.tableName}`;
                    this.#addEdgeSafe(
                        arn,
                        tableArn
                    );

                }

            }

        }

    }

    // ─── Redshift Serverless ─────────────────────────────────────────────

    #addRedshiftServerlessResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const ns of rs.getRsNamespacesByRegion(regionName)) {

                const arn = ns.namespaceArn;
                if (!arn) {

                    continue;

                }
                this.#addNode(
                    arn,
                    "rsnamespace",
                    ns.namespaceName ?? arn
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                if (ns.kmsKeyId) {

                    this.#addEdgeSafe(
                        arn,
                        ns.kmsKeyId
                    );

                }

            }

            for (const wg of rs.getRsWorkgroupsByRegion(regionName)) {

                const arn = wg.workgroupArn;
                if (!arn) {

                    continue;

                }
                this.#addNode(
                    arn,
                    "rsworkgroup",
                    wg.workgroupName ?? arn
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                for (const subnetId of wg.subnetIds ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        subnetId
                    );

                }
                for (const sgId of wg.securityGroupIds ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        sgId
                    );

                }
                // workgroup → namespace
                if (wg.namespaceName) {

                    const ns = rs.getRsNamespacesByRegion(regionName).find((n) => n.namespaceName === wg.namespaceName);
                    if (ns?.namespaceArn) {

                        this.#addEdgeSafe(
                            arn,
                            ns.namespaceArn
                        );

                    }

                }

            }

        }

    }

    // ─── OpenSearch Serverless ────────────────────────────────────────────

    #addOpenSearchServerlessResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const col of rs.getOssCollectionsByRegion(regionName)) {

                const arn = col.arn;
                if (!arn) {

                    continue;

                }
                this.#addNode(
                    arn,
                    "osscollection",
                    col.name ?? arn,
                    {"status": col.status}
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

            for (const ep of rs.getOssVpcEndpointsByRegion(regionName)) {

                if (!ep.id) {

                    continue;

                }
                this.#addNode(
                    ep.id,
                    "ossvpcendpoint",
                    ep.name ?? ep.id,
                    {"status": ep.status}
                );
                this.#addEdgeSafe(
                    ep.id,
                    regionName
                );

            }

        }

    }

    // ─── Directory Service ────────────────────────────────────────────────

    #addDirectoryServiceResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const dir of rs.getDirectoriesByRegion(regionName)) {

                const id = dir.DirectoryId;
                if (!id) {

                    continue;

                }
                this.#addNode(
                    id,
                    "directory",
                    dir.Name ?? id,
                    {"type": dir.Type}
                );
                this.#addEdgeSafe(
                    id,
                    regionName
                );
                if (dir.VpcSettings?.VpcId) {

                    this.#addEdgeSafe(
                        id,
                        dir.VpcSettings.VpcId
                    );

                }
                for (const subnetId of dir.VpcSettings?.SubnetIds ?? []) {

                    this.#addEdgeSafe(
                        id,
                        subnetId
                    );

                }

            }

        }

    }

    // ─── WorkSpaces ───────────────────────────────────────────────────────

    #addWorkspacesResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const ws of rs.getWorkspacesByRegion(regionName)) {

                const id = ws.WorkspaceId;
                if (!id) {

                    continue;

                }
                this.#addNode(
                    id,
                    "workspace",
                    id,
                    {"state": ws.State}
                );
                this.#addEdgeSafe(
                    id,
                    regionName
                );
                if (ws.DirectoryId) {

                    this.#addEdgeSafe(
                        id,
                        ws.DirectoryId
                    );

                }
                if (ws.SubnetId) {

                    this.#addEdgeSafe(
                        id,
                        ws.SubnetId
                    );

                }

            }

        }

    }

    // ─── CloudHSM ────────────────────────────────────────────────────────

    #addCloudHsmResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const cluster of rs.getHsmClustersByRegion(regionName)) {

                const id = cluster.ClusterId;
                if (!id) {

                    continue;

                }
                this.#addNode(
                    id,
                    "hsmcluster",
                    id,
                    {"state": cluster.State}
                );
                this.#addEdgeSafe(
                    id,
                    regionName
                );
                if (cluster.VpcId) {

                    this.#addEdgeSafe(
                        id,
                        cluster.VpcId
                    );

                }
                if (cluster.SecurityGroup) {

                    this.#addEdgeSafe(
                        id,
                        cluster.SecurityGroup
                    );

                }
                for (const subnetId of Object.values(cluster.SubnetMapping ?? {})) {

                    this.#addEdgeSafe(
                        id,
                        subnetId
                    );

                }

            }

        }

    }

    // ─── App Mesh ─────────────────────────────────────────────────────────

    #addAppMeshResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const mesh of rs.getMeshesByRegion(regionName)) {

                const arn = mesh.arn;
                if (!arn) {

                    continue;

                }
                this.#addNode(
                    arn,
                    "appmesh",
                    mesh.meshName ?? arn
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

            for (const node of rs.getVirtualNodesByRegion(regionName)) {

                const arn = node.arn;
                if (!arn) {

                    continue;

                }
                this.#addNode(
                    arn,
                    "appmeshnode",
                    node.virtualNodeName ?? arn
                );
                // virtual node → mesh
                const mesh = rs.getMeshesByRegion(regionName).find((m) => m.meshName === node.meshName);
                if (mesh?.arn) {

                    this.#addEdgeSafe(
                        arn,
                        mesh.arn
                    );

                }

            }

            for (const svc of rs.getVirtualServicesByRegion(regionName)) {

                const arn = svc.arn;
                if (!arn) {

                    continue;

                }
                this.#addNode(
                    arn,
                    "appmeshservice",
                    svc.virtualServiceName ?? arn
                );
                const mesh = rs.getMeshesByRegion(regionName).find((m) => m.meshName === svc.meshName);
                if (mesh?.arn) {

                    this.#addEdgeSafe(
                        arn,
                        mesh.arn
                    );

                }

            }

        }

    }

    // ─── S3 Control ───────────────────────────────────────────────────────

    #addS3ControlResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const ap of rs.getS3AccessPointsByRegion(regionName)) {

                const arn = ap.AccessPointArn;
                if (!arn) {

                    continue;

                }
                this.#addNode(
                    arn,
                    "s3accesspoint",
                    ap.Name ?? arn
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                // access point → bucket
                if (ap.Bucket) {

                    const bucketArn = ap.Bucket.startsWith("arn:")
                        ? ap.Bucket
                        : `arn:aws:s3:::${ap.Bucket}`;
                    this.#addEdgeSafe(
                        arn,
                        bucketArn
                    );

                }
                // access point → VPC
                if (ap.VpcConfiguration?.VpcId) {

                    this.#addEdgeSafe(
                        arn,
                        ap.VpcConfiguration.VpcId
                    );

                }

            }

        }

    }

    // ─── Classic ELB ────────────────────────────────────────────────────────

    #addClassicElbResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const elb of rs.getClassicLoadBalancersByRegion(regionName)) {

                const name = elb.LoadBalancerName;
                if (!name) {

                    continue;

                }

                this.#addNode(
                    name,
                    "classicelb",
                    name
                );
                this.#addEdgeSafe(
                    name,
                    regionName
                );
                if (elb.VPCId) {

                    this.#addEdgeSafe(
                        name,
                        elb.VPCId
                    );

                }
                for (const subnetId of elb.Subnets ?? []) {

                    this.#addEdgeSafe(
                        name,
                        subnetId
                    );

                }
                for (const sgId of elb.SecurityGroups ?? []) {

                    this.#addEdgeSafe(
                        name,
                        sgId
                    );

                }
                for (const instance of elb.Instances ?? []) {

                    if (instance.InstanceId) {

                        this.#addEdgeSafe(
                            name,
                            instance.InstanceId
                        );

                    }

                }

            }

        }

    }

    // ─── EventBridge Pipes ────────────────────────────────────────────────

    #addPipesResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const pipe of rs.getPipesByRegion(regionName)) {

                const arn = pipe.Arn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "eventbridgepipe",
                    pipe.Name ?? arn,
                    {"state": pipe.CurrentState}
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                // pipe → source (SQS, Kinesis, DynamoDB Stream)
                if (pipe.Source) {

                    this.#addEdgeSafe(
                        arn,
                        pipe.Source
                    );

                }
                // pipe → target (Lambda, SFN, ECS, API Gateway)
                if (pipe.Target) {

                    this.#addEdgeSafe(
                        arn,
                        pipe.Target
                    );

                }
                // pipe → enrichment (Lambda, SFN, API Gateway)
                if (pipe.Enrichment) {

                    this.#addEdgeSafe(
                        arn,
                        pipe.Enrichment
                    );

                }

            }

        }

    }

    // ─── Storage Gateway ────────────────────────────────────────────────────

    #addStorageGatewayResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            // Gateways
            for (const gw of rs.getGatewaysByRegion(regionName)) {

                const arn = gw.GatewayARN;
                if (!arn) {

                    continue;

                }
                this.#addNode(
                    arn,
                    "storagegateway",
                    gw.GatewayName ?? gw.GatewayId ?? arn,
                    {"type": gw.GatewayType,
                        "state": gw.GatewayOperationalState}
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                // gateway → EC2 instance
                if (gw.Ec2InstanceId) {

                    this.#addEdgeSafe(
                        arn,
                        gw.Ec2InstanceId
                    );

                }

            }

            // File Shares → gateway
            for (const share of rs.getFileSharesByRegion(regionName)) {

                const arn = share.FileShareARN;
                if (!arn) {

                    continue;

                }
                this.#addNode(
                    arn,
                    "sgwfileshare",
                    share.FileShareId ?? arn,
                    {"type": share.FileShareType}
                );
                if (share.GatewayARN) {

                    this.#addEdgeSafe(
                        arn,
                        share.GatewayARN
                    );

                }

            }

            // Volumes → gateway
            for (const vol of rs.getSgwVolumesByRegion(regionName)) {

                const arn = vol.VolumeARN;
                if (!arn) {

                    continue;

                }
                this.#addNode(
                    arn,
                    "sgwvolume",
                    vol.VolumeId ?? arn,
                    {"type": vol.VolumeType}
                );
                if (vol.GatewayARN) {

                    this.#addEdgeSafe(
                        arn,
                        vol.GatewayARN
                    );

                }

            }

        }

    }

    // ─── Outposts ──────────────────────────────────────────────────────────

    #addOutpostsResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const site of rs.getOutpostSitesByRegion(regionName)) {

                const arn = site.SiteArn;
                if (!arn) {

                    continue;

                }
                this.#addNode(
                    arn,
                    "outpostsite",
                    site.Name ?? arn,
                    {"location": "on-premises",
                        "country": site.OperatingAddressCountryCode}
                );

            }

            for (const op of rs.getOutpostsByRegion(regionName)) {

                const arn = op.OutpostArn;
                if (!arn) {

                    continue;

                }
                this.#addNode(
                    arn,
                    "outpost",
                    op.Name ?? arn,
                    {"location": "on-premises",
                        "status": op.LifeCycleStatus}
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                if (op.SiteArn) {

                    this.#addEdgeSafe(
                        arn,
                        op.SiteArn
                    );

                }

            }

        }

    }

    // ─── ImageBuilder ─────────────────────────────────────────────────────

    #addImageBuilderResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const config of rs.getInfraConfigsByRegion(regionName)) {

                const arn = config.arn;
                if (!arn) {

                    continue;

                }
                this.#addNode(
                    arn,
                    "infraconfig",
                    config.name ?? arn
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                if (config.subnetId) {

                    this.#addEdgeSafe(
                        arn,
                        config.subnetId
                    );

                }
                for (const sgId of config.securityGroupIds ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        sgId
                    );

                }

            }

        }

    }

    // ─── CodeDeploy ───────────────────────────────────────────────────────

    #addCodeDeployResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const dg of rs.getDeploymentGroupsByRegion(regionName)) {

                const name = dg.deploymentGroupName;
                if (!name) {

                    continue;

                }
                const nodeId = `codedeploy:${regionName}:${dg.applicationName ?? ""}/${name}`;
                this.#addNode(
                    nodeId,
                    "deploymentgroup",
                    `${dg.applicationName ?? ""}/${name}`,
                    {"platform": dg.computePlatform}
                );
                this.#addEdgeSafe(
                    nodeId,
                    regionName
                );
                if (dg.serviceRoleArn) {

                    if (dg.serviceRoleArn) {

                        const resolvedRole = rs.getRoleByArn(dg.serviceRoleArn);
                        this.#addEdgeSafe(
                            nodeId,
                            resolvedRole?.RoleId
                        );

                    }

                }
                // deployment group → ASGs
                for (const asg of dg.autoScalingGroups ?? []) {

                    if (asg.name) {

                        const asgNode = rs.getAutoScalingGroupsByRegion(regionName).find((g) => g.AutoScalingGroupName === asg.name);
                        if (asgNode?.AutoScalingGroupARN) {

                            this.#addEdgeSafe(
                                nodeId,
                                asgNode.AutoScalingGroupARN
                            );

                        }

                    }

                }

            }

        }

    }

    // ─── MediaConnect ─────────────────────────────────────────────────────

    #addMediaConnectResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const flow of rs.getMediaConnectFlowsByRegion(regionName)) {

                const arn = flow.FlowArn;
                if (!arn) {

                    continue;

                }
                this.#addNode(
                    arn,
                    "mediaconnectflow",
                    flow.Name ?? arn,
                    {"status": flow.Status}
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                // flow → VPC interfaces
                for (const vpcIf of flow.VpcInterfaces ?? []) {

                    if (vpcIf.SubnetId) {

                        this.#addEdgeSafe(
                            arn,
                            vpcIf.SubnetId
                        );

                    }
                    for (const sgId of vpcIf.SecurityGroupIds ?? []) {

                        this.#addEdgeSafe(
                            arn,
                            sgId
                        );

                    }

                }

            }

        }

    }

    // ─── SageMaker ────────────────────────────────────────────────────────

    #addSageMakerResources (rs: Inventory): void {

        for (const region of rs.getAccountRegions()) {

            const regionName = region.RegionName;
            if (!regionName) {

                continue;

            }

            for (const nb of rs.getNotebookInstancesByRegion(regionName)) {

                const arn = nb.NotebookInstanceArn;
                if (!arn) {

                    continue;

                }
                this.#addNode(
                    arn,
                    "notebookinstance",
                    nb.NotebookInstanceName ?? arn,
                    {"status": nb.NotebookInstanceStatus}
                );
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                if (nb.SubnetId) {

                    this.#addEdgeSafe(
                        arn,
                        nb.SubnetId
                    );

                }
                for (const sgId of nb.SecurityGroups ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        sgId
                    );

                }
                if (nb.RoleArn) {

                    if (nb.RoleArn) {

                        const resolvedRole = rs.getRoleByArn(nb.RoleArn);
                        this.#addEdgeSafe(
                            arn,
                            resolvedRole?.RoleId
                        );

                    }

                }

            }

        }

    }

    // ─── Utility methods ─────────────────────────────────────────────────

    /**
     * Extract the "Name" tag value from a Tags array.
     */
    #nameTag (tags: {"Key"?: string;
        "Value"?: string;}[] | undefined): string | undefined {

        return tags?.find((tag) => tag.Key === "Name")?.Value;

    }

    // ─── Batch (regional) ──────────────────────────────────────────────────

    #addBatchResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            // Compute Environments
            for (const ce of rs.getBatchComputeEnvironmentsByRegion(regionName)) {

                const arn = ce.computeEnvironmentArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "batchcomputeenvironment",
                    ce.computeEnvironmentName ?? arn
                );
                // compute environment → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                // compute environment → security groups
                for (const sgId of ce.computeResources?.securityGroupIds ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        sgId
                    );

                }
                // compute environment → subnets
                for (const subnetId of ce.computeResources?.subnets ?? []) {

                    this.#addEdgeSafe(
                        arn,
                        subnetId
                    );

                }
                // compute environment → instance role
                if (ce.computeResources?.instanceRole) {

                    this.#addEdgeSafe(
                        arn,
                        ce.computeResources.instanceRole
                    );

                }
                // compute environment → service role
                if (ce.serviceRole) {

                    this.#addEdgeSafe(
                        arn,
                        ce.serviceRole
                    );

                }
                // compute environment → ECS cluster
                if (ce.ecsClusterArn) {

                    this.#addEdgeSafe(
                        arn,
                        ce.ecsClusterArn
                    );

                }

            }

            // Job Queues
            for (const jq of rs.getBatchJobQueuesByRegion(regionName)) {

                const arn = jq.jobQueueArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "batchjobqueue",
                    jq.jobQueueName ?? arn
                );
                // job queue → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                // job queue → compute environments
                for (const ceOrder of jq.computeEnvironmentOrder ?? []) {

                    if (ceOrder.computeEnvironment) {

                        this.#addEdgeSafe(
                            arn,
                            ceOrder.computeEnvironment
                        );

                    }

                }
                // job queue → scheduling policy
                if (jq.schedulingPolicyArn) {

                    this.#addEdgeSafe(
                        arn,
                        jq.schedulingPolicyArn
                    );

                }

            }

            // Scheduling Policies
            for (const sp of rs.getBatchSchedulingPoliciesByRegion(regionName)) {

                const arn = sp.arn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "batchschedulingpolicy",
                    arn.split("/").pop() ?? arn
                );
                // scheduling policy → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

        }

    }

    // ─── MemoryDB (regional) ───────────────────────────────────────────────

    #addMemoryDbResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            // Subnet Groups
            for (const sg of rs.getMemoryDbSubnetGroupsByRegion(regionName)) {

                const arn = sg.ARN;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "memorydbsubnetgroup",
                    sg.Name ?? arn
                );
                // subnet group → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                // subnet group → VPC
                if (sg.VpcId) {

                    this.#addEdgeSafe(
                        arn,
                        sg.VpcId
                    );

                }
                // subnet group → subnets
                for (const subnet of sg.Subnets ?? []) {

                    if (subnet.Identifier) {

                        this.#addEdgeSafe(
                            arn,
                            subnet.Identifier
                        );

                    }

                }

            }

            // ACLs
            for (const acl of rs.getMemoryDbAclsByRegion(regionName)) {

                const arn = acl.ARN;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "memorydbacl",
                    acl.Name ?? arn
                );
                // ACL → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

            // Users
            for (const user of rs.getMemoryDbUsersByRegion(regionName)) {

                const arn = user.ARN;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "memorydbuser",
                    user.Name ?? arn
                );
                // user → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                // user → ACLs
                for (const aclName of user.ACLNames ?? []) {

                    const acls = rs.getMemoryDbAclsByRegion(regionName);
                    const acl = acls.find((a) => a.Name === aclName);
                    if (acl?.ARN) {

                        this.#addEdgeSafe(
                            arn,
                            acl.ARN
                        );

                    }

                }

            }

            // Clusters
            for (const cluster of rs.getMemoryDbClustersByRegion(regionName)) {

                const clusterArn = cluster.ARN;
                if (!clusterArn) {

                    continue;

                }

                this.#addNode(
                    clusterArn,
                    "memorydbcluster",
                    cluster.Name ?? clusterArn
                );
                // cluster → region
                this.#addEdgeSafe(
                    clusterArn,
                    regionName
                );
                // cluster → security groups
                for (const sg of cluster.SecurityGroups ?? []) {

                    if (sg.SecurityGroupId) {

                        this.#addEdgeSafe(
                            clusterArn,
                            sg.SecurityGroupId
                        );

                    }

                }
                // cluster → subnet group
                if (cluster.SubnetGroupName) {

                    const subnetGroups = rs.getMemoryDbSubnetGroupsByRegion(regionName);
                    const sg = subnetGroups.find((g) => g.Name === cluster.SubnetGroupName);
                    if (sg?.ARN) {

                        this.#addEdgeSafe(
                            clusterArn,
                            sg.ARN
                        );

                    }

                }
                // cluster → ACL
                if (cluster.ACLName) {

                    const acls = rs.getMemoryDbAclsByRegion(regionName);
                    const acl = acls.find((a) => a.Name === cluster.ACLName);
                    if (acl?.ARN) {

                        this.#addEdgeSafe(
                            clusterArn,
                            acl.ARN
                        );

                    }

                }
                // cluster → KMS key
                if (cluster.KmsKeyId) {

                    this.#addEdgeSafe(
                        clusterArn,
                        cluster.KmsKeyId
                    );

                }

            }

        }

    }

    // ─── EMR (regional) ────────────────────────────────────────────────────

    #addEmrResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            // Clusters
            for (const cluster of rs.getEmrClustersByRegion(regionName)) {

                const arn = cluster.ClusterArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "emrcluster",
                    cluster.Name ?? arn
                );
                // cluster → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

            // Security Configurations
            for (const config of rs.getEmrSecurityConfigsByRegion(regionName)) {

                if (!config.Name) {

                    continue;

                }

                const nodeId = "emr-secconfig:" + regionName + ":" + config.Name;
                this.#addNode(
                    nodeId,
                    "emrsecurityconfiguration",
                    config.Name
                );
                // security config → region
                this.#addEdgeSafe(
                    nodeId,
                    regionName
                );

            }

        }

    }

    // ─── EMR Serverless (regional) ─────────────────────────────────────────

    #addEmrServerlessResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            for (const app of rs.getEmrServerlessAppsByRegion(regionName)) {

                const arn = app.arn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "emrserverlessapplication",
                    app.name ?? arn,
                    {"type": app.type,
                        "state": app.state}
                );
                // application → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

        }

    }

    // ─── Elastic Beanstalk (regional) ──────────────────────────────────────

    #addBeanstalkResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            // Applications
            for (const app of rs.getBeanstalkAppsByRegion(regionName)) {

                const arn = app.ApplicationArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "beanstalkapplication",
                    app.ApplicationName ?? arn
                );
                // application → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );

            }

            // Environments
            for (const env of rs.getBeanstalkEnvsByRegion(regionName)) {

                const arn = env.EnvironmentArn;
                if (!arn) {

                    continue;

                }

                this.#addNode(
                    arn,
                    "beanstalkenvironment",
                    env.EnvironmentName ?? arn,
                    {"status": env.Status,
                        "health": env.Health}
                );
                // environment → region
                this.#addEdgeSafe(
                    arn,
                    regionName
                );
                // environment → application
                if (env.ApplicationName) {

                    const apps = rs.getBeanstalkAppsByRegion(regionName);
                    const app = apps.find((a) => a.ApplicationName === env.ApplicationName);
                    if (app?.ApplicationArn) {

                        this.#addEdgeSafe(
                            arn,
                            app.ApplicationArn
                        );

                    }

                }

            }

        }

    }

    // ─── Athena (regional) ─────────────────────────────────────────────────

    #addAthenaResources (rs: Inventory): void {

        for (const reg of rs.getAccountRegions()) {

            const regionName = reg.RegionName;
            if (!regionName) {

                continue;

            }

            // Work Groups
            for (const wg of rs.getAthenaWorkGroupsByRegion(regionName)) {

                if (!wg.Name) {

                    continue;

                }

                const nodeId = "arn:aws:athena:" + regionName + ":workgroup/" + wg.Name;
                this.#addNode(
                    nodeId,
                    "athenaworkgroup",
                    wg.Name
                );
                // workgroup → region
                this.#addEdgeSafe(
                    nodeId,
                    regionName
                );
                // workgroup → S3 output location
                const outputLocation = wg.Configuration?.ResultConfiguration?.OutputLocation;
                if (outputLocation) {

                    // Extract bucket name from s3://bucket/path
                    const match = outputLocation.match(/^s3:\/\/([^/]+)/);
                    if (match) {

                        const bucketArn = "arn:aws:s3:::" + match[1];
                        this.#addEdgeSafe(
                            nodeId,
                            bucketArn
                        );

                    }

                }

            }

            // Data Catalogs
            for (const catalog of rs.getAthenaDataCatalogsByRegion(regionName)) {

                if (!catalog.CatalogName) {

                    continue;

                }

                const nodeId = "arn:aws:athena:" + regionName + ":datacatalog/" + catalog.CatalogName;
                this.#addNode(
                    nodeId,
                    "athenadatacatalog",
                    catalog.CatalogName,
                    {"type": catalog.Type}
                );
                // data catalog → region
                this.#addEdgeSafe(
                    nodeId,
                    regionName
                );

            }

        }

    }

    /**
     * Connect any isolated node (degree 0) to its region via an 'orphan' edge.
     * These edges indicate the resource has no structural parent in the graph.
     */
    #connectOrphanedNodes (): void {

        this.#graph.forEachNode((node, attrs) => {

            if (this.#graph.degree(node) > 0) {

                return;

            }

            if ((attrs["resourcetype"] as string) === "region") {

                return;

            }

            /*
             * Only connect nodes that have an explicit region attribute or a region in their ARN.
             * Global resources (IAM, CloudFront, Route53) have no region and are left as singletons.
             */
            let targetRegion: string | undefined;

            const explicitRegion = attrs["region"] as string | undefined;
            if (explicitRegion && this.#graph.hasNode(explicitRegion)) {

                targetRegion = explicitRegion;

            }

            if (!targetRegion) {

                const arnMatch = node.match(/:([a-z]{2}-[a-z]+-\d):/u);
                if (arnMatch?.[1] && this.#graph.hasNode(arnMatch[1])) {

                    targetRegion = arnMatch[1];

                }

            }

            if (targetRegion) {

                this.#graph.addDirectedEdge(
                    node,
                    targetRegion,
                    {"edgeType": "orphan"}
                );

            }

        });

    }

}

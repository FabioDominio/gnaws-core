/**
 * AWS resource type → icon and color mapping for graph rendering.
 *
 * Colors follow the official AWS Architecture Icon color palette:
 * - Networking/VPC: #8C4FFF (purple)
 * - Compute: #ED7100 (orange)
 * - Storage: #3B48CC (green)
 * - Security/IAM: #DD344C (red)
 * - Serverless/Lambda: #ED7100 (orange)
 * - General/Other: #232F3E (dark gray)
 */

export interface ResourceTypeConfig {
    "icon": string;
    "color": string;
    "label": string;
}

export const RESOURCE_TYPE_MAP: Record<string, ResourceTypeConfig> = {

    // ─── Organizations (Dark gray #232F3E) ─────────────────────────────────
    "orgroot": {"icon": "region.svg",
        "color": "#232F3E",
        "label": "Org Root"},
    "orgou": {"icon": "region.svg",
        "color": "#232F3E",
        "label": "Org Unit"},
    "orgaccount": {"icon": "region.svg",
        "color": "#232F3E",
        "label": "Account"},
    "orgpolicy": {"icon": "policy.svg",
        "color": "#232F3E",
        "label": "Org Policy"},

    // ─── Networking (Purple #8C4FFF) ─────────────────────────────────────
    "region": {"icon": "region.svg",
        "color": "#232F3E",
        "label": "Region"},
    "vpc": {"icon": "vpc.svg",
        "color": "#8C4FFF",
        "label": "VPC"},
    "subnet": {"icon": "subnet.svg",
        "color": "#8C4FFF",
        "label": "Subnet"},
    "securitygroup": {"icon": "securitygroup.svg",
        "color": "#DD344C",
        "label": "Security Group"},
    "internetgateway": {"icon": "internetgateway.svg",
        "color": "#8C4FFF",
        "label": "Internet Gateway"},
    "natgateway": {"icon": "natgateway.svg",
        "color": "#8C4FFF",
        "label": "NAT Gateway"},
    "egressonlyinternetgateway": {"icon": "internetgateway.svg",
        "color": "#8C4FFF",
        "label": "Egress-only IGW"},
    "networkinterface": {"icon": "networkinterface.svg",
        "color": "#8C4FFF",
        "label": "Network Interface"},
    "routetable": {"icon": "routetable.svg",
        "color": "#8C4FFF",
        "label": "Route Table"},
    "vpcendpoint": {"icon": "vpcendpoint.svg",
        "color": "#8C4FFF",
        "label": "VPC Endpoint"},
    "vpcpeering": {"icon": "vpcpeering.svg",
        "color": "#8C4FFF",
        "label": "VPC Peering"},
    "flowlog": {"icon": "flowlog.svg",
        "color": "#8C4FFF",
        "label": "Flow Log"},
    "networkacl": {"icon": "networkacl.svg",
        "color": "#8C4FFF",
        "label": "Network ACL"},
    "dhcpoptions": {"icon": "dhcpoptions.svg",
        "color": "#8C4FFF",
        "label": "DHCP Options"},
    "prefixlist": {"icon": "prefixlist.svg",
        "color": "#8C4FFF",
        "label": "Prefix List"},
    "transitgateway": {"icon": "transitgateway.svg",
        "color": "#8C4FFF",
        "label": "Transit Gateway"},
    "transitgatewayattachment": {"icon": "transitgateway.svg",
        "color": "#8C4FFF",
        "label": "TGW Attachment"},
    "transitgatewayroutetable": {"icon": "transitgatewayroutetable.svg",
        "color": "#8C4FFF",
        "label": "TGW Route Table"},
    "transitgatewayvpcattachment": {"icon": "transitgateway.svg",
        "color": "#8C4FFF",
        "label": "TGW VPC Attachment"},
    "transitgatewaypeeringattachment": {"icon": "transitgateway.svg",
        "color": "#8C4FFF",
        "label": "TGW Peering Attachment"},
    "transitgatewayconnect": {"icon": "transitgateway.svg",
        "color": "#8C4FFF",
        "label": "TGW Connect"},
    "transitgatewayconnectpeer": {"icon": "transitgateway.svg",
        "color": "#8C4FFF",
        "label": "TGW Connect Peer"},
    "verifiedaccessinstance": {"icon": "vpcendpoint.svg",
        "color": "#8C4FFF",
        "label": "Verified Access Instance"},
    "verifiedaccesstrustprovider": {"icon": "vpcendpoint.svg",
        "color": "#8C4FFF",
        "label": "VA Trust Provider"},
    "verifiedaccessgroup": {"icon": "vpcendpoint.svg",
        "color": "#8C4FFF",
        "label": "Verified Access Group"},
    "verifiedaccessendpoint": {"icon": "vpcendpoint.svg",
        "color": "#8C4FFF",
        "label": "Verified Access Endpoint"},
    "vpcendpointservice": {"icon": "vpcendpoint.svg",
        "color": "#8C4FFF",
        "label": "VPC Endpoint Service"},
    "localgateway": {"icon": "localgateway.svg",
        "color": "#8C4FFF",
        "label": "Local Gateway"},
    "localgatewayroutetable": {"icon": "localgateway.svg",
        "color": "#8C4FFF",
        "label": "LGW Route Table"},
    "localgatewayvif": {"icon": "localgateway.svg",
        "color": "#8C4FFF",
        "label": "LGW Virtual Interface"},
    "instanceconnectendpoint": {"icon": "vpcendpoint.svg",
        "color": "#8C4FFF",
        "label": "Instance Connect Endpoint"},
    "trafficmirrorfilter": {"icon": "networkinterface.svg",
        "color": "#8C4FFF",
        "label": "Traffic Mirror Filter"},
    "trafficmirrortarget": {"icon": "networkinterface.svg",
        "color": "#8C4FFF",
        "label": "Traffic Mirror Target"},
    "trafficmirrorsession": {"icon": "networkinterface.svg",
        "color": "#8C4FFF",
        "label": "Traffic Mirror Session"},
    "clientvpnendpoint": {"icon": "vpcendpoint.svg",
        "color": "#8C4FFF",
        "label": "Client VPN Endpoint"},
    "elasticip": {"icon": "elasticip.svg",
        "color": "#8C4FFF",
        "label": "Elastic IP"},

    // ─── Compute (Orange #ED7100) ────────────────────────────────────────
    "instance": {"icon": "instance.svg",
        "color": "#ED7100",
        "label": "EC2 Instance"},
    "ami": {"icon": "ami.svg",
        "color": "#ED7100",
        "label": "AMI"},
    "ami-recyclebin": {"icon": "ami.svg",
        "color": "#999999",
        "label": "AMI (Recycle Bin)"},
    "launchtemplate": {"icon": "launchtemplate.svg",
        "color": "#ED7100",
        "label": "Launch Template"},
    "fleet": {"icon": "instance.svg",
        "color": "#ED7100",
        "label": "EC2 Fleet"},
    "keypair": {"icon": "keypair.svg",
        "color": "#ED7100",
        "label": "Key Pair"},

    // ─── Storage (Green #3B48CC) ─────────────────────────────────────────
    "volume": {"icon": "volume.svg",
        "color": "#3B48CC",
        "label": "EBS Volume"},
    "snapshot": {"icon": "snapshot.svg",
        "color": "#3B48CC",
        "label": "EBS Snapshot"},
    "snapshot-recyclebin": {"icon": "snapshot.svg",
        "color": "#999999",
        "label": "Snapshot (Recycle Bin)"},
    "s3bucket": {"icon": "s3bucket.svg",
        "color": "#3B48CC",
        "label": "S3 Bucket"},
    "s3tablebucket": {"icon": "s3bucket.svg",
        "color": "#3B48CC",
        "label": "S3 Table Bucket"},
    "s3tablenamespace": {"icon": "s3bucket.svg",
        "color": "#3B48CC",
        "label": "S3 Table Namespace"},
    "s3table": {"icon": "s3bucket.svg",
        "color": "#3B48CC",
        "label": "S3 Table"},

    // ─── Database (Blue #3B48CC) ─────────────────────────────────────────
    "dynamodbtable": {"icon": "dynamodbtable.svg",
        "color": "#3B48CC",
        "label": "DynamoDB Table"},

    // ─── Containers (Orange #ED7100) ─────────────────────────────────────
    "ecrrepository": {"icon": "ecrrepository.svg",
        "color": "#ED7100",
        "label": "ECR Repository"},
    "ecscluster": {"icon": "ecscluster.svg",
        "color": "#ED7100",
        "label": "ECS Cluster"},
    "ecsservice": {"icon": "ecsservice.svg",
        "color": "#ED7100",
        "label": "ECS Service"},
    "taskdefinition": {"icon": "ecsservice.svg",
        "color": "#ED7100",
        "label": "Task Definition"},
    "containerinstance": {"icon": "instance.svg",
        "color": "#ED7100",
        "label": "Container Instance"},

    // ─── Load Balancing (Purple #8C4FFF) ─────────────────────────────────
    "loadbalancer": {"icon": "loadbalancer.svg",
        "color": "#8C4FFF",
        "label": "Load Balancer"},
    "targetgroup": {"icon": "targetgroup.svg",
        "color": "#8C4FFF",
        "label": "Target Group"},
    "listener": {"icon": "loadbalancer.svg",
        "color": "#8C4FFF",
        "label": "Listener"},
    "listenerrule": {"icon": "loadbalancer.svg",
        "color": "#8C4FFF",
        "label": "Listener Rule"},
    "truststore": {"icon": "loadbalancer.svg",
        "color": "#8C4FFF",
        "label": "Trust Store"},

    // ─── Amazon MQ (Orange #ED7100) ──────────────────────────────────────
    "mqbroker": {"icon": "instance.svg",
        "color": "#ED7100",
        "label": "MQ Broker"},
    "mqconfiguration": {"icon": "instance.svg",
        "color": "#ED7100",
        "label": "MQ Configuration"},

    // ─── MWAA (Orange #ED7100) ──────────────────────────────────────────
    "mwaaenvironment": {"icon": "instance.svg",
        "color": "#ED7100",
        "label": "MWAA Environment"},

    // ─── AppRunner (Orange #ED7100) ──────────────────────────────────────
    "apprunnerservice": {"icon": "instance.svg",
        "color": "#ED7100",
        "label": "App Runner Service"},
    "apprunnerconnector": {"icon": "instance.svg",
        "color": "#ED7100",
        "label": "VPC Connector"},

    // ─── Transfer Family (Orange #ED7100) ────────────────────────────────
    "transferserver": {"icon": "instance.svg",
        "color": "#ED7100",
        "label": "Transfer Server"},

    // ─── VPC Lattice (Purple #8C4FFF) ────────────────────────────────────
    "latticeservicenetwork": {"icon": "vpcendpoint.svg",
        "color": "#8C4FFF",
        "label": "Lattice Service Network"},
    "latticeservice": {"icon": "vpcendpoint.svg",
        "color": "#8C4FFF",
        "label": "Lattice Service"},
    "latticetargetgroup": {"icon": "targetgroup.svg",
        "color": "#8C4FFF",
        "label": "Lattice Target Group"},

    // ─── Network Manager (Purple #8C4FFF) ────────────────────────────────
    "globalnetwork": {"icon": "transitgateway.svg",
        "color": "#8C4FFF",
        "label": "Global Network"},
    "nmsite": {"icon": "transitgateway.svg",
        "color": "#8C4FFF",
        "label": "NM Site"},
    "nmdevice": {"icon": "instance.svg",
        "color": "#8C4FFF",
        "label": "NM Device"},
    "nmlink": {"icon": "transitgateway.svg",
        "color": "#8C4FFF",
        "label": "NM Link"},
    "nmconnection": {"icon": "transitgateway.svg",
        "color": "#8C4FFF",
        "label": "NM Connection"},
    "corenetwork": {"icon": "transitgateway.svg",
        "color": "#8C4FFF",
        "label": "Core Network"},
    "nmattachment": {"icon": "transitgateway.svg",
        "color": "#8C4FFF",
        "label": "NM Attachment"},

    // ─── IoT (Green #1B660F) ─────────────────────────────────────────────
    "iotthing": {"icon": "instance.svg",
        "color": "#1B660F",
        "label": "IoT Thing"},
    "iotthingtype": {"icon": "instance.svg",
        "color": "#1B660F",
        "label": "IoT Thing Type"},
    "iotthinggroup": {"icon": "instance.svg",
        "color": "#1B660F",
        "label": "IoT Thing Group"},
    "iotcertificate": {"icon": "instance.svg",
        "color": "#1B660F",
        "label": "IoT Certificate"},
    "iottopicrule": {"icon": "instance.svg",
        "color": "#1B660F",
        "label": "IoT Topic Rule"},
    "iotruledestination": {"icon": "instance.svg",
        "color": "#1B660F",
        "label": "IoT Rule Destination"},

    // ─── DataSync (Green #1B660F) ────────────────────────────────────────
    "datasyncagent": {"icon": "instance.svg",
        "color": "#1B660F",
        "label": "DataSync Agent"},
    "datasynclocation": {"icon": "instance.svg",
        "color": "#1B660F",
        "label": "DataSync Location"},
    "datasynctask": {"icon": "instance.svg",
        "color": "#1B660F",
        "label": "DataSync Task"},

    // ─── AppSync (Pink #E7157B) ──────────────────────────────────────────
    "graphqlapi": {"icon": "instance.svg",
        "color": "#E7157B",
        "label": "GraphQL API"},
    "appsyncdatasource": {"icon": "instance.svg",
        "color": "#E7157B",
        "label": "AppSync Data Source"},

    // ─── Redshift Serverless (Blue #3B48CC) ──────────────────────────────
    "rsnamespace": {"icon": "instance.svg",
        "color": "#3B48CC",
        "label": "RS Namespace"},
    "rsworkgroup": {"icon": "instance.svg",
        "color": "#3B48CC",
        "label": "RS Workgroup"},

    // ─── OpenSearch Serverless (Blue #3B48CC) ────────────────────────────
    "osscollection": {"icon": "instance.svg",
        "color": "#3B48CC",
        "label": "OSS Collection"},
    "ossvpcendpoint": {"icon": "vpcendpoint.svg",
        "color": "#3B48CC",
        "label": "OSS VPC Endpoint"},

    // ─── Directory Service (Purple #8C4FFF) ──────────────────────────────
    "directory": {"icon": "instance.svg",
        "color": "#8C4FFF",
        "label": "Directory"},

    // ─── WorkSpaces (Orange #ED7100) ─────────────────────────────────────
    "workspace": {"icon": "instance.svg",
        "color": "#ED7100",
        "label": "WorkSpace"},

    // ─── CloudHSM (Red #DD344C) ──────────────────────────────────────────
    "hsmcluster": {"icon": "instance.svg",
        "color": "#DD344C",
        "label": "HSM Cluster"},

    // ─── App Mesh (Purple #8C4FFF) ───────────────────────────────────────
    "appmesh": {"icon": "vpcendpoint.svg",
        "color": "#8C4FFF",
        "label": "App Mesh"},
    "appmeshnode": {"icon": "instance.svg",
        "color": "#8C4FFF",
        "label": "Virtual Node"},
    "appmeshservice": {"icon": "instance.svg",
        "color": "#8C4FFF",
        "label": "Virtual Service"},

    // ─── S3 Control ──────────────────────────────────────────────────────
    "s3accesspoint": {"icon": "instance.svg",
        "color": "#3F8624",
        "label": "S3 Access Point"},

    // ─── Classic ELB (Purple #8C4FFF) ────────────────────────────────────
    "classicelb": {"icon": "loadbalancer.svg",
        "color": "#8C4FFF",
        "label": "Classic Load Balancer"},

    // ─── EventBridge Pipes (Pink #E7157B) ────────────────────────────────
    "eventbridgepipe": {"icon": "instance.svg",
        "color": "#E7157B",
        "label": "EventBridge Pipe"},

    // ─── Storage Gateway (Green #3F8624) ─────────────────────────────────
    "storagegateway": {"icon": "instance.svg",
        "color": "#3F8624",
        "label": "Storage Gateway"},
    "sgwfileshare": {"icon": "instance.svg",
        "color": "#3F8624",
        "label": "SGW File Share"},
    "sgwvolume": {"icon": "instance.svg",
        "color": "#3F8624",
        "label": "SGW Volume"},

    // ─── Outposts (Orange #ED7100 + on-premises marker) ─────────────────
    "outpostsite": {"icon": "instance.svg",
        "color": "#ED7100",
        "label": "Outpost Site"},
    "outpost": {"icon": "instance.svg",
        "color": "#ED7100",
        "label": "Outpost"},

    // ─── ImageBuilder (Orange #ED7100) ───────────────────────────────────
    "infraconfig": {"icon": "instance.svg",
        "color": "#ED7100",
        "label": "Infra Configuration"},

    // ─── CodeDeploy (Blue #3B48CC) ───────────────────────────────────────
    "deploymentgroup": {"icon": "instance.svg",
        "color": "#3B48CC",
        "label": "Deployment Group"},

    // ─── MediaConnect (Pink #E7157B) ─────────────────────────────────────
    "mediaconnectflow": {"icon": "instance.svg",
        "color": "#E7157B",
        "label": "MediaConnect Flow"},

    // ─── SageMaker (Green #1B660F) ───────────────────────────────────────
    "notebookinstance": {"icon": "instance.svg",
        "color": "#1B660F",
        "label": "Notebook Instance"},

    // ─── Messaging (Pink #E7157B) ────────────────────────────────────────
    "snstopic": {"icon": "snstopic.svg",
        "color": "#E7157B",
        "label": "SNS Topic"},
    "snssubscription": {"icon": "snstopic.svg",
        "color": "#E7157B",
        "label": "SNS Subscription"},
    "sqsqueue": {"icon": "sqsqueue.svg",
        "color": "#E7157B",
        "label": "SQS Queue"},

    // ─── DNS (Purple #8C4FFF) ────────────────────────────────────────────
    "hostedzone": {"icon": "hostedzone.svg",
        "color": "#8C4FFF",
        "label": "Hosted Zone"},
    "recordset": {"icon": "hostedzone.svg",
        "color": "#8C4FFF",
        "label": "Record Set"},

    // ─── Kubernetes (Orange #ED7100) ─────────────────────────────────────
    "ekscluster": {"icon": "ekscluster.svg",
        "color": "#ED7100",
        "label": "EKS Cluster"},
    "eksnodegroup": {"icon": "ekscluster.svg",
        "color": "#ED7100",
        "label": "EKS Nodegroup"},
    "fargateprofile": {"icon": "ekscluster.svg",
        "color": "#ED7100",
        "label": "Fargate Profile"},
    "podidentity": {"icon": "ekscluster.svg",
        "color": "#ED7100",
        "label": "Pod Identity"},
    "eksaddon": {"icon": "ekscluster.svg",
        "color": "#ED7100",
        "label": "EKS Addon"},
    "eksaccessentry": {"icon": "ekscluster.svg",
        "color": "#ED7100",
        "label": "EKS Access Entry"},

    // ─── Secrets (Red #DD344C) ───────────────────────────────────────────
    "secret": {"icon": "secret.svg",
        "color": "#DD344C",
        "label": "Secret"},

    // ─── Serverless (Orange #ED7100) ─────────────────────────────────────
    "lambdafunction": {"icon": "lambdafunction.svg",
        "color": "#ED7100",
        "label": "Lambda Function"},
    "lambdaalias": {"icon": "lambdafunction.svg",
        "color": "#ED7100",
        "label": "Lambda Alias"},
    "lambdalayer": {"icon": "lambda.svg",
        "color": "#ED7100",
        "label": "Lambda Layer"},
    "functionurl": {"icon": "lambdafunction.svg",
        "color": "#ED7100",
        "label": "Function URL"},
    "provisionedconcurrency": {"icon": "lambdafunction.svg",
        "color": "#ED7100",
        "label": "Provisioned Concurrency"},
    "eventsourcemapping": {"icon": "lambda.svg",
        "color": "#ED7100",
        "label": "Event Source Mapping"},

    // ─── IAM / Security (Red #DD344C) ────────────────────────────────────
    "user": {"icon": "user.svg",
        "color": "#DD344C",
        "label": "IAM User"},
    "role": {"icon": "role.svg",
        "color": "#DD344C",
        "label": "IAM Role"},
    "policy": {"icon": "policy.svg",
        "color": "#DD344C",
        "label": "IAM Policy"},
    "group": {"icon": "group.svg",
        "color": "#DD344C",
        "label": "IAM Group"},
    "instanceprofile": {"icon": "instanceprofile.svg",
        "color": "#DD344C",
        "label": "Instance Profile"},
    "mfadevice": {"icon": "mfadevice.svg",
        "color": "#DD344C",
        "label": "MFA Device"},
    "virtualmfadevice": {"icon": "mfadevice.svg",
        "color": "#DD344C",
        "label": "Virtual MFA"},
    "accesskey": {"icon": "accesskey.svg",
        "color": "#DD344C",
        "label": "Access Key"},
    "sshpublickey": {"icon": "sshpublickey.svg",
        "color": "#DD344C",
        "label": "SSH Public Key"},
    "servercertificate": {"icon": "servercertificate.svg",
        "color": "#DD344C",
        "label": "Server Certificate"},

    // ─── CloudWatch (Pink #E7157B) ───────────────────────────────────────
    "loggroup": {"icon": "loggroup.svg",
        "color": "#E7157B",
        "label": "Log Group"},
    "metricalarm": {"icon": "alarm.svg",
        "color": "#E7157B",
        "label": "Metric Alarm"},
    "compositealarm": {"icon": "alarm.svg",
        "color": "#E7157B",
        "label": "Composite Alarm"},
    "metricstream": {"icon": "alarm.svg",
        "color": "#E7157B",
        "label": "Metric Stream"},
    "deliverydestination": {"icon": "loggroup.svg",
        "color": "#E7157B",
        "label": "Log Delivery Destination"},

    // ─── CloudFront (Purple-blue #8C4FFF) ────────────────────────────────
    "distribution": {"icon": "distribution.svg",
        "color": "#8C4FFF",
        "label": "CF Distribution"},
    "cloudfrontfunction": {"icon": "cloudfrontfunction.svg",
        "color": "#8C4FFF",
        "label": "CF Function"},
    "originaccesscontrol": {"icon": "originaccesscontrol.svg",
        "color": "#8C4FFF",
        "label": "Origin Access Control"},
    "keyvaluestore": {"icon": "cloudfrontfunction.svg",
        "color": "#8C4FFF",
        "label": "Key Value Store"},

    // ─── ACM (Red #DD344C) ───────────────────────────────────────────────
    "certificate": {"icon": "servercertificate.svg",
        "color": "#DD344C",
        "label": "ACM Certificate"},

    // ─── EFS (Green #3B48CC) ─────────────────────────────────────────────
    "filesystem": {"icon": "volume.svg",
        "color": "#3B48CC",
        "label": "EFS File System"},
    "mounttarget": {"icon": "networkinterface.svg",
        "color": "#3B48CC",
        "label": "EFS Mount Target"},
    "efsaccesspoint": {"icon": "volume.svg",
        "color": "#3B48CC",
        "label": "EFS Access Point"},

    // ─── KMS (Red #DD344C) ───────────────────────────────────────────────
    "kmskey": {"icon": "accesskey.svg",
        "color": "#DD344C",
        "label": "KMS Key"},

    // ─── Auto Scaling (Orange #ED7100) ───────────────────────────────────
    "autoscalinggroup": {"icon": "instance.svg",
        "color": "#ED7100",
        "label": "Auto Scaling Group"},
    "launchconfiguration": {"icon": "instance.svg",
        "color": "#ED7100",
        "label": "Launch Configuration"},
    "scalingpolicy": {"icon": "instance.svg",
        "color": "#ED7100",
        "label": "Scaling Policy"},
    "lifecyclehook": {"icon": "instance.svg",
        "color": "#ED7100",
        "label": "Lifecycle Hook"},

    // ─── API Gateway (Purple #8C4FFF) ────────────────────────────────────
    "restapi": {"icon": "vpcendpoint.svg",
        "color": "#8C4FFF",
        "label": "REST API"},
    "httpapi": {"icon": "vpcendpoint.svg",
        "color": "#8C4FFF",
        "label": "HTTP API"},
    "vpclink": {"icon": "vpcendpoint.svg",
        "color": "#8C4FFF",
        "label": "VPC Link"},
    "httpvpclink": {"icon": "vpcendpoint.svg",
        "color": "#8C4FFF",
        "label": "HTTP VPC Link"},
    "apidomainname": {"icon": "hostedzone.svg",
        "color": "#8C4FFF",
        "label": "API Domain"},
    "usageplan": {"icon": "loadbalancer.svg",
        "color": "#8C4FFF",
        "label": "Usage Plan"},

    // ─── WAF (Red #DD344C) ───────────────────────────────────────────────
    "webacl": {"icon": "securitygroup.svg",
        "color": "#DD344C",
        "label": "WAF WebACL"},

    // ─── RDS (Blue #3B48CC) ──────────────────────────────────────────────
    "dbinstance": {"icon": "instance.svg",
        "color": "#3B48CC",
        "label": "RDS Instance"},
    "dbcluster": {"icon": "instance.svg",
        "color": "#3B48CC",
        "label": "Aurora Cluster"},
    "dbproxy": {"icon": "instance.svg",
        "color": "#3B48CC",
        "label": "RDS Proxy"},
    "dbsubnetgroup": {"icon": "instance.svg",
        "color": "#3B48CC",
        "label": "DB Subnet Group"},
    "dbproxytargetgroup": {"icon": "instance.svg",
        "color": "#3B48CC",
        "label": "DB Proxy Target Group"},

    // ─── ElastiCache (Blue #3B48CC) ──────────────────────────────────────
    "replicationgroup": {"icon": "instance.svg",
        "color": "#3B48CC",
        "label": "Redis Replication Group"},
    "cachecluster": {"icon": "instance.svg",
        "color": "#3B48CC",
        "label": "Cache Cluster"},
    "cachesubnetgroup": {"icon": "subnet.svg",
        "color": "#3B48CC",
        "label": "Cache Subnet Group"},
    "serverlesscache": {"icon": "instance.svg",
        "color": "#3B48CC",
        "label": "Serverless Cache"},

    // ─── EventBridge (Pink #E7157B) ──────────────────────────────────────
    "eventbus": {"icon": "snstopic.svg",
        "color": "#E7157B",
        "label": "Event Bus"},
    "eventrule": {"icon": "snstopic.svg",
        "color": "#E7157B",
        "label": "Event Rule"},

    // ─── Step Functions (Pink #E7157B)
    "statemachine": {"icon": "lambdafunction.svg",
        "color": "#E7157B",
        "label": "State Machine"},

    // ─── Kinesis (Purple #8C4FFF)
    "kinesisstream": {"icon": "snstopic.svg",
        "color": "#8C4FFF",
        "label": "Kinesis Stream"},

    // ─── OpenSearch (Purple #8C4FFF)
    "opensearchdomain": {"icon": "instance.svg",
        "color": "#8C4FFF",
        "label": "OpenSearch Domain"},

    // ─── CodeBuild (Orange #ED7100)
    "codebuildproject": {"icon": "lambdafunction.svg",
        "color": "#ED7100",
        "label": "CodeBuild Project"},

    // ─── Cognito (Red #DD344C)
    "userpool": {"icon": "user.svg",
        "color": "#DD344C",
        "label": "Cognito User Pool"},

    // ─── CloudMap (Purple #8C4FFF)
    "cloudmapnamespace": {"icon": "hostedzone.svg",
        "color": "#8C4FFF",
        "label": "CloudMap Namespace"},
    "cloudmapservice": {"icon": "ecsservice.svg",
        "color": "#8C4FFF",
        "label": "CloudMap Service"},

    // ─── Backup (Blue #3B48CC)
    "backupvault": {"icon": "snapshot.svg",
        "color": "#3B48CC",
        "label": "Backup Vault"},

    // ─── Glacier (Blue #3B48CC)
    "glaciervault": {"icon": "snapshot.svg",
        "color": "#3B48CC",
        "label": "Glacier Vault"},

    // ─── CodeArtifact (Orange #ED7100)
    "codeartifactdomain": {"icon": "ecrrepository.svg",
        "color": "#ED7100",
        "label": "CodeArtifact Domain"},
    "codeartifactrepo": {"icon": "ecrrepository.svg",
        "color": "#ED7100",
        "label": "CodeArtifact Repo"},

    // ─── MSK (Purple #8C4FFF)
    "mskcluster": {"icon": "instance.svg",
        "color": "#8C4FFF",
        "label": "MSK Cluster"},

    // ─── Redshift (Blue #3B48CC)
    "redshiftcluster": {"icon": "instance.svg",
        "color": "#3B48CC",
        "label": "Redshift Cluster"},
    "redshiftsubnetgroup": {"icon": "subnet.svg",
        "color": "#3B48CC",
        "label": "Redshift Subnet Group"},

    // ─── Neptune (Blue #3B48CC)
    "neptunecluster": {"icon": "instance.svg",
        "color": "#3B48CC",
        "label": "Neptune Cluster"},
    "neptuneinstance": {"icon": "instance.svg",
        "color": "#3B48CC",
        "label": "Neptune Instance"},
    "neptunesubnetgroup": {"icon": "subnet.svg",
        "color": "#3B48CC",
        "label": "Neptune Subnet Group"},

    // ─── DocumentDB (Blue #3B48CC)
    "docdbcluster": {"icon": "instance.svg",
        "color": "#3B48CC",
        "label": "DocumentDB Cluster"},
    "docdbinstance": {"icon": "instance.svg",
        "color": "#3B48CC",
        "label": "DocumentDB Instance"},
    "docdbsubnetgroup": {"icon": "subnet.svg",
        "color": "#3B48CC",
        "label": "DocumentDB Subnet Group"},

    // ─── FSx (Blue #3B48CC)
    "fsxfilesystem": {"icon": "volume.svg",
        "color": "#3B48CC",
        "label": "FSx File System"},

    // ─── Network Firewall (Red #DD344C)
    "networkfirewall": {"icon": "securitygroup.svg",
        "color": "#DD344C",
        "label": "Network Firewall"},
    "firewallpolicy": {"icon": "policy.svg",
        "color": "#DD344C",
        "label": "Firewall Policy"},
    "firewallrulegroup": {"icon": "policy.svg",
        "color": "#DD344C",
        "label": "Firewall Rule Group"},

    // ─── CodePipeline (Orange #ED7100)
    "pipeline": {"icon": "lambdafunction.svg",
        "color": "#ED7100",
        "label": "CodePipeline"},

    // ─── CloudTrail (Dark #232F3E)
    "trail": {"icon": "flowlog.svg",
        "color": "#232F3E",
        "label": "CloudTrail"},

    // ─── SSM (Pink #E7157B) ─────────────────────────────────────────────
    "ssmparameter": {"icon": "secret.svg",
        "color": "#E7157B",
        "label": "SSM Parameter"},
    "ssmmanagedinstance": {"icon": "instance.svg",
        "color": "#E7157B",
        "label": "Managed Instance"},
    "ssmmaintenancewindow": {"icon": "schedule.svg",
        "color": "#E7157B",
        "label": "Maintenance Window"},
    "ssmdocument": {"icon": "flowlog.svg",
        "color": "#E7157B",
        "label": "SSM Document"},
    "ssmassociation": {"icon": "routetable.svg",
        "color": "#E7157B",
        "label": "SSM Association"},

    // ─── CloudFormation (Blue #1264A3) ──────────────────────────────────
    "cfnstack": {"icon": "region.svg",
        "color": "#1264A3",
        "label": "CFN Stack"},
    "cfnexport": {"icon": "region.svg",
        "color": "#E7157B",
        "label": "CFN Export"},
    "cfnstackset": {"icon": "region.svg",
        "color": "#E7157B",
        "label": "CFN Stack Set"},

    // ─── Global Accelerator (Purple #8C4FFF)
    "accelerator": {"icon": "internetgateway.svg",
        "color": "#8C4FFF",
        "label": "Global Accelerator"},
    "acceleratorlistener": {"icon": "internetgateway.svg",
        "color": "#8C4FFF",
        "label": "GA Listener"},
    "acceleratorendpointgroup": {"icon": "internetgateway.svg",
        "color": "#8C4FFF",
        "label": "GA Endpoint Group"},

    // ─── SSM Patch Baselines (Pink #E7157B) ─────────────────────────────
    "patchbaseline": {"icon": "flowlog.svg",
        "color": "#E7157B",
        "label": "Patch Baseline"},

    // ─── Backup (Blue #3B48CC) ──────────────────────────────────────────
    "backupplan": {"icon": "region.svg",
        "color": "#3B48CC",
        "label": "Backup Plan"},
    "backupselection": {"icon": "region.svg",
        "color": "#3B48CC",
        "label": "Backup Selection"},

    // ─── Cognito (Red #DD344C) ──────────────────────────────────────────
    "cognitoidp": {"icon": "region.svg",
        "color": "#DD344C",
        "label": "Cognito IdP"},
    "cognitoclient": {"icon": "region.svg",
        "color": "#DD344C",
        "label": "User Pool Client"},

    // ─── Service Discovery (Pink #E7157B) ───────────────────────────────
    "servicediscoveryinstance": {"icon": "region.svg",
        "color": "#E7157B",
        "label": "SD Instance"},

    // ─── Route53 Health Checks (Purple #8C4FFF) ─────────────────────────
    "route53healthcheck": {"icon": "internetgateway.svg",
        "color": "#8C4FFF",
        "label": "Health Check"},

    // ─── S3 Directory Buckets (Green #3F8624) ───────────────────────────
    "directorybucket": {"icon": "region.svg",
        "color": "#3F8624",
        "label": "Directory Bucket"},

    // ─── AWS Glue (Orange #ED7100) ───────────────────────────────────────
    "glueconnection": {"icon": "instance.svg",
        "color": "#ED7100",
        "label": "Glue Connection"},
    "gluecrawler": {"icon": "instance.svg",
        "color": "#ED7100",
        "label": "Glue Crawler"},
    "gluedatabase": {"icon": "instance.svg",
        "color": "#ED7100",
        "label": "Glue Database"},
    "gluejob": {"icon": "instance.svg",
        "color": "#ED7100",
        "label": "Glue Job"},
    "gluetrigger": {"icon": "instance.svg",
        "color": "#ED7100",
        "label": "Glue Trigger"},
    "gluetable": {"icon": "instance.svg",
        "color": "#ED7100",
        "label": "Glue Table"},
    "glueregistry": {"icon": "instance.svg",
        "color": "#ED7100",
        "label": "Glue Registry"},
    "glueschema": {"icon": "instance.svg",
        "color": "#ED7100",
        "label": "Glue Schema"},
    "glueworkflow": {"icon": "instance.svg",
        "color": "#ED7100",
        "label": "Glue Workflow"},

    // ─── DMS (Blue #3B48CC) ──────────────────────────────────────────────
    "dmsreplicationinstance": {"icon": "instance.svg",
        "color": "#3B48CC",
        "label": "DMS Replication Instance"},
    "dmssubnetgroup": {"icon": "subnet.svg",
        "color": "#3B48CC",
        "label": "DMS Subnet Group"},
    "dmsendpoint": {"icon": "instance.svg",
        "color": "#3B48CC",
        "label": "DMS Endpoint"},
    "dmsreplicationtask": {"icon": "instance.svg",
        "color": "#3B48CC",
        "label": "DMS Replication Task"},

    // ─── Route53 Resolver (Purple #8C4FFF) ───────────────────────────────
    "resolverendpoint": {"icon": "internetgateway.svg",
        "color": "#8C4FFF",
        "label": "Resolver Endpoint"},
    "resolverrule": {"icon": "internetgateway.svg",
        "color": "#8C4FFF",
        "label": "Resolver Rule"},
    "resolverruleassociation": {"icon": "internetgateway.svg",
        "color": "#8C4FFF",
        "label": "Resolver Rule Association"},
    "firewallrulegroupassociation": {"icon": "internetgateway.svg",
        "color": "#8C4FFF",
        "label": "Firewall Rule Group Association"},

    // ─── Athena (Purple #8C4FFF)
    "athenaworkgroup": {"icon": "region.svg",
        "color": "#8C4FFF",
        "label": "Athena WorkGroup"},
    "athenadatacatalog": {"icon": "region.svg",
        "color": "#8C4FFF",
        "label": "Athena Data Catalog"},

    // ─── Batch (Orange #ED7100)
    "batchcomputeenvironment": {"icon": "region.svg",
        "color": "#ED7100",
        "label": "Batch Compute Environment"},
    "batchjobqueue": {"icon": "region.svg",
        "color": "#ED7100",
        "label": "Batch Job Queue"},
    "batchschedulingpolicy": {"icon": "region.svg",
        "color": "#ED7100",
        "label": "Batch Scheduling Policy"},

    // ─── Elastic Beanstalk (Orange #ED7100)
    "beanstalkapplication": {"icon": "region.svg",
        "color": "#ED7100",
        "label": "Beanstalk Application"},
    "beanstalkenvironment": {"icon": "region.svg",
        "color": "#ED7100",
        "label": "Beanstalk Environment"},

    // ─── EMR (Orange #ED7100)
    "emrcluster": {"icon": "region.svg",
        "color": "#ED7100",
        "label": "EMR Cluster"},
    "emrsecurityconfiguration": {"icon": "region.svg",
        "color": "#ED7100",
        "label": "EMR Security Configuration"},
    "emrserverlessapplication": {"icon": "region.svg",
        "color": "#ED7100",
        "label": "EMR Serverless Application"},

    // ─── MemoryDB (Blue #3B48CC)
    "memorydbcluster": {"icon": "region.svg",
        "color": "#3B48CC",
        "label": "MemoryDB Cluster"},
    "memorydbsubnetgroup": {"icon": "region.svg",
        "color": "#3B48CC",
        "label": "MemoryDB Subnet Group"},
    "memorydbacl": {"icon": "region.svg",
        "color": "#3B48CC",
        "label": "MemoryDB ACL"},
    "memorydbuser": {"icon": "region.svg",
        "color": "#3B48CC",
        "label": "MemoryDB User"}

};

/**
 * Get the configuration for a resource type, with a fallback for unknown types.
 */
export function getResourceTypeConfig (resourceType: string): ResourceTypeConfig {

    return RESOURCE_TYPE_MAP[resourceType] ?? {
        "icon": "region.svg",
        "color": "#232F3E",
        "label": resourceType
    };

}

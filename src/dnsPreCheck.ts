import {resolve4} from "node:dns/promises";

/**
 * Maps internal service names to their AWS endpoint hostname prefix.
 * Pattern: `<prefix>.<region>.amazonaws.com`
 */
export const SERVICE_ENDPOINT_PREFIX: Record<string, string> = {
    "ec2": "ec2",
    "lambda": "lambda",
    "cloudWatch": "logs",
    "s3Tables": "s3tables",
    "dynamoDB": "dynamodb",
    "ebs": "ebs",
    "ecr": "api.ecr",
    "ecs": "ecs",
    "elbv2": "elasticloadbalancing",
    "sns": "sns",
    "sqs": "sqs",
    "eks": "eks",
    "secretsManager": "secretsmanager",
    "acm": "acm",
    "efs": "elasticfilesystem",
    "kms": "kms",
    "autoScaling": "autoscaling",
    "rds": "rds",
    "apiGateway": "apigateway",
    "waf": "wafv2",
    "elastiCache": "elasticache",
    "eventBridge": "events",
    "sfn": "states",
    "kinesis": "kinesis",
    "openSearch": "es",
    "codeBuild": "codebuild",
    "cognito": "cognito-idp",
    "serviceDiscovery": "servicediscovery",
    "backup": "backup",
    "glacier": "glacier",
    "codeArtifact": "codeartifact",
    "msk": "kafka",
    "redshift": "redshift",
    "neptune": "rds",
    "docDb": "rds",
    "fsx": "fsx",
    "networkFirewall": "network-firewall",
    "codePipeline": "codepipeline",
    "cloudTrail": "cloudtrail",
    "ssm": "ssm",
    "cloudFormation": "cloudformation",
    "mq": "mq",
    "mwaa": "api.airflow",
    "appRunner": "apprunner",
    "transfer": "transfer",
    "vpcLattice": "vpc-lattice",
    "iot": "iot",
    "glue": "glue",
    "dms": "dms",
    "route53Resolver": "route53resolver",
    "batch": "batch",
    "memoryDb": "memory-db",
    "emr": "elasticmapreduce",
    "emrServerless": "emr-serverless",
    "beanstalk": "elasticbeanstalk",
    "athena": "athena",
    "dataSync": "datasync",
    "appSync": "appsync",
    "redshiftServerless": "redshift-serverless",
    "oss": "aoss",
    "directoryService": "ds",
    "workspaces": "workspaces",
    "cloudHsm": "cloudhsmv2",
    "appMesh": "appmesh",
    "elb": "elasticloadbalancing",
    "pipes": "pipes",
    "storageGateway": "storagegateway",
    "outposts": "outposts",
    "imageBuilder": "imagebuilder",
    "codeDeploy": "codedeploy",
    "mediaConnect": "mediaconnect",
    "sageMaker": "api.sagemaker"
};

/**
 * Services that are global (not region-scoped) — skip DNS pre-check.
 */
const GLOBAL_SERVICES = new Set([
    "cloudFront",
    "route53",
    "organizations",
    "globalAccelerator",
    "networkManager",
    "iam",
    "s3",
    "s3Control"
]);

/**
 * Check if a service endpoint resolves in a given region via DNS.
 * Returns true if the endpoint exists, false if ENOTFOUND.
 */
async function checkEndpoint (prefix: string, region: string): Promise<boolean> {

    const hostname = `${prefix}.${region}.amazonaws.com`;
    try {

        await resolve4(hostname);
        return true;

    } catch {

        return false;

    }

}

/**
 * For a list of regions, determine which services are available via DNS resolution.
 * Returns a Set of `"serviceName:region"` pairs that are UNAVAILABLE.
 */
export async function checkServiceAvailability (
    serviceNames: string[],
    regions: string[]
): Promise<Set<string>> {

    const unavailable = new Set<string>();

    // Deduplicate prefixes — some services share the same endpoint (neptune/docDb → rds)
    const checks: {"serviceName": string;
        "prefix": string;
        "region": string;}[] = [];
    const resolved = new Map<string, boolean>();

    for (const serviceName of serviceNames) {

        if (GLOBAL_SERVICES.has(serviceName)) {

            continue;

        }
        const prefix = SERVICE_ENDPOINT_PREFIX[serviceName];
        if (!prefix) {

            continue;

        }
        for (const region of regions) {

            checks.push({serviceName,
                prefix,
                region});

        }

    }

    // Run DNS lookups in parallel (batched to avoid overwhelming resolver)
    const batchSize = 50;
    for (let i = 0; i < checks.length; i += batchSize) {

        const batch = checks.slice(
            i,
            i + batchSize
        );
        const results = await Promise.all(batch.map(async ({serviceName, prefix, region}) => {

            const cacheKey = `${prefix}:${region}`;
            let available = resolved.get(cacheKey);
            if (available === undefined) {

                available = await checkEndpoint(
                    prefix,
                    region
                );
                resolved.set(
                    cacheKey,
                    available
                );

            }
            return {serviceName,
                region,
                available};

        }));
        for (const {serviceName, region, available} of results) {

            if (!available) {

                unavailable.add(`${serviceName}:${region}`);

            }

        }

    }

    return unavailable;

}

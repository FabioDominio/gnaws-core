import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    ECSClient,
    ListClustersCommand,
    DescribeClustersCommand,
    ListServicesCommand,
    DescribeServicesCommand,
    ListContainerInstancesCommand,
    DescribeContainerInstancesCommand,
    ListTaskDefinitionsCommand
} from "@aws-sdk/client-ecs";
import {EcsServiceImpl} from "../../../../src/providers/live/ecsService.js";

const ecsMock = mockClient(ECSClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    ecsMock.reset();

});

describe(
    "EcsServiceImpl",
    () => {

        describe(
            "getClusters",
            () => {

                it(
                    "lists and describes clusters",
                    async () => {

                        ecsMock.on(ListClustersCommand).resolves({
                            "clusterArns": ["arn:aws:ecs:us-east-1:123:cluster/cluster-1"]
                        });
                        ecsMock.on(DescribeClustersCommand).resolves({
                            "clusters": [
                                {"clusterArn": "arn:aws:ecs:us-east-1:123:cluster/cluster-1",
                                    "clusterName": "cluster-1",
                                    "status": "ACTIVE"}
                            ]
                        });

                        const service = new EcsServiceImpl(
                            creds,
                            "us-east-1"
                        );
                        const clusters = await service.getClusters();

                        expect(clusters).toHaveLength(1);
                        expect(clusters[0].clusterName).toBe("cluster-1");

                    }
                );

                it(
                    "returns empty when no clusters",
                    async () => {

                        ecsMock.on(ListClustersCommand).resolves({"clusterArns": []});

                        const service = new EcsServiceImpl(
                            creds,
                            "us-east-1"
                        );
                        const clusters = await service.getClusters();

                        expect(clusters).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getServices",
            () => {

                it(
                    "lists and describes services for a cluster",
                    async () => {

                        ecsMock.on(ListServicesCommand).resolves({
                            "serviceArns": ["arn:aws:ecs:us-east-1:123:service/cluster-1/svc-1"]
                        });
                        ecsMock.on(DescribeServicesCommand).resolves({
                            "services": [
                                {"serviceName": "svc-1",
                                    "serviceArn": "arn:aws:ecs:us-east-1:123:service/cluster-1/svc-1",
                                    "status": "ACTIVE"}
                            ]
                        });

                        const service = new EcsServiceImpl(
                            creds,
                            "us-east-1"
                        );
                        const services = await service.getServices("arn:aws:ecs:us-east-1:123:cluster/cluster-1");

                        expect(services).toHaveLength(1);
                        expect(services[0].serviceName).toBe("svc-1");

                    }
                );

                it(
                    "returns empty when cluster has no services",
                    async () => {

                        ecsMock.on(ListServicesCommand).resolves({"serviceArns": []});

                        const service = new EcsServiceImpl(
                            creds,
                            "us-east-1"
                        );
                        const services = await service.getServices("arn:aws:ecs:us-east-1:123:cluster/cluster-1");

                        expect(services).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getContainerInstances",
            () => {

                it(
                    "lists and describes container instances",
                    async () => {

                        ecsMock.on(ListContainerInstancesCommand).resolves({
                            "containerInstanceArns": ["arn:aws:ecs:us-east-1:123:container-instance/cluster-1/ci-1"]
                        });
                        ecsMock.on(DescribeContainerInstancesCommand).resolves({
                            "containerInstances": [
                                {"containerInstanceArn": "arn:aws:ecs:us-east-1:123:container-instance/cluster-1/ci-1",
                                    "ec2InstanceId": "i-123",
                                    "status": "ACTIVE"}
                            ]
                        });

                        const service = new EcsServiceImpl(
                            creds,
                            "us-east-1"
                        );
                        const instances = await service.getContainerInstances("arn:aws:ecs:us-east-1:123:cluster/cluster-1");

                        expect(instances).toHaveLength(1);
                        expect(instances[0].ec2InstanceId).toBe("i-123");

                    }
                );

                it(
                    "returns empty when no container instances",
                    async () => {

                        ecsMock.on(ListContainerInstancesCommand).resolves({"containerInstanceArns": []});

                        const service = new EcsServiceImpl(
                            creds,
                            "us-east-1"
                        );
                        const instances = await service.getContainerInstances("arn:aws:ecs:us-east-1:123:cluster/cluster-1");

                        expect(instances).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getTaskDefinitionArns",
            () => {

                it(
                    "returns task definition ARNs",
                    async () => {

                        ecsMock.on(ListTaskDefinitionsCommand).resolves({
                            "taskDefinitionArns": [
                                "arn:aws:ecs:us-east-1:123:task-definition/web:1",
                                "arn:aws:ecs:us-east-1:123:task-definition/worker:3"
                            ]
                        });

                        const service = new EcsServiceImpl(
                            creds,
                            "us-east-1"
                        );
                        const arns = await service.getTaskDefinitionArns();

                        expect(arns).toHaveLength(2);
                        expect(arns[0]).toContain("web:1");

                    }
                );

                it(
                    "aggregates across pages",
                    async () => {

                        ecsMock.on(ListTaskDefinitionsCommand).
                            resolvesOnce({"taskDefinitionArns": ["arn:aws:ecs:us-east-1:123:task-definition/web:1"],
                                "nextToken": "tok"}).
                            resolvesOnce({"taskDefinitionArns": ["arn:aws:ecs:us-east-1:123:task-definition/worker:3"]});

                        const service = new EcsServiceImpl(
                            creds,
                            "us-east-1"
                        );
                        const arns = await service.getTaskDefinitionArns();

                        expect(arns).toHaveLength(2);

                    }
                );

                it(
                    "returns empty when no task definitions",
                    async () => {

                        ecsMock.on(ListTaskDefinitionsCommand).resolves({});

                        const service = new EcsServiceImpl(
                            creds,
                            "us-east-1"
                        );
                        const arns = await service.getTaskDefinitionArns();

                        expect(arns).toHaveLength(0);

                    }
                );

            }
        );

    }
);

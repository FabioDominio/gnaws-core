import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    KafkaClient,
    ListClustersCommand
} from "@aws-sdk/client-kafka";
import {MskService} from "../../../../src/providers/live/mskService.js";

const kafkaMock = mockClient(KafkaClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    kafkaMock.reset();

});

describe(
    "MskService",
    () => {

        describe(
            "getClusters",
            () => {

                it(
                    "returns clusters",
                    async () => {

                        kafkaMock.on(ListClustersCommand).resolves({
                            "ClusterInfoList": [
                                {"ClusterName": "cluster-1",
                                    "ClusterArn": "arn:aws:kafka:us-east-1:123:cluster/cluster-1/uuid-1",
                                    "State": "ACTIVE"},
                                {"ClusterName": "cluster-2",
                                    "ClusterArn": "arn:aws:kafka:us-east-1:123:cluster/cluster-2/uuid-2",
                                    "State": "ACTIVE"}
                            ]
                        });

                        const service = new MskService(
                            creds,
                            "us-east-1"
                        );
                        const clusters = await service.getClusters();

                        expect(clusters).toHaveLength(2);
                        expect(clusters[0].ClusterName).toBe("cluster-1");

                    }
                );

                it(
                    "aggregates clusters across pages",
                    async () => {

                        kafkaMock.on(ListClustersCommand).
                            resolvesOnce({"ClusterInfoList": [{"ClusterName": "c1"}],
                                "NextToken": "tok"}).
                            resolvesOnce({"ClusterInfoList": [{"ClusterName": "c2"}]});

                        const service = new MskService(
                            creds,
                            "us-east-1"
                        );
                        const clusters = await service.getClusters();

                        expect(clusters).toHaveLength(2);

                    }
                );

                it(
                    "returns empty when no clusters",
                    async () => {

                        kafkaMock.on(ListClustersCommand).resolves({});

                        const service = new MskService(
                            creds,
                            "us-east-1"
                        );
                        const clusters = await service.getClusters();

                        expect(clusters).toHaveLength(0);

                    }
                );

            }
        );

    }
);

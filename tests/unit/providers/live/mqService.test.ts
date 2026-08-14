import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    MqClient,
    ListBrokersCommand,
    ListConfigurationsCommand
} from "@aws-sdk/client-mq";
import {MqService} from "../../../../src/providers/live/mqService.js";

const mqMock = mockClient(MqClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    mqMock.reset();

});

describe(
    "MqService",
    () => {

        describe(
            "getBrokers",
            () => {

                it(
                    "returns brokers",
                    async () => {

                        mqMock.on(ListBrokersCommand).resolves({
                            "BrokerSummaries": [
                                {"BrokerId": "broker-1",
                                    "BrokerName": "my-broker-1",
                                    "BrokerState": "RUNNING",
                                    "DeploymentMode": "SINGLE_INSTANCE",
                                    "EngineType": "ACTIVEMQ"},
                                {"BrokerId": "broker-2",
                                    "BrokerName": "my-broker-2",
                                    "BrokerState": "RUNNING",
                                    "DeploymentMode": "SINGLE_INSTANCE",
                                    "EngineType": "ACTIVEMQ"}
                            ]
                        });

                        const service = new MqService(
                            creds,
                            "us-east-1"
                        );
                        const brokers = await service.getBrokers();

                        expect(brokers).toHaveLength(2);
                        expect(brokers[0].BrokerName).toBe("my-broker-1");

                    }
                );

                it(
                    "returns empty when no brokers",
                    async () => {

                        mqMock.on(ListBrokersCommand).resolves({});

                        const service = new MqService(
                            creds,
                            "us-east-1"
                        );
                        const brokers = await service.getBrokers();

                        expect(brokers).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getConfigurations",
            () => {

                it(
                    "returns configurations",
                    async () => {

                        mqMock.on(ListConfigurationsCommand).resolves({
                            "Configurations": [
                                {"Id": "config-1",
                                    "Name": "my-config-1",
                                    "EngineType": "ACTIVEMQ",
                                    "Arn": "arn:aws:mq:us-east-1:123:configuration:config-1",
                                    "AuthenticationStrategy": "SIMPLE",
                                    "Created": new Date(),
                                    "Description": "",
                                    "EngineVersion": "5.17.6",
                                    "LatestRevision": {"Created": new Date(),
                                        "Revision": 1}},
                                {"Id": "config-2",
                                    "Name": "my-config-2",
                                    "EngineType": "RABBITMQ",
                                    "Arn": "arn:aws:mq:us-east-1:123:configuration:config-2",
                                    "AuthenticationStrategy": "SIMPLE",
                                    "Created": new Date(),
                                    "Description": "",
                                    "EngineVersion": "3.11.20",
                                    "LatestRevision": {"Created": new Date(),
                                        "Revision": 1}}
                            ]
                        });

                        const service = new MqService(
                            creds,
                            "us-east-1"
                        );
                        const configs = await service.getConfigurations();

                        expect(configs).toHaveLength(2);
                        expect(configs[0].Name).toBe("my-config-1");

                    }
                );

                it(
                    "returns empty when no configurations",
                    async () => {

                        mqMock.on(ListConfigurationsCommand).resolves({});

                        const service = new MqService(
                            creds,
                            "us-east-1"
                        );
                        const configs = await service.getConfigurations();

                        expect(configs).toHaveLength(0);

                    }
                );

            }
        );

    }
);

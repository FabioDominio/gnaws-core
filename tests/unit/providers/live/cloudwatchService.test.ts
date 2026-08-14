import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    CloudWatchLogsClient,
    DescribeLogGroupsCommand,
    DescribeSubscriptionFiltersCommand,
    DescribeMetricFiltersCommand,
    DescribeDeliveriesCommand,
    DescribeDeliveryDestinationsCommand,
    DescribeDeliverySourcesCommand
} from "@aws-sdk/client-cloudwatch-logs";
import {
    CloudWatchClient,
    DescribeAlarmsCommand,
    ListMetricStreamsCommand
} from "@aws-sdk/client-cloudwatch";
import {CloudWatchService} from "../../../../src/providers/live/cloudwatchService.js";

const logsMock = mockClient(CloudWatchLogsClient);
const cwMock = mockClient(CloudWatchClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    logsMock.reset();
    cwMock.reset();

});

describe(
    "CloudWatchService",
    () => {

        describe(
            "getLogGroups",
            () => {

                it(
                    "returns log groups",
                    async () => {

                        logsMock.on(DescribeLogGroupsCommand).resolves({
                            "logGroups": [
                                {"logGroupName": "/aws/lambda/fn1",
                                    "arn": "arn:aws:logs:us-east-1:123:log-group:/aws/lambda/fn1"},
                                {"logGroupName": "/aws/lambda/fn2",
                                    "arn": "arn:aws:logs:us-east-1:123:log-group:/aws/lambda/fn2"}
                            ]
                        });

                        const service = new CloudWatchService(
                            creds,
                            "us-east-1"
                        );
                        const groups = await service.getLogGroups();

                        expect(groups).toHaveLength(2);
                        expect(groups[0].logGroupName).toBe("/aws/lambda/fn1");

                    }
                );

                it(
                    "aggregates across pages",
                    async () => {

                        logsMock.on(DescribeLogGroupsCommand).
                            resolvesOnce({"logGroups": [{"logGroupName": "g1"}],
                                "nextToken": "tok"}).
                            resolvesOnce({"logGroups": [{"logGroupName": "g2"}]});

                        const service = new CloudWatchService(
                            creds,
                            "us-east-1"
                        );
                        const groups = await service.getLogGroups();

                        expect(groups).toHaveLength(2);

                    }
                );

            }
        );

        describe(
            "getMetricAlarms",
            () => {

                it(
                    "returns metric alarms",
                    async () => {

                        cwMock.on(DescribeAlarmsCommand).resolves({
                            "MetricAlarms": [
                                {"AlarmName": "alarm-1",
                                    "MetricName": "CPUUtilization"},
                                {"AlarmName": "alarm-2",
                                    "MetricName": "DiskReadOps"}
                            ]
                        });

                        const service = new CloudWatchService(
                            creds,
                            "us-east-1"
                        );
                        const alarms = await service.getMetricAlarms();

                        expect(alarms).toHaveLength(2);
                        expect(alarms[0].AlarmName).toBe("alarm-1");

                    }
                );

                it(
                    "returns empty when no alarms",
                    async () => {

                        cwMock.on(DescribeAlarmsCommand).resolves({});

                        const service = new CloudWatchService(
                            creds,
                            "us-east-1"
                        );
                        const alarms = await service.getMetricAlarms();

                        expect(alarms).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getSubscriptionFilters",
            () => {

                it(
                    "returns subscription filters for a log group",
                    async () => {

                        logsMock.on(DescribeSubscriptionFiltersCommand).resolves({
                            "subscriptionFilters": [
                                {"filterName": "filter-1",
                                    "logGroupName": "/aws/lambda/fn1",
                                    "destinationArn": "arn:aws:lambda:us-east-1:123:function:processor"}
                            ]
                        });

                        const service = new CloudWatchService(
                            creds,
                            "us-east-1"
                        );
                        const filters = await service.getSubscriptionFilters("/aws/lambda/fn1");

                        expect(filters).toHaveLength(1);
                        expect(filters[0].filterName).toBe("filter-1");

                    }
                );

                it(
                    "returns empty when no filters",
                    async () => {

                        logsMock.on(DescribeSubscriptionFiltersCommand).resolves({});

                        const service = new CloudWatchService(
                            creds,
                            "us-east-1"
                        );
                        const filters = await service.getSubscriptionFilters("/aws/lambda/fn1");

                        expect(filters).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getCompositeAlarms",
            () => {

                it(
                    "returns composite alarms",
                    async () => {

                        cwMock.on(DescribeAlarmsCommand).resolves({
                            "CompositeAlarms": [
                                {"AlarmName": "composite-1",
                                    "AlarmRule": "ALARM(alarm-1) OR ALARM(alarm-2)"},
                                {"AlarmName": "composite-2",
                                    "AlarmRule": "ALARM(alarm-3)"}
                            ]
                        });

                        const service = new CloudWatchService(
                            creds,
                            "us-east-1"
                        );
                        const alarms = await service.getCompositeAlarms();

                        expect(alarms).toHaveLength(2);
                        expect(alarms[0].AlarmName).toBe("composite-1");

                    }
                );

                it(
                    "returns empty when no composite alarms",
                    async () => {

                        cwMock.on(DescribeAlarmsCommand).resolves({});

                        const service = new CloudWatchService(
                            creds,
                            "us-east-1"
                        );
                        const alarms = await service.getCompositeAlarms();

                        expect(alarms).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getMetricStreams",
            () => {

                it(
                    "returns metric streams",
                    async () => {

                        cwMock.on(ListMetricStreamsCommand).resolves({
                            "Entries": [
                                {"Arn": "arn:aws:cloudwatch:us-east-1:123:metric-stream/stream-1",
                                    "Name": "stream-1"},
                                {"Arn": "arn:aws:cloudwatch:us-east-1:123:metric-stream/stream-2",
                                    "Name": "stream-2"}
                            ]
                        });

                        const service = new CloudWatchService(
                            creds,
                            "us-east-1"
                        );
                        const streams = await service.getMetricStreams();

                        expect(streams).toHaveLength(2);
                        expect(streams[0].Name).toBe("stream-1");

                    }
                );

                it(
                    "returns empty when no metric streams",
                    async () => {

                        cwMock.on(ListMetricStreamsCommand).resolves({});

                        const service = new CloudWatchService(
                            creds,
                            "us-east-1"
                        );
                        const streams = await service.getMetricStreams();

                        expect(streams).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getMetricFilters",
            () => {

                it(
                    "returns metric filters",
                    async () => {

                        logsMock.on(DescribeMetricFiltersCommand).resolves({
                            "metricFilters": [
                                {"filterName": "mf-1",
                                    "logGroupName": "/aws/lambda/fn1",
                                    "filterPattern": "[ERROR]"},
                                {"filterName": "mf-2",
                                    "logGroupName": "/aws/lambda/fn2",
                                    "filterPattern": "[WARN]"}
                            ]
                        });

                        const service = new CloudWatchService(
                            creds,
                            "us-east-1"
                        );
                        const filters = await service.getMetricFilters();

                        expect(filters).toHaveLength(2);
                        expect(filters[0].filterName).toBe("mf-1");

                    }
                );

                it(
                    "returns empty when no metric filters",
                    async () => {

                        logsMock.on(DescribeMetricFiltersCommand).resolves({});

                        const service = new CloudWatchService(
                            creds,
                            "us-east-1"
                        );
                        const filters = await service.getMetricFilters();

                        expect(filters).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getDeliveries",
            () => {

                it(
                    "returns deliveries",
                    async () => {

                        logsMock.on(DescribeDeliveriesCommand).resolves({
                            "deliveries": [
                                {"id": "delivery-1",
                                    "deliverySourceName": "src-1",
                                    "deliveryDestinationArn": "arn:dest:1"},
                                {"id": "delivery-2",
                                    "deliverySourceName": "src-2",
                                    "deliveryDestinationArn": "arn:dest:2"}
                            ]
                        });

                        const service = new CloudWatchService(
                            creds,
                            "us-east-1"
                        );
                        const deliveries = await service.getDeliveries();

                        expect(deliveries).toHaveLength(2);
                        expect(deliveries[0].id).toBe("delivery-1");

                    }
                );

                it(
                    "returns empty when no deliveries",
                    async () => {

                        logsMock.on(DescribeDeliveriesCommand).resolves({});

                        const service = new CloudWatchService(
                            creds,
                            "us-east-1"
                        );
                        const deliveries = await service.getDeliveries();

                        expect(deliveries).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getDeliveryDestinations",
            () => {

                it(
                    "returns delivery destinations",
                    async () => {

                        logsMock.on(DescribeDeliveryDestinationsCommand).resolves({
                            "deliveryDestinations": [
                                {"name": "dest-1",
                                    "arn": "arn:aws:logs:us-east-1:123:delivery-destination:dest-1"},
                                {"name": "dest-2",
                                    "arn": "arn:aws:logs:us-east-1:123:delivery-destination:dest-2"}
                            ]
                        });

                        const service = new CloudWatchService(
                            creds,
                            "us-east-1"
                        );
                        const destinations = await service.getDeliveryDestinations();

                        expect(destinations).toHaveLength(2);
                        expect(destinations[0].name).toBe("dest-1");

                    }
                );

                it(
                    "returns empty when no delivery destinations",
                    async () => {

                        logsMock.on(DescribeDeliveryDestinationsCommand).resolves({});

                        const service = new CloudWatchService(
                            creds,
                            "us-east-1"
                        );
                        const destinations = await service.getDeliveryDestinations();

                        expect(destinations).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getDeliverySources",
            () => {

                it(
                    "returns delivery sources",
                    async () => {

                        logsMock.on(DescribeDeliverySourcesCommand).resolves({
                            "deliverySources": [
                                {"name": "source-1",
                                    "arn": "arn:aws:logs:us-east-1:123:delivery-source:source-1"},
                                {"name": "source-2",
                                    "arn": "arn:aws:logs:us-east-1:123:delivery-source:source-2"}
                            ]
                        });

                        const service = new CloudWatchService(
                            creds,
                            "us-east-1"
                        );
                        const sources = await service.getDeliverySources();

                        expect(sources).toHaveLength(2);
                        expect(sources[0].name).toBe("source-1");

                    }
                );

                it(
                    "returns empty when no delivery sources",
                    async () => {

                        logsMock.on(DescribeDeliverySourcesCommand).resolves({});

                        const service = new CloudWatchService(
                            creds,
                            "us-east-1"
                        );
                        const sources = await service.getDeliverySources();

                        expect(sources).toHaveLength(0);

                    }
                );

            }
        );

    }
);

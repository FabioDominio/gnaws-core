import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type LogGroup,
    type SubscriptionFilter,
    type MetricFilter,
    type Delivery,
    type DeliveryDestination,
    type DeliverySource,
    CloudWatchLogsClient,
    type CloudWatchLogsClientConfig,
    paginateDescribeLogGroups,
    paginateDescribeSubscriptionFilters,
    paginateDescribeMetricFilters,
    paginateDescribeDeliveries,
    paginateDescribeDeliveryDestinations,
    paginateDescribeDeliverySources
} from "@aws-sdk/client-cloudwatch-logs";
import {
    type MetricAlarm,
    type CompositeAlarm,
    type MetricStreamEntry,
    CloudWatchClient,
    type CloudWatchClientConfig,
    paginateDescribeAlarms,
    paginateListMetricStreams
} from "@aws-sdk/client-cloudwatch";
import type {CloudWatch} from "../../interfaces/cloudwatch.js";

export class CloudWatchService implements CloudWatch {

    #logsClient: CloudWatchLogsClient;

    #cloudWatchClient: CloudWatchClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const logsConfig: CloudWatchLogsClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#logsClient = new CloudWatchLogsClient(logsConfig);

        const cwConfig: CloudWatchClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#cloudWatchClient = new CloudWatchClient(cwConfig);

    }

    async getLogGroups (): Promise<LogGroup[]> {

        const client = this.#logsClient;
        const logGroups: LogGroup[] = [];
        for await (const page of paginateDescribeLogGroups(
            {client},
            {}
        )) {

            if (page.logGroups !== undefined) {

                logGroups.push(...page.logGroups);

            }

        }
        return logGroups;

    }

    async getMetricAlarms (): Promise<MetricAlarm[]> {

        const client = this.#cloudWatchClient;
        const alarms: MetricAlarm[] = [];
        for await (const page of paginateDescribeAlarms(
            {client},
            {"AlarmTypes": ["MetricAlarm"]}
        )) {

            if (page.MetricAlarms !== undefined) {

                alarms.push(...page.MetricAlarms);

            }

        }
        return alarms;

    }

    async getCompositeAlarms (): Promise<CompositeAlarm[]> {

        const client = this.#cloudWatchClient;
        const alarms: CompositeAlarm[] = [];
        for await (const page of paginateDescribeAlarms(
            {client},
            {"AlarmTypes": ["CompositeAlarm"]}
        )) {

            if (page.CompositeAlarms !== undefined) {

                alarms.push(...page.CompositeAlarms);

            }

        }
        return alarms;

    }

    async getSubscriptionFilters (logGroupName: string): Promise<SubscriptionFilter[]> {

        const client = this.#logsClient;
        const filters: SubscriptionFilter[] = [];
        for await (const page of paginateDescribeSubscriptionFilters(
            {client},
            {"logGroupName": logGroupName}
        )) {

            if (page.subscriptionFilters !== undefined) {

                filters.push(...page.subscriptionFilters);

            }

        }
        return filters;

    }

    async getMetricStreams (): Promise<MetricStreamEntry[]> {

        const client = this.#cloudWatchClient;
        const streams: MetricStreamEntry[] = [];
        for await (const page of paginateListMetricStreams(
            {client},
            {}
        )) {

            if (page.Entries !== undefined) {

                streams.push(...page.Entries);

            }

        }
        return streams;

    }

    async getMetricFilters (): Promise<MetricFilter[]> {

        const client = this.#logsClient;
        const filters: MetricFilter[] = [];
        for await (const page of paginateDescribeMetricFilters(
            {client},
            {}
        )) {

            if (page.metricFilters !== undefined) {

                filters.push(...page.metricFilters);

            }

        }
        return filters;

    }

    async getDeliveries (): Promise<Delivery[]> {

        const client = this.#logsClient;
        const deliveries: Delivery[] = [];
        for await (const page of paginateDescribeDeliveries(
            {client},
            {}
        )) {

            if (page.deliveries !== undefined) {

                deliveries.push(...page.deliveries);

            }

        }
        return deliveries;

    }

    async getDeliveryDestinations (): Promise<DeliveryDestination[]> {

        const client = this.#logsClient;
        const destinations: DeliveryDestination[] = [];
        for await (const page of paginateDescribeDeliveryDestinations(
            {client},
            {}
        )) {

            if (page.deliveryDestinations !== undefined) {

                destinations.push(...page.deliveryDestinations);

            }

        }
        return destinations;

    }

    async getDeliverySources (): Promise<DeliverySource[]> {

        const client = this.#logsClient;
        const sources: DeliverySource[] = [];
        for await (const page of paginateDescribeDeliverySources(
            {client},
            {}
        )) {

            if (page.deliverySources !== undefined) {

                sources.push(...page.deliverySources);

            }

        }
        return sources;

    }

}

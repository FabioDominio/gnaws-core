import type {LogGroup, SubscriptionFilter, MetricFilter, Delivery, DeliveryDestination, DeliverySource} from "@aws-sdk/client-cloudwatch-logs";
import type {MetricAlarm, CompositeAlarm, MetricStreamEntry} from "@aws-sdk/client-cloudwatch";

export interface CloudWatch {
    getLogGroups (): Promise<LogGroup[]>;
    getMetricAlarms (): Promise<MetricAlarm[]>;
    getCompositeAlarms (): Promise<CompositeAlarm[]>;
    getSubscriptionFilters (logGroupName: string): Promise<SubscriptionFilter[]>;
    getMetricStreams (): Promise<MetricStreamEntry[]>;
    getMetricFilters (): Promise<MetricFilter[]>;
    getDeliveries (): Promise<Delivery[]>;
    getDeliveryDestinations (): Promise<DeliveryDestination[]>;
    getDeliverySources (): Promise<DeliverySource[]>;
}

import type {LogGroup, SubscriptionFilter, MetricFilter, Delivery, DeliveryDestination, DeliverySource} from "@aws-sdk/client-cloudwatch-logs";
import type {MetricAlarm, CompositeAlarm, MetricStreamEntry} from "@aws-sdk/client-cloudwatch";
import type {CloudWatch} from "../../interfaces/cloudwatch.js";
import {readCacheFile} from "./cacheReader.js";

export class CloudWatchCacheService implements CloudWatch {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getLogGroups (): Promise<LogGroup[]> {

        return readCacheFile(
            this.#cacheDir,
            "cloudwatch_log_groups.json"
        );

    }

    async getMetricAlarms (): Promise<MetricAlarm[]> {

        return readCacheFile(
            this.#cacheDir,
            "cloudwatch_metric_alarms.json"
        );

    }

    async getCompositeAlarms (): Promise<CompositeAlarm[]> {

        return readCacheFile(
            this.#cacheDir,
            "cloudwatch_composite_alarms.json"
        );

    }

    async getSubscriptionFilters (_logGroupName: string): Promise<SubscriptionFilter[]> {

        return readCacheFile(
            this.#cacheDir,
            "cloudwatch_subscription_filters.json"
        );

    }

    async getMetricStreams (): Promise<MetricStreamEntry[]> {

        return readCacheFile(
            this.#cacheDir,
            "cloudwatch_metric_streams.json"
        );

    }

    async getMetricFilters (): Promise<MetricFilter[]> {

        return readCacheFile(
            this.#cacheDir,
            "cloudwatch_metric_filters.json"
        );

    }

    async getDeliveries (): Promise<Delivery[]> {

        return readCacheFile(
            this.#cacheDir,
            "cloudwatch_deliveries.json"
        );

    }

    async getDeliveryDestinations (): Promise<DeliveryDestination[]> {

        return readCacheFile(
            this.#cacheDir,
            "cloudwatch_delivery_destinations.json"
        );

    }

    async getDeliverySources (): Promise<DeliverySource[]> {

        return readCacheFile(
            this.#cacheDir,
            "cloudwatch_delivery_sources.json"
        );

    }

}

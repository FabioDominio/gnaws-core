import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {CloudWatchCacheService} from "../../../../src/providers/cache/cloudwatchCacheService.js";

let tmpDir: string;
beforeEach(() => {

    tmpDir = mkdtempSync(join(
        tmpdir(),
        "gnaws-test-"
    ));

});
afterEach(() => {

    rmSync(
        tmpDir,
        {"recursive": true}
    );

});

describe(
    "CloudWatchCacheService",
    () => {

        it(
            "getLogGroups reads cloudwatch_log_groups.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "cloudwatch_log_groups.json"
                    ),
                    JSON.stringify([{"logGroupName": "/aws/lambda/fn1"}])
                );
                const service = new CloudWatchCacheService(tmpDir);
                expect(await service.getLogGroups()).toEqual([{"logGroupName": "/aws/lambda/fn1"}]);

            }
        );

        it(
            "getLogGroups returns empty for missing file",
            async () => {

                const service = new CloudWatchCacheService(tmpDir);
                expect(await service.getLogGroups()).toEqual([]);

            }
        );

        it(
            "getMetricAlarms reads cloudwatch_metric_alarms.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "cloudwatch_metric_alarms.json"
                    ),
                    JSON.stringify([{"AlarmName": "alarm1"}])
                );
                const service = new CloudWatchCacheService(tmpDir);
                expect(await service.getMetricAlarms()).toEqual([{"AlarmName": "alarm1"}]);

            }
        );

        it(
            "getMetricAlarms returns empty for missing file",
            async () => {

                const service = new CloudWatchCacheService(tmpDir);
                expect(await service.getMetricAlarms()).toEqual([]);

            }
        );

        it(
            "getCompositeAlarms reads cloudwatch_composite_alarms.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "cloudwatch_composite_alarms.json"
                    ),
                    JSON.stringify([{"AlarmName": "composite1"}])
                );
                const service = new CloudWatchCacheService(tmpDir);
                expect(await service.getCompositeAlarms()).toEqual([{"AlarmName": "composite1"}]);

            }
        );

        it(
            "getCompositeAlarms returns empty for missing file",
            async () => {

                const service = new CloudWatchCacheService(tmpDir);
                expect(await service.getCompositeAlarms()).toEqual([]);

            }
        );

        it(
            "getSubscriptionFilters reads cloudwatch_subscription_filters.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "cloudwatch_subscription_filters.json"
                    ),
                    JSON.stringify([{"filterName": "filter1"}])
                );
                const service = new CloudWatchCacheService(tmpDir);
                expect(await service.getSubscriptionFilters("/aws/lambda/fn1")).toEqual([{"filterName": "filter1"}]);

            }
        );

        it(
            "getSubscriptionFilters returns empty for missing file",
            async () => {

                const service = new CloudWatchCacheService(tmpDir);
                expect(await service.getSubscriptionFilters("/aws/lambda/fn1")).toEqual([]);

            }
        );

        it(
            "getMetricStreams reads cloudwatch_metric_streams.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "cloudwatch_metric_streams.json"
                    ),
                    JSON.stringify([{"Name": "stream1"}])
                );
                const service = new CloudWatchCacheService(tmpDir);
                expect(await service.getMetricStreams()).toEqual([{"Name": "stream1"}]);

            }
        );

        it(
            "getMetricStreams returns empty for missing file",
            async () => {

                const service = new CloudWatchCacheService(tmpDir);
                expect(await service.getMetricStreams()).toEqual([]);

            }
        );

        it(
            "getMetricFilters reads cloudwatch_metric_filters.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "cloudwatch_metric_filters.json"
                    ),
                    JSON.stringify([{"filterName": "mf1"}])
                );
                const service = new CloudWatchCacheService(tmpDir);
                expect(await service.getMetricFilters()).toEqual([{"filterName": "mf1"}]);

            }
        );

        it(
            "getMetricFilters returns empty for missing file",
            async () => {

                const service = new CloudWatchCacheService(tmpDir);
                expect(await service.getMetricFilters()).toEqual([]);

            }
        );

        it(
            "getDeliveries reads cloudwatch_deliveries.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "cloudwatch_deliveries.json"
                    ),
                    JSON.stringify([{"id": "del1"}])
                );
                const service = new CloudWatchCacheService(tmpDir);
                expect(await service.getDeliveries()).toEqual([{"id": "del1"}]);

            }
        );

        it(
            "getDeliveries returns empty for missing file",
            async () => {

                const service = new CloudWatchCacheService(tmpDir);
                expect(await service.getDeliveries()).toEqual([]);

            }
        );

        it(
            "getDeliveryDestinations reads cloudwatch_delivery_destinations.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "cloudwatch_delivery_destinations.json"
                    ),
                    JSON.stringify([{"name": "dest1"}])
                );
                const service = new CloudWatchCacheService(tmpDir);
                expect(await service.getDeliveryDestinations()).toEqual([{"name": "dest1"}]);

            }
        );

        it(
            "getDeliveryDestinations returns empty for missing file",
            async () => {

                const service = new CloudWatchCacheService(tmpDir);
                expect(await service.getDeliveryDestinations()).toEqual([]);

            }
        );

        it(
            "getDeliverySources reads cloudwatch_delivery_sources.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "cloudwatch_delivery_sources.json"
                    ),
                    JSON.stringify([{"name": "src1"}])
                );
                const service = new CloudWatchCacheService(tmpDir);
                expect(await service.getDeliverySources()).toEqual([{"name": "src1"}]);

            }
        );

        it(
            "getDeliverySources returns empty for missing file",
            async () => {

                const service = new CloudWatchCacheService(tmpDir);
                expect(await service.getDeliverySources()).toEqual([]);

            }
        );

    }
);

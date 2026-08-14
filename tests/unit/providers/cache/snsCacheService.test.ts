import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {SnsCacheService} from "../../../../src/providers/cache/snsCacheService.js";

describe(
    "SnsCacheService",
    () => {

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

        it(
            "getTopics reads sns_topics.json",
            async () => {

                const data = [{"TopicArn": "arn:aws:sns:us-east-1:123:my-topic"}];
                writeFileSync(
                    join(
                        tmpDir,
                        "sns_topics.json"
                    ),
                    JSON.stringify(data)
                );
                const service = new SnsCacheService(tmpDir);
                const result = await service.getTopics();
                expect(result).toEqual(data);

            }
        );

        it(
            "getTopics returns empty array for missing file",
            async () => {

                const service = new SnsCacheService(tmpDir);
                const result = await service.getTopics();
                expect(result).toEqual([]);

            }
        );

        it(
            "getSubscriptions reads sns_subscriptions.json",
            async () => {

                const data = [
                    {"SubscriptionArn": "arn:aws:sns:us-east-1:123:my-topic:sub-1",
                        "TopicArn": "arn:aws:sns:us-east-1:123:my-topic"}
                ];
                writeFileSync(
                    join(
                        tmpDir,
                        "sns_subscriptions.json"
                    ),
                    JSON.stringify(data)
                );
                const service = new SnsCacheService(tmpDir);
                const result = await service.getSubscriptions();
                expect(result).toEqual(data);

            }
        );

        it(
            "getSubscriptions returns empty array for missing file",
            async () => {

                const service = new SnsCacheService(tmpDir);
                const result = await service.getSubscriptions();
                expect(result).toEqual([]);

            }
        );

        it(
            "getTagsForTopic returns empty array (hardcoded)",
            async () => {

                const service = new SnsCacheService(tmpDir);
                const result = await service.getTagsForTopic("arn:aws:sns:us-east-1:123:my-topic");
                expect(result).toEqual([]);

            }
        );

    }
);

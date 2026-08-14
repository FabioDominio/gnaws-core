import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {SqsCacheService} from "../../../../src/providers/cache/sqsCacheService.js";

describe(
    "SqsCacheService",
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
            "getQueues reads sqs_queues.json",
            async () => {

                const data = [
                    {"QueueUrl": "https://sqs.us-east-1.amazonaws.com/123/my-queue",
                        "QueueArn": "arn:aws:sqs:us-east-1:123:my-queue"}
                ];
                writeFileSync(
                    join(
                        tmpDir,
                        "sqs_queues.json"
                    ),
                    JSON.stringify(data)
                );
                const service = new SqsCacheService(tmpDir);
                const result = await service.getQueues();
                expect(result).toEqual(data);

            }
        );

        it(
            "getQueues returns empty array for missing file",
            async () => {

                const service = new SqsCacheService(tmpDir);
                const result = await service.getQueues();
                expect(result).toEqual([]);

            }
        );

        it(
            "getDeadLetterSourceQueues reads sqs_dlq_sources.json",
            async () => {

                const data = ["https://sqs.us-east-1.amazonaws.com/123/source-queue"];
                writeFileSync(
                    join(
                        tmpDir,
                        "sqs_dlq_sources.json"
                    ),
                    JSON.stringify(data)
                );
                const service = new SqsCacheService(tmpDir);
                const result = await service.getDeadLetterSourceQueues("https://sqs.us-east-1.amazonaws.com/123/my-dlq");
                expect(result).toEqual(data);

            }
        );

        it(
            "getDeadLetterSourceQueues returns empty array for missing file",
            async () => {

                const service = new SqsCacheService(tmpDir);
                const result = await service.getDeadLetterSourceQueues("https://sqs.us-east-1.amazonaws.com/123/my-dlq");
                expect(result).toEqual([]);

            }
        );

    }
);

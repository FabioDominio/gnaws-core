import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {MqCacheService} from "../../../../src/providers/cache/mqCacheService.js";

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
    "MqCacheService",
    () => {

        it(
            "getBrokers reads mq_brokers.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "mq_brokers.json"
                    ),
                    JSON.stringify([{"BrokerId": "broker1"}])
                );
                const service = new MqCacheService(tmpDir);
                expect(await service.getBrokers()).toEqual([{"BrokerId": "broker1"}]);

            }
        );

        it(
            "getBrokers returns empty for missing file",
            async () => {

                const service = new MqCacheService(tmpDir);
                expect(await service.getBrokers()).toEqual([]);

            }
        );

        it(
            "getConfigurations reads mq_configurations.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "mq_configurations.json"
                    ),
                    JSON.stringify([{"Id": "config1"}])
                );
                const service = new MqCacheService(tmpDir);
                expect(await service.getConfigurations()).toEqual([{"Id": "config1"}]);

            }
        );

        it(
            "getConfigurations returns empty for missing file",
            async () => {

                const service = new MqCacheService(tmpDir);
                expect(await service.getConfigurations()).toEqual([]);

            }
        );

    }
);

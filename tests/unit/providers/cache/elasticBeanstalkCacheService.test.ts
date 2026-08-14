import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {ElasticBeanstalkCacheService} from "../../../../src/providers/cache/elasticBeanstalkCacheService.js";

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
    "ElasticBeanstalkCacheService",
    () => {

        it(
            "getApplications reads elasticbeanstalk_applications.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "elasticbeanstalk_applications.json"
                    ),
                    JSON.stringify([{"ApplicationName": "app1"}])
                );
                const service = new ElasticBeanstalkCacheService(tmpDir);
                expect(await service.getApplications()).toEqual([{"ApplicationName": "app1"}]);

            }
        );

        it(
            "getApplications returns empty for missing file",
            async () => {

                const service = new ElasticBeanstalkCacheService(tmpDir);
                expect(await service.getApplications()).toEqual([]);

            }
        );

        it(
            "getEnvironments reads elasticbeanstalk_environments.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "elasticbeanstalk_environments.json"
                    ),
                    JSON.stringify([{"EnvironmentName": "env1"}])
                );
                const service = new ElasticBeanstalkCacheService(tmpDir);
                expect(await service.getEnvironments()).toEqual([{"EnvironmentName": "env1"}]);

            }
        );

        it(
            "getEnvironments returns empty for missing file",
            async () => {

                const service = new ElasticBeanstalkCacheService(tmpDir);
                expect(await service.getEnvironments()).toEqual([]);

            }
        );

    }
);

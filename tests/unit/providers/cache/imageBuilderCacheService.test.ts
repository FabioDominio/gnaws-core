import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {ImageBuilderCacheService} from "../../../../src/providers/cache/imageBuilderCacheService.js";

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
    "ImageBuilderCacheService",
    () => {

        it(
            "getInfrastructureConfigurations reads imagebuilder_infra_configs.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "imagebuilder_infra_configs.json"
                    ),
                    JSON.stringify([{"name": "config1"}])
                );
                const service = new ImageBuilderCacheService(tmpDir);
                expect(await service.getInfrastructureConfigurations()).toEqual([{"name": "config1"}]);

            }
        );

        it(
            "getInfrastructureConfigurations returns empty for missing file",
            async () => {

                const service = new ImageBuilderCacheService(tmpDir);
                expect(await service.getInfrastructureConfigurations()).toEqual([]);

            }
        );

    }
);

import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {EcsCacheService} from "../../../../src/providers/cache/ecsCacheService.js";

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
    "EcsCacheService",
    () => {

        it(
            "getClusters reads ecs_clusters.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "ecs_clusters.json"
                    ),
                    JSON.stringify([{"clusterName": "cluster1"}])
                );
                const service = new EcsCacheService(tmpDir);
                expect(await service.getClusters()).toEqual([{"clusterName": "cluster1"}]);

            }
        );

        it(
            "getClusters returns empty for missing file",
            async () => {

                const service = new EcsCacheService(tmpDir);
                expect(await service.getClusters()).toEqual([]);

            }
        );

        it(
            "getServices reads ecs_services.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "ecs_services.json"
                    ),
                    JSON.stringify([{"serviceName": "svc1"}])
                );
                const service = new EcsCacheService(tmpDir);
                expect(await service.getServices("arn:cluster")).toEqual([{"serviceName": "svc1"}]);

            }
        );

        it(
            "getServices returns empty for missing file",
            async () => {

                const service = new EcsCacheService(tmpDir);
                expect(await service.getServices("arn:cluster")).toEqual([]);

            }
        );

        it(
            "getTaskDefinitionArns reads ecs_task_definition_arns.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "ecs_task_definition_arns.json"
                    ),
                    JSON.stringify(["arn:td:1"])
                );
                const service = new EcsCacheService(tmpDir);
                expect(await service.getTaskDefinitionArns()).toEqual(["arn:td:1"]);

            }
        );

        it(
            "getTaskDefinitionArns returns empty for missing file",
            async () => {

                const service = new EcsCacheService(tmpDir);
                expect(await service.getTaskDefinitionArns()).toEqual([]);

            }
        );

        it(
            "getContainerInstances reads ecs_container_instances.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "ecs_container_instances.json"
                    ),
                    JSON.stringify([{"containerInstanceArn": "arn:ci:1"}])
                );
                const service = new EcsCacheService(tmpDir);
                expect(await service.getContainerInstances("arn:cluster")).toEqual([{"containerInstanceArn": "arn:ci:1"}]);

            }
        );

        it(
            "getContainerInstances returns empty for missing file",
            async () => {

                const service = new EcsCacheService(tmpDir);
                expect(await service.getContainerInstances("arn:cluster")).toEqual([]);

            }
        );

    }
);

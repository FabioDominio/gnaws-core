import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {SageMakerCacheService} from "../../../../src/providers/cache/sageMakerCacheService.js";

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
    "SageMakerCacheService",
    () => {

        it(
            "getNotebookInstances reads sagemaker_notebooks.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "sagemaker_notebooks.json"
                    ),
                    JSON.stringify([{"NotebookInstanceName": "nb1"}])
                );
                const service = new SageMakerCacheService(tmpDir);
                expect(await service.getNotebookInstances()).toEqual([{"NotebookInstanceName": "nb1"}]);

            }
        );

        it(
            "getNotebookInstances returns empty for missing file",
            async () => {

                const service = new SageMakerCacheService(tmpDir);
                expect(await service.getNotebookInstances()).toEqual([]);

            }
        );

    }
);

import type {DescribeNotebookInstanceOutput} from "@aws-sdk/client-sagemaker";
import type {SageMaker} from "../../interfaces/sagemaker.js";
import {readCacheFile} from "./cacheReader.js";

export class SageMakerCacheService implements SageMaker {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getNotebookInstances (): Promise<DescribeNotebookInstanceOutput[]> {

        return readCacheFile(
            this.#cacheDir,
            "sagemaker_notebooks.json"
        );

    }

}

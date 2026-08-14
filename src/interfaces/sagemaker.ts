import type {DescribeNotebookInstanceOutput} from "@aws-sdk/client-sagemaker";
export interface SageMaker {
    getNotebookInstances (): Promise<DescribeNotebookInstanceOutput[]>;
}

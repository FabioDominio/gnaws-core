import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {SageMakerClient, ListNotebookInstancesCommand, DescribeNotebookInstanceCommand} from "@aws-sdk/client-sagemaker";
import {SageMakerService} from "../../../../src/providers/live/sageMakerService.js";

const sageMakerMock = mockClient(SageMakerClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    sageMakerMock.reset();

});

describe(
    "SageMakerService",
    () => {

        describe(
            "getNotebookInstances",
            () => {

                it(
                    "returns notebook instances with describe enrichment",
                    async () => {

                        sageMakerMock.on(ListNotebookInstancesCommand).resolves({
                            "NotebookInstances": [
                                {"NotebookInstanceName": "nb-1",
                                    "NotebookInstanceArn": "arn:aws:sagemaker:us-east-1:123:notebook-instance/nb-1",
                                    "NotebookInstanceStatus": "InService"},
                                {"NotebookInstanceName": "nb-2",
                                    "NotebookInstanceArn": "arn:aws:sagemaker:us-east-1:123:notebook-instance/nb-2",
                                    "NotebookInstanceStatus": "Stopped"}
                            ]
                        });
                        sageMakerMock.on(DescribeNotebookInstanceCommand).callsFake((input: {"NotebookInstanceName"?: string}) => ({
                            "NotebookInstanceName": input.NotebookInstanceName,
                            "NotebookInstanceArn": `arn:aws:sagemaker:us-east-1:123:notebook-instance/${String(input.NotebookInstanceName)}`,
                            "NotebookInstanceStatus": "InService",
                            "InstanceType": "ml.t3.medium",
                            "RoleArn": "arn:aws:iam::123:role/sagemaker-role"
                        }));

                        const service = new SageMakerService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getNotebookInstances();

                        expect(result).toHaveLength(2);
                        expect(result[0].InstanceType).toBe("ml.t3.medium");

                    }
                );

                it(
                    "skips instances without name",
                    async () => {

                        sageMakerMock.on(ListNotebookInstancesCommand).resolves({
                            "NotebookInstances": [
                                {"NotebookInstanceName": "valid-nb",
                                    "NotebookInstanceArn": "arn:aws:sagemaker:us-east-1:123:notebook-instance/valid-nb"},
                                {"NotebookInstanceArn": "arn:aws:sagemaker:us-east-1:123:notebook-instance/no-name",
                                    "NotebookInstanceName": ""}
                            ]
                        });
                        sageMakerMock.on(DescribeNotebookInstanceCommand).resolves({
                            "NotebookInstanceName": "valid-nb",
                            "NotebookInstanceStatus": "InService"
                        });

                        const service = new SageMakerService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getNotebookInstances();

                        expect(result).toHaveLength(1);

                    }
                );

                it(
                    "returns empty when no instances",
                    async () => {

                        sageMakerMock.on(ListNotebookInstancesCommand).resolves({});

                        const service = new SageMakerService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getNotebookInstances();

                        expect(result).toHaveLength(0);

                    }
                );

                it(
                    "skips deleted instances gracefully",
                    async () => {

                        sageMakerMock.on(ListNotebookInstancesCommand).resolves({
                            "NotebookInstances": [
                                {"NotebookInstanceName": "nb-1",
                                    "NotebookInstanceArn": "arn:aws:sagemaker:us-east-1:123:notebook-instance/nb-1"}
                            ]
                        });
                        sageMakerMock.on(DescribeNotebookInstanceCommand).rejects(new Error("ValidationException"));

                        const service = new SageMakerService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getNotebookInstances();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

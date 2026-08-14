import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {EMRServerlessClient, ListApplicationsCommand} from "@aws-sdk/client-emr-serverless";
import {EmrServerlessService} from "../../../../src/providers/live/emrServerlessService.js";

const emrServerlessMock = mockClient(EMRServerlessClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    emrServerlessMock.reset();

});

describe(
    "EmrServerlessService",
    () => {

        describe(
            "getApplications",
            () => {

                it(
                    "returns applications",
                    async () => {

                        emrServerlessMock.on(ListApplicationsCommand).resolves({
                            "applications": [
                                {"id": "app-1",
                                    "name": "spark-app",
                                    "arn": "arn:aws:emr-serverless:us-east-1:123:applications/app-1",
                                    "type": "Spark",
                                    "state": "CREATED",
                                    "createdAt": new Date(),
                                    "updatedAt": new Date(),
                                    "releaseLabel": "emr-6.9.0"},
                                {"id": "app-2",
                                    "name": "hive-app",
                                    "arn": "arn:aws:emr-serverless:us-east-1:123:applications/app-2",
                                    "type": "Hive",
                                    "state": "STARTED",
                                    "createdAt": new Date(),
                                    "updatedAt": new Date(),
                                    "releaseLabel": "emr-6.9.0"}
                            ]
                        });

                        const service = new EmrServerlessService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getApplications();

                        expect(result).toHaveLength(2);
                        expect(result[0].name).toBe("spark-app");

                    }
                );

                it(
                    "returns empty when no applications",
                    async () => {

                        emrServerlessMock.on(ListApplicationsCommand).resolves({});

                        const service = new EmrServerlessService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getApplications();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

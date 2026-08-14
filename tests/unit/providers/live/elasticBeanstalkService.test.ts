import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {ElasticBeanstalkClient, DescribeApplicationsCommand, DescribeEnvironmentsCommand} from "@aws-sdk/client-elastic-beanstalk";
import {ElasticBeanstalkService} from "../../../../src/providers/live/elasticBeanstalkService.js";

const ebMock = mockClient(ElasticBeanstalkClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    ebMock.reset();

});

describe(
    "ElasticBeanstalkService",
    () => {

        describe(
            "getApplications",
            () => {

                it(
                    "returns applications",
                    async () => {

                        ebMock.on(DescribeApplicationsCommand).resolves({
                            "Applications": [
                                {"ApplicationName": "my-app",
                                    "ApplicationArn": "arn:aws:elasticbeanstalk:us-east-1:123:application/my-app"},
                                {"ApplicationName": "other-app",
                                    "ApplicationArn": "arn:aws:elasticbeanstalk:us-east-1:123:application/other-app"}
                            ]
                        });

                        const service = new ElasticBeanstalkService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getApplications();

                        expect(result).toHaveLength(2);
                        expect(result[0].ApplicationName).toBe("my-app");

                    }
                );

                it(
                    "returns empty when no applications",
                    async () => {

                        ebMock.on(DescribeApplicationsCommand).resolves({});

                        const service = new ElasticBeanstalkService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getApplications();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getEnvironments",
            () => {

                it(
                    "returns environments",
                    async () => {

                        ebMock.on(DescribeEnvironmentsCommand).resolves({
                            "Environments": [
                                {"EnvironmentId": "e-1",
                                    "EnvironmentName": "my-app-prod",
                                    "Status": "Ready"},
                                {"EnvironmentId": "e-2",
                                    "EnvironmentName": "my-app-dev",
                                    "Status": "Ready"}
                            ]
                        });

                        const service = new ElasticBeanstalkService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getEnvironments();

                        expect(result).toHaveLength(2);
                        expect(result[0].EnvironmentName).toBe("my-app-prod");

                    }
                );

                it(
                    "returns empty when no environments",
                    async () => {

                        ebMock.on(DescribeEnvironmentsCommand).resolves({});

                        const service = new ElasticBeanstalkService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getEnvironments();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    MWAAClient,
    ListEnvironmentsCommand,
    GetEnvironmentCommand
} from "@aws-sdk/client-mwaa";
import {MwaaService} from "../../../../src/providers/live/mwaaService.js";

const mwaaMock = mockClient(MWAAClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    mwaaMock.reset();

});

describe(
    "MwaaService",
    () => {

        describe(
            "getEnvironments",
            () => {

                it(
                    "returns environments with full details",
                    async () => {

                        mwaaMock.on(ListEnvironmentsCommand).resolves({
                            "Environments": [
                                "env-1",
                                "env-2"
                            ]
                        });
                        mwaaMock.on(
                            GetEnvironmentCommand,
                            {"Name": "env-1"}
                        ).resolves({
                            "Environment": {"Name": "env-1",
                                "Arn": "arn:aws:airflow:us-east-1:123:environment/env-1",
                                "Status": "AVAILABLE"}
                        });
                        mwaaMock.on(
                            GetEnvironmentCommand,
                            {"Name": "env-2"}
                        ).resolves({
                            "Environment": {"Name": "env-2",
                                "Arn": "arn:aws:airflow:us-east-1:123:environment/env-2",
                                "Status": "AVAILABLE"}
                        });

                        const service = new MwaaService(
                            creds,
                            "us-east-1"
                        );
                        const envs = await service.getEnvironments();

                        expect(envs).toHaveLength(2);
                        expect(envs[0].Name).toBe("env-1");

                    }
                );

                it(
                    "skips environments that fail GetEnvironment",
                    async () => {

                        mwaaMock.on(ListEnvironmentsCommand).resolves({
                            "Environments": [
                                "env-ok",
                                "env-gone"
                            ]
                        });
                        mwaaMock.on(
                            GetEnvironmentCommand,
                            {"Name": "env-ok"}
                        ).resolves({
                            "Environment": {"Name": "env-ok",
                                "Status": "AVAILABLE"}
                        });
                        mwaaMock.on(
                            GetEnvironmentCommand,
                            {"Name": "env-gone"}
                        ).rejects(new Error("ResourceNotFoundException"));

                        const service = new MwaaService(
                            creds,
                            "us-east-1"
                        );
                        const envs = await service.getEnvironments();

                        expect(envs).toHaveLength(1);
                        expect(envs[0].Name).toBe("env-ok");

                    }
                );

                it(
                    "returns empty when no environments",
                    async () => {

                        mwaaMock.on(ListEnvironmentsCommand).resolves({});

                        const service = new MwaaService(
                            creds,
                            "us-east-1"
                        );
                        const envs = await service.getEnvironments();

                        expect(envs).toHaveLength(0);

                    }
                );

            }
        );

    }
);

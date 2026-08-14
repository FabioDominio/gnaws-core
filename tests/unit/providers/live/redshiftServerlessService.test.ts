import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {RedshiftServerlessClient, ListNamespacesCommand, ListWorkgroupsCommand} from "@aws-sdk/client-redshift-serverless";
import {RedshiftServerlessService} from "../../../../src/providers/live/redshiftServerlessService.js";

const rsMock = mockClient(RedshiftServerlessClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    rsMock.reset();

});

describe(
    "RedshiftServerlessService",
    () => {

        describe(
            "getNamespaces",
            () => {

                it(
                    "returns namespaces",
                    async () => {

                        rsMock.on(ListNamespacesCommand).resolves({
                            "namespaces": [
                                {"namespaceName": "ns-1",
                                    "namespaceArn": "arn:aws:redshift-serverless:us-east-1:123:namespace/ns-1",
                                    "status": "AVAILABLE"},
                                {"namespaceName": "ns-2",
                                    "namespaceArn": "arn:aws:redshift-serverless:us-east-1:123:namespace/ns-2",
                                    "status": "AVAILABLE"}
                            ]
                        });

                        const service = new RedshiftServerlessService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getNamespaces();

                        expect(result).toHaveLength(2);
                        expect(result[0].namespaceName).toBe("ns-1");

                    }
                );

                it(
                    "returns empty when no namespaces",
                    async () => {

                        rsMock.on(ListNamespacesCommand).resolves({});

                        const service = new RedshiftServerlessService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getNamespaces();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getWorkgroups",
            () => {

                it(
                    "returns workgroups",
                    async () => {

                        rsMock.on(ListWorkgroupsCommand).resolves({
                            "workgroups": [
                                {"workgroupName": "wg-1",
                                    "workgroupArn": "arn:aws:redshift-serverless:us-east-1:123:workgroup/wg-1",
                                    "status": "AVAILABLE"}
                            ]
                        });

                        const service = new RedshiftServerlessService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getWorkgroups();

                        expect(result).toHaveLength(1);
                        expect(result[0].workgroupName).toBe("wg-1");

                    }
                );

                it(
                    "returns empty when no workgroups",
                    async () => {

                        rsMock.on(ListWorkgroupsCommand).resolves({});

                        const service = new RedshiftServerlessService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getWorkgroups();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

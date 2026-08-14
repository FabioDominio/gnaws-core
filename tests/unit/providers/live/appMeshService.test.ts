import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {AppMeshClient, ListMeshesCommand, ListVirtualNodesCommand, ListVirtualServicesCommand} from "@aws-sdk/client-app-mesh";
import {AppMeshService} from "../../../../src/providers/live/appMeshService.js";

const meshMock = mockClient(AppMeshClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    meshMock.reset();

});

describe(
    "AppMeshService",
    () => {

        describe(
            "getMeshes",
            () => {

                it(
                    "returns meshes",
                    async () => {

                        meshMock.on(ListMeshesCommand).resolves({
                            "meshes": [
                                {"meshName": "mesh-1",
                                    "arn": "arn:aws:appmesh:us-east-1:123:mesh/mesh-1",
                                    "meshOwner": "123",
                                    "resourceOwner": "123",
                                    "version": 1,
                                    "createdAt": new Date(),
                                    "lastUpdatedAt": new Date()},
                                {"meshName": "mesh-2",
                                    "arn": "arn:aws:appmesh:us-east-1:123:mesh/mesh-2",
                                    "meshOwner": "123",
                                    "resourceOwner": "123",
                                    "version": 1,
                                    "createdAt": new Date(),
                                    "lastUpdatedAt": new Date()}
                            ]
                        });

                        const service = new AppMeshService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getMeshes();

                        expect(result).toHaveLength(2);
                        expect(result[0].meshName).toBe("mesh-1");

                    }
                );

                it(
                    "returns empty when no meshes",
                    async () => {

                        meshMock.on(ListMeshesCommand).resolves({});

                        const service = new AppMeshService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getMeshes();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getVirtualNodes",
            () => {

                it(
                    "returns virtual nodes for a mesh",
                    async () => {

                        meshMock.on(ListVirtualNodesCommand).resolves({
                            "virtualNodes": [
                                {"meshName": "mesh-1",
                                    "virtualNodeName": "node-1",
                                    "arn": "arn:aws:appmesh:us-east-1:123:mesh/mesh-1/virtualNode/node-1",
                                    "meshOwner": "123",
                                    "resourceOwner": "123",
                                    "version": 1,
                                    "createdAt": new Date(),
                                    "lastUpdatedAt": new Date()},
                                {"meshName": "mesh-1",
                                    "virtualNodeName": "node-2",
                                    "arn": "arn:aws:appmesh:us-east-1:123:mesh/mesh-1/virtualNode/node-2",
                                    "meshOwner": "123",
                                    "resourceOwner": "123",
                                    "version": 1,
                                    "createdAt": new Date(),
                                    "lastUpdatedAt": new Date()}
                            ]
                        });

                        const service = new AppMeshService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getVirtualNodes("mesh-1");

                        expect(result).toHaveLength(2);
                        expect(result[0].virtualNodeName).toBe("node-1");

                    }
                );

                it(
                    "returns empty when no virtual nodes",
                    async () => {

                        meshMock.on(ListVirtualNodesCommand).resolves({});

                        const service = new AppMeshService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getVirtualNodes("mesh-1");

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getVirtualServices",
            () => {

                it(
                    "returns virtual services for a mesh",
                    async () => {

                        meshMock.on(ListVirtualServicesCommand).resolves({
                            "virtualServices": [
                                {"meshName": "mesh-1",
                                    "virtualServiceName": "svc-1",
                                    "arn": "arn:aws:appmesh:us-east-1:123:mesh/mesh-1/virtualService/svc-1",
                                    "meshOwner": "123",
                                    "resourceOwner": "123",
                                    "version": 1,
                                    "createdAt": new Date(),
                                    "lastUpdatedAt": new Date()}
                            ]
                        });

                        const service = new AppMeshService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getVirtualServices("mesh-1");

                        expect(result).toHaveLength(1);
                        expect(result[0].virtualServiceName).toBe("svc-1");

                    }
                );

                it(
                    "returns empty when no virtual services",
                    async () => {

                        meshMock.on(ListVirtualServicesCommand).resolves({});

                        const service = new AppMeshService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getVirtualServices("mesh-1");

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

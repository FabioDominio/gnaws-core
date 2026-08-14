import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {EMRClient, ListClustersCommand, ListInstanceFleetsCommand, ListInstanceGroupsCommand, ListSecurityConfigurationsCommand} from "@aws-sdk/client-emr";
import {EmrService} from "../../../../src/providers/live/emrService.js";

const emrMock = mockClient(EMRClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    emrMock.reset();

});

describe(
    "EmrService",
    () => {

        describe(
            "getClusters",
            () => {

                it(
                    "returns clusters",
                    async () => {

                        emrMock.on(ListClustersCommand).resolves({
                            "Clusters": [
                                {"Id": "j-123",
                                    "Name": "cluster-1",
                                    "Status": {"State": "RUNNING"}},
                                {"Id": "j-456",
                                    "Name": "cluster-2",
                                    "Status": {"State": "WAITING"}}
                            ]
                        });

                        const service = new EmrService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getClusters();

                        expect(result).toHaveLength(2);
                        expect(result[0].Id).toBe("j-123");

                    }
                );

                it(
                    "returns empty when no clusters",
                    async () => {

                        emrMock.on(ListClustersCommand).resolves({});

                        const service = new EmrService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getClusters();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getInstanceFleets",
            () => {

                it(
                    "returns instance fleets for a cluster",
                    async () => {

                        emrMock.on(ListInstanceFleetsCommand).resolves({
                            "InstanceFleets": [
                                {"Id": "if-1",
                                    "Name": "MASTER",
                                    "InstanceFleetType": "MASTER",
                                    "TargetOnDemandCapacity": 1},
                                {"Id": "if-2",
                                    "Name": "CORE",
                                    "InstanceFleetType": "CORE",
                                    "TargetOnDemandCapacity": 2}
                            ]
                        });

                        const service = new EmrService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getInstanceFleets("j-123");

                        expect(result).toHaveLength(2);
                        expect(result[0].InstanceFleetType).toBe("MASTER");

                    }
                );

                it(
                    "returns empty when no instance fleets",
                    async () => {

                        emrMock.on(ListInstanceFleetsCommand).resolves({});

                        const service = new EmrService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getInstanceFleets("j-123");

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getInstanceGroups",
            () => {

                it(
                    "returns instance groups for a cluster",
                    async () => {

                        emrMock.on(ListInstanceGroupsCommand).resolves({
                            "InstanceGroups": [
                                {"Id": "ig-1",
                                    "Name": "Master",
                                    "InstanceGroupType": "MASTER",
                                    "InstanceType": "m5.xlarge",
                                    "RequestedInstanceCount": 1},
                                {"Id": "ig-2",
                                    "Name": "Core",
                                    "InstanceGroupType": "CORE",
                                    "InstanceType": "m5.xlarge",
                                    "RequestedInstanceCount": 3}
                            ]
                        });

                        const service = new EmrService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getInstanceGroups("j-123");

                        expect(result).toHaveLength(2);
                        expect(result[0].InstanceGroupType).toBe("MASTER");

                    }
                );

                it(
                    "returns empty when no instance groups",
                    async () => {

                        emrMock.on(ListInstanceGroupsCommand).resolves({});

                        const service = new EmrService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getInstanceGroups("j-123");

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getSecurityConfigurations",
            () => {

                it(
                    "returns security configurations",
                    async () => {

                        emrMock.on(ListSecurityConfigurationsCommand).resolves({
                            "SecurityConfigurations": [
                                {"Name": "sec-config-1",
                                    "CreationDateTime": new Date()},
                                {"Name": "sec-config-2",
                                    "CreationDateTime": new Date()}
                            ]
                        });

                        const service = new EmrService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getSecurityConfigurations();

                        expect(result).toHaveLength(2);
                        expect(result[0].Name).toBe("sec-config-1");

                    }
                );

                it(
                    "returns empty when no security configurations",
                    async () => {

                        emrMock.on(ListSecurityConfigurationsCommand).resolves({});

                        const service = new EmrService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getSecurityConfigurations();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

    }
);

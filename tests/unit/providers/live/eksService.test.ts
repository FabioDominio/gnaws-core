import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    EKSClient,
    ListClustersCommand,
    DescribeClusterCommand,
    ListNodegroupsCommand,
    DescribeNodegroupCommand,
    ListFargateProfilesCommand,
    DescribeFargateProfileCommand,
    ListAddonsCommand,
    DescribeAddonCommand,
    ListPodIdentityAssociationsCommand,
    DescribePodIdentityAssociationCommand,
    ListAccessEntriesCommand,
    DescribeAccessEntryCommand,
    ListAssociatedAccessPoliciesCommand
} from "@aws-sdk/client-eks";
import {EksService} from "../../../../src/providers/live/eksService.js";

const eksMock = mockClient(EKSClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    eksMock.reset();

});

describe(
    "EksService",
    () => {

        describe(
            "getClusters",
            () => {

                it(
                    "lists and describes clusters",
                    async () => {

                        eksMock.on(ListClustersCommand).resolves({"clusters": [
                            "cluster-1",
                            "cluster-2"
                        ]});
                        eksMock.on(
                            DescribeClusterCommand,
                            {"name": "cluster-1"}
                        ).resolves({
                            "cluster": {"name": "cluster-1",
                                "arn": "arn:eks:cluster-1"}
                        });
                        eksMock.on(
                            DescribeClusterCommand,
                            {"name": "cluster-2"}
                        ).resolves({
                            "cluster": {"name": "cluster-2",
                                "arn": "arn:eks:cluster-2"}
                        });

                        const service = new EksService(
                            creds,
                            "us-east-1"
                        );
                        const clusters = await service.getClusters();

                        expect(clusters).toHaveLength(2);
                        expect(clusters[0].name).toBe("cluster-1");
                        expect(clusters[1].name).toBe("cluster-2");

                    }
                );

                it(
                    "returns empty array when no clusters",
                    async () => {

                        eksMock.on(ListClustersCommand).resolves({"clusters": undefined});

                        const service = new EksService(
                            creds,
                            "us-east-1"
                        );
                        const clusters = await service.getClusters();

                        expect(clusters).toEqual([]);

                    }
                );

                it(
                    "skips cluster if describe fails",
                    async () => {

                        eksMock.on(ListClustersCommand).resolves({"clusters": [
                            "c-1",
                            "c-2"
                        ]});
                        eksMock.on(
                            DescribeClusterCommand,
                            {"name": "c-1"}
                        ).rejects(new Error("NotFound"));
                        eksMock.on(
                            DescribeClusterCommand,
                            {"name": "c-2"}
                        ).resolves({
                            "cluster": {"name": "c-2",
                                "arn": "arn:eks:c-2"}
                        });

                        const service = new EksService(
                            creds,
                            "us-east-1"
                        );
                        const clusters = await service.getClusters();

                        expect(clusters).toHaveLength(1);
                        expect(clusters[0].name).toBe("c-2");

                    }
                );

                it(
                    "paginates cluster listing",
                    async () => {

                        eksMock.on(ListClustersCommand).
                            resolvesOnce({"clusters": ["c-1"],
                                "nextToken": "tok"}).
                            resolvesOnce({"clusters": ["c-2"]});
                        eksMock.on(
                            DescribeClusterCommand,
                            {"name": "c-1"}
                        ).resolves({"cluster": {"name": "c-1"}});
                        eksMock.on(
                            DescribeClusterCommand,
                            {"name": "c-2"}
                        ).resolves({"cluster": {"name": "c-2"}});

                        const service = new EksService(
                            creds,
                            "us-east-1"
                        );
                        const clusters = await service.getClusters();

                        expect(clusters).toHaveLength(2);

                    }
                );

            }
        );

        describe(
            "getNodegroups",
            () => {

                it(
                    "lists and describes nodegroups for a cluster",
                    async () => {

                        eksMock.on(ListNodegroupsCommand).resolves({"nodegroups": [
                            "ng-1",
                            "ng-2"
                        ]});
                        eksMock.on(
                            DescribeNodegroupCommand,
                            {"clusterName": "my-cluster",
                                "nodegroupName": "ng-1"}
                        ).resolves({
                            "nodegroup": {"nodegroupName": "ng-1",
                                "clusterName": "my-cluster"}
                        });
                        eksMock.on(
                            DescribeNodegroupCommand,
                            {"clusterName": "my-cluster",
                                "nodegroupName": "ng-2"}
                        ).resolves({
                            "nodegroup": {"nodegroupName": "ng-2",
                                "clusterName": "my-cluster"}
                        });

                        const service = new EksService(
                            creds,
                            "us-east-1"
                        );
                        const nodegroups = await service.getNodegroups("my-cluster");

                        expect(nodegroups).toHaveLength(2);
                        expect(nodegroups[0].nodegroupName).toBe("ng-1");

                    }
                );

                it(
                    "returns empty array when no nodegroups",
                    async () => {

                        eksMock.on(ListNodegroupsCommand).resolves({"nodegroups": undefined});

                        const service = new EksService(
                            creds,
                            "us-east-1"
                        );
                        const nodegroups = await service.getNodegroups("my-cluster");

                        expect(nodegroups).toEqual([]);

                    }
                );

                it(
                    "skips nodegroup if describe fails",
                    async () => {

                        eksMock.on(ListNodegroupsCommand).resolves({"nodegroups": ["ng-1"]});
                        eksMock.on(DescribeNodegroupCommand).rejects(new Error("NotFound"));

                        const service = new EksService(
                            creds,
                            "us-east-1"
                        );
                        const nodegroups = await service.getNodegroups("my-cluster");

                        expect(nodegroups).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getFargateProfiles",
            () => {

                it(
                    "lists and describes fargate profiles",
                    async () => {

                        eksMock.on(ListFargateProfilesCommand).resolves({"fargateProfileNames": ["fp-1"]});
                        eksMock.on(DescribeFargateProfileCommand).resolves({
                            "fargateProfile": {"fargateProfileName": "fp-1",
                                "clusterName": "my-cluster"}
                        });

                        const service = new EksService(
                            creds,
                            "us-east-1"
                        );
                        const profiles = await service.getFargateProfiles("my-cluster");

                        expect(profiles).toHaveLength(1);
                        expect(profiles[0].fargateProfileName).toBe("fp-1");

                    }
                );

                it(
                    "returns empty array when no fargate profiles",
                    async () => {

                        eksMock.on(ListFargateProfilesCommand).resolves({"fargateProfileNames": undefined});

                        const service = new EksService(
                            creds,
                            "us-east-1"
                        );
                        const profiles = await service.getFargateProfiles("my-cluster");

                        expect(profiles).toEqual([]);

                    }
                );

                it(
                    "skips profile if describe fails",
                    async () => {

                        eksMock.on(ListFargateProfilesCommand).resolves({"fargateProfileNames": ["fp-1"]});
                        eksMock.on(DescribeFargateProfileCommand).rejects(new Error("NotFound"));

                        const service = new EksService(
                            creds,
                            "us-east-1"
                        );
                        const profiles = await service.getFargateProfiles("my-cluster");

                        expect(profiles).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getAddons",
            () => {

                it(
                    "lists and describes addons",
                    async () => {

                        eksMock.on(ListAddonsCommand).resolves({"addons": [
                            "vpc-cni",
                            "coredns"
                        ]});
                        eksMock.on(
                            DescribeAddonCommand,
                            {"clusterName": "my-cluster",
                                "addonName": "vpc-cni"}
                        ).resolves({
                            "addon": {"addonName": "vpc-cni",
                                "clusterName": "my-cluster"}
                        });
                        eksMock.on(
                            DescribeAddonCommand,
                            {"clusterName": "my-cluster",
                                "addonName": "coredns"}
                        ).resolves({
                            "addon": {"addonName": "coredns",
                                "clusterName": "my-cluster"}
                        });

                        const service = new EksService(
                            creds,
                            "us-east-1"
                        );
                        const addons = await service.getAddons("my-cluster");

                        expect(addons).toHaveLength(2);
                        expect(addons[0].addonName).toBe("vpc-cni");
                        expect(addons[1].addonName).toBe("coredns");

                    }
                );

                it(
                    "returns empty array when no addons",
                    async () => {

                        eksMock.on(ListAddonsCommand).resolves({"addons": undefined});

                        const service = new EksService(
                            creds,
                            "us-east-1"
                        );
                        const addons = await service.getAddons("my-cluster");

                        expect(addons).toEqual([]);

                    }
                );

                it(
                    "skips addon if describe fails",
                    async () => {

                        eksMock.on(ListAddonsCommand).resolves({"addons": ["vpc-cni"]});
                        eksMock.on(DescribeAddonCommand).rejects(new Error("NotFound"));

                        const service = new EksService(
                            creds,
                            "us-east-1"
                        );
                        const addons = await service.getAddons("my-cluster");

                        expect(addons).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getPodIdentityAssociations",
            () => {

                it(
                    "lists and describes pod identity associations",
                    async () => {

                        eksMock.on(ListPodIdentityAssociationsCommand).resolves({
                            "associations": [
                                {"associationId": "assoc-1",
                                    "clusterName": "my-cluster",
                                    "namespace": "default",
                                    "serviceAccount": "sa-1"},
                                {"associationId": "assoc-2",
                                    "clusterName": "my-cluster",
                                    "namespace": "kube-system",
                                    "serviceAccount": "sa-2"}
                            ]
                        });
                        eksMock.on(
                            DescribePodIdentityAssociationCommand,
                            {"clusterName": "my-cluster",
                                "associationId": "assoc-1"}
                        ).resolves({
                            "association": {
                                "associationArn": "arn:aws:eks:us-east-1:123:podidentityassociation/my-cluster/assoc-1",
                                "clusterName": "my-cluster",
                                "namespace": "default",
                                "serviceAccount": "sa-1",
                                "roleArn": "arn:aws:iam::123:role/role-1"
                            }
                        });
                        eksMock.on(
                            DescribePodIdentityAssociationCommand,
                            {"clusterName": "my-cluster",
                                "associationId": "assoc-2"}
                        ).resolves({
                            "association": {
                                "associationArn": "arn:aws:eks:us-east-1:123:podidentityassociation/my-cluster/assoc-2",
                                "clusterName": "my-cluster",
                                "namespace": "kube-system",
                                "serviceAccount": "sa-2",
                                "roleArn": "arn:aws:iam::123:role/role-2"
                            }
                        });

                        const service = new EksService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getPodIdentityAssociations("my-cluster");

                        expect(result).toHaveLength(2);
                        expect(result[0].namespace).toBe("default");
                        expect(result[0].serviceAccount).toBe("sa-1");
                        expect(result[1].namespace).toBe("kube-system");

                    }
                );

                it(
                    "returns empty array when no associations",
                    async () => {

                        eksMock.on(ListPodIdentityAssociationsCommand).resolves({"associations": undefined});

                        const service = new EksService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getPodIdentityAssociations("my-cluster");

                        expect(result).toEqual([]);

                    }
                );

                it(
                    "skips association if describe fails",
                    async () => {

                        eksMock.on(ListPodIdentityAssociationsCommand).resolves({
                            "associations": [
                                {"associationId": "assoc-1",
                                    "clusterName": "my-cluster"}
                            ]
                        });
                        eksMock.on(DescribePodIdentityAssociationCommand).rejects(new Error("NotFound"));

                        const service = new EksService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getPodIdentityAssociations("my-cluster");

                        expect(result).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getAccessEntries",
            () => {

                it(
                    "lists and describes access entries",
                    async () => {

                        eksMock.on(ListAccessEntriesCommand).resolves({
                            "accessEntries": [
                                "arn:aws:iam::123:role/admin",
                                "arn:aws:iam::123:role/dev"
                            ]
                        });
                        eksMock.on(
                            DescribeAccessEntryCommand,
                            {"clusterName": "my-cluster",
                                "principalArn": "arn:aws:iam::123:role/admin"}
                        ).resolves({
                            "accessEntry": {"principalArn": "arn:aws:iam::123:role/admin",
                                "clusterName": "my-cluster",
                                "type": "STANDARD"}
                        });
                        eksMock.on(
                            DescribeAccessEntryCommand,
                            {"clusterName": "my-cluster",
                                "principalArn": "arn:aws:iam::123:role/dev"}
                        ).resolves({
                            "accessEntry": {"principalArn": "arn:aws:iam::123:role/dev",
                                "clusterName": "my-cluster",
                                "type": "STANDARD"}
                        });

                        const service = new EksService(
                            creds,
                            "us-east-1"
                        );
                        const entries = await service.getAccessEntries("my-cluster");

                        expect(entries).toHaveLength(2);
                        expect(entries[0].principalArn).toBe("arn:aws:iam::123:role/admin");

                    }
                );

                it(
                    "returns empty array when no access entries",
                    async () => {

                        eksMock.on(ListAccessEntriesCommand).resolves({"accessEntries": undefined});

                        const service = new EksService(
                            creds,
                            "us-east-1"
                        );
                        const entries = await service.getAccessEntries("my-cluster");

                        expect(entries).toEqual([]);

                    }
                );

                it(
                    "skips entry if describe fails",
                    async () => {

                        eksMock.on(ListAccessEntriesCommand).resolves({"accessEntries": ["arn:aws:iam::123:role/admin"]});
                        eksMock.on(DescribeAccessEntryCommand).rejects(new Error("NotFound"));

                        const service = new EksService(
                            creds,
                            "us-east-1"
                        );
                        const entries = await service.getAccessEntries("my-cluster");

                        expect(entries).toEqual([]);

                    }
                );

            }
        );

        describe(
            "getAssociatedAccessPolicies",
            () => {

                it(
                    "returns associated access policies",
                    async () => {

                        eksMock.on(ListAssociatedAccessPoliciesCommand).resolves({
                            "associatedAccessPolicies": [
                                {"policyArn": "arn:aws:eks::aws:cluster-access-policy/AmazonEKSClusterAdminPolicy"},
                                {"policyArn": "arn:aws:eks::aws:cluster-access-policy/AmazonEKSViewPolicy"}
                            ]
                        });

                        const service = new EksService(
                            creds,
                            "us-east-1"
                        );
                        const policies = await service.getAssociatedAccessPolicies(
                            "my-cluster",
                            "arn:aws:iam::123:role/admin"
                        );

                        expect(policies).toHaveLength(2);
                        expect(policies[0].policyArn).toContain("AmazonEKSClusterAdminPolicy");

                    }
                );

                it(
                    "returns empty array when no associated policies",
                    async () => {

                        eksMock.on(ListAssociatedAccessPoliciesCommand).resolves({});

                        const service = new EksService(
                            creds,
                            "us-east-1"
                        );
                        const policies = await service.getAssociatedAccessPolicies(
                            "my-cluster",
                            "arn:aws:iam::123:role/admin"
                        );

                        expect(policies).toEqual([]);

                    }
                );

            }
        );

    }
);

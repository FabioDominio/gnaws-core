import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    ACMClient,
    ListCertificatesCommand,
    ListTagsForCertificateCommand
} from "@aws-sdk/client-acm";
import {AcmService} from "../../../../src/providers/live/acmService.js";

const acmMock = mockClient(ACMClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    acmMock.reset();

});

describe(
    "AcmService",
    () => {

        describe(
            "getCertificates",
            () => {

                it(
                    "returns certificates",
                    async () => {

                        acmMock.on(ListCertificatesCommand).resolves({
                            "CertificateSummaryList": [
                                {"CertificateArn": "arn:aws:acm:us-east-1:123:certificate/abc",
                                    "DomainName": "example.com"},
                                {"CertificateArn": "arn:aws:acm:us-east-1:123:certificate/def",
                                    "DomainName": "test.com"}
                            ]
                        });

                        const service = new AcmService(
                            creds,
                            "us-east-1"
                        );
                        const certs = await service.getCertificates();

                        expect(certs).toHaveLength(2);
                        expect(certs[0].DomainName).toBe("example.com");

                    }
                );

                it(
                    "aggregates across pages",
                    async () => {

                        acmMock.on(ListCertificatesCommand).
                            resolvesOnce({"CertificateSummaryList": [{"CertificateArn": "arn:1"}],
                                "NextToken": "tok"}).
                            resolvesOnce({"CertificateSummaryList": [{"CertificateArn": "arn:2"}]});

                        const service = new AcmService(
                            creds,
                            "us-east-1"
                        );
                        const certs = await service.getCertificates();

                        expect(certs).toHaveLength(2);

                    }
                );

                it(
                    "returns empty when no certificates",
                    async () => {

                        acmMock.on(ListCertificatesCommand).resolves({});

                        const service = new AcmService(
                            creds,
                            "us-east-1"
                        );
                        const certs = await service.getCertificates();

                        expect(certs).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getTagsForCertificate",
            () => {

                it(
                    "returns tags for certificate",
                    async () => {

                        acmMock.on(ListTagsForCertificateCommand).resolves({
                            "Tags": [
                                {"Key": "env",
                                    "Value": "prod"}
                            ]
                        });

                        const service = new AcmService(
                            creds,
                            "us-east-1"
                        );
                        const tags = await service.getTagsForCertificate("arn:aws:acm:us-east-1:123:certificate/abc");

                        expect(tags).toHaveLength(1);
                        expect(tags[0].Key).toBe("env");

                    }
                );

                it(
                    "returns empty array on error",
                    async () => {

                        acmMock.on(ListTagsForCertificateCommand).rejects(new Error("Access Denied"));

                        const service = new AcmService(
                            creds,
                            "us-east-1"
                        );
                        const tags = await service.getTagsForCertificate("arn:aws:acm:us-east-1:123:certificate/abc");

                        expect(tags).toHaveLength(0);

                    }
                );

            }
        );

    }
);

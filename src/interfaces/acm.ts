import type {CertificateSummary, Tag} from "@aws-sdk/client-acm";

export interface Acm {
    getCertificates (): Promise<CertificateSummary[]>;
    getTagsForCertificate (arn: string): Promise<Tag[]>;
}

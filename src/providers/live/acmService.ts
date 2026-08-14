import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type CertificateSummary,
    type Tag,
    ACMClient,
    type ACMClientConfig,
    paginateListCertificates,
    ListTagsForCertificateCommand
} from "@aws-sdk/client-acm";

/*
 *  Available but not yet implemented:
 *  paginateListAcmeAccounts,
 *  paginateListAcmeDomainValidations,
 *  paginateListAcmeEndpoints,
 *  paginateListAcmeExternalAccountBindings,
 *  paginateSearchCertificates,
 */
import type {Acm} from "../../interfaces/acm.js";

export class AcmService implements Acm {

    #client: ACMClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: ACMClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new ACMClient(config);

    }

    async getCertificates (): Promise<CertificateSummary[]> {

        const client = this.#client;
        const certificates: CertificateSummary[] = [];
        for await (const page of paginateListCertificates(
            {client},
            {}
        )) {

            if (page.CertificateSummaryList !== undefined) {

                certificates.push(...page.CertificateSummaryList);

            }

        }
        return certificates;

    }

    async getTagsForCertificate (arn: string): Promise<Tag[]> {

        try {

            const response = await this.#client.send(new ListTagsForCertificateCommand({"CertificateArn": arn}));
            return response.Tags ?? [];

        } catch {

            return [];

        }

    }

}

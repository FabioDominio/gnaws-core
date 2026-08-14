import type {CertificateSummary, Tag} from "@aws-sdk/client-acm";
import type {Acm} from "../../interfaces/acm.js";
import {readCacheFile} from "./cacheReader.js";

export class AcmCacheService implements Acm {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getCertificates (): Promise<CertificateSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "acm_certificates.json"
        );

    }

    async getTagsForCertificate (_arn: string): Promise<Tag[]> {

        return [];

    }

}

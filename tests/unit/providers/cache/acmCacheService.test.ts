import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {AcmCacheService} from "../../../../src/providers/cache/acmCacheService.js";

let tmpDir: string;
beforeEach(() => {

    tmpDir = mkdtempSync(join(
        tmpdir(),
        "gnaws-test-"
    ));

});
afterEach(() => {

    rmSync(
        tmpDir,
        {"recursive": true}
    );

});

describe(
    "AcmCacheService",
    () => {

        it(
            "getCertificates reads acm_certificates.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "acm_certificates.json"
                    ),
                    JSON.stringify([{"CertificateArn": "arn:aws:acm:us-east-1:123:certificate/abc"}])
                );
                const service = new AcmCacheService(tmpDir);
                const result = await service.getCertificates();
                expect(result).toEqual([{"CertificateArn": "arn:aws:acm:us-east-1:123:certificate/abc"}]);

            }
        );

        it(
            "getCertificates returns empty for missing file",
            async () => {

                const service = new AcmCacheService(tmpDir);
                const result = await service.getCertificates();
                expect(result).toEqual([]);

            }
        );

        it(
            "getTagsForCertificate always returns empty",
            async () => {

                const service = new AcmCacheService(tmpDir);
                const result = await service.getTagsForCertificate("arn:aws:acm:us-east-1:123:certificate/abc");
                expect(result).toEqual([]);

            }
        );

    }
);

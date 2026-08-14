import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {ApiGatewayCacheService} from "../../../../src/providers/cache/apiGatewayCacheService.js";

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
    "ApiGatewayCacheService",
    () => {

        it(
            "getRestApis reads apigateway_rest_apis.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "apigateway_rest_apis.json"
                    ),
                    JSON.stringify([{"id": "api1"}])
                );
                const service = new ApiGatewayCacheService(tmpDir);
                expect(await service.getRestApis()).toEqual([{"id": "api1"}]);

            }
        );

        it(
            "getRestApis returns empty for missing file",
            async () => {

                const service = new ApiGatewayCacheService(tmpDir);
                expect(await service.getRestApis()).toEqual([]);

            }
        );

        it(
            "getHttpApis reads apigateway_http_apis.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "apigateway_http_apis.json"
                    ),
                    JSON.stringify([{"ApiId": "http1"}])
                );
                const service = new ApiGatewayCacheService(tmpDir);
                expect(await service.getHttpApis()).toEqual([{"ApiId": "http1"}]);

            }
        );

        it(
            "getHttpApis returns empty for missing file",
            async () => {

                const service = new ApiGatewayCacheService(tmpDir);
                expect(await service.getHttpApis()).toEqual([]);

            }
        );

        it(
            "getVpcLinks reads apigateway_vpc_links.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "apigateway_vpc_links.json"
                    ),
                    JSON.stringify([{"id": "vpclink1"}])
                );
                const service = new ApiGatewayCacheService(tmpDir);
                expect(await service.getVpcLinks()).toEqual([{"id": "vpclink1"}]);

            }
        );

        it(
            "getVpcLinks returns empty for missing file",
            async () => {

                const service = new ApiGatewayCacheService(tmpDir);
                expect(await service.getVpcLinks()).toEqual([]);

            }
        );

        it(
            "getDomainNames reads apigateway_domain_names.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "apigateway_domain_names.json"
                    ),
                    JSON.stringify([{"domainName": "api.example.com"}])
                );
                const service = new ApiGatewayCacheService(tmpDir);
                expect(await service.getDomainNames()).toEqual([{"domainName": "api.example.com"}]);

            }
        );

        it(
            "getDomainNames returns empty for missing file",
            async () => {

                const service = new ApiGatewayCacheService(tmpDir);
                expect(await service.getDomainNames()).toEqual([]);

            }
        );

        it(
            "getUsagePlans reads apigateway_usage_plans.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "apigateway_usage_plans.json"
                    ),
                    JSON.stringify([{"id": "plan1"}])
                );
                const service = new ApiGatewayCacheService(tmpDir);
                expect(await service.getUsagePlans()).toEqual([{"id": "plan1"}]);

            }
        );

        it(
            "getUsagePlans returns empty for missing file",
            async () => {

                const service = new ApiGatewayCacheService(tmpDir);
                expect(await service.getUsagePlans()).toEqual([]);

            }
        );

        it(
            "getHttpVpcLinks always returns empty",
            async () => {

                const service = new ApiGatewayCacheService(tmpDir);
                expect(await service.getHttpVpcLinks()).toEqual([]);

            }
        );

    }
);

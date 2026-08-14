import type {RestApi, VpcLink, DomainName, UsagePlan} from "@aws-sdk/client-api-gateway";
import type {Api, VpcLink as HttpVpcLink} from "@aws-sdk/client-apigatewayv2";
import type {ApiGateway} from "../../interfaces/apigateway.js";
import {readCacheFile} from "./cacheReader.js";

export class ApiGatewayCacheService implements ApiGateway {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getRestApis (): Promise<RestApi[]> {

        return readCacheFile(
            this.#cacheDir,
            "apigateway_rest_apis.json"
        );

    }

    async getHttpApis (): Promise<Api[]> {

        return readCacheFile(
            this.#cacheDir,
            "apigateway_http_apis.json"
        );

    }

    async getVpcLinks (): Promise<VpcLink[]> {

        return readCacheFile(
            this.#cacheDir,
            "apigateway_vpc_links.json"
        );

    }

    async getDomainNames (): Promise<DomainName[]> {

        return readCacheFile(
            this.#cacheDir,
            "apigateway_domain_names.json"
        );

    }

    async getUsagePlans (): Promise<UsagePlan[]> {

        return readCacheFile(
            this.#cacheDir,
            "apigateway_usage_plans.json"
        );

    }

    async getHttpVpcLinks (): Promise<HttpVpcLink[]> {

        return [];

    }

}

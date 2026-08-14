import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type RestApi,
    type VpcLink,
    type DomainName,
    type UsagePlan,
    APIGatewayClient,
    type APIGatewayClientConfig,
    paginateGetRestApis,
    paginateGetVpcLinks,
    paginateGetDomainNames,
    paginateGetUsagePlans
} from "@aws-sdk/client-api-gateway";
import {
    type Api,
    type VpcLink as HttpVpcLink,
    ApiGatewayV2Client,
    type ApiGatewayV2ClientConfig,
    GetApisCommand,
    GetVpcLinksCommand
} from "@aws-sdk/client-apigatewayv2";
import type {ApiGateway} from "../../interfaces/apigateway.js";

export class ApiGatewayService implements ApiGateway {

    #restClient: APIGatewayClient;

    #httpClient: ApiGatewayV2Client;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const restConfig: APIGatewayClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#restClient = new APIGatewayClient(restConfig);

        const httpConfig: ApiGatewayV2ClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#httpClient = new ApiGatewayV2Client(httpConfig);

    }

    async getRestApis (): Promise<RestApi[]> {

        const client = this.#restClient;
        const apis: RestApi[] = [];
        for await (const page of paginateGetRestApis(
            {client},
            {}
        )) {

            if (page.items !== undefined) {

                apis.push(...page.items);

            }

        }
        return apis;

    }

    async getHttpApis (): Promise<Api[]> {

        const apis: Api[] = [];
        let nextToken: string | undefined;
        do {

            const response = await this.#httpClient.send(new GetApisCommand({"NextToken": nextToken}));

            if (response.Items !== undefined) {

                apis.push(...response.Items);

            }

            nextToken = response.NextToken;

        } while (nextToken);
        return apis;

    }

    async getVpcLinks (): Promise<VpcLink[]> {

        const client = this.#restClient;
        const vpcLinks: VpcLink[] = [];
        for await (const page of paginateGetVpcLinks(
            {client},
            {}
        )) {

            if (page.items !== undefined) {

                vpcLinks.push(...page.items);

            }

        }
        return vpcLinks;

    }

    async getDomainNames (): Promise<DomainName[]> {

        const client = this.#restClient;
        const domainNames: DomainName[] = [];
        for await (const page of paginateGetDomainNames(
            {client},
            {}
        )) {

            if (page.items !== undefined) {

                domainNames.push(...page.items);

            }

        }
        return domainNames;

    }

    async getUsagePlans (): Promise<UsagePlan[]> {

        const client = this.#restClient;
        const usagePlans: UsagePlan[] = [];
        for await (const page of paginateGetUsagePlans(
            {client},
            {}
        )) {

            if (page.items !== undefined) {

                usagePlans.push(...page.items);

            }

        }
        return usagePlans;

    }

    async getHttpVpcLinks (): Promise<HttpVpcLink[]> {

        const response = await this.#httpClient.send(new GetVpcLinksCommand({}));
        return response.Items ?? [];

    }

}

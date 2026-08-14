import type {RestApi, VpcLink, DomainName, UsagePlan} from "@aws-sdk/client-api-gateway";
import type {Api, VpcLink as HttpVpcLink} from "@aws-sdk/client-apigatewayv2";

export interface ApiGateway {
    getRestApis (): Promise<RestApi[]>;
    getHttpApis (): Promise<Api[]>;
    getVpcLinks (): Promise<VpcLink[]>;
    getDomainNames (): Promise<DomainName[]>;
    getUsagePlans (): Promise<UsagePlan[]>;
    getHttpVpcLinks (): Promise<HttpVpcLink[]>;
}

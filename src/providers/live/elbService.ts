import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {type LoadBalancerDescription, ElasticLoadBalancingClient, paginateDescribeLoadBalancers} from "@aws-sdk/client-elastic-load-balancing";
import type {Elb} from "../../interfaces/elb.js";

export class ElbService implements Elb {

    #client: ElasticLoadBalancingClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        this.#client = new ElasticLoadBalancingClient({region,
            credentials,
            "maxAttempts": 5,
            logger});

    }

    async getLoadBalancers (): Promise<LoadBalancerDescription[]> {

        const client = this.#client;
        const items: LoadBalancerDescription[] = [];
        for await (const page of paginateDescribeLoadBalancers(
            {client},
            {}
        )) {

            if (page.LoadBalancerDescriptions !== undefined) {

                items.push(...page.LoadBalancerDescriptions);

            }

        }
        return items;

    }

}

import type {LoadBalancerDescription} from "@aws-sdk/client-elastic-load-balancing";

export interface Elb {
    getLoadBalancers (): Promise<LoadBalancerDescription[]>;
}

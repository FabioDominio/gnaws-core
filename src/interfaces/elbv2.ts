import type {LoadBalancer, TargetGroup, Listener, Rule, Certificate, TrustStore, TrustStoreAssociation, TagDescription} from "@aws-sdk/client-elastic-load-balancing-v2";

export interface Elbv2 {
    getLoadBalancers (): Promise<LoadBalancer[]>;
    getTargetGroups (): Promise<TargetGroup[]>;
    getListeners (loadBalancerArn: string): Promise<Listener[]>;
    getRules (listenerArn: string): Promise<Rule[]>;
    getListenerCertificates (listenerArn: string): Promise<Certificate[]>;
    getTrustStores (): Promise<TrustStore[]>;
    getTrustStoreAssociations (trustStoreArn: string): Promise<TrustStoreAssociation[]>;
    getTagsForResources (arns: string[]): Promise<TagDescription[]>;
}

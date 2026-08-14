import type {LoadBalancer, TargetGroup, Listener, Rule, Certificate, TrustStore, TrustStoreAssociation, TagDescription} from "@aws-sdk/client-elastic-load-balancing-v2";
import type {Elbv2} from "../../interfaces/elbv2.js";
import {readCacheFile} from "./cacheReader.js";

export class Elbv2CacheService implements Elbv2 {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getLoadBalancers (): Promise<LoadBalancer[]> {

        return readCacheFile(
            this.#cacheDir,
            "elbv2_load_balancers.json"
        );

    }

    async getTargetGroups (): Promise<TargetGroup[]> {

        return readCacheFile(
            this.#cacheDir,
            "elbv2_target_groups.json"
        );

    }

    async getListeners (_loadBalancerArn: string): Promise<Listener[]> {

        return readCacheFile(
            this.#cacheDir,
            "elbv2_listeners.json"
        );

    }

    async getRules (_listenerArn: string): Promise<Rule[]> {

        return readCacheFile(
            this.#cacheDir,
            "elbv2_rules.json"
        );

    }

    async getListenerCertificates (_listenerArn: string): Promise<Certificate[]> {

        return readCacheFile(
            this.#cacheDir,
            "elbv2_listener_certificates.json"
        );

    }

    async getTrustStores (): Promise<TrustStore[]> {

        return readCacheFile(
            this.#cacheDir,
            "elbv2_trust_stores.json"
        );

    }

    async getTrustStoreAssociations (_trustStoreArn: string): Promise<TrustStoreAssociation[]> {

        return [];

    }

    async getTagsForResources (_arns: string[]): Promise<TagDescription[]> {

        return [];

    }

}

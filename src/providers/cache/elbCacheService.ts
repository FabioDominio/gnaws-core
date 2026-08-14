import type {LoadBalancerDescription} from "@aws-sdk/client-elastic-load-balancing";
import type {Elb} from "../../interfaces/elb.js";
import {readCacheFile} from "./cacheReader.js";

export class ElbCacheService implements Elb {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getLoadBalancers (): Promise<LoadBalancerDescription[]> {

        return readCacheFile(
            this.#cacheDir,
            "elb_load_balancers.json"
        );

    }

}

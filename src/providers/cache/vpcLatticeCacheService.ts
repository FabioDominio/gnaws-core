import type {ServiceNetworkSummary, ServiceSummary, TargetGroupSummary, ServiceNetworkVpcAssociationSummary, ServiceNetworkServiceAssociationSummary} from "@aws-sdk/client-vpc-lattice";
import type {VpcLattice} from "../../interfaces/vpclattice.js";
import {readCacheFile} from "./cacheReader.js";

export class VpcLatticeCacheService implements VpcLattice {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getServiceNetworks (): Promise<ServiceNetworkSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "vpclattice_service_networks.json"
        );

    }

    async getServices (): Promise<ServiceSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "vpclattice_services.json"
        );

    }

    async getTargetGroups (): Promise<TargetGroupSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "vpclattice_target_groups.json"
        );

    }

    async getServiceNetworkVpcAssociations (_serviceNetworkIdentifier: string): Promise<ServiceNetworkVpcAssociationSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "vpclattice_vpc_associations.json"
        );

    }

    async getServiceNetworkServiceAssociations (_serviceNetworkIdentifier: string): Promise<ServiceNetworkServiceAssociationSummary[]> {

        return readCacheFile(
            this.#cacheDir,
            "vpclattice_service_associations.json"
        );

    }

}

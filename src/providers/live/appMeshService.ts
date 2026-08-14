import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {type MeshRef, type VirtualNodeRef, type VirtualServiceRef, AppMeshClient, paginateListMeshes, paginateListVirtualNodes, paginateListVirtualServices} from "@aws-sdk/client-app-mesh";
import type {AppMesh} from "../../interfaces/appmesh.js";

export class AppMeshService implements AppMesh {

    #client: AppMeshClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        this.#client = new AppMeshClient({region,
            credentials,
            "maxAttempts": 5,
            logger});

    }

    async getMeshes (): Promise<MeshRef[]> {

        const client = this.#client; const items: MeshRef[] = [];
        for await (const page of paginateListMeshes(
            {client},
            {}
        )) {

            if (page.meshes) items.push(...page.meshes);

        }
        return items;

    }

    async getVirtualNodes (meshName: string): Promise<VirtualNodeRef[]> {

        const client = this.#client; const items: VirtualNodeRef[] = [];
        for await (const page of paginateListVirtualNodes(
            {client},
            {meshName}
        )) {

            if (page.virtualNodes) items.push(...page.virtualNodes);

        }
        return items;

    }

    async getVirtualServices (meshName: string): Promise<VirtualServiceRef[]> {

        const client = this.#client; const items: VirtualServiceRef[] = [];
        for await (const page of paginateListVirtualServices(
            {client},
            {meshName}
        )) {

            if (page.virtualServices) items.push(...page.virtualServices);

        }
        return items;

    }

}

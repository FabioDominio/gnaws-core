import type {MeshRef, VirtualNodeRef, VirtualServiceRef} from "@aws-sdk/client-app-mesh";
import type {AppMesh} from "../../interfaces/appmesh.js";
import {readCacheFile} from "./cacheReader.js";

export class AppMeshCacheService implements AppMesh {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getMeshes (): Promise<MeshRef[]> {

        return readCacheFile(
            this.#cacheDir,
            "appmesh_meshes.json"
        );

    }

    async getVirtualNodes (_meshName: string): Promise<VirtualNodeRef[]> {

        return readCacheFile(
            this.#cacheDir,
            "appmesh_virtual_nodes.json"
        );

    }

    async getVirtualServices (_meshName: string): Promise<VirtualServiceRef[]> {

        return readCacheFile(
            this.#cacheDir,
            "appmesh_virtual_services.json"
        );

    }

}

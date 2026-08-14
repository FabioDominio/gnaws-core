import type {MeshRef, VirtualNodeRef, VirtualServiceRef} from "@aws-sdk/client-app-mesh";

export interface AppMesh {
    getMeshes (): Promise<MeshRef[]>;
    getVirtualNodes (meshName: string): Promise<VirtualNodeRef[]>;
    getVirtualServices (meshName: string): Promise<VirtualServiceRef[]>;
}

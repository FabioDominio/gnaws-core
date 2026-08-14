import type {Accelerator, Listener, EndpointGroup} from "@aws-sdk/client-global-accelerator";

export interface GlobalAcceleratorService {
    getAccelerators (): Promise<Accelerator[]>;
    getListeners (acceleratorArn: string): Promise<Listener[]>;
    getEndpointGroups (listenerArn: string): Promise<EndpointGroup[]>;
}

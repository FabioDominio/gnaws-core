import type {NamespaceSummary as CloudMapNamespace, Service as CloudMapService, InstanceSummary} from "@aws-sdk/client-servicediscovery";

export interface ServiceDiscovery {
    getNamespaces (): Promise<CloudMapNamespace[]>;
    getServices (): Promise<CloudMapService[]>;
    getInstances (serviceId: string): Promise<InstanceSummary[]>;
}

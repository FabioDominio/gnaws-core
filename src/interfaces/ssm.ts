import type {ParameterMetadata, InstanceInformation, MaintenanceWindowIdentity, DocumentIdentifier, Association, PatchBaselineIdentity} from "@aws-sdk/client-ssm";

export interface Ssm {
    getParameters (): Promise<ParameterMetadata[]>;
    getManagedInstances (): Promise<InstanceInformation[]>;
    getMaintenanceWindows (): Promise<MaintenanceWindowIdentity[]>;
    getDocuments (): Promise<DocumentIdentifier[]>;
    getAssociations (): Promise<Association[]>;
    getPatchBaselines (): Promise<PatchBaselineIdentity[]>;
}

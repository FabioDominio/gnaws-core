import type {ParameterMetadata, InstanceInformation, MaintenanceWindowIdentity, DocumentIdentifier, Association, PatchBaselineIdentity} from "@aws-sdk/client-ssm";
import type {Ssm} from "../../interfaces/ssm.js";
import {readCacheFile} from "./cacheReader.js";

export class SsmCacheService implements Ssm {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getParameters (): Promise<ParameterMetadata[]> {

        return readCacheFile(
            this.#cacheDir,
            "ssm_parameters.json"
        );

    }

    async getManagedInstances (): Promise<InstanceInformation[]> {

        return readCacheFile(
            this.#cacheDir,
            "ssm_managed_instances.json"
        );

    }

    async getMaintenanceWindows (): Promise<MaintenanceWindowIdentity[]> {

        return readCacheFile(
            this.#cacheDir,
            "ssm_maintenance_windows.json"
        );

    }

    async getDocuments (): Promise<DocumentIdentifier[]> {

        return readCacheFile(
            this.#cacheDir,
            "ssm_documents.json"
        );

    }

    async getAssociations (): Promise<Association[]> {

        return readCacheFile(
            this.#cacheDir,
            "ssm_associations.json"
        );

    }

    async getPatchBaselines (): Promise<PatchBaselineIdentity[]> {

        return readCacheFile(
            this.#cacheDir,
            "ssm_patch_baselines.json"
        );

    }

}

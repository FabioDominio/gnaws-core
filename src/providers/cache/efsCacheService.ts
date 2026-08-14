import type {AccessPointDescription, FileSystemDescription, MountTargetDescription} from "@aws-sdk/client-efs";
import type {Efs} from "../../interfaces/efs.js";
import {readCacheFile} from "./cacheReader.js";

export class EfsCacheService implements Efs {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getFileSystems (): Promise<FileSystemDescription[]> {

        return readCacheFile(
            this.#cacheDir,
            "efs_file_systems.json"
        );

    }

    async getMountTargets (_fileSystemId: string): Promise<MountTargetDescription[]> {

        return [];

    }

    async getAccessPoints (): Promise<AccessPointDescription[]> {

        return readCacheFile(
            this.#cacheDir,
            "efs_access_points.json"
        );

    }

}

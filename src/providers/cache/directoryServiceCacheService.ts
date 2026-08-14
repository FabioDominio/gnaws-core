import type {DirectoryDescription} from "@aws-sdk/client-directory-service";
import type {DirectoryService} from "../../interfaces/directoryservice.js";
import {readCacheFile} from "./cacheReader.js";

export class DirectoryCacheServiceCacheService implements DirectoryService {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getDirectories (): Promise<DirectoryDescription[]> {

        return readCacheFile(
            this.#cacheDir,
            "directoryservice_directories.json"
        );

    }

}

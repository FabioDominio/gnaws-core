import type {FileSystem} from "@aws-sdk/client-fsx";
import type {Fsx} from "../../interfaces/fsx.js";
import {readCacheFile} from "./cacheReader.js";

export class FsxCacheService implements Fsx {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getFileSystems (): Promise<FileSystem[]> {

        return readCacheFile(
            this.#cacheDir,
            "fsx_file_systems.json"
        );

    }

}

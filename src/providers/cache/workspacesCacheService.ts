import type {Workspace, WorkspaceDirectory} from "@aws-sdk/client-workspaces";
import type {WorkSpaces} from "../../interfaces/workspaces.js";
import {readCacheFile} from "./cacheReader.js";

export class WorkspacesCacheService implements WorkSpaces {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getWorkspaces (): Promise<Workspace[]> {

        return readCacheFile(
            this.#cacheDir,
            "workspaces_workspaces.json"
        );

    }

    async getDirectories (): Promise<WorkspaceDirectory[]> {

        return readCacheFile(
            this.#cacheDir,
            "workspaces_directories.json"
        );

    }

}

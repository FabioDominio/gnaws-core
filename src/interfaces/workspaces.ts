import type {Workspace, WorkspaceDirectory} from "@aws-sdk/client-workspaces";

export interface WorkSpaces {
    getWorkspaces (): Promise<Workspace[]>;
    getDirectories (): Promise<WorkspaceDirectory[]>;
}

import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {type Workspace, type WorkspaceDirectory, WorkSpacesClient, paginateDescribeWorkspaces, paginateDescribeWorkspaceDirectories} from "@aws-sdk/client-workspaces";
import type {WorkSpaces} from "../../interfaces/workspaces.js";

export class WorkspacesService implements WorkSpaces {

    #client: WorkSpacesClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        this.#client = new WorkSpacesClient({region,
            credentials,
            "maxAttempts": 5,
            logger});

    }

    async getWorkspaces (): Promise<Workspace[]> {

        const client = this.#client; const items: Workspace[] = [];
        for await (const page of paginateDescribeWorkspaces(
            {client},
            {}
        )) {

            if (page.Workspaces) items.push(...page.Workspaces);

        }
        return items;

    }

    async getDirectories (): Promise<WorkspaceDirectory[]> {

        const client = this.#client; const items: WorkspaceDirectory[] = [];
        for await (const page of paginateDescribeWorkspaceDirectories(
            {client},
            {}
        )) {

            if (page.Directories) items.push(...page.Directories);

        }
        return items;

    }

}

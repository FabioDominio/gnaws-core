import type {DirectoryDescription} from "@aws-sdk/client-directory-service";

export interface DirectoryService {
    getDirectories (): Promise<DirectoryDescription[]>;
}

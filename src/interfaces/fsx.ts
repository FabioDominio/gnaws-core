import type {FileSystem} from "@aws-sdk/client-fsx";

export interface Fsx {
    getFileSystems (): Promise<FileSystem[]>;
}

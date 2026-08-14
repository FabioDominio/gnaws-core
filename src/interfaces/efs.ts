import type {AccessPointDescription, FileSystemDescription, MountTargetDescription} from "@aws-sdk/client-efs";

export interface Efs {
    getFileSystems (): Promise<FileSystemDescription[]>;
    getMountTargets (fileSystemId: string): Promise<MountTargetDescription[]>;
    getAccessPoints (): Promise<AccessPointDescription[]>;
}

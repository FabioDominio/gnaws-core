import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type AccessPointDescription,
    type FileSystemDescription,
    type MountTargetDescription,
    EFSClient,
    type EFSClientConfig,
    paginateDescribeAccessPoints,
    paginateDescribeFileSystems,
    paginateDescribeMountTargets
} from "@aws-sdk/client-efs";
import type {Efs} from "../../interfaces/efs.js";

export class EfsService implements Efs {

    #client: EFSClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: EFSClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new EFSClient(config);

    }

    async getFileSystems (): Promise<FileSystemDescription[]> {

        const client = this.#client;
        const fileSystems: FileSystemDescription[] = [];
        for await (const page of paginateDescribeFileSystems(
            {client},
            {}
        )) {

            if (page.FileSystems !== undefined) {

                fileSystems.push(...page.FileSystems);

            }

        }
        return fileSystems;

    }

    async getMountTargets (fileSystemId: string): Promise<MountTargetDescription[]> {

        const client = this.#client;
        const mountTargets: MountTargetDescription[] = [];
        for await (const page of paginateDescribeMountTargets(
            {client},
            {"FileSystemId": fileSystemId}
        )) {

            if (page.MountTargets !== undefined) {

                mountTargets.push(...page.MountTargets);

            }

        }
        return mountTargets;

    }

    async getAccessPoints (): Promise<AccessPointDescription[]> {

        const client = this.#client;
        const accessPoints: AccessPointDescription[] = [];
        for await (const page of paginateDescribeAccessPoints(
            {client},
            {}
        )) {

            if (page.AccessPoints !== undefined) {

                accessPoints.push(...page.AccessPoints);

            }

        }
        return accessPoints;

    }

}

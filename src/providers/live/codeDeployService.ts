import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {type DeploymentGroupInfo, CodeDeployClient, paginateListApplications, paginateListDeploymentGroups, BatchGetDeploymentGroupsCommand} from "@aws-sdk/client-codedeploy";
import type {CodeDeploy} from "../../interfaces/codedeploy.js";
export class CodeDeployService implements CodeDeploy {

    #client: CodeDeployClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        this.#client = new CodeDeployClient({region,
            credentials,
            "maxAttempts": 5,
            logger});

    }

    async getDeploymentGroups (): Promise<DeploymentGroupInfo[]> {

        const client = this.#client;
        const appNames: string[] = [];
        for await (const page of paginateListApplications(
            {client},
            {}
        )) {

            if (page.applications) appNames.push(...page.applications);

        }
        const allGroups: DeploymentGroupInfo[] = [];
        for (const appName of appNames) {

            const groupNames: string[] = [];
            for await (const page of paginateListDeploymentGroups(
                {client},
                {"applicationName": appName}
            )) {

                if (page.deploymentGroups) groupNames.push(...page.deploymentGroups);

            }
            if (groupNames.length > 0) {

                try {

                    const r = await client.send(new BatchGetDeploymentGroupsCommand({"applicationName": appName,
                        "deploymentGroupNames": groupNames}));
                    if (r.deploymentGroupsInfo) allGroups.push(...r.deploymentGroupsInfo);

                } catch { /* error */ }

            }

        }
        return allGroups;

    }

}

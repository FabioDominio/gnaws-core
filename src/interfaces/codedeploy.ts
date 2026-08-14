import type {DeploymentGroupInfo} from "@aws-sdk/client-codedeploy";
export interface CodeDeploy {
    getDeploymentGroups (): Promise<DeploymentGroupInfo[]>;
}

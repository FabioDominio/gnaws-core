import type {ApplicationDescription, EnvironmentDescription} from "@aws-sdk/client-elastic-beanstalk";

export interface ElasticBeanstalk {
    getApplications (): Promise<ApplicationDescription[]>;
    getEnvironments (): Promise<EnvironmentDescription[]>;
}

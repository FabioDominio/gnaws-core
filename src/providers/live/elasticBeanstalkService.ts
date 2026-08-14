import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type ApplicationDescription,
    type EnvironmentDescription,
    ElasticBeanstalkClient,
    type ElasticBeanstalkClientConfig,
    DescribeApplicationsCommand,
    DescribeEnvironmentsCommand
} from "@aws-sdk/client-elastic-beanstalk";
import type {ElasticBeanstalk} from "../../interfaces/elasticbeanstalk.js";

export class ElasticBeanstalkService implements ElasticBeanstalk {

    #client: ElasticBeanstalkClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: ElasticBeanstalkClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new ElasticBeanstalkClient(config);

    }

    async getApplications (): Promise<ApplicationDescription[]> {

        const response = await this.#client.send(new DescribeApplicationsCommand({}));

        return response.Applications ?? [];

    }

    async getEnvironments (): Promise<EnvironmentDescription[]> {

        const response = await this.#client.send(new DescribeEnvironmentsCommand({}));

        return response.Environments ?? [];

    }

}

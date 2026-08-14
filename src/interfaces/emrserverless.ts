import type {ApplicationSummary} from "@aws-sdk/client-emr-serverless";

export interface EmrServerless {
    getApplications (): Promise<ApplicationSummary[]>;
}

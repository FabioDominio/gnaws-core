import type {Namespace, Workgroup} from "@aws-sdk/client-redshift-serverless";

export interface RedshiftServerless {
    getNamespaces (): Promise<Namespace[]>;
    getWorkgroups (): Promise<Workgroup[]>;
}

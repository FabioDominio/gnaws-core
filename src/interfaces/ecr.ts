import type {Repository} from "@aws-sdk/client-ecr";

export interface Ecr {
    getRepositories (): Promise<Repository[]>;
}

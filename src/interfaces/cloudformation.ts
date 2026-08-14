import type {StackSummary, StackResourceSummary, Export, StackSetSummary} from "@aws-sdk/client-cloudformation";

export interface StackResourcesMap {
    [stackId: string]: StackResourceSummary[];
}

export interface CloudFormation {
    getStacks (): Promise<StackSummary[]>;
    getStackResources (stackIds: string[]): Promise<StackResourcesMap>;
    getExports (): Promise<Export[]>;
    getStackSets (): Promise<StackSetSummary[]>;
}

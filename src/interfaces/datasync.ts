import type {AgentListEntry, LocationListEntry, DescribeTaskResponse} from "@aws-sdk/client-datasync";

export interface DataSync {
    getAgents (): Promise<AgentListEntry[]>;
    getLocations (): Promise<LocationListEntry[]>;
    getTasks (): Promise<DescribeTaskResponse[]>;
}


export interface StateMachineInfo {
    "stateMachineArn": string;
    "name": string;
    "type": string;
    "roleArn"?: string;
}

export interface Sfn {
    getStateMachines (): Promise<StateMachineInfo[]>;
}

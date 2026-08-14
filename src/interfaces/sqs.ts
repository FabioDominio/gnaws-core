export interface QueueInfo {
    "queueUrl": string;
    "queueArn"?: string;
    "queueName"?: string;
    "tags"?: Record<string, string>;
}

export interface Sqs {
    getQueues (): Promise<QueueInfo[]>;
    getDeadLetterSourceQueues (queueUrl: string): Promise<string[]>;
}

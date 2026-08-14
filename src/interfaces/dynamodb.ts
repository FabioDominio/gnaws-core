import type {TableDescription} from "@aws-sdk/client-dynamodb";

export interface DynamoDB {
    getTables (): Promise<TableDescription[]>;
}

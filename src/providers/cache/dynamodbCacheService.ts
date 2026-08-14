import type {TableDescription} from "@aws-sdk/client-dynamodb";
import type {DynamoDB} from "../../interfaces/dynamodb.js";
import {readCacheFile} from "./cacheReader.js";

export class DynamoDBCacheService implements DynamoDB {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getTables (): Promise<TableDescription[]> {

        return readCacheFile(
            this.#cacheDir,
            "dynamodb_tables.json"
        );

    }

}

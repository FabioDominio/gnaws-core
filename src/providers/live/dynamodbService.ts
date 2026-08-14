import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type TableDescription,
    DynamoDBClient,
    type DynamoDBClientConfig,
    paginateListTables,
    DescribeTableCommand
} from "@aws-sdk/client-dynamodb";
import type {DynamoDB} from "../../interfaces/dynamodb.js";

export class DynamoDBService implements DynamoDB {

    #client: DynamoDBClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: DynamoDBClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new DynamoDBClient(config);

    }

    async getTables (): Promise<TableDescription[]> {

        const client = this.#client;
        const tableNames: string[] = [];
        for await (const page of paginateListTables(
            {client},
            {}
        )) {

            if (page.TableNames !== undefined) {

                tableNames.push(...page.TableNames);

            }

        }

        // Enrich each table with full description
        const tables: TableDescription[] = [];
        for (const tableName of tableNames) {

            try {

                const response = await client.send(new DescribeTableCommand({"TableName": tableName}));
                if (response.Table) {

                    tables.push(response.Table);

                }

            } catch {

                // Table may have been deleted between list and describe
            }

        }

        return tables;

    }

}

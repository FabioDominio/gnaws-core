import {describe} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const dynamodbDescriptors: DescriptorGroup = [

    // ─── DynamoDB (regional) ───────────────────────────────────────────────
    describe({
        "resourceType": "dynamodbtable",
        "scope": "regional",
        "list": (inv, region) => inv.getDynamoDBTablesByRegion(region),
        "id": (t) => t.TableArn ?? t.TableName,
        "name": (t) => t.TableName ?? t.TableArn,
        "columns": [
            {"label": "Status",
                "value": (t) => t.TableStatus},
            {"label": "Items",
                "value": (t) => t.ItemCount?.toString()},
            {"label": "Size (bytes)",
                "value": (t) => t.TableSizeBytes?.toString()},
            {"label": "Billing Mode",
                "value": (t) => t.BillingModeSummary?.BillingMode}
        ]
    })

];

import type {AwsCredentialIdentityProvider, AwsCredentialIdentity} from "@aws-sdk/types";
import type {SdkLogger} from "../../logger.js";
import {
    type EventBus,
    type Rule,
    type Target,
    EventBridgeClient,
    type EventBridgeClientConfig,
    ListEventBusesCommand,
    ListRulesCommand,
    ListTargetsByRuleCommand
} from "@aws-sdk/client-eventbridge";
import type {EventBridge, RuleWithTargets} from "../../interfaces/eventbridge.js";

export class EventBridgeService implements EventBridge {

    #client: EventBridgeClient;

    constructor (credentials: AwsCredentialIdentityProvider | AwsCredentialIdentity, region: string, logger?: SdkLogger) {

        const config: EventBridgeClientConfig = {
            region,
            credentials,
            "maxAttempts": 5,
            logger
        };
        this.#client = new EventBridgeClient(config);

    }

    async getEventBuses (): Promise<EventBus[]> {

        const response = await this.#client.send(new ListEventBusesCommand({}));

        return response.EventBuses ?? [];

    }

    async getRulesWithTargets (eventBusName: string): Promise<RuleWithTargets[]> {

        const rules: Rule[] = [];
        let nextToken: string | undefined;

        do {

            const response = await this.#client.send(new ListRulesCommand({
                "EventBusName": eventBusName,
                "NextToken": nextToken
            }));

            if (response.Rules !== undefined) {

                rules.push(...response.Rules);

            }

            nextToken = response.NextToken;

        } while (nextToken);

        const rulesWithTargets: RuleWithTargets[] = [];
        for (const rule of rules) {

            const targetsResponse = await this.#client.send(new ListTargetsByRuleCommand({
                "Rule": rule.Name,
                "EventBusName": eventBusName
            }));

            const targets: Target[] = targetsResponse.Targets ?? [];
            rulesWithTargets.push({
                rule,
                targets
            });

        }

        return rulesWithTargets;

    }

}

import type {EventBus, Rule, Target} from "@aws-sdk/client-eventbridge";

export interface RuleWithTargets {
    "rule": Rule;
    "targets": Target[];
}

export interface EventBridge {
    getEventBuses (): Promise<EventBus[]>;
    getRulesWithTargets (eventBusName: string): Promise<RuleWithTargets[]>;
}

import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    EventBridgeClient,
    ListEventBusesCommand,
    ListRulesCommand,
    ListTargetsByRuleCommand
} from "@aws-sdk/client-eventbridge";
import {EventBridgeService} from "../../../../src/providers/live/eventBridgeService.js";

const ebMock = mockClient(EventBridgeClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    ebMock.reset();

});

describe(
    "EventBridgeService",
    () => {

        describe(
            "getEventBuses",
            () => {

                it(
                    "returns event buses",
                    async () => {

                        ebMock.on(ListEventBusesCommand).resolves({
                            "EventBuses": [
                                {"Name": "default",
                                    "Arn": "arn:aws:events:us-east-1:123:event-bus/default"}
                            ]
                        });

                        const service = new EventBridgeService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getEventBuses();

                        expect(result).toHaveLength(1);
                        expect(result[0].Name).toBe("default");

                    }
                );

                it(
                    "returns empty array when no event buses",
                    async () => {

                        ebMock.on(ListEventBusesCommand).resolves({});

                        const service = new EventBridgeService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getEventBuses();

                        expect(result).toHaveLength(0);

                    }
                );

            }
        );

        describe(
            "getRulesWithTargets",
            () => {

                it(
                    "returns rules with their targets",
                    async () => {

                        ebMock.on(ListRulesCommand).resolves({
                            "Rules": [
                                {"Name": "rule-1",
                                    "Arn": "arn:aws:events:us-east-1:123:rule/rule-1"}
                            ]
                        });
                        ebMock.on(ListTargetsByRuleCommand).resolves({
                            "Targets": [
                                {"Id": "target-1",
                                    "Arn": "arn:aws:lambda:us-east-1:123:function:my-fn"}
                            ]
                        });

                        const service = new EventBridgeService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getRulesWithTargets("default");

                        expect(result).toHaveLength(1);
                        expect(result[0].rule.Name).toBe("rule-1");
                        expect(result[0].targets).toHaveLength(1);
                        expect(result[0].targets[0].Id).toBe("target-1");

                    }
                );

                it(
                    "paginates rules",
                    async () => {

                        ebMock.on(ListRulesCommand).
                            resolvesOnce({"Rules": [{"Name": "rule-1"}],
                                "NextToken": "tok"}).
                            resolvesOnce({"Rules": [{"Name": "rule-2"}]});
                        ebMock.on(ListTargetsByRuleCommand).resolves({"Targets": []});

                        const service = new EventBridgeService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getRulesWithTargets("default");

                        expect(result).toHaveLength(2);

                    }
                );

                it(
                    "returns empty array when no rules",
                    async () => {

                        ebMock.on(ListRulesCommand).resolves({});

                        const service = new EventBridgeService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getRulesWithTargets("default");

                        expect(result).toHaveLength(0);

                    }
                );

                it(
                    "returns rule with empty targets when no targets",
                    async () => {

                        ebMock.on(ListRulesCommand).resolves({
                            "Rules": [{"Name": "rule-1"}]
                        });
                        ebMock.on(ListTargetsByRuleCommand).resolves({});

                        const service = new EventBridgeService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getRulesWithTargets("default");

                        expect(result).toHaveLength(1);
                        expect(result[0].targets).toHaveLength(0);

                    }
                );

            }
        );

    }
);

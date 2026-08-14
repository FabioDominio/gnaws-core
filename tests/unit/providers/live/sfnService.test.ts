import {describe, it, expect, beforeEach} from "vitest";
import {mockClient} from "aws-sdk-client-mock";
import {
    SFNClient,
    ListStateMachinesCommand,
    DescribeStateMachineCommand
} from "@aws-sdk/client-sfn";
import {SfnService} from "../../../../src/providers/live/sfnService.js";

const sfnMock = mockClient(SFNClient);
const creds = {"accessKeyId": "test",
    "secretAccessKey": "test"};

beforeEach(() => {

    sfnMock.reset();

});

describe(
    "SfnService",
    () => {

        describe(
            "getStateMachines",
            () => {

                it(
                    "returns state machines with details",
                    async () => {

                        sfnMock.on(ListStateMachinesCommand).resolves({
                            "stateMachines": [
                                {
                                    "stateMachineArn": "arn:aws:states:us-east-1:123:stateMachine:my-sm",
                                    "name": "my-sm",
                                    "type": "STANDARD",
                                    "creationDate": new Date()
                                }
                            ]
                        });
                        sfnMock.on(DescribeStateMachineCommand).resolves({
                            "stateMachineArn": "arn:aws:states:us-east-1:123:stateMachine:my-sm",
                            "name": "my-sm",
                            "roleArn": "arn:aws:iam::123:role/step-fn-role",
                            "type": "STANDARD",
                            "definition": "{}",
                            "creationDate": new Date()
                        });

                        const service = new SfnService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getStateMachines();

                        expect(result).toHaveLength(1);
                        expect(result[0].name).toBe("my-sm");
                        expect(result[0].roleArn).toBe("arn:aws:iam::123:role/step-fn-role");
                        expect(result[0].type).toBe("STANDARD");

                    }
                );

                it(
                    "aggregates across pages",
                    async () => {

                        sfnMock.on(ListStateMachinesCommand).
                            resolvesOnce({
                                "stateMachines": [
                                    {"stateMachineArn": "arn:aws:states:us-east-1:123:stateMachine:sm1",
                                        "name": "sm1",
                                        "type": "STANDARD",
                                        "creationDate": new Date()}
                                ],
                                "nextToken": "tok"
                            }).
                            resolvesOnce({
                                "stateMachines": [
                                    {"stateMachineArn": "arn:aws:states:us-east-1:123:stateMachine:sm2",
                                        "name": "sm2",
                                        "type": "EXPRESS",
                                        "creationDate": new Date()}
                                ]
                            });
                        sfnMock.on(DescribeStateMachineCommand).resolves({
                            "roleArn": "arn:aws:iam::123:role/role",
                            "definition": "{}",
                            "creationDate": new Date()
                        });

                        const service = new SfnService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getStateMachines();

                        expect(result).toHaveLength(2);

                    }
                );

                it(
                    "returns empty array when no state machines",
                    async () => {

                        sfnMock.on(ListStateMachinesCommand).resolves({});

                        const service = new SfnService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getStateMachines();

                        expect(result).toHaveLength(0);

                    }
                );

                it(
                    "skips items missing required fields",
                    async () => {

                        sfnMock.on(ListStateMachinesCommand).resolves({
                            "stateMachines": [
                                {"stateMachineArn": "arn:aws:states:us-east-1:123:stateMachine:valid",
                                    "name": "valid",
                                    "type": "STANDARD",
                                    "creationDate": new Date()},
                                {"name": "no-arn",
                                    "type": "STANDARD",
                                    "creationDate": new Date(),
                                    "stateMachineArn": ""},
                                {"stateMachineArn": "arn:aws:states:us-east-1:123:stateMachine:no-name",
                                    "creationDate": new Date(),
                                    "name": "",
                                    "type": "STANDARD"}
                            ]
                        });
                        sfnMock.on(DescribeStateMachineCommand).resolves({
                            "roleArn": "arn:aws:iam::123:role/role",
                            "definition": "{}",
                            "creationDate": new Date()
                        });

                        const service = new SfnService(
                            creds,
                            "us-east-1"
                        );
                        const result = await service.getStateMachines();

                        expect(result).toHaveLength(1);
                        expect(result[0].name).toBe("valid");

                    }
                );

            }
        );

    }
);

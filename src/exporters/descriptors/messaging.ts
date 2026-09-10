import {describe, recordTags} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const messagingDescriptors: DescriptorGroup = [

    // ─── SNS / SQS (regional) ──────────────────────────────────────────────
    describe({
        "resourceType": "snstopic",
        "scope": "regional",
        "list": (inv, region) => inv.getTopicsByRegion(region),
        "id": (t) => t.TopicArn,
        "name": (t) => t.TopicArn,
        "columns": [
            {"label": "Topic Name",
                "value": (t) => t.TopicArn?.split(":").pop()}
        ]
    }),
    describe({
        "resourceType": "sqsqueue",
        "scope": "regional",
        "list": (inv, region) => inv.getQueuesByRegion(region),
        "id": (q) => q.queueArn ?? q.queueUrl,
        "name": (q) => q.queueName ?? q.queueArn ?? q.queueUrl,
        "tags": (q) => recordTags(q.tags),
        "columns": [
            {"label": "URL",
                "value": (q) => q.queueUrl}
        ]
    }),

    // ─── EventBridge / SFN / Kinesis (regional) ────────────────────────────
    describe({
        "resourceType": "eventbus",
        "scope": "regional",
        "list": (inv, region) => inv.getEventBusesByRegion(region),
        "id": (b) => b.Arn ?? b.Name,
        "name": (b) => b.Name ?? b.Arn,
        "columns": [
            {"label": "Description",
                "value": (b) => b.Description},
            {"label": "Created",
                "value": (b) => b.CreationTime?.toISOString()}
        ]
    }),
    describe({
        "resourceType": "statemachine",
        "scope": "regional",
        "list": (inv, region) => inv.getStateMachinesByRegion(region),
        "id": (m) => m.stateMachineArn,
        "name": (m) => m.name,
        "columns": [
            {"label": "Type",
                "value": (m) => m.type},
            {"label": "Role ARN",
                "value": (m) => m.roleArn}
        ]
    }),
    describe({
        "resourceType": "kinesisstream",
        "scope": "regional",
        "list": (inv, region) => inv.getKinesisStreamsByRegion(region),
        "id": (s) => s.StreamARN ?? s.StreamName,
        "name": (s) => s.StreamName ?? s.StreamARN,
        "columns": [
            {"label": "Status",
                "value": (s) => s.StreamStatus},
            {"label": "Mode",
                "value": (s) => s.StreamModeDetails?.StreamMode},
            {"label": "Created",
                "value": (s) => s.StreamCreationTimestamp?.toISOString()}
        ]
    }),

    // ─── Pipes (regional) ──────────────────────────────────────────────────
    describe({
        "resourceType": "eventbridgepipe",
        "scope": "regional",
        "list": (inv, region) => inv.getPipesByRegion(region),
        "id": (p) => p.Arn ?? p.Name,
        "name": (p) => p.Name ?? p.Arn,
        "columns": [
            {"label": "State",
                "value": (p) => p.CurrentState},
            {"label": "Source",
                "value": (p) => p.Source},
            {"label": "Target",
                "value": (p) => p.Target}
        ]
    })

];

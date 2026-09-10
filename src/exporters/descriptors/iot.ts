import {describe, boolStr} from "./types.js";
import type {DescriptorGroup} from "./types.js";

export const iotDescriptors: DescriptorGroup = [

    // ─── IoT (regional) ────────────────────────────────────────────────────
    describe({
        "resourceType": "iotthing",
        "scope": "regional",
        "list": (inv, region) => inv.getIotThingsByRegion(region),
        "id": (t) => t.thingArn,
        "name": (t) => t.thingName ?? t.thingArn,
        "columns": [
            {"label": "Thing Type",
                "value": (t) => t.thingTypeName},
            {"label": "Version",
                "value": (t) => t.version?.toString()}
        ]
    }),
    describe({
        "resourceType": "iotthingtype",
        "scope": "regional",
        "list": (inv, region) => inv.getIotThingTypesByRegion(region),
        "id": (t) => t.thingTypeArn,
        "name": (t) => t.thingTypeName ?? t.thingTypeArn,
        "columns": [
            {"label": "Description",
                "value": (t) => t.thingTypeProperties?.thingTypeDescription},
            {"label": "Deprecated",
                "value": (t) => boolStr(t.thingTypeMetadata?.deprecated)}
        ]
    }),
    describe({
        "resourceType": "iottopicrule",
        "scope": "regional",
        "list": (inv, region) => inv.getIotTopicRulesByRegion(region),
        "id": (r) => r.ruleArn,
        "name": (r) => r.ruleName ?? r.ruleArn,
        "columns": [
            {"label": "Topic Pattern",
                "value": (r) => r.topicPattern},
            {"label": "Disabled",
                "value": (r) => boolStr(r.ruleDisabled)},
            {"label": "Created",
                "value": (r) => r.createdAt?.toISOString()}
        ]
    })

];

import type {Topic, Subscription, Tag} from "@aws-sdk/client-sns";
import type {Sns} from "../../interfaces/sns.js";
import {readCacheFile} from "./cacheReader.js";

export class SnsCacheService implements Sns {

    #cacheDir: string;

    constructor (cacheDir: string) {

        this.#cacheDir = cacheDir;

    }

    async getTopics (): Promise<Topic[]> {

        return readCacheFile(
            this.#cacheDir,
            "sns_topics.json"
        );

    }

    async getSubscriptions (): Promise<Subscription[]> {

        return readCacheFile(
            this.#cacheDir,
            "sns_subscriptions.json"
        );

    }

    async getTagsForTopic (_topicArn: string): Promise<Tag[]> {

        return [];

    }

}

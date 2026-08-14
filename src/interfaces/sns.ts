import type {Topic, Subscription, Tag} from "@aws-sdk/client-sns";

export interface Sns {
    getTopics (): Promise<Topic[]>;
    getSubscriptions (): Promise<Subscription[]>;
    getTagsForTopic (topicArn: string): Promise<Tag[]>;
}

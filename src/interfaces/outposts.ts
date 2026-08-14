import type {Outpost, Site as OutpostSite} from "@aws-sdk/client-outposts";
export interface Outposts {
    getOutposts (): Promise<Outpost[]>;
    getSites (): Promise<OutpostSite[]>;
}

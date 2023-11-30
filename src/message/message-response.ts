import { IMessageEvent, MessageEventName, RandomMessageEventNames } from "../models/jakal-message-event.model";
import { alriightEvent, byloEvent, distinctEvent, ehrmanEvent, jakSeJmenoval1Event, jakSeJmenoval2Event, jakSeJmenoval3Event, jakSeJmenoval4Event, jakSeJmenoval5Event, judoEvent, naDovoleneEvent, naStojaka1Event, naStojaka2Event, naStojaka3Event, nahlasuckoEvent, prajzkaEvent, redflagEvent, thumbsUpEvent, tichuckoEvent, toPoznasEvent, urgoEvent } from "./mesage-respone.events";

export const probabilityFairRandomResponse: RandomMessageEventNames[] = [
    "ThumbsUp",
    "ThumbsUp",
    "ThumbsUp",
    "ThumbsUp",
    "ThumbsUp",
    "ThumbsUp",
    "ThumbsUp",
    "ThumbsUp",
    "ThumbsUp",
    "ThumbsUp",
    "ThumbsUp",
    "ThumbsUp",
    "ThumbsUp",
    "ThumbsUp",
    "ThumbsUp",
    "ToPoznas",
    "ToPoznas",
    "ToPoznas",
    "Distinct",
    "Distinct",
    "Distinct",
    "Alriight",
    "Alriight",
    "Redflag",
    "Redflag",
    "Redflag",
    "Redflag",
    "Judo",
    "NaDovolene",
    "NaDovolene",
    "NaStojaka1",
    "NaStojaka1",
    "NaStojaka1",
    "NaStojaka1",
    "JakSeJmenoval1",
    "JakSeJmenoval1",
    "JakSeJmenoval1",
    "JakSeJmenoval1",
];

export const messageResponseMap = new Map<MessageEventName | undefined, IMessageEvent>([
    [tichuckoEvent.key, tichuckoEvent],
    [nahlasuckoEvent.key, nahlasuckoEvent],
    [thumbsUpEvent.key, thumbsUpEvent],
    [toPoznasEvent.key, toPoznasEvent],
    [distinctEvent.key, distinctEvent],
    [alriightEvent.key, alriightEvent],
    [redflagEvent.key, redflagEvent],
    [naDovoleneEvent.key, naDovoleneEvent],
    [judoEvent.key, judoEvent],
    [urgoEvent.key, urgoEvent],
    [ehrmanEvent.key, ehrmanEvent],
    [prajzkaEvent.key, prajzkaEvent],
    [byloEvent.key, byloEvent],
    [naStojaka1Event.key, naStojaka1Event],
    [naStojaka2Event.key, naStojaka2Event],
    [naStojaka3Event.key, naStojaka3Event],
    [jakSeJmenoval1Event.key, jakSeJmenoval1Event],
    [jakSeJmenoval2Event.key, jakSeJmenoval2Event],
    [jakSeJmenoval3Event.key, jakSeJmenoval3Event],
    [jakSeJmenoval4Event.key, jakSeJmenoval4Event],
    [jakSeJmenoval5Event.key, jakSeJmenoval5Event],
]);
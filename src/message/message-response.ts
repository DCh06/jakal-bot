import { IMessageEvent, MessageEventName, RandomMessageEventNames } from "../models/jakal-message-event.model";
import * as jakalResponses from "./mesage-respone.events";


// register all exported members from 
const registeredMessageResponseEvents: Array<[MessageEventName | undefined, IMessageEvent]> = []
const keys = Object.keys(jakalResponses);
for (const key of keys) {
    const jakalResponse = (<any>jakalResponses)[key];
    registeredMessageResponseEvents.push([jakalResponse.key, jakalResponse])
}

export const registerMessageResponseMap = new Map<MessageEventName | undefined, IMessageEvent>(registeredMessageResponseEvents);
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
    "Notas",
    "SkvelaPrace",
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
    "Zhobo",
];

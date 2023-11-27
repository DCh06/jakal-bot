import { Message } from "discord.js";

export const SpecialMessageEventNames = [
    "Tichucko",
    "Nahlasucko",
] as const

export const StaticMessageEventNames = [
    ...SpecialMessageEventNames,
    "Urgo",
    "Ehrman",
    "Prajzska",
    "Bylo",
] as const

export const RandomMessageEventNames = ["ThumbsUp",
    "ToPoznas",
    "Distinct",
    "Alriight",
    "Redflag",
    "NaDovolene",
    "NaStojaka1",
    "NaStojaka2",
    "NaStojaka3",
    "Judo",
    "SkvelaPrace",
    "JakSeJmenoval1",
    "JakSeJmenoval2",
    "JakSeJmenoval3",
    "JakSeJmenoval4",
    "JakSeJmenoval5",
] as const

export const MessageEventNames = [
    ...StaticMessageEventNames,
    ...RandomMessageEventNames,
] as const;

export type RandomMessageEventNames = typeof RandomMessageEventNames[number];
export type MessageEventName = typeof MessageEventNames[number];

export type IMessageEvent = IMessageEventWithCondition | IMessageEventWithNext | IMessageEventWithNextConditionally;

export interface IMessageEventBase {
    key: MessageEventName,
    execute: (message: Message) => void,
    timeoutMs: number,
}

export interface IMessageEventWithCondition extends IMessageEventBase {
    executeCondition: (message: Message) => boolean
}

export interface IMessageEventWithNext extends IMessageEventBase {
    nextEvent: MessageEventName,
    evaluateNextEventCondition?: (message: Message) => boolean,
    isEvaluatedIndividually?: boolean,
}

export interface IMessageEventWithNextConditionally extends IMessageEventBase, IMessageEventWithNext {
    evaluateNextEventCondition: (message: Message) => boolean,
    timeoutExecution: (message: Message) => void,
}

export const isMessageEventWithTimeoutExecution = (messageEvent: IMessageEvent): messageEvent is IMessageEventWithNextConditionally => {
    return 'timeoutExecution' in messageEvent;
}

export const isMessageEventChainNextWithCondition = (messageEvent: IMessageEvent): messageEvent is IMessageEventWithNextConditionally | IMessageEventWithNext  => {
    return 'evaluateNextEventCondition' in messageEvent;
}
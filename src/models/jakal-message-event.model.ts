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
    "DaSa1",
    "ActionPoint",
    "JakDlouho",
    "CoNovehoJaky",
    "CoZbytek",
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
    "JakSeJmenoval6",
    "JakSeJmenoval7",
    "JakSeJmenoval8",
    "JakSeJmenoval9",
    "JakSeJmenoval10",
    "JakSeJmenoval11",
    "JakSeJmenoval12",
    "JakSeJmenoval13",
    "JakSeJmenoval14",
    "DaSa2",
    "Notas",
    "SkvelaPrace",
    "Zhobo",
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
    hasCooldown?: boolean,
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

export const isMessageEventChainNextWithCondition = (messageEvent: IMessageEvent): messageEvent is IMessageEventWithNextConditionally | IMessageEventWithNext => {
    return 'evaluateNextEventCondition' in messageEvent;
}

export interface IEventNameCooldown { 
    eventName: MessageEventName,
    cooldownStart: Date,
}
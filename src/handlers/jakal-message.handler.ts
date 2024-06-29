import { Message, messageLink } from "discord.js";
import { client } from "../implementation/client";
import { addJakaliky } from "../queries/add-jakaliky.query";
import { jakalikyRef, agilniSlova } from "../utils/references";
import { IEventNameCooldown, IMessageEvent, IMessageEventWithCondition, IMessageEventWithNext, MessageEventName, RandomMessageEventNames, SpecialMessageEventNames, StaticMessageEventNames, isMessageEventChainNextWithCondition, isMessageEventWithTimeoutExecution } from "../models/jakal-message-event.model";
import { registerMessageResponseMap, probabilityFairRandomResponse } from "../message/message-response";

export class JakalMessageHandler {
    private msgEvent?: IMessageEvent
    private msgEventNextConditionSucceed = false;
    private eventsOnCooldown: IEventNameCooldown[] = [];

    constructor(private responseChance: number) {
        this.responseChance = 0.07;
    }

    handleMessage(message: Message<boolean>): void {
        if (message.author.bot) { return; }
        this.refreshCooldowns();

        // special events dont care about current event
        const specialMsgEvent = this.getSpecialMessageEventWithCondition(message);
        this.handleEvent(message, specialMsgEvent);
        console.log(this.responseChance, specialMsgEvent);

        // when event in progress do not go forward, until all promises resolve
        if (!this.msgEventNextConditionSucceed && this.msgEvent && isMessageEventChainNextWithCondition(this.msgEvent)) {
            this.msgEventNextConditionSucceed = !!this.msgEvent.evaluateNextEventCondition?.(message);
            return;
        } else if (this.msgEvent || specialMsgEvent) {
            return;
        }

        this.msgEvent = this.getNewEvent(message, this.eventsOnCooldown.map(eventOnCd => eventOnCd.eventName));
        this.handleEvent(message, this.msgEvent);
        this.handleSideEffects(message, this.msgEvent?.key);

        this.handleAddEventOnCooldown(this.msgEvent);
    }

    getSpecialMessageEventWithCondition(message: Message<boolean>): IMessageEvent | undefined {
        let eventName = SpecialMessageEventNames.find((staticEventName) => {
            return (<IMessageEventWithCondition>registerMessageResponseMap.get(staticEventName))?.executeCondition(message);
        });
        return registerMessageResponseMap.get(eventName);
    }

    getNewEvent(mesage: Message, eventsOnCooldownNames: MessageEventName[]): IMessageEvent | undefined {
        let event = this.getMessageEventWithCondition(mesage, eventsOnCooldownNames);
        event ||= this.getRandomMessageEvent(mesage, eventsOnCooldownNames);
        // console.log(event);


        return event;
    }

    getMessageEventWithCondition(message: Message<boolean>, eventsOnCooldownNames: MessageEventName[]): IMessageEvent | undefined {
        let eventName = StaticMessageEventNames
            .filter(staticEventName => !eventsOnCooldownNames.includes(staticEventName))
            .find(staticEventName => {
                return (<IMessageEventWithCondition>registerMessageResponseMap.get(staticEventName))?.executeCondition(message);
            });

        return registerMessageResponseMap.get(eventName);
    }

    getRandomMessageEvent(message: Message<boolean>, eventsOnCooldownNames: MessageEventName[]): IMessageEvent | undefined {
        let eventName;
        if (Math.random() < this.responseChance) {
            const randomRes = Math.random();
            eventName = probabilityFairRandomResponse
                .filter(eventName => !eventsOnCooldownNames.includes(eventName))[Math.floor(probabilityFairRandomResponse.length * randomRes)];
        }

        return registerMessageResponseMap.get(eventName);
    }

    async handleEvent(message: Message, msgEvent?: IMessageEvent) {
        if (!msgEvent) {
            return;
        }

        await new Promise((res) => setTimeout(res, this.msgEvent?.timeoutMs));
        if (isMessageEventWithTimeoutExecution(msgEvent) && !this.msgEventNextConditionSucceed) {
            msgEvent?.timeoutExecution(message);
            // clear state after timeout
            this.msgEvent = undefined;
            return;
        }

        msgEvent?.execute(message);

        // if we have next event, change state
        this.msgEvent = registerMessageResponseMap.get((<IMessageEventWithNext>msgEvent)?.nextEvent);

        // if each event condition handled individualy, reset condition
        if (!this.msgEvent || (this.msgEvent && isMessageEventChainNextWithCondition(this.msgEvent) && this.msgEvent.isEvaluatedIndividually)) {
            this.msgEventNextConditionSucceed = false;
        }
        this.handleEvent(message, this.msgEvent);
    }

    handleSideEffects(message: Message, eventName?: MessageEventName) {
        console.log(eventName)
        if (!eventName) { return; }
        if (eventName === 'Tichucko') { this.decreaseChance(); }
        if (eventName === 'Nahlasucko') { this.increaseChance(); }
        this.agilniSlovaCheck(message);
        if ((<readonly string[]>StaticMessageEventNames).includes(eventName)) {
            addJakaliky(message.author, jakalikyRef["static agile"], "Staticky check!");
        }
        if ((<readonly string[]>RandomMessageEventNames).includes(eventName)) {
            addJakaliky(message.author, jakalikyRef["static agile"], "Random check!");
        }
    }

    private increaseChance() {
        console.log("increase change");
        
        this.responseChance = this.responseChance * 1.09;
    }

    private shouldDecreaseChance(message: Message<boolean>, responseChance: number) {
        const messageContent = message.content.toLocaleLowerCase();
        const containsDrz = messageContent.indexOf('drz') > -1 || messageContent.indexOf('drž') > -1
        const containsPicuHubu = messageContent.indexOf('hubu') > -1 || messageContent.indexOf('picu') > -1 || messageContent.indexOf('piču') > -1
        const kokote = messageContent.indexOf('kokote') > -1
        return ((containsDrz && containsPicuHubu) || kokote);

    }

    private decreaseChance() {
        this.responseChance = 0.07;
    }

    private agilniSlovaCheck(message: Message<boolean>) {
        if (this.agilniCheck(message)) {
            addJakaliky(message.author, jakalikyRef["agilni veta"], "Agilní check!");
        }
    }

    private agilniCheck(message: Message) {
        return agilniSlova.some((text) => message.content.includes(text))
    }

    private handleAddEventOnCooldown(event?: IMessageEvent) {
        if (!event) { return; }
        if (!event.hasCooldown) { return; }
        this.eventsOnCooldown.push({ eventName: event.key, cooldownStart: new Date() })
    }

    private refreshCooldowns() {
        let cooldown = 60 * 60 * 1000 * 0.5;
        this.eventsOnCooldown = this.eventsOnCooldown.filter(eventOnCd => new Date().getTime() - eventOnCd.cooldownStart.getTime() < cooldown)
    }
}
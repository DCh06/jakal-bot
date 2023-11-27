import { Message, messageLink } from "discord.js";
import { client } from "../implementation/client";
import { addJakaliky } from "../queries/add-jakaliky.query";
import { jakalikyRef, agilniSlova } from "../utils/references";
import { IMessageEvent, IMessageEventWithCondition, IMessageEventWithNext, MessageEventName, RandomMessageEventNames, SpecialMessageEventNames, StaticMessageEventNames, isMessageEventChainNextWithCondition, isMessageEventWithTimeoutExecution } from "../models/jakal-message-event.model";
import { messageResponseMap, probabilityFairRandomResponse } from "../message/message-response";
import { eventNames } from "process";

export class JakalMessageHandler {
    private msgEvent?: IMessageEvent
    private msgEventNextConditionSucceed = false;

    constructor(private responseChance: number) {
        this.responseChance = 0.07;
    }

    handleMessage(message: Message<boolean>): void {
        if (message.author.bot) { return; }
        
        // special events dont care about current event
        const specialMsgEvent = this.getSpecialMessageEventWithCondition(message);
        this.handleEvent(message, specialMsgEvent);
        console.log(this.responseChance);

        // when event in progress do not go forward, until all promises resolve
        if (!this.msgEventNextConditionSucceed && this.msgEvent && isMessageEventChainNextWithCondition(this.msgEvent)) {
            this.msgEventNextConditionSucceed = !!this.msgEvent.evaluateNextEventCondition?.(message);
            return;
        } else if (this.msgEvent || specialMsgEvent) {
            return;
        }

        this.msgEvent = this.getNewEvent(message);
        this.handleEvent(message, this.msgEvent);

        // // let respondedReturn = this.handleResponseChanceChange(message, this.responseChance);
        // // if (respondedReturn) { return; }
        // // const rnd = Math.random();

        // // this.agilniSlovaCheck(message);

        // // respondedReturn = this.staticResponsesCheck(message);
        // // if (respondedReturn) { return; }

        // // this.jakalRespondRandom(rnd, message);
        // this.msgEvent = radkuEvent;
        // intanceof msgevent IMessageEventWithNextConditionally
        // promise ( (resolve)=> {
        //     setTimeout(()=> {

        //     })
        // }) 


        //todo get event, await event, handle sideefects, cleare event
        // create 2 separate arrays, static responses, random respones => every static response get from Map
        // check condition => assign current event => after promise resolve, free current event

        // if not any static, froms econd array of keys generate 1 key, get from map set response free up event after set timeout
        // if event. next we need recursion / infinite loop until all promise resolves? after that free up event
        // recursion inside handle event, execute, if next handle event, each recursion loop handle sideeffects
    }

    getSpecialMessageEventWithCondition(message: Message<boolean>): IMessageEvent | undefined {
        let eventName = SpecialMessageEventNames.find((staticEventName) => {
            return (<IMessageEventWithCondition>messageResponseMap.get(staticEventName))?.executeCondition(message);
        });
        return messageResponseMap.get(eventName);
    }

    getNewEvent(mesage: Message): IMessageEvent | undefined {
        let event = this.getMessageEventWithCondition(mesage);
        event ||= this.getRandomMessageEvent(mesage);
        // console.log(event);
        
        return event;
    }

    getMessageEventWithCondition(message: Message<boolean>): IMessageEvent | undefined {
        let eventName = StaticMessageEventNames.find(staticEventName => {
            return (<IMessageEventWithCondition>messageResponseMap.get(staticEventName))?.executeCondition(message);
        });
        return messageResponseMap.get(eventName);
    }

    getRandomMessageEvent(message: Message<boolean>): IMessageEvent | undefined {
        let eventName;
        if (Math.random() < this.responseChance) {
            const randomRes = Math.random();
            eventName = probabilityFairRandomResponse[Math.floor(probabilityFairRandomResponse.length * randomRes)];
        }

        return messageResponseMap.get(eventName);
    }

    async handleEvent(message: Message, msgEvent?: IMessageEvent) {
        if (!msgEvent) {
            return;
        }
        this.handleSideEffects(message, msgEvent.key);
        
        await new Promise((res) => setTimeout(res, this.msgEvent?.timeoutMs));
        if (isMessageEventWithTimeoutExecution(msgEvent) && !this.msgEventNextConditionSucceed) {
            msgEvent?.timeoutExecution(message);
            // clear state after timeout
            this.msgEvent = undefined;
            return;
        }

        msgEvent?.execute(message);

        // if we have next event, change state
        this.msgEvent = messageResponseMap.get((<IMessageEventWithNext>msgEvent)?.nextEvent);

        // if each event condition handled individualy, reset condition
        if (!this.msgEvent || (this.msgEvent && isMessageEventChainNextWithCondition(this.msgEvent) && this.msgEvent.isEvaluatedIndividually)) {
            this.msgEventNextConditionSucceed = false;
        }
        this.handleEvent(message, this.msgEvent);
    }

    handleSideEffects(message: Message, eventName: MessageEventName) {
        console.log(eventName)
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

    // todo refactor, add handling sideeffects by event name
    private handleResponseChanceChange(message: Message, responseChance: number): boolean {
        if (message.mentions.members?.has(message.client.user?.id) || message.content.toLocaleLowerCase().indexOf('jakal') > -1) {
            this.increaseChance();
        }

        if (this.shouldDecreaseChance(message, responseChance)) {
            message.channel.send("Ale ja to dělal schválně, aby jste pochopili, že to je špatně!")
            this.decreaseChance();
            return true;
        }
        return false;
    }

    private increaseChance() {
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

    // private staticResponsesCheck(message: Message<boolean>): boolean {
    //     let respondedReturn;
    //     staticConditionalRespones
    //         .forEach((staticConditionalRespone) => {
    //             respondedReturn = staticConditionalRespone(message);
    //             if (respondedReturn) {
    //                 addJakaliky(message.author, jakalikyRef["static agile"], "Agilní check!");
    //                 return;
    //             }
    //         });

    //     return !!respondedReturn;
    // }

    // private jakalRespondRandom(rnd: number, message: Message<boolean>) {
    //     if (rnd < this.responseChance) {
    //         const randomRes = Math.random();
    //         addJakaliky(message.author, jakalikyRef["probability"], "Agilní check!");
    //         console.log(randomRes, Math.floor(probabilityFairResponses.length * randomRes));

    //         let rndResponse = probabilityFairResponses[Math.floor(probabilityFairResponses.length * randomRes)];
    //         rndResponse(message);
    //     }
    // }
}
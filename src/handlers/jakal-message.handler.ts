import { Message } from "discord.js";
import { client } from "../implementation/client";
import { staticConditionalRespones, probabilityFairResponses } from "../message/mesage-respones.event";
import { addJakaliky } from "../queries/add-jakaliky.query";
import { jakalikyRef, agilniSlova } from "../utils/references";

export class JakalMessageHandler {
    constructor(private responseChance: number) {
        this.responseChance = responseChance;
    }

 

    handleMessage(message: Message<boolean>) {
        if (message.author.bot) { return; }

        let respondedReturn = this.handleResponseChanceChange(message, this.responseChance);
        if (respondedReturn) { return; }
        const rnd = Math.random();

        this.agilniSlovaCheck(message);

        respondedReturn = this.staticResponsesCheck(message);
        if (respondedReturn) { return; }

        this.jakalRespondRandom(rnd, message);
       
    }
    
    createEvent() {
        
    }

    private handleResponseChanceChange(message: Message, responseChance: number): boolean {
        if (client.user?.id && message.mentions.members?.has(client.user?.id) || message.content.toLocaleLowerCase().indexOf('jakal') > -1) {
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
        this.responseChance = this.responseChance * 1.12;
    }

    private shouldDecreaseChance(message: Message<boolean>, responseChance: number) {
        const messageContent = message.content.toLocaleLowerCase();
        const containsDrz = messageContent.indexOf('drz') > -1 || messageContent.indexOf('drž') > -1
        const containsPicuHubu = messageContent.indexOf('hubu') > -1 || messageContent.indexOf('picu') > -1 || messageContent.indexOf('piču') > -1
        const kokote = messageContent.indexOf('kokote') > -1
        return responseChance > 0.07 && ((containsDrz && containsPicuHubu) || kokote);

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

    private staticResponsesCheck(message: Message<boolean>): boolean {
        let respondedReturn;
        staticConditionalRespones
            .forEach((staticConditionalRespone) => {
                respondedReturn = staticConditionalRespone(message);
                if (respondedReturn) {
                    addJakaliky(message.author, jakalikyRef["static agile"], "Agilní check!");
                    return;
                }
            });

        return !!respondedReturn;
    }

    private jakalRespondRandom(rnd: number, message: Message<boolean>) {
        if (rnd < this.responseChance) {
            const randomRes = Math.random();
            addJakaliky(message.author, jakalikyRef["probability"], "Agilní check!");
            console.log(randomRes, Math.floor(probabilityFairResponses.length * randomRes));

            let rndResponse = probabilityFairResponses[Math.floor(probabilityFairResponses.length * randomRes)];
            rndResponse(message);
        }
    }
}
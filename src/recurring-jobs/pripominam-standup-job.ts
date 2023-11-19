import { PripominamStandup } from "@prisma/client";
import cron from "node-cron"
import prisma from "../db";
import { Client, TextChannel } from "discord.js";
import { client } from "../implementation/client";
import { generateRandomDateInBoundaries } from "../utils/random-generators";
import dayjs from "dayjs";

interface IDeltaCas {
    timeoutDelta: number,
    untilReminderDelta: number
}

export const standupJob = cron.schedule("0 */30 * * * *", async function () {
    console.log("running cron");
    
    try {
        const lowerBoundary = new Date();
        const upperBoundary = new Date();
        // cron should run every 30 minutes
        lowerBoundary.setMinutes(lowerBoundary.getMinutes())
        upperBoundary.setMinutes(upperBoundary.getMinutes() + 30)

        console.log("hello", lowerBoundary, upperBoundary.toISOString());
        
        let standupPripomenutis: PripominamStandup[] = await prisma.pripominamStandup.findMany({
            where: {
                time: {
                    gte: dayjs.utc(lowerBoundary).format(),
                    lte: dayjs.utc(upperBoundary).format(),
                    
                },
                finished: false
            }
        });
        console.log(standupPripomenutis, standupPripomenutis.map(s => s.id));

        let x = await prisma.pripominamStandup.updateMany({
            data: {
                finished: true
            },
            where: {
                id: {
                    in: standupPripomenutis.map(s => s.id)
                }
            }
        });

        console.log("updated", x , "rows");
        

        // kdyz spadne db mezi standupem a 30 minutama do dalsiho okenka tak riiip ale neresim
        pripominumStandupJobGroCronuNehe(standupPripomenutis);


    } catch (e) {
        console.error(e);
    }
});

// toodo move elsewhere
export function pripominumStandupJobGroCronuNehe(standupPripomenutis: Pick<PripominamStandup, 'time' | 'channelId'>[]) {
    standupPripomenutis.forEach((standupPripomenuti) => {
        const casyPripomenutiProTentoStandup = randomizePripomenuti(standupPripomenuti);
        console.log("tento standup",casyPripomenutiProTentoStandup);
        
        const deltaTimeoutyProTentoStandup = calculateDeltaTimeoutPripominamStandup(standupPripomenuti, casyPripomenutiProTentoStandup);
        pripominamStandupActionLesgo(standupPripomenuti, deltaTimeoutyProTentoStandup);
    });
}

function randomizePripomenuti(standupPripomenuti:  Pick<PripominamStandup, 'time' | 'channelId'>) {
    const pocetPripomenuti = Math.floor(Math.random() * 2) + 2;
    const casyPripomenuti: Date[] = [];

    for (let i = 0; i < pocetPripomenuti; i++) {
        // const nextLowerBoundCasPripomenuti = casyPripomenuti[i - 1] || new Date()
        casyPripomenuti.push(generateRandomDateInBoundaries(new Date(), standupPripomenuti.time))
    }

    return casyPripomenuti;

}

function calculateDeltaTimeoutPripominamStandup(standupPripomenuti:  Pick<PripominamStandup, 'time' | 'channelId'>, casyPripomenuti: Date[]): IDeltaCas[] {
    let deltaTimeoutCasy = casyPripomenuti.map((casPripomenuti) => {
        return {
            timeoutDelta: casPripomenuti.getTime() - new Date().getTime(),
            untilReminderDelta: standupPripomenuti.time.getTime() - casPripomenuti.getTime()
        }
    });

    let uzJeStandupPasaci = {
        timeoutDelta: standupPripomenuti.time.getTime() - new Date().getTime(),
        untilReminderDelta: 0
    }

    deltaTimeoutCasy.push(uzJeStandupPasaci);

    return deltaTimeoutCasy;
}

function pripominamStandupActionLesgo(standupPripomenuti:  Pick<PripominamStandup, 'time' | 'channelId'>, deltaTimeouty: IDeltaCas[]): void {
    const channel = <TextChannel>(client.channels.cache.get(standupPripomenuti.channelId));

    for (let i = 0; i < deltaTimeouty.length - 1; i++) {
        console.log(
            `${getMinutyWording(deltaTimeouty[i].untilReminderDelta)}`
        );
        setTimeout(() => {
            channel.send(`Připomínám standup za ${getMinutyWording(deltaTimeouty[i].untilReminderDelta)}.`);
        }, deltaTimeouty[i].timeoutDelta)
    }

    setTimeout(() => {
        channel.send(`Pašáci, připomínám, že máme standup. Já si ještě skočím napustit kafčo. 😉`);
    }, deltaTimeouty[deltaTimeouty.length - 1].timeoutDelta)
}

function getMinutyWording(standupPripomenutiMs: number) {
    const minuty = Math.floor((standupPripomenutiMs / 1000) / 60) + 1 || 1

    if (minuty == 1) {
        return `${minuty} minutu`;
    } else if (minuty > 1 && minuty < 5) {
        return `${minuty} minuty`;
    }

    return `${minuty} minut`;
}
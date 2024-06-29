import { PripominamStandup } from "@prisma/client";
import cron from "node-cron"
import prisma from "../db";
import dayjs from "dayjs";
import { pripominumStandupJobGroCronuNehe } from "../helpers/standup/standup.helper";


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
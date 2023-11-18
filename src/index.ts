import dayjs from "dayjs";

import { run } from "./implementation/run";
import prisma from "./db";
import { generateRandomDateInBoundaries } from "./utils/random-generators";
import { PripominamStandup } from "@prisma/client";
require("dotenv").config();


run();
console.log(dayjs().second());

const regex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/
const [_, year, month, day, hour, minute] = ("2023-11-18T11:45").match(regex) as any[]
console.log(_, year, month, day, hour, minute);
const lowerBoundary = new Date(2001);
const upperBoundary = new Date("2023-12-18T20:48:00.000Z");
// cron should run every 30 minutes

// (async()=>{
// // lowerBoundary.setMinutes(lowerBoundary.getMinutes())
// // upperBoundary.setMinutes(upperBoundary.getMinutes() + 30)
// let standupPripomenutis: PripominamStandup[] = await prisma.pripominamStandup.findMany({
//     where: {
//         time: {
//             gte: lowerBoundary,
//             lte: upperBoundary,
//         },
//         finished: {
//             not: true
//         }
//     }
// });

// console.log(standupPripomenutis);


// })();
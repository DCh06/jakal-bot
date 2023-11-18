import { Collection, Events } from "discord.js";

import { client } from "./client";

import { handleMessage, handlePresenceUpdate, handleInteraction, loadCommands } from "./interact";
import prisma from "../db";
import { standupJob } from "../recurring-jobs/pripominam-standup-job";


export const run = () => {
    loadCommands();
    client.on(Events.ClientReady, (c) =>
        console.log(`Connected to Discord! Logged In as ${c.user.tag}`)
    );
    // idk asi treeshaking?? musi byt LOAD JOBS
    standupJob;

    handleMessage();
    handlePresenceUpdate();
    handleInteraction();
    client.login(process.env.TOKEN!);
}

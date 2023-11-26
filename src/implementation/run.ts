import { Collection, Events } from "discord.js";

import { client } from "./client";

import { handleMessage, handlePresenceUpdate, handleInteraction, loadCommands } from "./interact.main";
import { standupJob } from "../recurring-jobs/pripominam-standup.job";
import { JakalMessageHandler } from "../handlers/jakal-message.handler";


export const run = () => {
    const jakalMessageHandler = new JakalMessageHandler(0.07);

    loadCommands();
    client.on(Events.ClientReady, (c) =>
        console.log(`Connected to Discord! Logged In as ${c.user.tag}`)
    );

    // idk asi treeshaking?? musi byt LOAD JOBS
    standupJob;

    handleMessage(jakalMessageHandler);
    handlePresenceUpdate();
    handleInteraction();
    client.login(process.env.TOKEN!);
}

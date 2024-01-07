import { Collection, Events, REST, Routes } from "discord.js";

import { client } from "./client";

import { handleMessage, handlePresenceUpdate, handleInteraction, loadCommands } from "./interact.main";
import { standupJob } from "../recurring-jobs/pripominam-standup.job";
import { JakalMessageHandler } from "../handlers/jakal-message.handler";


export const run = () => {
    const jakalMessageHandler = new JakalMessageHandler(0.07);

    loadCommands();
    // const rest = new REST().setToken(process.env.TOKEN!);
    // rest.put(Routes.applicationCommands('1114177337228021762'), { body: [] })
	// .then(() => console.log('Successfully deleted all application commands.'))
	// .catch(console.error);

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

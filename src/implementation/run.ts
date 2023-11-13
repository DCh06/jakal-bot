import { Collection, Events } from "discord.js";

import { client } from "./client";

import { handleMessage, handlePresenceUpdate, handleInteraction, loadCommands } from "./interact";
import prisma from "../db";


export const run = () => {
    loadCommands();
    client.on(Events.ClientReady, (c) =>
        console.log(`Connected to Discord! Logged In as ${c.user.tag}`)
    );


    handleMessage();
    handlePresenceUpdate();
    handleInteraction();
    client.login(process.env.TOKEN!);
}

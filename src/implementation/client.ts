import { Client, Collection, GatewayIntentBits } from "discord.js";
require("dotenv").config(); 

export const client: Client & { commands?: Collection<any, any> } = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildPresences,
    ],
  });
  
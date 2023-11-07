import {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  Message,
  TextChannel,
} from "discord.js";
// import { ping } from "./commands/ping";
import path from "path";
import * as fs from "fs";
import {
  alriiiight,
  bylo,
  distinctVraci,
  ehrman,
  jakalPoznasAzBudesMitDeti,
  jakalThumbsUp,
  jakalUrgo,
  matyJudo,
  naStojaka,
  prajzka,
  redflag,
} from "./message/mesage-respones";
import { jakalVyJsteSliHratBezeMe } from "./pressence/presence-responses";
require("dotenv").config();

const client: Client & { commands?: Collection<any, any> } = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
  ],
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  // Grab all the command files from the commands directory you created earlier
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const { command } = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
      console.log("succesfully set");
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

client.on(Events.ClientReady, (c) =>
  console.log(`Connected to Discord! Logged In as ${c.user.tag}`)
);

client.on(Events.InteractionCreate, (interaction) => {
  console.log(interaction);
});

const loadedFunctions = [
  jakalThumbsUp,
  jakalThumbsUp,
  jakalThumbsUp,
  jakalThumbsUp,
  jakalThumbsUp,
  jakalThumbsUp,
  jakalThumbsUp,
  jakalThumbsUp,
  jakalThumbsUp,
  jakalThumbsUp,
  jakalThumbsUp,
  jakalThumbsUp,
  jakalThumbsUp,
  jakalThumbsUp,
  jakalThumbsUp,
  jakalThumbsUp,
  jakalPoznasAzBudesMitDeti,
  jakalPoznasAzBudesMitDeti,
  jakalPoznasAzBudesMitDeti,
  jakalPoznasAzBudesMitDeti,
  jakalPoznasAzBudesMitDeti,
  distinctVraci,
  distinctVraci,
  distinctVraci,
  alriiiight,
  alriiiight,
  redflag,
  naStojaka,
  naStojaka,
  matyJudo,
];

client.on(Events.MessageCreate, (message: Message<boolean>) => {
  const rnd = Math.random();
  console.log(rnd);

  if (message.author.bot) {
    return;
  }
  if (message.content.indexOf("backlog") > -1) {
    jakalUrgo(message);
    return;
  }

  if (message.content.indexOf("hrman") > -1) {
    ehrman(message);
    return;
  }

  if (message.content.indexOf("praj") > -1) {
    prajzka(message);
    return;
  }

  if (message.content.indexOf("bylo") > -1 && rnd > 0.7) {
    bylo(message);
  }
  if (rnd < 0.1) {
    let rndResponse =
      loadedFunctions[Math.floor(loadedFunctions.length * Math.random())];
    rndResponse(message);
  }
});

client.on(Events.PresenceUpdate, (oldMember, newMember) => {
  jakalVyJsteSliHratBezeMe(oldMember, newMember, client);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = (interaction.client as any).commands.get(
    interaction.commandName
  );

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

client.login(process.env.TOKEN!);

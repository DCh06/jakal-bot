import {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  Message,
} from "discord.js";
// import { ping } from "./commands/ping";
import path from "path";
import * as fs from "fs";
require("dotenv").config();

const client: Client & { commands?: Collection<any, any> } = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const { command } = require(filePath);
  console.log(command);
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

client.on(Events.ClientReady, (c) =>
  console.log(`Connected to Discord! Logged In as ${c.user.tag}`)
);

client.on(Events.InteractionCreate, (interaction) => {
  console.log(interaction);
});

client.on(Events.MessageCreate, (message: Message<boolean>) => {
  const rnd = Math.random();
  console.log(rnd);

  if (rnd < 0.1) message.react("👍");

  if (rnd > 0.05 && rnd <= 0.09) {
    message.channel.send(
      `Taky bych ${message.content}, ale to poznáš až budeš mít děti`
    );
    return;
  }

  if (rnd > 0.98) message.channel.send("Distinct vrací unikátní záznamy");
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
// })();

import { Collection, Events, Message, User } from "discord.js";
import { jakalVyJsteSliHratBezeMe } from "../pressence/bezeme.presence";
import { client } from "./client";
import path from "path";
import * as fs from "fs";
import { JakalMessageHandler } from "../handlers/jakal-message.handler";

export function handleMessage(jakalMessageHandler: JakalMessageHandler) {

  client.on(Events.MessageCreate, (message: Message<boolean>) => {
    jakalMessageHandler.handleMessage(message);
  });
}

export function handlePresenceUpdate() {
  client.on(Events.PresenceUpdate, (oldMember, newMember) => {
    jakalVyJsteSliHratBezeMe(oldMember, newMember, client);
  });
}

export function handleInteraction() {
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
      if (interaction.replied || !interaction.deferred) {
        await interaction.reply({
          content: "There was an error while executing this command! lol",
          ephemeral: true,
        });
      } else if (!interaction.deferred) {
        await interaction.reply({
          content: "There was an error while executing this command! lel",
          ephemeral: true,
        });
      }
    }
  });
}

export function loadCommands() {
  client.commands = new Collection();

  const foldersPath = path.join(__dirname, "../commands");
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
}






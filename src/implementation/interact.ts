import { Collection, Events, Message } from "discord.js";
import { jakalVyJsteSliHratBezeMe } from "../behavior/pressence/presence-responses";
import { client } from "./client";
import path from "path";
import * as fs from "fs";
import { probabilityFairResponses, staticConditionalRespones } from "../behavior/message/mesage-respones";

let respPercentages = {
  probabilityFairResponseChance: 0.07,
}

export function handleMessage() {
 
  client.on(Events.MessageCreate, (message: Message<boolean>) => {
    const rnd = Math.random();
    console.log(respPercentages);

    if (client.user?.id && message.mentions.members?.has(client.user?.id) || message.content.toLocaleLowerCase().indexOf('jakal') > -1) {
      increaseChance(respPercentages)
    }

    if (shouldDecreaseChance(message, respPercentages)) {
      message.channel.send("Ale ja to dělal schválně, aby jste pochopili, že to je špatně!")
      decreaseChance(respPercentages)
      return;
    }

    if (message.author.bot) {
      return;
    }

    let staticConditionalResponseRun = false;
    staticConditionalRespones
      .forEach((staticConditionalRespone) => {
        if (staticConditionalRespone(message)) {
          staticConditionalResponseRun = true;
          console.log(staticConditionalResponseRun)
          return;
        }
      })

    if (rnd < respPercentages.probabilityFairResponseChance) {
      const randomRes = Math.random()
      console.log(randomRes, Math.floor(probabilityFairResponses.length * randomRes));

      let rndResponse = probabilityFairResponses[Math.floor(probabilityFairResponses.length * randomRes)];
      rndResponse(message);
    }
  });
}

function shouldDecreaseChance(message: Message<boolean>, respPercentages: { probabilityFairResponseChance: number; }) {

  const messageContent = message.content.toLocaleLowerCase();
  const containsDrz = messageContent.indexOf('drz') > -1 || messageContent.indexOf('drž') > -1
  const containsPicuHubu = messageContent.indexOf('hubu') > -1 || messageContent.indexOf('picu') > -1 || messageContent.indexOf('piču') > -1
  const kokote = messageContent.indexOf('kokote') > -1
  return respPercentages.probabilityFairResponseChance > 0.7 && ((containsDrz && containsPicuHubu) || kokote);

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
function increaseChance(chances: any) {
  chances.probabilityFairResponseChance = chances.probabilityFairResponseChance * 1.2;
}

function decreaseChance(chances: any) {
  chances.probabilityFairResponseChance = 0.7;
}


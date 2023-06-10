import { Collection, REST, Routes } from "discord.js";
import * as ping from "./commands/test/ping";
import path from "path";
import * as fs from "fs";
require("dotenv").config();

// Construct and prepare an instance of the REST module

const commands: any = [];
// Grab all the command files from the commands directory you created earlier
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  // Grab all the command files from the commands directory you created earlier
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const { command } = require(filePath);
    console.log(command);
    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

const rest = new REST().setToken(process.env.TOKEN!);
(async () => {
  try {
    console.log(
      `Started refreshing ${(commands as any).length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationCommands(`${process.env.CLIENT_TOKEN!}`),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${(data as any).length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();

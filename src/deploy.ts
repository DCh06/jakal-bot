import { Collection, REST, Routes } from "discord.js";
import * as ping from "./commands/ping";
require("dotenv").config();

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.TOKEN!);
const commands = [];
commands.push(ping);
console.log(process.env.CLIENT_TOKEN, process.env.TOKEN);

// and deploy your commands!

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

    // console.log(
    //   `Successfully reloaded ${(data as any).length} application (/) commands.`
    // );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();

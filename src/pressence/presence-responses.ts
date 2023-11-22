import { Client, Presence, TextChannel } from "discord.js";
import { addJakaliky } from "../queries/add-jakaliky";
import { jakalikyRef } from "../utils/references";

let date: Date = new Date(0);
export function jakalVyJsteSliHratBezeMe(
  oldMember: Presence | null,
  newMember: Presence,
  client: Client
) {
  let rnd = Math.random();
  let newDate = new Date();
  if (
    newMember.activities.length > 0 &&
    newDate.getTime() - date.getTime() > 600000
  ) {
    if (rnd > 0.2) return;

    date = newDate;
    const games = newMember.activities.map((game) => game.name).join(", ");
    const oldGames = oldMember?.activities.map((game) => game.name).join(", ");
    if (games == oldGames) {
      return;
    }

    const channel = <TextChannel>(
      // todo get dynamically
      client.channels.cache.get(`1111262673225654444`)
    );
    
    if(newMember.user) addJakaliky(newMember.user, jakalikyRef['bonz'], "Jakal tě bonznul lol");

    channel.send(`Vy jste šli hrát ${games} beze mě?`);
    setTimeout(() => {
      channel.send(`Ja jsem řekl že bych dal radši Tekkena ne že nejdu.`);
    }, 5000);
  }
  console.log(newMember);
}

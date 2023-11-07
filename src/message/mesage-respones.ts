import { Message } from "discord.js";

export function jakalThumbsUp(message: Message<boolean>) {
  message.react("👍");
}

export function jakalPoznasAzBudesMitDeti(message: Message<boolean>) {
  message.channel.send(
    `Taky bych ${message.content}, ale to poznáš až budeš mít děti`
  );
}

export function distinctVraci(message: Message<boolean>) {
    message.channel.send("Distinct vrací unikátní záznamy");
}

export function jakalUrgo(message: Message<boolean>) {
    message.channel.send(
        `Okey a mam to nějak urgovat? Bando? Ještě nějak jak s tim mužu pomoct?`
      );
}

export function alriiiight(message: Message<boolean>) {
    setTimeout(()=> message.channel.send(
        `Alriiiight, guuuys`
      ),60000);
}

export function redflag(message: Message<boolean>) {
    message.channel.send(
        `Redflag! `
      );
      message.channel.send(
        `Podle mě se ${message.content} nehodi. Ale finalni volba je na vás bando. 😉`
      );
}

export function naStojaka(message: Message<boolean>) {
    setTimeout(()=> message.channel.send(
        `Radku?`
      ),60000);

      setTimeout(()=> message.channel.send(
        `Hej, Radku?`
      ),90000);

      setTimeout(()=> message.channel.send(
        `Na stojáka?😉`
      ),120000);
}

export function matyJudo(message: Message<boolean>) {
    
}
  
  
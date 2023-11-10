import { Message, RawFile } from "discord.js";

const jakalThumbsUp = (message: Message<boolean>) => {
  message.react("👍");
}

const jakalPoznasAzBudesMitDeti = (message: Message<boolean>) => {
  message.channel.send(
    `Taky bych ${message.content}, ale to poznáš až budeš mít děti`
  );
}

const distinctVraci = (message: Message<boolean>) => {
  message.channel.send("Distinct vrací unikátní záznamy");
}

const jakalUrgo = (message: Message<boolean>) => {
  message.channel.send(
    `Okey a mam to nějak urgovat? Bando? Ještě nějak jak s tim mužu pomoct?`
  );
}

const alriiiight = (message: Message<boolean>) => {
  setTimeout(() => message.channel.send(`Alriiiight, guuuys`), 60000);
}

const redflag = (message: Message<boolean>) => {
  message.channel.send(`Redflag! `);
  message.channel.send(
    `Podle mě se ${message.content} nehodi. Ale finalni volba je na vás bando. 😉`
  );
}

const naStojaka = (message: Message<boolean>) => {
  setTimeout(() => message.channel.send(`Radku?`), 60000);

  setTimeout(() => message.channel.send(`Hej, Radku?`), 90000);

  setTimeout(() => message.channel.send(`Na stojáka?😉`), 120000);
}

const matyJudo = (message: Message<boolean>) => {
  setTimeout(
    () => message.channel.send(`Včera jsem byl s Matym na judu.😉`),
    120000
  );
}

const ehrman = (message: Message<boolean>) => {
  setTimeout(
    () =>
      message.channel.send(
        `To u nas není, to už se neprodává, to mají jenom v Polsku. 😉`
      ),
    90000
  );
}

const prajzka = (message: Message<boolean>) => {
  setTimeout(
    () =>
      message.channel.send(`Hlučín není prajzská. To vím jsem tam bydlel. 😉`),
    90000
  );
}

const bylo = (message: Message<boolean>) => {
  setTimeout(() => message.channel.send(`Za mě to tak nebylo. 😉`), 30000);
}

// export const staticResponess: { response: (message: Message) => void }[] = [{
//   message.content.indexOf("backlog") > -1
// }]


const staticJakalUrgo = (message: Message) => {
  if (message.content.indexOf("backlog") > -1) {
    jakalUrgo(message);
    return true;
  }
}

const staticJakalEhrman = (message: Message) => {
  if (message.content.indexOf("hrman") > -1) {
    ehrman(message);
    return true;
  }
}

const staticJakalPrajzka = (message: Message) => {
  if (message.content.indexOf("praj") > -1) {
    prajzka(message);
    return true;
  }
}
const staticJakalBylo = (message: Message) => {
  const rnd = Math.random();
  if (message.content.indexOf("bylo") > -1 && rnd > 0.7) {
    bylo(message);
    return true;
  }
}

export const staticConditionalRespones: ((message:Message)=>boolean | undefined)[] = [
  staticJakalUrgo,
  staticJakalEhrman,
  staticJakalPrajzka,
  staticJakalBylo,
]

export const probabilityFairResponses = [
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
  distinctVraci,
  distinctVraci,
  distinctVraci,
  alriiiight,
  alriiiight,
  redflag,
  redflag,
  redflag,
  naStojaka,
  naStojaka,
  matyJudo,
];
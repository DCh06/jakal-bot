import { Message } from "discord.js";

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

const jakalSeZenouNaDovolene = (message: Message<boolean>) => {
  const dateNow = new Date();
  const initialDate = new Date("11-09-2017");

  const randomDateSpan = dateNow.getTime() - initialDate.getTime();
  // initialDate + difference between initial date and current date * random(0,1);
  const randomDate = new Date(initialDate.getTime() + Math.floor(Math.random()*randomDateSpan))

  const [year, month, day] = [randomDate.getFullYear().toString().padStart(2, "0"), (randomDate.getMonth() + 1).toString().padStart(2, "0"), randomDate.getDate().toString().padStart(2, "0")];
  const url = `https://cdn6.babeherder.com/repo-0002/babes/${year}/${month}/${day}/mozaic.jpg`
  
  message.channel.send({
    files: [url]
  });
  message.channel.send(`Tady je moje žena na dovolené, jak jsme byli spolu, než se narodila dcera. Pak se všechno posralo.`)

}

const naStojaka = (message: Message<boolean>) => {
  setTimeout(() => message.channel.send(`Radku?`), 30000);
  setTimeout(() => message.channel.send(`Hej, Radku?`), 60000);
  setTimeout(() => message.channel.send(`Na stojáka?😉`), 90000);
}

const matyJudo = (message: Message<boolean>) => {
  setTimeout(
    () => message.channel.send(`Včera jsem byl s Matym na judu.😉`),
    30000
  );
}

const ehrman = (message: Message<boolean>) => {
  setTimeout(
    () =>
      message.channel.send(
        `To u nas není, to už se neprodává, to mají jenom v Polsku. 😉`
      ),
    30000
  );
}

const prajzka = (message: Message<boolean>) => {
  setTimeout(
    () =>
      message.channel.send(`Hlučín není prajzská. To vím jsem tam bydlel. 😉`),
    30000
  );
}

const bylo = (message: Message<boolean>) => {
  setTimeout(() => message.channel.send(`Za mě to tak nebylo. 😉`), 30000);
}

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

export const staticConditionalRespones: ((message: Message) => boolean | undefined)[] = [
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
  matyJudo,
  jakalSeZenouNaDovolene,
  jakalSeZenouNaDovolene,
];
import { Message } from "discord.js";
import { generateRandomDateInBoundaries } from "../utils/random-generators";
import { IMessageEvent, MessageEventName } from "../models/jakal-message-event.model";
// TODO move to separate files?
// const thumbsUp = (message: Message<boolean>) => {
//   message.react("👍");
// }
export const thumbsUpEvent = {
  key: 'ThumbsUp',
  execute: (message: Message) => { message.react("👍") },
  timeoutMs: 0,
} as IMessageEvent

// const toPoznas = (message: Message<boolean>) => {
//   message.channel.send(
//     `Taky bych ${message.content}, ale to poznáš až budeš mít děti`
//   );
// }
export const toPoznasEvent = {
  key: 'ToPoznas',
  execute: (message: Message<boolean>) => {
    message.channel.send(
      `Taky bych ${message.content}, ale to poznáš až budeš mít děti`
    );
  },
  timeoutMs: 0,
} as IMessageEvent

// const distinct = (message: Message<boolean>) => {
//   message.channel.send("Distinct vrací unikátní záznamy");
// }
export const distinctEvent = {
  key: 'Distinct',
  execute: (message: Message<boolean>) => {
    message.channel.send("Distinct vrací unikátní záznamy");
  },
  timeoutMs: 0,
} as IMessageEvent

// const alriight = (message: Message<boolean>) => {
//   setTimeout(() => message.channel.send(`Alriiiight, guuuys`), 60000);
// }

export const alriightEvent = {
  key: 'Alriight',
  execute: (message: Message<boolean>) => {
    message.channel.send(`Alriiiight, guuuys`);
  },
  timeoutMs: 60000,
} as IMessageEvent

// const redflag = (message: Message<boolean>) => {
//   message.channel.send(`Redflag! `);
//   message.channel.send(
//     `Podle mě se ${message.content} nehodi. Ale finalni volba je na vás bando. 😉`
//   );
// }
export const redflagEvent = {
  key: 'Redflag',
  execute: (message: Message<boolean>) => {
    message.channel.send(`Redflag! `);
    message.channel.send(
      `Podle mě se ${message.content} nehodi. Ale finalni volba je na vás bando. 😉`
    );
  },
  timeoutMs: 0,
} as IMessageEvent

export const skvelaPraceEvent = {
  key: 'SkvelaPrace',
  execute: (message: Message<boolean>) => {
    message.channel.send(`Skvělá práce borci dneska!`);
  },
  timeoutMs: 10000,
} as IMessageEvent


const naDovolene = (message: Message<boolean>) => {
  const dateNow = new Date();
  const initialDate = new Date("11-09-2017");
  const randomDate = generateRandomDateInBoundaries(initialDate, dateNow)

  const [year, month, day] = [randomDate.getFullYear().toString().padStart(2, "0"), (randomDate.getMonth() + 1).toString().padStart(2, "0"), randomDate.getDate().toString().padStart(2, "0")];
  const url = `https://cdn6.babeherder.com/repo-0002/babes/${year}/${month}/${day}/mozaic.jpg`

  message.channel.send({
    files: [url]
  });
  message.channel.send(`Tady je moje žena na dovolené, jak jsme byli spolu, než se narodila dcera. Pak se všechno posralo.`)
}

export const naDovoleneEvent = {
  key: 'NaDovolene',
  execute: naDovolene,
  timeoutMs: 0,
} as IMessageEvent

// const judo = (message: Message<boolean>) => {
//   setTimeout(
//     () => message.channel.send(`Včera jsem byl s Matym na judu.😉`),
//     30000
//   );
// }
export const judoEvent = {
  key: 'Judo',
  execute: (message: Message<boolean>) => {
    message.channel.send(`Včera jsem byl s Matym na judu.😉`)
  },
  timeoutMs: 30000,
} as IMessageEvent


// const urgo = (message: Message<boolean>) => {
//   message.channel.send(
//     `Okey a mam to nějak urgovat? Bando? Ještě nějak jak s tim mužu pomoct?`
//   );
// }
// const staticJakalUrgo = (message: Message) => {
//   if (message.content.indexOf("backlog") > -1) {
//     urgo(message);
//     return true;
//   }
// }

const tichuckoCondition = (message: Message<boolean>) => {
  const messageContent = message.content.toLocaleLowerCase();
  const containsDrz = messageContent.indexOf('drz') > -1 || messageContent.indexOf('drž') > -1
  const containsPicuHubu = messageContent.indexOf('hubu') > -1 || messageContent.indexOf('picu') > -1 || messageContent.indexOf('piču') > -1
  const kokote = messageContent.indexOf('kokote') > -1
  return ((containsDrz && containsPicuHubu) || kokote);

}
export const tichuckoEvent = {
  key: 'Tichucko',
  executeCondition: tichuckoCondition,
  execute: (message: Message<boolean>) => {
    message.channel.send("Ale ja to dělal schválně, aby jste pochopili, že to je špatně!")
  },
  timeoutMs: 0,
} as IMessageEvent

const nahlasuckoCondition = (message: Message) => message.mentions.members?.has(message.client.user?.id) || message.content.toLocaleLowerCase().indexOf('jakal') > -1
export const nahlasuckoEvent = {
  key: 'Nahlasucko',
  executeCondition: nahlasuckoCondition,
  execute: () => null,
  timeoutMs: 0,
} as IMessageEvent

export const urgoEvent = {
  key: 'Urgo',
  executeCondition: (message: Message) => message.content.indexOf("backlog") > -1,
  execute: (message: Message<boolean>) => {
    message.channel.send(
      `Okey a mam to nějak urgovat? Bando? Ještě nějak jak s tim mužu pomoct?`
    );
  },
  timeoutMs: 0,
} as IMessageEvent

// const ehrman = (message: Message<boolean>) => {
//   setTimeout(
//     () =>
//       message.channel.send(`To u nas není, to už se neprodává, to mají jenom v Polsku. 😉`),
//     30000
//   );
// }
// const staticJakalEhrman = (message: Message) => {
//   if (message.content.indexOf("hrman") > -1) {
//     ehrman(message);
//     return true;
//   }
// }
export const ehrmanEvent = {
  key: 'Ehrman',
  executeCondition: (message: Message) => message.content.indexOf("hrman") > -1,
  execute: (message: Message<boolean>) => {
    message.channel.send(`To u nas není, to už se neprodává, to mají jenom v Polsku. 😉`)
  },
  timeoutMs: 30000,
} as IMessageEvent


// const prajzka = (message: Message<boolean>) => {
//   setTimeout(
//     () =>
//       message.channel.send(`Hlučín není prajzská. To vím jsem tam bydlel. 😉`),
//     30000
//   );
// }
// const staticJakalPrajzka = (message: Message) => {
//   if (message.content.indexOf("praj") > -1) {
//     prajzka(message);
//     return true;
//   }
// }
export const prajzkaEvent = {
  key: 'Prajzska',
  executeCondition: (message: Message) => message.content.indexOf("praj") > -1,
  execute: (message: Message<boolean>) => {
    message.channel.send(`Hlučín není prajzská. To vím jsem tam bydlel. 😉`)
  },
  timeoutMs: 30000,
} as IMessageEvent


// const bylo = (message: Message<boolean>) => {
//   setTimeout(() => message.channel.send(`Za mě to tak nebylo. 😉`), 30000);
// }
// const staticJakalBylo = (message: Message) => {
//   const rnd = Math.random();
//   if (message.content.indexOf("bylo") > -1 && rnd > 0.7) {
//     bylo(message);
//     return true;
//   }
// }
export const byloEvent = {
  key: 'Bylo',
  executeCondition: (message: Message) => {
    return message.content.indexOf("bylo") > -1 && Math.random() > 0.7
  },
  execute: (message: Message<boolean>) => {
    message.channel.send(`Za mě to tak nebylo. 😉`)
  },
  timeoutMs: 30000,
} as IMessageEvent

const toJeDomluva = (message: Message) => { message.channel.send(`To je domluva...`) };

export const jakSeJmenoval1Event = {
  key: 'JakSeJmenoval1',
  nextEvent: 'JakSeJmenoval2',
  execute: (message: Message<boolean>) => {
    message.channel.send(`Jak se jmenoval ten manažer, kterého jsi potkal?`)
  },
  timeoutMs: 10000,
  isEvaluatedIndividually: true,
} as IMessageEvent

export const jakSeJmenoval2Event = {
  key: 'JakSeJmenoval2',
  evaluateNextEventCondition: (message: Message) => !!message,
  nextEvent: 'JakSeJmenoval3',
  execute: (message: Message<boolean>) => {
    message.channel.send(`Karel?`)
  },
  timeoutMs: 10000,
  isEvaluatedIndividually: true,
} as IMessageEvent

export const jakSeJmenoval3Event = {
  key: 'JakSeJmenoval3',
  nextEvent: 'JakSeJmenoval4',
  evaluateNextEventCondition: (message: Message) => !!message,
  timeoutExecution: (message: Message) => {},
  execute: (message: Message<boolean>) => {
    message.channel.send(`Petr?`)
  },
  timeoutMs: 10000,
  isEvaluatedIndividually: true,
} as IMessageEvent

export const jakSeJmenoval4Event = {
  key: 'JakSeJmenoval4',
  nextEvent: 'JakSeJmenoval5',
  evaluateNextEventCondition: (message: Message) => !!message,
  timeoutExecution: (message: Message) => {},
  execute: (message: Message<boolean>) => {
    message.channel.send(`Pavel?`)
  },
  timeoutMs: 10000,
  isEvaluatedIndividually: true,
} as IMessageEvent

export const jakSeJmenoval5Event = {
  key: 'JakSeJmenoval5',
  evaluateNextEventCondition: (message: Message) => !!message,
  timeoutExecution: (message: Message) => {},
  execute: (message: Message<boolean>) => {
    message.channel.send(`Filip?`)
  },
  timeoutMs: 10000,
  isEvaluatedIndividually: true,
} as IMessageEvent

export const naStojaka1Event = {
  key: 'NaStojaka1',
  nextEvent: 'NaStojaka2',
  execute: (message: Message<boolean>) => {
    message.channel.send(`Radku?`)
  },
  timeoutMs: 10000,
} as IMessageEvent

export const naStojaka2Event = {
  key: 'NaStojaka2',
  evaluateNextEventCondition: (message: Message) => message.author.id == '1096509170171248651',
  nextEvent: 'NaStojaka3',
  execute: (message: Message<boolean>) => {
    message.channel.send(`Hej, Radku?`)
  },
  timeoutMs: 15000,
} as IMessageEvent

export const naStojaka3Event = {
  key: 'NaStojaka3',
  evaluateNextEventCondition: (message: Message) => message.author.id == '1096509170171248651',
  timeoutExecution: toJeDomluva,
  execute: (message: Message<boolean>) => {
    message.channel.send(`Na stojáka? 😉`)
  },
  timeoutMs: 20000,
} as IMessageEvent

// const naStojaka1 = (message: Message<boolean>) => {
//   setTimeout(() => message.channel.send(`Radku?`), 30000);
// }
// const naStojaka2 = (message: Message<boolean>) => {
//   setTimeout(() => message.channel.send(`Hej, Radku?`), 60000);
// }
// const naStojaka3 = (message: Message<boolean>) => {
//   setTimeout(() => message.channel.send(`Na stojáka?😉`), 90000);
// }

// export const staticConditionalRespones: ((message: Message) => boolean | undefined)[] = [
//   staticJakalUrgo,
//   staticJakalEhrman,
//   staticJakalPrajzka,
//   staticJakalBylo,
// ]

// export const probabilityFairResponses = [
//   thumbsUp,
//   thumbsUp,
//   thumbsUp,
//   thumbsUp,
//   thumbsUp,
//   thumbsUp,
//   thumbsUp,
//   thumbsUp,
//   thumbsUp,
//   thumbsUp,
//   thumbsUp,
//   thumbsUp,
//   thumbsUp,
//   thumbsUp,
//   thumbsUp,
//   thumbsUp,
//   thumbsUp,
//   thumbsUp,
//   thumbsUp,
//   thumbsUp,
//   thumbsUp,
//   thumbsUp,
//   thumbsUp,
//   thumbsUp,
//   thumbsUp,
//   toPoznas,
//   toPoznas,
//   toPoznas,
//   distinct,
//   distinct,
//   distinct,
//   alriight,
//   alriight,
//   redflag,
//   redflag,
//   redflag,
//   naStojaka,
//   judo,
//   naDovolene,
//   naDovolene,
// ];